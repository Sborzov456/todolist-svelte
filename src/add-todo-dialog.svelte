<script lang="ts">
    import Dialog from "./shared/dialog.svelte";
    import TextInput from "./shared/fields/text-input.svelte";
    import type { DialogProps } from "./shared/dialog.svelte";
    import { addTodo } from "./todo-model.svelte";
    import TextArea from "./shared/fields/text-area.svelte";

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
        <TextInput name="name" label="Имя" bind:value={name} />
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
