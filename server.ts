import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";

import healthRoutes from "./modules/routes/health.routes";
import salesRoutes from "./modules/routes/sales.routes";
import inventoryRoutes from "./modules/routes/inventory.routes";
import expensesRoutes from "./modules/routes/expenses.routes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/expenses", expensesRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Trackabao backend is running 🚀",
  });
});

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err.stack);

    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  },
);

const startServer = async () => {
  try {
    await connectDB();

    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
