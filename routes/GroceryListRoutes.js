const express = require("express");
const router = express.Router();

const GroceryList = require("../models/GroceryList");

// Health Check
router.get("/", async (req, res, next) => {
  res.send(200).json({ message: "in grocery list route" });
});

// Get all grocery list items for a user
router.post("/get-grocery-list", async (req, res, next) => {
  try {
    const groceryList = await GroceryList.getGroceryList(req.body);
    return res
      .status(200)
      .json({ message: "grocery list retrieved", groceryList: groceryList });
  } catch (err) {
    next(err);
  }
});

// Add a grocery list item for a user
router.post("/add-item", async (req, res, next) => {
  try {
    const groceryList = await GroceryList.addItem(req.body);
    return res
      .status(200)
      .json({ message: "grocery list item added", groceryList: groceryList });
  } catch (err) {
    next(err);
  }
});

// Remove a grocery list item for a user
router.post("/remove-item", async (req, res, next) => {
  try {
    const groceryList = await GroceryList.removeItem(req.body);
    return res
      .status(200)
      .json({ message: "grocery list item removed", groceryList: groceryList });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
