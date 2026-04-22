import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Wheat,
  Truck,
  ChevronRight,
  ChevronLeft,
  Search,
  Warehouse,
  Package,
  Ruler,
  Sparkles,
} from "lucide-react";
import {
  INDIAN_STATES,
  COMMODITIES,
  QUALITY_MAP,
  LABELS,
} from "../utils/constants";

const STORAGE_KEY = "cropOptimizer_lastInput";

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function FormWizard({ onSubmit, lang = "en" }) {
  const t = LABELS[lang];
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      village: "",
      district: "",
      state: "",
      commodity: "",
      cropQuality: 1,
      transportAvailability: 80,
      storageAvailability: 70,
      quantity: 10,
      maxRadius: 200,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 2));
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = () => {
    onSubmit({
      ...form,
      cropQuality: QUALITY_MAP[form.cropQuality].value,
    });
  };

  const canProceedStep0 = form.village && form.district && form.state;
  const canProceedStep1 = form.commodity && form.quantity > 0;

  const steps = [
    { icon: MapPin, title: t.step1Title, subtitle: t.step1Subtitle },
    { icon: Wheat, title: t.step2Title, subtitle: t.step2Subtitle },
    { icon: Truck, title: t.step3Title, subtitle: t.step3Subtitle },
  ];

  return (
    <div className="w-full px-1" style={{ maxWidth: 512, margin: "0 auto" }}>
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <motion.div
              className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === step ? "#16a34a" : i < step ? "#22c55e" : "#e5e7eb",
                color: i <= step ? "white" : "#9ca3af",
                boxShadow: i === step ? "0 4px 14px rgba(22,163,74,0.4)" : "none",
                transform: i === step ? "scale(1.1)" : "scale(1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <s.icon size={20} />
            </motion.div>
            {i < 2 && (
              <div
                className="h-1 w-10 rounded-full transition-colors duration-300"
                style={{ backgroundColor: i < step ? "#22c55e" : "#e5e7eb" }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Title */}
      <motion.div
        key={`title-${step}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold" style={{ color: "#111827" }}>
          {steps[step].title}
        </h2>
        <p className="mt-1" style={{ color: "#6b7280" }}>
          {steps[step].subtitle}
        </p>
      </motion.div>

      {/* Form Steps */}
      <div className="relative overflow-hidden" style={{ minHeight: 320 }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-5"
          >
            {step === 0 && (
              <>
                <InputField icon={MapPin} label={t.village} placeholder={t.villagePlaceholder} value={form.village} onChange={(v) => update("village", v)} />
                <InputField icon={MapPin} label={t.district} placeholder={t.districtPlaceholder} value={form.district} onChange={(v) => update("district", v)} />
                <SelectField icon={MapPin} label={t.state} placeholder={t.statePlaceholder} value={form.state} options={INDIAN_STATES} onChange={(v) => update("state", v)} />
              </>
            )}

            {step === 1 && (
              <>
                <SelectField icon={Wheat} label={t.commodity} placeholder={t.commodityPlaceholder} value={form.commodity} options={COMMODITIES} onChange={(v) => update("commodity", v)} />
                <SliderField
                  icon={Sparkles}
                  label={t.cropQuality}
                  value={form.cropQuality}
                  min={0}
                  max={2}
                  step={1}
                  displayValue={lang === "hi" ? [t.qualityLow, t.qualityMedium, t.qualityHigh][form.cropQuality] : QUALITY_MAP[form.cropQuality].label}
                  onChange={(v) => update("cropQuality", Number(v))}
                  marks={[t.qualityLow, t.qualityMedium, t.qualityHigh]}
                />
                <InputField icon={Package} label={t.quantity} placeholder={t.quantityPlaceholder} value={form.quantity} type="number" onChange={(v) => update("quantity", Number(v))} />
              </>
            )}

            {step === 2 && (
              <>
                <ToggleField icon={Truck} label={t.transportAvailability} value={form.transportAvailability >= 50} onChange={(v) => update("transportAvailability", v ? 80 : 20)} yesLabel={t.yes} noLabel={t.no} />
                <ToggleField icon={Warehouse} label={t.storageAvailability} value={form.storageAvailability >= 50} onChange={(v) => update("storageAvailability", v ? 70 : 20)} yesLabel={t.yes} noLabel={t.no} />
                <SliderField icon={Ruler} label={t.maxRadius} value={form.maxRadius} min={50} max={500} step={25} displayValue={`${form.maxRadius} ${t.km}`} onChange={(v) => update("maxRadius", Number(v))} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={goBack}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-lg font-semibold cursor-pointer"
            style={{ border: "2px solid #e5e7eb", color: "#6b7280", backgroundColor: "white" }}
          >
            <ChevronLeft size={20} />
            {t.back}
          </motion.button>
        )}

        {step < 2 ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={goNext}
            disabled={step === 0 ? !canProceedStep0 : !canProceedStep1}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-white text-lg font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#16a34a", boxShadow: "0 4px 14px rgba(22,163,74,0.3)" }}
          >
            {t.next}
            <ChevronRight size={20} />
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-white text-lg font-semibold cursor-pointer"
            style={{ backgroundColor: "#16a34a", boxShadow: "0 4px 14px rgba(22,163,74,0.3)" }}
          >
            <Search size={20} />
            {t.findMandi}
          </motion.button>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════════════════════════════════ */

function InputField({ icon: Icon, label, placeholder, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: "#6b7280" }}>
        <Icon size={16} style={{ color: "#16a34a" }} />
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-input"
      />
    </div>
  );
}

function SelectField({ icon: Icon, label, placeholder, value, options, onChange }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: "#6b7280" }}>
        <Icon size={16} style={{ color: "#16a34a" }} />
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function SliderField({ icon: Icon, label, value, min, max, step, displayValue, onChange, marks }) {
  return (
    <div>
      <label className="flex items-center justify-between mb-3">
        <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#6b7280" }}>
          <Icon size={16} style={{ color: "#16a34a" }} />
          {label}
        </span>
        <span
          className="text-sm font-bold px-3 py-1 rounded-full"
          style={{ color: "#16a34a", backgroundColor: "#f0fdf4" }}
        >
          {displayValue}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-range"
      />
      {marks && (
        <div className="flex justify-between mt-2 text-xs" style={{ color: "#9ca3af" }}>
          {marks.map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function ToggleField({ icon: Icon, label, value, onChange, yesLabel, noLabel }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: "#6b7280" }}>
        <Icon size={16} style={{ color: "#16a34a" }} />
        {label}
      </label>
      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(true)}
          className="flex-1 py-4 rounded-xl text-lg font-semibold cursor-pointer transition-all"
          style={{
            backgroundColor: value ? "#16a34a" : "#f3f4f6",
            color: value ? "white" : "#9ca3af",
            boxShadow: value ? "0 4px 14px rgba(22,163,74,0.3)" : "none",
          }}
        >
          {yesLabel}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(false)}
          className="flex-1 py-4 rounded-xl text-lg font-semibold cursor-pointer transition-all"
          style={{
            backgroundColor: !value ? "#dc2626" : "#f3f4f6",
            color: !value ? "white" : "#9ca3af",
            boxShadow: !value ? "0 4px 14px rgba(220,38,38,0.3)" : "none",
          }}
        >
          {noLabel}
        </motion.button>
      </div>
    </div>
  );
}
