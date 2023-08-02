const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe");

/* Recipes health check */
router.get("/", async (req, res, next) => {
  try {
    return res.status(201).json({ message: "in recipe route" });
  } catch (e) {
    next(e);
  }
});

/* READ all users recipe entries */
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

/* READ user recipes */
router.post("/user-recipes", async (req, res, next) => {
  try {
    if (req.body.userId !== "") {
      const userRecipes = await Recipe.getUserRecipes(req.body.userId);
      console.log(`back in user recipes route`);
      console.log(userRecipes);
      return res
        .status(201)
        .json({ message: "recipe added", recipe: userRecipes });
    }
  } catch (e) {
    next(e);
  }
});

/* CREATE a new recipe entry */
router.post("/add-recipe", async (req, res, next) => {
  try {
    const recipe = await Recipe.insertRecipe(req.body);
    return res.status(201).json({ message: "recipe added", recipe: recipe });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
