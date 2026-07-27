import React from 'react';
import '../styles/Banner.css';

export default function Banner() {
  return (
    <div className="tracking-banner">
      <div className="banner-left">
        <div className="banner-icon-container">
          {/* Animated/Glowing Package/Gift Icon */}
          <svg
            className="banner-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
        <div className="banner-text">
          <h2 className="banner-heading">Track your orders in real-time</h2>
          <p className="banner-subheading">Stay updated with every step of your order</p>
        </div>
      </div>
      <div className="banner-right">
        <button className="banner-btn">
          <span>Learn More</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="btn-arrow">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
