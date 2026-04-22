import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, Check, RotateCcw, MapPin } from "lucide-react";
import RecommendationCard from "../components/RecommendationCard";
import MandiCard from "../components/MandiCard";
import SortFilter from "../components/SortFilter";
import MandiMap from "../components/MandiMap";
import { confirmMandi as confirmMandiAPI } from "../services/api";
import { LABELS, PROFIT_THRESHOLDS } from "../utils/constants";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, formData, lang: initialLang } = location.state || {};
  const [lang, setLang] = useState(initialLang || "en");
  const t = LABELS[lang];

  const [selectedMandi, setSelectedMandi] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [sortBy, setSortBy] = useState("dps");
  const [filters, setFilters] = useState({ nearby: false, highProfit: false });

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "#f9fafb" }}>
        <span className="text-5xl mb-4">🔍</span>
        <h2 className="text-xl font-bold mb-2" style={{ color: "#111827" }}>{t.noMandis}</h2>
        <p className="mb-6" style={{ color: "#9ca3af" }}>{t.noMandisHint}</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-xl font-semibold text-white cursor-pointer"
          style={{ backgroundColor: "#16a34a" }}
        >
          {t.tryAgain}
        </button>
      </div>
    );
  }

  const { recommendation, allMandis, farmerLocation } = data;

  const processedMandis = useMemo(() => {
    let list = [...(allMandis || [])];
    if (filters.nearby) list = list.filter((m) => m.distanceKm <= 100);
    if (filters.highProfit) list = list.filter((m) => m.netProfit >= PROFIT_THRESHOLDS.high);
    if (sortBy === "profit") list.sort((a, b) => b.netProfit - a.netProfit);
    else if (sortBy === "distance") list.sort((a, b) => a.distanceKm - b.distanceKm);
    else list.sort((a, b) => b.bestDPS - a.bestDPS);
    return list;
  }, [allMandis, sortBy, filters]);

  const handleConfirm = async () => {
    const mandi = selectedMandi || recommendation;
    if (!mandi) return;
    setConfirming(true);
    try {
      await confirmMandiAPI({
        farmerLocation,
        commodity: formData.commodity,
        quantity: formData.quantity,
        cropQuality: formData.cropQuality,
        selectedMandi: mandi,
        weatherRisk: 0,
        transportAvailability: formData.transportAvailability,
        storageAvailability: formData.storageAvailability,
        totalMandisEvaluated: allMandis?.length || 0,
      });
      setConfirmed(true);
    } catch (err) {
      console.error("Confirm failed:", err);
    } finally {
      setConfirming(false);
    }
  };

  const toggleLang = () => setLang((l) => (l === "en" ? "hi" : "en"));
  const handleFilterChange = (key) => setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderColor: "#f3f4f6" }}
      >
        <div className="flex items-center justify-between px-4 py-3" style={{ maxWidth: 672, margin: "0 auto" }}>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-semibold cursor-pointer"
            style={{ color: "#6b7280" }}
          >
            <ArrowLeft size={20} /> {t.newSearch}
          </button>
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold cursor-pointer"
            style={{ backgroundColor: "#f3f4f6", color: "#6b7280" }}
          >
            <Globe size={14} /> {lang === "en" ? "हिंदी" : "EN"}
          </button>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6" style={{ maxWidth: 672, margin: "0 auto" }}>
        {/* Top Recommendation */}
        <section>
          <RecommendationCard mandi={recommendation} lang={lang} />
        </section>

        {/* Map */}
        {farmerLocation && (
          <section>
            <MandiMap farmerLocation={farmerLocation} mandis={allMandis || []} lang={lang} />
          </section>
        )}

        {/* Sort & Filter */}
        <section>
          <SortFilter sortBy={sortBy} onSortChange={setSortBy} filters={filters} onFilterChange={handleFilterChange} lang={lang} />
        </section>

        {/* All Mandis */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "#111827" }}>
            <MapPin size={18} style={{ color: "#16a34a" }} />
            {t.allMandis} ({processedMandis.length})
          </h2>

          {processedMandis.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-3xl mb-2 block">😕</span>
              <p style={{ color: "#9ca3af" }}>{t.noMandis}</p>
              <button
                onClick={() => setFilters({ nearby: false, highProfit: false })}
                className="mt-3 text-sm font-semibold cursor-pointer"
                style={{ color: "#16a34a" }}
              >
                <RotateCcw size={14} className="inline mr-1" />
                {lang === "hi" ? "फ़िल्टर हटाएं" : "Clear Filters"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {processedMandis.map((mandi, i) => (
                <MandiCard
                  key={mandi.mandiName + i}
                  mandi={mandi}
                  index={i}
                  lang={lang}
                  onSelect={setSelectedMandi}
                  isSelected={selectedMandi?.mandiName === mandi.mandiName}
                />
              ))}
            </div>
          )}
        </section>

        {/* Confirm */}
        <section className="pb-8">
          {confirmed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-2xl p-5 text-center"
              style={{ backgroundColor: "#f0fdf4", border: "2px solid #bbf7d0" }}
            >
              <div
                className="w-14 h-14 rounded-full text-white flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: "#16a34a" }}
              >
                <Check size={28} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "#15803d" }}>{t.confirmed}</h3>
              <p className="text-sm mt-1" style={{ color: "#16a34a" }}>
                {selectedMandi?.mandiName || recommendation?.mandiName}
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 px-6 py-3 rounded-xl text-white font-semibold cursor-pointer"
                style={{ backgroundColor: "#16a34a" }}
              >
                {t.newSearch}
              </button>
            </motion.div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleConfirm}
              disabled={confirming}
              className="w-full py-4 rounded-2xl text-white text-lg font-bold cursor-pointer disabled:opacity-50"
              style={{ backgroundColor: "#16a34a", boxShadow: "0 4px 14px rgba(22,163,74,0.3)" }}
            >
              {confirming
                ? "..."
                : `${t.confirmSelection} — ${selectedMandi?.mandiName || recommendation?.mandiName || ""}`}
            </motion.button>
          )}
        </section>
      </main>
    </div>
  );
}
