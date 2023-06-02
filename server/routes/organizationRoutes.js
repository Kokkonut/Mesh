const express = require("express");
const router = express.Router();
const { createOrganization } = require("../controllers/organizationController");
const { joinOrganization } = require("../controllers/organizationController");
const { updateJoinRequest } = require("../controllers/organizationController");
const { getOrganizationData } = require("../controllers/organizationController");
const { getOrganizationUsers } = require("../controllers/organizationController");
const { searchOrganizations } = require("../controllers/organizationController");
const { removeUser } = require("../controllers/organizationController");

const { authenticateJWT } = require("../middleware/authenticateJWT");

router.post("/create", authenticateJWT, createOrganization);
router.post("/join", authenticateJWT, joinOrganization);
router.post("/update-join-request", authenticateJWT, updateJoinRequest);
router.get('/search', searchOrganizations);
router.get("/:orgId", authenticateJWT, getOrganizationData);
router.get ("/users/:orgId", authenticateJWT, getOrganizationUsers);
router.delete("/:orgId/user/:userId", authenticateJWT, removeUser);




module.exports = router;
