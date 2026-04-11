import Config from "../models/Config.js";

export const calculateDPS = async (data) => {
  const weights = await Config.findOne();

  return (
    weights.cropQuality * data.cropQuality +
    weights.demand * data.demand +
    weights.price * data.price -
    weights.weatherRisk * data.weatherRisk -
    weights.distance * data.distance +
    weights.transportAvailability * data.transportAvailability -
    weights.storageAvailability * data.storageAvailability 
  );
};