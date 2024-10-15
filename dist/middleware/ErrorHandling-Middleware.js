"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_constants_1 = require("../constants/error_constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || error_constants_1.ERROR_MESSAGES.INTERNAL_SERVER_ERR;
    console.error(err.stack);
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
    });
};
exports.default = errorHandler;
