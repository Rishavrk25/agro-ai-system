import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  CloudSun, Search, Droplets, Wind, Thermometer, Sun, Cloud, CloudRain,
  MapPin, AlertTriangle, CheckCircle, Eye
} from "lucide-react";

const currentWeather = { location: "New Delhi", temperature: 32, condition: "Partly Cloudy", humidity: 65, windSpeed: 12, rainfall: 0, uvIndex: 7 };

const forecast = [
  { day: "Today", high: 34, low: 24, condition: "sunny", rain: 10 },
  { day: "Tomorrow", high: 33, low: 23, condition: "cloudy", rain: 20 },
  { day: "Wed", high: 31, low: 22, condition: "rainy", rain: 70 },
  { day: "Thu", high: 30, low: 21, condition: "rainy", rain: 80 },
  { day: "Fri", high: 32, low: 23, condition: "cloudy", rain: 30 },
  { day: "Sat", high: 33, low: 24, condition: "sunny", rain: 5 },
  { day: "Sun", high: 34, low: 25, condition: "sunny", rain: 0 },
];

const farmingAdvice = [
  {
    title: "Irrigation Advisory",
    titleHindi: "सिंचाई सलाह",
    message: "Good time for irrigation. Low rainfall expected in next 2 days.",
    type: "success",
    emoji: "💧",
  },
  {
    title: "Crop Protection",
    titleHindi: "फसल सुरक्षा",
    message: "Rain expected mid-week. Consider applying fungicide before rainfall.",
    type: "warning",
    emoji: "⚠️",
  },
  {
    title: "Harvest Window",
    titleHindi: "कटाई का समय",
    message: "Clear weather on weekend. Good time for harvesting if crops are ready.",
    type: "success",
    emoji: "🌾",
  },
];

function WeatherIcon({ condition, size = 40 }) {
  const style = { width: size, height: size };
  switch (condition) {
    case "sunny": return <Sun style={{ ...style, color: "#f59e0b" }} />;
    case "cloudy": return <Cloud style={{ ...style, color: "#9ca3af" }} />;
    case "rainy": return <CloudRain style={{ ...style, color: "#3b82f6" }} />;
    default: return <CloudSun style={{ ...style, color: "#16a34a" }} />;
  }
}

function getRainColor(rain) {
  if (rain >= 70) return "#3b82f6";
  if (rain >= 40) return "#60a5fa";
  if (rain >= 20) return "#93c5fd";
  return "#bfdbfe";
}

export default function Weather() {
  const [location, setLocation] = useState(currentWeather.location);

  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1 }}>
        {/* Hero */}
        <section style={{
          position: "relative", overflow: "hidden",
          padding: "56px 0 48px",
          background: "linear-gradient(135deg, #0c4a6e 0%, #1e3a5f 40%, #2563eb 100%)",
          backgroundSize: "200% 200%", animation: "gradient-shift 8s ease infinite",
        }}>
          <div style={{
            position: "absolute", top: "-40px", right: "-40px", width: "280px", height: "280px",
            borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)", pointerEvents: "none",
          }} />
          {/* Floating weather icons */}
          <div style={{ position: "absolute", top: "20px", left: "8%", opacity: 0.12, animation: "float 4s ease-in-out infinite" }}>
            <Sun style={{ width: "48px", height: "48px", color: "#fbbf24" }} />
          </div>
          <div style={{ position: "absolute", bottom: "20px", right: "12%", opacity: 0.1, animation: "float 5s ease-in-out infinite", animationDelay: "1s" }}>
            <CloudRain style={{ width: "40px", height: "40px", color: "white" }} />
          </div>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "50px 50px", pointerEvents: "none",
          }} />

          <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px",
              borderRadius: "999px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(186,230,253,0.3)",
              color: "#bae6fd", fontSize: "13px", fontWeight: 600, marginBottom: "16px",
            }}>
              <CloudSun style={{ width: "13px", height: "13px" }} />
              Agricultural Weather Intelligence
            </div>
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "white",
              letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "12px",
            }}>
              Weather Forecast
            </h1>
            <p style={{ fontSize: "18px", color: "rgba(186,230,253,0.85)", fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 600, marginBottom: "8px" }}>
              मौसम का पूर्वानुमान
            </p>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", maxWidth: "500px", margin: "0 auto" }}>
              Plan your farming activities with accurate weather predictions
            </p>
          </div>
        </section>

        <section style={{ padding: "40px 0 64px", background: "#f8fdf8" }}>
          <div className="container">
            {/* Location Search */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "center", marginBottom: "36px" }}>
              <div style={{ position: "relative", flex: "1", maxWidth: "420px", minWidth: "200px" }}>
                <MapPin style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#9ca3af" }} />
                <input
                  placeholder="Enter your location..."
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  style={{
                    width: "100%", paddingLeft: "42px", paddingRight: "16px", height: "48px",
                    borderRadius: "14px", border: "1.5px solid #d1fae5", background: "white",
                    fontSize: "15px", color: "#0f1f0f", outline: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "#2563eb"}
                  onBlur={e => e.target.style.borderColor = "#d1fae5"}
                />
              </div>
              <button
                style={{
                  display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px",
                  borderRadius: "14px", background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                  color: "white", fontSize: "15px", fontWeight: 600, cursor: "pointer",
                  border: "none", boxShadow: "0 4px 12px rgba(37,99,235,0.3)", transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(37,99,235,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(37,99,235,0.3)"; }}
              >
                <Search style={{ width: "16px", height: "16px" }} />
                Get Weather
              </button>
            </div>

            {/* Current Weather Card */}
            <div style={{ maxWidth: "800px", margin: "0 auto 40px" }}>
              <div style={{
                background: "linear-gradient(135deg, #1e3a8a, #1d4ed8, #2563eb)",
                borderRadius: "24px",
                padding: "32px",
                boxShadow: "0 12px 40px rgba(37,99,235,0.3)",
                color: "white",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
                <div style={{
                  display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px",
                  position: "relative", zIndex: 1,
                }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px", opacity: 0.75 }}>
                      <MapPin style={{ width: "14px", height: "14px" }} />
                      <span style={{ fontSize: "14px" }}>{currentWeather.location}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
                      <span style={{ fontSize: "72px", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>{currentWeather.temperature}°</span>
                      <WeatherIcon condition="cloudy" size={56} />
                    </div>
                    <p style={{ fontSize: "18px", opacity: 0.8 }}>{currentWeather.condition}</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {[
                      { icon: <Droplets style={{ width: "18px", height: "18px", color: "#93c5fd" }} />, label: "Humidity", value: `${currentWeather.humidity}%` },
                      { icon: <Wind style={{ width: "18px", height: "18px", color: "#d1d5db" }} />, label: "Wind", value: `${currentWeather.windSpeed} km/h` },
                      { icon: <CloudRain style={{ width: "18px", height: "18px", color: "#93c5fd" }} />, label: "Rainfall", value: `${currentWeather.rainfall} mm` },
                      { icon: <Eye style={{ width: "18px", height: "18px", color: "#fcd34d" }} />, label: "UV Index", value: `${currentWeather.uvIndex}` },
                    ].map((item, i) => (
                      <div key={i} style={{ background: "rgba(255,255,255,0.1)", borderRadius: "14px", padding: "12px 16px", border: "1px solid rgba(255,255,255,0.15)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                          {item.icon}
                          <span style={{ fontSize: "12px", opacity: 0.7 }}>{item.label}</span>
                        </div>
                        <p style={{ fontSize: "18px", fontWeight: 700 }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f1f0f", marginBottom: "16px", letterSpacing: "-0.02em" }}>
                7-Day Forecast
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "12px" }}>
                {forecast.map((day, i) => (
                  <div
                    key={day.day}
                    style={{
                      background: i === 0 ? "linear-gradient(135deg, #1d4ed8, #2563eb)" : "white",
                      borderRadius: "18px",
                      padding: "18px 12px",
                      textAlign: "center",
                      border: "1px solid rgba(0,0,0,0.06)",
                      boxShadow: i === 0 ? "0 6px 20px rgba(37,99,235,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                      transition: "all 0.2s ease",
                      color: i === 0 ? "white" : "#0f1f0f",
                    }}
                    onMouseEnter={e => { if (i !== 0) { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)"; } }}
                    onMouseLeave={e => { if (i !== 0) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; } }}
                  >
                    <p style={{ fontSize: "12px", fontWeight: 600, opacity: i === 0 ? 0.85 : 0.6, marginBottom: "10px" }}>{day.day}</p>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                      <WeatherIcon condition={day.condition} size={32} />
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                      <span>{day.high}°</span>
                      <span style={{ opacity: 0.5, marginLeft: "4px", fontWeight: 500 }}>{day.low}°</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                      <Droplets style={{ width: "11px", height: "11px", color: getRainColor(day.rain) }} />
                      <span style={{ fontSize: "11px", opacity: 0.7, fontWeight: 600 }}>{day.rain}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Farming Advisory */}
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f1f0f", marginBottom: "4px", letterSpacing: "-0.02em" }}>
                Farming Advisory
              </h2>
              <p style={{ fontSize: "14px", color: "#9ca3af", fontFamily: "'Noto Sans Devanagari', sans-serif", marginBottom: "20px" }}>कृषि सलाह</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                {farmingAdvice.map((advice, i) => (
                  <div
                    key={i}
                    style={{
                      background: "white",
                      borderRadius: "20px",
                      padding: "24px",
                      border: `1px solid ${advice.type === "warning" ? "rgba(234,179,8,0.2)" : "rgba(22,163,74,0.15)"}`,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.04)"; }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
                      <div style={{
                        width: "42px", height: "42px", borderRadius: "12px",
                        background: advice.type === "warning" ? "rgba(234,179,8,0.1)" : "rgba(22,163,74,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0,
                      }}>
                        {advice.emoji}
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                          {advice.type === "warning"
                            ? <AlertTriangle style={{ width: "15px", height: "15px", color: "#d97706" }} />
                            : <CheckCircle style={{ width: "15px", height: "15px", color: "#16a34a" }} />
                          }
                          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f1f0f" }}>{advice.title}</h3>
                        </div>
                        <p style={{ fontSize: "12px", color: advice.type === "warning" ? "#d97706" : "#16a34a", fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 600 }}>
                          {advice.titleHindi}
                        </p>
                      </div>
                    </div>
                    <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65 }}>{advice.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
