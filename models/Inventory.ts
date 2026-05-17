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
    },

    lowStockLevel: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  },
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
