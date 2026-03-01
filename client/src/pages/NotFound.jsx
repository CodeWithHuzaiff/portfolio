import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist or has been moved.</p>
                <Link to="/" className="btn btn-primary">
                    <FiHome /> Back to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
