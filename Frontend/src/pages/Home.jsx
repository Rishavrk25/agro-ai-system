import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Wheat, Globe } from "lucide-react";
import FormWizard from "../components/FormWizard";
import Loader from "../components/Loader";
import { recommendMandi } from "../services/api";
import { LABELS } from "../utils/constants";

export default function Home() {
  const navigate = useNavigate();
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const t = LABELS[lang];

  const toggleLang = () => {
    const next = lang === "en" ? "hi" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await recommendMandi(
        {
          village: formData.village,
          district: formData.district,
          state: formData.state,
          commodity: formData.commodity,
          cropQuality: formData.cropQuality,
          transportAvailability: formData.transportAvailability,
          storageAvailability: formData.storageAvailability,
          quantity: formData.quantity,
        },
        formData.maxRadius,
      );
      navigate("/results", {
        state: { data: res.data.data, formData, lang },
      });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader lang={lang} />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderColor: "#f3f4f6" }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ maxWidth: 512, margin: "0 auto" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", boxShadow: "0 4px 12px rgba(22,163,74,0.3)" }}
            >
              <Wheat size={20} color="white" />
            </div>
            <div>
              <h1 className="text-base font-extrabold leading-tight" style={{ color: "#111827" }}>
                {t.appTitle}
              </h1>
              <p className="text-xs" style={{ color: "#9ca3af" }}>
                {t.appSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold cursor-pointer transition-colors"
            style={{ backgroundColor: "#f3f4f6", color: "#6b7280" }}
          >
            <Globe size={14} />
            {lang === "en" ? "हिंदी" : "EN"}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="px-4 sm:px-6 py-8" style={{ maxWidth: 512, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Tractor Illustration */}
          <div className="text-center mb-6">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-4"
              style={{ background: "linear-gradient(135deg, #dcfce7, #bbf7d0)" }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-4xl">🚜</span>
            </motion.div>
          </div>

          {/* Form Wizard */}
          <FormWizard onSubmit={handleSubmit} lang={lang} />

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 max-w-lg mx-auto rounded-2xl p-4 text-center"
              style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}
            >
              <p className="font-semibold text-sm" style={{ color: "#dc2626" }}>{error}</p>
              <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                {lang === "hi" ? "खोज दूरी बढ़ाकर देखें" : "Try increasing the search radius"}
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
