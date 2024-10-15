"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const orderRouter_1 = __importDefault(require("./routes/orderRouter"));
const restaurantRouter_1 = __importDefault(require("./routes/restaurantRouter"));
const menuRouter_1 = __importDefault(require("./routes/menuRouter"));
const swagger_1 = __importDefault(require("./swagger/swagger"));
const createServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({
        origin: 'http://localhost:5173', // Allow frontend to connect
    }));
    // Serve Swagger UI at /api-docs
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
    // Routes
    app.use(userRouter_1.default);
    app.use(restaurantRouter_1.default);
    app.use(menuRouter_1.default);
    app.use(orderRouter_1.default);
    return app;
};
exports.default = createServer;
