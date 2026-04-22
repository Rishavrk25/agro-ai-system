import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PROFIT_THRESHOLDS, LABELS } from "../utils/constants";

// Fix default marker icons in bundled builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function createColorIcon(color) {
  const hue = color === "green" ? 120 : color === "yellow" ? 50 : 0;
  return L.divIcon({
    className: "",
    html: `<div style="width:28px;height:28px;border-radius:50%;background:hsl(${hue},70%,50%);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

const farmerIcon = L.divIcon({
  className: "",
  html: `<div style="width:32px;height:32px;border-radius:50%;background:#3b82f6;border:3px solid white;box-shadow:0 2px 10px rgba(59,130,246,0.5);display:flex;align-items:center;justify-content:center;font-size:16px;">📍</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function FitBounds({ positions }) {
  const map = useMap();
  const fitted = useRef(false);
  useEffect(() => {
    if (positions.length > 0 && !fitted.current) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [40, 40] });
      fitted.current = true;
    }
  }, [positions, map]);
  return null;
}

export default function MandiMap({ farmerLocation, mandis, lang = "en" }) {
  const t = LABELS[lang];
  if (!farmerLocation || !mandis || mandis.length === 0) return null;

  const center = [farmerLocation.latitude, farmerLocation.longitude];
  const positions = [center, ...mandis.filter(m => m.latitude && m.longitude).map(m => [m.latitude, m.longitude])];

  // Note: We don't have lat/lon in allMandis from API response by default.
  // The map will show farmer location and any mandis that have coordinates.
  const mandisWithCoords = mandis.filter(m => m.latitude && m.longitude);

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-700">🗺️ {t.mapTitle}</h3>
      </div>
      <MapContainer center={center} zoom={8} style={{ height: "320px", width: "100%" }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds positions={positions} />

        {/* Farmer marker */}
        <Marker position={center} icon={farmerIcon}>
          <Popup><strong>{t.farmerLocation}</strong><br />{farmerLocation.village}, {farmerLocation.district}</Popup>
        </Marker>

        {/* Mandi markers */}
        {mandisWithCoords.map((m, i) => {
          const color = m.netProfit >= PROFIT_THRESHOLDS.high ? "green" : m.netProfit >= PROFIT_THRESHOLDS.medium ? "yellow" : "red";
          return (
            <Marker key={i} position={[m.latitude, m.longitude]} icon={createColorIcon(color)}>
              <Popup>
                <strong>{m.mandiName}</strong><br />
                {t.netProfit}: ₹{m.netProfit?.toLocaleString()}<br />
                {t.distance}: {m.distanceKm} {t.km}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
