import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generates synthetic historical data for training ML models
function generateData(numRecords = 5000) {
  const data = [];

  for (let i = 0; i < numRecords; i++) {
    const cropQuality = Math.floor(Math.random() * 100) + 1; // 1-100
    const currentPrice = Math.floor(Math.random() * 4000) + 1000; // 1000-5000
    const currentDemand = Math.floor(Math.random() * 100) + 1; // 1-100
    const weatherRisk = Math.random(); // 0-1
    const distance = Math.floor(Math.random() * 490) + 10; // 10-500
    const transportAvailability = Math.floor(Math.random() * 100) + 1; // 1-100
    const storageAvailability = Math.floor(Math.random() * 100) + 1; // 1-100

    // Logic for Future Price (1 week horizon)
    // - High demand increases price
    // - High weather risk increases price (shortage fear)
    // - High transport/storage availability slightly decreases price (efficient logistics)
    let priceChangePercent = (currentDemand / 100) * 0.10; // up to 10% increase from demand
    priceChangePercent += weatherRisk * 0.15; // up to 15% increase from weather risk
    priceChangePercent -= (transportAvailability / 100) * 0.05; // up to 5% decrease
    priceChangePercent -= (storageAvailability / 100) * 0.05; // up to 5% decrease
    
    // Add some random noise (-2% to +2%)
    priceChangePercent += (Math.random() * 0.04) - 0.02;

    const futurePrice = Math.round(currentPrice * (1 + priceChangePercent));

    // Logic for Future Demand (1 week horizon)
    // - High price decreases demand
    // - High quality increases demand
    let demandChange = 0;
    if (currentPrice > 3500) demandChange -= 10;
    if (currentPrice < 2000) demandChange += 10;
    if (cropQuality > 80) demandChange += 15;
    if (cropQuality < 40) demandChange -= 15;

    // Add random noise
    demandChange += Math.floor(Math.random() * 10) - 5;

    let futureDemand = currentDemand + demandChange;
    // Clamp between 1 and 100
    futureDemand = Math.max(1, Math.min(100, futureDemand));

    data.push({
      cropQuality,
      price: currentPrice,
      demand: currentDemand,
      weatherRisk,
      distance,
      transportAvailability,
      storageAvailability,
      futurePrice,
      futureDemand
    });
  }

  return data;
}

const data = generateData(2000); // 2k records for faster training
const filePath = path.join(__dirname, 'synthetic_training_data.json');
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log(`Generated ${data.length} synthetic records at ${filePath}`);
