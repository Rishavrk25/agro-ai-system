import { Link } from "react-router-dom";
import { ArrowRight, MapPin, TrendingUp, CloudSun, Shield, Sparkles, ChevronDown } from "lucide-react";

function StatCard({ icon, value, label, delay = 0 }) {
  return (
    <div
      className="animate-fade-in-up"
      style={{
        animationDelay: `${delay}ms`,
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "20px",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        textAlign: "center",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.18)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{
        width: "48px",
        height: "48px",
        borderRadius: "14px",
        background: "rgba(255, 255, 255, 0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#86efac",
      }}>
        {icon}
      </div>
      <span style={{ fontSize: "28px", fontWeight: 800, color: "white", lineHeight: 1.1, letterSpacing: "-0.02em" }}>{value}</span>
      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{label}</span>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "linear-gradient(135deg, #052e16 0%, #14532d 25%, #15803d 50%, #166534 75%, #052e16 100%)",
        backgroundSize: "400% 400%",
        animation: "gradient-shift 10s ease infinite",
      }}
    >
      {/* Decorative orbs */}
      <div style={{
        position: "absolute",
        top: "-15%",
        right: "-8%",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34, 197, 94, 0.25) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-20%",
        left: "-10%",
        width: "700px",
        height: "700px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(22, 163, 74, 0.2) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: "30%",
        left: "5%",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${4 + (i % 4) * 3}px`,
            height: `${4 + (i % 4) * 3}px`,
            borderRadius: "50%",
            background: i % 3 === 0 ? "rgba(134, 239, 172, 0.6)" : i % 3 === 1 ? "rgba(234, 179, 8, 0.4)" : "rgba(255,255,255,0.3)",
            left: `${8 + i * 8}%`,
            top: `${15 + (i % 5) * 15}%`,
            animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1, padding: "80px 2rem" }}>
        {/* Badge */}
        <div className="animate-fade-in-down" style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.12)",
            border: "1px solid rgba(134, 239, 172, 0.4)",
            backdropFilter: "blur(10px)",
            color: "#86efac",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}>
            <Sparkles style={{ width: "14px", height: "14px" }} />
            Trusted by 50,000+ Farmers Across India
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#4ade80",
              animation: "pulse 2s infinite",
            }} />
          </div>
        </div>

        {/* Headline */}
        <div className="animate-fade-in-up" style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
          <h1 style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 900,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "24px",
          }}>
            Get the{" "}
            <span style={{
              background: "linear-gradient(135deg, #4ade80, #86efac, #eab308)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Best Price
            </span>
            {" "}for<br />Your Crops
          </h1>

          <p className="animate-fade-in-up delay-200" style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "rgba(255,255,255,0.72)",
            maxWidth: "600px",
            margin: "0 auto 12px",
            lineHeight: 1.7,
            fontWeight: 400,
          }}>
            AI-powered mandi recommendations to help you find the best markets.
            Compare prices, check weather risks, and make informed decisions.
          </p>
          <p className="animate-fade-in-up delay-300" style={{
            fontSize: "15px",
            color: "rgba(134, 239, 172, 0.8)",
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            marginBottom: "44px",
            fontWeight: 500,
          }}>
            अपनी फसल के लिए सबसे अच्छी कीमत पाएं
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up delay-400" style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
          }}>
            <Link
              to="/find-mandi"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 32px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #16a34a, #22c55e)",
                color: "white",
                fontSize: "16px",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 6px 24px rgba(22, 163, 74, 0.5), 0 2px 8px rgba(0,0,0,0.2)",
                transition: "all 0.25s ease",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 10px 35px rgba(22, 163, 74, 0.6), 0 4px 12px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(22, 163, 74, 0.5), 0 2px 8px rgba(0,0,0,0.2)";
              }}
            >
              Find Best Mandi
              <ArrowRight style={{ width: "18px", height: "18px" }} />
            </Link>

            <Link
              to="/prices"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "15px 28px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.1)",
                border: "1.5px solid rgba(255,255,255,0.25)",
                color: "white",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
                backdropFilter: "blur(10px)",
                transition: "all 0.25s ease",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              }}
            >
              <TrendingUp style={{ width: "16px", height: "16px" }} />
              View Market Prices
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div
          className="animate-fade-in-up delay-600"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            maxWidth: "900px",
            margin: "64px auto 0",
          }}
        >
          <StatCard icon={<MapPin style={{ width: "22px", height: "22px" }} />} value="500+" label="Mandis Covered" delay={700} />
          <StatCard icon={<TrendingUp style={{ width: "22px", height: "22px" }} />} value="15%" label="Higher Returns" delay={800} />
          <StatCard icon={<CloudSun style={{ width: "22px", height: "22px" }} />} value="24/7" label="Weather Updates" delay={900} />
          <StatCard icon={<Shield style={{ width: "22px", height: "22px" }} />} value="100%" label="Free to Use" delay={1000} />
        </div>

        {/* Scroll Indicator */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }} className="animate-bounce-subtle">
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            color: "rgba(255,255,255,0.4)",
            fontSize: "12px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontWeight: 500,
            cursor: "pointer",
          }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          >
            <ChevronDown style={{ width: "20px", height: "20px" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
