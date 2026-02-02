import type { Todo } from "@shared/api-types";

let isOpen = $state(false);
let payload = $state<Todo>();
let name = $state("");
let description = $state("");

function getIsOpen() {
    return isOpen;
}

function getPayload() {
    return payload;
}

function getName() {
    return name;
}

function getDescription() {
    return description;
}

function setName(value: string) {
    name = value;
}

function setDescription(value: string) {
    description = value;
}

function resetForm() {
    setName("");
    setDescription("");
}

function open(todo: Todo) {
    payload = todo;
    isOpen = true;

    name = todo.name;
    description = todo.description || "";
}

function close() {
    isOpen = false;
}

export const editTodoDialogModel = {
    getIsOpen,
    getPayload,
    getName,
    getDescription,
    setName,
    setDescription,
    resetForm,
    open,
    close,
};
