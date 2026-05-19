"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Sale_1 = __importDefault(require("../../models/Sale"));
const router = express_1.default.Router();
router.get("/", async (_req, res) => {
    try {
        const sales = await Sale_1.default.find().sort({ createdAt: -1 });
        res.json(sales);
    }
    catch (error) {
        console.error("GET sales error:", error);
        res.status(500).json({ message: "Failed to fetch sales" });
    }
});
router.post("/", async (req, res) => {
    try {
        const sale = new Sale_1.default(req.body);
        const savedSale = await sale.save();
        res.status(201).json(savedSale);
    }
    catch (error) {
        console.error("POST sale error:", error);
        res.status(500).json({ message: "Failed to create sale" });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Sale_1.default.deleteOne({ _id: req.params.id });
        if (deleted.deletedCount === 0) {
            res.status(404).json({ message: "Sale not found" });
            return;
        }
        res.json({ message: "Sale deleted" });
    }
    catch (error) {
        console.error("DELETE sale error:", error);
        res.status(500).json({ message: "Failed to delete sale" });
    }
});
exports.default = router;
