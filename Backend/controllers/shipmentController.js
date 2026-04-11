import Shipment from "../models/Shipment.js";
import { calculateDPS } from "../services/dpsService.js";
import { getDecision } from "../services/decisionService.js";
import { predictPrice, predictDemand } from "../services/predictionService.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const createShipment = async (req, res) => {
  try {
    const data = req.body;

    //-----------------------Explaination-----------------------
    const reason = [];
    if (data.weatherRisk > 60) {
      reason.push("High weather risk");
    }
    if (data.price > 50) {
      reason.push("Good market price");
    }
    if (data.demand > 60) {
      reason.push("High demand");
    }
    if (data.storageAvailability < 30) {
      reason.push("Low storage availability");
    }
    if (data.storageAvailability > 70) {
      reason.push("Sufficient storage available");
    }
    const explanation = reason.join(", ");
    // --------------------------------------------------------------

    // 🔹 Scenario 1: NOW
    const dpsNow = await calculateDPS(data);

    // 🔹 Scenario 2: FUTURE
    const futureData = {
      ...data,
      price: predictPrice(data),
      demand: predictDemand(data),
    };

    const dpsLater = await calculateDPS(futureData);

    // 🔹 Final Decision
    const decision = dpsNow > dpsLater ? "Transport Now" : "Delay Shipment";

    const shipment = await Shipment.create({
      ...data,
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
