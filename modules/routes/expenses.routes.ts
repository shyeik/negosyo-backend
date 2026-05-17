import express from "express";
import Expense from "../../models/Expense";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    console.error("GET expenses error:", error);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

router.post("/", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("POST expense error:", error);
    res.status(500).json({ message: "Failed to create expense" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Expense.deleteOne({ _id: req.params.id });

    if (deleted.deletedCount === 0) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }

    res.json({ message: "Expense deleted" });
  } catch (error) {
    console.error("DELETE expense error:", error);
    res.status(500).json({ message: "Failed to delete expense" });
  }
});

export default router;
