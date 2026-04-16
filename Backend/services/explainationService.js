export const getExplanation = (data) => {
  const reason = [];
  if (data.weatherRisk > 60) {
    reason.push("High weather risk");
  }
  if (data.price > 50) {
    reason.push("Good market price");
  }
  if (data.demand > 60) {
    reason.push("High demand");
  }
  if (data.storageAvailability < 30) {
    reason.push("Low storage availability");
  }
  if (data.storageAvailability > 70) {
    reason.push("Sufficient storage available");
  }
  const explanation = reason.join(", ");
  return explanation;
};
