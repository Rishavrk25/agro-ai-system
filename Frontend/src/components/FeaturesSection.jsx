import { MapPin, BarChart3, CloudSun, Truck, Banknote, Brain, ArrowUpRight } from "lucide-react";

const features = [
  {
    icon: <MapPin style={{ width: "26px", height: "26px" }} />,
    title: "Nearby Mandi Search",
    titleHindi: "नजदीकी मंडी खोजें",
    description: "Find mandis within your preferred radius. We show you all markets near your village with real-time prices.",
    color: "#16a34a",
    bg: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
    iconBg: "linear-gradient(135deg, #16a34a, #22c55e)",
  },
  {
    icon: <BarChart3 style={{ width: "26px", height: "26px" }} />,
    title: "Smart Price Comparison",
    titleHindi: "स्मार्ट मूल्य तुलना",
    description: "Compare modal, minimum, and maximum prices across multiple mandis to get the best deal for your crops.",
    color: "#0369a1",
    bg: "linear-gradient(135deg, #e0f2fe, #bae6fd)",
    iconBg: "linear-gradient(135deg, #0284c7, #0ea5e9)",
  },
  {
    icon: <Brain style={{ width: "26px", height: "26px" }} />,
    title: "AI Recommendations",
    titleHindi: "AI सिफारिश",
    description: "Our Decision Priority Score (DPS) algorithm analyzes multiple factors to recommend the best mandi for you.",
    color: "#7c3aed",
    bg: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
    iconBg: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
  },
  {
    icon: <CloudSun style={{ width: "26px", height: "26px" }} />,
    title: "Weather Risk Analysis",
    titleHindi: "मौसम जोखिम विश्लेषण",
    description: "Get weather forecasts and risk assessments to decide the best time to transport your crops.",
    color: "#b45309",
    bg: "linear-gradient(135deg, #fef3c7, #fde68a)",
    iconBg: "linear-gradient(135deg, #d97706, #f59e0b)",
  },
  {
    icon: <Truck style={{ width: "26px", height: "26px" }} />,
    title: "Transport Cost Estimate",
    titleHindi: "परिवहन लागत अनुमान",
    description: "Calculate transport costs based on distance and vehicle availability to maximize your net profit.",
    color: "#0f766e",
    bg: "linear-gradient(135deg, #ccfbf1, #99f6e4)",
    iconBg: "linear-gradient(135deg, #0d9488, #14b8a6)",
  },
  {
    icon: <Banknote style={{ width: "26px", height: "26px" }} />,
    title: "Profit Calculator",
    titleHindi: "लाभ कैलकुलेटर",
    description: "See your estimated net profit after deducting transport costs. Make data-driven selling decisions.",
    color: "#be185d",
    bg: "linear-gradient(135deg, #fce7f3, #fbcfe8)",
    iconBg: "linear-gradient(135deg, #db2777, #ec4899)",
  },
];

function FeatureCard({ feature, index }) {
  return (
    <div
      className="animate-fade-in-up"
      style={{
        animationDelay: `${index * 100}ms`,
        background: "white",
        borderRadius: "24px",
        padding: "28px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)",
        transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 4px 12px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.1), 0 0 0 1px ${feature.color}22`;
        e.currentTarget.querySelector(".feature-arrow").style.opacity = "1";
        e.currentTarget.querySelector(".feature-arrow").style.transform = "translate(0, 0)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)";
        e.currentTarget.querySelector(".feature-arrow").style.opacity = "0";
        e.currentTarget.querySelector(".feature-arrow").style.transform = "translate(-4px, 4px)";
      }}
    >
      {/* Top-right arrow */}
      <div
        className="feature-arrow"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          background: feature.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transform: "translate(-4px, 4px)",
          transition: "all 0.3s ease",
          color: feature.color,
        }}
      >
        <ArrowUpRight style={{ width: "16px", height: "16px" }} />
      </div>

      {/* Icon */}
      <div style={{
        width: "56px",
        height: "56px",
        borderRadius: "16px",
        background: feature.iconBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        marginBottom: "20px",
        boxShadow: `0 4px 14px ${feature.color}40`,
      }}>
        {feature.icon}
      </div>

      {/* Title */}
      <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0f1f0f", marginBottom: "4px", letterSpacing: "-0.01em" }}>
        {feature.title}
      </h3>

      {/* Hindi subtitle */}
      <p style={{ fontSize: "13px", color: feature.color, fontWeight: 600, marginBottom: "12px", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        {feature.titleHindi}
      </p>

      {/* Description */}
      <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65, margin: 0 }}>
        {feature.description}
      </p>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section style={{ padding: "96px 0", background: "#f8fdf8", position: "relative", overflow: "hidden" }}>
      {/* Background decoration */}
      <div style={{
        position: "absolute",
        top: "-100px",
        right: "-100px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(22, 163, 74, 0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-60px",
        left: "-60px",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(234, 179, 8, 0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 64px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, rgba(22, 163, 74, 0.1), rgba(34, 197, 94, 0.08))",
            border: "1px solid rgba(22, 163, 74, 0.2)",
            color: "#15803d",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}>
            ✨ Features
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 800,
            color: "#0f1f0f",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            marginBottom: "16px",
          }}>
            Everything You Need{" "}
            <span style={{
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              to Sell Smart
            </span>
          </h2>
          <p style={{ fontSize: "17px", color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
            Powerful tools designed specifically for Indian farmers to maximize their crop earnings.
          </p>
        </div>

        {/* Feature grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
