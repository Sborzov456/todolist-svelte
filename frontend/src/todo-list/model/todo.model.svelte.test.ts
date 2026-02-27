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
            listTodos: vi.fn(async () => ({ todos: [] })),
            createTodo: vi.fn(),
            updateTodo: vi.fn(),
            deleteTodo: vi.fn(),
            batchUpdateTodos: vi.fn(),
        };

        const model = createTodoListModel({ api: mockApi });

        const getTodosPromise = model.getTodos();

        expect(model.todosList.pending).toBe(true);

        await getTodosPromise;

        expect(model.todosList.pending).toBe(false);
    });

    it("обновляет items результатом getTodos и проставляет index по позиции", async () => {
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
            listTodos: vi.fn(async () => mockResponse),
            createTodo: vi.fn(),
            updateTodo: vi.fn(),
            deleteTodo: vi.fn(),
            batchUpdateTodos: vi.fn(),
        };

        const model = createTodoListModel({ api: mockApi });

        await model.getTodos();

        expect(model.todosList.items).toHaveLength(2);
        expect(model.todosList.items[0]).toEqual({ ...mockTodos[0], index: 0 });
        expect(model.todosList.items[1]).toEqual({ ...mockTodos[1], index: 1 });
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
            batchUpdateTodos: vi.fn(),
        };

        const model = createTodoListModel({ api: mockApi });

        await model.addTodo(newTodo);

        expect(model.todosList.items).toContainEqual(createdTodo);
        expect(model.todosList.items[model.todosList.items.length - 1]).toEqual(
            createdTodo,
        );
    });

    it("удаляет todo из items после вызова removeTodo и синхронизирует индексы", async () => {
        const existingTodos: Todo[] = [
            {
                _id: "1",
                name: "Todo 1",
                isCompleted: false,
                index: 0,
            },
            {
                _id: "2",
                name: "Todo 2",
                isCompleted: false,
                index: 1,
            },
        ];

        const mockResponse: DeleteTodoResponse = {
            todo: existingTodos[0],
        };

        const batchUpdateTodosMock = vi.fn(async () => ({}));

        const mockApi: TodosApi = {
            listTodos: vi.fn(),
            createTodo: vi.fn(),
            updateTodo: vi.fn(),
            deleteTodo: vi.fn(async () => mockResponse),
            batchUpdateTodos: batchUpdateTodosMock,
        };

        const model = createTodoListModel({ api: mockApi });
        model.todosList.items = [...existingTodos];

        await model.removeTodo("1");

        expect(model.todosList.items).not.toContainEqual(existingTodos[0]);
        expect(model.todosList.items).toHaveLength(1);
        expect(model.todosList.items[0]._id).toBe("2");
        expect(batchUpdateTodosMock).toHaveBeenCalledWith({
            todos: [{ _id: "2", index: 0 }],
        });
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
            updateTodo: vi.fn(async () => mockResponse),
            deleteTodo: vi.fn(),
            batchUpdateTodos: vi.fn(),
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

    it("обновляет порядок items после reorderTodos и синхронизирует индексы через batchUpdateTodos", () => {
        const existingTodos: Todo[] = [
            { _id: "1", name: "Todo 1", isCompleted: false, index: 0 },
            { _id: "2", name: "Todo 2", isCompleted: false, index: 1 },
            { _id: "3", name: "Todo 3", isCompleted: false, index: 2 },
        ];

        const batchUpdateTodosMock = vi.fn(async () => ({}));

        const mockApi: TodosApi = {
            listTodos: vi.fn(),
            createTodo: vi.fn(),
            updateTodo: vi.fn(),
            deleteTodo: vi.fn(),
            batchUpdateTodos: batchUpdateTodosMock,
        };

        const model = createTodoListModel({ api: mockApi });
        model.todosList.items = [...existingTodos];

        const reordered = [
            existingTodos[2],
            existingTodos[0],
            existingTodos[1],
        ];

        model.reorderTodos(reordered);

        expect(model.todosList.items).toHaveLength(3);
        expect(model.todosList.items.map((t) => t._id)).toEqual([
            "3",
            "1",
            "2",
        ]);
        expect(model.todosList.items[0].index).toBe(0);
        expect(model.todosList.items[1].index).toBe(1);
        expect(model.todosList.items[2].index).toBe(2);
        expect(batchUpdateTodosMock).toHaveBeenCalledWith({
            todos: [
                { _id: "3", index: 0 },
                { _id: "1", index: 1 },
                { _id: "2", index: 2 },
            ],
        });
    });
});
