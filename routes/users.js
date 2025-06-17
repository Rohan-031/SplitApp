import express from "express";
import { addUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/addUser", addUser);        // POST /api/users
router.get("/getAllUsers", getAllUsers); 
   // GET /api/users

export default router;
