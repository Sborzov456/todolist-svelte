<script lang="ts">
    import AddTodoDialog from "./add-todo-dialog.svelte";
    import EditTodoDialog from "./edit-todo-dialog/edit-todo-dialog.svelte";
    import TodoList from "./todo-list.svelte";
    import { editTodo } from "./todo-model.svelte";

    let isAddTodoDialogOpen = $state<boolean>(false);

    function onaddtodo() {
        isAddTodoDialogOpen = true;
    }
</script>

<TodoList />
<button onclick={onaddtodo}>Добавить задачу</button>
<AddTodoDialog bind:open={isAddTodoDialogOpen} />
<EditTodoDialog onsubmit={editTodo} />
