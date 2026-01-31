let isOpen = $state(false);
let name = $state("");
let description = $state("");

function getIsOpen() {
    return isOpen;
}

function setIsOpen(open: boolean) {
    isOpen = open;
}

function open() {
    setIsOpen(true);
}

function close() {
    setIsOpen(false);
}

function getName() {
    return name;
}

function setName(value: string) {
    name = value;
}

function getDescription() {
    return description;
}

function setDescription(value: string) {
    description = value;
}

function resetForm() {
    setName("");
    setDescription("");
}

export const addTodoDialogModel = {
    getIsOpen,
    setIsOpen,
    open,
    close,
    getDescription,
    getName,
    setDescription,
    setName,
    resetForm,
};
