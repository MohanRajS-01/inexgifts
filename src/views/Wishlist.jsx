import React from 'react';
import { products } from '../data/products';

export default function Wishlist({ setView, wishlist, toggleWishlist, setSelectedProductId, addToCart }) {
  const listItems = wishlist.map(id => products[id]).filter(Boolean);

  const handleProductClick = (id) => {
    setSelectedProductId(id);
    setView('product');
  };

  const handleAddToCart = (item) => {
    addToCart({ id: item.id, name: item.name, price: item.price, original: item.original, img: item.img });
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="main-content" style={{ paddingBottom: '20px' }}>
      {/* Header */}
      <header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#FFFFFF', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #E5E7EB' }}>
        <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="header-btn" onClick={() => setView('home')} aria-label="Go back" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E5E7EB', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1F2937' }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <span className="header-title" style={{ fontSize: '18px', fontWeight: 700 }}>My Wishlist</span>
        </div>
        <span style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 600 }}>{listItems.length} items</span>
      </header>

      {/* Grid List */}
      {listItems.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', padding: '16px 16px 20px' }}>
          {listItems.map((item, idx) => (
            <div 
              key={item.id} 
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                overflow: 'hidden',
                position: 'relative',
                display: 'block',
                cursor: 'pointer',
                animation: 'fadeInUp 0.4s ease backwards'
              }}
              onClick={() => handleProductClick(item.id)}
            >
              {/* Product Image */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1' }}>
                <img src={`/assets/images/products/${item.img}`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    color: '#EF4444',
                    fontSize: '18px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(item.id);
                  }}
                  aria-label="Remove from wishlist"
                >
                  ♥
                </button>
              </div>

              {/* Info */}
              <div style={{ padding: '12px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '4px' }}>{item.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '6px' }}>
                  <span style={{ color: '#F59E0B', fontSize: '10px' }}>★</span>
                  <span style={{ fontSize: '10px', fontWeight: 600 }}>{item.rating}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700 }}>₹{item.price}</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF', textDecoration: 'line-through' }}>₹{item.original}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    background: '#EEF2FF',
                    color: '#4F46E5',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  className="wishlist-add-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px', color: '#E5E7EB' }}>♥</div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1F2937', marginBottom: '8px' }}>Your wishlist is empty</h3>
          <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '24px', maxWidth: '280px' }}>Explore our store and tap the heart icon to save gifts you love here.</p>
          <button 
            onClick={() => setView('gifts')}
            style={{
              padding: '12px 28px',
              background: '#4F46E5',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
}
