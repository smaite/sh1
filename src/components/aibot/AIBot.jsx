import { useState, useRef, useEffect } from 'react'
import { useAIBot } from '../../context/AIBotContext'
import { MessageCircle, X, Send, Bug, Trash2, Zap, Book, Pen, Brain, Dumbbell } from 'lucide-react'
import './AIBot.css'

const AIBot = () => {
    const {
        isOpen,
        messages,
        isLoading,
        debugLogs,
        showDebug,
        toggleBot,
        toggleDebug,
        clearDebug,
        testConnection,
        sendMessage
    } = useAIBot()

    const [inputValue, setInputValue] = useState('')
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isLoading])

    const handleSend = () => {
        if (inputValue.trim()) {
            sendMessage(inputValue)
            setInputValue('')
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const quickActions = [
        { label: 'Grammar', icon: Book, message: 'Show me grammar topics' },
        { label: 'Writing', icon: Pen, message: 'Show me writing topics' },
        { label: 'Quiz', icon: Brain, message: 'I want to take a quiz' },
        { label: 'Practice', icon: Dumbbell, message: 'Give me practice questions' }
    ]

    return (
        <>
            {/* Toggle Button */}
            <button
                className={`ai-bot-toggle ${isOpen ? 'active' : ''}`}
                onClick={toggleBot}
                aria-label="Toggle AI Bot"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="ai-bot-container">
                    {/* Header */}
                    <div className="ai-bot-header">
                        <div className="ai-bot-avatar">
                            <MessageCircle size={24} />
                        </div>
                        <div className="ai-bot-info">
                            <h3>EnglishBot AI</h3>
                            <p>Your SEE English Tutor</p>
                        </div>
                        <button
                            className="debug-toggle-btn"
                            onClick={toggleDebug}
                            title="Toggle Debug Console"
                        >
                            <Bug size={16} />
                        </button>
                    </div>

                    {/* Debug Panel */}
                    {showDebug && (
                        <div className="debug-panel">
                            <div className="debug-header">
                                <span className="debug-title">Debug Console</span>
                                <div className="debug-actions">
                                    <button onClick={testConnection} className="debug-btn">
                                        <Zap size={14} />
                                        Test API
                                    </button>
                                    <button onClick={clearDebug} className="debug-btn">
                                        <Trash2 size={14} />
                                        Clear
                                    </button>
                                </div>
                            </div>
                            <div className="debug-console">
                                {debugLogs.map((log, index) => (
                                    <div key={index} className={`debug-log debug-${log.type.toLowerCase()}`}>
                                        <span className="debug-time">[{log.timestamp}]</span>
                                        <span className="debug-type">{log.type}:</span>
                                        <span className="debug-message">{log.message}</span>
                                        {log.data && (
                                            <pre className="debug-data">{JSON.stringify(log.data, null, 2)}</pre>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick Actions */}
                    <div className="quick-actions">
                        {quickActions.map(({ label, icon: Icon, message }) => (
                            <button
                                key={label}
                                className="quick-btn"
                                onClick={() => sendMessage(message)}
                            >
                                <Icon size={16} />
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Messages */}
                    <div className="ai-bot-messages">
                        {messages.length === 0 && (
                            <div className="welcome-message">
                                <h4>👋 Welcome to SEE English Learning Hub!</h4>
                                <p>I'm your AI tutor powered by Google Gemini.</p>
                                <p><strong>I can help you with:</strong></p>
                                <ul>
                                    <li>📚 Grammar lessons</li>
                                    <li>✍️ Writing skills</li>
                                    <li>🎯 Practice questions</li>
                                    <li>🧭 Navigation</li>
                                </ul>
                                <p className="welcome-tip">
                                    Try the buttons above or type your question!
                                </p>
                            </div>
                        )}

                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.type}`}>
                                <div
                                    className="message-content"
                                    dangerouslySetInnerHTML={{ __html: msg.text }}
                                />
                            </div>
                        ))}

                        {isLoading && (
                            <div className="message bot">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="ai-bot-input">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything about English..."
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !inputValue.trim()}
                            className="send-btn"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AIBot
