"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginSchema = {
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email",
        },
        password: {
            type: "string",
            minLength: 8,
        },
    },
    required: ["email", "password"],
    additionalProperties: false,
};
exports.default = loginSchema;
