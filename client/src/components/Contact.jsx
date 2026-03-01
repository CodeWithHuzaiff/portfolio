import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../utils/api';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [honeypot, setHoneypot] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Honeypot spam protection
        if (honeypot) return;

        if (!form.name || !form.email || !form.message) {
            toast.error('Please fill in all fields');
            return;
        }

        if (form.message.length < 10) {
            toast.error('Message must be at least 10 characters');
            return;
        }

        setSending(true);
        try {
            await API.post('/contacts', form);
            toast.success('Message sent successfully! 🎉');
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            const msg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Something went wrong';
            toast.error(msg);
        } finally {
            setSending(false);
        }
    };

    return (
        <section className="section" id="contact">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">
                        <FiMail /> Contact
                    </span>
                    <h2 className="section-title">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="section-subtitle">
                        Have a question or want to work together? Drop me a message!
                    </p>
                </motion.div>

                <div className="contact-grid">
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <h3>Get in Touch</h3>
                        <p>
                            I'm always open to discussing new projects, ideas, or
                            opportunities to be part of your vision.
                        </p>

                        <div className="contact-item">
                            <div className="contact-item-icon"><FiMail /></div>
                            <div className="contact-item-text">
                                <h4>Email</h4>
                                <p>
                                    <a
                                        href="mailto:mohammadhuzaiff@gmail.com"
                                        style={{ color: 'var(--accent-tertiary)' }}
                                    >
                                        mohammadhuzaiff@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-item-icon"><FiMapPin /></div>
                            <div className="contact-item-text">
                                <h4>Location</h4>
                                <p>
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=Chandigarh+University+Mohali"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: 'var(--accent-tertiary)' }}
                                    >
                                        Chandigarh University, Mohali
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-item-icon"><FiGithub /></div>
                            <div className="contact-item-text">
                                <h4>GitHub</h4>
                                <p>
                                    <a
                                        href="https://github.com/codewithhuzaiff"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: 'var(--accent-tertiary)' }}
                                    >
                                        github.com/codewithhuzaiff
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-item-icon"><FiLinkedin /></div>
                            <div className="contact-item-text">
                                <h4>LinkedIn</h4>
                                <p>
                                    <a
                                        href="https://linkedin.com/in/mohammad-huzaif"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: 'var(--accent-tertiary)' }}
                                    >
                                        linkedin.com/in/mohammad-huzaif
                                    </a>
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        className="glass-card contact-form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        {/* Honeypot */}
                        <input
                            type="text"
                            name="website"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            style={{ display: 'none' }}
                            tabIndex={-1}
                            autoComplete="off"
                        />

                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Your Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                className="form-input"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="john@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-textarea"
                                placeholder="Tell me about your project or idea..."
                                value={form.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={sending}
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            {sending ? 'Sending...' : <>Send Message <FiSend /></>}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
