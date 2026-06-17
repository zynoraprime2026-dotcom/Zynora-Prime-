/**
 * Chat controller
 * Handles chat request logic and orchestrates AI and memory services
 */

const { logger } = require('../utils/logger');
const { aiService } = require('../services/aiService');
const { memoryService } = require('../services/memoryService');
const { agentGenerator } = require('../ai/agentGenerator');

const chatController = {
  handleChat: async (req, res) => {
    const { userId, message } = req.body;

    try {
      logger.info(`Processing chat for user: ${userId}`);

      // Retrieve user's conversation history
      const userMemory = memoryService.getUserMemory(userId);
      logger.debug(`Retrieved ${userMemory.length} memory items for user ${userId}`);

      // Generate agent based on user input
      const agent = agentGenerator.generateAgent(message);
      logger.debug(`Generated agent: ${JSON.stringify(agent)}`);

      // Get AI response with memory context
      const aiResponse = await aiService.generateResponse({
        userId,
        message,
        memoryContext: userMemory,
        agentContext: agent,
      });

      // Store conversation in memory
      memoryService.storeMessage(userId, {
        role: 'user',
        content: message,
        timestamp: new Date(),
      });

      memoryService.storeMessage(userId, {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      });

      const updatedMemory = memoryService.getUserMemory(userId);

      logger.info(`Chat processed successfully for user: ${userId}`);

      res.status(200).json({
        success: true,
        response: aiResponse,
        agent,
        memoryCount: updatedMemory.length,
      });
    } catch (error) {
      logger.error(`Chat error for user ${userId}`, error);

      res.status(500).json({
        success: false,
        error: error.message || 'Failed to process chat request',
      });
    }
  },
};

module.exports = { chatController };
