<script lang="ts">
    import { Dialog } from "../shared/dialog";
    import { TextInput, TextArea } from "../shared/fields";
    import type { Todo } from "@shared/api-types";
    import { addTodoDialogModel } from "./add-todo-dialog-model.svelte";

    type AddTodoDialogProps = {
        onsubmit: (paylod: Omit<Todo, "id">) => void;
    };

    const props: AddTodoDialogProps = $props();

    function onsubmit(event: SubmitEvent) {
        event.preventDefault();

        props.onsubmit({
            name: addTodoDialogModel.getName(),
            description: addTodoDialogModel.getDescription(),
            isCompleted: false,
        });

        addTodoDialogModel.close();
        addTodoDialogModel.resetForm();
    }

    function onclose() {
        addTodoDialogModel.resetForm();
    }
</script>

<Dialog
    bind:open={addTodoDialogModel.getIsOpen, addTodoDialogModel.setIsOpen}
    {onclose}
>
    <form {onsubmit} class="form">
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
