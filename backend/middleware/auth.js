require('dotenv').config();

/**
 * Simple session-based authentication middleware
 * Checks if admin is authenticated via session
 */
const requireAuth = (req, res, next) => {
  const isAuthenticated = req.headers['x-admin-auth'] === process.env.ADMIN_PASSWORD;
  
  if (!isAuthenticated) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Please log in.'
    });
  }
  
  next();
};

/**
 * Verify admin password
 * @param {String} password - Password to verify
 * @returns {Boolean} - Is password correct
 */
const verifyAdminPassword = (password) => {
  const correctPassword = process.env.ADMIN_PASSWORD;
  
  if (!correctPassword) {
    console.error('⚠️  ADMIN_PASSWORD not set in environment variables');
    return false;
  }
  
  return password === correctPassword;
};

module.exports = {
  requireAuth,
  verifyAdminPassword
};