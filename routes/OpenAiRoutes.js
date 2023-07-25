const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.OPENAI_API_KEY;

router.get("/", async (req, res, next) => {
  return res.status(200).json({ message: "in OpenAi route" });
});

router.post("/completions", async (req, res, next) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "make an italian recipe with the following ingredients, tomato, garlic, pasta, bacon",
        },
      ],
      max_tokens: 1000,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (e) {}
});

router.post("/create_recipe", async (req, res, next) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Respond in JSON format with recipe_name, difficulty, servings, ingredients array, instructions array, prep_time",
        },
        {
          role: "user",
          content:
            "Create an italian recipe with the following ingredients: tomato, garlic, pasta, bacon",
        },
      ],
    }),
  };
  try {
    const message = await req.body.message;
    console.log("message: ", message);
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
