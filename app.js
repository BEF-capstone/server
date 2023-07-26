const express = require("express"); // importing express
const cors = require("cors"); // imorting cors
const morgan = require("morgan"); // Import the Morgan middleware for logging
const app = express(); // calling using express in the app as a function

// Middleware
app.use(cors()); // Enable CORS middleware to handle cross-origin requests
app.use(morgan("dev")); // Use Morgan middleware with 'dev' format for request logging
app.use(express.json()); // Parse incoming requests with JSON payloads

const openAIKey = process.env.OPENAI_API_KEY;

// Defining Controllers
const authRoutes = require("./routes/AuthRoutes");
const openAIRoutes = require("./routes/OpenAiRoutes");

// Defining Models
const User = require("./models/User");

// enabling the /api/auth route
app.use("/api/auth", authRoutes);
app.use("/api/openAi", openAIRoutes);

// health check
app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  });
});

module.exports = app;
