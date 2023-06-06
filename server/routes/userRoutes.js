const express = require("express");
const router = express.Router();
const { getUserData } = require("../controllers/userController");
const { getUser } = require("../controllers/userController");
const { updateUser } = require("../controllers/userController");
const { authenticateJWT } = require("../middleware/authenticateJWT");

router.get("/data", authenticateJWT, getUserData);
router.get("/:orgId/:userId", authenticateJWT, getUser);
router.put("/:orgId/:userId", authenticateJWT, updateUser);

module.exports = router;
