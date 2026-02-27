import type { PartialTodo, Todo } from "@shared/api-types";
import { todosApi } from "../../shared/api";
import { keyBy } from "../../shared/lib/key-by";
import { isDefined } from "../../shared/lib/is-defined";

export type TodoList = { items: Todo[]; pending: boolean };

export function createTodoListModel({ api }: { api: typeof todosApi }) {
    const todosList = $state<TodoList>({
        items: [],
        pending: false,
    });

    async function getTodos() {
        todosList.pending = true;

        try {
            const response = await api.listTodos();
            todosList.items = [...response.todos]
                .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
                .map((todo, index) => ({
                    ...todo,
                    index,
                }));
        } finally {
            todosList.pending = false;
        }
    }

    function setTodos(items: Todo[]) {
        todosList.items = items;
    }

    async function addTodo(todo: Omit<Todo, "_id" | "isCompleted">) {
        const response = await api.createTodo({
            todo: {
                ...todo,
                isCompleted: false,
                index: todosList.items.length,
            },
        });

        todosList.items.push(response.todo);
    }

    function removeTodo(id: string) {
        const remaining = todosList.items.filter((todo) => todo._id !== id);
        setTodos(remaining);
        updateIndexes();
        api.deleteTodo(id);
    }

    function editTodo(todo: PartialTodo) {
        todosList.items = todosList.items.map((item) => {
            if (item._id === todo._id) {
                return { ...item, ...todo };
            }
            return item;
        });
        return api.updateTodo({ todo });
    }

    function reorderTodos(todos: Todo[]) {
        setTodos(todos);
        updateIndexes();
    }

    function completeTodo(id: string) {
        return editTodo({ _id: id, isCompleted: true });
    }

    function batchUpdateTodos(todos: PartialTodo[]) {
        const ids = todos.map((todo) => todo._id);
        const map = keyBy(todos, "_id");

        todosList.items = todosList.items.map((item) => {
            if (ids.includes(item._id)) {
                const todo = map[item._id];
                return { ...item, ...todo };
            }
            return item;
        });

        return api.batchUpdateTodos({ todos });
    }

    function updateIndexes() {
        const toSync = todosList.items
            .map((item, index) =>
                item.index !== index ? { _id: item._id, index } : undefined,
            )
            .filter(isDefined);

        if (toSync.length > 0) {
            batchUpdateTodos(toSync);
        }
    }

    return {
        todosList,
        getTodos,
        addTodo,
        removeTodo,
        editTodo,
        completeTodo,
        setTodos,
        reorderTodos,
    };
}

export const todoListModel = createTodoListModel({ api: todosApi });
