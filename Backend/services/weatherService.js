import axios from "axios";

export const getWeatherRisk = async (city) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
    );

    const weather = res.data;

    let risk = 30; // base risk

    // 🌧️ Rain check
    if (weather.weather[0].main === "Rain") {
      risk += 40;
    }

    // 🌡️ Temperature check
    const temp = weather.main.temp - 273.15; // Kelvin → Celsius

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
