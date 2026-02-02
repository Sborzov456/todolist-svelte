<script lang="ts">
    import { AddTodoDialog } from "./add-todo-dialog";
    import { EditTodoDialog } from "./edit-todo-dialog";
    import { TodoList } from "./todo-list";
    import { addTodo, editTodo } from "./todo.model.svelte";
</script>

<TodoList />
<AddTodoDialog onSubmit={addTodo} />
<EditTodoDialog onSubmit={editTodo} />
