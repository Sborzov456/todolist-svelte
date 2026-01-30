<script lang="ts">
    import AddTodoDialog from "./add-todo-dialog.svelte";
    import TodoList from "./todo-list.svelte";

    let isAddTodoDialogOpen = $state<boolean>(false);

    function onaddtodo() {
        isAddTodoDialogOpen = true;
    }
</script>

<TodoList />
<button onclick={onaddtodo}>Добавить задачу</button>
<AddTodoDialog bind:open={isAddTodoDialogOpen} />
