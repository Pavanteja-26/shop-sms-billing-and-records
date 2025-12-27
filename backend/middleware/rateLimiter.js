const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for general API endpoints
 * Limits: 100 requests per 15 minutes per IP
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per window
  message: {
    success: false,
    message: 'Too many requests. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter for bill creation
 * Limits: 20 bills per 15 minutes per IP
 */
const billCreationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Max 20 bills per window
  message: {
    success: false,
    message: 'Too many bills created. Please wait before creating more.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter for login attempts
 * Limits: 5 attempts per 15 minutes per IP
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 login attempts per window
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  generalLimiter,
  billCreationLimiter,
  loginLimiter
};