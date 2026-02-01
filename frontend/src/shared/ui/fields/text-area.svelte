<script lang="ts">
    import Field from "./field.svelte";
    import type { HTMLTextareaAttributes } from "svelte/elements";

    type TextAreaProps = HTMLTextareaAttributes & {
        label?: string;
    };

    let { value = $bindable(), id, label, ...props }: TextAreaProps = $props();
</script>

<Field {id} {label}>
    <textarea {id} bind:value {...props}></textarea>
</Field>

<style>
    textarea {
        resize: none;
    }
</style>
