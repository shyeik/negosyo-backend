import express from "express";

import Expense from "../../models/Expense";

const router = express.Router();

/* GET EXPENSES */
router.get("/", async (_, res) => {
  try {
    const expenses = await Expense.find().sort({
      createdAt: -1,
    });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
});

/* CREATE EXPENSE */
router.post("/", async (req, res) => {
  try {
    const expense = await Expense.create(req.body);

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create expense",
    });
  }
});

/* DELETE EXPENSE */
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);

    res.json({
      message: "Expense deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete expense",
    });
  }
});

export default router;
