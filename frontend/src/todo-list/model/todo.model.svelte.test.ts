import { describe, it, expect, vi } from "vitest";
import { createTodoListModel } from "./todo-list.model.svelte";
import type { Todo } from "@shared/api-types";
import type {
    ListTodosResponse,
    CreateTodoResponse,
    UpdateTodoResponse,
    DeleteTodoResponse,
} from "@shared/api-types";
import type { todosApi } from "../../shared/api";

type TodosApi = typeof todosApi;

describe("createTodosModel", () => {
    it("устанавливает pending в true во время выполнения getTodos и в false после завершения", async () => {
        const mockApi: TodosApi = {
            listTodos: vi.fn(
                () =>
                    new Promise<ListTodosResponse>((resolve) =>
                        resolve({ todos: [] }),
                    ),
            ),
            createTodo: vi.fn(),
            updateTodo: vi.fn(),
            deleteTodo: vi.fn(),
        };

        const model = createTodoListModel({ api: mockApi });

        const getTodosPromise = model.getTodos();

        expect(model.todosList.pending).toBe(true);

        await getTodosPromise;

        expect(model.todosList.pending).toBe(false);
    });

    it("обновляет items результатом getTodos", async () => {
        const mockTodos: Todo[] = [
            {
                _id: "1",
                name: "Test Todo 1",
                description: "Description 1",
                isCompleted: false,
            },
            {
                _id: "2",
                name: "Test Todo 2",
                isCompleted: true,
            },
        ];

        const mockResponse: ListTodosResponse = {
            todos: mockTodos,
        };

        const mockApi: TodosApi = {
            listTodos: vi.fn(
                () =>
                    new Promise<ListTodosResponse>((resolve) =>
                        resolve(mockResponse),
                    ),
            ),
            createTodo: vi.fn(),
            updateTodo: vi.fn(),
            deleteTodo: vi.fn(),
        };

        const model = createTodoListModel({ api: mockApi });

        await model.getTodos();

        expect(model.todosList.items).toEqual(mockTodos);
    });

    it("добавляет todo из результата addTodo в конец items", async () => {
        const newTodo: Omit<Todo, "_id" | "isCompleted"> = {
            name: "New Todo",
            description: "New Description",
        };

        const createdTodo: Todo = {
            _id: "3",
            ...newTodo,
            isCompleted: false,
        };

        const mockResponse: CreateTodoResponse = {
            todo: createdTodo,
        };

        const mockApi: TodosApi = {
            listTodos: vi.fn(),
            createTodo: vi.fn(
                () =>
                    new Promise<CreateTodoResponse>((resolve) =>
                        resolve(mockResponse),
                    ),
            ),
            updateTodo: vi.fn(),
            deleteTodo: vi.fn(),
        };

        const model = createTodoListModel({ api: mockApi });

        await model.addTodo(newTodo);

        expect(model.todosList.items).toContainEqual(createdTodo);
        expect(model.todosList.items[model.todosList.items.length - 1]).toEqual(
            createdTodo,
        );
    });

    it("удаляет todo из items после вызова removeTodo", async () => {
        const existingTodos: Todo[] = [
            {
                _id: "1",
                name: "Todo 1",
                isCompleted: false,
            },
            {
                _id: "2",
                name: "Todo 2",
                isCompleted: false,
            },
        ];

        const mockResponse: DeleteTodoResponse = {
            todo: existingTodos[0],
        };

        const mockApi: TodosApi = {
            listTodos: vi.fn(),
            createTodo: vi.fn(),
            updateTodo: vi.fn(),
            deleteTodo: vi.fn(
                () =>
                    new Promise<DeleteTodoResponse>((resolve) =>
                        resolve(mockResponse),
                    ),
            ),
        };

        const model = createTodoListModel({ api: mockApi });
        model.todosList.items = [...existingTodos];

        await model.removeTodo("1");

        expect(model.todosList.items).not.toContainEqual(existingTodos[0]);
        expect(model.todosList.items).toHaveLength(1);
        expect(model.todosList.items[0]._id).toBe("2");
    });

    it("обновляет todo в items после вызова editTodo", async () => {
        const existingTodos: Todo[] = [
            {
                _id: "1",
                name: "Original Name",
                description: "Original Description",
                isCompleted: false,
            },
            {
                _id: "2",
                name: "Todo 2",
                isCompleted: false,
            },
        ];

        const updatedTodo: Todo = {
            _id: "1",
            name: "Updated Name",
            description: "Updated Description",
            isCompleted: false,
        };

        const mockResponse: UpdateTodoResponse = {
            todo: updatedTodo,
        };

        const mockApi: TodosApi = {
            listTodos: vi.fn(),
            createTodo: vi.fn(),
            updateTodo: vi.fn(
                () =>
                    new Promise<UpdateTodoResponse>((resolve) =>
                        resolve(mockResponse),
                    ),
            ),
            deleteTodo: vi.fn(),
        };

        const model = createTodoListModel({ api: mockApi });
        model.todosList.items = [...existingTodos];

        await model.editTodo({
            _id: "1",
            name: "Updated Name",
            description: "Updated Description",
        });

        expect(model.todosList.items[0]).toEqual(updatedTodo);
        expect(model.todosList.items[1]).toEqual(existingTodos[1]);
    });
});
