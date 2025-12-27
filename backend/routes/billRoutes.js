const express = require('express');
const router = express.Router();
const {
  createNewBill,
  getBill,
  getBills,
  getBillsByStatusEndpoint,
  retrySMS
} = require('../controllers/billController');
const { requireAuth } = require('../middleware/auth');
const { billCreationLimiter } = require('../middleware/rateLimiter');

// All bill routes require authentication
router.use(requireAuth);

// POST /api/bills - Create new bill
router.post('/', billCreationLimiter, createNewBill);

// GET /api/bills - Get all bills (paginated)
router.get('/', getBills);

// GET /api/bills/status/:status - Get bills by SMS status
router.get('/status/:status', getBillsByStatusEndpoint);

// GET /api/bills/:id - Get specific bill
router.get('/:id', getBill);

// POST /api/bills/:id/retry-sms - Retry sending SMS
router.post('/:id/retry-sms', retrySMS);

module.exports = router;