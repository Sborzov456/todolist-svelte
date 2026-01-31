<script lang="ts">
    import { Dialog } from "../shared/dialog";
    import type { DialogProps } from "../shared/dialog";
    import { TextInput, TextArea } from "../shared/fields";
    import { addTodo } from "../todo-model.svelte";

    let { open = $bindable(false) }: Pick<DialogProps, "open"> = $props();

    let name = $state("");
    let description = $state("");

    function onsubmit(event: SubmitEvent) {
        event.preventDefault();
        addTodo({ name, description });

        open = false;
        name = "";
        description = "";
    }

    function onclose() {
        name = "";
        description = "";
    }
</script>

<Dialog bind:open {onclose}>
    <form {onsubmit} class="form">
        <TextInput id="name" label="Имя" bind:value={name} />
        <TextArea id="description" label="Описание" bind:value={description} />
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
