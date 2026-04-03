export const predictPrice = ({ price, demand, weatherRisk }) => {
  let predicted = price;

  // demand increases price
  predicted += demand * 0.1;

  // bad weather → less supply → price increases
  predicted += weatherRisk * 0.05;

  // randomness
  predicted += Math.random() * 4 - 2;

  return Math.round(predicted);
};

export const predictDemand = ({ demand, weatherRisk }) => {
  if (weatherRisk > 70) return demand - 15;
  if (weatherRisk > 40) return demand - 5;
  return demand + 10;
};