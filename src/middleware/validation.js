/**
 * Request validation middleware
 */

const { logger } = require('../utils/logger');

const validateChatRequest = (req, res, next) => {
  const { userId, message } = req.body;

  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    logger.warn('Invalid userId in request');
    return res.status(400).json({
      success: false,
      error: 'userId is required and must be a non-empty string',
    });
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    logger.warn('Invalid message in request');
    return res.status(400).json({
      success: false,
      error: 'message is required and must be a non-empty string',
    });
  }

  next();
};

module.exports = { validateChatRequest };
