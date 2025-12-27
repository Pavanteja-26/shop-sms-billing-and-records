const express = require('express');
const router = express.Router();
const { login, verifyAuth } = require('../controllers/authController');
const { loginLimiter } = require('../middleware/rateLimiter');

// POST /api/auth/login - Admin login
router.post('/login', loginLimiter, login);

// GET /api/auth/verify - Verify authentication
router.get('/verify', verifyAuth);

module.exports = router;