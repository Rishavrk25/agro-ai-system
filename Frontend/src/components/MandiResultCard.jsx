import { MapPin, TrendingUp, TrendingDown, Truck, Clock, ArrowRight, Trophy, Star, CheckCircle } from "lucide-react";

export function MandiResultCard({ mandi, quantity, commodity, isSelected, onSelect }) {
  const isTopRecommendation = mandi.rank === 1;
  const isDelayRecommended = mandi.decision === "Delay Shipment";

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        overflow: "hidden",
        border: isSelected
          ? "2px solid #16a34a"
          : isTopRecommendation
            ? "1.5px solid rgba(22,163,74,0.3)"
            : "1px solid rgba(0,0,0,0.07)",
        boxShadow: isSelected
          ? "0 8px 30px rgba(22,163,74,0.2)"
          : "0 4px 16px rgba(0,0,0,0.05)",
        transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        cursor: "default",
        position: "relative",
      }}
      onMouseEnter={e => {
        if (!isSelected) {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
        }
      }}
      onMouseLeave={e => {
        if (!isSelected) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.05)";
        }
      }}
    >
      {/* Card Header */}
      <div style={{
        padding: "16px 20px",
        background: isTopRecommendation
          ? "linear-gradient(135deg, #052e16, #15803d)"
          : isSelected
            ? "linear-gradient(135deg, #f0fdf4, #dcfce7)"
            : "#fafafa",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "12px",
            background: isTopRecommendation
              ? "rgba(255,255,255,0.15)"
              : isSelected
                ? "rgba(22,163,74,0.12)"
                : "#f3f4f6",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: "14px",
            color: isTopRecommendation ? "white" : isSelected ? "#16a34a" : "#9ca3af",
            flexShrink: 0,
          }}>
            {isTopRecommendation ? <Trophy style={{ width: "20px", height: "20px" }} /> : `#${mandi.rank}`}
          </div>
          <div>
            <h3 style={{
              fontSize: "16px", fontWeight: 700,
              color: isTopRecommendation ? "white" : "#0f1f0f",
              letterSpacing: "-0.01em", marginBottom: "3px",
            }}>
              {mandi.mandiName}
            </h3>
            <p style={{
              fontSize: "12px",
              color: isTopRecommendation ? "rgba(255,255,255,0.7)" : "#9ca3af",
              display: "flex", alignItems: "center", gap: "4px",
            }}>
              <MapPin style={{ width: "11px", height: "11px" }} />
              {mandi.district} · {mandi.distanceKm} km away
            </p>
          </div>
        </div>

        {isTopRecommendation && (
          <div style={{
            padding: "4px 12px", borderRadius: "999px",
            background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)",
            display: "flex", alignItems: "center", gap: "5px",
            color: "white", fontSize: "12px", fontWeight: 700,
            flexShrink: 0,
          }}>
            <Star style={{ width: "12px", height: "12px" }} />
            Best Choice
          </div>
        )}
        {isSelected && !isTopRecommendation && (
          <div style={{
            padding: "4px 12px", borderRadius: "999px",
            background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.2)",
            display: "flex", alignItems: "center", gap: "5px",
            color: "#16a34a", fontSize: "12px", fontWeight: 700, flexShrink: 0,
          }}>
            <CheckCircle style={{ width: "12px", height: "12px" }} />
            Selected
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: "14px" }}>
        {/* Price row */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          background: "#f8fdf8", borderRadius: "14px", overflow: "hidden",
          border: "1px solid rgba(22,163,74,0.08)",
        }}>
          {[
            { label: "Min Price", value: `₹${mandi.minPrice?.toLocaleString()}`, highlight: false },
            { label: "Modal Price", value: `₹${mandi.modalPrice?.toLocaleString()}`, highlight: true },
            { label: "Max Price", value: `₹${mandi.maxPrice?.toLocaleString()}`, highlight: false },
          ].map((p, i) => (
            <div key={i} style={{
              padding: "12px 10px", textAlign: "center",
              borderLeft: i > 0 ? "1px solid rgba(22,163,74,0.08)" : "none",
            }}>
              <p style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "4px" }}>{p.label}</p>
              <p style={{ fontSize: p.highlight ? "16px" : "14px", fontWeight: p.highlight ? 800 : 600, color: p.highlight ? "#16a34a" : "#374151" }}>
                {p.value}
              </p>
            </div>
          ))}
        </div>

        {/* Calculations */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "#9ca3af" }}>Gross Value ({quantity} quintals)</span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>₹{((mandi.modalPrice || 0) * quantity).toLocaleString()}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "#9ca3af", display: "flex", alignItems: "center", gap: "4px" }}>
              <Truck style={{ width: "12px", height: "12px" }} /> Transport Cost
            </span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#dc2626" }}>− ₹{mandi.transportCost?.toLocaleString()}</span>
          </div>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#0f1f0f" }}>Net Profit</span>
            <span style={{ fontSize: "20px", fontWeight: 900, color: "#16a34a", letterSpacing: "-0.02em" }}>₹{mandi.netProfit?.toLocaleString()}</span>
          </div>
        </div>

        {/* DPS + Decision */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 14px", borderRadius: "14px",
          background: isDelayRecommended ? "rgba(234,179,8,0.06)" : "rgba(22,163,74,0.06)",
          border: `1px solid ${isDelayRecommended ? "rgba(234,179,8,0.2)" : "rgba(22,163,74,0.15)"}`,
        }}>
          <div>
            <p style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "4px" }}>AI Score</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <span style={{ fontSize: "26px", fontWeight: 900, color: isDelayRecommended ? "#d97706" : "#16a34a", letterSpacing: "-0.03em" }}>
                {mandi.bestDPS}
              </span>
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>/ 100</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              padding: "5px 12px", borderRadius: "999px",
              background: isDelayRecommended ? "#fef3c7" : "#dcfce7",
              color: isDelayRecommended ? "#d97706" : "#16a34a",
              fontSize: "12px", fontWeight: 700, marginBottom: "4px",
            }}>
              {isDelayRecommended
                ? <><Clock style={{ width: "11px", height: "11px" }} /> Wait for Better Price</>
                : <><TrendingUp style={{ width: "11px", height: "11px" }} /> Sell Now</>
              }
            </div>
            <p style={{ fontSize: "11px", color: "#9ca3af" }}>
              {isDelayRecommended ? `Future DPS: ${mandi.dpsLater}` : `Current DPS: ${mandi.dpsNow}`}
            </p>
          </div>
        </div>

        {/* DPS Comparison */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {[
            { icon: <TrendingUp style={{ width: "14px", height: "14px" }} />, label: "Sell Now", value: mandi.dpsNow, active: !isDelayRecommended, color: "#16a34a" },
            { icon: <Clock style={{ width: "14px", height: "14px" }} />, label: "Wait", value: mandi.dpsLater, active: isDelayRecommended, color: "#d97706" },
          ].map((d, i) => (
            <div key={i} style={{
              padding: "12px", borderRadius: "12px",
              background: d.active ? `${d.color}10` : "#f8f9fa",
              border: d.active ? `1px solid ${d.color}25` : "1px solid rgba(0,0,0,0.06)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", color: d.active ? d.color : "#9ca3af" }}>
                {d.icon}
                <span style={{ fontSize: "12px", fontWeight: 600, color: d.active ? d.color : "#9ca3af" }}>{d.label}</span>
              </div>
              <p style={{ fontSize: "20px", fontWeight: 800, color: d.active ? d.color : "#374151" }}>{d.value}</p>
            </div>
          ))}
        </div>

        {/* Select Button */}
        <button
          onClick={() => onSelect(mandi)}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            padding: "13px", borderRadius: "14px", border: "none",
            background: isSelected
              ? "linear-gradient(135deg, #15803d, #16a34a)"
              : "white",
            color: isSelected ? "white" : "#374151",
            fontSize: "14px", fontWeight: 700, cursor: "pointer",
            boxShadow: isSelected
              ? "0 4px 14px rgba(22,163,74,0.35)"
              : "0 1px 4px rgba(0,0,0,0.08)",
            border: isSelected ? "none" : "1.5px solid #e5e7eb",
            transition: "all 0.2s ease",
            width: "100%",
          }}
          onMouseEnter={e => {
            if (!isSelected) {
              e.currentTarget.style.borderColor = "#86efac";
              e.currentTarget.style.color = "#16a34a";
            }
          }}
          onMouseLeave={e => {
            if (!isSelected) {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.color = "#374151";
            }
          }}
        >
          {isSelected ? <><CheckCircle style={{ width: "16px", height: "16px" }} /> Selected</> : <>Select This Mandi <ArrowRight style={{ width: "15px", height: "15px" }} /></>}
        </button>
      </div>
    </div>
  );
}

export default MandiResultCard;
