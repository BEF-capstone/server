const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class GroceryList {
  /**
   * Get a user's grocery list
   * @param {req} data
   * @returns
   */
  static getGroceryList = async (data) => {
    const { userId } = data;
    const userGroceryList = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        groceryList: true,
      },
    });

    if (!userGroceryList) {
      throw new Error("User not found.");
    }

    return userGroceryList.groceryList;
  };

  /**
   * Add an item to a user's grocery list
   * @param {req} data
   * @returns
   */
  static addItem = async (data) => {
    const { userId, newItem } = data;
    console.log(userId, newItem);
    const newGroceryListItem = {
      item: newItem,
    };

    // find the user
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // user not found
    if (!user) {
      console.error(`user does not exist`);
      return;
    }

    // added the new item to the user's grocery list
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        groceryList: {
          create: [newGroceryListItem], // Add the new item to the existing list
        },
      },
      include: {
        groceryList: true, // Fetch the updated grocery list
      },
    });

    return updatedUser.groceryList;
  };

  /**
   * Remove an item from a user's grocery list
   * @param {req} data
   * @returns
   */
  static removeItem = async (data) => {
    console.log(data);
    const { userId, id } = data;

    // find the user
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // user not found
    if (!user) {
      console.error(`user does not exist`);
      return;
    }

    // remove the item from the user's grocery list
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        groceryList: {
          delete: {
            id: id,
          },
        },
      },
      include: {
        groceryList: true, // Fetch the updated grocery list
      },
    });

    return updatedUser.groceryList;
  };
}

module.exports = GroceryList;
