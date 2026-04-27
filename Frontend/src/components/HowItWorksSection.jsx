import { MapPin, Search, Trophy, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <MapPin style={{ width: "28px", height: "28px" }} />,
    title: "Enter Your Location",
    titleHindi: "अपना स्थान दर्ज करें",
    description: "Tell us your village, district, and state. We'll find all mandis near you.",
    accent: "#16a34a",
    gradientFrom: "#052e16",
    gradientTo: "#166534",
  },
  {
    number: "02",
    icon: <Search style={{ width: "28px", height: "28px" }} />,
    title: "Select Your Crop",
    titleHindi: "अपनी फसल चुनें",
    description: "Choose your commodity and enter details like quantity and quality grade.",
    accent: "#0284c7",
    gradientFrom: "#0c4a6e",
    gradientTo: "#075985",
  },
  {
    number: "03",
    icon: <Trophy style={{ width: "28px", height: "28px" }} />,
    title: "Get Recommendations",
    titleHindi: "सिफारिशें प्राप्त करें",
    description: "Our AI analyzes prices, weather, and transport to rank the best mandis for you.",
    accent: "#7c3aed",
    gradientFrom: "#2e1065",
    gradientTo: "#4c1d95",
  },
  {
    number: "04",
    icon: <CheckCircle style={{ width: "28px", height: "28px" }} />,
    title: "Confirm & Go",
    titleHindi: "पुष्टि करें और जाएं",
    description: "Select your preferred mandi, see the route, and maximize your profits.",
    accent: "#d97706",
    gradientFrom: "#451a03",
    gradientTo: "#78350f",
  },
];

function StepCard({ step, index }) {
  return (
    <div
      className="animate-fade-in-up"
      style={{
        animationDelay: `${index * 150}ms`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Connector line (desktop) */}
      {index < steps.length - 1 && (
        <div style={{
          display: "none",
          position: "absolute",
          top: "50px",
          left: "calc(50% + 50px)",
          right: "calc(-50% + 50px)",
          height: "2px",
          background: `linear-gradient(90deg, ${step.accent}40, ${steps[index + 1].accent}40)`,
          zIndex: 0,
        }} className="lg-connector" />
      )}

      {/* Step icon */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          marginBottom: "24px",
        }}
      >
        {/* Glow ring */}
        <div style={{
          position: "absolute",
          inset: "-8px",
          borderRadius: "50%",
          background: `${step.accent}15`,
          border: `1px dashed ${step.accent}40`,
        }} />

        <div style={{
          width: "96px",
          height: "96px",
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${step.gradientFrom}, ${step.gradientTo})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          boxShadow: `0 8px 24px ${step.accent}40, 0 2px 8px rgba(0,0,0,0.15)`,
          transition: "all 0.3s ease",
          position: "relative",
        }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.boxShadow = `0 12px 35px ${step.accent}55, 0 4px 12px rgba(0,0,0,0.2)`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = `0 8px 24px ${step.accent}40, 0 2px 8px rgba(0,0,0,0.15)`;
          }}
        >
          {step.icon}
        </div>

        {/* Step number badge */}
        <div style={{
          position: "absolute",
          bottom: "-4px",
          right: "-4px",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: step.accent,
          border: "3px solid white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: 800,
          color: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}>
          {step.number}
        </div>
      </div>

      {/* Content */}
      <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f1f0f", marginBottom: "6px", letterSpacing: "-0.01em" }}>
        {step.title}
      </h3>
      <p style={{ fontSize: "13px", color: step.accent, fontWeight: 600, marginBottom: "12px", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        {step.titleHindi}
      </p>
      <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65, maxWidth: "220px" }}>
        {step.description}
      </p>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section style={{ padding: "96px 0", background: "white", position: "relative", overflow: "hidden" }}>
      {/* Background patterns */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(22, 163, 74, 0.04) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(234, 179, 8, 0.04) 0%, transparent 50%)`,
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 72px" }}>
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
            🚀 How It Works
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 800,
            color: "#0f1f0f",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            marginBottom: "16px",
          }}>
            Simple Steps to{" "}
            <span style={{
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Better Earnings
            </span>
          </h2>
          <p style={{ fontSize: "17px", color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
            Finding the best mandi is easy. Just follow these four simple steps.
          </p>
        </div>

        {/* Steps */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "40px 24px",
          maxWidth: "960px",
          margin: "0 auto",
          position: "relative",
        }}>
          {/* Connecting line for large screens */}
          <style>{`
            @media (min-width: 1024px) {
              .lg-connector { display: block !important; }
            }
          `}</style>

          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>

        {/* Bottom trust indicator */}
        <div style={{
          marginTop: "72px",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          alignItems: "center",
        }}>
          {[
            { label: "Takes only 2 minutes", icon: "⚡" },
            { label: "No registration needed", icon: "🔓" },
            { label: "Works in Hindi & English", icon: "🇮🇳" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "999px",
              background: "#f0fdf4",
              border: "1px solid #d1fae5",
              fontSize: "14px",
              fontWeight: 600,
              color: "#15803d",
            }}>
              <span>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
