const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    }
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

module.exports = Task;
