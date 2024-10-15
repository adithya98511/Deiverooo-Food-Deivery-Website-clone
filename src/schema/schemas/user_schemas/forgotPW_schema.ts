import { JSONSchemaType } from "ajv";
import { forgotPWRequestBody } from "../../../types/dto/user.dto";

const forgotPWSchema: JSONSchemaType<forgotPWRequestBody> = {
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

export default forgotPWSchema;
