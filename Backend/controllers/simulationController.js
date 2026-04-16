import { calculateDPS } from "../services/dpsService.js";
import { getExplanation } from "../services/explainationService.js";
import { predictDemand, predictPrice } from "../services/predictionService.js";

export const simulate = async(req,res) =>{
  const data = req.body;

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

  const explanation = getExplanation(data);
  res.json({ dpsNow,dpsLater, decision,explanation });
}