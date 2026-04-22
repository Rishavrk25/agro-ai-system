import { motion } from "framer-motion";
import { LABELS } from "../utils/constants";

export default function Loader({ lang = "en" }) {
  const t = LABELS[lang];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6" style={{ backgroundColor: "#f9fafb" }}>
      {/* Animated grain icon */}
      <div className="relative mb-8">
        <motion.div
          className="w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", boxShadow: "0 10px 30px rgba(22,163,74,0.3)" }}
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-4xl">🌾</span>
        </motion.div>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{ top: "50%", left: "50%", backgroundColor: "#22c55e" }}
            animate={{
              x: [0, Math.cos((i * 2 * Math.PI) / 3) * 50, 0],
              y: [0, Math.sin((i * 2 * Math.PI) / 3) * 50, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Text */}
      <motion.h2
        className="text-xl font-bold text-center mb-2"
        style={{ color: "#111827" }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {t.loading}
      </motion.h2>
      <p className="text-sm text-center mb-8" style={{ color: "#9ca3af" }}>
        {t.loadingSubtext}
      </p>

      {/* Skeleton cards */}
      <div className="w-full space-y-4" style={{ maxWidth: 512, margin: "0 auto" }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            className="rounded-2xl p-5"
            style={{ backgroundColor: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl animate-pulse" style={{ backgroundColor: "#f3f4f6" }} />
              <div className="flex-1">
                <div className="h-4 rounded-lg w-1/2 mb-2 animate-pulse" style={{ backgroundColor: "#f3f4f6" }} />
                <div className="h-3 rounded-lg w-1/3 animate-pulse" style={{ backgroundColor: "#f9fafb" }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((j) => (
                <div key={j} className="h-8 rounded-lg animate-pulse" style={{ backgroundColor: "#f9fafb" }} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
