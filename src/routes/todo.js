import { Router } from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../handler/todo.js";

const router = Router();

router.get("/todo", getTodos);
router.post("/todo", createTodo);
router.patch("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);

export default router;
