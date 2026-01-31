<script lang="ts">
    import type {
        HTMLDialogAttributes,
        MouseEventHandler,
    } from "svelte/elements";

    export type DialogProps = HTMLDialogAttributes;

    let { children, open = $bindable(false), ...props }: DialogProps = $props();

    let dialog = $state<HTMLDialogElement>();

    const onclick: MouseEventHandler<HTMLDialogElement> = (event) => {
        if (!dialog) {
            return;
        }

        const { left, right, top, bottom } = dialog.getBoundingClientRect();
        const { clientX, clientY } = event;

        if (
            clientX < left ||
            clientX > right ||
            clientY < top ||
            clientY > bottom
        ) {
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
