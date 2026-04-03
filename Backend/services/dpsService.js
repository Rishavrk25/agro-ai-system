export const calculateDPS = (data) => {
  return (
    0.3 * data.cropQuality +
    0.25 * data.demand +
    0.2 * data.price -
    0.15 * data.weatherRisk -
    0.1 * data.distance +
    0.1 * data.transportAvailability
  );
};