const express = require("express");

const {
  login,
  profile,
  adminOnly,
  trainerOnly,
  memberOnly
} = require("../controllers/authController");

const {
  authenticateToken,
  authorizeRoles
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", login);

router.get("/profile", authenticateToken, profile);

router.get(
  "/admin-only",
  authenticateToken,
  authorizeRoles("admin"),
  adminOnly
);

router.get(
  "/trainer-only",
  authenticateToken,
  authorizeRoles("trainer"),
  trainerOnly
);

router.get(
  "/member-only",
  authenticateToken,
  authorizeRoles("member"),
  memberOnly
);

module.exports = router;