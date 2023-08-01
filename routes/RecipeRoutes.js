const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe");

router.get("/", async (req, res, next) => {
  try {
    return res.status(201).json({ message: "in recipe route" });
  } catch (e) {
    next(e);
  }
});

// READ all recipe entries
router.get("/read-recipes", async (req, res, next) => {
  try {
    const recipes = await Recipe.getAllRecipes();
    return res
      .status(201)
      .json({ message: "list of recipes", recipes: recipes });
  } catch (e) {
    next(e);
  }
});

// CREATE a new recipe entry
router.post("/create-recipe", async (req, res, next) => {
  try {
    const recipe = await Recipe.insertRecipe(req.body);
    return res.status(201).json({ message: "recipe added", recipe: recipe });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
