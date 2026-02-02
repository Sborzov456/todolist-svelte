import type { Todo } from "@shared/api-types";
import { todosApi } from "./shared/api";

export const todosList = $state<{ items: Todo[]; pending: boolean }>({
    items: [],
    pending: false,
});

export async function getTodos() {
    todosList.pending = true;
    const response = await todosApi.listTodos();

    todosList.pending = false;
    todosList.items = response.todos;
}

export async function addTodo(todo: Omit<Todo, "_id" | "isCompleted">) {
    const response = await todosApi.createTodo({
        todo: { ...todo, isCompleted: false },
    });

    todosList.items.push(response.todo);
}

export async function removeTodo(id: string) {
    await todosApi.deleteTodo(id);
    todosList.items = todosList.items.filter((todo) => todo._id !== id);
}

export async function editTodo(
    todo: Pick<Todo, "_id"> & Partial<Omit<Todo, "_id">>,
) {
    const response = await todosApi.updateTodo({ todo });
    const updatedTodo = response.todo;

    todosList.items = todosList.items.map((todo) => {
        if (todo._id === updatedTodo._id) {
            return updatedTodo;
        }
        return todo;
    });
}

export function completeTodo(id: string) {
    editTodo({ _id: id, isCompleted: true });
}
