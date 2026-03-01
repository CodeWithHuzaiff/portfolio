import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiGlobe, FiDatabase, FiTool } from 'react-icons/fi';

const skillCategories = [
    {
        title: 'Programming',
        icon: <FiCode />,
        skills: [
            { name: 'JavaScript', level: 85 },
            { name: 'Python', level: 70 },
            { name: 'C++', level: 65 },
        ],
    },
    {
        title: 'Web Development',
        icon: <FiGlobe />,
        skills: [
            { name: 'React.js', level: 85 },
            { name: 'Node.js', level: 80 },
            { name: 'Express.js', level: 80 },
        ],
    },
    {
        title: 'Databases',
        icon: <FiDatabase />,
        skills: [
            { name: 'MongoDB', level: 80 },
            { name: 'MySQL', level: 65 },
        ],
    },
    {
        title: 'Developer Tools',
        icon: <FiTool />,
        skills: [
            { name: 'Git & GitHub', level: 85 },
            { name: 'Postman', level: 75 },
            { name: 'Render', level: 70 },
        ],
    },
];

const SkillBar = ({ name, level, delay }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <div className="skill-item" ref={ref}>
            <div className="skill-header">
                <span className="skill-name">{name}</span>
                <span className="skill-level">{level}%</span>
            </div>
            <div className="skill-bar">
                <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: delay * 0.15, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
};

const Skills = () => {
    return (
        <section className="section" id="skills">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">
                        <FiCode /> Skills
                    </span>
                    <h2 className="section-title">
                        Technical <span className="gradient-text">Expertise</span>
                    </h2>
                    <p className="section-subtitle">
                        Technologies and tools I use to bring ideas to life.
                    </p>
                </motion.div>

                <div className="skills-grid">
                    {skillCategories.map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            className="glass-card skill-category"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <div className="skill-category-icon">{cat.icon}</div>
                            <h3>{cat.title}</h3>
                            {cat.skills.map((skill, j) => (
                                <SkillBar key={skill.name} {...skill} delay={j} />
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
