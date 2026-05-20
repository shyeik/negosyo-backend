import express from "express";
import Sale from "../../models/Sale";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    console.error("GET sales error:", error);
    res.status(500).json({ message: "Failed to fetch sales" });
  }
});

router.post("/", async (req, res) => {
  try {
    const sale = new Sale(req.body);
    const savedSale = await sale.save();
    res.status(201).json(savedSale);
  } catch (error) {
    console.error("POST sale error:", error);
    res.status(500).json({ message: "Failed to create sale" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ message: "Sale not found" });
      return;
    }

    res.json(updated);
  } catch (error) {
    console.error("PUT sale error:", error);
    res.status(500).json({ message: "Failed to update sale" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Sale.deleteOne({ _id: req.params.id });

    if (deleted.deletedCount === 0) {
      res.status(404).json({ message: "Sale not found" });
      return;
    }

    res.json({ message: "Sale deleted" });
  } catch (error) {
    console.error("DELETE sale error:", error);
    res.status(500).json({ message: "Failed to delete sale" });
  }
});

export default router;
