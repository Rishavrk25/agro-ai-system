import axios from "axios";
import { successResponse, errorResponse } from "../utils/response.js";

export const reverseGeocode = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return errorResponse(res, "Missing parameters", "Latitude and Longitude are required", 400);
    }

    const apiKey = process.env.OPENCAGE_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    const response = await axios.get(url);

    if (!response.data.results.length) {
      return errorResponse(res, "Location not found", "Could not reverse geocode coordinates", 404);
    }

    const components = response.data.results[0].components;
    
    // OpenCage returns various components, we try to extract village/town, district, state
    const village = components.village || components.town || components.city || components.suburb || components.neighbourhood || "";
    const district = components.state_district || components.county || "";
    const state = components.state || "";

    return successResponse(res, {
      village,
      district: district.replace(" District", ""),
      state
    }, "Location detected successfully", 200);

  } catch (error) {
    console.error("Reverse geocoding error:", error.message);
    return errorResponse(res, "Failed to detect location", error.message, 500);
  }
};
