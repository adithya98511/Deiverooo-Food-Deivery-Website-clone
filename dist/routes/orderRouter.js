"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_body_1 = require("../schema/validate-middleware/validation_body");
const auth_middleware_1 = require("../middleware/auth-middleware");
const orderController_1 = require("../controllers/orderController");
const order_schema_1 = __importDefault(require("../schema/schemas/order_schemas/order_schema"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/postOrder", auth_middleware_1.authMiddleware, (0, validation_body_1.validationBody)(order_schema_1.default), orderController_1.placeOrder);
exports.default = router;
