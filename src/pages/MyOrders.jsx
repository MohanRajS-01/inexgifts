import React, { useState } from 'react';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import Banner from '../components/Banner';
import OrderCard from '../components/OrderCard';
import { orders } from '../data/orders';
import '../styles/MyOrders.css';

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState('All');

  // Filter orders instantly using state
  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'All') return true;
    return order.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="orders-page-container">
      <Header title="My Orders" />
      
      {/* Top filter navigation tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Informative real-time tracking banner */}
      <Banner />

      {/* Dynamic Orders List */}
      <div className="orders-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <div className="empty-orders-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="empty-state-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <h3 className="empty-state-heading">No Orders Found</h3>
            <p className="empty-state-desc">You don't have any orders currently marked as "{activeTab}".</p>
            <button className="empty-state-btn" onClick={() => setActiveTab('All')}>
              Show All Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
