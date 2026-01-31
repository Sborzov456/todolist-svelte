export function isOutsideClick(event: MouseEvent, dialog: HTMLDialogElement) {
    const { left, right, top, bottom } = dialog.getBoundingClientRect();
    const { clientX, clientY } = event;

    return (
        clientX < left || clientX > right || clientY < top || clientY > bottom
    );
}
