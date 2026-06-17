/**
 * User Model
 * Manages user data structure (in-memory for MVP, can be replaced with DB)
 */

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { logger } = require('../utils/logger');

// In-memory user storage
const users = {};

const userModel = {
  // Create a new user
  create: async (email, password) => {
    try {
      // Check if user already exists
      if (users[email]) {
        throw new Error('User already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user object
      const user = {
        id: crypto.randomUUID(),
        email,
        password: hashedPassword,
        createdAt: new Date(),
      };

      // Store user
      users[email] = user;
      logger.info(`User created: ${email}`);

      // Return user without password
      return {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      };
    } catch (error) {
      logger.error('Error creating user', error);
      throw error;
    }
  },

  // Find user by email
  findByEmail: (email) => {
    return users[email] || null;
  },

  // Find user by ID
  findById: (id) => {
    return Object.values(users).find((user) => user.id === id) || null;
  },

  // Verify password
  verifyPassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  // Get user safe object (without password)
  getSafe: (user) => {
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };
  },

  // Get all users (for debugging)
  getAll: () => {
    return Object.values(users).map((user) => ({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    }));
  },
};

module.exports = { userModel };
