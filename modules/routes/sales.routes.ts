import express from "express";
import Sale from "../../models/Sale";

const router = express.Router();

/* GET SALES */
router.get("/", async (_, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });

    res.json(sales);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch sales",
    });
  }
});

/* CREATE SALE */
router.post("/", async (req, res) => {
  try {
    const sale = await Sale.create(req.body);

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create sale",
    });
  }
});

/* DELETE SALE */
router.delete("/:id", async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);

    res.json({
      message: "Sale deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete sale",
    });
  }
});

export default router;
