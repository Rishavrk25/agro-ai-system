export const getDecision = (dps) => {
  return dps > 50 ? "Transport Now" : "Delay Shipment";
};