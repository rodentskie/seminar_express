import { Router } from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../handler/todo.js";

const router = Router();

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.patch("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
