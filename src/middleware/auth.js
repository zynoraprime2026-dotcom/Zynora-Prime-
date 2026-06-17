/**
 * Authentication Middleware
 * Verifies JWT tokens and protects routes
 */

const { jwtUtils } = require('../utils/jwt');
const { userModel } = require('../models/User');
const { logger } = require('../utils/logger');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      logger.warn('No authorization header provided');
      return res.status(401).json({
        success: false,
        error: 'No authorization token provided',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      logger.warn('Invalid authorization header format');
      return res.status(401).json({
        success: false,
        error: 'Invalid authorization header format',
      });
    }

    const decoded = jwtUtils.verifyToken(token);

    if (!decoded) {
      logger.warn('Invalid or expired token');
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token',
      });
    }

    // Attach user ID to request
    req.userId = decoded.userId;
    logger.debug(`Token verified for user: ${decoded.userId}`);

    next();
  } catch (error) {
    logger.error('Auth middleware error', error);
    res.status(500).json({
      success: false,
      error: 'Authentication error',
    });
  }
};

module.exports = { verifyToken };
