import type { Todo } from "@shared/api-types";
import { todosApi } from "./shared/api";

export async function getTodos() {
    const response = await todosApi.listTodos();
    return response.todos;
}

export function addTodo(todo: Omit<Todo, "_id" | "isCompleted">) {
    todosApi.createTodo({ todo: { ...todo, isCompleted: false } });
}

export function removeTodo(id: string) {
    todosApi.deleteTodo(id);
}

export function editTodo(todo: Todo) {
    todosApi.updateTodo({ todo });
}

export function completeTodo(id: string) {
    todosApi.updateTodo({ todo: { _id: id, isCompleted: true } });
}
