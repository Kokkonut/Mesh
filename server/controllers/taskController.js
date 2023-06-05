const mongoose = require('mongoose');
const Organization = require("../models/Organization");
const Project = require("../models/Project");
const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {

    const { orgId, projectId } = req.params;

    try {
        const org = await Organization.findById(orgId);

        const project = await Project.findById(projectId);
      

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

  