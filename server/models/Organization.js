const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const organizationSchema = new Schema({
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
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    supervisors: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],

    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    projects: [{
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
        },
        role: {
            type: String,
            enum: ["owner", "supervisor", "employee"],
            default: "employee",
        },
    }],

    joinRequests: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
        },
    }],

    }
);

const Organization = mongoose.models.Organization || mongoose.model('Organization', organizationSchema);

module.exports = Organization;
