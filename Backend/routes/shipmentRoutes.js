import express from "express";
import { createShipment } from "../controllers/shipmentController.js";
import { getRankedShipments } from "../controllers/shipmentController.js";

const router = express.Router();

router.post("/", createShipment);
router.get("/ranked", getRankedShipments);

export default router;