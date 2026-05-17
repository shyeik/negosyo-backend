import express from "express";

import Inventory from "../../models/Inventory";

const router = express.Router();

/* GET INVENTORY */
router.get("/", async (_, res) => {
  try {
    const items = await Inventory.find().sort({
      createdAt: -1,
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch inventory",
    });
  }
});

/* CREATE INVENTORY ITEM */
router.post("/", async (req, res) => {
  try {
    const item = await Inventory.create(req.body);

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create inventory item",
    });
  }
});

/* UPDATE STOCK */
router.patch("/:id/stock", async (req, res) => {
  try {
    const { stock } = req.body;

    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true },
    );

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update stock",
    });
  }
});

/* DELETE ITEM */
router.delete("/:id", async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);

    res.json({
      message: "Inventory item deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete item",
    });
  }
});

export default router;
