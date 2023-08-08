const express = require("express");
const router = express.Router();
const apiKey = process.env.OPENAI_API_KEY;

/* Health Check */
router.get("/", async (req, res, next) => {
  return res.status(200).json({ message: "in OpenAi route" });
});

/* POST a req to openAI endpoint to create a recipe */
router.post("/create_recipe", async (req, res, next) => {
  const cuisine = req.body.cuisine;
  const ingredients = req.body.ingredients;
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
            "Respond in JSON format with recipe_name, description, difficulty, servings, ingredients array, instructions array, prep_time",
        },
        {
          role: "user",
          content: `Create a ${cuisine} recipe with the following ingredients: ${ingredients.join()}`,
        },
      ],
    }),
  };
  try {
    // make call to openAI completions endpoint
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    // data is openAI response with
    const data = await response.json();
    res.send(data);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
