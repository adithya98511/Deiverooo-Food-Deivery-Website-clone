"use strict";
// import { Request, Response, NextFunction } from 'express';
// import ajvInstance from '../ajv_instance/ajv_instance';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForgotPW = exports.validateHeaders = exports.validateUserMiddleware = void 0;
const ajv_instance_1 = __importDefault(require("../ajv_instance/ajv_instance"));
const signup_schema_1 = __importDefault(require("../schemas/user_schemas/signup_schema"));
const login_schema_1 = __importDefault(require("../schemas/user_schemas/login_schema"));
const logout_schema_1 = __importDefault(require("../schemas/user_schemas/logout_schema"));
const forgotPW_schema_1 = __importDefault(require("../schemas/user_schemas/forgotPW_schema"));
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
const validateHeaders = (req, res, next) => {
    const validate = ajv_instance_1.default.compile(logout_schema_1.default);
    const isValid = validate(req.headers);
    if (!isValid) {
        return res.status(400).json({ error: "Invalid or missing authorization header" });
    }
    next();
};
exports.validateHeaders = validateHeaders;
const validateForgotPW = (req, res, next) => {
    var _a;
    const validate = ajv_instance_1.default.compile(forgotPW_schema_1.default);
    const isValid = validate(req.body);
    if (!isValid) {
        return res.status(400).json({
            error: (_a = validate.errors) === null || _a === void 0 ? void 0 : _a.map((error) => ({
                field: error.instancePath,
                message: error.message,
            })),
        });
        next();
    }
};
exports.validateForgotPW = validateForgotPW;
