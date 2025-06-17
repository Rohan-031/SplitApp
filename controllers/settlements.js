// controllers/settlements.js
import Expense from "../models/Expense.js";
import User from "../models/User.js";

export const calculateSettlements = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const balances = {}; // { userId: netBalance }

    // Step 1: Calculate balances
    expenses.forEach(exp => {
      const { amount, paid_by, participants, split_type } = exp;
      const total = amount;

      let sharePerUser = 0;
      if (split_type === "equal") {
        sharePerUser = total / participants.length;

        participants.forEach(userId => {
          const uid = userId.toString();
          const paidId = paid_by.toString();

          if (!balances[uid]) balances[uid] = 0;

          if (uid === paidId) {
            balances[uid] += total - sharePerUser;
          } else {
            balances[uid] -= sharePerUser;
          }
        });
      }
    });

    // Step 2: Separate creditors and debtors
    const creditors = [];
    const debtors = [];

    Object.entries(balances).forEach(([userId, balance]) => {
      if (balance > 0) creditors.push({ userId, amount: balance });
      else if (balance < 0) debtors.push({ userId, amount: -balance });
    });

    // Step 3: Simplify settlements
    const settlements = [];

    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];

      const settleAmount = Math.min(debtor.amount, creditor.amount);

      settlements.push({
        from: debtor.userId,
        to: creditor.userId,
        amount: settleAmount
      });

      debtor.amount -= settleAmount;
      creditor.amount -= settleAmount;

      if (debtor.amount === 0) i++;
      if (creditor.amount === 0) j++;
    }

    // Step 4: Replace IDs with names
    const userIds = Array.from(new Set(settlements.flatMap(s => [s.from, s.to])));
    const users = await User.find({ _id: { $in: userIds } });

    const userMap = {};
    users.forEach(user => {
      userMap[user._id.toString()] = user.name;
    });

    const settlementsWithNames = settlements.map(s => ({
      from: userMap[s.from],
      to: userMap[s.to],
      amount: s.amount
    }));

    res.json({ settlements: settlementsWithNames });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error calculating settlements" });
  }
};
