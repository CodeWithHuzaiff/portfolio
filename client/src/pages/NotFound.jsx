import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
    return (
        <section className="not-found">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ textAlign: 'center' }}
            >
                <motion.h1
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                >
                    404
                </motion.h1>
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist or has been moved.</p>
                <motion.a
                    href="/"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <FiArrowLeft /> Back to Home
                </motion.a>
            </motion.div>
        </section>
    );
};

export default NotFound;
