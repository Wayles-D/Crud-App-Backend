const express = require("express");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, adminSecret } = req.body;

    let finalRole = "user";

    if(role === "admin" && adminSecret === process.env.ADMIN_SECRET) {
        console.log("Correct admin secret provided. Assigning admin role.");
        finalRole = "admin";
    
    } else if (role === "admin") {
        console.log("Normal user registration.");
        
    }
    const user = await User.create({ firstName, lastName, email, password, role: finalRole });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.log("Error registering user:", error.message);
    
    res.status(500).json({ error: error.message });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("User found:", user);
    if (!user) return res.status(404).json({message: "user not found"});

    const isMatch = await user.comparePassword(password);
    if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = await user.generateToken();
    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;