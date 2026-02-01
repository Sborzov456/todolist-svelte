import mongoose from 'mongoose';
import type { Todo } from '@shared/api-types/index.js';

const todoSchema = new mongoose.Schema<Todo>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false,
    },
});

export const TodoModel = mongoose.model<Todo>('Todo', todoSchema);
