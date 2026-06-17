/**
 * Health check endpoint
 * GET /health - Returns system health status
 */

const express = require('express');
const router = express.Router();
const { logger } = require('../utils/logger');

router.get('/', (req, res) => {
  logger.info('Health check performed');
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

module.exports = router;
