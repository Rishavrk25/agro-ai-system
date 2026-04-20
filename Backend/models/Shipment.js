import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    cropQuality: { type: Number, required: true },
    demand: { type: Number, required: true },
    price: { type: Number, required: true },
    weatherRisk: { type: Number, required: true }, // Dynamic, geting weather data from openweathermap using (latitude,longitude), then calculating weather risk
    transportAvailability: { type: Number, required: true },
    distance: { type: Number, required: true },
    storageAvailability: { type: Number, required: true },

    location: {
      village: String, // user input
      district: String, // user input
      state: String, // user input
      latitude: Number, // dynamic using open cage api -> converting (village,district,state) to (latitude,longitude)
      longitude: Number, // // dynamic using open cage api -> converting (village,district,state) to (latitude,longitude)
    },

    dps: { type: Number },
    decision: { type: String },
    explanation: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Shipment", shipmentSchema);
