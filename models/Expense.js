import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: String,
  category: {
    type: String,
    enum: ["Food", "Travel", "Utilities", "Entertainment", "Other"],
    default: "Other"
  },
  paid_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  split_type: {
    type: String,
    enum: ["equal", "percentage", "exact"],
    default: "equal"
  },
  splits: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: Number
    }
  ],
  is_recurring: { type: Boolean, default: false },
  recurrence: {
    type: { type: String }, // e.g., "monthly", "weekly"
    interval: Number
  },
  created_at: { type: Date, default: Date.now }
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
