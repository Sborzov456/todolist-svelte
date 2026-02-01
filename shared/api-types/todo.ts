export type Todo = {
    _id: string;
    name: string;
    description?: string;
    isCompleted: boolean;
};

export type ListTodosRequest = {}

export type ListTodosResponse = {
    todos: Todo[]
}

export type CreateTodoRequst = {
    todo: Omit<Todo, '_id'>
}

export type CreateTodoResponse = {
    todo: Todo
}

export type PartialTodo = Partial<Omit<Todo, '_id'>> & {
    _id: string;
}

export type UpdateTodoRequest = {
    todo: Pick<Todo, '_id'> & Partial<Omit<Todo, '_id'>>
}

export type UpdateTodoResponse = {
    todo: Todo
}

export type DeleteTodoRequest = {}

export type DeleteTodoResponse = {
    todo: Todo
}