<script lang="ts">
    import Dialog from "./shared/dialog.svelte";
    import type { DialogProps } from "./shared/dialog.svelte";
    import { addTodo } from "./todo-model.svelte";

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
    <form {onsubmit}>
        <p>
            <label for="name">Имя</label>
            <input name="name" bind:value={name} />
        </p>
        <p>
            <label for="description">Описание</label>
            <textarea name="description" bind:value={description}></textarea>
        </p>
        <button type="submit">Создать</button>
    </form>
</Dialog>
