class ResumeChat {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.userName = 'Your Name'; // Default fallback
        
        this.initializeApp();
    }
    
    async initializeApp() {
        await this.loadConfig();
        this.updateUIWithName();
        this.initializeEventListeners();
        this.loadResumeData();
    }
    
    async loadConfig() {
        try {
            const response = await fetch('/api/config');
            const config = await response.json();
            this.userName = config.userName;
        } catch (error) {
            console.error('Error loading config:', error);
            this.userName = 'Your Name';
        }
    }
    
    updateUIWithName() {
        // Update page title
        const title = document.querySelector('header h1');
        if (title) {
            title.textContent = `${this.userName} Resume`;
        }
        
        // Update query buttons
        document.querySelectorAll('.query-button').forEach(button => {
            const query = button.getAttribute('data-query');
            const updatedQuery = query.replace(/Tell me about experience/g, `Tell me about ${this.userName}'s experience`);
            button.setAttribute('data-query', updatedQuery);
        });
        
        // Update initial bot message
        const initialMessage = document.querySelector('.bot-message .message-content');
        if (initialMessage) {
            initialMessage.textContent = `Hi! I'm an AI assistant trained on ${this.userName}'s resume. Ask me anything about their experience, skills, education, or projects!`;
        }
    }
    
    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Add quick query button listeners
        document.querySelectorAll('.query-button').forEach(button => {
            button.addEventListener('click', () => {
                const query = button.getAttribute('data-query');
                this.userInput.value = query;
                this.sendMessage();
            });
        });
    }
    
    async loadResumeData() {
        try {
            const response = await fetch('/resume-data.json');
            this.resumeData = await response.json();
        } catch (error) {
            console.error('Error loading resume data:', error);
            this.resumeData = {
                personalInfo: { name: this.userName },
                experience: [],
                skills: [],
                education: [],
                projects: []
            };
        }
    }
    
    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.userInput.value = '';
        this.sendButton.disabled = true;
        
        this.showTypingIndicator();
        
        try {
            const response = await this.generateResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Sorry, I\'m having trouble connecting to the AI service. Please check your API key configuration and try again.', 'bot');
        } finally {
            this.sendButton.disabled = false;
        }
    }
    
    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = content.replace(/\n/g, '<br>');
        
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingMessage = this.chatMessages.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }
    
    async generateResponse(question) {
        try {
            const response = await this.callClaudeAPI(question);
            return response;
        } catch (error) {
            console.error('Error calling Claude API:', error);
            throw new Error('Failed to get response from Claude API');
        }
    }
    
    async callClaudeAPI(question) {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: question
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    new ResumeChat();
});