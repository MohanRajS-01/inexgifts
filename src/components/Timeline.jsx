import React from 'react';

const SVG = {
  check: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  doc:   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  truck: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>,
  box:   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>,
  cross: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  return: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path><path d="M3 21v-5h5"></path></svg>
};

const getStepIcon = (label) => {
  if (label.includes('Confirmed') || label.includes('Completed')) return SVG.check;
  if (label.includes('Processing')) return SVG.doc;
  if (label.includes('Shipped')) return SVG.truck;
  if (label.includes('Delivered')) return SVG.box;
  if (label.includes('Cancelled')) return SVG.cross;
  if (label.includes('Return')) return SVG.return;
  return SVG.check;
};

export const Timeline = ({ progress, steps, customStyle = {} }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="order-progress-timeline-wrapper" style={customStyle}>
      <div className="timeline-line-background" style={customStyle.lineBg || {}}>
        <div className="timeline-line-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="timeline-stops-container">
        {steps.map((step, idx) => (
          <div key={idx} className={`timeline-stop-node ${step.done ? 'completed' : ''}`}>
            <div className="timeline-node-icon-bg">
              {getStepIcon(step.label)}
            </div>
            <span className="timeline-node-label">{step.label}</span>
            <span className="timeline-node-date">{step.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
