import express from "express";
import mongoose from "mongoose";
import { MONGO_DB_URL, PORT } from "./consts.js";
import { TODOS_ROUTE, todosRouter } from "./routes/index.js";

const app = express();

app.use(express.json());

mongoose.connect(MONGO_DB_URL);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(TODOS_ROUTE, todosRouter);
