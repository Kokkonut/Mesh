const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const taskInstanceSchema = new Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    notes: {
        type: String,
        trim: true,
    },
});

const TaskInstance = mongoose.models.TaskInstance || mongoose.model('TaskInstance', taskInstanceSchema);

module.exports = TaskInstance;
