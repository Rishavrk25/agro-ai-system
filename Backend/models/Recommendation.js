import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
  {
    // Farmer details
    farmerLocation: {
      village: { type: String, required: true },
      district: { type: String, required: true },
      state: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },

    // Crop details
    commodity: { type: String, required: true },
    quantity: { type: Number, required: true },
    cropQuality: { type: Number, required: true },

    // Selected mandi details
    selectedMandi: {
      mandiName: { type: String, required: true },
      district: { type: String, required: true },
      distanceKm: { type: Number, required: true },
      modalPrice: { type: Number, required: true },
      minPrice: { type: Number },
      maxPrice: { type: Number },
      transportCost: { type: Number, required: true },
      netProfit: { type: Number, required: true },
      dpsNow: { type: Number },
      dpsLater: { type: Number },
      bestDPS: { type: Number, required: true },
      decision: { type: String, required: true }, // "Transport Now" or "Delay Shipment"
      rank: { type: Number, required: true },
    },

    // Context
    weatherRisk: { type: Number },
    transportAvailability: { type: Number },
    storageAvailability: { type: Number },
    totalMandisEvaluated: { type: Number },

    // Status tracking
    status: {
      type: String,
      enum: ["confirmed", "in_transit", "delivered", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Recommendation", recommendationSchema);
