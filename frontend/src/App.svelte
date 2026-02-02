<script lang="ts">
    import { AddTodoDialog } from "./add-todo-dialog";
    import { EditTodoDialog } from "./edit-todo-dialog";
    import { TodoList } from "./todo-list";
    import { todoListModel } from "./todo-list";
</script>

<TodoList />
<AddTodoDialog onSubmit={todoListModel.addTodo} />
<EditTodoDialog onSubmit={todoListModel.editTodo} />
