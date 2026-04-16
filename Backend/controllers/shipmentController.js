import Shipment from "../models/Shipment.js";
import { calculateDPS } from "../services/dpsService.js";
import { predictPrice, predictDemand } from "../services/predictionService.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { getExplanation } from "../services/explainationService.js";
import { getWeatherRisk } from "../services/weatherService.js";

export const createShipment = async (req, res) => {
  try {
    const data = req.body;

    // REAL WEATHER RISK
    const weatherRisk = await getWeatherRisk(data.city || "Delhi");
    const updatedData = {
      ...data,
      weatherRisk,
    };
    

    //-----------------------Explaination-----------------------
    const explanation = getExplanation(updatedData);
    // --------------------------------------------------------------

    // 🔹 Scenario 1: NOW
    const dpsNow = await calculateDPS(updatedData);

    // 🔹 Scenario 2: FUTURE
    const futureData = {
      ...updatedData,
      price: predictPrice(updatedData),
      demand: predictDemand(updatedData),
    };

    const dpsLater = await calculateDPS(futureData);

    // 🔹 Final Decision
    const decision = dpsNow > dpsLater ? "Transport Now" : "Delay Shipment";

    const shipment = await Shipment.create({
      ...updatedData,
      dps: Math.max(dpsNow, dpsLater),
      decision,
      explanation,
    });

    //-------------------Emit real-time update----------------------
    const io = req.app.get("io");
    io.emit("shipmentCreated", shipment);
    //--------------------------------------------------------------

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
    return errorResponse(res, "Failed to create shipment", err.message, 400);
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
