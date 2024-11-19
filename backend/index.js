const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 8080;

// MongoDB Atlas Connection String (Replace with your actual connection string)
const MONGODB_URI =
  "mongodb+srv://shreyastungar762:EsrJXcT5KkBIq6qx@cluster0.cyfia.mongodb.net/";

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

// Middleware
app.use(
  cors({
    origin: "https://cloud-user-regrastration.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());

// Database Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Server Running Check
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { username, email, phoneNumber } = req.body;

    // Validation
    if (!username || !email || !phoneNumber) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: email },
        { username: username },
        { phoneNumber: phoneNumber },
      ],
    });

    if (existingUser) {
      return res.status(409).json({
        message:
          "User with this email, username, or phone number already exists",
      });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      phoneNumber,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      data: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Dashboard Route (Fetch Users)
app.get("/dashboard", async (req, res) => {
  try {
    // Fetch all users, but only return non-sensitive information
    const users = await User.find({}, "username email phoneNumber");

    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    res.status(500).json({ message: "Server error fetching users" });
  }
});

// Error Handling Middleware
app.use("*", (req, res) => {
  res.status(404).send("Page Not Available");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is Running on Port: ${PORT}`);
});
