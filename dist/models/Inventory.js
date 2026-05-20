"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const inventorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    lowStockLevel: {
        type: Number,
        default: 5,
        min: 0,
    },
    // Optional product description
    description: {
        type: String,
        trim: true,
        default: "",
    },
    // Product supplier
    supplier: {
        type: String,
        trim: true,
        default: "",
    },
    // SKU or product code
    sku: {
        type: String,
        trim: true,
        unique: true,
        sparse: true,
    },
    // Date item was added/purchased
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    // Inventory status
    status: {
        type: String,
        enum: ["In Stock", "Low Stock", "Out of Stock"],
        default: "In Stock",
    },
}, {
    timestamps: true,
});
const Inventory = mongoose_1.default.models.Inventory || mongoose_1.default.model("Inventory", inventorySchema);
exports.default = Inventory;
