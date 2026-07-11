import React, { useState } from 'react';

export default function Orders({ setView, setSelectedProductId }) {
  const [activeTab, setActiveTab] = useState('active');

  const orders = {
    active: [
      { id: 'GFT-2847', date: '8 Jul 2026', pid: 1, name: 'LED Photo Lamp', price: 999, qty: 1, img: 'led_photo_lamp.jpg', status: 'Out for Delivery', statusClass: 'status-orange', progress: 66.6 },
      { id: 'GFT-2839', date: '6 Jul 2026', pid: 5, name: 'Customized Mug', price: 598, qty: 2, img: 'customized_mug.jpg', status: 'Shipped', statusClass: 'status-blue', progress: 33.3 }
    ],
    delivered: [
      { id: 'GFT-2801', date: '28 Jun 2026', pid: 2, name: 'Photo Cushion', price: 499, qty: 1, img: 'photo_cushion.jpg', status: 'Delivered on 1 Jul', statusClass: 'status-green', progress: 100 },
      { id: 'GFT-2756', date: '15 Jun 2026', pid: 3, name: 'Premium Gift Set', price: 1499, qty: 1, img: 'premium_gift_set.jpg', status: 'Delivered on 19 Jun', statusClass: 'status-green', progress: 100 }
    ],
    cancelled: [
      { id: 'GFT-2780', date: '20 Jun 2026', pid: 8, name: 'Greeting Card', price: 149, qty: 1, img: 'greeting_card.jpg', status: 'Cancelled', statusClass: 'status-red', reason: 'Item was out of stock. A full refund of ₹149 has been processed.' }
    ]
  };

  const handleReorder = (pid) => {
    setSelectedProductId(pid);
    setView('product');
  };

  return (
    <div className="main-content" style={{ paddingBottom: '20px' }}>
      {/* Header */}
      <header className="header" id="orders-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 20px', background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 100 }}>
        <button className="header-back" onClick={() => setView('home')} aria-label="Go back" style={{ position: 'absolute', left: '16px', width: '38px', height: '38px', borderRadius: '12px', border: '1px solid #E5E7EB', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1F2937', cursor: 'pointer' }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h1 className="header-title" style={{ fontSize: '18px', fontWeight: 700 }}>My Orders</h1>
      </header>

      {/* Tabs */}
      <div className="tabs-container" style={{ background: '#FFFFFF', padding: '12px 20px 0', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: '71px', zIndex: 90 }}>
        <div className="tabs" style={{ display: 'flex', gap: 0 }}>
          {['active', 'delivered', 'cancelled'].map(tab => (
            <button 
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              style={{ flex: 1, padding: '12px 8px 14px', background: 'none', border: 'none', fontSize: '14px', fontWeight: activeTab === tab ? 600 : 500, color: activeTab === tab ? '#4F46E5' : '#9CA3AF', cursor: 'pointer', position: 'relative' }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}{' '}
              <span className="tab-badge" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '20px', height: '20px', padding: '0 6px', borderRadius: '10px', background: activeTab === tab ? '#4F46E5' : '#EEF2FF', color: activeTab === tab ? '#FFFFFF' : '#4F46E5', fontSize: '11px', fontWeight: 700, marginLeft: '6px' }}>{orders[tab].length}</span>
              {activeTab === tab && (
                <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '3px', background: '#4F46E5', borderRadius: '3px 3px 0 0' }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Panels */}
      <div className="tab-panels" style={{ padding: '16px 20px' }}>
        {orders[activeTab].map(order => (
          <article key={order.id} className="order-card" style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden', marginBottom: '16px', display: 'block' }}>
            <div className="order-card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #F3F4F6', background: '#F9FAFB' }}>
              <span className="order-id" style={{ fontSize: '13px', fontWeight: 600, color: '#4F46E5' }}>#{order.id}</span>
              <span className="order-date" style={{ fontSize: '12px', color: '#9CA3AF' }}>{order.date}</span>
            </div>
            <div className="order-card-body" style={{ display: 'flex', gap: '14px', padding: '16px' }}>
              <img src={`/assets/images/products/${order.img}`} alt={order.name} className="order-img" style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #E5E7EB' }} />
              <div className="order-info" style={{ flex: 1, minWidth: 0 }}>
                <div className="order-product-name" style={{ fontSize: '15px', fontWeight: 600, color: '#1F2937', marginBottom: '4px' }}>{order.name}</div>
                <div className="order-meta" style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                  <span className="order-price" style={{ fontSize: '16px', fontWeight: 700 }}>₹{order.price}</span>
                  <span className="order-qty" style={{ fontSize: '12px', color: '#9CA3AF', background: '#F3F4F6', padding: '2px 8px', borderRadius: '6px' }}>Qty: {order.qty}</span>
                </div>
                <span className={`order-status ${order.statusClass}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '8px' }}>
                  <span className="status-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span>
                  {order.status}
                </span>
              </div>
            </div>

            {/* Progress Bar for Active/Delivered Orders */}
            {activeTab !== 'cancelled' && (
              <div className="progress-track" style={{ padding: '16px 16px 6px', borderTop: '1px solid #F3F4F6' }}>
                <div className="progress-steps" style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', alignItems: 'center' }}>
                  <div style={{ position: 'absolute', top: '12px', left: '16px', right: '16px', height: '3px', background: '#E5E7EB', zIndex: 0 }} />
                  <div style={{ position: 'absolute', top: '12px', left: '16px', width: `calc(${order.progress}% - 10px)`, height: '3px', background: '#4F46E5', zIndex: 1 }} />
                  
                  <div className="progress-step completed" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, gap: '6px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#4F46E5', border: '2.5px solid #4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>✓</div>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#4F46E5' }}>Ordered</span>
                  </div>
                  <div className="progress-step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, gap: '6px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: order.progress >= 33.3 ? '#4F46E5' : '#FFFFFF', border: '2.5px solid #E5E7EB', borderColor: order.progress >= 33.3 ? '#4F46E5' : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>{order.progress >= 33.3 ? '✓' : ''}</div>
                    <span style={{ fontSize: '10px', fontWeight: order.progress >= 33.3 ? 600 : 500, color: order.progress >= 33.3 ? '#4F46E5' : '#9CA3AF' }}>Shipped</span>
                  </div>
                  <div className="progress-step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, gap: '6px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: order.progress >= 66.6 ? '#4F46E5' : '#FFFFFF', border: '2.5px solid #E5E7EB', borderColor: order.progress >= 66.6 ? '#4F46E5' : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>{order.progress >= 66.6 ? '✓' : ''}</div>
                    <span style={{ fontSize: '10px', fontWeight: order.progress >= 66.6 ? 600 : 500, color: order.progress >= 66.6 ? '#4F46E5' : '#9CA3AF' }}>Out for Delivery</span>
                  </div>
                  <div className="progress-step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, gap: '6px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: order.progress >= 100 ? '#4F46E5' : '#FFFFFF', border: '2.5px solid #E5E7EB', borderColor: order.progress >= 100 ? '#4F46E5' : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>{order.progress >= 100 ? '✓' : ''}</div>
                    <span style={{ fontSize: '10px', fontWeight: order.progress >= 100 ? 600 : 500, color: order.progress >= 100 ? '#4F46E5' : '#9CA3AF' }}>Delivered</span>
                  </div>
                </div>
              </div>
            )}

            {/* Reason for Cancelled */}
            {activeTab === 'cancelled' && (
              <div className="cancel-reason" style={{ padding: '0 16px 12px', fontSize: '12px', color: '#9CA3AF' }}>
                <span style={{ fontWeight: 500, color: '#6B7280' }}>Reason:</span> {order.reason}
              </div>
            )}

            <div className="order-actions" style={{ display: 'flex', gap: '10px', padding: '12px 16px 16px', borderTop: '1px solid #F3F4F6' }}>
              {activeTab === 'active' ? (
                <button className="btn-track" onClick={() => alert(`Tracking info for order #${order.id} will be sent to your phone!`)} style={{ flex: 1, padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#4F46E5', color: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Track Order</button>
              ) : activeTab === 'delivered' ? (
                <>
                  <button className="btn-rate" onClick={() => alert('Thank you for rating the product!')} style={{ flex: 1, padding: '10px 16px', borderRadius: '10px', border: '1.5px solid #F59E0B', background: '#FFFBEB', color: '#D97706', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Rate Product</button>
                  <button className="btn-reorder" onClick={() => handleReorder(order.pid)} style={{ flex: 1, padding: '10px 16px', borderRadius: '10px', border: '1.5px solid #4F46E5', background: '#EEF2FF', color: '#4F46E5', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Reorder</button>
                </>
              ) : (
                <button className="btn-reorder" onClick={() => handleReorder(order.pid)} style={{ flex: 1, padding: '10px 16px', borderRadius: '10px', border: '1.5px solid #4F46E5', background: '#EEF2FF', color: '#4F46E5', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Reorder</button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
