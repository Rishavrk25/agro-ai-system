import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft, MapPin, Wheat, Scale, Truck, Banknote, CheckCircle, Navigation,
  Phone, Calendar, Clock, Star, Share2, Download, Loader2, PartyPopper
} from "lucide-react";
import { confirmMandi } from "@/services/api";

export default function Confirm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [selectedMandi, setSelectedMandi] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const storedFormData = sessionStorage.getItem("mandiFormData");
    const storedMandi = sessionStorage.getItem("selectedMandi");
    if (!storedFormData || !storedMandi) { navigate("/find-mandi"); return; }
    setFormData(JSON.parse(storedFormData));
    setSelectedMandi(JSON.parse(storedMandi));
  }, [navigate]);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await confirmMandi({
        village: formData.village, district: formData.district, state: formData.state,
        commodity: formData.commodity, quantity: formData.quantity,
        mandiName: selectedMandi.mandiName, mandiDistrict: selectedMandi.district,
        modalPrice: selectedMandi.modalPrice, transportCost: selectedMandi.transportCost,
        netProfit: selectedMandi.netProfit, decision: selectedMandi.decision,
      });
    } catch (err) {
      console.error("Error confirming mandi:", err);
    }
    setIsConfirming(false);
    setIsConfirmed(true);
  };

  // Loading state
  if (!formData || !selectedMandi) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
        <Header />
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fdf8" }}>
          <Loader2 style={{ width: "40px", height: "40px", color: "#16a34a", animation: "spin 1s linear infinite" }} />
        </main>
        <Footer />
      </div>
    );
  }

  // Confirmed State
  if (isConfirmed) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
        <Header />
        <main style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg, #f0fdf4, #f8fdf8)", padding: "48px 0",
        }}>
          <div className="container">
            <div style={{
              maxWidth: "500px", margin: "0 auto",
              background: "white", borderRadius: "28px",
              border: "1px solid rgba(22,163,74,0.15)",
              boxShadow: "0 12px 40px rgba(22,163,74,0.12)",
              overflow: "hidden",
            }}>
              {/* Success banner */}
              <div style={{
                padding: "32px", textAlign: "center",
                background: "linear-gradient(135deg, #052e16, #15803d)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
                <div style={{
                  width: "80px", height: "80px", borderRadius: "50%", margin: "0 auto 20px",
                  background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center",
                  border: "2px solid rgba(255,255,255,0.2)",
                }}>
                  <PartyPopper style={{ width: "40px", height: "40px", color: "white" }} />
                </div>
                <h1 style={{ fontSize: "24px", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: "6px" }}>
                  Selection Confirmed! 🎉
                </h1>
                <p style={{ fontSize: "16px", color: "rgba(134,239,172,0.9)", fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 600 }}>
                  चयन की पुष्टि हो गई!
                </p>
              </div>

              {/* Body */}
              <div style={{ padding: "28px 32px" }}>
                <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px", textAlign: "center" }}>
                  Your mandi selection has been saved. You can now proceed to {selectedMandi.mandiName}.
                </p>

                <div style={{ background: "#f0fdf4", borderRadius: "16px", padding: "20px", marginBottom: "24px", border: "1px solid rgba(22,163,74,0.1)" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0f1f0f", marginBottom: "14px" }}>Quick Summary</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[
                      { label: "Mandi", value: selectedMandi.mandiName },
                      { label: "Commodity", value: formData.commodity },
                      { label: "Quantity", value: `${formData.quantity} Quintals` },
                      { label: "Expected Profit", value: `₹${selectedMandi.netProfit?.toLocaleString()}`, highlight: true },
                    ].map((row, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "14px", color: "#9ca3af" }}>{row.label}</span>
                        <span style={{ fontSize: "14px", fontWeight: row.highlight ? 800 : 600, color: row.highlight ? "#16a34a" : "#0f1f0f" }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <a
                    href="/find-mandi"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      padding: "14px", borderRadius: "14px",
                      background: "linear-gradient(135deg, #15803d, #16a34a)", color: "white",
                      fontSize: "15px", fontWeight: 700, textDecoration: "none",
                      boxShadow: "0 4px 14px rgba(22,163,74,0.35)",
                    }}
                  >
                    <Navigation style={{ width: "16px", height: "16px" }} />
                    Find Another Mandi
                  </a>
                  <a
                    href="/"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      padding: "13px", borderRadius: "14px",
                      background: "white", color: "#374151",
                      fontSize: "15px", fontWeight: 600, textDecoration: "none",
                      border: "1.5px solid #e5e7eb",
                    }}
                  >
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isDelayDecision = selectedMandi.decision === "Delay Shipment";

  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1 }}>
        {/* Page Header */}
        <section style={{
          padding: "32px 0 28px",
          background: "linear-gradient(135deg, #052e16 0%, #15803d 100%)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px", pointerEvents: "none",
          }} />
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <button
              onClick={() => navigate("/find-mandi/results")}
              style={{
                display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px",
                borderRadius: "8px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.75)", fontSize: "13px", fontWeight: 500, cursor: "pointer", marginBottom: "12px",
              }}
            >
              <ArrowLeft style={{ width: "14px", height: "14px" }} /> Back to Results
            </button>
            <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", marginBottom: "6px" }}>
              Confirm Your Selection
            </h1>
            <p style={{ fontSize: "14px", color: "rgba(134,239,172,0.8)" }}>
              अपने चयन की पुष्टि करें — Review and confirm your mandi choice
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section style={{ padding: "32px 0 64px", background: "#f8fdf8" }}>
          <div className="container">
            <style>{`@media(min-width:1024px){.confirm-grid{grid-template-columns:1fr 320px!important}}`}</style>
            <div className="confirm-grid" style={{
              display: "grid", gridTemplateColumns: "1fr",
              gap: "24px", maxWidth: "1000px", margin: "0 auto",
            }}>
              {/* Left Column */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Selected Mandi Card */}
                <div style={{
                  background: "white", borderRadius: "20px", overflow: "hidden",
                  border: "1px solid rgba(22,163,74,0.2)", boxShadow: "0 4px 20px rgba(22,163,74,0.08)",
                }}>
                  <div style={{
                    padding: "20px 24px",
                    background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                    borderBottom: "1px solid rgba(22,163,74,0.1)",
                    display: "flex", alignItems: "center", gap: "14px",
                  }}>
                    <div style={{
                      width: "52px", height: "52px", borderRadius: "14px",
                      background: "linear-gradient(135deg, #15803d, #16a34a)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, boxShadow: "0 4px 12px rgba(22,163,74,0.35)",
                    }}>
                      <Star style={{ width: "24px", height: "24px", color: "white" }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0f1f0f", letterSpacing: "-0.02em", marginBottom: "4px" }}>
                        {selectedMandi.mandiName}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#6b7280", display: "flex", alignItems: "center", gap: "4px" }}>
                        <MapPin style={{ width: "12px", height: "12px" }} />
                        {selectedMandi.district} — {selectedMandi.distanceKm} km from {formData.village}
                      </p>
                    </div>
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "12px" }}>
                      {[
                        { label: "Modal Price", value: `₹${selectedMandi.modalPrice?.toLocaleString()}`, color: "#16a34a" },
                        { label: "Distance", value: `${selectedMandi.distanceKm} km`, color: "#0284c7" },
                        { label: "Transport Cost", value: `₹${selectedMandi.transportCost?.toLocaleString()}`, color: "#dc2626" },
                        { label: "DPS Score", value: `${selectedMandi.bestDPS}/100`, color: "#7c3aed" },
                      ].map((item, i) => (
                        <div key={i} style={{ background: "#f8fdf8", borderRadius: "12px", padding: "14px", textAlign: "center", border: "1px solid rgba(0,0,0,0.05)" }}>
                          <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>{item.label}</p>
                          <p style={{ fontSize: "17px", fontWeight: 800, color: item.color }}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Crop Details */}
                <div style={{ background: "white", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 16px rgba(0,0,0,0.04)", overflow: "hidden" }}>
                  <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Wheat style={{ width: "18px", height: "18px", color: "#16a34a" }} />
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f1f0f" }}>Crop Details</h3>
                  </div>
                  <div style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px" }}>
                    {[
                      { icon: <Wheat style={{ width: "16px", height: "16px", color: "#9ca3af" }} />, label: "Commodity", value: formData.commodity },
                      { icon: <Scale style={{ width: "16px", height: "16px", color: "#9ca3af" }} />, label: "Quantity", value: `${formData.quantity} Quintals` },
                      { icon: <CheckCircle style={{ width: "16px", height: "16px", color: "#9ca3af" }} />, label: "Quality Grade", value: `Grade ${formData.cropQuality}` },
                      { icon: <Truck style={{ width: "16px", height: "16px", color: "#9ca3af" }} />, label: "Transport", value: formData.transportAvailability },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", borderRadius: "12px", background: "#f8fdf8", border: "1px solid rgba(0,0,0,0.05)" }}>
                        {item.icon}
                        <div>
                          <p style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "2px" }}>{item.label}</p>
                          <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f1f0f", textTransform: "capitalize" }}>{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div style={{ background: "white", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 16px rgba(0,0,0,0.04)", overflow: "hidden" }}>
                  <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <MapPin style={{ width: "18px", height: "18px", color: "#16a34a" }} />
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f1f0f" }}>Your Location</h3>
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    <div style={{ padding: "16px", borderRadius: "12px", background: "#f0fdf4", border: "1px solid rgba(22,163,74,0.1)" }}>
                      <p style={{ fontSize: "15px", fontWeight: 700, color: "#0f1f0f", marginBottom: "4px" }}>{formData.village}</p>
                      <p style={{ fontSize: "13px", color: "#6b7280" }}>{formData.district}, {formData.state}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Profit Summary */}
                <div style={{
                  background: "white", borderRadius: "20px",
                  border: "1px solid rgba(22,163,74,0.2)",
                  boxShadow: "0 4px 20px rgba(22,163,74,0.08)", overflow: "hidden",
                }}>
                  <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(22,163,74,0.1)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Banknote style={{ width: "18px", height: "18px", color: "#16a34a" }} />
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f1f0f" }}>Profit Summary</h3>
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "14px", color: "#9ca3af" }}>Gross Value</span>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "#0f1f0f" }}>₹{((selectedMandi.modalPrice || 0) * formData.quantity).toLocaleString()}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "14px", color: "#9ca3af" }}>Transport Cost</span>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "#dc2626" }}>− ₹{selectedMandi.transportCost?.toLocaleString()}</span>
                      </div>
                      <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                          <span style={{ fontSize: "15px", fontWeight: 700, color: "#0f1f0f" }}>Net Profit</span>
                          <span style={{ fontSize: "22px", fontWeight: 900, color: "#16a34a", letterSpacing: "-0.02em" }}>₹{selectedMandi.netProfit?.toLocaleString()}</span>
                        </div>
                        <p style={{ fontSize: "12px", color: "#9ca3af", textAlign: "right", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>अनुमानित शुद्ध लाभ</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Recommendation */}
                <div style={{ background: "white", borderRadius: "20px", padding: "20px 24px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                    <Clock style={{ width: "16px", height: "16px", color: "#16a34a" }} />
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#0f1f0f" }}>AI Recommendation</span>
                  </div>
                  <div style={{
                    borderRadius: "12px", padding: "14px 16px",
                    background: isDelayDecision ? "rgba(234,179,8,0.08)" : "rgba(22,163,74,0.08)",
                    border: `1px solid ${isDelayDecision ? "rgba(234,179,8,0.2)" : "rgba(22,163,74,0.2)"}`,
                  }}>
                    <p style={{ fontSize: "15px", fontWeight: 700, color: isDelayDecision ? "#d97706" : "#16a34a", marginBottom: "4px" }}>
                      {selectedMandi.decision}
                    </p>
                    <p style={{ fontSize: "13px", color: "#6b7280" }}>
                      {isDelayDecision ? "Consider waiting for better prices." : "Current prices are favorable. Sell soon."}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <button
                    onClick={handleConfirm}
                    disabled={isConfirming}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      padding: "16px", borderRadius: "14px",
                      background: isConfirming ? "#86efac" : "linear-gradient(135deg, #15803d, #16a34a)",
                      border: "none", color: "white", fontSize: "16px", fontWeight: 700,
                      cursor: isConfirming ? "not-allowed" : "pointer",
                      boxShadow: "0 4px 16px rgba(22,163,74,0.4)", transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => { if (!isConfirming) e.currentTarget.style.boxShadow = "0 6px 24px rgba(22,163,74,0.5)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(22,163,74,0.4)"; }}
                  >
                    {isConfirming ? (
                      <><Loader2 style={{ width: "18px", height: "18px", animation: "spin 1s linear infinite" }} />Confirming...</>
                    ) : (
                      <><CheckCircle style={{ width: "18px", height: "18px" }} />Confirm Selection</>
                    )}
                  </button>
                  <p style={{ fontSize: "12px", textAlign: "center", color: "#9ca3af", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>पुष्टि करें और आगे बढ़ें</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {[{ icon: <Share2 style={{ width: "15px", height: "15px" }} />, label: "Share" }, { icon: <Download style={{ width: "15px", height: "15px" }} />, label: "Download" }].map((btn, i) => (
                      <button key={i} style={{
                        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                        padding: "10px", borderRadius: "12px", border: "1.5px solid #e5e7eb",
                        background: "white", fontSize: "13px", fontWeight: 600, color: "#374151",
                        cursor: "pointer", transition: "all 0.2s",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#d1fae5"; e.currentTarget.style.color = "#16a34a"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#374151"; }}
                      >
                        {btn.icon} {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Helpline */}
                <div style={{
                  background: "linear-gradient(135deg, #052e16, #15803d)",
                  borderRadius: "18px", padding: "20px",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <Phone style={{ width: "16px", height: "16px", color: "#86efac" }} />
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>Need Help?</span>
                    </div>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", marginBottom: "10px" }}>Call our helpline for any assistance</p>
                    <p style={{ fontSize: "20px", fontWeight: 800, color: "white" }}>1800-XXX-XXXX</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px" }}>
                      <Calendar style={{ width: "12px", height: "12px", color: "rgba(255,255,255,0.45)" }} />
                      <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Available 6 AM – 10 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
