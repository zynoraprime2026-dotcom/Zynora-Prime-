/**
 * Chat API routes
 * POST /api/chat - Send message to AI engine
 */

const express = require('express');
const router = express.Router();
const { validateChatRequest } = require('../middleware/validation');
const { chatController } = require('../controllers/chatController');
const { logger } = require('../utils/logger');

router.post('/', validateChatRequest, async (req, res, next) => {
  try {
    await chatController.handleChat(req, res);
  } catch (error) {
    logger.error('Chat route error', error);
    next(error);
  }
});

module.exports = router;
