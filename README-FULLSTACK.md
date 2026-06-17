# Zynora AI Full-Stack System

A complete production-ready full-stack AI engine system with authentication, including React frontend and Express.js backend.

## 🚀 Features

### Backend
- ✅ Express.js REST API
- ✅ JWT Authentication (Register, Login, Protected Routes)
- ✅ OpenAI GPT-4 Integration
- ✅ User-based Memory System (isolated per user)
- ✅ Dynamic AI Agent Generator
- ✅ bcrypt Password Hashing
- ✅ Production-ready Error Handling

### Frontend
- ✅ React SPA with Modern UI
- ✅ Dark Mode (Cyberpunk Theme)
- ✅ ChatGPT-style Interface
- ✅ JWT Token Management
- ✅ Protected Routes
- ✅ Real-time Chat with Animations
- ✅ Agent Information Display
- ✅ Memory Counter

## 📋 Project Structure

```
.
├── src/
│   ├── server.js                 # Entry point
│   ├── app.js                    # Express setup
│   ├── routes/
│   │   ├── health.js            # Health check
│   │   ├── auth.js              # Auth endpoints
│   │   └── chat.js              # Chat endpoint
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   └── chatController.js    # Chat logic
│   ├── models/
│   │   └── User.js              # User model
│   ├── services/
│   │   ├── aiService.js         # OpenAI integration
│   │   └── memoryService.js     # Memory management
│   ├── ai/
│   │   └── agentGenerator.js    # Agent generation
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── errorHandler.js      # Error handling
│   │   └── validation.js        # Request validation
│   └── utils/
│       ├── logger.js            # Logging
│       └── jwt.js               # JWT utilities
├── public/
│   ├── index.html               # Frontend HTML
│   └── js/
│       ├── api.js               # API utilities
│       ├── app.js               # Main React app
│       └── components/
│           ├── LoginPage.js     # Login component
│           ├── RegisterPage.js  # Register component
│           └── ChatInterface.js # Chat component
├── package.json
├── .env.example
└── README-FULLSTACK.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js >= 16.0.0
- npm or yarn
- OpenAI API key

### Step 1: Clone & Install
```bash
git clone <repository-url>
cd zynora-ai-full-stack
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and add:
```env
OPENAI_API_KEY=sk-your-key-here
JWT_SECRET=your-secret-key-change-this
PORT=3000
NODE_ENV=development
```

### Step 3: Start Server
```bash
npm start        # Production
npm run dev      # Development with auto-reload
```

Server runs on: `http://localhost:3000`

## 🔐 Authentication System

### User Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### User Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

### Protected Route (Get Current User)
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <token>"
```

## 💬 Chat API

### Send Chat Message
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "message": "Help me with marketing strategy"
  }'
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
    "confidence": 85.5,
    "generatedAt": "2024-01-15T10:30:00.000Z"
  },
  "memoryCount": 2
}
```

## 🎨 Frontend User Flow

1. **Landing Page** → Register or Login
2. **Login/Register** → Create account or sign in
3. **Dashboard** → Main chat interface
4. **Chat** → Send messages, view AI responses
5. **Agent Info** → Click agent badge to see details
6. **Logout** → Sign out (clears token)

## 🔒 Security Features

- ✅ JWT Token-based Authentication
- ✅ bcrypt Password Hashing (10 salt rounds)
- ✅ Protected Routes (middleware)
- ✅ User-isolated Memory (no cross-user access)
- ✅ Token Expiration (7 days)
- ✅ CORS Configuration
- ✅ Input Validation
- ✅ Error Handling (no sensitive data leaks)

## 📊 Agent Types

System automatically detects agent type:

- **Marketing** - Marketing, sales, campaigns
- **Coding** - Programming, debugging, APIs
- **Business** - Strategy, management, growth
- **Creative** - Design, storytelling, ideas
- **Support** - Help, problem-solving, service
- **General** - Default for other topics

## 💾 Memory System

Each user has isolated memory:
- Max 50 messages per user (configurable)
- FIFO overflow management
- Automatic cleanup
- Context-aware AI responses

## 🚀 Deployment

### Render
1. Connect GitHub repo
2. Set environment variables
3. Deploy with `npm start`

### Railway
1. Connect GitHub repo
2. Configure variables
3. Deploy

### Heroku
1. Create `Procfile`: `web: npm start`
2. Set config vars
3. Deploy: `git push heroku main`

## 🔄 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Persistent chat history
- [ ] WebSocket support (real-time)
- [ ] Email verification
- [ ] Password reset
- [ ] User profiles
- [ ] Rate limiting
- [ ] Analytics & monitoring
- [ ] Multi-language support
- [ ] Admin dashboard

## 🐛 Troubleshooting

### "Cannot find module bcryptjs"
```bash
npm install bcryptjs jsonwebtoken
```

### "OPENAI_API_KEY is not set"
Make sure to add API key to `.env` file.

### "Port 3000 already in use"
```bash
PORT=3001 npm start
```

### "Token expired" on frontend
Frontend will automatically redirect to login.

## 📚 Environment Variables

```env
# Server
NODE_ENV=development
PORT=3000
HOST=localhost

# Security
JWT_SECRET=your-secret-key

# AI
OPENAI_API_KEY=sk-your-key
OPENAI_MODEL=gpt-4o-mini

# Application
MAX_MEMORY_PER_USER=50
DEFAULT_AGENT_TYPE=general
```

## 📝 License

MIT License - See LICENSE file

## 👨‍💻 Author

Zynora Prime - Full-Stack AI Engine System

## 🤝 Support

For issues and questions, open a GitHub issue.
