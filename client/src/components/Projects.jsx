import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import API from '../utils/api';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await API.get('/projects');
                setProjects(data.data);
            } catch (err) {
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const allTechStacks = useMemo(() => {
        const stacks = new Set();
        projects.forEach((p) => p.techStack.forEach((t) => stacks.add(t)));
        return ['All', ...Array.from(stacks).sort()];
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') return projects;
        return projects.filter((p) => p.techStack.includes(activeFilter));
    }, [projects, activeFilter]);

    return (
        <section className="section" id="projects">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">
                        <FiFolder /> Projects
                    </span>
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Work</span>
                    </h2>
                    <p className="section-subtitle">
                        A collection of projects showcasing my full-stack development skills.
                    </p>
                </motion.div>

                <motion.div
                    className="projects-filter"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {allTechStacks.map((tech) => (
                        <button
                            key={tech}
                            className={`filter-btn ${activeFilter === tech ? 'active' : ''}`}
                            onClick={() => setActiveFilter(tech)}
                        >
                            {tech}
                        </button>
                    ))}
                </motion.div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <div className="loader-spinner" style={{ margin: '0 auto' }} />
                    </div>
                ) : (
                    <div className="projects-grid">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, i) => (
                                <motion.div
                                    key={project._id}
                                    className="glass-card project-card"
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                >
                                    <div className="project-image">
                                        {project.imageURL ? (
                                            <img src={project.imageURL} alt={project.title} />
                                        ) : (
                                            <div className="project-image-placeholder">
                                                <FiFolder />
                                            </div>
                                        )}
                                        <div className="project-overlay">
                                            {project.githubLink && (
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-overlay-btn secondary"
                                                >
                                                    <FiGithub /> Code
                                                </a>
                                            )}
                                            {project.liveLink && (
                                                <a
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-overlay-btn"
                                                >
                                                    <FiExternalLink /> Live
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className="project-info">
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                        <div className="project-stack">
                                            {project.techStack.map((tech) => (
                                                <span key={tech} className="stack-tag">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
