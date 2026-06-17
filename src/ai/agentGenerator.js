/**
 * Agent Generator
 * Dynamically generates AI agent configurations based on user input
 */

const { logger } = require('../utils/logger');

const AGENT_TYPES = {
  marketing: {
    name: 'Marketing Specialist',
    role: 'Digital Marketing',
    skills: ['copywriting', 'social_media', 'analytics'],
    tone: 'engaging',
  },
  coding: {
    name: 'Code Assistant',
    role: 'Software Developer',
    skills: ['programming', 'debugging', 'architecture'],
    tone: 'technical',
  },
  business: {
    name: 'Business Advisor',
    role: 'Business Consultant',
    skills: ['strategy', 'management', 'analysis'],
    tone: 'professional',
  },
  creative: {
    name: 'Creative Director',
    role: 'Content Creator',
    skills: ['brainstorming', 'design', 'storytelling'],
    tone: 'creative',
  },
  support: {
    name: 'Support Agent',
    role: 'Customer Service',
    skills: ['communication', 'problem_solving', 'empathy'],
    tone: 'helpful',
  },
  general: {
    name: 'General Assistant',
    role: 'AI Assistant',
    skills: ['conversation', 'knowledge', 'adaptation'],
    tone: 'friendly',
  },
};

const KEYWORDS = {
  marketing: ['marketing', 'seo', 'content', 'social', 'campaign', 'brand', 'sales'],
  coding: ['code', 'programming', 'debug', 'javascript', 'python', 'api', 'function', 'error'],
  business: ['business', 'strategy', 'management', 'plan', 'roi', 'growth', 'market', 'revenue'],
  creative: ['creative', 'design', 'write', 'story', 'art', 'music', 'visual', 'idea'],
  support: ['help', 'support', 'issue', 'problem', 'customer', 'service', 'complaint'],
};

const agentGenerator = {
  generateAgent: (userInput) => {
    try {
      const inputLower = userInput.toLowerCase();
      let detectedType = 'general';
      let maxMatches = 0;

      // Find the agent type with the most keyword matches
      for (const [type, keywords] of Object.entries(KEYWORDS)) {
        const matches = keywords.filter((keyword) => inputLower.includes(keyword)).length;
        if (matches > maxMatches) {
          maxMatches = matches;
          detectedType = type;
        }
      }

      const agent = {
        type: detectedType,
        ...AGENT_TYPES[detectedType],
        confidence: maxMatches > 0 ? Math.min((maxMatches / 3) * 100, 100) : 30,
        generatedAt: new Date().toISOString(),
      };

      logger.debug(`Generated agent type: ${detectedType} (confidence: ${agent.confidence}%)`);

      return agent;
    } catch (error) {
      logger.error('Error generating agent', error);
      return AGENT_TYPES.general;
    }
  },

  getAvailableAgentTypes: () => {
    return Object.keys(AGENT_TYPES);
  },

  getAgentDetails: (agentType) => {
    return AGENT_TYPES[agentType] || AGENT_TYPES.general;
  },
};

module.exports = { agentGenerator };
