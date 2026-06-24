const express = require('express');
const {
  getAllPayments,
  getMyPayments
} = require('../controllers/paymentController');

const {
  authenticateToken,
  authorizeRoles
} = require('../middlewares/authMiddleware');

const router = express.Router();

router.get(
  '/me',
  authenticateToken,
  authorizeRoles('member'),
  getMyPayments
);

router.get(
  '/',
  authenticateToken,
  authorizeRoles('admin'),
  getAllPayments
);

module.exports = router;