import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';

export default function Header({ title }) {
  const navigate = useNavigate();
  const location = useLocation();

  // We can show a back button if we are not on the main My Orders list page
  const showBackButton = location.pathname !== '/orders' && location.pathname !== '/';

  return (
    <header className="app-header">
      <div className="header-left">
        {showBackButton && (
          <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go Back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="back-icon">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
        )}
        <h1 className="header-title">{title || "My Orders"}</h1>
      </div>
      
      <div className="header-right">
        <button className="icon-btn" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header-svg-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        
        <button className="icon-btn cart-btn" aria-label="Cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header-svg-icon">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="cart-badge">2</span>
        </button>
      </div>
    </header>
  );
}
