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
  static getRecipeByName = async (recipeReqData) => {
    // const { userId, recipeId } = recipeRequestData;
    const { recipeName } = recipeReqData;
    const userRecipeByName = await prisma.recipe.findFirst({
      where: {
        recipe_name: recipeName,
      },
    });
    return userRecipeByName;
  };

  // DELETE and return a deleted recipe
  static deleteRecipe = async (recipeReqData) => {
    const { recipeId, userId } = recipeReqData;
    try {
      const recipe = await prisma.recipe.findUnique({
        where: {
          id: recipeId,
        },
        select: {
          createdBy: {
            take: 1,
            where: {
              userId: userId,
            },
          },
        },
      });

      if (!recipe) {
        return {
          success: false,
          message: `Recipe with ID ${recipeId} not found for user with ID ${userId}`,
        };
      }

      if (recipe) {
        await prisma.userFavorites.deleteMany({
          where: { recipeId },
        });

        await prisma.userRecipes.deleteMany({
          where: { recipeId },
        });

        await prisma.recipe.delete({
          where: { id: recipeId },
        });
        return {
          success: true,
          message: `Recipe with ID ${recipeId} deleted succesfully`,
        };
      } else {
        return {
          success: false,
          message: `Recipe with ID ${recipeId} not found for user with ID ${userId}`,
        };
      }
    } catch (e) {
      console.error(`Error deleting recipe with ID ${recipeId}`, e);
      return {
        success: false,
        message: `Failed to delete Recipe with ID ${recipeID}`,
      };
    }
  };
}

module.exports = Recipe;
