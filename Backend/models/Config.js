import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
  cropQuality: Number,
  demand: Number,
  price: Number,
  weatherRisk: Number,
  distance: Number,
  transportAvailability: Number,
  storageAvailability:Number
});

export default mongoose.model("Config", configSchema);