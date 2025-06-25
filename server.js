import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Load resume data
let resumeData;
try {
    const resumeDataPath = path.join(__dirname, 'resume-data.json');
    resumeData = JSON.parse(readFileSync(resumeDataPath, 'utf8'));
} catch (error) {
    console.error('Error loading resume data:', error);
    resumeData = {};
}

// Serve static files
app.use(express.static(__dirname));

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const prompt = `You are an AI assistant that knows about the person based on their resume. Answer questions about their background, experience, and skills in third person, referring to them by their name from the resume data.

Resume Data:
${JSON.stringify(resumeData, null, 2)}

User Question: ${message}

CRITICAL INSTRUCTIONS:
- Answer in third person using the person's name from the resume data
- FORMAT: Start with a brief intro sentence, then provide bullet points
- Keep total response to 100-150 words maximum
- Structure as: "[Name] has [brief intro]:" followed by bullet points
- Use bullet points (•) for key details
- End with complete sentences - never cut off mid-sentence
- Include specific companies, technologies, and time periods when relevant
- Be conversational but professional

Answer format:
[Name] has [intro statement]:
• [bullet point 1]
• [bullet point 2]
• [bullet point 3]

Answer (100-150 words max):`;

        const response = await anthropic.messages.create({
            model: 'claude-3-haiku-20240307',
            max_tokens: 200,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        });

        const aiResponse = response.content[0].text;
        res.json({ response: aiResponse });

    } catch (error) {
        console.error('Error calling Claude API:', error);
        res.status(500).json({ 
            error: 'Failed to get response from AI service',
            details: error.message 
        });
    }
});

// Get user configuration
app.get('/api/config', (req, res) => {
    res.json({ 
        userName: process.env.USER_NAME || 'Your Name'
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api/chat`);
});