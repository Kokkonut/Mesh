const mongoose = require('mongoose');
const Organization = require("../models/Organization");
const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");
// const Task = require("../models/Task");
// const TaskInstance = require("../models/TaskInstance");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, organizationId } = req.body;
    const userId = req.user.id;
  
    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      org: organizationId,
      owner: userId,
    });

    const savedProject = await newProject.save();

    await Organization.findByIdAndUpdate(
      organizationId,

      {
        $push: {
          projects: {
            project: savedProject._id,
            role: "owner",
          },
        },
      },
      { new: true }
    );
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all projects for an organization
exports.getProjects = async (req, res) => {

  try {
  
    const { orgId } = req.params;

    const projects = await Project.find({ org: orgId });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { orgId, projectId } = req.params;
    const updates = req.body;
 

    const project = await Project.findOne({ _id: projectId, org: orgId });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    for (let key in updates) {
      project[key] = updates[key];
    }

    await project.save();

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get users not assigned to a project
exports.availableUsers = async (req, res) => {
 
  const { orgId, projectId } = req.params;

  try {
    const org = await Organization.findById(orgId);
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const allUsers = await User.find({ 'organizations.org': new mongoose.Types.ObjectId(orgId) });
   

    const assignedUserIds = project.employees.map((userId) =>
    userId.toString()
  );
  
    const availableUsers = allUsers.filter(
      (user) => !assignedUserIds.includes(user._id.toString())
    );
    
    res.status(200).json(availableUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get users assigned to a project
exports.assignedUsers = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate('employees');
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.status(200).json(project.employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Assign a user to a project
exports.assignUser = async (req, res) => {
  const { projectId, userId } = req.params;

  try {
    const project = await Project.findById(projectId);
    const user = await User.findById(userId);

    if (!project || !user) {
      return res.status(404).json({ message: "Project or User not found" });
    }

    // Adding the user to the project's employees array
    project.employees.push(userId);

    await project.save();
    
    res.status(200).json({ message: "User successfully assigned to project" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Remove a user from a project
exports.removeUser = async (req, res) => {
  const { projectId, userId } = req.params;

  try {
    const project = await Project.findById(projectId);
    const user = await User.findById(userId);

    if (!project || !user) {
      return res.status(404).json({ message: "Project or User not found" });
    }

    // Removing the user from the project's employees array
    project.employees = project.employees.filter(employeeId => employeeId.toString() !== userId);

    await project.save();

    res.status(200).json({ message: "User successfully removed from project" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
