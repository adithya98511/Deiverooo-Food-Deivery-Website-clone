"use strict";
// import { Request, Response, NextFunction } from 'express';
// import ajvInstance from '../ajv_instance/ajv_instance';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrderMiddleware = exports.validateUserMiddleware = void 0;
const ajv_instance_1 = __importDefault(require("../ajv_instance/ajv_instance"));
const signup_schema_1 = __importDefault(require("../schemas/user_schemas/signup_schema"));
const order_schema_1 = __importDefault(require("../schemas/order_schemas/order_schema"));
const login_schema_1 = __importDefault(require("../schemas/user_schemas/login_schema"));
const validateUserMiddleware = (isLogin) => {
    const validate = ajv_instance_1.default.compile(isLogin ? login_schema_1.default : signup_schema_1.default); // Use appropriate schema
    return (req, res, next) => {
        var _a;
        const { email, password, password_re } = req.body;
        // Validate based on login or signup
        const valid = isLogin ? validate({ email, password }) : validate({ email, password, password_re });
        if (!valid) {
            return res.status(400).json({
                error: (_a = validate.errors) === null || _a === void 0 ? void 0 : _a.map((error) => ({
                    field: error.instancePath,
                    message: error.message,
                })),
            });
        }
        next();
    };
};
exports.validateUserMiddleware = validateUserMiddleware;
const validateOrderMiddleware = () => {
    let validate;
    try {
        validate = ajv_instance_1.default.compile(order_schema_1.default);
    }
    catch (error) {
        console.error('Error compiling validation schema:', error);
        return (req, res) => {
            return res.status(500).json({ error: 'Internal server error: Schema compilation failed' });
        };
    }
    return (req, res, next) => {
        var _a;
        console.log('Incoming request body:', req.body);
        const { menuItems, restaurantId } = req.body;
        const valid = validate({ menuItems, restaurantId });
        if (!valid) {
            const formattedErrors = (_a = validate.errors) === null || _a === void 0 ? void 0 : _a.map(error => ({
                field: error.instancePath || error.schemaPath,
                message: error.message,
            }));
            return res.status(400).json({ error: 'Validation error', details: formattedErrors });
        }
        next();
    };
};
exports.validateOrderMiddleware = validateOrderMiddleware;
