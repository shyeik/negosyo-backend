"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const health_routes_1 = __importDefault(require("./modules/routes/health.routes"));
const sales_routes_1 = __importDefault(require("./modules/routes/sales.routes"));
const inventory_routes_1 = __importDefault(require("./modules/routes/inventory.routes"));
const expenses_routes_1 = __importDefault(require("./modules/routes/expenses.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/health", health_routes_1.default);
app.use("/api/sales", sales_routes_1.default);
app.use("/api/inventory", inventory_routes_1.default);
app.use("/api/expenses", expenses_routes_1.default);
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Trackabao backend is running 🚀",
    });
});
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong",
        error: err.message,
    });
});
const startServer = async () => {
    try {
        await (0, db_1.connectDB)();
        if (process.env.NODE_ENV !== "production") {
            app.listen(PORT, () => {
                console.log(`🚀 Server running on http://localhost:${PORT}`);
            });
        }
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
exports.default = app;
