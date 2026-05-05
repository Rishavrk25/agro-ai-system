import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrendingUp, TrendingDown, Search, Wheat, RefreshCw, BarChart3, Activity } from "lucide-react";

const defaultCommoditiesInfo = [
  { name: "Wheat", hindi: "गेहूं", unit: "per quintal", emoji: "🌾" },
  { name: "Rice", hindi: "चावल", unit: "per quintal", emoji: "🍚" },
  { name: "Maize", hindi: "मक्का", unit: "per quintal", emoji: "🌽" },
  { name: "Bajra", hindi: "बाजरा", unit: "per quintal", emoji: "🌿" },
  { name: "Gram", hindi: "चना", unit: "per quintal", emoji: "🫘" },
  { name: "Soybean", hindi: "सोयाबीन", unit: "per quintal", emoji: "🌱" },
  { name: "Cotton", hindi: "कपास", unit: "per quintal", emoji: "☁️" },
  { name: "Groundnut", hindi: "मूंगफली", unit: "per quintal", emoji: "🥜" },
  { name: "Mustard", hindi: "सरसों", unit: "per quintal", emoji: "🟡" },
  { name: "Onion", hindi: "प्याज", unit: "per quintal", emoji: "🧅" },
  { name: "Potato", hindi: "आलू", unit: "per quintal", emoji: "🥔" },
  { name: "Tomato", hindi: "टमाटर", unit: "per quintal", emoji: "🍅" },
];

function StatCard({ icon, value, label, color, bg }) {
  return (
    <div style={{
      background: "white",
      borderRadius: "16px",
      padding: "20px",
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      transition: "all 0.2s ease",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
    >
      <div>
        <p style={{ fontSize: "13px", color: "#9ca3af", fontWeight: 500, marginBottom: "4px" }}>{label}</p>
        <p style={{ fontSize: "26px", fontWeight: 800, color: color || "#0f1f0f", letterSpacing: "-0.02em" }}>{value}</p>
      </div>
      <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: bg, display: "flex", alignItems: "center", justifyContent: "center", color: color }}>
        {icon}
      </div>
    </div>
  );
}

export default function Prices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pricesData, setPricesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    setIsRefreshing(true);
    try {
      const res = await axios.get("http://localhost:5000/api/prices");
      if (res.data.success) {
        const fetchedPrices = res.data.data.prices;
        const merged = fetchedPrices.map(fp => {
          const info = defaultCommoditiesInfo.find(i => i.name === fp.name);
          return {
            ...fp,
            hindi: info?.hindi || "",
            unit: info?.unit || "per quintal",
            emoji: info?.emoji || "📦"
          };
        });
        setPricesData(merged);
      }
    } catch (error) {
      console.error("Failed to fetch prices:", error);
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleRefresh = () => {
    fetchPrices();
  };

  const filtered = pricesData.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.hindi.includes(searchTerm)
  );
  const topGainers = [...pricesData].filter(c => c.change > 0).sort((a, b) => b.change - a.change).slice(0, 3);
  const topLosers = [...pricesData].filter(c => c.change < 0).sort((a, b) => a.change - b.change).slice(0, 3);

  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1 }}>
        {/* Hero */}
        <section style={{
          position: "relative", overflow: "hidden",
          padding: "56px 0 48px",
          background: "linear-gradient(135deg, #052e16 0%, #14532d 40%, #16a34a 100%)",
          backgroundSize: "200% 200%", animation: "gradient-shift 8s ease infinite",
        }}>
          <div style={{
            position: "absolute", top: "-60px", right: "-60px", width: "300px", height: "300px",
            borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "-40px", left: "10%",
            width: "200px", height: "200px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "50px 50px", pointerEvents: "none",
          }} />
          <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px",
              borderRadius: "999px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(134,239,172,0.3)",
              color: "#86efac", fontSize: "13px", fontWeight: 600, marginBottom: "16px",
            }}>
              <Activity style={{ width: "13px", height: "13px" }} />
              Live Market Data
            </div>
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "white",
              letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "12px",
            }}>
              Today's Market Prices
            </h1>
            <p style={{ fontSize: "18px", color: "rgba(134,239,172,0.85)", fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 600, marginBottom: "8px" }}>
              आज के बाजार भाव
            </p>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", maxWidth: "500px", margin: "0 auto" }}>
              Real-time commodity prices from mandis across India
            </p>
          </div>
        </section>

        <section style={{ padding: "40px 0 64px", background: "#f8fdf8" }}>
          <div className="container">
            {/* Search + Refresh Row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
              <div style={{ position: "relative", flex: "1", maxWidth: "400px", minWidth: "200px" }}>
                <Search style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#9ca3af" }} />
                <input
                  placeholder="Search commodity... / फसल खोजें"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%", paddingLeft: "42px", paddingRight: "16px", height: "44px",
                    borderRadius: "12px", border: "1.5px solid #d1fae5",
                    background: "white", fontSize: "14px", color: "#0f1f0f",
                    outline: "none", transition: "border-color 0.2s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                  onFocus={e => e.target.style.borderColor = "#16a34a"}
                  onBlur={e => e.target.style.borderColor = "#d1fae5"}
                />
              </div>
              <button
                onClick={handleRefresh}
                style={{
                  display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px",
                  borderRadius: "12px", border: "1.5px solid #d1fae5", background: "white",
                  fontSize: "14px", fontWeight: 600, color: "#374151", cursor: "pointer",
                  transition: "all 0.2s ease", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#86efac"; e.currentTarget.style.color = "#16a34a"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#d1fae5"; e.currentTarget.style.color = "#374151"; }}
              >
                <RefreshCw style={{ width: "15px", height: "15px", animation: isRefreshing ? "spin 1s linear infinite" : "none" }} />
                Refresh Prices
              </button>
            </div>

            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px", marginBottom: "32px" }}>
              <StatCard icon={<Wheat style={{ width: "22px", height: "22px" }} />} value={pricesData.length} label="Total Commodities" color="#16a34a" bg="rgba(22,163,74,0.08)" />
              <StatCard icon={<TrendingUp style={{ width: "22px", height: "22px" }} />} value={pricesData.filter(c => c.change > 0).length} label="Price Rising ↑" color="#16a34a" bg="rgba(22,163,74,0.08)" />
              <StatCard icon={<TrendingDown style={{ width: "22px", height: "22px" }} />} value={pricesData.filter(c => c.change < 0).length} label="Price Falling ↓" color="#dc2626" bg="rgba(220,38,38,0.08)" />
              <StatCard icon={<RefreshCw style={{ width: "22px", height: "22px" }} />} value={loading ? "Loading..." : "Live"} label="Data Status" color="#0284c7" bg="rgba(2,132,199,0.08)" />
            </div>

            {/* Gainers / Losers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginBottom: "32px" }}>
              {/* Top Gainers */}
              <div style={{ background: "white", borderRadius: "20px", border: "1px solid rgba(22,163,74,0.12)", boxShadow: "0 4px 16px rgba(0,0,0,0.04)", overflow: "hidden" }}>
                <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid rgba(22,163,74,0.08)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <TrendingUp style={{ width: "18px", height: "18px", color: "#16a34a" }} />
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "#0f1f0f" }}>Top Gainers</span>
                  <span style={{ marginLeft: "auto", fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "999px", background: "#dcfce7", color: "#16a34a" }}>Today</span>
                </div>
                <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {topGainers.map(c => (
                    <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: "12px", background: "#f0fdf4", border: "1px solid rgba(22,163,74,0.1)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "20px" }}>{c.emoji}</span>
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f1f0f" }}>{c.name}</p>
                          <p style={{ fontSize: "12px", color: "#9ca3af" }}>{c.hindi}</p>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: "15px", fontWeight: 700, color: "#0f1f0f" }}>₹{c.price.toLocaleString()}</p>
                        <p style={{ fontSize: "12px", fontWeight: 700, color: "#16a34a" }}>+{c.change}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Losers */}
              <div style={{ background: "white", borderRadius: "20px", border: "1px solid rgba(220,38,38,0.1)", boxShadow: "0 4px 16px rgba(0,0,0,0.04)", overflow: "hidden" }}>
                <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid rgba(220,38,38,0.08)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <TrendingDown style={{ width: "18px", height: "18px", color: "#dc2626" }} />
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "#0f1f0f" }}>Top Losers</span>
                  <span style={{ marginLeft: "auto", fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "999px", background: "#fee2e2", color: "#dc2626" }}>Today</span>
                </div>
                <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {topLosers.map(c => (
                    <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: "12px", background: "#fff5f5", border: "1px solid rgba(220,38,38,0.08)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "20px" }}>{c.emoji}</span>
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f1f0f" }}>{c.name}</p>
                          <p style={{ fontSize: "12px", color: "#9ca3af" }}>{c.hindi}</p>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: "15px", fontWeight: 700, color: "#0f1f0f" }}>₹{c.price.toLocaleString()}</p>
                        <p style={{ fontSize: "12px", fontWeight: 700, color: "#dc2626" }}>{c.change}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Full Price Table */}
            <div style={{ background: "white", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "10px" }}>
                <BarChart3 style={{ width: "18px", height: "18px", color: "#16a34a" }} />
                <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f1f0f" }}>All Commodity Prices</h2>
                <span style={{ marginLeft: "auto", fontSize: "13px", color: "#9ca3af" }}>{filtered.length} commodities</span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ background: "#f8fdf8" }}>
                      {["Commodity", "Hindi Name", "Price (₹)", "Change", "Trend"].map((h, i) => (
                        <th key={i} style={{ padding: "12px 20px", textAlign: i > 1 ? "right" : "left", fontWeight: 700, color: "#374151", fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c, i) => (
                      <tr key={c.name} style={{ borderTop: "1px solid rgba(0,0,0,0.05)", transition: "background 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#f0fdf4"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontSize: "18px" }}>{c.emoji}</span>
                          <span style={{ fontWeight: 600, color: "#0f1f0f" }}>{c.name}</span>
                        </td>
                        <td style={{ padding: "14px 20px", color: "#9ca3af" }}>{c.hindi}</td>
                        <td style={{ padding: "14px 20px", textAlign: "right", fontWeight: 700, color: "#0f1f0f" }}>₹{c.price.toLocaleString()}</td>
                        <td style={{ padding: "14px 20px", textAlign: "right", fontWeight: 700, color: c.change > 0 ? "#16a34a" : c.change < 0 ? "#dc2626" : "#9ca3af" }}>
                          {c.change > 0 ? "+" : ""}{c.change}%
                        </td>
                        <td style={{ padding: "14px 20px", textAlign: "right" }}>
                          {c.change > 0 ? (
                            <TrendingUp style={{ display: "inline", width: "16px", height: "16px", color: "#16a34a" }} />
                          ) : c.change < 0 ? (
                            <TrendingDown style={{ display: "inline", width: "16px", height: "16px", color: "#dc2626" }} />
                          ) : (
                            <span style={{ color: "#9ca3af" }}>–</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div style={{ padding: "48px", textAlign: "center", color: "#9ca3af" }}>
                    <Wheat style={{ width: "40px", height: "40px", margin: "0 auto 12px", opacity: 0.4 }} />
                    <p style={{ fontSize: "15px", fontWeight: 600 }}>No results for "{searchTerm}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
