# Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### 1. **Install Vercel CLI**
```bash
npm install -g vercel
```

### 2. **Login to Vercel**
```bash
vercel login
```

### 3. **Set Up Your Resume Data**
Before deploying, update your resume information:
```bash
# Edit with your actual resume data
nano resume-data.json
```

### 4. **Deploy to Vercel**
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 5. **Set Environment Variables**
In your Vercel dashboard or via CLI:
```bash
vercel env add CLAUDE_API_KEY
vercel env add USER_NAME
```

Or set in Vercel dashboard:
- `CLAUDE_API_KEY`: Your Anthropic Claude API key
- `USER_NAME`: Your name (e.g., "Boris")

## 📁 New Project Structure

```
├── api/                    # Vercel serverless functions
│   ├── chat.js            # Claude API endpoint
│   ├── config.js          # User config endpoint
│   └── health.js          # Health check
├── public/                # Static files served by Vercel
│   ├── index.html         # Main page
│   ├── styles.css         # Styling
│   ├── script.js          # Frontend logic
│   └── config.js          # Frontend config
├── resume-data.json       # Your resume data (now included)
├── vercel.json           # Vercel configuration
└── package.json          # Updated dependencies
```

## 🔧 Key Changes for Vercel

### 1. **Serverless Functions**
- Converted Express routes to Vercel functions
- Added CORS headers to each function
- Functions auto-scale and have 30s timeout

### 2. **Static File Serving**
- Moved all frontend files to `/public/`
- Vercel serves these automatically
- No Express server needed

### 3. **Resume Data**
- Now included in deployment (not gitignored)
- Update `resume-data.json` with your real data before deploying
- Served as static file from root

### 4. **Environment Variables**
- Set via Vercel dashboard or CLI
- No `.env` file in production
- `USER_NAME` and `CLAUDE_API_KEY` required

## 🛠️ Development

### Local Development with Vercel
```bash
# Install dependencies including Vercel CLI
npm install

# Start Vercel dev server (simulates production)
npm run dev

# Access at http://localhost:3000
```

### Local Development with Express (Legacy)
```bash
# Keep the old server.js for local dev if preferred
npm start
```

## 📝 Deployment Checklist

Before deploying:

- [ ] Update `resume-data.json` with your actual resume
- [ ] Set `CLAUDE_API_KEY` in Vercel environment variables
- [ ] Set `USER_NAME` in Vercel environment variables
- [ ] Test locally with `vercel dev`
- [ ] Deploy with `vercel --prod`

## 🔗 Environment Variables in Vercel

Set these in your Vercel dashboard under Settings > Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `CLAUDE_API_KEY` | `sk-ant-api03-...` | Production, Preview, Development |
| `USER_NAME` | `Your Name` | Production, Preview, Development |

## 🐛 Troubleshooting

### Common Issues:

1. **"resume-data.json not found"**
   - Ensure file exists in project root
   - Check it's not gitignored for deployment

2. **CORS errors**
   - CORS headers are included in all API functions
   - Should work across all domains

3. **API timeout**
   - Functions have 30s timeout (configurable)
   - Claude API calls should complete quickly

4. **Environment variables not working**
   - Redeploy after setting env vars
   - Check variable names match exactly

### Logs and Debugging:
```bash
# View function logs
vercel logs [deployment-url]

# Check function details
vercel inspect [deployment-url]
```

## 🔄 Updates and Redeployment

To update your deployed app:
```bash
# Make changes to code or resume-data.json
# Then redeploy
vercel --prod
```

Vercel automatically redeploys on git pushes if connected to a repository.