import express from "express";
import cors from "cors";
import healthRoutes from "./modules/routes/health.routes";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/api/health", healthRoutes);

export default app;
