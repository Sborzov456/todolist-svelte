import express from "express";
import type { Request, Response } from "express";
import { TodoModel } from "../models/index.js";
import type {
    CreateTodoRequst,
    CreateTodoResponse,
    ListTodosRequest,
    ListTodosResponse,
    UpdateTodoRequest,
    UpdateTodoResponse,
    DeleteTodoRequest,
    DeleteTodoResponse,
} from "@shared/api-types/todo.js";
import type { ErrorResponse } from "./types.js";

export const todosRouter = express.Router();

export const TODOS_ROUTE = "/todos";

todosRouter.get(
    "/list",
    async (
        _: ListTodosRequest,
        response: Response<ListTodosResponse | ErrorResponse>,
    ) => {
        try {
            const todos = await TodoModel.find();
            response.json({ todos });
        } catch (error) {
            response.status(500).json({ error: "Failed to fetch todos" });
        }
    },
);

todosRouter.post(
    "/",
    async (
        request: Request<
            {},
            CreateTodoResponse | ErrorResponse,
            CreateTodoRequst
        >,
        response: Response<CreateTodoResponse | ErrorResponse>,
    ) => {
        try {
            const { todo } = request.body;
            const createdTodo = await TodoModel.create(todo);
            response.status(201).json({ todo: createdTodo.toObject() });
        } catch (error) {
            response.status(500).json({ error: "Failed to create todo" });
        }
    },
);

todosRouter.patch(
    "/",
    async (
        request: Request<
            {},
            UpdateTodoResponse | ErrorResponse,
            UpdateTodoRequest
        >,
        response: Response<UpdateTodoResponse | ErrorResponse>,
    ) => {
        try {
            const { todo } = request.body;
            const { _id, ...rest } = todo;

            const updatedTodo = await TodoModel.findByIdAndUpdate(_id, rest, {
                new: true,
                runValidators: true,
            });

            if (!updatedTodo) {
                response.status(404).json({ error: "Todo not found" });
                return;
            }

            response.json({ todo: updatedTodo.toObject() });
        } catch (error) {
            response.status(500).json({ error: "Failed to update todo" });
        }
    },
);

todosRouter.delete(
    "/",
    async (
        request: Request<
            {},
            DeleteTodoResponse | ErrorResponse,
            DeleteTodoRequest
        >,
        response: Response<DeleteTodoResponse | ErrorResponse>,
    ) => {
        try {
            const { _id } = request.body;

            const deletedTodo = await TodoModel.findByIdAndDelete(_id);

            if (!deletedTodo) {
                response.status(404).json({ error: "Todo not found" });
                return;
            }

            response.json({ todo: deletedTodo });
        } catch (error) {
            response.status(500).json({ error: "Failed to delete todo" });
        }
    },
);
