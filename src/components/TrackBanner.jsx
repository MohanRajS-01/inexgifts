import React from 'react';
import Button from './Button';

const SVG = {
  package: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>,
  arrow: <svg xmlns="http://www.w3.org/2000/svg" className="button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
};

export const TrackBanner = ({ onLearnMoreClick }) => {
  return (
    <section className="banner-section">
      <div className="banner-left-content">
        <div className="banner-icon-outer">
          {SVG.package}
        </div>
        <div className="banner-text-details">
          <h2>Track your orders in real-time</h2>
          <p>Stay updated with every step of your order</p>
        </div>
      </div>
      <Button variant="banner" onClick={onLearnMoreClick}>
        Learn More
        {SVG.arrow}
      </Button>
    </section>
  );
};

export default TrackBanner;
