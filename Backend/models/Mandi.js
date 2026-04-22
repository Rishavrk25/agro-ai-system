import mongoose from "mongoose";

const mandiSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// Unique index: same mandi name + state won't be duplicated
mandiSchema.index({ name: 1, state: 1 }, { unique: true });

export default mongoose.model("Mandi", mandiSchema);
