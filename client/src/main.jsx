import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: 'rgba(15, 15, 30, 0.9)',
                        color: '#e2e8f0',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        backdropFilter: 'blur(10px)',
                    },
                }}
            />
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
