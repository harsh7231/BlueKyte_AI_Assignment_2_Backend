const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the required fields are provided
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    } else {
      // Hash the password using bcrypt
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword,
      });

      await newUser.save();

      // Generate and return the JWT token after sign up
      const user = await User.findOne({ username });
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });
      res.status(201).json({
        message: "User registered successfully",
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the required fields are provided
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Please provide username and password" });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    } else {
      // Generate and return the JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });
      res.status(200).json({ message: "Login successful", token });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};
