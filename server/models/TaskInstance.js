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
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    hours: {
        type: Number, 
        required: true,
    },
    weekOf: {
        type: Date,
        required: true,
    },
    // startTime: {
    //     type: Date,
    //     required: false,
    // },
    // endTime: {
    //     type: Date,
    //     required: false,
    // },
    notes: {
        type: String,
        trim: false,
    },
});


const TaskInstance = mongoose.models.TaskInstance || mongoose.model('TaskInstance', taskInstanceSchema);

module.exports = TaskInstance;
