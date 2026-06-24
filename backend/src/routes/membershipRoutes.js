const express = require('express');
const {
  subscribePlan,
  getAllMemberships,
  getMyMemberships
} = require('../controllers/membershipController');

const {
  authenticateToken,
  authorizeRoles
} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/subscribe',
  authenticateToken,
  authorizeRoles('member'),
  subscribePlan
);

router.get(
  '/me',
  authenticateToken,
  authorizeRoles('member'),
  getMyMemberships
);

router.get(
  '/',
  authenticateToken,
  authorizeRoles('admin'),
  getAllMemberships
);

module.exports = router;