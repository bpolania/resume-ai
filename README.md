# AI Resume Chat 🤖

An intelligent resume chatbot powered by Claude AI that answers questions about your professional background in real-time. Features a clean, modern interface with quick query buttons and structured responses.

## ✨ Features

- **AI-Powered Responses**: Uses Anthropic's Claude API for intelligent, contextual answers
- **Quick Query Buttons**: Pre-built buttons for common questions about crypto, payments, auto industry, and AI/ML
- **Structured Responses**: Answers formatted with intro + bullet points for easy reading
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Secure Backend**: API keys safely stored server-side, not exposed to clients
- **Real-time Chat**: Interactive chat interface with typing indicators

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Claude API key from [Anthropic](https://console.anthropic.com/)

### Option A: Deploy to Vercel (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resume-ai.git
   cd resume-ai
   ```

2. **Update your resume data**
   ```bash
   # Edit with your actual resume information
   nano resume-data.json
   ```

3. **Install Vercel CLI and deploy**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

4. **Set environment variables** in Vercel dashboard:
   - `CLAUDE_API_KEY`: Your Anthropic Claude API key
   - `USER_NAME`: Your name

5. **Done!** Your app is live at the provided Vercel URL.

### Option B: Local Development

1. **Clone and setup**
   ```bash
   git clone https://github.com/yourusername/resume-ai.git
   cd resume-ai
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your configuration:
   ```
   CLAUDE_API_KEY=your-claude-api-key-here
   USER_NAME=Your Name
   ```

3. **Create your resume data**
   ```bash
   cp resume-data.json.example resume-data.json
   ```
   Edit `resume-data.json` with your personal information.

4. **Choose development method:**
   ```bash
   # Option 1: Vercel dev (simulates production)
   npm run dev
   # Access at http://localhost:3000
   
   # Option 2: Express server (legacy)
   npm start
   # Access at http://localhost:3001
   ```

## 📋 Configuration

### Resume Data Structure

The `resume-data.json` file should contain:

```json
{
  "personalInfo": {
    "name": "Your Name",
    "phone": "(xxx) xxx-xxxx", 
    "email": "your.email@example.com",
    "linkedin": "https://www.linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
    "twitter": "@yourhandle"
  },
  "experience": [
    {
      "company": "Company Name",
      "location": "City, State",
      "title": "Your Title",
      "duration": "Start Date – End Date",
      "responsibilities": [
        "Key responsibility or achievement",
        "Another key point"
      ]
    }
  ],
  "education": [...],
  "skills": [...],
  "projects": [...]
}
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `CLAUDE_API_KEY` | Your Anthropic Claude API key | Yes |
| `USER_NAME` | Your name to display throughout the app | Yes |
| `PORT` | Server port (default: 3001) | No |

## 🛠️ Customization

### Quick Query Buttons

Edit the buttons in `index.html`:

```html
<button class="query-button" data-query="Your custom query">Button Label</button>
```

### AI Response Format

Modify the prompt in `server.js` to change how the AI responds:

```javascript
const prompt = `You are an AI assistant...
CRITICAL INSTRUCTIONS:
- Answer in third person about [Name]
- Keep responses to 100-150 words maximum
- Structure as: "[Name] has [intro]:" followed by bullet points
...`;
```

### Styling

All styles are in `styles.css`. Key classes:
- `.query-button` - Quick query buttons
- `.message-content` - Chat message styling
- `.container` - Main layout container

## 🏗️ Project Structure

```
resume-ai/
├── api/                   # Vercel serverless functions
│   ├── chat.js           # Claude API endpoint
│   ├── config.js         # User configuration
│   └── health.js         # Health check
├── public/               # Static files (served by Vercel)
│   ├── index.html        # Main frontend page
│   ├── styles.css        # Styling
│   ├── script.js         # Frontend JavaScript
│   └── config.js         # Frontend configuration
├── server.js             # Express server (for local dev)
├── package.json          # Node.js dependencies
├── vercel.json           # Vercel configuration
├── resume-data.json      # Your resume data
├── resume-data.json.example # Template for resume data
├── .env                  # Environment variables (local dev)
├── .env.example          # Environment template
├── README.md             # This file
└── README-VERCEL.md      # Detailed Vercel deployment guide
```

## 🔒 Security

- API keys are stored server-side in `.env` files
- `.env` and `resume-data.json` are excluded from git
- CORS is properly configured
- No sensitive data exposed to client-side code

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Quick deploy
vercel --prod

# With environment variables
vercel env add CLAUDE_API_KEY
vercel env add USER_NAME
```

### Local Development
```bash
# Vercel dev environment (recommended)
npm run dev

# Express server (legacy)
npm start
```

### Other Platforms

For other hosting platforms:

1. **Environment Variables**: Set `CLAUDE_API_KEY` and `USER_NAME`
2. **Static Files**: Serve `/public/` directory
3. **API Routes**: Deploy `/api/` functions or use Express server
4. **Resume Data**: Ensure `resume-data.json` is accessible

### Traditional Server Deployment

If not using serverless:
```bash
npm install -g pm2
pm2 start server.js --name "resume-ai"
pm2 startup
pm2 save
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Anthropic](https://www.anthropic.com/) for the Claude AI API
- Built with vanilla JavaScript, Express.js, and modern CSS

## 🐛 Support

If you encounter any issues:

1. Check that your Claude API key is valid
2. Ensure `resume-data.json` is properly formatted
3. Check the server logs for error messages
4. Open an issue on GitHub with details about the problem

---

**Made with ❤️ by Boris Polania**