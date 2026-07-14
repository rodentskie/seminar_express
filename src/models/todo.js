import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string({ error: "Title is required" }).min(1, "Title cannot be empty"),
  description: z.string().optional(),
});
