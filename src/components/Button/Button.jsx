import React from 'react';

export default function Button({ children, onClick, className, ...props }) {
  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
