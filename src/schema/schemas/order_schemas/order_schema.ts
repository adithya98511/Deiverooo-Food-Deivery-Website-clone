import { MenuItem, PlaceOrderRequest } from "../../../types/dto/order.dto";
// orderValidation.ts
import Ajv, { JSONSchemaType } from "ajv";

// Define the schema using the PlaceOrderRequest interface
const placeOrderSchema: JSONSchemaType<PlaceOrderRequest> = {
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
      } as JSONSchemaType<MenuItem>,
    },
  },
  required: ["restaurantId", "menuItems"],
  additionalProperties: false,
};

export default placeOrderSchema;
