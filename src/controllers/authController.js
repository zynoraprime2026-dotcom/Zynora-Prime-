/**
 * Auth Controller
 * Handles user registration, login, and profile endpoints
 */

const { userModel } = require('../models/User');
const { jwtUtils } = require('../utils/jwt');
const { logger } = require('../utils/logger');

const authController = {
  // Register user
  register: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required',
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          error: 'Password must be at least 6 characters',
        });
      }

      // Create user
      const user = await userModel.create(email, password);

      // Generate token
      const token = jwtUtils.generateToken(user.id);

      logger.info(`User registered: ${email}`);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user,
      });
    } catch (error) {
      logger.error('Register error', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Registration failed',
      });
    }
  },

  // Login user
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required',
        });
      }

      // Find user
      const user = userModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password',
        });
      }

      // Verify password
      const isPasswordValid = await userModel.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password',
        });
      }

      // Generate token
      const token = jwtUtils.generateToken(user.id);

      logger.info(`User logged in: ${email}`);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: userModel.getSafe(user),
      });
    } catch (error) {
      logger.error('Login error', error);
      res.status(500).json({
        success: false,
        error: 'Login failed',
      });
    }
  },

  // Get current user
  getMe: (req, res) => {
    try {
      const user = userModel.findById(req.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }

      res.status(200).json(userModel.getSafe(user));
    } catch (error) {
      logger.error('Get me error', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user',
      });
    }
  },
};

module.exports = { authController };
