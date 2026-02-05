// Placeholder components for other grammar topics
import { BookOpen } from 'lucide-react'

const createPlaceholderPage = (title, description) => {
    return () => (
        <div className="container">
            <div className="page-header">
                <BookOpen size={48} className="page-icon" />
                <h1 className="glow-text">{title}</h1>
                <p>{description}</p>
            </div>
            <div className="content-card">
                <h2>🚧 Coming Soon!</h2>
                <p>This page is being developed. Check back soon for interactive lessons and quizzes.</p>
            </div>
        </div>
    )
}

export const Prepositions = createPlaceholderPage(
    'Prepositions',
    'Master the usage of in, on, at, by, with, and more'
)

export const Tenses = createPlaceholderPage(
    'Tenses',
    'Learn Past, Present, and Future tenses'
)

export const Voice = createPlaceholderPage(
    'Active & Passive Voice',
    'Master voice transformation in English'
)

export const ReportedSpeech = createPlaceholderPage(
    'Reported Speech',
    'Convert direct speech to indirect speech'
)

export const QuestionTags = createPlaceholderPage(
    'Question Tags',
    "Master question tags like isn't it?, aren't they?"
)

export const Causatives = createPlaceholderPage(
    'Causative Verbs',
    'Learn to use have, make, get, and let correctly'
)

export const SubjectVerb = createPlaceholderPage(
    'Subject-Verb Agreement',
    'Master grammar syntax and agreement rules'
)
