/**
 * Memory Service
 * Manages user-specific conversation history and memory storage
 * In-memory storage (can be replaced with a database)
 */

const { logger } = require('../utils/logger');

const MAX_MEMORY_PER_USER = parseInt(process.env.MAX_MEMORY_PER_USER) || 50;
const userMemory = {}; // User-specific memory: { userId: [{ role, content, timestamp }] }

const memoryService = {
  // Initialize memory for a new user
  initializeUser: (userId) => {
    if (!userMemory[userId]) {
      userMemory[userId] = [];
      logger.info(`Memory initialized for user: ${userId}`);
    }
  },

  // Store a message in user's memory
  storeMessage: (userId, message) => {
    memoryService.initializeUser(userId);

    // Add message to memory
    userMemory[userId].push(message);

    // Enforce max memory limit (FIFO - remove oldest)
    if (userMemory[userId].length > MAX_MEMORY_PER_USER) {
      const removed = userMemory[userId].shift();
      logger.debug(`Memory limit reached for user ${userId}, removed oldest message`);
    }
  },

  // Retrieve user's memory
  getUserMemory: (userId) => {
    memoryService.initializeUser(userId);
    return userMemory[userId];
  },

  // Clear user's memory
  clearUserMemory: (userId) => {
    if (userMemory[userId]) {
      delete userMemory[userId];
      logger.info(`Memory cleared for user: ${userId}`);
    }
  },

  // Get memory statistics
  getMemoryStats: (userId) => {
    memoryService.initializeUser(userId);
    const memory = userMemory[userId];
    return {
      userId,
      totalMessages: memory.length,
      maxCapacity: MAX_MEMORY_PER_USER,
      utilizationPercent: ((memory.length / MAX_MEMORY_PER_USER) * 100).toFixed(2),
    };
  },

  // Get all active users
  getActiveUsers: () => {
    return Object.keys(userMemory).filter((userId) => userMemory[userId].length > 0);
  },
};

module.exports = { memoryService };
