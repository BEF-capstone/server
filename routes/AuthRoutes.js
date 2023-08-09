const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User");

/* Health Check */
router.get("/", async (req, res, next) => {
  try {
    return res.status(201).json({ message: "in auth users route" });
  } catch (e) {
    next(e);
  }
});

// Login an existing user
// Verify and compare that user exists in users table
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    // Sign and assign token
    const token = jwt.sign(
      { userID: user.id, userName: user.firstname },
      config.SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res
      .status(200)
      .json({ message: "login succesful", token: token, user: user });
  } catch (err) {
    next(err);
  }
});

// Register a new user in database
// Verify that user credentials are valid
// Assign a token
router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register(req.body);
    // Sign and assign token
    const token = jwt.sign(
      { userID: user.id, userName: user.firstname },
      config.SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res
      .status(201)
      .json({ message: "registration succesful", token: token, user: user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
