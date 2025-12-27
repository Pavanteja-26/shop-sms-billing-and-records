const { verifyAdminPassword } = require('../middleware/auth');
const { validateLogin } = require('../utils/validator');

/**
 * Admin login endpoint
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    // Validate request body
    const validation = validateLogin(req.body);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }
    
    const { password } = validation.data;
    
    // Verify password
    const isValid = verifyAdminPassword(password);
    
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }
    
    // Return success with auth token (password itself for simplicity)
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token: password // In production, use JWT or session tokens
    });
    
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

/**
 * Verify if admin is authenticated
 * GET /api/auth/verify
 */
const verifyAuth = async (req, res) => {
  try {
    const token = req.headers['x-admin-auth'];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token provided'
      });
    }
    
    const isValid = verifyAdminPassword(token);
    
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Authenticated'
    });
    
  } catch (error) {
    console.error('Auth verification error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error during verification'
    });
  }
};

module.exports = {
  login,
  verifyAuth
};