import axios from "axios";

export const getWeather = async (req, res) => {
  try {
    const { city, lat, lon } = req.query;
    
    if (!city && (!lat || !lon)) {
      return res.status(400).json({ success: false, message: "City or Lat/Lon is required" });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    
    let currentUrl = "";
    let forecastUrl = "";

    if (lat && lon) {
      currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
      currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    }
    
    // Fetch current weather
    const currentRes = await axios.get(currentUrl);
    
    // Fetch 5-day forecast
    const forecastRes = await axios.get(forecastUrl);

    res.status(200).json({
      success: true,
      current: currentRes.data,
      forecast: forecastRes.data,
    });
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch weather data" });
  }
};
