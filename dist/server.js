"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const health_routes_1 = __importDefault(require("./modules/routes/health.routes"));
const sales_routes_1 = __importDefault(require("./modules/routes/sales.routes"));
const inventory_routes_1 = __importDefault(require("./modules/routes/inventory.routes"));
const expenses_routes_1 = __importDefault(require("./modules/routes/expenses.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: CLIENT_ORIGIN,
        credentials: true,
    },
});
app.use((0, cors_1.default)({
    origin: CLIENT_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json());
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB error:", err));
app.use("/api/health", health_routes_1.default);
app.use("/api/sales", sales_routes_1.default);
app.use("/api/inventory", inventory_routes_1.default);
app.use("/api/expenses", expenses_routes_1.default);
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Trackabao backend is running 🚀",
        mongodb: mongoose_1.default.connection.readyState === 1 ? "Connected" : "Not connected",
    });
});
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
    });
});
/* Local only */
if (process.env.NODE_ENV !== "production") {
    server.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}
/* Required for Vercel */
exports.default = app;
