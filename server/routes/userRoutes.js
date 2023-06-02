const express = require("express");
const router = express.Router();
const { getUserData } = require("../controllers/userController");
const { authenticateJWT } = require("../middleware/authenticateJWT");

router.get("/data", authenticateJWT, getUserData);

module.exports = router;
