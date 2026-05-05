import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectItem } from "@/components/ui/Select";
import { Slider } from "@/components/ui/Slider";
import { MapPin, Wheat, Truck, Warehouse, Scale, Search, Loader2, ChevronRight, Navigation } from "lucide-react";

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
  "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal"
];

const COMMODITIES = [
  "Wheat","Rice","Maize","Bajra","Jowar",
  "Barley","Gram","Tur/Arhar Dal","Moong Dal","Urad Dal",
  "Masoor Dal","Groundnut","Mustard","Soybean","Sunflower",
  "Cotton","Sugarcane","Potato","Onion","Tomato",
  "Chilli","Turmeric","Ginger","Garlic","Coriander"
];

const QUALITY_GRADES = [
  { value: "A", label: "Grade A — Excellent", labelHindi: "श्रेणी A - उत्कृष्ट" },
  { value: "B", label: "Grade B — Good", labelHindi: "श्रेणी B - अच्छा" },
  { value: "C", label: "Grade C — Average", labelHindi: "श्रेणी C - औसत" },
  { value: "D", label: "Grade D — Below Average", labelHindi: "श्रेणी D - औसत से कम" },
];

const TRANSPORT_OPTIONS = [
  { value: "own", label: "Own Vehicle", labelHindi: "अपना वाहन" },
  { value: "rental", label: "Rental Available", labelHindi: "किराये पर उपलब्ध" },
  { value: "limited", label: "Limited Access", labelHindi: "सीमित पहुंच" },
  { value: "none", label: "No Transport", labelHindi: "परिवहन नहीं" },
];

const STORAGE_OPTIONS = [
  { value: "available", label: "Storage Available", labelHindi: "भंडारण उपलब्ध" },
  { value: "limited", label: "Limited Storage", labelHindi: "सीमित भंडारण" },
  { value: "none", label: "No Storage", labelHindi: "कोई भंडारण नहीं" },
];

function SectionCard({ icon, title, titleHindi, color = "#16a34a", action, children }) {
  return (
    <div style={{
      background: "white", borderRadius: "20px",
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "18px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)",
        display: "flex", alignItems: "center", gap: "12px",
        background: "linear-gradient(135deg, #fafafa, #f8fdf8)",
      }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "12px",
          background: `${color}15`, display: "flex", alignItems: "center",
          justifyContent: "center", color: color, flexShrink: 0,
        }}>
          {icon}
        </div>
        <div>
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f1f0f", margin: 0 }}>{title}</h3>
          <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0, fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{titleHindi}</p>
        </div>
        {action && <div style={{ marginLeft: "auto" }}>{action}</div>}
      </div>
      <div style={{ padding: "20px 24px" }}>
        {children}
      </div>
    </div>
  );
}

export function MandiRecommendationForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [formData, setFormData] = useState({
    village: "", district: "", state: "", commodity: "",
    cropQuality: "B", transportAvailability: "rental",
    storageAvailability: "available", quantity: 10, maxRadius: 100,
  });

  const handleDetectLocation = () => {
    if ("geolocation" in navigator) {
      setIsDetecting(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const res = await axios.get(`http://localhost:5000/api/location/reverse?lat=${lat}&lon=${lon}`);
            if (res.data.success) {
              const { village, district, state } = res.data.data;
              setFormData(prev => ({
                ...prev,
                village: village || prev.village,
                district: district || prev.district,
                state: state || prev.state
              }));
            }
          } catch (error) {
            console.error("Failed to reverse geocode:", error);
            alert("Could not automatically determine exact village/district.");
          } finally {
            setIsDetecting(false);
          }
        },
        (err) => {
          console.error(err);
          alert("Location access denied or unavailable.");
          setIsDetecting(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    sessionStorage.setItem("mandiFormData", JSON.stringify(formData));
    navigate("/find-mandi/results");
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.village && formData.district && formData.state && formData.commodity;

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "12px",
    border: "1.5px solid #e5e7eb", background: "white",
    fontSize: "14px", color: "#0f1f0f", outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Location */}
      <SectionCard 
        icon={<MapPin style={{ width: "18px", height: "18px" }} />} 
        title="Your Location" 
        titleHindi="अपना स्थान दर्ज करें"
        action={
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isDetecting}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 12px", borderRadius: "8px",
              background: "white", border: "1px solid #d1fae5",
              color: "#16a34a", fontSize: "12px", fontWeight: 600,
              cursor: isDetecting ? "not-allowed" : "pointer",
              transition: "all 0.2s"
            }}
          >
            {isDetecting ? <Loader2 style={{ width: "14px", height: "14px", animation: "spin 1s linear infinite" }} /> : <Navigation style={{ width: "14px", height: "14px" }} />}
            {isDetecting ? "Detecting..." : "Auto-Detect"}
          </button>
        }
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
          {[
            { field: "village", label: "Village / Town", placeholder: "Enter your village name", required: true },
            { field: "district", label: "District", placeholder: "Enter your district", required: true },
          ].map(f => (
            <div key={f.field}>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>{f.label}</label>
              <Input
                id={f.field}
                placeholder={f.placeholder}
                value={formData[f.field]}
                onChange={(e) => updateField(f.field, e.target.value)}
                required={f.required}
              />
            </div>
          ))}
          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>State</label>
            <Select
              id="state"
              value={formData.state}
              onValueChange={(value) => updateField("state", value)}
              placeholder="Select your state"
            >
              {INDIAN_STATES.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </SectionCard>

      {/* Crop Details */}
      <SectionCard icon={<Wheat style={{ width: "18px", height: "18px" }} />} title="Crop Details" titleHindi="फसल की जानकारी" color="#d97706">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Commodity / Crop</label>
              <Select
                id="commodity"
                value={formData.commodity}
                onValueChange={(value) => updateField("commodity", value)}
                placeholder="Select your crop"
              >
                {COMMODITIES.map((commodity) => (
                  <SelectItem key={commodity} value={commodity}>{commodity}</SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Crop Quality</label>
              <Select
                id="quality"
                value={formData.cropQuality}
                onValueChange={(value) => updateField("cropQuality", value)}
                placeholder="Select quality grade"
              >
                {QUALITY_GRADES.map((grade) => (
                  <SelectItem key={grade.value} value={grade.value}>{grade.label}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "flex", alignItems: "center", gap: "6px" }}>
                <Scale style={{ width: "14px", height: "14px" }} /> Quantity (Quintals)
              </label>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#16a34a" }}>{formData.quantity} Q</span>
            </div>
            <Slider
              id="quantity"
              value={[formData.quantity]}
              onValueChange={([value]) => updateField("quantity", value)}
              min={1} max={500} step={1}
            />
            <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "6px" }}>
              {formData.quantity} quintals = {(formData.quantity * 100).toLocaleString()} kg
            </p>
          </div>
        </div>
      </SectionCard>

      {/* Transport & Storage */}
      <SectionCard icon={<Truck style={{ width: "18px", height: "18px" }} />} title="Transport & Storage" titleHindi="परिवहन और भंडारण" color="#0284c7">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Transport Availability</label>
            <Select
              id="transport"
              value={formData.transportAvailability}
              onValueChange={(value) => updateField("transportAvailability", value)}
              placeholder="Select transport option"
            >
              {TRANSPORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              <Warehouse style={{ width: "13px", height: "13px" }} /> Storage Availability
            </label>
            <Select
              id="storage"
              value={formData.storageAvailability}
              onValueChange={(value) => updateField("storageAvailability", value)}
              placeholder="Select storage option"
            >
              {STORAGE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </SectionCard>

      {/* Search Radius */}
      <SectionCard icon={<Search style={{ width: "18px", height: "18px" }} />} title="Search Radius" titleHindi="खोज त्रिज्या" color="#7c3aed">
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>Maximum Distance from Village</label>
            <span style={{ fontSize: "18px", fontWeight: 800, color: "#7c3aed" }}>{formData.maxRadius} km</span>
          </div>
          <Slider
            value={[formData.maxRadius]}
            onValueChange={([value]) => updateField("maxRadius", value)}
            min={25} max={300} step={25}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
            {["25 km", "150 km", "300 km"].map(l => (
              <span key={l} style={{ fontSize: "12px", color: "#9ca3af" }}>{l}</span>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || !isFormValid}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
          padding: "18px", borderRadius: "16px",
          background: isFormValid ? "linear-gradient(135deg, #15803d, #16a34a)" : "#e5e7eb",
          border: "none", color: isFormValid ? "white" : "#9ca3af",
          fontSize: "16px", fontWeight: 700, cursor: isFormValid ? "pointer" : "not-allowed",
          boxShadow: isFormValid ? "0 6px 20px rgba(22,163,74,0.4)" : "none",
          transition: "all 0.3s ease", letterSpacing: "-0.01em",
        }}
        onMouseEnter={e => { if (isFormValid && !isLoading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(22,163,74,0.5)"; } }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = isFormValid ? "0 6px 20px rgba(22,163,74,0.4)" : "none"; }}
      >
        {isLoading ? (
          <><Loader2 style={{ width: "20px", height: "20px", animation: "spin 1s linear infinite" }} /> Finding Best Mandis...</>
        ) : (
          <><Search style={{ width: "20px", height: "20px" }} /> Find Best Mandi <ChevronRight style={{ width: "18px", height: "18px" }} /></>
        )}
      </button>
      {!isFormValid && (
        <p style={{ textAlign: "center", fontSize: "13px", color: "#9ca3af" }}>
          Please fill in Location, Crop, and State to continue
        </p>
      )}
      {isFormValid && (
        <p style={{ textAlign: "center", fontSize: "13px", color: "#6b7280" }}>
          We'll analyze all mandis in your area and recommend the best options
        </p>
      )}
    </form>
  );
}

export default MandiRecommendationForm;
