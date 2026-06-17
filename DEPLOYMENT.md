# Production Deployment Guide for Zynora AI Engine System

## 📋 Table of Contents
1. [Backend Deployment (Render/Railway)](#backend-deployment)
2. [Frontend Deployment (Vercel)](#frontend-deployment)
3. [Environment Variables](#environment-variables)
4. [Post-Deployment Verification](#post-deployment-verification)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 Backend Deployment

### Deploy on Render

#### Step 1: Prepare Repository
Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for production deployment"
git push origin feature/zynora-ai-dashboard
```

#### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

#### Step 3: Create New Web Service
1. Dashboard → **New +** → **Web Service**
2. Select your repository
3. Configure:
   - **Name**: `zynora-ai-engine`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Region**: Choose closest to users

#### Step 4: Add Environment Variables
Go to **Environment** section and add:
```
NODE_ENV=production
PORT=3000
JWT_SECRET=<generate-strong-secret-here>
OPENAI_API_KEY=<your-openai-key>
OPENAI_MODEL=gpt-4o-mini
MAX_MEMORY_PER_USER=50
```

⚠️ **IMPORTANT**: Generate a strong JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Step 5: Deploy
1. Click **Create Web Service**
2. Wait for deployment (2-5 minutes)
3. Get your backend URL (e.g., `https://zynora-ai-engine.onrender.com`)

---

### Deploy on Railway

#### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Authorize Railway

#### Step 2: Create New Project
1. Dashboard → **New Project**
2. Select **GitHub Repo**
3. Search and select your repository
4. Select **Node.js** environment

#### Step 3: Configure Service
1. Go to **Settings**
2. Set **Start Command**: `npm start`
3. Set **Root Directory**: `.` (root)

#### Step 4: Add Environment Variables
Click **Variables** and add:
```
NODE_ENV=production
PORT=3000
JWT_SECRET=<generate-strong-secret>
OPENAI_API_KEY=<your-openai-key>
OPENAI_MODEL=gpt-4o-mini
MAX_MEMORY_PER_USER=50
```

#### Step 5: Deploy
1. Click **Deploy**
2. Wait for deployment to complete
3. Get your backend URL from the deployment output

---

## 🎨 Frontend Deployment

### Deploy on Vercel

#### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel

#### Step 2: Import Project
1. Dashboard → **Add New** → **Project**
2. Select your GitHub repository
3. Configure:
   - **Framework**: None (static)
   - **Root Directory**: `./public`
   - **Build Command**: Leave empty
   - **Output Directory**: `.`

#### Step 3: Add Environment Variables
Before deploying, add:
```
REACT_APP_API_URL=https://your-backend-url.com
```

Replace with your actual Render/Railway backend URL.

#### Step 4: Deploy
1. Click **Deploy**
2. Wait for deployment (1-2 minutes)
3. Get your frontend URL (e.g., `https://zynora-ai.vercel.app`)

---

## 🌐 Environment Variables

### Backend (.env in production)
```env
# Server
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Security
JWT_SECRET=<strong-random-secret-key>

# AI
OPENAI_API_KEY=<your-openai-api-key>
OPENAI_MODEL=gpt-4o-mini

# Application
MAX_MEMORY_PER_USER=50
DEFAULT_AGENT_TYPE=general
```

### Frontend (.env.local in Vercel)
```
REACT_APP_API_URL=https://zynora-ai-engine.onrender.com
```

---

## ✅ Post-Deployment Verification

### Test Backend Health
```bash
curl https://your-backend-url/health
```

Expected response:
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 123.45,
  "environment": "production"
}
```

### Test Authentication

**Register a user:**
```bash
curl -X POST https://your-backend-url/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

**Login:**
```bash
curl -X POST https://your-backend-url/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

### Test Frontend
1. Open frontend URL in browser
2. Register a new account
3. Log in with your credentials
4. Send a chat message
5. Verify AI response appears
6. Check agent info displays correctly
7. Test refresh (should maintain session if token valid)

---

## 🔗 CORS Configuration

The backend is configured to accept requests from any origin in production. For enhanced security, update `src/app.js`:

```javascript
const cors = require('cors');

// For production, restrict to specific domain
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
```

Add to `.env`:
```
ALLOWED_ORIGINS=https://zynora-ai.vercel.app,https://yourdomain.com
```

---

## 🐛 Troubleshooting

### "Cannot connect to backend" error
- [ ] Verify backend URL is correct in frontend env vars
- [ ] Check CORS settings on backend
- [ ] Ensure backend is running: `curl https://your-backend-url/health`
- [ ] Check browser console for exact error

### "Invalid token" on frontend
- [ ] Tokens are device-specific; register new account after deployment
- [ ] Check JWT_SECRET is same on backend
- [ ] Verify token expiration (7 days)

### "500 Error" when sending chat message
- [ ] Verify OPENAI_API_KEY is set correctly
- [ ] Check OpenAI account has sufficient credits
- [ ] Review backend logs: `Render/Railway dashboard → Logs`

### Frontend not updating after deploy
- [ ] Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
- [ ] Check Vercel deployment status
- [ ] Verify env variable is set: `REACT_APP_API_URL`

### "PORT already in use" locally
```bash
PORT=3001 npm start
```

### Token not persisting after refresh
- [ ] Browser localStorage must be enabled
- [ ] Check browser DevTools → Application → LocalStorage
- [ ] Verify `tokenUtils.setToken()` is called on login

---

## 📊 Monitoring & Logging

### Render Logs
Dashboard → Your Service → **Logs** tab

### Railway Logs
Dashboard → Your Project → **Deployments** → Click deployment → **Logs**

### View Errors
```bash
# SSH into Render service
render exec zynora-ai-engine npm start

# View Railway logs
railway logs
```

---

## 🔐 Security Checklist

- [ ] JWT_SECRET is strong (32+ character random string)
- [ ] OPENAI_API_KEY is not exposed in code
- [ ] CORS restricted to frontend domain (optional)
- [ ] HTTPS enabled on both backend and frontend
- [ ] Environment variables set correctly on platform
- [ ] No sensitive data in git commits
- [ ] Error messages don't leak sensitive info
- [ ] Rate limiting considered (optional)

---

## 📈 Scaling Considerations

### For Production SaaS:
1. **Database**: Replace in-memory user storage with MongoDB/PostgreSQL
2. **Redis**: Add caching layer for memory service
3. **Authentication**: Consider Auth0 or Firebase
4. **Analytics**: Add monitoring (Sentry, DataDog)
5. **Email**: Add email verification & password reset
6. **Rate Limiting**: Implement to prevent abuse
7. **Logging**: Centralized logging (ELK, Datadog)

---

## 🚀 Quick Deployment Checklist

### Before Deploying:
- [ ] All code committed to GitHub
- [ ] `.env.example` updated
- [ ] `package.json` dependencies correct
- [ ] `README-FULLSTACK.md` updated
- [ ] No hardcoded localhost URLs
- [ ] Error handling complete

### Backend (Render/Railway):
- [ ] Repository connected
- [ ] Start command: `npm start`
- [ ] Environment variables set
- [ ] JWT_SECRET generated
- [ ] OPENAI_API_KEY configured
- [ ] Deployment successful
- [ ] Health endpoint responds

### Frontend (Vercel):
- [ ] Repository imported
- [ ] Root directory: `./public`
- [ ] Environment variables set
- [ ] `REACT_APP_API_URL` points to backend
- [ ] Deployment successful
- [ ] App loads without errors
- [ ] Can register and login

---

## 📞 Support & Resources

- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Vercel Documentation](https://vercel.com/docs)
- [Express Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [OpenAI API Documentation](https://platform.openai.com/docs)

---

## 🎉 Deployment Complete!

Your Zynora AI Engine System is now live in production!

**Share your live system:**
- Frontend URL: `https://your-frontend.vercel.app`
- Backend URL: `https://your-backend.onrender.com`

For monitoring and support, refer to the platform-specific dashboards.
