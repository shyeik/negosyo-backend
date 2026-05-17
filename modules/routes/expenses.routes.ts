import { Router } from "express";
import Expense from "../../models/Expense";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    console.error("GET /api/expenses error:", error);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

router.post("/", async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    console.error("POST /api/expenses error:", error);
    res.status(500).json({ message: "Failed to create expense" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (error) {
    console.error("DELETE /api/expenses error:", error);
    res.status(500).json({ message: "Failed to delete expense" });
  }
});

export default router;
