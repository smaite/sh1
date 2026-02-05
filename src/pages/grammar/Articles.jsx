import { useState } from 'react'
import { BookOpen, Play, Award } from 'lucide-react'

const Articles = () => {
    const [selectedQuiz, setSelectedQuiz] = useState(null)

    const quizzes = [
        { id: 'easy-1', name: 'Articles - Easy Level 1', difficulty: 'Easy', questions: 20 },
        { id: 'easy-2', name: 'Articles - Easy Level 2', difficulty: 'Easy', questions: 20 },
        { id: 'easy-3', name: 'Articles - Easy Level 3', difficulty: 'Easy', questions: 20 },
        { id: 'difficult-1', name: 'Articles - Difficult Level 1', difficulty: 'Difficult', questions: 20 },
        { id: 'difficult-2', name: 'Articles - Difficult Level 2', difficulty: 'Difficult', questions: 20 },
        { id: 'timed-1', name: 'Articles - Timed Challenge', difficulty: 'Timed', questions: 20 }
    ]

    return (
        <div className="container">
            <div className="page-header">
                <BookOpen size={48} className="page-icon" />
                <h1 className="glow-text">Articles (A, An, The)</h1>
                <p>Master the art of using articles correctly in English</p>
            </div>

            {/* Content Section */}
            <div className="content-card">
                <h2>📚 What are Articles?</h2>
                <p>
                    Articles are words that define a noun as specific or unspecific. In English, there are three articles:
                </p>
                <ul>
                    <li><strong>A</strong> - Used before singular nouns that begin with a consonant sound</li>
                    <li><strong>An</strong> - Used before singular nouns that begin with a vowel sound</li>
                    <li><strong>The</strong> - Used before specific or particular nouns</li>
                </ul>

                <h3>Examples:</h3>
                <div className="examples-grid">
                    <div className="example-card">
                        <h4>A</h4>
                        <p>A book, A university, A one-way street</p>
                    </div>
                    <div className="example-card">
                        <h4>An</h4>
                        <p>An apple, An hour, An honest person</p>
                    </div>
                    <div className="example-card">
                        <h4>The</h4>
                        <p>The sun, The book I read, The best student</p>
                    </div>
                </div>
            </div>

            {/* Quizzes Section */}
            <div className="quizzes-section">
                <h2>🎯 Practice Quizzes</h2>
                <div className="quizzes-grid">
                    {quizzes.map((quiz) => (
                        <div key={quiz.id} className="quiz-card">
                            <div className="quiz-header">
                                <h3>{quiz.name}</h3>
                                <span className={`difficulty-badge ${quiz.difficulty.toLowerCase()}`}>
                                    {quiz.difficulty}
                                </span>
                            </div>
                            <p className="quiz-info">
                                <Award size={16} /> {quiz.questions} Questions
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => setSelectedQuiz(quiz.id)}
                            >
                                <Play size={18} />
                                Start Quiz
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedQuiz && (
                <div className="quiz-placeholder">
                    <p>Quiz functionality will be implemented in the next phase!</p>
                    <p>Selected: {quizzes.find(q => q.id === selectedQuiz)?.name}</p>
                    <button className="btn btn-secondary" onClick={() => setSelectedQuiz(null)}>
                        Close
                    </button>
                </div>
            )}
        </div>
    )
}

export default Articles
