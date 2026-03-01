import { motion } from 'framer-motion';
import { FiBookOpen, FiCode, FiZap, FiCpu, FiTrendingUp } from 'react-icons/fi';

const strengths = [
    { icon: <FiCpu />, title: 'Logical Thinking', desc: 'Strong analytical and problem-solving skills' },
    { icon: <FiCode />, title: 'Clean Code', desc: 'Writing maintainable, scalable code' },
    { icon: <FiZap />, title: 'Fast Learning', desc: 'Quickly adapting to new technologies' },
    { icon: <FiTrendingUp />, title: 'Consistency', desc: 'Dedicated and disciplined work ethic' },
];

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6 },
};

const About = () => {
    return (
        <section className="section" id="about">
            <div className="container">
                <motion.div {...fadeInUp}>
                    <span className="section-label">
                        <FiBookOpen /> About Me
                    </span>
                    <h2 className="section-title">
                        Crafting Digital <span className="gradient-text">Experiences</span>
                    </h2>
                    <p className="section-subtitle">
                        An aspiring full-stack developer with a passion for creating impactful web solutions.
                    </p>
                </motion.div>

                <div className="about-grid">
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p>
                            I'm Mohammad Huzaifa Dar, a Computer Science Engineering student at
                            Chandigarh University, Mohali. I'm passionate about building full-stack
                            web applications using modern technologies and clean architecture.
                        </p>
                        <p>
                            With a strong foundation in JavaScript, React, Node.js, and MongoDB, I
                            love turning ideas into scalable, user-friendly digital products. I
                            believe in writing clean, maintainable code and continuously improving
                            my craft.
                        </p>
                        <p>
                            I'm actively seeking opportunities to apply my skills in real-world
                            projects and grow as a professional software developer.
                        </p>

                        <div className="about-edu">
                            <h4>🎓 B.E. in Computer Science Engineering</h4>
                            <p>Chandigarh University, Mohali</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="strengths-grid"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {strengths.map((s, i) => (
                            <motion.div
                                key={i}
                                className="strength-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i, duration: 0.4 }}
                            >
                                <div className="strength-icon">{s.icon}</div>
                                <h4>{s.title}</h4>
                                <p>{s.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
