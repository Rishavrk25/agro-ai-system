import { fetchMandiPrices } from "../services/mandiService.js";
import { calculateDPS } from "../services/dpsService.js";
import { predictPrice, predictDemand } from "../services/predictionService.js";
import { getWeatherRisk } from "../services/weatherService.js";
import { getCoordinates } from "../utils/geocode.js";
import { haversineDistance } from "../utils/distance.js";
import Mandi from "../models/Mandi.js";
import Recommendation from "../models/Recommendation.js";
import { calculateTransportCost } from "../utils/transportCost.js";
import { successResponse, errorResponse } from "../utils/response.js";

const DEFAULT_RADIUS_KM = 200;

// Geocode a mandi — uses cached coordinates from MongoDB if available,
// otherwise geocodes via OpenCage and saves to cache.
const getMandiCoordinates = async (mandiName, district, state) => {
  // Check cache first
  const cached = await Mandi.findOne({ name: mandiName, state });
  if (cached) {
    return { latitude: cached.latitude, longitude: cached.longitude };
  }

  // Geocode using existing utility
  const coords = await getCoordinates(mandiName, district, state);
  if (!coords) return null;

  // Save to cache (upsert to handle race conditions)
  try {
    await Mandi.findOneAndUpdate(
      { name: mandiName, state },
      {
        name: mandiName,
        district,
        state,
        latitude: coords.latitude,
        longitude: coords.longitude,
        lastUpdated: new Date(),
      },
      { upsert: true, new: true },
      // Upsert = Update + Insert
      // It means:
      // If data exists → update it
      // If data does NOT exist → insert it
    );
  } catch (err) {
    // Duplicate key is fine — another request might have cached it
    if (err.code !== 11000) console.error("Mandi cache error:", err.message);
  }

  return coords;
};

export const recommendMandi = async (req, res) => {
  try {
    const {
      village,
      district,
      state,
      commodity,
      cropQuality,
      transportAvailability,
      storageAvailability,
      quantity = 10,
    } = req.body;

    const maxRadius = parseInt(req.query.maxRadius) || DEFAULT_RADIUS_KM;

    // ── Step 1: Geocode farmer's location ──────────────────────────
    const farmerCoords = await getCoordinates(village, district, state);
    if (!farmerCoords) {
      return errorResponse(
        res,
        "Could not locate farmer's village",
        "Geocoding failed",
        400,
      );
    }

    // ── Step 2: Fetch mandi prices from data.gov.in ────────────────
    const mandiRecords = await fetchMandiPrices(state, commodity);
    if (!mandiRecords || mandiRecords.length === 0) {
      return errorResponse(
        res,
        "No mandi data found",
        `No mandis found for ${commodity} in ${state}`,
        404,
      );
    }
    // console.log(mandiRecords);

    // ── Step 3: Deduplicate mandis (API may return multiple entries per market) ─
    const uniqueMandis = new Map();
    for (const record of mandiRecords) {
      const key = record.market;
      if (
        !uniqueMandis.has(key) ||
        Number(record.modal_price) > Number(uniqueMandis.get(key).modal_price)
      ) {
        uniqueMandis.set(key, record);
      }
    }
    // console.log(uniqueMandis);

    // ── Step 4: Geocode each mandi + filter by distance ────────────
    const geocodePromises = Array.from(uniqueMandis.values()).map(
      async (record) => {
        const coords = await getMandiCoordinates(
          record.market,
          record.district,
          record.state,
        );
        if (!coords) return null;

        const distanceKm = haversineDistance(
          farmerCoords.latitude,
          farmerCoords.longitude,
          coords.latitude,
          coords.longitude,
        );

        if (distanceKm > maxRadius) return null;

        return {
          ...record,
          latitude: coords.latitude,
          longitude: coords.longitude,
          distanceKm: Math.round(distanceKm * 10) / 10,
        };
      },
    );
    

    const geocodedMandis = (await Promise.all(geocodePromises)).filter(
      Boolean,
    );

    // console.log(geocodedMandis);

    if (geocodedMandis.length === 0) {
      return errorResponse(
        res,
        "No mandis within radius",
        `No mandis found within ${maxRadius}km for ${commodity}`,
        404,
      );
    }

    // ── Step 5: Get weather risk once (same origin for all) ────────
    const weatherRisk = await getWeatherRisk(
      farmerCoords.latitude,
      farmerCoords.longitude,
    );
    // console.log(weatherRisk);

    // ── Mappings for DPS and Transport Calculations ──────────────
    const transportMapping = { own: 100, rental: 80, limited: 40, none: 0 };
    const numTransportAvailability = transportMapping[transportAvailability] ?? 50;

    const storageMapping = { available: 100, limited: 50, none: 0 };
    const numStorageAvailability = storageMapping[storageAvailability] ?? 50;

    const qualityMapping = { A: 100, B: 80, C: 50, D: 20 };
    const numCropQuality = qualityMapping[cropQuality] ?? 50;

    // ── Step 6: Calculate DPS + net profit for each mandi ──────────
    const evaluationPromises = geocodedMandis.map(async (mandi) => {
      const modalPrice = Number(mandi.modal_price);
      const transportCost = calculateTransportCost(
        mandi.distanceKm,
        numTransportAvailability,
      );

      // Map mandi data → DPS input format
      const dpsInput = {
        cropQuality: numCropQuality,
        demand: Math.min(modalPrice / 25, 100), // Normalize price → demand proxy (0-100)
        price: modalPrice,
        weatherRisk,
        distance: mandi.distanceKm,
        transportAvailability: numTransportAvailability,
        storageAvailability: numStorageAvailability,
      };

      // Future scenario: predicted price & demand
      const futureInput = {
        ...dpsInput,
        price: predictPrice(dpsInput),
        demand: predictDemand(dpsInput),
      };

      // DPS now vs later
      const [dpsNow, dpsLater] = await Promise.all([
        calculateDPS(dpsInput),
        calculateDPS(futureInput),
      ]);

      const bestDPS = Math.max(dpsNow, dpsLater);
      const decision = dpsNow > dpsLater ? "Transport Now" : "Delay Shipment";
      const netProfit = modalPrice * quantity - transportCost;

      return {
        mandiName: mandi.market,
        district: mandi.district,
        distanceKm: mandi.distanceKm,
        modalPrice,
        minPrice: Number(mandi.min_price),
        maxPrice: Number(mandi.max_price),
        transportCost,
        netProfit,
        dpsNow: Math.round(dpsNow * 100) / 100,
        dpsLater: Math.round(dpsLater * 100) / 100,
        bestDPS: Math.round(bestDPS * 100) / 100,
        decision,
      };
    });

    const evaluatedMandis = await Promise.all(evaluationPromises);

    // ── Step 7: Rank by DPS score (descending) ─────────────────────
    evaluatedMandis.sort((a, b) => b.bestDPS - a.bestDPS);

    // Assign ranks
    const rankedMandis = evaluatedMandis.map((mandi, index) => ({
      rank: index + 1,
      ...mandi,
    }));

    // ── Step 8: Return response ────────────────────────────────────
    return successResponse(
      res,
      {
        farmerLocation: {
          village,
          district,
          state,
          latitude: farmerCoords.latitude,
          longitude: farmerCoords.longitude,
        },
        commodity,
        searchRadiusKm: maxRadius,
        totalMandisFound: rankedMandis.length,
        recommendation: rankedMandis[0],
        allMandis: rankedMandis,
      },
      "Mandi recommendations generated successfully",
      200,
    );
  } catch (err) {
    console.error("Mandi recommendation error:", err);
    return errorResponse(
      res,
      "Failed to generate mandi recommendations",
      err.message,
      500,
    );
  }
};

// ── Confirm a mandi selection — saves the recommendation to DB ──────
export const confirmMandi = async (req, res) => {
  try {
    const {
      farmerLocation,
      commodity,
      quantity,
      cropQuality,
      selectedMandi,
      weatherRisk,
      transportAvailability,
      storageAvailability,
      totalMandisEvaluated,
    } = req.body;

    // Basic validation
    if (!farmerLocation || !commodity || !selectedMandi) {
      return errorResponse(
        res,
        "Missing required fields",
        "farmerLocation, commodity, and selectedMandi are required",
        400,
      );
    }

    const recommendation = await Recommendation.create({
      farmerLocation,
      commodity,
      quantity,
      cropQuality,
      selectedMandi,
      weatherRisk,
      transportAvailability,
      storageAvailability,
      totalMandisEvaluated,
    });

    return successResponse(
      res,
      { recommendation },
      "Mandi selection confirmed and saved",
      201,
    );
  } catch (err) {
    console.error("Confirm mandi error:", err);
    return errorResponse(
      res,
      "Failed to confirm mandi selection",
      err.message,
      500,
    );
  }
};
