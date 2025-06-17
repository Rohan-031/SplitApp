import Expense from "../models/Expense.js";
import User from "../models/User.js";

export const addExpense = async (req, res) => {
  try {
    const {
      amount,
      description,
      category,
      paid_by,
      participants,
      split_type = "equal",
      splits = [],
      is_recurring = false,
      recurrence
    } = req.body;

    if (!amount || !paid_by || !participants || participants.length === 0) {
      return res.status(400).json({ message: "Amount, paid_by, and participants are required." });
    }

    let finalSplits = [];

    if (split_type === "equal") {
      const share = amount / participants.length;
      finalSplits = participants.map(userId => ({
        user: userId,
        amount: share
      }));
    } else if (split_type === "percentage") {
      if (!Array.isArray(splits) || splits.length === 0) {
        return res.status(400).json({ message: "Splits must be provided for percentage split." });
      }
      const total = splits.reduce((sum, s) => sum + s.percentage, 0);
      if (total !== 100) {
        return res.status(400).json({ message: "Total percentage must be 100." });
      }

      finalSplits = splits.map(s => ({
        user: s.user,
        amount: (s.percentage / 100) * amount
      }));
    } else if (split_type === "exact") {
      if (!Array.isArray(splits) || splits.length === 0) {
        return res.status(400).json({ message: "Splits must be provided for exact split." });
      }
      const total = splits.reduce((sum, s) => sum + s.amount, 0);
      if (total !== amount) {
        return res.status(400).json({ message: "Exact split amounts must sum up to total amount." });
      }

      finalSplits = splits;
    } else {
      return res.status(400).json({ message: "Invalid split_type" });
    }

    const expense = new Expense({
      amount,
      description,
      category,
      paid_by,
      participants,
      split_type,
      splits: finalSplits,
      is_recurring,
      recurrence
    });

    await expense.save();
    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    console.error("Add expense error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate("paid_by", "name email") // populate with user info
      .populate("participants", "name email");

    res.status(200).json({ success: true, expenses });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch expenses", error: err.message });
  }
};