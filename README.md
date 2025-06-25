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

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resume-ai.git
   cd resume-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your configuration:
   ```
   CLAUDE_API_KEY=your-claude-api-key-here
   USER_NAME=Your Name
   ```

4. **Create your resume data**
   ```bash
   cp resume-data.json.example resume-data.json
   ```
   Edit `resume-data.json` with your personal information, experience, skills, and projects.

5. **Start the server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3001`

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
├── server.js              # Express backend server
├── index.html             # Main frontend page
├── styles.css             # Styling
├── script.js              # Frontend JavaScript
├── config.js              # Frontend configuration
├── package.json           # Node.js dependencies
├── resume-data.json       # Your resume data (create from example)
├── resume-data.json.example # Template for resume data
├── .env                   # Environment variables (create from example)
├── .env.example           # Environment template
└── README.md              # This file
```

## 🔒 Security

- API keys are stored server-side in `.env` files
- `.env` and `resume-data.json` are excluded from git
- CORS is properly configured
- No sensitive data exposed to client-side code

## 🚀 Deployment

### Local Development
```bash
npm start
```

### Production Deployment

For production, consider:

1. **Environment Variables**: Set `CLAUDE_API_KEY` in your hosting platform
2. **Process Manager**: Use PM2 or similar for process management
3. **Reverse Proxy**: Use Nginx for SSL and load balancing
4. **Monitoring**: Add logging and error tracking

Example PM2 setup:
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