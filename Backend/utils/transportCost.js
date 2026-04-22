export const calculateTransportCost = (distanceKm, transportAvailability) => {
  const baseCostPerKm = 15;
  const availabilityFactor = 1 + (100 - transportAvailability) / 100;
  return Math.round(distanceKm * baseCostPerKm * availabilityFactor);
};