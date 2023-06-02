const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },

    org: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },

    startDate: {
        type: Date,
        required: true,
        trim: true,
    },
    endDate: {
        type: Date,
        required: false,
        trim: true,
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
    }],
    status: {
        type: String,
        enum: ['active', 'on hold', 'completed', 'cancelled'],
        default: 'active',
    },
    phase: {
        type: String,
        enum: ['ideate', 'discover', 'deliver', 'embed', 'closure'],
        default: 'ideate',
    },
}
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

module.exports = Project;