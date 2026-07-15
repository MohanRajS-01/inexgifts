import React, { useState } from 'react';

export default function Cart({ cart, setCart, setView }) {
  const [couponInput, setCouponInput] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const COUPON_DISCOUNT = 0.20;

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setCouponApplied(false);
  };

  const handleApplyCoupon = () => {
    if (couponInput.trim().toUpperCase() === 'GIFT20') {
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code. Try GIFT20!');
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const originalSubtotal = cart.reduce((acc, item) => acc + (item.original * item.qty), 0);
  let discount = originalSubtotal - subtotal;
  let couponSavings = 0;

  if (couponApplied) {
    couponSavings = Math.round(subtotal * COUPON_DISCOUNT);
    discount += couponSavings;
  }

  const finalTotal = originalSubtotal - discount;

  const handleCheckout = () => {
    alert(`Order placed successfully for ₹${finalTotal.toLocaleString('en-IN')}!`);
    clearCart();
    setView('orders');
  };

  return (
    <div className="main-content" style={{ paddingBottom: '160px' }}>
      {/* Header */}
      <header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#FFFFFF', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #E5E7EB' }}>
        <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="header-btn" onClick={() => setView('gifts')} aria-label="Go back" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E5E7EB', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1F2937' }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <span className="header-title" style={{ fontSize: '18px', fontWeight: 700 }}>My Cart</span>
        </div>
        {cart.length > 0 && (
          <button className="clear-btn" onClick={clearCart} style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '13px', fontWeight: 600, cursor: 'pointer', padding: '8px 12px', borderRadius: '8px' }}>Clear All</button>
        )}
      </header>

      {/* Cart Desktop Columns Split Container */}
      <div className="cart-desktop-container">
        
        {/* Left Column: Cart Items list */}
        <div className="cart-items-column">
          <div className="cart-section" id="cartItems">
            {cart.length > 0 ? (
              cart.map((item, idx) => (
                <div key={item.id} className="cart-item" style={{ display: 'flex', gap: '14px', padding: '16px', borderBottom: '1px solid #E5E7EB', background: 'white' }}>
                  <img className="cart-item-img" src={`/assets/images/products/${item.img}`} alt={item.name} style={{ width: '90px', height: '90px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div className="cart-item-details" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                    <div className="cart-item-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <span className="cart-item-name" style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>{item.name}</span>
                      <button className="remove-btn" onClick={() => removeItem(item.id)} aria-label="Remove item" style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '4px' }}>
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg>
                      </button>
                    </div>
                    <div className="cart-item-bottom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="cart-item-price" style={{ fontSize: '16px', fontWeight: 700 }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                      <div className="qty-control" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
                        <button className="qty-btn" onClick={() => updateQty(item.id, -1)} disabled={item.qty <= 1} style={{ width: '34px', height: '34px', border: 'none', background: '#FFFFFF', cursor: item.qty <= 1 ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: 600, color: item.qty <= 1 ? '#E5E7EB' : '#4F46E5' }}>−</button>
                        <span className="qty-value" style={{ width: '36px', textAlign: 'center', fontSize: '14px', fontWeight: 600, borderLeft: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB', lineHeight: '34px' }}>{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateQty(item.id, 1)} style={{ width: '34px', height: '34px', border: 'none', background: '#FFFFFF', cursor: 'pointer', fontSize: '16px', fontWeight: 600, color: '#4F46E5' }}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-cart" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div className="empty-cart-icon" style={{ fontSize: '56px', marginBottom: '16px', opacity: 0.5 }}>🛒</div>
                <div className="empty-cart-text" style={{ fontSize: '16px', fontWeight: 600, color: '#1F2937', marginBottom: '6px' }}>Your cart is empty</div>
                <div className="empty-cart-sub" style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '24px' }}>Looks like you haven't added anything yet</div>
                <button className="empty-cart-btn" onClick={() => setView('gifts')} style={{ display: 'inline-block', padding: '12px 28px', background: '#4F46E5', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Browse Gifts</button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pricing & Coupon Summary */}
        {cart.length > 0 && (
          <div className="cart-summary-column" style={{ width: '100%' }}>
            {/* Coupon */}
            <div className="coupon-section" id="couponSection" style={{ background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
              <div className="coupon-title" style={{ fontSize: '14px', fontWeight: 700, color: '#1F2937', marginBottom: '12px' }}>Apply Coupon</div>
              <div className="coupon-input-row" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input 
                  type="text" 
                  className="coupon-input" 
                  placeholder="Enter coupon code" 
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  style={{ flex: 1, padding: '12px 14px', border: '1.5px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                />
                <button className="coupon-apply-btn" onClick={handleApplyCoupon} style={{ padding: '12px 20px', background: '#4F46E5', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Apply</button>
              </div>
              {!couponApplied && (
                <div className="coupon-chip" onClick={() => { setCouponInput('GIFT20'); setCouponApplied(true); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#EEF2FF', border: '1px dashed #4F46E5', borderRadius: '20px', fontSize: '12px', color: '#4F46E5', fontWeight: 500, cursor: 'pointer' }}>
                  <span className="coupon-chip-code" style={{ fontWeight: 700 }}>GIFT20</span> — Get 20% off
                </div>
              )}
              {couponApplied && (
                <div className="coupon-applied show" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'rgba(16,185,129,0.08)', borderRadius: '10px', fontSize: '13px', color: '#10B981', fontWeight: 500, marginTop: '8px' }}>
                  <svg width="16" height="16" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round"><path d="M14 2L6 14l-4-4"/></svg>
                  <span>Coupon GIFT20 applied! You save ₹{couponSavings}</span>
                </div>
              )}
            </div>

            {/* Price Summary */}
            <div className="price-section" id="priceSummary" style={{ background: '#FFFFFF', padding: '20px 16px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
              <div className="price-title" style={{ fontSize: '14px', fontWeight: 700, color: '#1F2937', marginBottom: '14px' }}>Price Details</div>
              <div className="price-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px' }}>
                <span className="price-label" style={{ color: '#6B7280' }}>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span className="price-value" style={{ fontWeight: 500 }}>₹{originalSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="price-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px' }}>
                <span className="price-label" style={{ color: '#6B7280' }}>Discount</span>
                <span className="price-value discount" style={{ color: '#10B981', fontWeight: 500 }}>-₹{discount.toLocaleString('en-IN')}</span>
              </div>
              <div className="price-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px' }}>
                <span className="price-label" style={{ color: '#6B7280' }}>Delivery</span>
                <span className="price-value free" style={{ color: '#10B981', fontWeight: 600 }}>FREE <span style={{ textDecoration: 'line-through', color: '#9CA3AF', fontSize: '12px', marginLeft: '6px' }}>₹49</span></span>
              </div>
              <div className="price-divider" style={{ height: '1px', background: '#E5E7EB', margin: '8px 0' }}></div>
              <div className="price-total" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 0', fontSize: '16px', fontWeight: 700 }}>
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Checkout Button */}
      {cart.length > 0 && (
        <div className="checkout-bar" id="checkoutBar" style={{ position: 'fixed', bottom: '64px', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', background: '#FFFFFF', borderTop: '1px solid #E5E7EB', padding: '12px 16px', zIndex: 100 }}>
          <button className="checkout-btn" onClick={handleCheckout} style={{ width: '100%', padding: '16px', background: '#4F46E5', color: '#FFFFFF', border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>Proceed to Checkout (₹{finalTotal.toLocaleString('en-IN')})</button>
        </div>
      )}
    </div>
  );
}
