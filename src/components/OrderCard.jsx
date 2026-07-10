import React from 'react';
import Button from './Button';
import Timeline from './Timeline';

const SVG = {
  dots:  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>,
  file:  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>,
  pin:   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  refresh: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>,
};

export const OrderCard = ({ order, onViewDetails, onTrackOrder, onBuyAgain, onReorder, onOptionsClick }) => {
  const deliveryClass = order.deliveryType === 'delivered' ? 'delivery-completed' : 'est-delivery';
  const actionsClass = order.actions.length === 1 ? 'order-card-actions-wrapper single-action-btn' : 'order-card-actions-wrapper';

  return (
    <article className="order-card-wrapper" data-status={order.status}>
      <div className="order-card-header">
        <span className={`status-indicator-badge ${order.badgeClass}`}>{order.badgeText}</span>
        <button className="card-options-menu-btn" onClick={onOptionsClick} aria-label="Order Options">
          {SVG.dots}
        </button>
      </div>

      <div className="order-card-main">
        <div className="product-info-block">
          <img src={order.image} alt={order.imageAlt} className="product-thumbnail" />
          <div className="product-titles">
            <h3 className="order-tracking-num">Order #{order.id}</h3>
            <p className="order-placed-timestamp">Placed on {order.placedDate}</p>
            <h4 className="product-display-title">{order.product}</h4>
            <p className="product-display-subtitle">{order.subtitle}</p>
            <span className="product-display-price-mobile">{order.price}</span>
          </div>
        </div>
        <div className="pricing-meta-block">
          <div className="price-quantity-row">
            <span className="price-display-val">{order.price}</span>
            <span className="quantity-display-val">{order.quantity}</span>
          </div>
          {order.deliveryType !== 'none' && (
            <div className={`delivery-status-indicator ${deliveryClass}`}>
              <span className="delivery-status-label">{order.deliveryLabel}</span>
              <span className="delivery-status-date">{order.deliveryDate}</span>
            </div>
          )}
        </div>
      </div>

      {order.showTimeline && (
        <Timeline progress={order.timelineProgress} steps={order.timelineSteps} />
      )}

      <div className={actionsClass}>
        {order.actions.map((act) => {
          if (act === 'view') {
            return (
              <Button key="view" variant="outline" onClick={onViewDetails} ariaLabel="View Details" icon={SVG.file}>
                View Details
              </Button>
            );
          }
          if (act === 'track') {
            return (
              <Button key="track" variant="filled" onClick={onTrackOrder} ariaLabel="Track Order" icon={SVG.pin}>
                Track Order
              </Button>
            );
          }
          if (act === 'buyagain') {
            return (
              <Button key="buyagain" variant="blueOutline" onClick={onBuyAgain} ariaLabel="Buy Again" icon={SVG.refresh}>
                Buy Again
              </Button>
            );
          }
          if (act === 'reorder') {
            return (
              <Button key="reorder" variant="blueOutline" onClick={onReorder} ariaLabel="Reorder" icon={SVG.refresh}>
                Reorder
              </Button>
            );
          }
          return null;
        })}
      </div>
    </article>
  );
};

export default OrderCard;
