const router = require("express").Router();


const authRoutes = require("./authRoutes");
const OrganizationRoutes = require("./organizationRoutes");
const UserRoutes = require("./userRoutes");
const InviteRoutes = require("./inviteRoutes");
const ProjectRoutes = require("./projectRoutes");
const TaskRoutes = require("./taskRoutes");

router.use("/auth", authRoutes);
router.use("/org", OrganizationRoutes);
router.use("/user", UserRoutes);
router.use("/invite", InviteRoutes)
router.use("/project", ProjectRoutes);
router.use("/task", TaskRoutes);


module.exports = router;
