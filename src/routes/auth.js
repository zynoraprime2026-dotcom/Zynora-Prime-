/**
 * Auth Routes
 * POST /api/auth/register
 * POST /api/auth/login
 * GET /api/auth/me
 */

const express = require('express');
const router = express.Router();
const { authController } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const { logger } = require('../utils/logger');

router.post('/register', async (req, res, next) => {
  try {
    await authController.register(req, res);
  } catch (error) {
    logger.error('Register route error', error);
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    logger.error('Login route error', error);
    next(error);
  }
});

router.get('/me', verifyToken, (req, res, next) => {
  try {
    authController.getMe(req, res);
  } catch (error) {
    logger.error('Get me route error', error);
    next(error);
  }
});

module.exports = router;
