import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { orders } from '../data/orders';
import '../styles/ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find corresponding order from database
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="details-not-found">
        <Header title="Order Details" />
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
    description,
    price,
    quantity,
    date,
    status,
    image,
    deliveryAddress,
    paymentMethod
  } = order;

  // Format currency
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Badge configuration
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

  return (
    <div className="product-details-container">
      <Header title="Order Details" />

      <div className="details-card">
        {/* Top order metadata */}
        <div className="details-header-row">
          <div className="meta-info">
            <h2>Order #{orderNumber}</h2>
            <p>Placed on {date}</p>
          </div>
          <span className={`status-badge ${badgeClass}`}>{badgeLabel}</span>
        </div>

        {/* Two column grid content */}
        <div className="details-body-grid">
          {/* Column 1: Image & Basic Description */}
          <div className="details-product-section">
            <img src={image} alt={productName} className="large-product-image" />
            <div className="product-text-details">
              <h3 className="product-title">{productName}</h3>
              <p className="product-desc">{description}</p>
              
              <div className="price-math-row">
                <div className="math-item">
                  <span className="math-label">Price</span>
                  <span className="math-value">{formatPrice(price)}</span>
                </div>
                <div className="math-item">
                  <span className="math-label">Quantity</span>
                  <span className="math-value">{quantity}</span>
                </div>
                <div className="math-item total">
                  <span className="math-label">Total Amount</span>
                  <span className="math-value-total">{formatPrice(price * quantity)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Order coordinates, shipping, and billing */}
          <div className="details-delivery-section">
            {/* Delivery address details */}
            <div className="shipping-address-box">
              <h4 className="section-subtitle">Delivery Address</h4>
              <div className="address-block">
                <p className="recipient-name">{deliveryAddress.name}</p>
                <p className="address-line">{deliveryAddress.line1}</p>
                {deliveryAddress.line2 && <p className="address-line">{deliveryAddress.line2}</p>}
                <p className="address-line">
                  {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}
                </p>
                <p className="recipient-phone">
                  <span className="label-bold">Phone:</span> {deliveryAddress.phone}
                </p>
              </div>
            </div>

            {/* Billing details */}
            <div className="billing-meta-box">
              <h4 className="section-subtitle">Payment Details</h4>
              <div className="payment-block">
                <div className="payment-row">
                  <span className="payment-label">Payment Method</span>
                  <span className="payment-value">{paymentMethod}</span>
                </div>
                <div className="payment-row">
                  <span className="payment-label">Transaction Status</span>
                  <span className="payment-value success">Successful</span>
                </div>
              </div>
            </div>

            {/* Actions for this order details screen */}
            <div className="details-actions">
              {(status === 'Processing' || status === 'Shipped') && (
                <button
                  className="track-order-action-btn"
                  onClick={() => navigate(`/track-order/${id}`)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Track Real-time Shipment</span>
                </button>
              )}
              <button className="back-btn-details" onClick={() => navigate('/orders')}>
                Back to Orders List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
