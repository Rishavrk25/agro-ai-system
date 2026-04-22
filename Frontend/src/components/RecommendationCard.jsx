import { motion } from "framer-motion";
import { Trophy, MapPin, IndianRupee, Truck, TrendingUp, Gauge, ArrowRight, Clock } from "lucide-react";
import { LABELS } from "../utils/constants";

export default function RecommendationCard({ mandi, lang = "en" }) {
  const t = LABELS[lang];
  if (!mandi) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="relative overflow-hidden rounded-3xl text-white p-6"
      style={{
        background: "linear-gradient(135deg, #22c55e, #16a34a, #15803d)",
        boxShadow: "0 20px 40px rgba(22, 163, 74, 0.3)",
      }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.05)" }} />

      {/* Header */}
      <div className="relative flex items-center gap-3 mb-5">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
        >
          <Trophy size={24} style={{ color: "#fde047" }} />
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>{t.topRecommendation}</p>
          <h2 className="text-2xl font-extrabold">{mandi.mandiName}</h2>
        </div>
      </div>

      {/* Location */}
      <div className="relative flex items-center gap-1.5 text-sm mb-5" style={{ color: "rgba(255,255,255,0.7)" }}>
        <MapPin size={14} /> {mandi.district} · {mandi.distanceKm} {t.km}
      </div>

      {/* Metrics */}
      <div className="relative grid grid-cols-2 gap-3 mb-5">
        <MetricBox icon={IndianRupee} label={t.modalPrice} value={`₹${mandi.modalPrice.toLocaleString()}`} />
        <MetricBox icon={Truck} label={t.transportCost} value={`₹${mandi.transportCost.toLocaleString()}`} />
        <MetricBox icon={Gauge} label={t.dpsScore} value={mandi.bestDPS} />
        <MetricBox icon={TrendingUp} label={t.netProfit} value={`₹${mandi.netProfit.toLocaleString()}`} highlight />
      </div>

      {/* Decision */}
      <div className="relative">
        <span
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
          style={{
            backgroundColor: mandi.decision === "Transport Now" ? "rgba(255,255,255,0.25)" : "rgba(251,146,60,0.3)",
            color: mandi.decision === "Transport Now" ? "white" : "#fed7aa",
          }}
        >
          {mandi.decision === "Transport Now" ? <ArrowRight size={16} /> : <Clock size={16} />}
          {mandi.decision === "Transport Now" ? t.transportNow : t.delayShipment}
        </span>
      </div>
    </motion.div>
  );
}

function MetricBox({ icon: Icon, label, value, highlight }) {
  return (
    <div
      className="rounded-xl px-3 py-2.5"
      style={{ backgroundColor: highlight ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)" }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={13} style={{ color: "rgba(255,255,255,0.6)" }} />
        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</span>
      </div>
      <p className="text-lg font-extrabold" style={{ color: highlight ? "#fde047" : "white" }}>{value}</p>
    </div>
  );
}
