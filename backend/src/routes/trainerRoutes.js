const express = require("express");

const {
  getAllTrainers,
  getTrainerById
} = require("../controllers/trainerController");

const {
  authenticateToken
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, getAllTrainers);

router.get("/:id", authenticateToken, getTrainerById);

module.exports = router;