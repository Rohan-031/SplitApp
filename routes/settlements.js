import express from "express";
import { calculateSettlements } from "../controllers/settlements.js";

const router = express.Router();

router.get("/calculate", calculateSettlements);

export default router;
