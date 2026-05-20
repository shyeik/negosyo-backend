"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const saleSchema = new mongoose_1.default.Schema({
    // Product / Item Name
    item: {
        type: String,
        required: true,
        trim: true,
    },
    // Optional inventory reference
    inventoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Inventory",
    },
    // Quantity Sold
    qty: {
        type: Number,
        required: true,
        min: 1,
    },
    // Price per item
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    // Total Sale Amount
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    // Optional Discount
    discount: {
        type: Number,
        default: 0,
        min: 0,
    },
    // Payment Method
    paymentMethod: {
        type: String,
        enum: ["Cash", "GCash", "Maya", "Card"],
        default: "Cash",
    },
    // Customer Name
    customerName: {
        type: String,
        trim: true,
        default: "",
    },
    // Notes / Remarks
    notes: {
        type: String,
        trim: true,
        default: "",
    },
    // Sale Date
    saleDate: {
        type: Date,
        default: Date.now,
    },
    // Sale Status
    status: {
        type: String,
        enum: ["Completed", "Pending", "Cancelled"],
        default: "Completed",
    },
}, {
    timestamps: true,
});
const Sale = mongoose_1.default.models.Sale || mongoose_1.default.model("Sale", saleSchema);
exports.default = Sale;
