<script lang="ts">
    import { Dialog } from "../shared/ui/dialog";
    import { TextInput, TextArea } from "../shared/ui/fields";
    import { editTodoDialogModel } from "./edit-todo-dialog-model.svelte";
    import type { Todo } from "@shared/api-types";

    type EditTodoDialogProps = {
        onSubmit: (paylod: Todo) => void;
    };

    let { onSubmit }: EditTodoDialogProps = $props();
    const paylod = $derived(editTodoDialogModel.getPayload());
    let open = $derived(editTodoDialogModel.getIsOpen());

    function handleSubmit(event: SubmitEvent) {
        if (!paylod) {
            return;
        }

        event.preventDefault();

        onSubmit({
            ...paylod,
            name: editTodoDialogModel.getName(),
            description: editTodoDialogModel.getDescription(),
        });

        editTodoDialogModel.close();
        editTodoDialogModel.resetForm();
    }

    function handleClose() {
        editTodoDialogModel.resetForm();
    }
</script>

<Dialog bind:open onClose={handleClose}>
    <form onsubmit={handleSubmit} class="form">
        <TextInput
            id="name"
            label="Имя"
            bind:value={
                editTodoDialogModel.getName, editTodoDialogModel.setName
            }
        />
        <TextArea
            id="description"
            label="Описание"
            bind:value={
                editTodoDialogModel.getDescription,
                editTodoDialogModel.setDescription
            }
        />
        <button type="submit">Сохранить</button>
    </form>
</Dialog>

<style>
    .form {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
</style>
