# Production Deployment Configuration

## Environment Setup

Before deploying, ensure all environment variables are set:

### Render Deployment
```bash
# Add these in Render Dashboard → Environment
NODE_ENV=production
PORT=3000
JWT_SECRET=<generate-with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
OPENAI_API_KEY=<your-key>
OPENAI_MODEL=gpt-4o-mini
MAX_MEMORY_PER_USER=50
```

### Railway Deployment
```bash
# Add these in Railway Dashboard → Variables
NODE_ENV=production
PORT=3000
JWT_SECRET=<generate-with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
OPENAI_API_KEY=<your-key>
OPENAI_MODEL=gpt-4o-mini
MAX_MEMORY_PER_USER=50
```

## Vercel Frontend Deployment

```bash
# Add this in Vercel Dashboard → Environment Variables
REACT_APP_API_URL=https://your-backend-url.com
```

## Monitoring URLs

- Backend Health: `https://your-backend-url/health`
- Frontend: `https://your-frontend.vercel.app`

See `DEPLOYMENT.md` for complete step-by-step instructions.
