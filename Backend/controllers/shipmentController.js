import Shipment from "../models/Shipment.js";
import { calculateDPS } from "../services/dpsService.js";
import { predictPrice, predictDemand } from "../services/predictionService.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { getExplanation } from "../services/explainationService.js";
import { getWeatherRisk } from "../services/weatherService.js";
import { getCoordinates } from "../utils/geocode.js";

export const createShipment = async (req, res) => {
  try {
    const { village, district, state, ...rest } = req.body;

    // 🔥 Step 1: Convert village → lat/lng
    const coords = await getCoordinates(village, district, state);
    if (!coords) {
      return errorResponse(res, "Invalid location", "Geocoding failed", 400);
    }
    const data = {
      ...rest,
      location: {
        village,
        district,
        state,
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    };

    // 🔹 Step 2: Run independent operations in parallel
    const [weatherRisk, explanation] = await Promise.all([
      getWeatherRisk(coords.latitude, coords.longitude),
      Promise.resolve(getExplanation(data)), // wrap sync function
    ]);

    const updatedData = {
      ...data,
      weatherRisk,
    };

    // 🔹 Step 3: Prepare future scenario data
    const futureData = {
      ...updatedData,
      price: predictPrice(updatedData),
      demand: predictDemand(updatedData),
    };

    // 🔹 Step 4: Calculate DPS for both scenarios in parallel
    const [dpsNow, dpsLater] = await Promise.all([
      calculateDPS(updatedData),
      calculateDPS(futureData),
    ]);

    // 🔹 Step 5: Final Decision
    const decision = dpsNow > dpsLater ? "Transport Now" : "Delay Shipment";

    // 🔹 Step 6: Create shipment in database
    const shipment = await Shipment.create({
      ...updatedData,
      dps: Math.max(dpsNow, dpsLater),
      decision,
      explanation,
    });

    // 🔹 Step 7: Emit real-time update (non-blocking)
    const io = req.app.get("io");
    io.emit("shipmentCreated", shipment);

    // 🔹 Step 8: Return success response
    return successResponse(
      res,
      {
        shipment,
        comparison: {
          now: dpsNow,
          later: dpsLater,
        },
      },
      "Shipment created successfully",
      201,
    );
  } catch (err) {
    return errorResponse(res, "Failed to create shipment", err.message, 500);
  }
};

export const getRankedShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    const ranked = shipments
      .sort((a, b) => b.dps - a.dps)
      .map((item, index) => ({
        ...item._doc,
        rank: index + 1,
      }));

    return successResponse(res, ranked, "Shipments fetched successfully", 200);
  } catch (err) {
    return errorResponse(res, "Failed to fetch shipments", err.message, 500);
  }
};
