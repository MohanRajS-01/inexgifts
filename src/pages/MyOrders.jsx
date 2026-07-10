import React from 'react';
import useOrders from '../hooks/useOrders';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import TrackBanner from '../components/TrackBanner';
import OrderCard from '../components/OrderCard';
import BottomNavigation from '../components/BottomNavigation';
import Modal from '../components/Modal';
import Timeline from '../components/Timeline';
import Toast from '../components/Toast';

export const MyOrders = () => {
  const {
    filteredOrders,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedOrder,
    setSelectedOrder,
    trackedOrder,
    setTrackedOrder,
    sidebarOpen,
    setSidebarOpen,
    searchActive,
    setSearchActive,
    toasts,
    addToast
  } = useOrders();

  return (
    <div className="app-layout">
      {/* Left Sidebar */}
      <Sidebar isOpen={sidebarOpen} onMenuClick={(label) => addToast(`Navigated to ${label}`)} />

      {/* Main Body Section */}
      <div className="main-wrapper">
        <Header
          searchActive={searchActive}
          setSearchActive={setSearchActive}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onBackClick={() => addToast('Navigated back.')}
          onCartClick={() => addToast('Opening shopping cart…')}
          onProfileClick={() => addToast('Opening profile details…')}
          onHamburgerClick={() => setSidebarOpen(true)}
        />

        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="content">
          <TrackBanner onLearnMoreClick={() => addToast('Opening tracking guide…')} />

          {filteredOrders.length === 0 ? (
            <div className="empty-state-card" id="emptyState">
              <div className="empty-state-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="2" y2="22"></line>
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3>No Orders Found</h3>
              <p>We couldn't find any orders matching this category.</p>
            </div>
          ) : (
            <div className="orders-grid-container" id="ordersGrid">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onViewDetails={() => setSelectedOrder(order)}
                  onTrackOrder={() => setTrackedOrder(order)}
                  onBuyAgain={() => addToast('Product added to cart.')}
                  onReorder={() => addToast('Order added to cart.')}
                  onOptionsClick={() => addToast('Options menu opened')}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation activeTab="Orders" onNavClick={(label) => addToast(`Navigated to ${label}`)} />

      {/* Mobile Sidebar overlay */}
      <div
        className={`mobile-sidebar-overlay ${sidebarOpen ? 'overlay-visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* View Details Modal */}
      {selectedOrder && (
        <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title="Order Details">
          <div className="modal-product-section">
            <img src={selectedOrder.image} alt={selectedOrder.imageAlt} className="modal-product-thumbnail" />
            <div className="modal-product-details">
              <h3>{selectedOrder.product}</h3>
              <span className="order-id">Order #{selectedOrder.id}</span>
              <span style={{ color: 'var(--primary-color)', fontWeight: 700, fontSize: '16px', marginTop: '4px', display: 'inline-block' }}>
                {selectedOrder.price}
              </span>
            </div>
          </div>

          <div className="modal-details-grid">
            <div className="modal-detail-item">
              <span className="modal-detail-label">Order Date</span>
              <span className="modal-detail-value">{selectedOrder.placedDate}</span>
            </div>
            <div className="modal-detail-item">
              <span className="modal-detail-label">Quantity</span>
              <span className="modal-detail-value">{selectedOrder.quantity}</span>
            </div>
            <div className="modal-detail-item" style={{ gridColumn: 'span 2' }}>
              <span className="modal-detail-label">Personalization Details</span>
              <span className="modal-detail-value" style={{ fontStyle: 'italic', color: 'var(--color-secondary)' }}>
                {selectedOrder.subtitle}
              </span>
            </div>
            <div className="modal-detail-item">
              <span className="modal-detail-label">Delivery Status</span>
              <span className={`modal-detail-value status-badge ${selectedOrder.badgeClass}`}>
                {selectedOrder.badgeText}
              </span>
            </div>
            <div className="modal-detail-item">
              <span className="modal-detail-label">Estimated/Actual Delivery</span>
              <span className="modal-detail-value">{selectedOrder.deliveryDate || 'N/A'}</span>
            </div>
          </div>

          {selectedOrder.showTimeline ? (
            <div className="modal-timeline-section" style={{ marginTop: '20px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: 'var(--color-heading)' }}>
                Order Status Timeline
              </h4>
              <Timeline
                progress={selectedOrder.timelineProgress}
                steps={selectedOrder.timelineSteps}
                customStyle={{ lineBg: { left: '30px', right: '30px' } }}
              />
            </div>
          ) : (
            <div className="modal-timeline-section" style={{ marginTop: '20px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: 'var(--color-heading)' }}>
                Order Status Timeline
              </h4>
              <Timeline
                progress={
                  selectedOrder.status === 'delivered' ? 100 :
                  selectedOrder.status === 'shipped' ? 66.66 :
                  selectedOrder.status === 'cancelled' ? 100 :
                  selectedOrder.status === 'return' ? 100 : 33.33
                }
                steps={
                  selectedOrder.status === 'delivered' ? [
                    { label: 'Confirmed', date: selectedOrder.placedDate.split(',')[0], done: true },
                    { label: 'Processing', date: selectedOrder.placedDate.split(',')[0], done: true },
                    { label: 'Shipped', date: selectedOrder.placedDate.split(',')[0], done: true },
                    { label: 'Delivered', date: selectedOrder.deliveryDate, done: true }
                  ] : selectedOrder.status === 'shipped' ? [
                    { label: 'Confirmed', date: selectedOrder.placedDate.split(',')[0], done: true },
                    { label: 'Processing', date: selectedOrder.placedDate.split(',')[0], done: true },
                    { label: 'Shipped', date: selectedOrder.placedDate.split(',')[0], done: true },
                    { label: 'Delivered', date: '-', done: false }
                  ] : selectedOrder.status === 'cancelled' ? [
                    { label: 'Confirmed', date: selectedOrder.placedDate.split(',')[0], done: true },
                    { label: 'Cancelled', date: 'Cancelled', done: true }
                  ] : selectedOrder.status === 'return' ? [
                    { label: 'Delivered', date: selectedOrder.deliveryDate, done: true },
                    { label: 'Return Initiated', date: 'Returned', done: true }
                  ] : [
                    { label: 'Confirmed', date: selectedOrder.placedDate.split(',')[0], done: true },
                    { label: 'Processing', date: '-', done: true },
                    { label: 'Shipped', date: '-', done: false },
                    { label: 'Delivered', date: '-', done: false }
                  ]
                }
                customStyle={{ lineBg: { left: '30px', right: '30px' } }}
              />
            </div>
          )}
        </Modal>
      )}

      {/* Track Order Modal */}
      {trackedOrder && (
        <Modal isOpen={!!trackedOrder} onClose={() => setTrackedOrder(null)} title="Track Order">
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '4px' }}>
              Tracking Order #{trackedOrder.id}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-secondary)' }}>
              Product: <strong style={{ color: 'var(--color-heading)' }}>{trackedOrder.product}</strong>
            </p>
            <p style={{ fontSize: '13px', color: 'var(--color-secondary)', marginTop: '4px' }}>
              Current Status:{' '}
              <span className={`status-badge ${trackedOrder.badgeClass}`} style={{ display: 'inline-block', padding: '2px 8px', fontSize: '11px', borderRadius: '12px', fontWeight: 600, marginLeft: '4px' }}>
                {trackedOrder.badgeText}
              </span>
            </p>
          </div>

          <div style={{ margin: '30px 0' }}>
            <Timeline
              progress={
                trackedOrder.status === 'delivered' ? 100 :
                trackedOrder.status === 'shipped' ? 66.66 :
                trackedOrder.status === 'cancelled' ? 33.33 :
                trackedOrder.status === 'return' ? 100 : trackedOrder.timelineProgress || 33.33
              }
              steps={
                trackedOrder.status === 'delivered' ? [
                  { label: 'Confirmed', date: trackedOrder.placedDate.split(',')[0], done: true },
                  { label: 'Processing', date: trackedOrder.placedDate.split(',')[0], done: true },
                  { label: 'Shipped', date: trackedOrder.placedDate.split(',')[0], done: true },
                  { label: 'Delivered', date: trackedOrder.deliveryDate, done: true }
                ] : trackedOrder.status === 'shipped' ? [
                  { label: 'Confirmed', date: trackedOrder.placedDate.split(',')[0], done: true },
                  { label: 'Processing', date: trackedOrder.placedDate.split(',')[0], done: true },
                  { label: 'Shipped', date: trackedOrder.placedDate.split(',')[0], done: true },
                  { label: 'Delivered', date: '-', done: false }
                ] : trackedOrder.status === 'cancelled' ? [
                  { label: 'Confirmed', date: trackedOrder.placedDate.split(',')[0], done: true },
                  { label: 'Cancelled', date: 'Order Cancelled', done: true },
                  { label: 'Shipped', date: '-', done: false },
                  { label: 'Delivered', date: '-', done: false }
                ] : trackedOrder.status === 'return' ? [
                  { label: 'Confirmed', date: trackedOrder.placedDate.split(',')[0], done: true },
                  { label: 'Delivered', date: trackedOrder.deliveryDate, done: true },
                  { label: 'Return Initiated', date: 'Returned', done: true },
                  { label: 'Completed', date: 'Completed', done: true }
                ] : trackedOrder.timelineSteps || [
                  { label: 'Confirmed', date: trackedOrder.placedDate.split(',')[0], done: true },
                  { label: 'Processing', date: '-', done: true },
                  { label: 'Shipped', date: '-', done: false },
                  { label: 'Delivered', date: '-', done: false }
                ]
              }
              customStyle={{ lineBg: { left: '30px', right: '30px' } }}
            />
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-body)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              border: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span style={{ fontSize: '13px', color: 'var(--color-secondary)', fontWeight: 500 }}>Estimated Delivery</span>
            <span style={{ fontSize: '14px', color: 'var(--color-green)', fontWeight: 600 }}>
              {trackedOrder.deliveryDate || 'To be updated'}
            </span>
          </div>
        </Modal>
      )}

      {/* Toast Notifications Container */}
      <div className="toast-notifications-container" id="toastContainer">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
