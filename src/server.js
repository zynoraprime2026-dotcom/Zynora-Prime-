/**
 * Production-Ready Server Entry Point
 * Handles graceful shutdown and production settings
 */

const app = require('./app');
const { logger } = require('./utils/logger');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0'; // Listen on all interfaces for cloud deployment

const server = app.listen(PORT, HOST, () => {
  logger.info(`🚀 Zynora AI Engine System running on http://${HOST}:${PORT}`);
  logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🔐 Authentication: JWT enabled`);
  logger.info(`🤖 AI Engine: OpenAI ${process.env.OPENAI_MODEL || 'gpt-4o-mini'}`);
});

// Graceful shutdown
const gracefulShutdown = () => {
  logger.info('Graceful shutdown initiated...');
  server.close(() => {
    logger.info('✅ Server closed');
    process.exit(0);
  });
  
  // Force exit after 10 seconds
  setTimeout(() => {
    logger.error('⚠️ Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = server;
