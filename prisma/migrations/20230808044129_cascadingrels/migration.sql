-- DropForeignKey
ALTER TABLE "GroceryListItem" DROP CONSTRAINT "GroceryListItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserRecipes" DROP CONSTRAINT "UserRecipes_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "UserRecipes" DROP CONSTRAINT "UserRecipes_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserRecipes" ADD CONSTRAINT "UserRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecipes" ADD CONSTRAINT "UserRecipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroceryListItem" ADD CONSTRAINT "GroceryListItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
