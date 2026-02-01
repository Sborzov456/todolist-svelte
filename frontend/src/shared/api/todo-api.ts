import type {
    CreateTodoRequst,
    CreateTodoResponse,
    ListTodosResponse,
    Todo,
    UpdateTodoRequest,
    UpdateTodoResponse,
    DeleteTodoResponse,
} from "@shared/api-types";
import { createApiClient } from "../lib/api-client";

const api = createApiClient({ baseURL: "todos/" });

function listTodos(): Promise<ListTodosResponse> {
    return api.get("list");
}

function createTodo(data: CreateTodoRequst): Promise<CreateTodoResponse> {
    return api.post("", data);
}

function updateTodo(data: UpdateTodoRequest): Promise<UpdateTodoResponse> {
    return api.patch(`${data.todo._id}`, data);
}

function deleteTodo(id: Todo["_id"]): Promise<DeleteTodoResponse> {
    return api.delete(`${id}`);
}

export const todosApi = {
    listTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};
