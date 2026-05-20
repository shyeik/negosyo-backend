"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const expenseSchema = new mongoose_1.default.Schema({
    category: {
        type: String,
        required: true,
        enum: ["Supplies", "Utilities", "Rent", "Delivery", "Other"],
        default: "Supplies",
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    // Expense Date
    expenseDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {
    timestamps: true,
});
const Expense = mongoose_1.default.models.Expense || mongoose_1.default.model("Expense", expenseSchema);
exports.default = Expense;
