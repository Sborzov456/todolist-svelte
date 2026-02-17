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
        todosList.items = todosList.items.filter((todo) => todo._id !== id);
        await api.deleteTodo(id);
    }

    async function editTodo(
        todo: Pick<Todo, "_id"> & Partial<Omit<Todo, "_id">>,
    ) {
        todosList.items = todosList.items.map((item) => {
            if (item._id === todo._id) {
                return { ...item, ...todo };
            }
            return item;
        });

        return await api.updateTodo({ todo });
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
