"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationMiddleware = void 0;
const ajv_1 = __importDefault(require("ajv"));
const order_schema_1 = __importDefault(require("../schemas/order_schemas/order_schema")); // Adjust the path accordingly
const ajv = new ajv_1.default();
const validate = ajv.compile(order_schema_1.default);
const orderValidationMiddleware = (req, res, next) => {
    const isValid = validate(req.body);
    if (!isValid) {
        return res.status(400).json({
            errors: validate.errors,
        });
    }
    next();
};
exports.orderValidationMiddleware = orderValidationMiddleware;
