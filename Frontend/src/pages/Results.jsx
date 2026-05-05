import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MandiResultCard } from "@/components/MandiResultCard";
import { ResultsSummary } from "@/components/ResultsSummary";
import { ArrowLeft, MapPin, List, BarChart3, Loader2, RefreshCw, CheckCircle, Trophy } from "lucide-react";
import { recommendMandi } from "@/services/api";

export default function Results() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [results, setResults] = useState([]);
  const [selectedMandi, setSelectedMandi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("list");

  const fetchResults = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      const payload = {
        village: data.village, district: data.district, state: data.state,
        commodity: data.commodity, cropQuality: data.cropQuality,
        transportAvailability: data.transportAvailability,
        storageAvailability: data.storageAvailability, quantity: data.quantity,
      };
      const response = await recommendMandi(payload, data.maxRadius);
      const apiResults = response.data?.data?.allMandis || response.data?.allMandis || response.data?.recommendations || [];
      const mapped = apiResults.map((item, i) => ({
        rank: i + 1,
        mandiName: item.mandiName || item.mandi || `Mandi ${i + 1}`,
        district: item.district || data.district,
        distanceKm: Math.round(item.distanceKm || item.distance || 0),
        modalPrice: item.modalPrice || item.modal_price || 0,
        minPrice: item.minPrice || item.min_price || 0,
        maxPrice: item.maxPrice || item.max_price || 0,
        transportCost: Math.round(item.transportCost || item.transport_cost || 0),
        netProfit: Math.round(item.netProfit || item.net_profit || 0),
        dpsNow: Math.round(item.dpsNow || item.dps_now || item.dps || 0),
        dpsLater: Math.round(item.dpsLater || item.dps_later || 0),
        bestDPS: Math.round(item.bestDPS || item.best_dps || Math.max(item.dpsNow || 0, item.dpsLater || 0)),
        decision: item.decision || (item.dpsNow >= item.dpsLater ? "Transport Now" : "Delay Shipment"),
      }));
      setResults(mapped);
      if (mapped.length > 0) setSelectedMandi(mapped[0]);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem("mandiFormData");
    if (!storedData) { navigate("/find-mandi"); return; }
    const data = JSON.parse(storedData);
    setFormData(data);
    fetchResults(data);
  }, [navigate]);

  const handleSelectMandi = (mandi) => setSelectedMandi(mandi);
  const handleConfirmSelection = () => {
    if (selectedMandi && formData) {
      sessionStorage.setItem("selectedMandi", JSON.stringify(selectedMandi));
      navigate("/find-mandi/confirm");
    }
  };

  // Loading State
  if (isLoading || !formData) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
        <Header />
        <main style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg, #f0fdf4, #f8fdf8)",
        }}>
          <div style={{ textAlign: "center", padding: "48px" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "50%",
              background: "linear-gradient(135deg, #052e16, #16a34a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px", boxShadow: "0 8px 30px rgba(22,163,74,0.35)",
            }}>
              <Loader2 style={{ width: "36px", height: "36px", color: "white", animation: "spin 1s linear infinite" }} />
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#0f1f0f", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              Finding Best Mandis...
            </h2>
            <p style={{ fontSize: "15px", color: "#6b7280", marginBottom: "6px" }}>Analyzing prices, weather, and transport costs</p>
            <p style={{ fontSize: "14px", color: "#16a34a", fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 600 }}>
              सबसे अच्छी मंडी खोज रहे हैं...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
        <Header />
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fdf8" }}>
          <div style={{
            textAlign: "center", maxWidth: "420px", padding: "48px 32px",
            background: "white", borderRadius: "24px",
            border: "1px solid rgba(220,38,38,0.1)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f1f0f", marginBottom: "8px" }}>Something went wrong</h2>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>{error}</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => navigate("/find-mandi")}
                style={{
                  display: "flex", alignItems: "center", gap: "6px", padding: "10px 20px",
                  borderRadius: "12px", border: "1.5px solid #d1fae5", background: "white",
                  fontSize: "14px", fontWeight: 600, color: "#374151", cursor: "pointer",
                }}
              >
                <ArrowLeft style={{ width: "15px", height: "15px" }} /> Go Back
              </button>
              <button
                onClick={() => fetchResults(formData)}
                style={{
                  display: "flex", alignItems: "center", gap: "6px", padding: "10px 20px",
                  borderRadius: "12px", background: "linear-gradient(135deg, #15803d, #16a34a)",
                  border: "none", color: "white", fontSize: "14px", fontWeight: 600, cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(22,163,74,0.3)",
                }}
              >
                <RefreshCw style={{ width: "15px", height: "15px" }} /> Retry
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: "list", label: "List View", icon: <List style={{ width: "15px", height: "15px" }} /> },
    { id: "compare", label: "Compare", icon: <BarChart3 style={{ width: "15px", height: "15px" }} /> },
    { id: "map", label: "Map", icon: <MapPin style={{ width: "15px", height: "15px" }} /> },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1 }}>
        {/* Page Header */}
        <section style={{
          position: "relative", overflow: "hidden",
          padding: "32px 0 28px",
          background: "linear-gradient(135deg, #052e16 0%, #15803d 100%)",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px", pointerEvents: "none",
          }} />
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
              <div>
                <button
                  onClick={() => navigate("/find-mandi")}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px",
                    borderRadius: "8px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.75)", fontSize: "13px", fontWeight: 500, cursor: "pointer",
                    marginBottom: "12px", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                >
                  <ArrowLeft style={{ width: "14px", height: "14px" }} /> Back
                </button>
                <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", marginBottom: "6px" }}>
                  Mandi Recommendations
                </h1>
                <p style={{ fontSize: "14px", color: "rgba(134,239,172,0.8)" }}>
                  मंडी सिफारिशें — Best markets for your {formData.commodity}
                </p>
              </div>
              <button
                onClick={() => fetchResults(formData)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px",
                  borderRadius: "12px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
                  color: "white", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
              >
                <RefreshCw style={{ width: "15px", height: "15px" }} /> Refresh
              </button>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section style={{ padding: "24px 0", background: "#f0fdf4" }}>
          <div className="container">
            <ResultsSummary
              farmerLocation={{ village: formData.village, district: formData.district, state: formData.state }}
              commodity={formData.commodity}
              quantity={formData.quantity}
              searchRadius={formData.maxRadius}
              totalMandis={results.length}
            />
          </div>
        </section>

        {/* Tabs + Content */}
        <section style={{ padding: "24px 0 64px", background: "#f8fdf8" }}>
          <div className="container">
            {/* Tab Bar */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "24px" }}>
              <div style={{ display: "flex", background: "white", borderRadius: "14px", padding: "4px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px", padding: "9px 18px",
                      borderRadius: "10px", border: "none", fontSize: "14px", fontWeight: 600,
                      cursor: "pointer", transition: "all 0.2s ease",
                      background: activeTab === tab.id ? "linear-gradient(135deg, #15803d, #16a34a)" : "transparent",
                      color: activeTab === tab.id ? "white" : "#6b7280",
                      boxShadow: activeTab === tab.id ? "0 2px 8px rgba(22,163,74,0.3)" : "none",
                    }}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {selectedMandi && (
                <button
                  onClick={handleConfirmSelection}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px", padding: "10px 24px",
                    borderRadius: "12px", background: "linear-gradient(135deg, #15803d, #16a34a)",
                    border: "none", color: "white", fontSize: "14px", fontWeight: 700,
                    cursor: "pointer", boxShadow: "0 4px 14px rgba(22,163,74,0.35)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(22,163,74,0.45)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(22,163,74,0.35)"; }}
                >
                  <CheckCircle style={{ width: "16px", height: "16px" }} />
                  Confirm Selection
                </button>
              )}
            </div>

            {/* List View */}
            {activeTab === "list" && (
              results.length === 0 ? (
                <div style={{
                  background: "white", borderRadius: "20px", padding: "64px 32px", textAlign: "center",
                  border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                }}>
                  <MapPin style={{ width: "48px", height: "48px", color: "#d1d5db", margin: "0 auto 16px" }} />
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f1f0f", marginBottom: "8px" }}>No mandis found</h3>
                  <p style={{ fontSize: "14px", color: "#9ca3af" }}>Try increasing your search radius or changing your location.</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
                  {results.map((mandi) => (
                    <MandiResultCard
                      key={mandi.rank}
                      mandi={mandi}
                      quantity={formData.quantity}
                      commodity={formData.commodity}
                      isSelected={selectedMandi?.rank === mandi.rank}
                      onSelect={handleSelectMandi}
                    />
                  ))}
                </div>
              )
            )}

            {/* Compare View */}
            {activeTab === "compare" && (
              <div style={{
                background: "white", borderRadius: "20px", overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                    <thead>
                      <tr style={{ background: "#f0fdf4" }}>
                        {["Rank", "Mandi", "Distance", "Modal Price", "Transport", "Net Profit", "DPS", "Action"].map((h, i) => (
                          <th key={i} style={{ padding: "14px 16px", textAlign: i > 1 ? "right" : "left", fontWeight: 700, color: "#374151", fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((m) => (
                        <tr
                          key={m.rank}
                          style={{
                            borderTop: "1px solid rgba(0,0,0,0.05)",
                            background: selectedMandi?.rank === m.rank ? "rgba(22,163,74,0.04)" : "transparent",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={e => { if (selectedMandi?.rank !== m.rank) e.currentTarget.style.background = "#f8fdf8"; }}
                          onMouseLeave={e => { if (selectedMandi?.rank !== m.rank) e.currentTarget.style.background = "transparent"; }}
                        >
                          <td style={{ padding: "14px 16px" }}>
                            <span style={{
                              display: "inline-flex", width: "28px", height: "28px", alignItems: "center", justifyContent: "center",
                              borderRadius: "50%", fontSize: "12px", fontWeight: 800,
                              background: m.rank === 1 ? "linear-gradient(135deg, #15803d, #16a34a)" : "#f3f4f6",
                              color: m.rank === 1 ? "white" : "#374151",
                              boxShadow: m.rank === 1 ? "0 2px 8px rgba(22,163,74,0.3)" : "none",
                            }}>
                              {m.rank === 1 ? <Trophy style={{ width: "13px", height: "13px" }} /> : m.rank}
                            </span>
                          </td>
                          <td style={{ padding: "14px 16px" }}>
                            <p style={{ fontWeight: 700, color: "#0f1f0f" }}>{m.mandiName}</p>
                            <p style={{ fontSize: "12px", color: "#9ca3af" }}>{m.district}</p>
                          </td>
                          <td style={{ padding: "14px 16px", textAlign: "right", color: "#374151" }}>{m.distanceKm} km</td>
                          <td style={{ padding: "14px 16px", textAlign: "right", fontWeight: 700, color: "#0f1f0f" }}>₹{m.modalPrice?.toLocaleString()}</td>
                          <td style={{ padding: "14px 16px", textAlign: "right", fontWeight: 600, color: "#dc2626" }}>₹{m.transportCost?.toLocaleString()}</td>
                          <td style={{ padding: "14px 16px", textAlign: "right", fontWeight: 800, color: "#16a34a", fontSize: "15px" }}>₹{m.netProfit?.toLocaleString()}</td>
                          <td style={{ padding: "14px 16px", textAlign: "right", fontWeight: 700 }}>{m.bestDPS}</td>
                          <td style={{ padding: "14px 16px", textAlign: "center" }}>
                            <button
                              onClick={() => handleSelectMandi(m)}
                              style={{
                                padding: "7px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                                cursor: "pointer", border: "none", transition: "all 0.2s ease",
                                background: selectedMandi?.rank === m.rank ? "linear-gradient(135deg, #15803d, #16a34a)" : "white",
                                color: selectedMandi?.rank === m.rank ? "white" : "#374151",
                                boxShadow: selectedMandi?.rank === m.rank ? "0 2px 8px rgba(22,163,74,0.3)" : "0 1px 4px rgba(0,0,0,0.08)",
                                border: selectedMandi?.rank === m.rank ? "none" : "1.5px solid #e5e7eb",
                              }}
                            >
                              {selectedMandi?.rank === m.rank ? "Selected ✓" : "Select"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Map View */}
            {activeTab === "map" && (
              <div style={{
                background: "white", borderRadius: "20px", overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              }}>
                <div style={{ position: "relative", aspectRatio: "16/7", background: "linear-gradient(135deg, #e8f5e9, #f0fdf4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      width: "72px", height: "72px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 16px", border: "2px solid rgba(22,163,74,0.2)",
                    }}>
                      <MapPin style={{ width: "32px", height: "32px", color: "#16a34a" }} />
                    </div>
                    <p style={{ fontSize: "17px", fontWeight: 700, color: "#0f1f0f", marginBottom: "6px" }}>Map View</p>
                    <p style={{ fontSize: "14px", color: "#9ca3af" }}>Showing {results.length} mandis near {formData.village}</p>
                  </div>
                  {/* Mini cards at bottom */}
                  <div style={{
                    position: "absolute", bottom: "16px", left: "16px", right: "16px",
                    display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "4px",
                  }}>
                    {results.slice(0, 4).map((m) => (
                      <div
                        key={m.rank}
                        style={{
                          flexShrink: 0, borderRadius: "12px", background: "white",
                          border: selectedMandi?.rank === m.rank ? "2px solid #16a34a" : "1px solid rgba(0,0,0,0.08)",
                          padding: "10px 14px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                        onClick={() => handleSelectMandi(m)}
                      >
                        <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f1f0f", whiteSpace: "nowrap" }}>{m.mandiName}</p>
                        <p style={{ fontSize: "12px", color: "#9ca3af" }}>{m.distanceKm} km · ₹{m.netProfit?.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
