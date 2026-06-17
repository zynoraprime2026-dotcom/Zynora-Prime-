# Adaptive AI Engine System (AAES)

A self-evolving AI engine backend system built with Node.js and Express, featuring OpenAI integration, user-based memory management, and dynamic AI agent generation.

## Features

✨ **Core Features**
- Express.js REST API backend
- OpenAI GPT-4 integration
- User-based conversation memory system
- Dynamic AI agent generator
- Clean MVC-style architecture
- Production-ready error handling
- Environment variable configuration

## Project Structure

```
src/
├── server.js                 # Entry point
├── app.js                    # Express setup
├── routes/                   # API routes
│   ├── health.js            # Health check endpoint
│   └── chat.js              # Chat API endpoint
├── controllers/              # Business logic
│   └── chatController.js    # Chat request handler
├── services/                 # Core services
│   ├── aiService.js         # OpenAI integration
│   └── memoryService.js     # User memory management
├── ai/                       # AI logic
│   └── agentGenerator.js    # Dynamic agent generation
├── middleware/               # Express middleware
│   ├── errorHandler.js      # Global error handling
│   └── validation.js        # Request validation
└── utils/                    # Utilities
    └── logger.js            # Logging utility
```

## Installation

### Prerequisites
- Node.js >= 16.0.0
- npm or yarn
- OpenAI API key

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd adaptive-ai-engine-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_key_here
   PORT=3000
   NODE_ENV=development
   ```

## Running the Application

### Development
```bash
npm run dev
```
Runs with nodemon for auto-reload.

### Production
```bash
npm start
```

## API Endpoints

### Health Check
```
GET /health
```
Returns system health status.

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 123.45,
  "environment": "development"
}
```

### Chat Endpoint
```
POST /api/chat
```
Sends a message to the AI engine.

**Request Body:**
```json
{
  "userId": "user123",
  "message": "Help me with marketing strategy for my startup"
}
```

**Response:**
```json
{
  "success": true,
  "response": "Here are some effective marketing strategies...",
  "agent": {
    "type": "marketing",
    "name": "Marketing Specialist",
    "role": "Digital Marketing",
    "skills": ["copywriting", "social_media", "analytics"],
    "tone": "engaging",
    "confidence": 75.5,
    "generatedAt": "2024-01-15T10:30:00.000Z"
  },
  "memoryCount": 2
}
```

## Agent Types

The system automatically detects and generates agents based on user input:

- **Marketing** - For marketing, sales, and brand-related queries
- **Coding** - For programming and technical questions
- **Business** - For strategy and management discussions
- **Creative** - For creative and content-related work
- **Support** - For customer service and problem-solving
- **General** - Default for other queries

## Memory System

Each user has a dedicated memory store that:
- Stores conversation history (max 50 messages per user by default)
- Maintains context for better AI responses
- Implements FIFO (first-in-first-out) overflow management
- Can be cleared or reset per user

## Configuration

### Environment Variables

```env
# Server
NODE_ENV=development          # development, staging, production
PORT=3000                     # Server port
HOST=localhost                # Server host

# OpenAI
OPENAI_API_KEY=your_key      # Your OpenAI API key
OPENAI_MODEL=gpt-4o-mini      # Model to use

# Application
MAX_MEMORY_PER_USER=50        # Max conversation history per user
DEFAULT_AGENT_TYPE=general    # Default agent type
```

## Error Handling

The application includes comprehensive error handling:
- Request validation middleware
- Global error handler
- Detailed error logging
- User-friendly error responses

## Deployment

### Render
1. Connect GitHub repository
2. Set environment variables in Render dashboard
3. Deploy with `npm start` as the start command

### Railway
1. Connect GitHub repository
2. Configure variables in Railway dashboard
3. Deploy with `npm start`

### Heroku
1. Create a Procfile: `web: npm start`
2. Set config vars for environment
3. Deploy with `git push heroku main`

## Development

### Running Tests
```bash
npm test
```

### Code Style
The codebase follows standard JavaScript/Node.js conventions with:
- Consistent naming conventions
- Modular architecture
- Comprehensive error handling
- Production-ready logging

## Performance Considerations

- Memory storage is in-memory (suitable for development/testing)
- For production, consider integrating a database (MongoDB, PostgreSQL)
- API calls are optimized with conversation history trimming
- Response times are typically < 2 seconds

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication and authorization
- Rate limiting and request throttling
- Caching layer (Redis)
- Multi-language support
- Advanced analytics and monitoring
- Web socket support for real-time chat
- Integration with more AI providers

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or contributions, please open an issue or pull request on GitHub.

## Author

Zynora Prime - Adaptive AI Engine System
