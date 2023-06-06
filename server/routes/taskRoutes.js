const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('../middleware/authenticateJWT');

const { createTask } = require('../controllers/taskController');
const { getAllTasks } = require('../controllers/taskController');
const { getProjectTasks } = require('../controllers/taskController');
const { removeTask } = require('../controllers/taskController');
const { addTask } = require('../controllers/taskController');
const { addAllTasks } = require('../controllers/taskController');



router.post('/:orgId/:projectId/createTask', authenticateJWT, createTask);

router.get('/:orgId/:projectId/getAllTasks', authenticateJWT, getAllTasks);

router.get('/:orgId/:projectId/getProjectTasks', authenticateJWT, getProjectTasks);

router.delete('/:projectId/:taskId/removeTask', authenticateJWT, removeTask);

router.post('/:projectId/:taskId/addTask', authenticateJWT, addTask);

router.post('/:orgId/:projectId/addAllTasks', authenticateJWT, addAllTasks);

module.exports = router;