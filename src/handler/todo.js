import { prisma } from "../lib/prisma.js";
import { createTodoSchema, updateTodoSchema } from "../models/todo.js";

export async function createTodo(req, res) {
  const result = createTodoSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }
  /*
  const existingCount = await prisma.todo.count({
    where: { title: result.data.title },
  });

  if (existingCount > 0) {
    return res.status(409).json({ error: "Title already exist" });
  }
  */
  const todo = await prisma.todo.create({ data: result.data });

  res.status(201).json(todo);
}

export async function getTodos(req, res) {
  const { title } = req.query;

  const todos = await prisma.todo.findMany({
    where: {
      deletedAt: null,
      ...(title ? { title: { contains: title, mode: "insensitive" } } : {}),
    },
  });

  res.json(todos);
}

export async function updateTodo(req, res) {
  const result = updateTodoSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }

  const id = Number(req.params.id);

  const todo = await prisma.todo.updateMany({
    where: { id, deletedAt: null },
    data: result.data,
  });

  if (todo.count === 0) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const updated = await prisma.todo.findUnique({ where: { id } });

  res.json(updated);
}

export async function deleteTodo(req, res) {
  const id = Number(req.params.id);

  const todo = await prisma.todo.updateMany({
    where: { id, deletedAt: null },
    data: { deletedAt: new Date() },
  });

  if (todo.count === 0) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(204).send();
}
