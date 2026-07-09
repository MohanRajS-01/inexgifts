import React, { useEffect, useState } from 'react';

function Toast({ message, onHide }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onHide, 400); // allow transition to finish
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onHide]);

  if (!message && !visible) return null;

  return (
    <div className={`toast-message ${visible ? 'show' : ''}`} dangerouslySetInnerHTML={{ __html: message }}>
    </div>
  );
}

export default Toast;
