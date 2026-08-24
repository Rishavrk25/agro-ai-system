import axios from "axios";

const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";
const BASE_URL = `https://api.data.gov.in/resource/${RESOURCE_ID}`;

/**
 * Fetch current daily mandi prices from the data.gov.in Agmarknet API.
 *
 * @param {string} state  - e.g., "Uttar Pradesh"
 * @param {string} commodity - e.g., "Wheat"
 * @returns {Array} list of mandi records with prices
 *
 * Each record shape:
 * {
 *   market: "Agra",
 *   district: "Agra",
 *   state: "Uttar Pradesh",
 *   commodity: "Wheat",
 *   variety: "Desi",
 *   arrival_date: "22/04/2026",
 *   min_price: "2200",
 *   max_price: "2500",
 *   modal_price: "2350"
 * }
 */
export const fetchMandiPrices = async (state, commodity) => {
  const apiKey = process.env.DATA_GOV_API_KEY;

  if (!apiKey) {
    throw new Error("DATA_GOV_API_KEY is not configured in .env");
  }

  try {
    const allRecords = [];
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    // NOTE: data.gov.in `filters[state]` does not work reliably — we fetch
    // all commodity records nationwide and apply distance filtering later.
    while (hasMore) {
      const response = await axios.get(BASE_URL, {
        params: {
          "api-key": apiKey,
          format: "json",
          limit,
          offset,
          "filters[commodity]": commodity,
        },
      });

      const { records, total } = response.data;

      if (!records || records.length === 0) {
        break;
      }

      allRecords.push(...records);
      offset += limit;

      // Stop if we've fetched everything or hit the 2000-record safety cap
      hasMore = allRecords.length < total && allRecords.length < 2000;
    }

    console.log(
      `📦 Fetched ${allRecords.length} mandi records for ${commodity} nationwide`,
    );

    return allRecords;
  } catch (err) {
    console.error("Mandi API error:", err.message);
    throw new Error(`Failed to fetch mandi prices: ${err.message}`);
  }
};

export const fetchLatestPrices = async (maxRecords = 1000) => {
  const apiKey = process.env.DATA_GOV_API_KEY;

  if (!apiKey) {
    throw new Error("DATA_GOV_API_KEY is not configured in .env");
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        "api-key": apiKey,
        format: "json",
        limit: maxRecords,
      },
    });

    return response.data.records || [];
  } catch (err) {
    console.error("Mandi API error:", err.message);
    throw new Error(`Failed to fetch latest prices: ${err.message}`);
  }
};
