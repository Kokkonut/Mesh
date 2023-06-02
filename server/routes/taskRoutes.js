const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('../middleware/authenticateJWT');

const { createTask } = require('../controllers/taskController');



router.post('/:orgId/:projectId/createTask', authenticateJWT, createTask);

module.exports = router;