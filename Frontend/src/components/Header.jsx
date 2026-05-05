import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Menu, X, Wheat, Phone, TrendingUp, ChevronRight } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/find-mandi", label: "Find Mandi" },
    { to: "/prices", label: "Market Prices" },
    { to: "/weather", label: "Weather" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        background: scrolled
          ? "rgba(255, 255, 255, 0.92)"
          : "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(22, 163, 74, 0.15)"
          : "1px solid rgba(22, 163, 74, 0.08)",
        boxShadow: scrolled
          ? "0 4px 30px rgba(22, 163, 74, 0.08), 0 1px 0 rgba(22, 163, 74, 0.12)"
          : "none",
      }}
    >
      <style>{`
        .desktop-nav { display: none !important; }
        .mobile-menu-btn { display: flex !important; }
        .mobile-menu-dropdown { display: block !important; }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .mobile-menu-dropdown { display: none !important; }
        }
      `}</style>
      <div className="container mx-auto px-4" style={{ display: "flex", height: "68px", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #15803d, #16a34a, #22c55e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(22, 163, 74, 0.35)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.08) rotate(-5deg)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(22, 163, 74, 0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1) rotate(0deg)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(22, 163, 74, 0.35)";
            }}
          >
            <Wheat style={{ width: "22px", height: "22px", color: "white" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "18px", fontWeight: 800, color: "#0f1f0f", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
              Agro<span style={{ color: "#16a34a" }}>Mandi</span>
            </span>
            <span style={{ fontSize: "10px", color: "#5a6e5a", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Smart Farming
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ alignItems: "center", gap: "4px" }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: isActive(link.to) ? 600 : 500,
                color: isActive(link.to) ? "#16a34a" : "#374151",
                background: isActive(link.to) ? "rgba(22, 163, 74, 0.08)" : "transparent",
                textDecoration: "none",
                transition: "all 0.2s ease",
                position: "relative",
              }}
              onMouseEnter={e => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.color = "#16a34a";
                  e.currentTarget.style.background = "rgba(22, 163, 74, 0.06)";
                }
              }}
              onMouseLeave={e => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.color = "#374151";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div style={{ alignItems: "center", gap: "10px" }} className="desktop-nav">
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "10px",
              border: "1.5px solid #d1fae5",
              background: "white",
              fontSize: "14px",
              fontWeight: 500,
              color: "#374151",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#86efac";
              e.currentTarget.style.color = "#16a34a";
              e.currentTarget.style.background = "#f0fdf4";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#d1fae5";
              e.currentTarget.style.color = "#374151";
              e.currentTarget.style.background = "white";
            }}
          >
            <Phone style={{ width: "14px", height: "14px" }} />
            Helpline
          </button>

          <Link
            to="/find-mandi"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 20px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #15803d, #16a34a)",
              color: "white",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(22, 163, 74, 0.4)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(22, 163, 74, 0.3)";
            }}
          >
            Get Started
            <ChevronRight style={{ width: "14px", height: "14px" }} />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            border: "1.5px solid #d1fae5",
            background: "white",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X style={{ width: "18px", height: "18px", color: "#16a34a" }} /> : <Menu style={{ width: "18px", height: "18px", color: "#374151" }} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: "1px solid rgba(22, 163, 74, 0.1)",
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            padding: "16px",
            animation: "fadeInDown 0.25s ease",
          }}
          className="mobile-menu-dropdown"
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: isActive(link.to) ? 600 : 500,
                  color: isActive(link.to) ? "#16a34a" : "#374151",
                  background: isActive(link.to) ? "rgba(22, 163, 74, 0.08)" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid #d1fae5", paddingTop: "16px" }}>
              <Link
                to="/find-mandi"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #15803d, #16a34a)",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
                <ChevronRight style={{ width: "16px", height: "16px" }} />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
