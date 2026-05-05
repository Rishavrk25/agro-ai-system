import axios from "axios";
import { fetchLatestPrices } from "../services/mandiService.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { createClient } from "redis";

let redisClient = null;
let isRedisConnected = false;

(async () => {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URI || "redis://localhost:6379"
    });

    redisClient.on("error", (err) => {
      console.warn("Redis connection error (Caching disabled):", err.message);
      isRedisConnected = false;
    });

    redisClient.on("ready", () => {
      console.log("Redis connected successfully (Caching enabled)");
      isRedisConnected = true;
    });

    await redisClient.connect();
  } catch (err) {
    console.warn("Failed to connect to Redis:", err.message);
    isRedisConnected = false;
  }
})();

const TARGET_COMMODITIES = [
  "Wheat", "Rice", "Maize", "Bajra", "Gram", "Soybean",
  "Cotton", "Groundnut", "Mustard", "Onion", "Potato", "Tomato"
];

export const getPrices = async (req, res) => {
  try {
    const CACHE_KEY = "latest_market_prices";

    // 1. Try to get from Cache
    if (isRedisConnected && redisClient) {
      try {
        const cachedPrices = await redisClient.get(CACHE_KEY);
        if (cachedPrices) {
          console.log("Cache hit for market prices");
          return successResponse(res, { prices: JSON.parse(cachedPrices) }, "Latest prices fetched successfully (Cached)", 200);
        }
      } catch (cacheErr) {
        console.error("Redis get error:", cacheErr);
      }
    }

    console.log("Cache miss for market prices, fetching from API...");

    const records = await fetchLatestPrices(2000); // Fetch latest 2000 records

    // Aggregate by commodity
    const commodityMap = {};
    
    TARGET_COMMODITIES.forEach(c => {
      commodityMap[c] = { total: 0, count: 0, min: Infinity, max: -Infinity };
    });

    for (const record of records) {
      // Find a matching target commodity (sometimes the API returns strings like 'Tomato' or 'Potato')
      const commName = record.commodity;
      if (!commName) continue;

      const target = TARGET_COMMODITIES.find(c => commName.toLowerCase().includes(c.toLowerCase()));
      
      if (target) {
        const price = Number(record.modal_price);
        if (!isNaN(price) && price > 0) {
          commodityMap[target].total += price;
          commodityMap[target].count += 1;
          if (price < commodityMap[target].min) commodityMap[target].min = price;
          if (price > commodityMap[target].max) commodityMap[target].max = price;
        }
      }
    }

    const prices = TARGET_COMMODITIES.map(c => {
      const data = commodityMap[c];
      const avgPrice = data.count > 0 ? Math.round(data.total / data.count) : 0;
      
      // We don't have historical data to compute true "change". 
      // Generate a small deterministic mock change based on the commodity name length so it stays consistent per session.
      const mockChange = ((c.length * 7) % 11) - 4; // range roughly -4 to +6

      return {
        name: c,
        price: avgPrice,
        change: mockChange,
        min: data.min !== Infinity ? data.min : 0,
        max: data.max !== -Infinity ? data.max : 0,
      };
    }).filter(c => c.price > 0);

    // 3. Save to Cache
    if (isRedisConnected && redisClient) {
      try {
        // Cache for 1 hour (3600 seconds)
        await redisClient.setEx(CACHE_KEY, 3600, JSON.stringify(prices));
        console.log("Prices cached successfully");
      } catch (cacheErr) {
        console.error("Redis set error:", cacheErr);
      }
    }

    return successResponse(res, { prices }, "Latest prices fetched successfully", 200);
  } catch (err) {
    console.error("Price fetch error:", err);
    return errorResponse(res, "Failed to fetch prices", err.message, 500);
  }
};
