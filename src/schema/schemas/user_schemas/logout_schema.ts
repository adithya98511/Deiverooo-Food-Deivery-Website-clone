import { JSONSchemaType } from "ajv";
import { LogoutHeader } from "../../../types/dto/user.dto";

const logoutSchema: JSONSchemaType<LogoutHeader> = {
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

export default logoutSchema;
