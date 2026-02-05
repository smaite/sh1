import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AIBotProvider } from './context/AIBotContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import GrammarHub from './pages/grammar/GrammarHub'
import Articles from './pages/grammar/Articles'
import Prepositions from './pages/grammar/Prepositions'
import Tenses from './pages/grammar/Tenses'
import Voice from './pages/grammar/Voice'
import ReportedSpeech from './pages/grammar/ReportedSpeech'
import QuestionTags from './pages/grammar/QuestionTags'
import Causatives from './pages/grammar/Causatives'
import SubjectVerb from './pages/grammar/SubjectVerb'
import WritingHub from './pages/writing/WritingHub'
import GKQuiz from './pages/quiz/GKQuiz'

function App() {
    return (
        <Router>
            <AIBotProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />

                        {/* Grammar Routes */}
                        <Route path="/grammar" element={<GrammarHub />} />
                        <Route path="/grammar/articles" element={<Articles />} />
                        <Route path="/grammar/prepositions" element={<Prepositions />} />
                        <Route path="/grammar/tenses" element={<Tenses />} />
                        <Route path="/grammar/voice" element={<Voice />} />
                        <Route path="/grammar/reported-speech" element={<ReportedSpeech />} />
                        <Route path="/grammar/question-tags" element={<QuestionTags />} />
                        <Route path="/grammar/causatives" element={<Causatives />} />
                        <Route path="/grammar/subject-verb" element={<SubjectVerb />} />

                        {/* Writing Routes */}
                        <Route path="/writing" element={<WritingHub />} />

                        {/* Quiz Routes */}
                        <Route path="/quiz/gk" element={<GKQuiz />} />
                    </Routes>
                </Layout>
            </AIBotProvider>
        </Router>
    )
}

export default App
