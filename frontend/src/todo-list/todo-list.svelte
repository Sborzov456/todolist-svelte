<script>
    import { addTodoDialogModel } from "../add-todo-dialog";
    import { todosList, getTodos } from "../todo.model.svelte";
    import TodoListItem from "./todo-list-item.svelte";

    getTodos();

    function handleAddTodo() {
        addTodoDialogModel.open();
    }
</script>

{#if todosList.pending}
    Загрузка...
{:else}
    <ul class="list">
        {#each todosList.items as todo}
            <li><TodoListItem {todo} /></li>
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
