import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";

import cors from "cors";

import { connectDB } from "./config/db";

import healthRoutes from "./modules/routes/health.routes";
import salesRoutes from "./modules/routes/sales.routes";
import inventoryRoutes from "./modules/routes/inventory.routes";
import expensesRoutes from "./modules/routes/expenses.routes";

const app = express();

const PORT = process.env.PORT || 8080;

/* =========================
   DATABASE CONNECTION
========================= */
connectDB()
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
  });

/* =========================
   MIDDLEWARE
========================= */
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
    credentials: true,
  }),
);

app.use(express.json());

/* =========================
   ROUTES
========================= */
app.use("/api/health", healthRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/expenses", expensesRoutes);

/* =========================
   ROOT ROUTE
========================= */
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Trackabao backend is running 🚀",
    mongodb: "Connected",
  });
});

/* =========================
   404 HANDLER
========================= */
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =========================
   ERROR HANDLER
========================= */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

/* =========================
   LOCAL DEVELOPMENT ONLY
========================= */
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

/* =========================
   EXPORT FOR VERCEL
========================= */
export default app;
