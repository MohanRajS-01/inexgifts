import React from 'react';

export const Button = ({ onClick, variant = 'outline', children, ariaLabel, icon }) => {
  const variantClasses = {
    outline: 'btn-card-outline',
    blueOutline: 'btn-card-outline-blue',
    filled: 'btn-card-filled',
    banner: 'banner-action-btn'
  };

  const className = variantClasses[variant] || 'btn-card-outline';

  return (
    <button className={className} onClick={onClick} aria-label={ariaLabel}>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
