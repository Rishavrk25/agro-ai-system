import express from "express";
import { createShipment } from "../controllers/shipmentController.js";
import { getRankedShipments } from "../controllers/shipmentController.js";
import { getWeatherRisk } from "../services/weatherService.js";

const router = express.Router();

router.post("/", createShipment);
router.get("/ranked", getRankedShipments);

// testing weather api
// router.post("/weather", async (req, res) => {
//   const data = req.body;
//   console.log(data);
//   const weatherRisk = await getWeatherRisk(data.city || "Delhi");
//   res.send(weatherRisk);
// });

export default router;
