import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MandiRecommendationForm } from "@/components/MandiRecommendationForm";
import { MapPin, Shield, Clock, Banknote, Sparkles, Phone } from "lucide-react";

const sidebarFeatures = [
  {
    icon: <MapPin style={{ width: "16px", height: "16px" }} />,
    title: "Location Based",
    desc: "Find mandis near your village",
    color: "#16a34a",
    bg: "rgba(22,163,74,0.08)",
  },
  {
    icon: <Banknote style={{ width: "16px", height: "16px" }} />,
    title: "Best Prices",
    desc: "Compare prices across markets",
    color: "#0284c7",
    bg: "rgba(2,132,199,0.08)",
  },
  {
    icon: <Clock style={{ width: "16px", height: "16px" }} />,
    title: "Real-time Data",
    desc: "Latest market information",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
  },
  {
    icon: <Shield style={{ width: "16px", height: "16px" }} />,
    title: "100% Free",
    desc: "No charges, no hidden fees",
    color: "#d97706",
    bg: "rgba(217,119,6,0.08)",
  },
];

export default function FindMandi() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1 }}>
        {/* Hero Banner */}
        <section style={{
          position: "relative",
          overflow: "hidden",
          padding: "56px 0 48px",
          background: "linear-gradient(135deg, #052e16 0%, #14532d 40%, #16a34a 100%)",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 8s ease infinite",
        }}>
          {/* Decorative orbs */}
          <div style={{
            position: "absolute", top: "-60px", right: "-60px",
            width: "280px", height: "280px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "-40px", left: "10%",
            width: "200px", height: "200px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          {/* Grid overlay */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "50px 50px", pointerEvents: "none",
          }} />

          <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 16px", borderRadius: "999px",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(134,239,172,0.3)",
              color: "#86efac", fontSize: "13px", fontWeight: 600, marginBottom: "16px",
            }}>
              <Sparkles style={{ width: "13px", height: "13px" }} />
              AI-Powered Mandi Search
            </div>
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900,
              color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "12px",
            }}>
              Find the Best Mandi
            </h1>
            <p style={{ fontSize: "18px", color: "rgba(134,239,172,0.85)", fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 600, marginBottom: "8px" }}>
              सबसे अच्छी मंडी खोजें
            </p>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", maxWidth: "500px", margin: "0 auto" }}>
              Enter your details below and let our AI find the best markets for your crops
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section style={{ padding: "40px 0 64px", background: "#f8fdf8" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "32px",
              maxWidth: "1100px",
              margin: "0 auto",
            }}>
              <style>{`@media(min-width:1024px){.find-grid{grid-template-columns:1fr 320px!important}}`}</style>
              <div className="find-grid" style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "32px",
              }}>
                {/* Form */}
                <div>
                  <MandiRecommendationForm />
                </div>

                {/* Sidebar */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Why use us */}
                  <div style={{
                    background: "white",
                    borderRadius: "20px",
                    padding: "24px",
                    border: "1px solid rgba(22,163,74,0.12)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f1f0f", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "18px" }}>⭐</span> Why Use AgroMandi?
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      {sidebarFeatures.map((f, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                          <div style={{
                            width: "36px", height: "36px", borderRadius: "10px",
                            background: f.bg, display: "flex", alignItems: "center",
                            justifyContent: "center", color: f.color, flexShrink: 0,
                          }}>
                            {f.icon}
                          </div>
                          <div>
                            <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f1f0f", marginBottom: "2px" }}>{f.title}</p>
                            <p style={{ fontSize: "13px", color: "#6b7280" }}>{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Helpline */}
                  <div style={{
                    background: "linear-gradient(135deg, #052e16, #15803d)",
                    borderRadius: "20px",
                    padding: "24px",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute", top: "-30px", right: "-30px",
                      width: "120px", height: "120px", borderRadius: "50%",
                      background: "rgba(255,255,255,0.05)", pointerEvents: "none",
                    }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                        <div style={{
                          width: "36px", height: "36px", borderRadius: "10px",
                          background: "rgba(255,255,255,0.15)", display: "flex",
                          alignItems: "center", justifyContent: "center",
                        }}>
                          <Phone style={{ width: "16px", height: "16px", color: "#86efac" }} />
                        </div>
                        <div>
                          <p style={{ fontSize: "15px", fontWeight: 700, color: "white" }}>Need Help?</p>
                          <p style={{ fontSize: "12px", color: "rgba(134,239,172,0.8)", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>सहायता चाहिए?</p>
                        </div>
                      </div>
                      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", marginBottom: "12px" }}>
                        Call our toll-free helpline for assistance in filling the form.
                      </p>
                      <p style={{ fontSize: "22px", fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
                        1800-XXX-XXXX
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
                        <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>Available 6 AM – 10 PM</span>
                      </div>
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
