import { Link } from "react-router-dom";
import { Wheat, Phone, Mail, MapPin, ArrowUpRight, MessageSquare, GitBranch, ExternalLink } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  const links = {
    quickLinks: [
      { to: "/find-mandi", label: "Find Mandi" },
      { to: "/prices", label: "Market Prices" },
      { to: "/weather", label: "Weather Forecast" },
      { to: "/", label: "About Us" },
    ],
    resources: [
      "Help Center",
      "FAQs",
      "Farmer's Guide",
      "Privacy Policy",
      "Terms of Service",
    ],
  };

  return (
    <footer style={{ background: "#0a1a0a", color: "white", paddingTop: "64px" }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "48px",
          paddingBottom: "56px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}>
          {/* Brand column */}
          <div style={{ maxWidth: "300px" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", marginBottom: "20px" }}>
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #15803d, #22c55e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(22, 163, 74, 0.4)",
                flexShrink: 0,
              }}>
                <Wheat style={{ width: "22px", height: "22px", color: "white" }} />
              </div>
              <div>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "white", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                  Agro<span style={{ color: "#4ade80" }}>Mandi</span>
                </div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>
                  Smart Farming
                </div>
              </div>
            </Link>

            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "12px" }}>
              Empowering Indian farmers with AI-powered mandi recommendations for better crop prices.
            </p>
            <p style={{
              fontSize: "13px",
              color: "rgba(134, 239, 172, 0.6)",
              lineHeight: 1.7,
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              marginBottom: "28px",
            }}>
              किसानों को बेहतर फसल मूल्य के लिए AI संचालित मंडी सिफारिशें
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { icon: <MessageSquare style={{ width: "16px", height: "16px" }} />, label: "Twitter" },
                { icon: <GitBranch style={{ width: "16px", height: "16px" }} />, label: "GitHub" },
                { icon: <ExternalLink style={{ width: "16px", height: "16px" }} />, label: "LinkedIn" },
              ].map((social, i) => (
                <button
                  key={i}
                  aria-label={social.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(22, 163, 74, 0.2)";
                    e.currentTarget.style.borderColor = "rgba(22, 163, 74, 0.4)";
                    e.currentTarget.style.color = "#4ade80";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  }}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>
              Quick Links
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
              {links.quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      fontWeight: 500,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#4ade80";
                      e.currentTarget.style.gap = "8px";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                      e.currentTarget.style.gap = "6px";
                    }}
                  >
                    <ArrowUpRight style={{ width: "12px", height: "12px", opacity: 0.6 }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>
              Resources
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
              {links.resources.map((item) => (
                <li key={item}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.55)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontWeight: 500,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#4ade80"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                  >
                    <ArrowUpRight style={{ width: "12px", height: "12px", opacity: 0.6 }} />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>
              Contact Us
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { icon: <Phone style={{ width: "15px", height: "15px" }} />, text: "1800-XXX-XXXX (Toll Free)" },
                { icon: <Mail style={{ width: "15px", height: "15px" }} />, text: "help@agromandi.in" },
                { icon: <MapPin style={{ width: "15px", height: "15px" }} />, text: "Agricultural Hub, New Delhi, India" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div style={{
                    flexShrink: 0,
                    marginTop: "1px",
                    color: "#4ade80",
                  }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5, fontWeight: 500 }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Helpline badge */}
            <div style={{
              marginTop: "24px",
              padding: "14px 16px",
              borderRadius: "14px",
              background: "rgba(22, 163, 74, 0.12)",
              border: "1px solid rgba(22, 163, 74, 0.25)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#4ade80",
                flexShrink: 0,
                animation: "pulse 2s infinite",
              }} />
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#4ade80" }}>Helpline Active</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Mon-Sat, 8AM – 8PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: "24px 0",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
            © {year} AgroMandi. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>Made with</span>
            <span style={{ color: "#4ade80" }}>♥</span>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>for Indian Farmers</span>
            <span>🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
