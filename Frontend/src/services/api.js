import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const createShipment = (data) => API.post("/shipments", data);

export const getRankedShipments = () =>
  API.get("/shipments/ranked");