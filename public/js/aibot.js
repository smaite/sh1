/**
 * AI Navigation Bot - SEE English Learning Hub
 * Using official Google GenAI SDK
 * Author: Nabaraj Dhungana
 */

// Import Google GenAI SDK
import { GoogleGenAI } from "https://esm.sh/@google/genai";

class AINavigationBot {
  constructor() {
    this.isOpen = false;
    this.apiKey = 'AIzaSyCly62RzzM1dgd6ALgj6HpflaSsl2zaayU';
    this.websiteContext = this.getWebsiteContext();
    this.conversationHistory = [];
    this.debugMode = true;
    this.debugLogs = [];
    this.genAI = null;
    this.init();
  }

  getWebsiteContext() {
    return {
      name: "SEE English Learning Hub",
      author: "Nabaraj Dhungana",
      school: "Paschimanchal English School, Siddharthanagar-6, Rupandehi",
      target: "SEE (Secondary Education Examination) students in Nepal",
      
      grammarTopics: [
        { name: "Articles", path: "content/grammar/articles/index.html", desc: "A, An, The usage" },
        { name: "Prepositions", path: "content/grammar/preposition/index.html", desc: "in, on, at, by, with" },
        { name: "Tenses", path: "content/grammar/tenses/index.html", desc: "Past, Present, Future" },
        { name: "Active & Passive Voice", path: "content/grammar/voice/index.html", desc: "Voice transformation" },
        { name: "Reported Speech", path: "content/grammar/reported-speech/index.html", desc: "Direct to Indirect" },
        { name: "Question Tags", path: "content/grammar/question-tags/index.html", desc: "isn't it?, aren't they?" },
        { name: "Causative Verbs", path: "content/grammar/causatives/index.html", desc: "have, make, get, let" },
        { name: "Subject-Verb Agreement", path: "content/grammar/subject-verb/index.html", desc: "Grammar syntax" }
      ],
      
      writingTopics: [
        { name: "Essay Writing", path: "content/writing/essay/index.html", marks: "8 marks", desc: "200 words" },
        { name: "Paragraph Writing", path: "content/writing/paragraph/index.html", marks: "5 marks", desc: "100 words" },
        { name: "Chart Interpretation", path: "content/writing/chart/index.html", marks: "5 marks", desc: "Data analysis" },
        { name: "Letter Writing", path: "content/writing/letters/index.html", marks: "8 marks", desc: "Formal/Informal" },
        { name: "Application Writing", path: "content/writing/application/index.html", marks: "6 marks", desc: "Job/Leave apps" },
        { name: "Dialogue Writing", path: "content/writing/dialogue/index.html", marks: "6 marks", desc: "Conversations" },
        { name: "News Writing", path: "content/writing/news/index.html", marks: "5-8 marks", desc: "News reports" },
        { name: "Recipe Writing", path: "content/writing/recipe/index.html", marks: "5 marks", desc: "Cooking steps" },
        { name: "Notice Writing", path: "content/writing/notice/index.html", marks: "5 marks", desc: "Official notices" },
        { name: "Advertisement", path: "content/writing/advertisement/index.html", marks: "5 marks", desc: "Persuasive ads" },
        { name: "Movie/Book Reviews", path: "content/writing/review/index.html", marks: "8 marks", desc: "Critical analysis" }
      ],
      
      quizzes: [
        { name: "GK Quiz", path: "content/gk/index.html", questions: 50, desc: "General Knowledge" },
        { name: "Articles Quiz", path: "content/grammar/articles/quiz.html", questions: 20, desc: "Articles practice" }
      ]
    };
  }

  init() {
    // Initialize GenAI
    try {
      this.genAI = new GoogleGenAI({ apiKey: this.apiKey });
      this.logDebug('System', 'Google GenAI SDK initialized successfully');
    } catch (error) {
      this.logDebug('Error', 'Failed to initialize GenAI SDK', { message: error.message });
    }
    
    this.createBotHTML();
    this.attachEventListeners();
    this.showWelcomeMessage();
  }

  logDebug(type, message, data = null) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = { timestamp, type, message, data };
    this.debugLogs.push(logEntry);
    
    if (this.debugLogs.length > 50) {
      this.debugLogs.shift();
    }
    
    this.updateDebugConsole();
  }

  updateDebugConsole() {
    const debugConsole = document.getElementById('debug-console');
    if (debugConsole) {
      const logsHtml = this.debugLogs.map(log => {
        let color = '#fff';
        if (log.type === 'Error') color = '#ff6b6b';
        if (log.type === 'Success') color = '#51cf66';
        if (log.type === 'API') color = '#74c0fc';
        if (log.type === 'Warning') color = '#ffd43b';
        
        const dataStr = log.data ? `<pre style="margin: 5px 0; padding: 5px; background: rgba(0,0,0,0.3); border-radius: 3px; font-size: 0.7rem; overflow-x: auto;">${JSON.stringify(log.data, null, 2)}</pre>` : '';
        
        return `<div style="margin-bottom: 8px; border-left: 3px solid ${color}; padding-left: 8px;">
          <span style="color: #868e96; font-size: 0.75rem;">[${log.timestamp}]</span>
          <span style="color: ${color}; font-weight: bold; font-size: 0.8rem;">${log.type}:</span>
          <span style="font-size: 0.85rem;">${log.message}</span>
          ${dataStr}
        </div>`;
      }).join('');
      
      debugConsole.innerHTML = logsHtml;
      debugConsole.scrollTop = debugConsole.scrollHeight;
    }
  }

  createBotHTML() {
    const botHTML = `
      <div class="ai-bot-container" id="aiBotContainer">
        <div class="ai-bot-chat" id="aiBotChat">
          <div class="ai-bot-header">
            <div class="ai-bot-avatar">
              <i class="fas fa-robot"></i>
            </div>
            <div style="flex: 1;">
              <h3 style="color: white; margin: 0; font-size: 1rem;">EnglishBot AI</h3>
              <p style="color: rgba(255,255,255,0.8); margin: 2px 0 0 0; font-size: 0.75rem;">Your SEE English Tutor</p>
            </div>
            <button id="debug-toggle-btn" style="background: rgba(255,255,255,0.2); border: none; color: white; cursor: pointer; padding: 5px 10px; border-radius: 5px; font-size: 0.75rem;" onclick="window.aiBot.toggleDebug()">
              <i class="fas fa-bug"></i> Debug
            </button>
          </div>

          <!-- Debug Panel -->
          <div id="debug-panel" style="display: none; background: #1a1a2e; border-bottom: 1px solid rgba(255,255,255,0.1); max-height: 200px;">
            <div style="padding: 10px; background: rgba(0,0,0,0.3); display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.85rem; color: var(--accent-color);"><i class="fas fa-terminal"></i> Debug Console</span>
              <div>
                <button onclick="window.aiBot.testConnection()" style="background: var(--primary-gradient); border: none; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 0.75rem; margin-right: 5px;">
                  <i class="fas fa-plug"></i> Test API
                </button>
                <button onclick="window.aiBot.clearDebug()" style="background: rgba(255,255,255,0.1); border: none; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 0.75rem;">
                  <i class="fas fa-trash"></i> Clear
                </button>
              </div>
            </div>
            <div id="debug-console" style="padding: 10px; max-height: 150px; overflow-y: auto; font-family: monospace; font-size: 0.8rem; color: #fff;">
              <div style="color: #868e96;">Debug console ready...</div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="quick-actions">
            <button onclick="window.aiBot.quickAction('grammar')" class="quick-btn">
              <i class="fas fa-book"></i> Grammar
            </button>
            <button onclick="window.aiBot.quickAction('writing')" class="quick-btn">
              <i class="fas fa-pen"></i> Writing
            </button>
            <button onclick="window.aiBot.quickAction('quiz')" class="quick-btn">
              <i class="fas fa-question-circle"></i> Quiz
            </button>
            <button onclick="window.aiBot.quickAction('practice')" class="quick-btn">
              <i class="fas fa-dumbbell"></i> Practice
            </button>
          </div>
          
          <div class="ai-bot-messages" id="aiBotMessages"></div>
          
          <div class="ai-bot-input">
            <input type="text" id="aiBotInput" placeholder="Ask me anything about English...">
            <button id="aiBotSend">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
        
        <button class="ai-bot-toggle" id="aiBotToggle">
          <i class="fas fa-robot"></i>
        </button>
      </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = botHTML;
    document.body.appendChild(div.firstElementChild);
  }

  toggleDebug() {
    const debugPanel = document.getElementById('debug-panel');
    const isVisible = debugPanel.style.display !== 'none';
    debugPanel.style.display = isVisible ? 'none' : 'block';
    this.logDebug('System', `Debug panel ${isVisible ? 'hidden' : 'shown'}`);
  }

  clearDebug() {
    this.debugLogs = [];
    this.updateDebugConsole();
    this.logDebug('System', 'Debug console cleared');
  }

  async testConnection() {
    this.logDebug('API', 'Testing Gemini API with GenAI SDK...');
    this.showLoading();
    
    try {
      if (!this.genAI) {
        throw new Error('GenAI SDK not initialized');
      }
      
      const startTime = Date.now();
      
      const response = await this.genAI.models.generateContent({
        model: "gemini-pro",
        contents: "Say 'API Connection Successful using Google GenAI SDK' if you receive this.",
      });
      
      const duration = Date.now() - startTime;
      this.hideLoading();
      
      this.logDebug('Success', `API Test Successful in ${duration}ms`, { response: response.text });
      
      this.addMessage(`✅ <strong>API Connection Successful!</strong><br><br>
        <strong>Method:</strong> Google GenAI SDK<br>
        <strong>Response Time:</strong> ${duration}ms<br>
        <strong>AI Response:</strong> "${response.text}"<br><br>
        The API is working correctly with the official SDK!`, 'bot');
        
    } catch (error) {
      this.hideLoading();
      this.logDebug('Error', 'API Test Failed', { message: error.message, stack: error.stack });
      
      this.addMessage(`❌ <strong>Connection Error</strong><br><br>
        <strong>Error:</strong> ${error.message}<br><br>
        <strong>This might be caused by:</strong><br>
        • Browser extensions blocking the SDK<br>
        • Network connectivity issues<br>
        • Invalid API key<br><br>
        <strong>Solutions:</strong><br>
        1. Try Incognito/Private mode (disables extensions)<br>
        2. Check your internet connection<br>
        3. Disable ad blockers temporarily<br>
        4. Use a different browser<br><br>
        <em>Check the debug console for technical details.</em>`, 'bot');
    }
  }

  attachEventListeners() {
    document.getElementById('aiBotToggle').addEventListener('click', () => this.toggleChat());
    document.getElementById('aiBotSend').addEventListener('click', () => this.sendMessage());
    document.getElementById('aiBotInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    window.aiBot = this;
  }

  toggleChat() {
    const chat = document.getElementById('aiBotChat');
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      chat.classList.add('active');
      document.getElementById('aiBotInput').focus();
    } else {
      chat.classList.remove('active');
    }
  }

  async quickAction(action) {
    switch(action) {
      case 'grammar':
        this.addMessage('Show me grammar topics', 'user');
        this.showGrammarMenu();
        break;
      case 'writing':
        this.addMessage('Show me writing topics', 'user');
        this.showWritingMenu();
        break;
      case 'quiz':
        this.addMessage('I want to take a quiz', 'user');
        this.showQuizMenu();
        break;
      case 'practice':
        this.addMessage('Give me practice questions', 'user');
        await this.generatePracticeQuestion();
        break;
    }
  }

  showGrammarMenu() {
    let html = `<strong>📚 Grammar Topics:</strong><br><div style="margin-top: 10px;">`;
    this.websiteContext.grammarTopics.forEach(topic => {
      html += `<a href="${topic.path}" class="nav-link-btn" onclick="window.aiBot.trackNavigation('${topic.name}')">${topic.name}</a>`;
    });
    html += `</div><p style="margin-top: 15px; font-size: 0.9rem; color: var(--text-secondary);">
      Click any topic to start learning. Each lesson includes explanations and practice exercises.
    </p>`;
    this.addMessage(html, 'bot');
  }

  showWritingMenu() {
    let html = `<strong>✍️ Writing Skills (SEE Format):</strong><br><div style="margin-top: 10px;">`;
    this.websiteContext.writingTopics.forEach(topic => {
      html += `<a href="${topic.path}" class="nav-link-btn" onclick="window.aiBot.trackNavigation('${topic.name}')">${topic.name} (${topic.marks})</a>`;
    });
    html += `</div><p style="margin-top: 15px; font-size: 0.9rem; color: var(--text-secondary);">
      Each writing format includes templates, examples, and tips for SEE exam.
    </p>`;
    this.addMessage(html, 'bot');
  }

  showQuizMenu() {
    let html = `<strong>🎯 Practice Quizzes:</strong><br><div style="margin-top: 10px;">`;
    this.websiteContext.quizzes.forEach(quiz => {
      html += `<a href="${quiz.path}" class="nav-link-btn" style="font-size: 1rem; padding: 10px 20px;" onclick="window.aiBot.trackNavigation('${quiz.name}')">
        <i class="fas fa-play-circle"></i> ${quiz.name} (${quiz.questions} questions)
      </a>`;
    });
    html += `</div><p style="margin-top: 15px; font-size: 0.9rem; color: var(--text-secondary);">
      Test your knowledge! Each quiz has explanations to help you learn.
    </p>`;
    this.addMessage(html, 'bot');
  }

  async sendMessage() {
    const input = document.getElementById('aiBotInput');
    const message = input.value.trim();
    
    if (!message) return;

    this.addMessage(message, 'user');
    input.value = '';

    this.logDebug('User', `Message sent: "${message}"`);

    // Check for navigation commands first
    const navResult = this.handleNavigationCommand(message);
    if (navResult) {
      this.addMessage(navResult, 'bot');
      return;
    }

    // Show loading
    this.showLoading();

    // Call Gemini API using GenAI SDK
    try {
      if (!this.genAI) {
        throw new Error('AI SDK not initialized. Please refresh the page.');
      }
      
      this.logDebug('API', 'Calling Gemini API via GenAI SDK...', { message: message.substring(0, 100) });
      const startTime = Date.now();
      
      const response = await this.callGeminiAPI(message);
      
      const duration = Date.now() - startTime;
      this.logDebug('API', `Response received in ${duration}ms`);
      this.logDebug('Success', 'AI response generated', { response: response.substring(0, 200) + '...' });
      
      this.hideLoading();
      this.addMessage(response, 'bot');
    } catch (error) {
      this.hideLoading();
      this.logDebug('Error', 'API Call Failed', { message: error.message, stack: error.stack });
      
      this.addMessage(`⚠️ <strong>Connection Error</strong><br><br>
        <strong>Error:</strong> ${error.message}<br><br>
        <strong>This is likely caused by browser extensions.</strong><br><br>
        <strong>Quick Fix - Try Incognito Mode:</strong><br>
        Press <kbd>Ctrl+Shift+N</kbd> (Chrome) or <kbd>Ctrl+Shift+P</kbd> (Firefox)<br><br>
        <strong>Or disable these temporarily:</strong><br>
        • Ad blockers (uBlock, AdBlock Plus)<br>
        • Privacy extensions (Privacy Badger)<br>
        • HTTPS Everywhere<br><br>
        <em>The extensions are blocking the AI SDK from connecting to Google.</em>`, 'bot');
    }
  }

  async callGeminiAPI(userMessage) {
    const systemPrompt = `You are an expert English teacher specifically for SEE (Secondary Education Examination) students in Nepal. 

WEBSITE INFORMATION:
- Site: SEE English Learning Hub
- Teacher: Nabaraj Dhungana (25 years experience)
- School: Paschimanchal English School, Siddharthanagar-6, Rupandehi
- Target: SEE exam preparation

AVAILABLE CONTENT:
Grammar Topics: Articles, Prepositions, Tenses, Active/Passive Voice, Reported Speech, Question Tags, Causative Verbs, Subject-Verb Agreement

Writing Formats: Essay (8 marks), Paragraph (5 marks), Chart (5 marks), Letters (8 marks), Applications (6 marks), Dialogue (6 marks), News (5-8 marks), Recipe (5 marks), Notice (5 marks), Advertisement (5 marks), Reviews (8 marks)

Quizzes: GK Quiz (50 questions), Articles Quiz (20 questions)

YOUR ROLE:
1. Teach English concepts clearly with examples
2. Help with SEE exam preparation
3. Navigate students to appropriate lessons
4. Generate practice questions
5. Check answers and explain mistakes
6. Provide writing templates and tips

RESPONSE STYLE:
- Friendly and encouraging
- Use Nepali context when helpful
- Give specific examples
- Keep responses concise but informative
- Use emojis to make it engaging
- Always provide fresh, unique content
- Never use preset templates

User question: ${userMessage}`;

    const response = await this.genAI.models.generateContent({
      model: "gemini-pro",
      contents: systemPrompt,
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 800,
        topP: 0.9,
        topK: 40
      }
    });

    if (response && response.text) {
      return response.text;
    }
    
    throw new Error('Invalid API response structure');
  }

  handleNavigationCommand(message) {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('grammar') || lowerMsg.includes('article') || lowerMsg.includes('preposition') || 
        lowerMsg.includes('tense') || lowerMsg.includes('voice') || lowerMsg.includes('speech') ||
        lowerMsg.includes('question tag') || lowerMsg.includes('causative')) {
      this.showGrammarMenu();
      return true;
    }
    
    if (lowerMsg.includes('writing') || lowerMsg.includes('essay') || lowerMsg.includes('letter') || 
        lowerMsg.includes('application') || lowerMsg.includes('dialogue') || lowerMsg.includes('paragraph') ||
        lowerMsg.includes('notice') || lowerMsg.includes('recipe') || lowerMsg.includes('chart')) {
      this.showWritingMenu();
      return true;
    }
    
    if (lowerMsg.includes('quiz') || lowerMsg.includes('test') || lowerMsg.includes('practice') || 
        lowerMsg.includes('gk') || lowerMsg.includes('exam')) {
      this.showQuizMenu();
      return true;
    }
    
    if (lowerMsg.includes('home') || lowerMsg.includes('main') || lowerMsg.includes('start')) {
      return `🏠 <a href="index.html" class="nav-link-btn" style="font-size: 1rem;"><i class="fas fa-home"></i> Go to Homepage</a>`;
    }
    
    return false;
  }

  async generatePracticeQuestion() {
    this.showLoading();
    this.logDebug('API', 'Generating practice question with GenAI SDK...');
    
    try {
      if (!this.genAI) {
        throw new Error('AI SDK not initialized');
      }
      
      const prompt = `Generate a unique multiple choice English grammar question suitable for SEE exam level in Nepal. 
      Include 4 options (A, B, C, D), indicate the correct answer letter, and provide a detailed explanation.
      Focus on: articles, prepositions, tenses, voice, or reported speech.
      Format: Question|OptionA|OptionB|OptionC|OptionD|CorrectLetter|Explanation`;

      const response = await this.genAI.models.generateContent({
        model: "gemini-pro",
        contents: prompt,
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 500
        }
      });

      this.hideLoading();
      
      const text = response.text;
      this.logDebug('Success', 'Practice question generated');
      
      // Parse the response
      const parts = text.split('|').map(p => p.trim());
      if (parts.length >= 7) {
        this.showPracticeQuestion(parts[0], parts.slice(1, 5), parts[5], parts[6]);
      } else {
        this.logDebug('Warning', 'Invalid question format', { text });
        this.addMessage("I got a response but couldn't parse it properly. Let me try again...", 'bot');
        setTimeout(() => this.generatePracticeQuestion(), 1000);
      }
    } catch (error) {
      this.hideLoading();
      this.logDebug('Error', 'Failed to generate question', { message: error.message });
      this.addMessage("⚠️ I couldn't generate a question. This is likely due to browser extensions blocking the AI. Try Incognito mode (Ctrl+Shift+N).", 'bot');
    }
  }

  showPracticeQuestion(question, options, correctLetter, explanation) {
    const correctIndex = correctLetter.charCodeAt(0) - 65;
    
    let optionsHtml = options.map((opt, idx) => 
      `<button onclick="window.aiBot.checkPracticeAnswer(${idx}, ${correctIndex}, '${explanation.replace(/'/g, "\\'")}')" 
        class="quiz-btn" style="margin: 5px 0; text-align: left;">
        <strong>${String.fromCharCode(65 + idx)}.</strong> ${opt}
      </button>`
    ).join('');
    
    this.addMessage(`<strong>📝 Practice Question:</strong><br><br>${question}<br><div id="practice-options">${optionsHtml}</div><div id="practice-explanation"></div>`, 'bot');
  }

  checkPracticeAnswer(selected, correct, explanation) {
    const buttons = document.querySelectorAll('#practice-options .quiz-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correct) {
        btn.style.background = '#27ae60';
        btn.style.borderColor = '#27ae60';
      } else if (idx === selected && idx !== correct) {
        btn.style.background = '#e74c3c';
        btn.style.borderColor = '#e74c3c';
      }
    });
    
    const isCorrect = selected === correct;
    const explanationDiv = document.getElementById('practice-explanation');
    explanationDiv.innerHTML = `
      <div style="margin-top: 15px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px; border-left: 4px solid ${isCorrect ? '#27ae60' : '#e74c3c'};">
        <strong>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</strong><br>
        <strong>Explanation:</strong> ${explanation}
      </div>
      <button onclick="window.aiBot.generatePracticeQuestion()" class="btn-primary" style="margin-top: 15px; font-size: 0.9rem; padding: 10px 20px;">
        <i class="fas fa-arrow-right"></i> Next Question
      </button>
    `;
  }

  trackNavigation(pageName) {
    setTimeout(() => {
      this.toggleChat();
    }, 300);
  }

  showLoading() {
    const container = document.getElementById('aiBotMessages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot loading-dots';
    loadingDiv.id = 'loading-indicator';
    loadingDiv.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(loadingDiv);
    container.scrollTop = container.scrollHeight;
  }

  hideLoading() {
    const loading = document.getElementById('loading-indicator');
    if (loading) loading.remove();
  }

  addMessage(text, type) {
    const container = document.getElementById('aiBotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = text;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
  }

  showWelcomeMessage() {
    setTimeout(() => {
      this.addMessage(`👋 <strong>Welcome to SEE English Learning Hub!</strong><br><br>
        I'm your AI tutor, powered by Google's advanced AI to help you excel in your SEE English exam.<br><br>
        <strong>What I can do:</strong><br>
        📚 <strong>Teach</strong> - Explain grammar & writing concepts<br>
        ✍️ <strong>Guide</strong> - Show you writing formats & templates<br>
        🎯 <strong>Practice</strong> - Generate unlimited mock questions<br>
        🧭 <strong>Navigate</strong> - Find lessons instantly<br><br>
        <em>Created by Nabaraj Dhungana<br>
        Paschimanchal English School</em><br><br>
        Try the buttons below or type your question!<br><br>
        <span style="font-size: 0.8rem; color: var(--text-secondary);">
          <i class="fas fa-info-circle"></i> If AI doesn't respond, try <kbd>Ctrl+Shift+N</kbd> (Incognito mode)
        </span>`, 'bot');
    }, 1000);
  }
}

// Initialize bot when page loads
document.addEventListener('DOMContentLoaded', () => {
  new AINavigationBot();
});
