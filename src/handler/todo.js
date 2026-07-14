import { prisma } from "../lib/prisma.js";
import { createTodoSchema } from "../models/todo.js";

export async function createTodo(req, res) {
  const result = createTodoSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }

  const todo = await prisma.todo.create({ data: result.data });

  res.status(201).json(todo);
}
