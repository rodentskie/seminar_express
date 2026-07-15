import swaggerJsdoc from "swagger-jsdoc";

const API_PREFIX = process.env.API_PREFIX || "/api";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Seminar Express — Todo API",
      version: "1.0.0",
      description: "Basic Todo REST API. Single-user, single-entity.",
    },
    servers: [{ url: API_PREFIX }],
    components: {
      schemas: {
        Todo: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Buy groceries" },
            description: { type: "string", nullable: true, example: "Milk, eggs, bread" },
            completed: { type: "boolean", default: false },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        TodoCreateInput: {
          type: "object",
          required: ["title"],
          properties: {
            title: { type: "string", example: "Buy groceries" },
            description: { type: "string", example: "Milk, eggs, bread" },
          },
        },
        TodoUpdateInput: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            completed: { type: "boolean" },
          },
        },
        ValidationError: {
          type: "object",
          properties: {
            error: {
              type: "object",
              description: "Zod flattened error object",
            },
          },
        },
        NotFoundError: {
          type: "object",
          properties: {
            error: { type: "string", example: "Todo not found" },
          },
        },
      },
    },
  },
  apis: ["./src/docs/*.docs.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
