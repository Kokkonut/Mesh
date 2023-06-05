const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('../middleware/authenticateJWT');

const { createTask } = require('../controllers/taskController');
const { getAllTasks } = require('../controllers/taskController');
const { getProjectTasks } = require('../controllers/taskController');
const { removeTask } = require('../controllers/taskController');



router.post('/:orgId/:projectId/createTask', authenticateJWT, createTask);

router.get('/:orgId/:projectId/getAllTasks', authenticateJWT, getAllTasks);
router.get('/:orgId/:projectId/getProjectTasks', authenticateJWT, getProjectTasks);
router.delete('/:projectId/:taskId/removeTask', authenticateJWT, removeTask);

module.exports = router;