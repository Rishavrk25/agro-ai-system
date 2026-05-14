import { predictPrice, predictDemand, trainModels } from './services/predictionService.js';

async function test() {
  await trainModels(); // Wait for training to complete
  const dpsInput = {
    cropQuality: 80,
    price: 3000,
    demand: 60,
    weatherRisk: 0.2,
    distance: 100,
    transportAvailability: 80,
    storageAvailability: 80,
  };
  
  console.log("Input:", dpsInput);
  console.log("Predicted Price:", predictPrice(dpsInput));
  console.log("Predicted Demand:", predictDemand(dpsInput));
}

test();
