/**
 * AI Service
 * Handles OpenAI API integration and response generation
 */

const { OpenAI } = require('openai');
const { logger } = require('../utils/logger');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const SYSTEM_PROMPT = `You are the core brain of a self-evolving AI engine system (AAES).
Your role is to:
1. Understand and respond to user queries intelligently
2. Learn from conversation context and user preferences
3. Adapt your responses based on the user's communication style
4. Provide helpful, accurate, and thoughtful responses
5. Remember context from previous interactions

Always maintain a professional and helpful tone.`;

const aiService = {
  generateResponse: async (context) => {
    const { userId, message, memoryContext = [], agentContext = {} } = context;

    try {
      logger.info(`Generating AI response for user: ${userId}`);

      // Build conversation history for the API
      const conversationHistory = memoryContext.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Add current message
      conversationHistory.push({
        role: 'user',
        content: message,
      });

      // Call OpenAI API
      const response = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          ...conversationHistory.slice(-20), // Keep last 20 messages for context window
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const aiResponse = response.choices[0].message.content;
      logger.debug(`AI response generated for user: ${userId}`);

      return aiResponse;
    } catch (error) {
      logger.error(`OpenAI API error for user ${userId}`, error);
      throw new Error(`Failed to generate AI response: ${error.message}`);
    }
  },
};

module.exports = { aiService };
