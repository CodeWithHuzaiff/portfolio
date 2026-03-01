import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNavClick = (id) => {
        setMenuOpen(false);
        if (!isHome) {
            navigate('/');
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <a href="/" className="nav-logo">
                    &lt;<span>Huzaif</span>/&gt;
                </a>

                <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {navItems.map((item) => (
                        <span
                            key={item.id}
                            className="nav-link"
                            onClick={() => handleNavClick(item.id)}
                        >
                            {item.label}
                        </span>
                    ))}
                    <a href="/admin/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                        Admin
                    </a>
                </div>

                <button
                    className={`nav-toggle ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </div>

            {/* Mobile overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                            zIndex: -1,
                        }}
                        onClick={() => setMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
