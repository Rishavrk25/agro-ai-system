import axios from "axios";

export const getWeatherRisk = async (lat, lon) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
      console.error("Weather API key not configured");
      return 50; // fallback risk
    }

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
    );

    const weather = res.data;
    console.log(weather);
    let risk = 30; // base risk

    // 🌧️ Rain check
    if (weather.weather[0].main === "Rain") {
      risk += 40;
    }

    // 🌡️ Temperature check
    const temp = weather.main.temp; // Already in Celsius with units=metric

    if (temp > 35) {
      risk += 30;
    }

    if (temp < 10) {
      risk += 20;
    }
    const humidity = weather.main.humidity;
    const wind = weather.wind.speed;

    if (humidity > 80) risk += 10;
    if (wind > 10) risk += 10;

    return Math.min(risk, 100); // max 100
  } catch (err) {
    console.error("Weather API error:", err.message);
    return 50; // fallback risk
  }
};
