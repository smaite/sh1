/**
 * AI Navigation Bot for SEE English Learning Hub
 * Provides intelligent navigation assistance and site guidance
 */

class AINavigationBot {
  constructor() {
    this.isOpen = false;
    this.messageHistory = [];
    this.currentContext = null;
    this.init();
  }

  init() {
    this.createBotHTML();
    this.attachEventListeners();
    this.loadContext();
    this.showWelcomeMessage();
  }

  createBotHTML() {
    const botHTML = `
      <div class="ai-bot-container" id="aiBotContainer">
        <div class="ai-bot-chat" id="aiBotChat">
          <div class="ai-bot-header">
            <div class="ai-bot-avatar">
              <i class="fas fa-robot"></i>
            </div>
            <div class="ai-bot-info">
              <h3>EnglishBot</h3>
              <div class="ai-bot-status">
                <span class="status-dot"></span>
                <p>Online - Ready to help</p>
              </div>
            </div>
          </div>
          <div class="ai-bot-messages" id="aiBotMessages"></div>
          <div class="ai-bot-actions" id="aiBotActions">
            <button class="action-btn" data-action="grammar">
              <i class="fas fa-book"></i> Grammar
            </button>
            <button class="action-btn" data-action="writing">
              <i class="fas fa-pen"></i> Writing
            </button>
            <button class="action-btn" data-action="quiz">
              <i class="fas fa-gamepad"></i> Quiz
            </button>
            <button class="action-btn" data-action="help">
              <i class="fas fa-question-circle"></i> Help
            </button>
          </div>
          <div class="ai-bot-input">
            <input type="text" id="aiBotInput" placeholder="Ask me anything..." autocomplete="off">
            <button id="aiBotSend">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
        <button class="ai-bot-toggle" id="aiBotToggle">
          <i class="fas fa-comments"></i>
          <span class="ai-bot-notification" id="aiBotNotification">1</span>
        </button>
      </div>
    `;

    // Insert bot HTML into body
    const botDiv = document.createElement('div');
    botDiv.innerHTML = botHTML;
    document.body.appendChild(botDiv.firstElementChild);

    // Add Font Awesome if not already present
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const fontAwesome = document.createElement('link');
      fontAwesome.rel = 'stylesheet';
      fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
      document.head.appendChild(fontAwesome);
    }

    // Add AI Bot CSS if not already present
    if (!document.querySelector('link[href*="aiBot"]')) {
      const botCSS = document.createElement('link');
      botCSS.rel = 'stylesheet';
      botCSS.href = '/aiBot.css';
      document.head.appendChild(botCSS);
    }
  }

  attachEventListeners() {
    // Toggle button
    document.getElementById('aiBotToggle').addEventListener('click', () => this.toggleChat());

    // Send button
    document.getElementById('aiBotSend').addEventListener('click', () => this.sendMessage());

    // Enter key
    document.getElementById('aiBotInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    // Quick action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        this.handleQuickAction(action);
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      const container = document.getElementById('aiBotContainer');
      if (this.isOpen && !container.contains(e.target)) {
        this.toggleChat();
      }
    });
  }

  toggleChat() {
    const chat = document.getElementById('aiBotChat');
    const toggle = document.getElementById('aiBotToggle');
    const notification = document.getElementById('aiBotNotification');
    
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      chat.classList.add('active');
      toggle.classList.add('active');
      notification.style.display = 'none';
      document.getElementById('aiBotInput').focus();
    } else {
      chat.classList.remove('active');
      toggle.classList.remove('active');
    }
  }

  async sendMessage() {
    const input = document.getElementById('aiBotInput');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message
    this.addMessage(message, 'user');
    input.value = '';

    // Show typing indicator
    this.showTyping();

    // Process message and get response
    await this.processMessage(message);
  }

  async processMessage(message) {
    // Simulate processing delay
    await this.delay(1000);
    
    this.hideTyping();
    
    const response = this.generateResponse(message.toLowerCase());
    this.addMessage(response.text, 'bot', response.links);
  }

  generateResponse(message) {
    const responses = {
      // Greetings
      greeting: {
        text: "Hello! I'm EnglishBot, your AI guide for SEE English Learning Hub. How can I help you today?",
        links: [
          { text: "Grammar Section", url: "index.html#grammar", icon: "fa-book" },
          { text: "Writing Section", url: "index.html#writing", icon: "fa-pen" },
          { text: "GK Quiz", url: "gk/gkQuiz.html", icon: "fa-gamepad" }
        ]
      },

      // Grammar queries
      grammar: {
        text: "I can help you with various grammar topics. Which one would you like to explore?",
        links: [
          { text: "Articles (A, An, The)", url: "grammar/articles/articleContent.html", icon: "fa-circle" },
          { text: "Prepositions", url: "grammar/preposition/prepositionContent.html", icon: "fa-map-marker-alt" },
          { text: "Tenses", url: "grammar/tenses/tensesContent.html", icon: "fa-clock" },
          { text: "Active & Passive Voice", url: "grammar/voice/voiceContent.html", icon: "fa-exchange-alt" },
          { text: "Reported Speech", url: "grammar/reportedSpeech/reportedContent.html", icon: "fa-comments" },
          { text: "Question Tags", url: "grammar/questionTags/questionTagContent.html", icon: "fa-question" }
        ]
      },

      // Writing queries
      writing: {
        text: "We have various writing exercises organized by difficulty. Choose a category:",
        links: [
          { text: "Paragraph Writing", url: "writing/paragraph/paragraph.html", icon: "fa-paragraph" },
          { text: "Essay Writing", url: "writing/essay/essayContent.html", icon: "fa-file-alt" },
          { text: "Letter Writing", url: "writing/letters/letter.html", icon: "fa-envelope" },
          { text: "Application Writing", url: "writing/applications/jobApplication.html", icon: "fa-file-signature" },
          { text: "Dialogue Writing", url: "writing/dialogue/dialogue.html", icon: "fa-comment-dots" },
          { text: "News Writing", url: "writing/news/newsStory.html", icon: "fa-newspaper" }
        ]
      },

      // Quiz queries
      quiz: {
        text: "Test your knowledge with our interactive quizzes!",
        links: [
          { text: "GK Quiz", url: "gk/gkQuiz.html", icon: "fa-globe" },
          { text: "Grammar Quizzes", url: "grammar/multipleChoice/MCQcontent.html", icon: "fa-check-circle" },
          { text: "Article Quizzes", url: "grammar/articles/articleContent.html", icon: "fa-circle" },
          { text: "Preposition Quizzes", url: "grammar/preposition/prepositionContent.html", icon: "fa-map-marker-alt" }
        ]
      },

      // Help queries
      help: {
        text: "Here's how to use this website:",
        links: [
          { text: "Home Page", url: "index.html", icon: "fa-home" },
          { text: "Grammar Section", url: "index.html#grammar", icon: "fa-book" },
          { text: "Writing Section", url: "index.html#writing", icon: "fa-pen" },
          { text: "Contact Teacher", url: "mailto:ndhungana2076@gmail.com", icon: "fa-envelope" }
        ]
      },

      // About queries
      about: {
        text: "This website is developed by Nabaraj Dhungana, an experienced English teacher with nearly 25 years of teaching experience at Paschimanchal English School.",
        links: [
          { text: "Back to Home", url: "index.html", icon: "fa-home" },
          { text: "Send Email", url: "mailto:ndhungana2076@gmail.com", icon: "fa-envelope" }
        ]
      },

      // Default response
      default: {
        text: "I'm not sure I understand. You can ask me about:\n• Grammar topics\n• Writing exercises\n• Quizzes and games\n• General help navigating the site",
        links: [
          { text: "Browse All Topics", url: "index.html", icon: "fa-th-large" },
          { text: "Grammar Section", url: "index.html#grammar", icon: "fa-book" }
        ]
      }
    };

    // Check for keywords
    if (message.match(/\b(hello|hi|hey|namaste)\b/)) return responses.greeting;
    if (message.match(/\b(grammar|article|preposition|tense|voice|speech)\b/)) return responses.grammar;
    if (message.match(/\b(writing|essay|letter|paragraph|application|dialogue|news)\b/)) return responses.writing;
    if (message.match(/\b(quiz|game|test|exam|practice)\b/)) return responses.quiz;
    if (message.match(/\b(help|how|what|where|navigation)\b/)) return responses.help;
    if (message.match(/\b(about|teacher|nabaraj|contact)\b/)) return responses.about;
    if (message.match(/\b(thank|thanks|dhanyabad)\b/)) {
      return { text: "You're welcome! Feel free to ask if you need any more help. Good luck with your studies! 📚", links: [] };
    }
    if (message.match(/\b(bye|goodbye|see you)\b/)) {
      return { text: "Goodbye! Have a great day and keep learning! 🌟", links: [] };
    }

    return responses.default;
  }

  addMessage(text, type, links = []) {
    const container = document.getElementById('aiBotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    // Convert newlines to breaks
    text = text.replace(/\n/g, '<br>');
    messageDiv.innerHTML = text;

    // Add links if provided
    if (links && links.length > 0) {
      const linksDiv = document.createElement('div');
      linksDiv.className = 'message-links';
      
      links.forEach(link => {
        const linkBtn = document.createElement('a');
        linkBtn.className = 'message-link';
        linkBtn.href = link.url;
        linkBtn.innerHTML = `<i class="fas ${link.icon}"></i> ${link.text}`;
        linkBtn.addEventListener('click', (e) => {
          if (link.url.startsWith('http') || link.url.startsWith('mailto')) return;
          // For internal links, check if we're on the right page
          const currentPath = window.location.pathname;
          const targetPath = link.url.split('#')[0];
          if (!currentPath.includes(targetPath) && targetPath !== 'index.html') {
            return; // Let normal navigation happen
          }
          // Handle anchor navigation
          if (link.url.includes('#')) {
            e.preventDefault();
            const anchor = link.url.split('#')[1];
            const element = document.getElementById(anchor);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              this.toggleChat();
            } else {
              window.location.href = link.url;
            }
          }
        });
        linksDiv.appendChild(linkBtn);
      });
      
      messageDiv.appendChild(linksDiv);
    }

    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;

    // Save to history
    this.messageHistory.push({ text, type, links });
  }

  showTyping() {
    const container = document.getElementById('aiBotMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
  }

  hideTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }

  handleQuickAction(action) {
    const messages = {
      grammar: "I'd like to learn about grammar",
      writing: "Show me writing exercises",
      quiz: "I want to take a quiz",
      help: "I need help navigating"
    };

    this.addMessage(messages[action], 'user');
    this.showTyping();
    
    setTimeout(() => {
      this.hideTyping();
      const response = this.generateResponse(action);
      this.addMessage(response.text, 'bot', response.links);
    }, 800);
  }

  showWelcomeMessage() {
    // Check if this is first visit
    const hasVisited = localStorage.getItem('englishBotVisited');
    if (!hasVisited) {
      setTimeout(() => {
        const notification = document.getElementById('aiBotNotification');
        if (notification) notification.style.display = 'flex';
      }, 3000);
      localStorage.setItem('englishBotVisited', 'true');
    }
  }

  loadContext() {
    // Load current page context to provide contextual help
    const path = window.location.pathname;
    this.currentContext = {
      page: path,
      isHome: path.endsWith('index.html') || path === '/' || path.endsWith('/'),
      section: this.detectSection(path)
    };
  }

  detectSection(path) {
    if (path.includes('grammar')) return 'grammar';
    if (path.includes('writing')) return 'writing';
    if (path.includes('gk')) return 'quiz';
    return 'home';
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize bot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new AINavigationBot());
} else {
  new AINavigationBot();
}

// Make bot available globally
window.AINavigationBot = AINavigationBot;
