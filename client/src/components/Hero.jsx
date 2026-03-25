import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';

const Hero = () => {
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero" id="hero">
            <div className="container">
                <div className="hero-grid">
                    <motion.div
                        className="hero-header"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.div
                            className="hero-label"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                        >
                            <span className="dot" />
                            Open to opportunities
                        </motion.div>

                        <h1>
                            Hi, I'm{' '}
                            <span className="gradient-text">Mohammad Huzaif</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        className="hero-image"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="hero-image-wrapper">
                            <img src="/profile.jpg" alt="Mohammad Huzaif" />
                            <div className="hero-image-glow" />
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero-body"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="hero-description">
                            A passionate Full-Stack MERN Developer building scalable, modern web
                            applications. Currently pursuing Computer Science Engineering at
                            Chandigarh University, Mohali.
                        </p>

                        <div className="hero-buttons">
                            <motion.button
                                className="btn btn-primary"
                                onClick={() => scrollTo('projects')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                View Projects <FiArrowRight />
                            </motion.button>
                            <motion.a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <FiDownload /> Download Resume
                            </motion.a>
                            <motion.button
                                className="btn btn-secondary"
                                onClick={() => scrollTo('contact')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <FiMail /> Contact Me
                            </motion.button>
                        </div>

                        <motion.div
                            className="hero-stats"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                        >
                            <div className="hero-stat">
                                <div className="hero-stat-value">5+</div>
                                <div className="hero-stat-label">Projects Built</div>
                            </div>
                            <div className="hero-stat">
                                <div className="hero-stat-value">10+</div>
                                <div className="hero-stat-label">Technologies</div>
                            </div>
                            <div className="hero-stat">
                                <div className="hero-stat-value">MERN</div>
                                <div className="hero-stat-label">Stack Specialist</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
