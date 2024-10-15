"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logoutSchema = {
    type: "object",
    properties: {
        authorization: {
            type: "string",
            pattern: "^Bearer .+$", // Ensure it starts with 'Bearer ' and has a token.
        },
    },
    required: ["authorization"],
    additionalProperties: true, // Allow other headers if needed
};
exports.default = logoutSchema;
