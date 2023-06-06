const mongoose = require('mongoose');
const Organization = require("../models/Organization");
const Project = require("../models/Project");
const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {

    const { orgId, projectId } = req.params;
    console.log('SERVER CREATE TASK orgId: ', orgId);
    console.log('SERVER CREATE TASK projectId: ', projectId);

    try {
        const org = await Organization.findById(orgId);
        console.log('SERVER CREATE TASK org: ', org);

        const project = await Project.findById(projectId);
        console.log('SERVER CREATE TASK project: ', project);
      

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

// Get all tasks for a organization, filtering out the tasks in the specified project
exports.getAllTasks = async (req, res) => {

    const { projectId } = req.params;
    
    // check if projectId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: 'Invalid project id.' });
    }

    try {
        // Get the project
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Convert task ObjectIds in the project to strings for easier comparison
        const projectTasksIds = project.tasks.map(task => task.toString());

        // Get all tasks that are not in the project
        const tasks = await Task.find({ _id: { $nin: projectTasksIds } });


        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



//Get all tasks for a project

exports.getProjectTasks = async (req, res) => {
    console.log('Get Project Tasks called') ;
    const { orgId, projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orgId) || !mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: 'Invalid organization or project id.' });
    }

    try {
        // Verify the organization exists
        const organization = await Organization.findById(orgId);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found.' });
        }

        // Verify the project exists within the organization
        const project = await Project.findOne({ _id: projectId, org: orgId });
        if (!project) {
            return res.status(404).json({ message: 'Project not found in the specified organization.' });
        }

        // Get all tasks in the project
        const tasks = await Task.find({ project: projectId });

        res.status(200).json(tasks);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Remove a task from a project
exports.removeTask = async (req, res) => {
    const { projectId, taskId } = req.params;

    console.log('Project Id: ', projectId);
    console.log('Task Id: ', taskId);

    // check if projectId and taskId are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: 'Invalid project or task id.' });
    }

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        console.log('Original Project Tasks: ', project.tasks);

        // Remove task from project's tasks array by converting ObjectId to string
        project.tasks = project.tasks.filter(task => task.toString() !== taskId.toString());

        console.log('Filtered Project Tasks: ', project.tasks);

        await project.save();

        // Find the task
        const task = await Task.findById(taskId);
        if (task) {
            // Filter out the project ID
            task.project = task.project.filter(projectIdInTask => projectIdInTask.toString() !== projectId.toString());

            await task.save();
        }

        res.status(200).json({ message: 'Task removed from the project.' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Add a single task to a project
exports.addTask = async (req, res) => {
    console.log('Add Task called');
    const { orgId, projectId, taskId } = req.params;
  
    try {
      const project = await Project.findById(projectId);
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Check if the task is already in the project
      if (project.tasks.includes(taskId)) {
        return res.status(400).json({ message: 'Task already in the project' });
      }
  
      // Add the task to the project and save
      project.tasks.push(taskId);
      await project.save();
  
      // Update the task with the project reference
      const task = await Task.findById(taskId);
      if(!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      task.project.push(projectId);
      await task.save();
  
      res.status(200).json({ message: 'Task added to the project successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
};

  
  // Add all tasks to a project
  exports.addAllTasks = async (req, res) => {
    const { orgId, projectId } = req.params;
  
    try {
      const project = await Project.findById(projectId);
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Get all tasks for the organization
      const tasks = await Task.find({ 'project.org': orgId });
  
      // Filter out tasks that are already in the project
      const newTasks = tasks.filter((task) => !project.tasks.includes(task._id));
  
      // Add the new tasks to the project and save
      project.tasks.push(...newTasks.map((task) => task._id));
      await project.save();
  
      res.status(200).json({ message: 'All tasks added to the project successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };