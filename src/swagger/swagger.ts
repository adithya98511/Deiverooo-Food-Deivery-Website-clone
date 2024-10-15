import swaggerJsDoc from 'swagger-jsdoc';
import { OpenAPIV3 } from 'openapi-types'; // Import OpenAPI 3.0 types

const swaggerDefinition: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API documentation using Swagger and TypeScript',
    contact: {
      name: 'Developer',
      email: 'developer@example.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Local development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {},
};

const swaggerOptions: swaggerJsDoc.Options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/*.ts'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
