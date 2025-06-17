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


// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import expenseRoutes from "./routes/expenses.js";
// import userRoutes from "./routes/users.js";
// import settlementRoutes from "./routes/settlements.js";

// dotenv.config();

// const app = express();
// app.use(express.json());

// // ✅ Check required environment variables
// if (!process.env.MONGODB_URI || !process.env.PORT) {
//   console.error("❌ Missing MONGODB_URI or PORT in .env or Railway variables");
//   process.exit(1);
// }

// // ✅ API Routes
// app.use("/api/expenses", expenseRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/settlements", settlementRoutes);


// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(process.env.PORT, () => {
//       console.log(`🚀 Server running on port ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err.message);
//   });



// server.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenses.js";
import userRoutes from "./routes/users.js";
import settlementRoutes from "./routes/settlements.js";

dotenv.config();

const app = express();
app.use(express.json());

// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ MONGODB_URI is missing in environment variables.");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    // Start server only after DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// Routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/settlements", settlementRoutes);
