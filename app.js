const express = require("express"); // importing express
const cors = require("cors"); // imorting cors
const morgan = require("morgan"); // Import the Morgan middleware for logging

const app = express(); // calling using express in the app as a function
// importing the auth routes
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors()); // Enable CORS middleware to handle cross-origin requests
app.use(morgan("dev")); // Use Morgan middleware with 'dev' format for request logging
app.use(express.json()); // Parse incoming requests with JSON payloads

// enabling the /api/auth route - using the imported auth routes
app.use("/api/auth", authRoutes);

// health check
app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  });
});

module.exports = app;
