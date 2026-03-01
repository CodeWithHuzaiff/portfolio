import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-left">
                    <p>
                        © {new Date().getFullYear()} <a href="/">Mohammad Huzaif</a>.
                        Built with <FiHeart style={{ verticalAlign: 'middle', color: 'var(--error)', fontSize: '0.9rem' }} /> using
                        MERN Stack.
                    </p>
                </div>

                <div className="footer-links">
                    <a
                        href="https://github.com/codewithhuzaiff"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                        aria-label="GitHub"
                    >
                        <FiGithub />
                    </a>
                    <a
                        href="https://linkedin.com/in/mohammad-huzaif"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                        aria-label="LinkedIn"
                    >
                        <FiLinkedin />
                    </a>
                    <a
                        href="mailto:mohammadhuzaiff@gmail.com"
                        className="footer-link"
                        aria-label="Email"
                    >
                        <FiMail />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
