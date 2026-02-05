import { Link } from 'react-router-dom'
import { Book } from 'lucide-react'

const GrammarHub = () => {
    const topics = [
        { name: 'Articles', path: '/grammar/articles', icon: '📝', desc: 'Master A, An, The' },
        { name: 'Prepositions', path: '/grammar/prepositions', icon: '🗺️', desc: 'in, on, at, by, with' },
        { name: 'Tenses', path: '/grammar/tenses', icon: '⏰', desc: 'Past, Present, Future' },
        { name: 'Voice', path: '/grammar/voice', icon: '🔄', desc: 'Active & Passive Voice' },
        { name: 'Reported Speech', path: '/grammar/reported-speech', icon: '💬', desc: 'Direct to Indirect' },
        { name: 'Question Tags', path: '/grammar/question-tags', icon: '❓', desc: 'Tag questions' },
        { name: 'Causatives', path: '/grammar/causatives', icon: '👉', desc: 'have, make, get, let' },
        { name: 'Subject-Verb Agreement', path: '/grammar/subject-verb', icon: '🤝', desc: 'Grammar syntax' }
    ]

    return (
        <div className="container">
            <div className="page-header">
                <Book size={48} className="page-icon" />
                <h1 className="glow-text">Grammar Topics</h1>
                <p>Master English grammar with interactive lessons and quizzes</p>
            </div>

            <div className="topics-grid">
                {topics.map((topic) => (
                    <Link key={topic.name} to={topic.path} className="topic-card">
                        <div className="topic-icon">{topic.icon}</div>
                        <h3>{topic.name}</h3>
                        <p>{topic.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default GrammarHub
