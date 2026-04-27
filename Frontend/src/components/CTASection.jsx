import { Link } from "react-router-dom";
import { ArrowRight, Wheat, TrendingUp, Users, Star } from "lucide-react";

export function CTASection() {
  return (
    <section style={{ padding: "80px 0", background: "#f8fdf8" }}>
      <div className="container">
        <div
          style={{
            position: "relative",
            borderRadius: "32px",
            overflow: "hidden",
            background: "linear-gradient(135deg, #052e16 0%, #14532d 30%, #16a34a 65%, #15803d 100%)",
            backgroundSize: "300% 300%",
            animation: "gradient-shift 8s ease infinite",
            padding: "64px 48px",
            boxShadow: "0 20px 60px rgba(22, 163, 74, 0.35), 0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          {/* Decorative elements */}
          <div style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            bottom: "-100px",
            left: "-60px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            top: "40px",
            left: "10%",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "rgba(234, 179, 8, 0.08)",
            pointerEvents: "none",
          }} />

          {/* Floating wheat icons */}
          <div style={{
            position: "absolute",
            top: "24px",
            right: "15%",
            opacity: 0.12,
            animation: "float 4s ease-in-out infinite",
          }}>
            <Wheat style={{ width: "48px", height: "48px", color: "white" }} />
          </div>
          <div style={{
            position: "absolute",
            bottom: "24px",
            left: "8%",
            opacity: 0.08,
            animation: "float 5s ease-in-out infinite",
            animationDelay: "1.5s",
          }}>
            <Wheat style={{ width: "64px", height: "64px", color: "white" }} />
          </div>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
            {/* Icon */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              marginBottom: "28px",
            }}>
              <Wheat style={{ width: "36px", height: "36px", color: "white" }} />
            </div>

            {/* Heading */}
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "12px",
            }}>
              Ready to Get Better Prices?
            </h2>
            <p style={{
              fontSize: "18px",
              color: "rgba(134, 239, 172, 0.9)",
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontWeight: 600,
              marginBottom: "16px",
            }}>
              बेहतर कीमत पाने के लिए तैयार हैं?
            </p>
            <p style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.7,
              maxWidth: "520px",
              margin: "0 auto 36px",
            }}>
              Join thousands of farmers who are already using AgroMandi to find the best markets and maximize their profits.
            </p>

            {/* Stats row */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "24px",
              marginBottom: "40px",
            }}>
              {[
                { icon: <Users style={{ width: "16px", height: "16px" }} />, value: "50,000+", label: "Farmers" },
                { icon: <TrendingUp style={{ width: "16px", height: "16px" }} />, value: "₹2.3 Cr", label: "Extra Earnings" },
                { icon: <Star style={{ width: "16px", height: "16px" }} />, value: "4.8/5", label: "Rating" },
              ].map((stat, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                }}>
                  <span style={{ color: "#86efac" }}>{stat.icon}</span>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "white" }}>{stat.value}</span>
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
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
                  background: "white",
                  color: "#15803d",
                  fontSize: "16px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  transition: "all 0.25s ease",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
                }}
              >
                Start Finding Mandis
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
                  background: "rgba(255,255,255,0.12)",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                  textDecoration: "none",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <TrendingUp style={{ width: "16px", height: "16px" }} />
                Check Today&apos;s Prices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
