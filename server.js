// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import expenseRoutes from "./routes/expenses.js";
// import userRoutes from "./routes/users.js"; // ✅ Import user routes

// dotenv.config();
// const app = express();
// app.use(express.json());

// // Routes
// app.use("/api/expenses", expenseRoutes);
// app.use("/api/users", userRoutes); // ✅ Mount user routes

// console.log(process.env.MONGODB_URI);

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(process.env.PORT, () => {
//       console.log("Server running on port", process.env.PORT);
//     });
//   })
//   .catch(err => console.log(err));


import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenses.js";
import userRoutes from "./routes/users.js";
import settlementRoutes from "./routes/settlements.js";



dotenv.config();

const app = express();
app.use(express.json());

// Validate environment variables
if (!process.env.MONGODB_URI || !process.env.PORT) {
  console.error("❌ Missing MONGODB_URI or PORT in .env");
  process.exit(1);
}

// Routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/settlements", settlementRoutes);


// Log URI (for debug only — remove in production)
console.log("Using Mongo URI:", process.env.MONGODB_URI);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(" MongoDB connected");
  app.listen(process.env.PORT, () => {
    console.log(` Server running on port ${process.env.PORT}`);
  });
})
.catch((err) => {
  console.error(" MongoDB connection error:", err.message);
});
