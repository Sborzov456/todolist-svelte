<script>
    import { addTodoDialogModel } from "../add-todo-dialog";
    import { getTodos } from "../todo-model.svelte";
    import TodoListItem from "./todo-list-item.svelte";

    const todos = $state(getTodos());

    function onaddtodo() {
        addTodoDialogModel.open();
    }
</script>

{#await todos}
    Загрузка...
{:then todos}
    <ul class="list">
        {#each todos as todo}
            <li><TodoListItem {todo} /></li>
        {/each}
    </ul>
{/await}
<button onclick={onaddtodo}>Добавить задачу</button>

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
