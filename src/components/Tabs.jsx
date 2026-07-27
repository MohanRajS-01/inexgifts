import React from 'react';
import '../styles/Tabs.css';

export default function Tabs({ activeTab, setActiveTab }) {
  const tabsList = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Return'];

  return (
    <div className="tabs-container">
      <div className="tabs-list">
        {tabsList.map((tab) => (
          <button
            key={tab}
            className={`tab-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab && <div className="tab-underline" />}
          </button>
        ))}
      </div>
    </div>
  );
}
