"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
            minLength: 6,
        },
        password_re: {
            type: 'string',
            minLength: 6,
        },
    },
    required: ['email', 'password', 'password_re'],
    additionalProperties: false,
};
exports.default = userSchema;
