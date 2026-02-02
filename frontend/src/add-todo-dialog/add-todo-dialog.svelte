<script lang="ts">
    import { Dialog } from "../shared/ui/dialog";
    import { TextInput, TextArea } from "../shared/ui/fields";
    import type { Todo } from "@shared/api-types";
    import { addTodoDialogModel } from "./add-todo-dialog-model.svelte";

    type AddTodoDialogProps = {
        onSubmit: (paylod: Omit<Todo, "_id">) => void;
    };

    const { onSubmit }: AddTodoDialogProps = $props();

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        onSubmit({
            name: addTodoDialogModel.getName(),
            description: addTodoDialogModel.getDescription(),
            isCompleted: false,
        });

        addTodoDialogModel.close();
        addTodoDialogModel.resetForm();
    }

    function handleClose() {
        addTodoDialogModel.resetForm();
    }
</script>

<Dialog
    bind:open={addTodoDialogModel.getIsOpen, addTodoDialogModel.setIsOpen}
    onClose={handleClose}
>
    <form onsubmit={handleSubmit} class="form">
        <TextInput
            id="name"
            label="Имя"
            bind:value={addTodoDialogModel.getName, addTodoDialogModel.setName}
        />
        <TextArea
            id="description"
            label="Описание"
            bind:value={
                addTodoDialogModel.getDescription,
                addTodoDialogModel.setDescription
            }
        />
        <button type="submit">Создать</button>
    </form>
</Dialog>

<style>
    .form {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
</style>
