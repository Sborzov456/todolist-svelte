<script>
    import { addTodoDialogModel } from "../add-todo-dialog";
    import { getTodos } from "../todo-model.svelte";
    import TodoListItem from "./todo-list-item.svelte";

    const todos = $derived(getTodos());

    function onaddtodo() {
        addTodoDialogModel.open();
    }
</script>

<ul class="list">
    {#each todos as todo}
        <li><TodoListItem {todo} /></li>
    {/each}
</ul>
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
