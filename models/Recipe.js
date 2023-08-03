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
      createdBy,
    } = recipeData;
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
    await prisma.userRecipes.create({
      data: {
        user: { connect: { id: createdBy } },
        recipe: { connect: { id: newRecipe.id } },
      },
    });
    return newRecipe;
  };

  // READ all recipes
  static getAllRecipes = async () => {
    return await prisma.recipe.findMany();
  };

  // READ all recipes for user based on userId
  static getUserRecipes = async (userId) => {
    const userRecipes = await prisma.userRecipes.findMany({
      where: {
        userId: userId,
      },
      include: {
        recipe: true,
      },
    });
    const recipesArray = userRecipes.map((userRecipe) => userRecipe.recipe);
    return recipesArray;
  };

  // READ and return a recipe based on recipe name and userId
  static getRecipeByName = async (recipeRequestData) => {
    // const { userId, recipeId } = recipeRequestData;
    const { recipeName } = recipeRequestData;
    const userRecipeByName = await prisma.recipe.findFirst({
      where: {
        recipe_name: recipeName,
      },
      // where: {
      //   id: recipeId,
      //   createdBy: {
      //     some: {
      //       userId: userId,
      //     },
      //   },
      // },
    });
    return userRecipeByName;
  };
}

module.exports = Recipe;
