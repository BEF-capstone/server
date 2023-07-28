const express = require("express");
const router = express.Router();
const apiKey = process.env.OPENAI_API_KEY;

// route health check
router.get("/", async (req, res, next) => {
  return res.status(200).json({ message: "in OpenAi route" });
});

// make POST req to OpenAI API
router.post("/create_recipe", async (req, res, next) => {
  // get message info from req.body
  const cuisine = req.body.cuisine;
  const ingredients = req.body.ingredients;
  console.log("cuisine: ", cuisine);
  console.log("ingredients: ", ingredients);
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
            "Respond in JSON format with recipeName, recipeDescription, difficulty, servings, ingredients array, instructions array, prepTime",
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
    console.log(data);
    res.send(data);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
