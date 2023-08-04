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

/* CREATE a new recipe entry */
router.post("/add-recipe", async (req, res, next) => {
  try {
    console.log(`trying to add recipe`);
    const recipe = await Recipe.insertRecipe(req.body);
    console.log(`successfully added recipe`);
    return res.status(201).json({ message: "recipe added", recipe: recipe });
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
      return res
        .status(201)
        .json({ message: "recipe added", recipe: userRecipes });
    }
  } catch (e) {
    next(e);
  }
});

/* READ find a recipe by recipe name in userRecipe table*/
router.post("/recipe-by-name", async (req, res, next) => {
  try {
    const recipe = await Recipe.getRecipeByName(req.body);
    return res.status(201).json({ message: "found recipe", recipe: recipe });
  } catch (e) {
    next(e);
  }
});

/* DELETE a recipe from the recipe table */
router.post("/delete-recipe", async (req, res, next) => {
  try {
    console.log(`in delete recipe route`);
    const recipeRes = await Recipe.deleteRecipe(req.body);
    return res.status(200).json(recipeRes);
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
