<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";
    import Field from "./field.svelte";

    type TextInputProps = HTMLInputAttributes & {
        label?: string;
    };

    let { value = $bindable(), label, id, ...props }: TextInputProps = $props();
</script>

<Field {id} {label}>
    <input {id} bind:value {...props} />
</Field>
