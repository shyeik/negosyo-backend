import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";

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

/* MongoDB */
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* Routes */
app.use("/api/health", healthRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/expenses", expensesRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Trackabao backend is running 🚀",
    mongodb:
      mongoose.connection.readyState === 1 ? "Connected" : "Not connected",
  });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: err.message,
  });
});

/* Local only */
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

/* Required for Vercel */
export default app;
