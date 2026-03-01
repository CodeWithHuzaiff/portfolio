import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiFolder, FiMail, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../utils/api';

// ===== PROJECT FORM MODAL =====
const ProjectForm = ({ project, onClose, onSave }) => {
    const [form, setForm] = useState({
        title: project?.title || '',
        description: project?.description || '',
        techStack: project?.techStack?.join(', ') || '',
        githubLink: project?.githubLink || '',
        liveLink: project?.liveLink || '',
        imageURL: project?.imageURL || '',
        featured: project?.featured || false,
    });
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                ...form,
                techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean),
            };
            if (project) {
                await API.put(`/projects/${project._id}`, payload);
                toast.success('Project updated');
            } else {
                await API.post('/projects', payload);
                toast.success('Project created');
            }
            onSave();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save project');
        } finally {
            setSaving(false);
        }
    };

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.form
                className="glass-card modal-content"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
            >
                <h2>{project ? 'Edit Project' : 'Add Project'}</h2>

                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input name="title" className="form-input" value={form.title} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea name="description" className="form-textarea" value={form.description} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label className="form-label">Tech Stack (comma-separated)</label>
                    <input name="techStack" className="form-input" value={form.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" required />
                </div>

                <div className="form-group">
                    <label className="form-label">GitHub Link</label>
                    <input name="githubLink" className="form-input" value={form.githubLink} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label className="form-label">Live Link (optional)</label>
                    <input name="liveLink" className="form-input" value={form.liveLink} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label className="form-label">Image URL (optional)</label>
                    <input name="imageURL" className="form-input" value={form.imageURL} onChange={handleChange} />
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange} />
                    <label htmlFor="featured" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>Featured project</label>
                </div>

                <div className="modal-actions">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
                    <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>{saving ? 'Saving...' : 'Save Project'}</button>
                </div>
            </motion.form>
        </motion.div>
    );
};

// ===== ADMIN DASHBOARD =====
const AdminDashboard = () => {
    const [tab, setTab] = useState('projects');
    const [projects, setProjects] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEditingProject] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [projRes, msgRes] = await Promise.all([
                API.get('/projects'),
                API.get('/contacts'),
            ]);
            setProjects(projRes.data.data);
            setMessages(msgRes.data.data);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/admin/login');
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        // Verify token on mount
        const verify = async () => {
            try {
                await API.get('/auth/verify');
                fetchData();
            } catch {
                localStorage.removeItem('adminToken');
                navigate('/admin/login');
            }
        };
        verify();
    }, [fetchData, navigate]);

    const deleteProject = async (id) => {
        if (!window.confirm('Delete this project?')) return;
        try {
            await API.delete(`/projects/${id}`);
            toast.success('Project deleted');
            setProjects(projects.filter((p) => p._id !== id));
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    const markAsRead = async (id) => {
        try {
            await API.put(`/contacts/${id}/read`);
            setMessages(messages.map((m) => (m._id === id ? { ...m, read: true } : m)));
        } catch (err) {
            toast.error('Failed to update');
        }
    };

    const deleteMessage = async (id) => {
        if (!window.confirm('Delete this message?')) return;
        try {
            await API.delete(`/contacts/${id}`);
            toast.success('Message deleted');
            setMessages(messages.filter((m) => m._id !== id));
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        toast.success('Logged out');
        navigate('/admin/login');
    };

    const openEdit = (project) => {
        setEditingProject(project);
        setShowForm(true);
    };

    const openAdd = () => {
        setEditingProject(null);
        setShowForm(true);
    };

    const handleFormSave = () => {
        setShowForm(false);
        setEditingProject(null);
        fetchData();
    };

    const unreadCount = messages.filter((m) => !m.read).length;

    return (
        <div className="admin-layout">
            <div className="container">
                <div className="admin-header">
                    <h1>Dashboard</h1>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <button className="btn btn-primary btn-sm" onClick={openAdd}>
                            <FiPlus /> Add Project
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                            <FiLogOut /> Logout
                        </button>
                    </div>
                </div>

                <div className="admin-tabs">
                    <button
                        className={`admin-tab ${tab === 'projects' ? 'active' : ''}`}
                        onClick={() => setTab('projects')}
                    >
                        <FiFolder style={{ verticalAlign: 'middle', marginRight: 6 }} />
                        Projects ({projects.length})
                    </button>
                    <button
                        className={`admin-tab ${tab === 'messages' ? 'active' : ''}`}
                        onClick={() => setTab('messages')}
                    >
                        <FiMail style={{ verticalAlign: 'middle', marginRight: 6 }} />
                        Messages ({messages.length})
                        {unreadCount > 0 && (
                            <span style={{
                                marginLeft: 8, padding: '2px 8px', background: 'var(--accent-primary)',
                                borderRadius: 'var(--radius-full)', fontSize: '0.75rem', color: 'white',
                            }}>
                                {unreadCount}
                            </span>
                        )}
                    </button>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <div className="loader-spinner" style={{ margin: '0 auto' }} />
                    </div>
                ) : tab === 'projects' ? (
                    <div>
                        {projects.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>
                                No projects yet. Add your first project!
                            </p>
                        ) : (
                            projects.map((project) => (
                                <motion.div
                                    key={project._id}
                                    className="glass-card admin-card"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: 12 }}>
                                        <div style={{ flex: 1 }}>
                                            <h3>
                                                {project.title}
                                                {project.featured && (
                                                    <span style={{
                                                        marginLeft: 10, padding: '2px 10px', background: 'var(--accent-glow)',
                                                        borderRadius: 'var(--radius-full)', fontSize: '0.7rem', color: 'var(--accent-tertiary)',
                                                        border: '1px solid var(--border-color)',
                                                    }}>Featured</span>
                                                )}
                                            </h3>
                                            <p>{project.description}</p>
                                            <div className="project-stack" style={{ marginBottom: 0 }}>
                                                {project.techStack.map((t) => (
                                                    <span key={t} className="stack-tag">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="admin-card-actions">
                                            <button className="btn btn-secondary btn-sm" onClick={() => openEdit(project)}>
                                                <FiEdit2 /> Edit
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => deleteProject(project._id)}>
                                                <FiTrash2 /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                ) : (
                    <div>
                        {messages.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>
                                No messages yet.
                            </p>
                        ) : (
                            messages.map((msg) => (
                                <motion.div
                                    key={msg._id}
                                    className={`glass-card admin-message ${msg.read ? '' : 'unread'}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="admin-message-header">
                                        <h4>{msg.name} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>({msg.email})</span></h4>
                                        <span>{new Date(msg.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    </div>
                                    <p>{msg.message}</p>
                                    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                                        {!msg.read && (
                                            <button className="btn btn-secondary btn-sm" onClick={() => markAsRead(msg._id)}>
                                                <FiEye /> Mark Read
                                            </button>
                                        )}
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteMessage(msg._id)}>
                                            <FiTrash2 /> Delete
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {showForm && (
                    <ProjectForm
                        project={editingProject}
                        onClose={() => { setShowForm(false); setEditingProject(null); }}
                        onSave={handleFormSave}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
