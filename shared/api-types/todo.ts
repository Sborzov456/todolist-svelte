export type Todo = {
    _id: string;
    name: string;
    description?: string;
    isCompleted: boolean;
    index?: number;
};

export type PartialTodo = Pick<Todo, "_id"> & Partial<Omit<Todo, "_id">>;

export type ListTodosRequest = {};

export type ListTodosResponse = {
    todos: Todo[];
};

export type CreateTodoRequst = {
    todo: Omit<Todo, "_id">;
};

export type CreateTodoResponse = {
    todo: Todo;
};

export type UpdateTodoRequest = {
    todo: PartialTodo;
};

export type UpdateTodoResponse = {
    todo: Todo;
};

export type DeleteTodoRequest = {};

export type DeleteTodoResponse = {
    todo: Todo;
};

export type BatchUpdateTodoRequest = {
    todos: PartialTodo[];
};

export type BatchUpdateTodoResponse = {
    todos: Todo[];
};
