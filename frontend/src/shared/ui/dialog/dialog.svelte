<script lang="ts">
    import type {
        HTMLDialogAttributes,
        MouseEventHandler,
    } from "svelte/elements";
    import { isOutsideClick } from "./is-outside-click";

    export type DialogProps = HTMLDialogAttributes & {
        onClose?: () => void;
    };

    let {
        children,
        open = $bindable(false),
        onClose,
        ...props
    }: DialogProps = $props();

    let dialog = $state<HTMLDialogElement>();

    const handleClick: MouseEventHandler<HTMLDialogElement> = (event) => {
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
            onClose?.();
        }
    });
</script>

<dialog {...props} bind:this={dialog} onclick={handleClick}>
    {@render children?.()}
</dialog>
