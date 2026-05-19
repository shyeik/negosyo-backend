"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Inventory_1 = __importDefault(require("../../models/Inventory"));
const router = express_1.default.Router();
router.get("/", async (_req, res) => {
    try {
        const items = await Inventory_1.default.find().sort({ createdAt: -1 });
        res.json(items);
    }
    catch (error) {
        console.error("GET inventory error:", error);
        res.status(500).json({ message: "Failed to fetch inventory" });
    }
});
router.post("/", async (req, res) => {
    try {
        const item = new Inventory_1.default(req.body);
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    }
    catch (error) {
        console.error("POST inventory error:", error);
        res.status(500).json({ message: "Failed to create inventory item" });
    }
});
router.patch("/:id/stock", async (req, res) => {
    try {
        const stock = Number(req.body.stock);
        if (Number.isNaN(stock) || stock < 0) {
            res.status(400).json({ message: "Invalid stock value" });
            return;
        }
        const updated = await Inventory_1.default.updateOne({ _id: req.params.id }, { $set: { stock } });
        if (updated.matchedCount === 0) {
            res.status(404).json({ message: "Inventory item not found" });
            return;
        }
        const item = await Inventory_1.default.findOne({ _id: req.params.id });
        res.json(item);
    }
    catch (error) {
        console.error("PATCH inventory stock error:", error);
        res.status(500).json({ message: "Failed to update stock" });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Inventory_1.default.deleteOne({ _id: req.params.id });
        if (deleted.deletedCount === 0) {
            res.status(404).json({ message: "Inventory item not found" });
            return;
        }
        res.json({ message: "Inventory item deleted" });
    }
    catch (error) {
        console.error("DELETE inventory error:", error);
        res.status(500).json({ message: "Failed to delete item" });
    }
});
exports.default = router;
