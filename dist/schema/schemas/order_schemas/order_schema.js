"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Define the schema using the PlaceOrderRequest interface
const placeOrderSchema = {
    type: "object",
    properties: {
        //property 01
        restaurantId: { type: "number", minimum: 1 },
        //property 02
        menuItems: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    productId: { type: "number", minimum: 1 },
                    quantity: { type: "number", minimum: 1 },
                },
                required: ["productId", "quantity"],
                additionalProperties: false,
            },
        },
    },
    required: ["restaurantId", "menuItems"],
    additionalProperties: false,
};
exports.default = placeOrderSchema;
