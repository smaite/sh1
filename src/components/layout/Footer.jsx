import { Heart, Mail } from 'lucide-react'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <p className="footer-text">
                        © 2024 SEE English Learning Hub. Developed with{' '}
                        <Heart size={16} className="heart-icon" /> by{' '}
                        <strong>Nabaraj Dhungana</strong>
                    </p>
                    <p className="footer-school">
                        Paschimanchal English School, Siddharthanagar-6, Rupandehi
                    </p>
                    <a href="mailto:ndhungana2076@gmail.com" className="footer-email">
                        <Mail size={16} />
                        ndhungana2076@gmail.com
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
