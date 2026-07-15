import "dotenv/config";

import express from "express";
import cors from "cors";

import todoRoutes from "./routes/todo.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_PREFIX = process.env.API_PREFIX || "/api";

app.get(`${API_PREFIX}/greeting`, (req, res) => res.json({ message: "hello world" }))

app.get("/ping", (req, res) => res.json({ message: "pong" }))

app.use(API_PREFIX, todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
