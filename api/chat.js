import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_API_KEY,
});

// Load resume data
let resumeData;
try {
    const resumeDataPath = path.join(__dirname, '..', 'resume-data.json');
    resumeData = JSON.parse(readFileSync(resumeDataPath, 'utf8'));
} catch (error) {
    console.error('Error loading resume data:', error);
    resumeData = {};
}

export default async function handler(req, res) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

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
}