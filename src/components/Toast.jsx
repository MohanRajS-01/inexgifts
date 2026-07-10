import React, { useEffect, useState } from 'react';

export const Toast = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger transition on next frame
    const frame = requestAnimationFrame(() => {
      setShow(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`toast-bubble ${show ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Toast;
