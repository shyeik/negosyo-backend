import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

const Inventory =
  mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema);

export default Inventory;
