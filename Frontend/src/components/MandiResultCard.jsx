import { MapPin, TrendingUp, Clock, ArrowRight, Trophy, Star, CheckCircle, IndianRupee } from "lucide-react";

export function MandiResultCard({ mandi, quantity, commodity, isSelected, onSelect }) {
  const isTopRecommendation = mandi.rank === 1;
  const isDelayRecommended = mandi.decision === "Delay Shipment";

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        overflow: "hidden",
        border: isSelected ? "2px solid #16a34a" : isTopRecommendation ? "1.5px solid rgba(22,163,74,0.3)" : "1px solid rgba(0,0,0,0.07)",
        boxShadow: isSelected ? "0 8px 30px rgba(22,163,74,0.2)" : "0 4px 16px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        cursor: "default",
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
      {/* Simple Header */}
      <div style={{
        padding: "16px 20px",
        background: isTopRecommendation ? "linear-gradient(135deg, #052e16, #15803d)" : isSelected ? "#f0fdf4" : "#fafafa",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "10px",
            background: isTopRecommendation ? "rgba(255,255,255,0.2)" : "#e5e7eb",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, color: isTopRecommendation ? "white" : "#374151"
          }}>
            {isTopRecommendation ? <Trophy style={{ width: "20px", height: "20px" }} /> : `#${mandi.rank}`}
          </div>
          <div>
            <h3 style={{ fontSize: "17px", fontWeight: 700, color: isTopRecommendation ? "white" : "#0f1f0f", marginBottom: "2px" }}>
              {mandi.mandiName}
            </h3>
            <p style={{ fontSize: "13px", color: isTopRecommendation ? "rgba(255,255,255,0.8)" : "#6b7280", display: "flex", alignItems: "center", gap: "4px" }}>
              <MapPin style={{ width: "12px", height: "12px" }} /> {mandi.district} ({mandi.distanceKm} km away)
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* Large Net Profit */}
        <div style={{ textAlign: "center", padding: "16px", background: "#f0fdf4", borderRadius: "12px", border: "1px solid #dcfce7" }}>
          <p style={{ fontSize: "14px", color: "#166534", fontWeight: 600, marginBottom: "4px" }}>Estimated Net Profit</p>
          <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#15803d", margin: 0 }}>
            ₹{mandi.netProfit?.toLocaleString()}
          </h2>
          <p style={{ fontSize: "12px", color: "#166534", opacity: 0.8, marginTop: "4px" }}>
            After ₹{mandi.transportCost?.toLocaleString()} transport cost
          </p>
        </div>

        {/* Price Comparison */}
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f3f4f6", paddingBottom: "16px" }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "2px" }}>Current Price</p>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>₹{mandi.modalPrice?.toLocaleString()}/q</p>
          </div>
          <div style={{ width: "1px", background: "#f3f4f6", margin: "0 16px" }}></div>
          <div style={{ flex: 1, textAlign: "right" }}>
            <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "2px" }}>Est. Future Price</p>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#d97706" }}>
              {mandi.predictedPrice ? `₹${mandi.predictedPrice?.toLocaleString()}/q` : "N/A"}
            </p>
          </div>
        </div>

        {/* AI Recommendation & DPS */}
        <div style={{ 
          padding: "16px", borderRadius: "12px",
          background: isDelayRecommended ? "#fffbeb" : "#f0fdf4",
          border: `1px solid ${isDelayRecommended ? "#fde68a" : "#bbf7d0"}`,
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"
        }}>
          <div style={{ 
            display: "inline-flex", alignItems: "center", gap: "6px", 
            padding: "6px 14px", borderRadius: "20px", 
            background: isDelayRecommended ? "#f59e0b" : "#16a34a", 
            color: "white", fontSize: "14px", fontWeight: 700, marginBottom: "8px"
          }}>
            {isDelayRecommended ? <Clock style={{ width: "16px", height: "16px" }} /> : <TrendingUp style={{ width: "16px", height: "16px" }} />}
            {isDelayRecommended ? "Action: Wait 1 Week" : "Action: Sell Now"}
          </div>
          <p style={{ fontSize: "13px", color: "#4b5563", marginBottom: "8px" }}>
            {isDelayRecommended 
              ? "Prices are expected to rise. Hold your stock if you have storage." 
              : "Best time to sell. Transport your crops today."}
          </p>
          
          {/* Subtle DPS Scores */}
          <div style={{ display: "flex", gap: "12px", fontSize: "11px", color: "#9ca3af", fontWeight: 500, background: "rgba(255,255,255,0.6)", padding: "4px 12px", borderRadius: "6px" }}>
            <span>DPS Score: {mandi.dpsNow}</span>
            <span>•</span>
            <span>Future DPS: {mandi.dpsLater}</span>
          </div>
        </div>

        {/* Select Button */}
        <button
          onClick={() => onSelect(mandi)}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            padding: "14px", borderRadius: "12px", border: "none",
            background: isSelected ? "linear-gradient(135deg, #15803d, #16a34a)" : "#1f2937",
            color: "white", fontSize: "15px", fontWeight: 700, cursor: "pointer",
            transition: "all 0.2s ease", width: "100%", marginTop: "4px"
          }}
          onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#111827" }}
          onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "#1f2937" }}
        >
          {isSelected ? <><CheckCircle style={{ width: "18px", height: "18px" }} /> Selected</> : <>Select This Mandi <ArrowRight style={{ width: "16px", height: "16px" }} /></>}
        </button>
      </div>
    </div>
  );
}

export default MandiResultCard;
