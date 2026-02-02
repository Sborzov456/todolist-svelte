import type { Todo } from "@shared/api-types";
import { todosApi } from "../../shared/api";

export function createTodoListModel({ api }: { api: typeof todosApi }) {
    const todosList = $state<{ items: Todo[]; pending: boolean }>({
        items: [],
        pending: false,
    });

    async function getTodos() {
        todosList.pending = true;
        try {
            const response = await api.listTodos();
            todosList.items = response.todos;
        } finally {
            todosList.pending = false;
        }
    }

    async function addTodo(todo: Omit<Todo, "_id" | "isCompleted">) {
        const response = await api.createTodo({
            todo: { ...todo, isCompleted: false },
        });

        todosList.items.push(response.todo);
    }

    async function removeTodo(id: string) {
        await api.deleteTodo(id);
        todosList.items = todosList.items.filter((todo) => todo._id !== id);
    }

    async function editTodo(
        todo: Pick<Todo, "_id"> & Partial<Omit<Todo, "_id">>,
    ) {
        const response = await api.updateTodo({ todo });
        const updatedTodo = response.todo;

        todosList.items = todosList.items.map((todo) => {
            if (todo._id === updatedTodo._id) {
                return updatedTodo;
            }
            return todo;
        });
    }

    function completeTodo(id: string) {
        return editTodo({ _id: id, isCompleted: true });
    }

    return {
        todosList,
        getTodos,
        addTodo,
        removeTodo,
        editTodo,
        completeTodo,
    };
}

export const todoListModel = createTodoListModel({ api: todosApi });
