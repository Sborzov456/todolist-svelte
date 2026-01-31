<script>
    import { getTodos } from "../todo-model.svelte";
    import TodoListItem from "./todo-list-item.svelte";

    const todos = $derived(getTodos());
</script>

<ul class="list">
    {#each todos as todo}
        <li><TodoListItem {todo} /></li>
    {/each}
</ul>

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
