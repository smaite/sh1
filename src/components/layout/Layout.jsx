import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Background3D from './Background3D'
import AIBot from '../aibot/AIBot'
import './Layout.css'

const Layout = ({ children }) => {
    useEffect(() => {
        // Add fade-in animation to page
        document.body.classList.add('fade-in')
    }, [])

    return (
        <div className="layout">
            <Background3D />
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
            <AIBot />
        </div>
    )
}

export default Layout
