const express = require("express");
const inviteController = require("../controllers/inviteController");

const router = express.Router();

router.post("/:organizationId/invite", inviteController.inviteUser);
router.get("/:inviteId", inviteController.getInviteDetails);


module.exports = router;
