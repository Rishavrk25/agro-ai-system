import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { RandomForestRegression } from 'ml-random-forest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ML Models
let priceModel = null;
let demandModel = null;
let isTraining = false;

// Random Forest Configuration
const rfOptions = {
  seed: 42,
  maxFeatures: 3, // out of 7 features
  replacement: true,
  nEstimators: 20, // fast enough for server start
};

export async function trainModels() {
  if (isTraining || (priceModel && demandModel)) return;
  isTraining = true;

  try {
    console.log('⏳ Starting ML Model Training...');
    const dataPath = path.join(__dirname, '../scripts/synthetic_training_data.json');
    
    if (!fs.existsSync(dataPath)) {
      console.warn('⚠️ Training data not found. Predictions will fallback to heuristics.');
      isTraining = false;
      return;
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Prepare feature matrix (X) and target vectors (y)
    // Features: [cropQuality, price, demand, weatherRisk, distance, transportAvailability, storageAvailability]
    const X = [];
    const yPrice = [];
    const yDemand = [];

    for (const row of data) {
      X.push([
        row.cropQuality,
        row.price,
        row.demand,
        row.weatherRisk,
        row.distance,
        row.transportAvailability,
        row.storageAvailability
      ]);
      yPrice.push(row.futurePrice);
      yDemand.push(row.futureDemand);
    }

    console.log(`🧠 Training Price Model with ${X.length} records...`);
    priceModel = new RandomForestRegression(rfOptions);
    priceModel.train(X, yPrice);

    console.log(`🧠 Training Demand Model with ${X.length} records...`);
    demandModel = new RandomForestRegression(rfOptions);
    demandModel.train(X, yDemand);

    console.log('✅ ML Models trained successfully.');
  } catch (error) {
    console.error('❌ Error training ML models:', error);
  } finally {
    isTraining = false;
  }
}

// Convert input object to feature array matching training order
function extractFeatures(input) {
  return [
    input.cropQuality,
    input.price, // current price
    input.demand, // current demand proxy
    input.weatherRisk,
    input.distance,
    input.transportAvailability,
    input.storageAvailability
  ];
}

export function predictPrice(input) {
  if (!priceModel) {
    // Fallback if model isn't trained
    const riskPremium = input.weatherRisk * 0.1 * input.price;
    return input.price + riskPremium;
  }

  const features = extractFeatures(input);
  const prediction = priceModel.predict([features]);
  return Math.max(0, prediction[0]); // ensure non-negative
}

export function predictDemand(input) {
  if (!demandModel) {
    // Fallback if model isn't trained
    return Math.min(100, input.demand + (input.cropQuality / 10));
  }

  const features = extractFeatures(input);
  const prediction = demandModel.predict([features]);
  return Math.max(1, Math.min(100, prediction[0])); // clamp 1-100
}

// Kick off training immediately when service is loaded
trainModels();