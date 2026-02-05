import { Link } from 'react-router-dom'
import { Book, Pen, Brain, Award, Users, Clock, Video } from 'lucide-react'
import './Home.css'

const Home = () => {
    const stats = [
        { number: '50+', label: 'Grammar Topics', icon: Book },
        { number: '100+', label: 'Writing Exercises', icon: Pen },
        { number: '500+', label: 'Quiz Questions', icon: Brain },
        { number: '25', label: 'Years Experience', icon: Award }
    ]

    const features = [
        {
            icon: Brain,
            title: 'Interactive Learning',
            description: 'Learn through engaging games, quizzes, and interactive exercises'
        },
        {
            icon: Users,
            title: 'Structured Progression',
            description: 'From easy to difficult levels with clear learning paths'
        },
        {
            icon: Video,
            title: 'Video Resources',
            description: 'Supplementary YouTube videos for visual learners'
        },
        {
            icon: Clock,
            title: 'Timed Practice',
            description: 'Test your speed and accuracy with timed exercises'
        }
    ]

    const grammarTopics = [
        { name: 'Articles', path: '/grammar/articles', icon: '📝', desc: 'A, An, The usage' },
        { name: 'Prepositions', path: '/grammar/prepositions', icon: '🗺️', desc: 'in, on, at, by, with' },
        { name: 'Tenses', path: '/grammar/tenses', icon: '⏰', desc: 'Past, Present, Future' },
        { name: 'Voice', path: '/grammar/voice', icon: '🔄', desc: 'Active & Passive' },
        { name: 'Reported Speech', path: '/grammar/reported-speech', icon: '💬', desc: 'Direct to Indirect' },
        { name: 'Question Tags', path: '/grammar/question-tags', icon: '❓', desc: "isn't it?, aren't they?" },
        { name: 'Causatives', path: '/grammar/causatives', icon: '👉', desc: 'have, make, get, let' },
        { name: 'Subject-Verb', path: '/grammar/subject-verb', icon: '🤝', desc: 'Agreement rules' }
    ]

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h1 className="hero-title glow-text">SEE English Learning Hub</h1>
                    <p className="hero-subtitle">
                        Master English Grammar & Writing Skills | Interactive Learning Experience
                    </p>

                    {/* Stats */}
                    <div className="stats-grid">
                        {stats.map(({ number, label, icon: Icon }) => (
                            <div key={label} className="stat-card">
                                <Icon className="stat-icon" size={32} />
                                <div className="stat-number text-gradient">{number}</div>
                                <div className="stat-label">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section">
                <div className="container">
                    <div className="feature-highlight">
                        <h2 className="section-title">Why Learn With Us?</h2>
                        <div className="features-grid">
                            {features.map(({ icon: Icon, title, description }) => (
                                <div key={title} className="feature-item">
                                    <div className="feature-icon">
                                        <Icon size={24} />
                                    </div>
                                    <div className="feature-content">
                                        <h4>{title}</h4>
                                        <p>{description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Grammar Section */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Learn Grammar Through Engaging Games</h2>
                    <p className="section-subtitle">
                        Master English grammar with interactive lessons and practice exercises
                    </p>

                    <div className="topics-grid">
                        {grammarTopics.map((topic) => (
                            <Link key={topic.name} to={topic.path} className="topic-card">
                                <div className="topic-icon">{topic.icon}</div>
                                <h3>{topic.name}</h3>
                                <p>{topic.desc}</p>
                            </Link>
                        ))}
                    </div>

                    <div className="section-cta">
                        <Link to="/grammar" className="btn btn-primary">
                            <Book size={20} />
                            Explore All Grammar Topics
                        </Link>
                    </div>
                </div>
            </section>

            {/* Writing Section Preview */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Develop Your Writing Skills</h2>
                    <p className="section-subtitle">
                        From paragraphs to essays, master all writing formats for SEE exam
                    </p>

                    <div className="writing-preview">
                        <div className="writing-category">
                            <h3>📝 Guided Writing I (5 Marks)</h3>
                            <p>Paragraph, Chart Interpretation, Instructions, Recipes, Notices</p>
                        </div>
                        <div className="writing-category">
                            <h3>✍️ Free Writing (6-8 Marks)</h3>
                            <p>Essays, Letters, Applications, Dialogues, Reviews</p>
                        </div>
                    </div>

                    <div className="section-cta">
                        <Link to="/writing" className="btn btn-primary">
                            <Pen size={20} />
                            Explore Writing Topics
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
