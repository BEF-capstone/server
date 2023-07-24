const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const User = require("../models/User");

router.get("/", async (req, res, next) => {
  try {
    return res.status(201).json({ message: "in auth users route" });
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register(req.body);
    // sign and assign token
    const token = jwt.sign(
      { userID: user.id, userName: user.name },
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
