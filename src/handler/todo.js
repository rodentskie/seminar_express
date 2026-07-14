import { createTodoSchema } from "../models/todo.js";

export function createTodo(req, res) {
  const result = createTodoSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }

  res.json(result.data);
}
