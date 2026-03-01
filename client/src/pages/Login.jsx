import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../utils/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const { data } = await API.post('/auth/login', { email, password });
            localStorage.setItem('adminToken', data.token);
            toast.success('Welcome back!');
            navigate('/admin/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <motion.form
                className="glass-card login-card"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="gradient-text">Admin Login</h1>
                <p className="login-subtitle">Sign in to manage your portfolio</p>

                <div className="form-group">
                    <label className="form-label" htmlFor="login-email">
                        <FiMail style={{ verticalAlign: 'middle', marginRight: 6 }} />
                        Email
                    </label>
                    <input
                        id="login-email"
                        type="email"
                        className="form-input"
                        placeholder="admin@huzaifa.dev"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="login-password">
                        <FiLock style={{ verticalAlign: 'middle', marginRight: 6 }} />
                        Password
                    </label>
                    <input
                        id="login-password"
                        type="password"
                        className="form-input"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </motion.form>
        </div>
    );
};

export default Login;
