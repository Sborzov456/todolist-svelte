<script lang="ts">
    import type {
        HTMLDialogAttributes,
        MouseEventHandler,
    } from "svelte/elements";
    import { isOutsideClick } from "./is-outside-click";

    export type DialogProps = HTMLDialogAttributes;

    let { children, open = $bindable(false), ...props }: DialogProps = $props();

    let dialog = $state<HTMLDialogElement>();

    const onclick: MouseEventHandler<HTMLDialogElement> = (event) => {
        if (!dialog) {
            return;
        }

        if (isOutsideClick(event, dialog)) {
            open = false;
        }

        props.onclick?.(event);
    };

    $effect(() => {
        if (open) {
            dialog?.showModal();
        } else {
            dialog?.close();
        }
    });
</script>

<dialog {...props} bind:this={dialog} {onclick}>
    {@render children?.()}
</dialog>
