import Shipment from "../models/Shipment.js";
import { calculateDPS } from "../services/dpsService.js";
import { getDecision } from "../services/decisionService.js";
import { predictPrice, predictDemand } from "../services/predictionService.js";

export const createShipment = async (req, res) => {
  try {
    const data = req.body;

    // 🔹 Scenario 1: NOW
    const dpsNow = calculateDPS(data);

    // 🔹 Scenario 2: FUTURE
    const futureData = {
      ...data,
      price: predictPrice(data),
      demand: predictDemand(data)
    };

    const dpsLater = calculateDPS(futureData);

    // 🔹 Final Decision
    const decision =
      dpsNow > dpsLater ? "Transport Now" : "Delay Shipment";

    const shipment = await Shipment.create({
      ...data,
      dps: Math.max(dpsNow, dpsLater),
      decision
    });

    // 🔥 Emit real-time update
    const io = req.app.get("io");
    io.emit("shipmentCreated", shipment);
    
    res.status(201).json({
      shipment,
      comparison: {
        now: dpsNow,
        later: dpsLater
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRankedShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    const ranked = shipments.sort((a, b) => b.dps - a.dps).map((item, index) => ({
    ...item._doc,
    rank: index + 1
  }));
    res.json(ranked);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};