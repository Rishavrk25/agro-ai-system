import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const recommendMandi = (data, maxRadius) =>
  API.post(
    `/shipments/recommend-mandi${maxRadius ? `?maxRadius=${maxRadius}` : ""}`,
    data,
  );

export const confirmMandi = (data) =>
  API.post("/shipments/confirm-mandi", data);

export default API;