import { createContext, useContext, useState, useCallback } from 'react'
import { GoogleGenAI } from '@google/genai'

const AIBotContext = createContext()

export const useAIBot = () => {
    const context = useContext(AIBotContext)
    if (!context) {
        throw new Error('useAIBot must be used within AIBotProvider')
    }
    return context
}

export const AIBotProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [debugLogs, setDebugLogs] = useState([])
    const [showDebug, setShowDebug] = useState(false)

    const API_KEY = 'AIzaSyCly62RzzM1dgd6ALgj6HpflaSsl2zaayU'
    const genAI = new GoogleGenAI({ apiKey: API_KEY })

    const logDebug = useCallback((type, message, data = null) => {
        const timestamp = new Date().toLocaleTimeString()
        setDebugLogs(prev => {
            const newLogs = [...prev, { timestamp, type, message, data }]
            return newLogs.slice(-50) // Keep last 50 logs
        })
    }, [])

    const addMessage = useCallback((text, type, links = []) => {
        setMessages(prev => [...prev, { text, type, links, id: Date.now() }])
    }, [])

    const toggleBot = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    const toggleDebug = useCallback(() => {
        setShowDebug(prev => !prev)
        logDebug('System', `Debug panel ${!showDebug ? 'shown' : 'hidden'}`)
    }, [showDebug, logDebug])

    const clearDebug = useCallback(() => {
        setDebugLogs([])
        logDebug('System', 'Debug console cleared')
    }, [logDebug])

    const testConnection = useCallback(async () => {
        logDebug('API', 'Testing Gemini API...')
        setIsLoading(true)

        try {
            const startTime = Date.now()
            const response = await genAI.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: "Say 'API Connection Successful using Google GenAI SDK' if you receive this.",
            })

            const duration = Date.now() - startTime
            setIsLoading(false)

            logDebug('Success', `API Test Successful in ${duration}ms`)
            addMessage(
                `✅ <strong>API Connection Successful!</strong><br><br><strong>Response Time:</strong> ${duration}ms<br><strong>AI Response:</strong> "${response.text}"`,
                'bot'
            )
        } catch (error) {
            setIsLoading(false)
            logDebug('Error', 'API Test Failed', { message: error.message })
            addMessage(
                `❌ <strong>Connection Error:</strong> ${error.message}<br><br>Try Incognito mode (Ctrl+Shift+N) to bypass extensions.`,
                'bot'
            )
        }
    }, [genAI, logDebug, addMessage])

    const sendMessage = useCallback(async (userMessage) => {
        if (!userMessage.trim()) return

        addMessage(userMessage, 'user')
        logDebug('User', `Message: "${userMessage}"`)
        setIsLoading(true)

        try {
            const systemPrompt = `You are an expert English teacher for SEE (Secondary Education Examination) students in Nepal. 

Site: SEE English Learning Hub by Nabaraj Dhungana
School: Paschimanchal English School, Siddharthanagar-6, Rupandehi

Available Topics:
Grammar: Articles, Prepositions, Tenses, Active/Passive Voice, Reported Speech, Question Tags, Causative Verbs, Subject-Verb Agreement
Writing: Essay (8 marks), Paragraph (5 marks), Chart (5 marks), Letters (8 marks), Applications (6 marks), Dialogue (6 marks), News (5-8 marks), Recipe (5 marks), Notice (5 marks), Advertisement (5 marks), Reviews (8 marks)
Quizzes: GK Quiz (50 questions), Articles Quiz (20 questions)

Be friendly, use examples, and help with SEE exam preparation.

User question: ${userMessage}`

            const startTime = Date.now()
            const response = await genAI.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: systemPrompt,
                generationConfig: {
                    temperature: 0.8,
                    maxOutputTokens: 800,
                    topP: 0.9,
                    topK: 40
                }
            })

            const duration = Date.now() - startTime
            logDebug('Success', `Response in ${duration}ms`)
            setIsLoading(false)

            if (response && response.text) {
                addMessage(response.text, 'bot')
            } else {
                throw new Error('Invalid API response')
            }
        } catch (error) {
            setIsLoading(false)
            logDebug('Error', 'API Call Failed', { message: error.message })
            addMessage(
                `⚠️ <strong>Error:</strong> ${error.message}<br><br>Try Incognito mode (Ctrl+Shift+N) to bypass browser extensions.`,
                'bot'
            )
        }
    }, [genAI, logDebug, addMessage])

    const value = {
        isOpen,
        messages,
        isLoading,
        debugLogs,
        showDebug,
        toggleBot,
        toggleDebug,
        clearDebug,
        testConnection,
        sendMessage,
        addMessage,
        logDebug
    }

    return <AIBotContext.Provider value={value}>{children}</AIBotContext.Provider>
}
