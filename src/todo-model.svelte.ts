import type { Todo } from "./types";

let todos = $state<Todo[]>([]);

export function getTodos() {
    return todos;
}

export function addTodo(newTodo: Omit<Todo, "id" | "isCompleted">) {
    todos.push({ ...newTodo, id: crypto.randomUUID(), isCompleted: false });
}

export function removeTodo(id: string) {
    todos = todos.filter((todo) => todo.id !== id);
}

// TODO: Тут, вероятно, лучше впишется функция patchTodo с частичным изменением. Тогда completeTodo будет частным случаем этой фукнции
export function editTodo(payload: Todo) {
    todos = todos.map((todo) => {
        if (todo.id === payload.id) {
            return payload;
        }
        return todo;
    });
}

export function completeTodo(id: string) {
    todos = todos.map((todo) => {
        if (id === todo.id) {
            return { ...todo, isCompleted: true };
        }
        return todo;
    });
}
