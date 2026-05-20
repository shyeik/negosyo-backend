"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Expense_1 = __importDefault(require("../../models/Expense"));
const router = express_1.default.Router();
router.get("/", async (_req, res) => {
    try {
        const expenses = await Expense_1.default.find().sort({
            date: -1,
            createdAt: -1,
        });
        res.json(expenses);
    }
    catch (error) {
        console.error("GET expenses error:", error);
        res.status(500).json({ message: "Failed to fetch expenses" });
    }
});
router.post("/", async (req, res) => {
    try {
        const { category, description, amount, date } = req.body;
        if (!category || !description || amount === undefined) {
            res.status(400).json({
                message: "Category, description, and amount are required",
            });
            return;
        }
        const parsedAmount = Number(amount);
        if (Number.isNaN(parsedAmount) || parsedAmount < 0) {
            res.status(400).json({
                message: "Amount must be a valid number",
            });
            return;
        }
        const expense = await Expense_1.default.create({
            category,
            description,
            amount: parsedAmount,
            date: date ? new Date(date) : new Date(),
        });
        res.status(201).json(expense);
    }
    catch (error) {
        console.error("POST expense error:", error);
        res.status(500).json({ message: "Failed to create expense" });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const updated = await Expense_1.default.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
            runValidators: true,
        });
        if (!updated) {
            res.status(404).json({ message: "Expense not found" });
            return;
        }
        res.json(updated);
    }
    catch (error) {
        console.error("PUT expense error:", error);
        res.status(500).json({ message: "Failed to update expense" });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid expense ID" });
            return;
        }
        const deleted = await Expense_1.default.findByIdAndDelete(id);
        if (!deleted) {
            res.status(404).json({ message: "Expense not found" });
            return;
        }
        res.json({
            message: "Expense deleted successfully",
            deletedId: id,
        });
    }
    catch (error) {
        console.error("DELETE expense error:", error);
        res.status(500).json({ message: "Failed to delete expense" });
    }
});
exports.default = router;
