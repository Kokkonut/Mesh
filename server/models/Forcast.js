const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const forecastSchema = new Schema({
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
    forecastHours: {
        type: Number,
        required: true,
    },
    weekOf: {
        type: Date,
        required: true,
    },
});



const Forcast = mongoose.models.Forcast || mongoose.model('Forcast', forecastSchema);

module.exports = Forcast;
