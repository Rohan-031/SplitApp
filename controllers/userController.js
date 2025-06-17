// controllers/userController.js
import User from "../models/User.js";

// Add a new user
export const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: "User added", user });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};
