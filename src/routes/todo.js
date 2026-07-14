import { Router } from "express";
import { createTodo } from "../handler/todo.js";

const router = Router();

router.post("/todo", createTodo);

export default router;
