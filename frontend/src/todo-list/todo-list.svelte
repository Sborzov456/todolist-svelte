<script lang="ts">
    import {
        dndzone,
        overrideItemIdKeyNameBeforeInitialisingDndZones,
    } from "svelte-dnd-action";
    import type { DndEvent } from "svelte-dnd-action";
    import type { Todo } from "@shared/api-types";
    import { addTodoDialogModel } from "../add-todo-dialog";
    import { todoListModel } from "./model";
    import TodoListItem from "./todo-list-item.svelte";
    import { flip } from "svelte/animate";

    overrideItemIdKeyNameBeforeInitialisingDndZones("_id");

    const { getTodos, todosList, setTodos, reorderTodos } = todoListModel;
    getTodos();

    function handleAddTodo() {
        addTodoDialogModel.open();
    }

    function handleDndConsider(event: CustomEvent<DndEvent<Todo>>) {
        setTodos(event.detail.items);
    }

    function handleDndFinalize(event: CustomEvent<DndEvent<Todo>>) {
        reorderTodos(event.detail.items);
    }
</script>

{#if todosList.pending}
    Загрузка...
{:else}
    <ul
        class="list"
        use:dndzone={{ items: todosList.items, flipDurationMs: 300 }}
        onconsider={handleDndConsider}
        onfinalize={handleDndFinalize}
    >
        {#each todosList.items as todo (todo._id)}
            <li animate:flip={{ duration: 300 }}><TodoListItem {todo} /></li>
        {/each}
    </ul>
{/if}

<button onclick={handleAddTodo}>Добавить задачу</button>

<style>
    .list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        list-style: none;
        max-width: 500px;
        padding: 0;
    }
</style>
