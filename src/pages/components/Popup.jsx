import React, { useEffect } from 'react';

const Popup = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 2500);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className="toast-popup" role="status" aria-live="polite">
            <span>{message}</span>
        </div>
    );
};

export default Popup;
