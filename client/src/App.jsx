import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

const PageLoader = () => (
    <div className="page-loader">
        <div className="loader-spinner" />
    </div>
);

// Page transition wrapper
const PageTransition = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
    >
        {children}
    </motion.div>
);

function App() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <PageLoader />;

    return (
        <>
            <Navbar />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <PageTransition>
                                <Home />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/login"
                        element={
                            <PageTransition>
                                <Login />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <PageTransition>
                                <AdminDashboard />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <PageTransition>
                                <NotFound />
                            </PageTransition>
                        }
                    />
                </Routes>
            </AnimatePresence>
            {!isAdmin && <Footer />}
        </>
    );
}

export default App;
