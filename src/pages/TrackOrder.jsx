import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { orders } from '../data/orders';
import '../styles/TrackOrder.css';

export default function TrackOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find corresponding order from database
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="track-not-found">
        <Header title="Track Shipment" />
        <div className="not-found-card">
          <h3>Order Not Found</h3>
          <p>The requested order ID does not exist in our system.</p>
          <button className="back-to-orders-btn" onClick={() => navigate('/orders')}>
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const {
    orderNumber,
    productName,
    status,
    trackingNumber,
    deliveryPartner,
    estimatedDelivery,
    deliveredDate,
    timeline
  } = order;

  // Determine active status text
  let statusText = status;
  if (status === 'Processing') statusText = 'In Processing';

  return (
    <div className="track-order-container">
      <Header title={`Track Order #${orderNumber}`} />

      <div className="track-card">
        {/* Top bar with quick shipment stats */}
        <div className="track-header-grid">
          <div className="track-stat-box">
            <span className="stat-label">Product</span>
            <span className="stat-value">{productName}</span>
          </div>
          <div className="track-stat-box">
            <span className="stat-label">Tracking Number</span>
            <span className="stat-value highlight">{trackingNumber}</span>
          </div>
          <div className="track-stat-box">
            <span className="stat-label">Delivery Partner</span>
            <span className="stat-value">{deliveryPartner}</span>
          </div>
          <div className="track-stat-box">
            <span className="stat-label">
              {status === 'Delivered' ? 'Delivered Date' : 'Est. Delivery'}
            </span>
            <span className="stat-value success">
              {status === 'Delivered' ? deliveredDate : estimatedDelivery}
            </span>
          </div>
        </div>

        {/* Visual timeline bar & current shipment status info */}
        <div className="shipment-status-alert">
          <div className="alert-pulse-dot"></div>
          <span className="alert-text">
            Current Status: <strong>{statusText}</strong>. Your shipment is handled by <strong>{deliveryPartner}</strong>.
          </span>
        </div>

        {/* Detailed Vertical Tracking Timeline */}
        <div className="vertical-timeline-box">
          <h3 className="timeline-title">Shipment Journey</h3>
          
          <div className="vertical-timeline">
            {timeline.map((event, index) => {
              const { step, date, time, completed } = event;
              
              return (
                <div key={step} className={`timeline-row ${completed ? 'completed' : ''}`}>
                  {/* Left Column: Icon and connecting line */}
                  <div className="timeline-node-col">
                    <div className="timeline-circle">
                      {completed ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="timeline-check">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        <div className="timeline-dot" />
                      )}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className={`timeline-vertical-line ${timeline[index + 1].completed ? 'completed' : ''}`} />
                    )}
                  </div>

                  {/* Right Column: Text content */}
                  <div className="timeline-text-col">
                    <div className="event-info">
                      <span className="event-name">{step}</span>
                      <span className="event-time-meta">
                        {date} {time !== '—' && `at ${time}`}
                      </span>
                    </div>
                    <p className="event-description">
                      {step === 'Confirmed' && 'Order request received and details verified.'}
                      {step === 'Processing' && 'Item custom printing and packaging underway at fulfillment center.'}
                      {step === 'Shipped' && `Package handed over to ${deliveryPartner}. In-transit to delivery terminal.`}
                      {step === 'Delivered' && 'Shipment successfully signed for and received by recipient.'}
                      {step === 'Cancelled' && 'Order has been cancelled. Payment refund initiated.'}
                      {step === 'Return Initiated' && 'Return request approved. Courier agent assigned for pickup.'}
                      {step === 'Returned' && 'Product received back at our warehouse. Refund completed.'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="track-page-footer">
          <button className="back-btn-track" onClick={() => navigate('/orders')}>
            Back to My Orders
          </button>
        </div>
      </div>
    </div>
  );
}
