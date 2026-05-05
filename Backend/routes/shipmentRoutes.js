import express from "express";
import { recommendMandi, confirmMandi } from "../controllers/mandiController.js";


const router = express.Router();

router.post("/recommend-mandi", recommendMandi);
router.post("/confirm-mandi", confirmMandi);

export default router;
