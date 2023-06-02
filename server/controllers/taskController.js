const mongoose = require('mongoose');
const Organization = require("../models/Organization");
const Project = require("../models/Project");
const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
    console.log('createTask called server side');
    console.log('req.body: ', req.body);
    const { orgId, projectId } = req.params;
    console.log('orgId: ', orgId);
    console.log('projectId: ', projectId);
    try {
        const org = await Organization.findById(orgId);
        console.log('org: ', org);
        const project = await Project.findById(projectId);
        console.log('project: ', project);

        if (!org || !project) {
            return res.status(404).json({ message: 'Organization or project not found' });
        }

        const newTask = new Task ({
            ...req.body,
            project: projectId,
        });

        const savedTask = await newTask.save();

        project.tasks.push(savedTask._id);
        await project.save();

        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json(error);
    }
};

  