import { LABELS } from "../utils/constants";

export default function SortFilter({ sortBy, onSortChange, filters, onFilterChange, lang = "en" }) {
  const t = LABELS[lang];

  const sortOptions = [
    { value: "dps", label: "DPS" },
    { value: "profit", label: t.profit },
    { value: "distance", label: t.distance },
  ];

  return (
    <div className="space-y-3">
      {/* Sort */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <span className="text-xs font-semibold whitespace-nowrap" style={{ color: "#9ca3af" }}>{t.sortBy}:</span>
        {sortOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSortChange(opt.value)}
            className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all cursor-pointer"
            style={{
              backgroundColor: sortBy === opt.value ? "#16a34a" : "white",
              color: sortBy === opt.value ? "white" : "#6b7280",
              border: sortBy === opt.value ? "none" : "1px solid #e5e7eb",
              boxShadow: sortBy === opt.value ? "0 2px 8px rgba(22,163,74,0.3)" : "none",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button
          onClick={() => onFilterChange("nearby")}
          className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all cursor-pointer"
          style={{
            backgroundColor: filters.nearby ? "#3b82f6" : "white",
            color: filters.nearby ? "white" : "#6b7280",
            border: filters.nearby ? "none" : "1px solid #e5e7eb",
            boxShadow: filters.nearby ? "0 2px 8px rgba(59,130,246,0.3)" : "none",
          }}
        >
          📍 {lang === "hi" ? "पास में" : "Nearby Only"}
        </button>
        <button
          onClick={() => onFilterChange("highProfit")}
          className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all cursor-pointer"
          style={{
            backgroundColor: filters.highProfit ? "#16a34a" : "white",
            color: filters.highProfit ? "white" : "#6b7280",
            border: filters.highProfit ? "none" : "1px solid #e5e7eb",
            boxShadow: filters.highProfit ? "0 2px 8px rgba(22,163,74,0.3)" : "none",
          }}
        >
          💰 {t.highProfit}
        </button>
      </div>
    </div>
  );
}
