<script lang="ts">
    import type { Todo } from "../types";
    import { completeTodo, removeTodo } from "../todo-model.svelte";
    import { editTodoDialogModel } from "../edit-todo-dialog";

    type TodoListItemProps = {
        todo: Todo;
    };

    const { todo }: TodoListItemProps = $props();

    function onremove() {
        removeTodo(todo.id);
    }

    function oncomplete() {
        completeTodo(todo.id);
    }

    function onedit() {
        editTodoDialogModel.open(todo);
    }
</script>

<div class="item" class:completed={todo.isCompleted}>
    <dl>
        {#if todo.name}
            <div class="field">
                <dt>Имя:</dt>
                <dd>{todo.name}</dd>
            </div>
        {/if}
        {#if todo.description}
            <div class="field">
                <dt>Описание:</dt>
                <dd>{todo.description}</dd>
            </div>
        {/if}
    </dl>
    <div class="footer">
        <div class="actions">
            <button onclick={onremove}> Удалить </button>
            <button onclick={onedit} disabled={todo.isCompleted}>
                Редактировать
            </button>
        </div>
        <input
            type="checkbox"
            class="checkbox"
            value={todo.isCompleted}
            onchange={oncomplete}
            disabled={todo.isCompleted}
        />
    </div>
</div>

<style>
    .item {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        text-align: left;
        border: 1px solid black;
    }

    .item.completed {
        background-color: #e0e0e0;
    }

    .item.completed dd {
        text-decoration: line-through;
    }

    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    dl {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin: 0;
    }

    .field {
        display: flex;
        gap: 0.5rem;
    }

    dt {
        font-weight: bold;
    }

    dd {
        margin: 0;
    }

    .actions {
        display: flex;
        gap: 5px;
    }
</style>
