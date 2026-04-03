import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    cropQuality: { type: Number, required: true },
    demand: { type: Number, required: true },
    price: { type: Number, required: true },
    weatherRisk: { type: Number, required: true },
    transportAvailability: { type: Number, required: true },
    distance: { type: Number, required: true },

    dps: { type: Number },
    decision: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Shipment", shipmentSchema);