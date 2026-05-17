import express from "express";
import cors from "cors";

import healthRoutes from "./modules/routes/health.routes";
import salesRoutes from "./modules/routes/sales.routes";
import inventoryRoutes from "./modules/routes/inventory.routes";
import expensesRoutes from "./modules/routes/expenses.routes";

const app = express();

app.use(express.json());

const allowedOrigins = process.env.CLIENT_ORIGIN;

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Trackabao backend is running 🚀",
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/expenses", expensesRoutes);

export default app;
