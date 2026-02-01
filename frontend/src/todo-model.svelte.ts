import type { Todo } from "@shared/api-types";

let todos = $state<Todo[]>([]);

export function getTodos() {
    return todos;
}

export function addTodo(newTodo: Omit<Todo, "_id" | "isCompleted">) {
    todos.push({ ...newTodo, _id: crypto.randomUUID(), isCompleted: false });
}

export function removeTodo(id: string) {
    todos = todos.filter((todo) => todo._id !== id);
}

// TODO: Тут, вероятно, лучше впишется функция patchTodo с частичным изменением. Тогда completeTodo будет частным случаем этой фукнции
export function editTodo(payload: Todo) {
    todos = todos.map((todo) => {
        if (todo._id === payload._id) {
            return payload;
        }
        return todo;
    });
}

export function completeTodo(id: string) {
    todos = todos.map((todo) => {
        if (id === todo._id) {
            return { ...todo, isCompleted: true };
        }
        return todo;
    });
}
