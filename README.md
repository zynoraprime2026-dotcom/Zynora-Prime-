# Zynora AI Engine System - Full Stack Application

A complete production-ready full-stack AI engine system with authentication, built with React, Express.js, and OpenAI.

## 🌟 Features

### Backend
- ✅ Express.js REST API (production-ready)
- ✅ JWT Authentication (register, login, protected routes)
- ✅ OpenAI GPT-4 Integration
- ✅ User-based Memory System (isolated per user)
- ✅ Dynamic AI Agent Generator
- ✅ bcrypt Password Hashing
- ✅ Comprehensive Error Handling
- ✅ Health monitoring endpoint
- ✅ CORS configuration
- ✅ Production logging

### Frontend
- ✅ React SPA with Modern Dark UI
- ✅ ChatGPT-style Chat Interface
- ✅ JWT Token Management
- ✅ Protected Routes
- ✅ Real-time Chat with Animations
- ✅ Agent Information Display
- ✅ Memory Counter
- ✅ Production-ready deployment config

### Deployment Ready
- ✅ Backend: Render / Railway
- ✅ Frontend: Vercel
- ✅ Environment variable configuration
- ✅ CORS & Security setup
- ✅ Graceful shutdown handling
- ✅ Cloud-ready architecture

## 🚀 Quick Start

### Local Development

```bash
# Clone & Install
git clone <repo>
cd zynora-ai-full-stack
npm install

# Configure Environment
cp .env.example .env
# Edit .env and add your OpenAI API key

# Start Development Server
npm run dev
# Server: http://localhost:3000
# Frontend: http://localhost:3000
```

### Quick Test
1. Open `http://localhost:3000`
2. Register a new account
3. Log in with credentials
4. Send a chat message
5. View AI response with agent info

## 📦 Project Structure

```
.
├── src/
│   ├── server.js                 # Entry point
│   ├── app.js                    # Express setup
│   ├── routes/
│   │   ├── health.js            # Health check
│   │   ├── auth.js              # Authentication
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
│       ├── api.js               # API client
│       ├── app.js               # Main React app
│       └── components/
│           ├── LoginPage.js
│           ├── RegisterPage.js
│           └── ChatInterface.js
├── package.json
├── .env.example
├── DEPLOYMENT.md                # Production deployment
├── QUICKSTART_DEPLOYMENT.md     # Quick deployment guide
└── README.md
```

## 🔐 Authentication

### User Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### User Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### Protected Routes
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <token>"
```

## 💬 Chat API

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"message": "Help me with marketing strategy"}'
```

**Response:**
```json
{
  "success": true,
  "response": "Here are some effective marketing strategies...",
  "agent": {
    "type": "marketing",
    "name": "Marketing Specialist",
    "skills": ["copywriting", "social_media", "analytics"],
    "confidence": 85.5
  },
  "memoryCount": 2
}
```

## 🌐 Production Deployment

### Quick Deployment (5 minutes)
See `QUICKSTART_DEPLOYMENT.md` for express setup guide.

### Detailed Deployment
See `DEPLOYMENT.md` for comprehensive step-by-step instructions.

### Deploy Backend (Render)
1. Connect GitHub repository
2. Set environment variables
3. Start command: `npm start`
4. Deploy

### Deploy Frontend (Vercel)
1. Import GitHub repository
2. Set `REACT_APP_API_URL` environment variable
3. Root directory: `./public`
4. Deploy

## 🔑 Environment Variables

### Development (.env)
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=dev-secret-key
OPENAI_API_KEY=your-key-here
OPENAI_MODEL=gpt-4o-mini
MAX_MEMORY_PER_USER=50
```

### Production
See `PRODUCTION_SETUP.md` for all required variables.

## 🎨 UI Features

- **Dark Mode** - Cyberpunk theme
- **Real-time Chat** - Smooth animations
- **Agent Display** - Expandable agent details
- **Memory Counter** - Track conversation history
- **Status Indicator** - Real-time connection status
- **Responsive Design** - Works on all devices

## 🤖 AI Agent Types

Automatically detected based on user input:

- **Marketing** - Sales, campaigns, brand strategy
- **Coding** - Programming, debugging, APIs
- **Business** - Strategy, management, growth
- **Creative** - Design, storytelling, content
- **Support** - Help, problem-solving, service
- **General** - Default for other topics

## 💾 Memory System

Each user has isolated memory:
- Max 50 messages per user (configurable)
- FIFO overflow management
- Context-aware AI responses
- Automatic user isolation

## 📊 System Architecture

```
Browser (Vercel Frontend)
         ↓ HTTPS
Express API (Render/Railway Backend)
         ↓ API Key
OpenAI GPT-4o-mini
```

## 🔒 Security Features

- ✅ bcrypt password hashing (10 rounds)
- ✅ JWT authentication (7 day expiry)
- ✅ Protected API routes
- ✅ User-isolated data
- ✅ CORS configuration
- ✅ Input validation
- ✅ Error handling (no data leaks)
- ✅ Graceful shutdown
- ✅ Production logging

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Check backend is running
- Verify API URL is correct
- Check CORS settings

### "OpenAI API Error"
- Verify API key is set
- Check account has credits
- Review backend logs

### "Port already in use"
```bash
PORT=3001 npm start
```

### "Token expired"
Frontend automatically redirects to login.

## 📚 Documentation

- `DEPLOYMENT.md` - Complete deployment guide
- `QUICKSTART_DEPLOYMENT.md` - Quick start guide
- `PRODUCTION_SETUP.md` - Environment setup
- `README.md` - This file
- `README-FULLSTACK.md` - Full-stack architecture (deprecated, see README.md)

## 🚀 Next Steps

1. **Local Testing** - Run `npm run dev` and test locally
2. **Environment Setup** - Get OpenAI API key
3. **Deploy Backend** - Follow `DEPLOYMENT.md`
4. **Deploy Frontend** - Follow `DEPLOYMENT.md`
5. **Go Live** - Share your system!

## 📈 Scaling Considerations

For production SaaS:
1. Add database (MongoDB/PostgreSQL)
2. Add Redis caching
3. Implement rate limiting
4. Add monitoring (Sentry)
5. Add email verification
6. Implement user profiles
7. Add analytics

## 📄 License

MIT License - See LICENSE file

## 👤 Author

Zynora Prime - Full-Stack AI Engine System

## 🤝 Support

For issues or questions, open a GitHub issue.

---

**Ready to deploy? Start with `QUICKSTART_DEPLOYMENT.md`!** 🎉
