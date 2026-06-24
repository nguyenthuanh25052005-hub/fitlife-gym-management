const express = require("express");

const {
  bookSchedule,
  getMySchedules,
  getTrainerSchedules,
  updateScheduleStatus,
  getAllSchedules
} = require("../controllers/scheduleController");

const {
  authenticateToken,
  authorizeRoles
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRoles("member"),
  bookSchedule
);

router.get(
  "/me",
  authenticateToken,
  authorizeRoles("member"),
  getMySchedules
);

router.get(
  "/trainer/me",
  authenticateToken,
  authorizeRoles("trainer"),
  getTrainerSchedules
);

router.patch(
  "/:id/status",
  authenticateToken,
  authorizeRoles("trainer"),
  updateScheduleStatus
);

router.get(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  getAllSchedules
);

module.exports = router;