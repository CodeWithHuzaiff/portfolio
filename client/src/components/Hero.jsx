import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiMail } from 'react-icons/fi';

const Hero = () => {
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero" id="hero">
            <div className="container">
                <div className="hero-grid">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <motion.div
                            className="hero-label"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <span className="dot" />
                            Open to opportunities
                        </motion.div>

                        <h1>
                            Hi, I'm{' '}
                            <span className="gradient-text">Mohammad Huzaif</span>
                        </h1>

                        <motion.p
                            className="hero-description"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            A passionate Full-Stack MERN Developer building scalable, modern web
                            applications. Currently pursuing Computer Science Engineering at
                            Chandigarh University, Mohali.
                        </motion.p>

                        <motion.div
                            className="hero-buttons"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
                                View Projects <FiArrowRight />
                            </button>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                <FiDownload /> Download Resume
                            </a>
                            <button className="btn btn-secondary" onClick={() => scrollTo('contact')}>
                                <FiMail /> Contact Me
                            </button>
                        </motion.div>

                        <motion.div
                            className="hero-stats"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
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

                    <motion.div
                        className="hero-image"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                    >
                        <div className="hero-image-wrapper">
                            <img src="/profile.jpg" alt="Mohammad Huzaifa Dar" />
                            <div className="hero-image-glow" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
