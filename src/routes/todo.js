import { Router } from "express";
import { createTodo, getTodos } from "../handler/todo.js";

const router = Router();

router.get("/todo", getTodos);
router.post("/todo", createTodo);

export default router;
