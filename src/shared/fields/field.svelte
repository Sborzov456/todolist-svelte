<script lang="ts">
    import type { Snippet } from "svelte";

    type FieldProps = {
        id: string | null | undefined;
        label?: string;
        children: Snippet;
    };

    const { label, id, children }: FieldProps = $props();
</script>

<div class="field">
    <label for={id} class="label">{label}</label>
    {@render children()}
</div>

<style>
    .field {
        display: flex;
        align-items: baseline;
        gap: 12px;
    }

    .label {
        width: 60px;
    }
</style>
