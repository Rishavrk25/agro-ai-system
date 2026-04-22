import { motion } from "framer-motion";
import { MapPin, IndianRupee, Truck, TrendingUp, Gauge, ArrowRight, Clock, Info } from "lucide-react";
import { PROFIT_THRESHOLDS, LABELS } from "../utils/constants";

function getProfitLevel(netProfit) {
  if (netProfit >= PROFIT_THRESHOLDS.high) return "green";
  if (netProfit >= PROFIT_THRESHOLDS.medium) return "yellow";
  return "red";
}

const COLORS = {
  green: { border: "#bbf7d0", bg: "#f0fdf4", profit: "#16a34a", badge: { bg: "#dcfce7", text: "#15803d" } },
  yellow: { border: "#fef08a", bg: "#fefce8", profit: "#ca8a04", badge: { bg: "#fef9c3", text: "#a16207" } },
  red: { border: "#fecaca", bg: "#fef2f2", profit: "#dc2626", badge: { bg: "#fee2e2", text: "#b91c1c" } },
};

export default function MandiCard({ mandi, index, lang = "en", onSelect, isSelected }) {
  const t = LABELS[lang];
  const level = getProfitLevel(mandi.netProfit);
  const c = COLORS[level];

  const badges = [];
  if (mandi.rank === 1) badges.push({ label: t.bestChoice, color: COLORS.green });
  if (mandi.netProfit >= PROFIT_THRESHOLDS.high) badges.push({ label: t.highProfit, color: COLORS.green });
  if (mandi.distanceKm <= 50) badges.push({ label: t.lowDistance, color: COLORS.yellow });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect?.(mandi)}
      className="relative rounded-2xl p-5 cursor-pointer transition-all"
      style={{
        backgroundColor: isSelected ? c.bg : "white",
        border: `2px solid ${isSelected ? "#16a34a" : c.border}`,
        boxShadow: isSelected ? "0 0 0 2px rgba(22,163,74,0.2)" : "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {badges.map((b, i) => (
            <span
              key={i}
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: b.color.badge.bg, color: b.color.badge.text }}
            >
              {b.label}
            </span>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold" style={{ color: "#111827" }}>{mandi.mandiName}</h3>
          <p className="text-sm flex items-center gap-1" style={{ color: "#9ca3af" }}>
            <MapPin size={13} />{mandi.district}
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{ backgroundColor: "#f3f4f6", color: "#9ca3af" }}>
          #{mandi.rank}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Metric icon={MapPin} label={t.distance} value={`${mandi.distanceKm} ${t.km}`} />
        <Metric icon={IndianRupee} label={t.modalPrice} value={`₹${mandi.modalPrice.toLocaleString()}`} />
        <Metric icon={Truck} label={t.transportCost} value={`₹${mandi.transportCost.toLocaleString()}`} />
        <Metric icon={Gauge} label={t.dpsScore} value={mandi.bestDPS} highlight />
      </div>

      {/* Net Profit */}
      <div
        className="flex items-center justify-between rounded-xl px-4 py-3 mb-3"
        style={{ backgroundColor: c.bg }}
      >
        <span className="text-sm font-semibold" style={{ color: "#6b7280" }}>
          <TrendingUp size={14} className="inline mr-1" />{t.netProfit}
        </span>
        <span className="text-xl font-extrabold" style={{ color: c.profit }}>
          ₹{mandi.netProfit.toLocaleString()}
        </span>
      </div>

      {/* Decision + Why */}
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full"
          style={{
            backgroundColor: mandi.decision === "Transport Now" ? "#dcfce7" : "#ffedd5",
            color: mandi.decision === "Transport Now" ? "#15803d" : "#c2410c",
          }}
        >
          {mandi.decision === "Transport Now" ? <ArrowRight size={14} /> : <Clock size={14} />}
          {mandi.decision === "Transport Now" ? t.transportNow : t.delayShipment}
        </span>

        <div className="group relative">
          <Info size={18} className="cursor-pointer" style={{ color: "#d1d5db" }} />
          <div
            className="absolute bottom-full right-0 mb-2 w-56 p-3 text-xs rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10"
            style={{ backgroundColor: "#1f2937", color: "white", boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
          >
            {t.whyExplanation}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Metric({ icon: Icon, label, value, highlight }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: highlight ? "#f3e8ff" : "#f3f4f6" }}
      >
        <Icon size={15} style={{ color: highlight ? "#9333ea" : "#6b7280" }} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] leading-tight" style={{ color: "#9ca3af" }}>{label}</p>
        <p className="text-sm font-bold truncate" style={{ color: highlight ? "#9333ea" : "#111827" }}>{value}</p>
      </div>
    </div>
  );
}
