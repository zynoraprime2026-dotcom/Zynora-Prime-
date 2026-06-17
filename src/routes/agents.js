/**
 * AI Agents Backend API (Optional)
 * Endpoints for managing AI agents
 */

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { logger } = require('../utils/logger');

// In-memory agent storage (can be replaced with database)
const userAgents = {}; // userId -> [agents]

// Initialize user agents
const initializeUserAgents = (userId) => {
  if (!userAgents[userId]) {
    userAgents[userId] = [];
    logger.info(`Agents storage initialized for user: ${userId}`);
  }
};

// GET - Fetch all agents for current user
router.get('/', verifyToken, (req, res) => {
  try {
    const userId = req.userId;
    initializeUserAgents(userId);

    logger.info(`Fetched agents for user: ${userId}`);
    res.status(200).json({
      success: true,
      agents: userAgents[userId],
      count: userAgents[userId].length,
    });
  } catch (error) {
    logger.error('Get agents error', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch agents',
    });
  }
});

// POST - Create a new agent
router.post('/', verifyToken, (req, res) => {
  try {
    const userId = req.userId;
    const { name, goal, skills } = req.body;

    // Validation
    if (!name || !goal || !skills || skills.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Name, goal, and at least one skill are required',
      });
    }

    initializeUserAgents(userId);

    // Create agent
    const newAgent = {
      id: `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      goal,
      skills,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    userAgents[userId].push(newAgent);

    logger.info(`Agent created: ${name} for user: ${userId}`);

    res.status(201).json({
      success: true,
      message: 'Agent created successfully',
      agent: newAgent,
    });
  } catch (error) {
    logger.error('Create agent error', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create agent',
    });
  }
});

// GET - Fetch single agent
router.get('/:agentId', verifyToken, (req, res) => {
  try {
    const userId = req.userId;
    const { agentId } = req.params;

    initializeUserAgents(userId);

    const agent = userAgents[userId].find((a) => a.id === agentId);

    if (!agent) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found',
      });
    }

    res.status(200).json({
      success: true,
      agent,
    });
  } catch (error) {
    logger.error('Get agent error', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch agent',
    });
  }
});

// PUT - Update agent status or details
router.put('/:agentId', verifyToken, (req, res) => {
  try {
    const userId = req.userId;
    const { agentId } = req.params;
    const { status, name, goal, skills } = req.body;

    initializeUserAgents(userId);

    const agentIndex = userAgents[userId].findIndex((a) => a.id === agentId);

    if (agentIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found',
      });
    }

    // Update fields
    if (status) userAgents[userId][agentIndex].status = status;
    if (name) userAgents[userId][agentIndex].name = name;
    if (goal) userAgents[userId][agentIndex].goal = goal;
    if (skills) userAgents[userId][agentIndex].skills = skills;

    logger.info(`Agent updated: ${agentId} for user: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Agent updated successfully',
      agent: userAgents[userId][agentIndex],
    });
  } catch (error) {
    logger.error('Update agent error', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update agent',
    });
  }
});

// DELETE - Delete an agent
router.delete('/:agentId', verifyToken, (req, res) => {
  try {
    const userId = req.userId;
    const { agentId } = req.params;

    initializeUserAgents(userId);

    const agentIndex = userAgents[userId].findIndex((a) => a.id === agentId);

    if (agentIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found',
      });
    }

    const deletedAgent = userAgents[userId].splice(agentIndex, 1)[0];

    logger.info(`Agent deleted: ${agentId} for user: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Agent deleted successfully',
      agent: deletedAgent,
    });
  } catch (error) {
    logger.error('Delete agent error', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete agent',
    });
  }
});

module.exports = router;
