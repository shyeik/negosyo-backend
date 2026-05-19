"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const saleSchema = new mongoose_1.default.Schema({
    item: {
        type: String,
        required: true,
        trim: true,
    },
    qty: {
        type: Number,
        required: true,
        min: 1,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", "GCash", "Maya", "Card"],
        default: "Cash",
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
const Sale = mongoose_1.default.model("Sale", saleSchema);
exports.default = Sale;
