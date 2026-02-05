import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Book, Pen, Brain } from 'lucide-react'
import './Header.css'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    const navLinks = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/grammar', label: 'Grammar', icon: Book },
        { path: '/writing', label: 'Writing', icon: Pen },
        { path: '/quiz/gk', label: 'GK Quiz', icon: Brain },
    ]

    const isActive = (path) => location.pathname === path

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <h1 className="logo-text glow-text">SEE English Hub</h1>
                        <p className="logo-subtitle">by Nabaraj Dhungana</p>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="nav-desktop">
                        {navLinks.map(({ path, label, icon: Icon }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`nav-link ${isActive(path) ? 'active' : ''}`}
                            >
                                <Icon size={18} />
                                <span>{label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="nav-mobile">
                        {navLinks.map(({ path, label, icon: Icon }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`nav-link-mobile ${isActive(path) ? 'active' : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Icon size={18} />
                                <span>{label}</span>
                            </Link>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    )
}

export default Header
