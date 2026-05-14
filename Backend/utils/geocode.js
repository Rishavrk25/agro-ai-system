import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export const getCoordinates = async (village, district, state) => {
  try {
    const apiKey = process.env.OPENCAGE_API_KEY;

    const query = `${village}, ${district}, ${state}, India`;

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}`;

    const response = await axios.get(url, { httpsAgent });

    if (!response.data.results.length) {
      throw new Error("Location not found");
    }

    const { lat, lng } = response.data.results[0].geometry;

    return { latitude: lat, longitude: lng };

  } catch (error) {
    // Silenced: callers handle null gracefully
    return null;
  }
};