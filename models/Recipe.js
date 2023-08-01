const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Recipe {
  /**
   * CREATE a recipe entry
   * @param {Object} user
   */
  static insertRecipe = async (recipeData) => {
    const {
      recipe_name,
      description,
      prep_time,
      difficulty,
      servings,
      instructions,
      ingredients,
    } = recipeData;

    // let instructionsJSON = JSON.stringify(instructions);
    // let ingredientsJSON = JSON.stringify(ingredients);

    const newRecipe = await prisma.recipe.create({
      data: {
        recipe_name: recipe_name,
        description: description,
        prep_time: prep_time,
        difficulty: difficulty,
        servings: servings,
        instructions: instructions,
        ingredients: ingredients,
      },
    });

    // do getUserID from email

    return newRecipe;
  };

  // READ all recipes
  static getAllRecipes = async () => {
    return await prisma.recipe.findMany();
  };
}

module.exports = Recipe;
