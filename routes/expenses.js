import express from "express";
import { addExpense , getAllExpenses } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/addExpense", addExpense); // POST /expenses
router.get("/getAllExpenses", getAllExpenses); // POST /expenses

export default router;
