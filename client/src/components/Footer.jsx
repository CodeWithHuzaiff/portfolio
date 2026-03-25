import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

const socialLinks = [
    { href: 'https://github.com/codewithhuzaiff', icon: <FiGithub />, label: 'GitHub' },
    { href: 'https://linkedin.com/in/mohammad-huzaif', icon: <FiLinkedin />, label: 'LinkedIn' },
    { href: 'mailto:mohammadhuzaiff@gmail.com', icon: <FiMail />, label: 'Email' },
];

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
                    {socialLinks.map((link, i) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith('mailto') ? undefined : '_blank'}
                            rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                            className="footer-link"
                            aria-label={link.label}
                            whileHover={{ y: -3, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i, duration: 0.4 }}
                        >
                            {link.icon}
                        </motion.a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
