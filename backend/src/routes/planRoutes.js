const express = require("express");

const {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
} = require("../controllers/planController");

const {
  authenticateToken,
  authorizeRoles
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getAllPlans);
router.get("/:id", getPlanById);

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  createPlan
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  updatePlan
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deletePlan
);

module.exports = router;