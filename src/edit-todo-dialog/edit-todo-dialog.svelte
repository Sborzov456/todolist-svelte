<script lang="ts">
    import Dialog from "../shared/dialog.svelte";
    import TextInput from "../shared/fields/text-input.svelte";
    import TextArea from "../shared/fields/text-area.svelte";
    import { editTodoDialogModel } from "./edit-todo-dialog-model.svelte";
    import type { Todo } from "../types";

    type EditTodoDialogProps = {
        onsubmit: (paylod: Todo) => void;
    };

    let props: EditTodoDialogProps = $props();
    const paylod = $derived(editTodoDialogModel.getPayload());
    let open = $derived(editTodoDialogModel.getIsOpen());

    function onsubmit(event: SubmitEvent) {
        if (!paylod) {
            return;
        }

        event.preventDefault();
        props.onsubmit({
            ...paylod,
            name: editTodoDialogModel.getName(),
            description: editTodoDialogModel.getDescription(),
        });

        editTodoDialogModel.close();
        editTodoDialogModel.resetForm();
    }

    function onclose() {
        editTodoDialogModel.resetForm();
    }
</script>

<Dialog bind:open {onclose}>
    <form {onsubmit} class="form">
        <TextInput
            name="name"
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
