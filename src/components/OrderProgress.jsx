import React from 'react';
import '../styles/OrderProgress.css';

export default function OrderProgress({ status, timeline }) {
  // Map our order statuses to the stepper indexing
  const steps = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];
  
  // Find index of current status
  // Processing is index 1, Shipped is 2, Delivered is 3, Confirmed is 0
  let currentStepIndex = 0;
  if (status === 'Processing') currentStepIndex = 1;
  else if (status === 'Shipped') currentStepIndex = 2;
  else if (status === 'Delivered') currentStepIndex = 3;
  else if (status === 'Return' || status === 'Cancelled') {
    return null; // Don't show standard progress bar for cancelled/returned orders
  }

  // Get dates from timeline
  const getDateForStep = (stepName) => {
    const item = timeline.find((t) => t.step === stepName);
    return item ? item.date : '';
  };

  const isStepCompleted = (index) => {
    return index <= currentStepIndex;
  };

  return (
    <div className="order-progress-stepper">
      {steps.map((step, index) => {
        const completed = isStepCompleted(index);
        const active = index === currentStepIndex;
        const date = getDateForStep(step);
        
        return (
          <React.Fragment key={step}>
            {/* Step Node */}
            <div className={`step-node ${completed ? 'completed' : ''} ${active ? 'active' : ''}`}>
              <div className="step-icon-wrapper">
                {step === 'Confirmed' && (
                  <svg className="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
                {step === 'Processing' && (
                  <svg className="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                )}
                {step === 'Shipped' && (
                  <svg className="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                )}
                {step === 'Delivered' && (
                  <svg className="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                )}
              </div>
              <div className="step-label-group">
                <span className="step-name">{step}</span>
                {date && <span className="step-date">{date}</span>}
              </div>
            </div>

            {/* Connecting Line (omit after last step) */}
            {index < steps.length - 1 && (
              <div className={`step-line ${isStepCompleted(index + 1) ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
