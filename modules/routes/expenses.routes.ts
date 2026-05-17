import express from "express";
import Expense from "../../models/Expense";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const expenses = await Expense.find().sort({
      createdAt: -1,
    });

    res.json(expenses);
  } catch (error) {
    console.error("GET expenses error:", error);

    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const expense = new Expense(req.body);

    const savedExpense = await expense.save();

    res.status(201).json(savedExpense);
  } catch (error) {
    console.error("POST expense error:", error);

    res.status(500).json({
      message: "Failed to create expense",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Expense.findByIdAndDelete(id);

    res.json({
      message: "Expense deleted",
    });
  } catch (error) {
    console.error("DELETE expense error:", error);

    res.status(500).json({
      message: "Failed to delete expense",
    });
  }
});

export default router;
