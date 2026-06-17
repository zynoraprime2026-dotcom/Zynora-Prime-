/**
 * JWT Token Utilities
 */

const jwt = require('jsonwebtoken');
const { logger } = require('./logger');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRY = '7d';

const jwtUtils = {
  // Generate token
  generateToken: (userId) => {
    try {
      const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
      logger.debug(`Token generated for user: ${userId}`);
      return token;
    } catch (error) {
      logger.error('Error generating token', error);
      throw error;
    }
  },

  // Verify token
  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      logger.error('Token verification failed', error);
      return null;
    }
  },

  // Decode token without verification
  decodeToken: (token) => {
    try {
      return jwt.decode(token);
    } catch (error) {
      logger.error('Error decoding token', error);
      return null;
    }
  },
};

module.exports = { jwtUtils };
