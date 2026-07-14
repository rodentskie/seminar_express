import "dotenv/config";

import express from "express";
import cors from "cors";

import todoRoutes from "./routes/todo.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.json({ message: "hello world" }))

app.use(todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
