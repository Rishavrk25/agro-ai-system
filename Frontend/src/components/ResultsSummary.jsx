import { MapPin, Wheat, Scale, Navigation } from "lucide-react";

const items = [
  { icon: <MapPin style={{ width: "18px", height: "18px" }} />, color: "#16a34a", bg: "rgba(22,163,74,0.1)" },
  { icon: <Wheat style={{ width: "18px", height: "18px" }} />, color: "#d97706", bg: "rgba(217,119,6,0.1)" },
  { icon: <Scale style={{ width: "18px", height: "18px" }} />, color: "#0284c7", bg: "rgba(2,132,199,0.1)" },
  { icon: <Navigation style={{ width: "18px", height: "18px" }} />, color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
];

export function ResultsSummary({ farmerLocation, commodity, quantity, searchRadius, totalMandis }) {
  const data = [
    { label: "Your Location", primary: farmerLocation.village, secondary: `${farmerLocation.district}, ${farmerLocation.state}` },
    { label: "Commodity", primary: commodity, secondary: "फसल" },
    { label: "Quantity", primary: `${quantity} Quintals`, secondary: `${(quantity * 100).toLocaleString()} kg` },
    { label: "Mandis Found", primary: `${totalMandis} Markets`, secondary: `within ${searchRadius} km` },
  ];

  return (
    <div style={{
      background: "white",
      borderRadius: "18px",
      border: "1px solid rgba(22,163,74,0.15)",
      boxShadow: "0 4px 20px rgba(22,163,74,0.08)",
      overflow: "hidden",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
      }}>
        {data.map((item, i) => (
          <div
            key={i}
            style={{
              padding: "20px 22px",
              borderRight: i < data.length - 1 ? "1px solid rgba(22,163,74,0.08)" : "none",
              display: "flex", alignItems: "flex-start", gap: "12px",
              borderBottom: "none",
            }}
          >
            <div style={{
              width: "40px", height: "40px", borderRadius: "12px",
              background: items[i].bg, display: "flex", alignItems: "center",
              justifyContent: "center", color: items[i].color, flexShrink: 0,
            }}>
              {items[i].icon}
            </div>
            <div>
              <p style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>
                {item.label}
              </p>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#0f1f0f", marginBottom: "2px" }}>{item.primary}</p>
              <p style={{ fontSize: "12px", color: "#9ca3af" }}>{item.secondary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsSummary;
