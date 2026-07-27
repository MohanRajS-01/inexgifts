import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderProgress from './OrderProgress';
import '../styles/OrderCard.css';

export default function OrderCard({ order }) {
  const navigate = useNavigate();
  const {
    id,
    orderNumber,
    productName,
    description,
    price,
    quantity,
    date,
    status,
    image,
    estimatedDelivery,
    deliveredDate,
    returnedDate,
    timeline
  } = order;

  // Format currency
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Determine Badge Label and Style Class
  let badgeLabel = status;
  let badgeClass = '';
  if (status === 'Processing') {
    badgeLabel = 'Order Placed';
    badgeClass = 'badge-processing';
  } else if (status === 'Shipped') {
    badgeLabel = 'Shipped';
    badgeClass = 'badge-shipped';
  } else if (status === 'Delivered') {
    badgeLabel = 'Delivered';
    badgeClass = 'badge-delivered';
  } else if (status === 'Cancelled') {
    badgeLabel = 'Cancelled';
    badgeClass = 'badge-cancelled';
  } else if (status === 'Return') {
    badgeLabel = 'Returned';
    badgeClass = 'badge-return';
  }

  // Check if we show progress tracker
  const showProgress = status === 'Processing' || status === 'Shipped';

  return (
    <div className="order-card">
      {/* Top Bar of Card (Badge & 3-Dot Options) */}
      <div className="card-top-row">
        <span className={`status-badge ${badgeClass}`}>{badgeLabel}</span>
        <button className="options-btn" aria-label="Order Options">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="options-icon">
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="12" cy="5" r="1.5"></circle>
            <circle cx="12" cy="19" r="1.5"></circle>
          </svg>
        </button>
      </div>

      {/* Main Card Content Grid */}
      <div className="card-main-grid">
        {/* Left Side: Product Image & Basic Details */}
        <div className="product-details-col">
          <img src={image} alt={productName} className="product-card-image" />
          <div className="product-info-block">
            <div className="order-id-meta">
              <span className="order-num-label">Order #{orderNumber}</span>
              <span className="order-date-label">Placed on {date}</span>
            </div>
            <h3 className="product-title-label">{productName}</h3>
            <p className="product-desc-label">{description}</p>
            <span className="product-unit-price">{formatPrice(price)}</span>
          </div>
        </div>

        {/* Center Side: Progress Stepper */}
        {showProgress && (
          <div className="progress-stepper-col">
            <OrderProgress status={status} timeline={timeline} />
          </div>
        )}

        {/* Right Side: Total Price and Delivery Status */}
        <div className="delivery-status-col">
          <div className="price-summary-box">
            <span className="total-order-price">{formatPrice(price * quantity)}</span>
            <span className="total-items-count">{quantity} {quantity === 1 ? 'Item' : 'Items'}</span>
          </div>
          
          <div className="delivery-date-indicator">
            {status === 'Processing' && (
              <>
                <span className="deliv-status-title">Est. Delivery</span>
                <span className="deliv-date-value deliv-active">{estimatedDelivery}</span>
              </>
            )}
            {status === 'Shipped' && (
              <>
                <span className="deliv-status-title">Est. Delivery</span>
                <span className="deliv-date-value deliv-active">{estimatedDelivery}</span>
              </>
            )}
            {status === 'Delivered' && (
              <>
                <span className="deliv-status-title">Delivered on</span>
                <span className="deliv-date-value deliv-completed">{deliveredDate}</span>
              </>
            )}
            {status === 'Return' && (
              <>
                <span className="deliv-status-title">Returned on</span>
                <span className="deliv-date-value deliv-returned">{returnedDate}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Buttons (Bottom) */}
      {(status !== 'Cancelled') && (
        <div className="card-actions-row">
          <button 
            className="action-btn-outline" 
            onClick={() => navigate(`/product-details/${id}`)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>View Details</span>
          </button>

          {(status === 'Processing' || status === 'Shipped') && (
            <button 
              className="action-btn-solid" 
              onClick={() => navigate(`/track-order/${id}`)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Track Order</span>
            </button>
          )}

          {status === 'Delivered' && (
            <button 
              className="action-btn-outline-primary" 
              onClick={() => alert(`Added "${productName}" to cart again!`)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
              </svg>
              <span>Buy Again</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
