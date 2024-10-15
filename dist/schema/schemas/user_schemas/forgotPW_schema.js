"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgotPWSchema = {
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email",
        },
    },
    required: ["email"],
    additionalProperties: false,
};
exports.default = forgotPWSchema;
