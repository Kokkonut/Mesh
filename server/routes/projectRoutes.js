const express = require("express");
const router = express.Router();
const { createProject } = require("../controllers/projectController");
const { getProjects } = require("../controllers/projectController");
const { updateProject } = require("../controllers/projectController");   
const { availableUsers } = require("../controllers/projectController");
const { assignedUsers } = require("../controllers/projectController");
const { assignUser } = require("../controllers/projectController");
const { removeUser } = require("../controllers/projectController");

const { authenticateJWT } = require("../middleware/authenticateJWT");

router.post("/createProject", authenticateJWT, createProject);
router.get("/:orgId", authenticateJWT, getProjects);
router.patch("/:orgId/:projectId", authenticateJWT, updateProject);

router.get("/:orgId/:projectId/availableUsers", authenticateJWT, availableUsers);
router.get("/:orgId/:projectId/assignedUsers", authenticateJWT, assignedUsers);
router.post("/:orgId/:projectId/assignUser/:userId", authenticateJWT, assignUser);
router.delete("/:orgId/:projectId/removeUser/:userId", authenticateJWT, removeUser);

module.exports = router;
