import React, { useState } from 'react';
import { products } from '../data/products';

export default function ProductDetail({ id, setView, wishlist, toggleWishlist, addToCart }) {
  const p = products[id] || products[1];
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const reviews = [
    { name: 'Priya Sharma', date: '2 days ago', stars: 5, comment: "Absolutely loved the quality! Ordered it for my husband's birthday and he was thrilled. The packaging was also very premium. Highly recommended!" },
    { name: 'Rahul Verma', date: '1 week ago', stars: 4, comment: 'Great product, delivered on time. The print quality is excellent and the build feels sturdy. Only giving 4 stars because the box had a small dent.' },
    { name: 'Ananya Gupta', date: '2 weeks ago', stars: 5, comment: 'This is my third order from this store and they never disappoint. Perfect gift for any occasion. Customer service was also very helpful!' }
  ];

  const similarIds = Object.keys(products)
    .map(Number)
    .filter(pid => pid !== p.id)
    .slice(0, 4);

  const isWishlisted = wishlist.includes(p.id);

  const handleAddToCart = () => {
    addToCart({ id: p.id, name: p.name, price: p.price, original: p.original, img: p.img });
    setView('cart');
  };

  const handleBuyNow = () => {
    addToCart({ id: p.id, name: p.name, price: p.price, original: p.original, img: p.img });
    setView('cart');
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.3;
    let stars = '';
    for (let i = 0; i < full; i++) stars += '★';
    if (hasHalf) stars += '★';
    const empty = 5 - full - (hasHalf ? 1 : 0);
    return (
      <span style={{ color: '#F59E0B' }}>
        {stars}
        <span style={{ opacity: 0.3 }}>{'★'.repeat(empty)}</span>
      </span>
    );
  };

  return (
    <div className="main-content" style={{ paddingBottom: '160px' }}>
      {/* Header */}
      <header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#FFFFFF', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #E5E7EB' }}>
        <div className="header-left">
          <button className="header-btn" onClick={() => setView('gifts')} aria-label="Go back" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E5E7EB', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1F2937' }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
        </div>
        <span className="header-title" style={{ fontSize: '16px', fontWeight: 700 }}>Product Details</span>
        <div className="header-right" style={{ display: 'flex', gap: '8px' }}>
          <button className="header-btn" aria-label="Share" onClick={() => alert('Link copied to clipboard!')} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E5E7EB', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1F2937' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="14" cy="3" r="2.5"/><circle cx="4" cy="9" r="2.5"/><circle cx="14" cy="15" r="2.5"/><line x1="6.2" y1="10.2" x2="11.8" y2="13.8"/><line x1="11.8" y1="4.2" x2="6.2" y2="7.8"/></svg>
          </button>
          <button className="header-btn" aria-label="Cart" onClick={() => setView('cart')} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E5E7EB', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1F2937' }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/><path d="M1 1h3l2.7 13.4a1 1 0 001 .8h9.7a1 1 0 001-.8L20 6H6"/></svg>
          </button>
        </div>
      </header>

      {/* Two-Column Detail Container */}
      <div className="product-detail-container">
        
        {/* Left Column: Image */}
        <div className="product-left-col">
          <div className="product-image-wrap" style={{ position: 'relative', background: '#FFFFFF' }}>
            <img src={`/assets/images/products/${p.img}`} alt={p.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
            <button 
              className={`wishlist-btn ${isWishlisted ? 'active' : ''}`} 
              onClick={() => toggleWishlist(p.id)}
              style={{ position: 'absolute', top: '16px', right: '16px', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: isWishlisted ? '#EF4444' : '#9CA3AF', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              {isWishlisted ? '♥' : '♡'}
            </button>
          </div>
        </div>

        {/* Right Column: Info & Specs */}
        <div className="product-right-col">
          {/* Product Info */}
          <div className="product-info" style={{ padding: '20px 16px', background: '#FFFFFF' }}>
            <h1 className="product-name" style={{ fontSize: '22px', fontWeight: 700, color: '#1F2937', marginBottom: '10px' }}>{p.name}</h1>
            <div className="rating-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span className="stars">{renderStars(p.rating)}</span>
              <span className="rating-num" style={{ fontWeight: 600, fontSize: '14px' }}>{p.rating}</span>
              <span className="rating-count" style={{ fontSize: '13px', color: '#9CA3AF' }}>({p.reviews} reviews)</span>
            </div>
            <div className="price-row" style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '12px' }}>
              <span className="current-price" style={{ fontSize: '28px', fontWeight: 700 }}>₹{p.price.toLocaleString('en-IN')}</span>
              <span className="original-price" style={{ fontSize: '16px', color: '#9CA3AF', textDecoration: 'line-through' }}>₹{p.original.toLocaleString('en-IN')}</span>
              <span className="discount-badge" style={{ fontSize: '13px', fontWeight: 600, color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '3px 10px', borderRadius: '20px' }}>{p.off}</span>
            </div>
            <div className="delivery-info" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280', marginBottom: '10px' }}>
              <svg width="16" height="16" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="14" height="10" rx="1"/><path d="M11 4V2a1 1 0 00-1-1H6a1 1 0 00-1 1v2"/></svg>
              Free delivery by Tomorrow, 10 PM
            </div>
            <div className="stock-badge" style={{ display: 'inline-flex', gap: '5px', fontSize: '13px', fontWeight: 500, color: '#10B981', background: 'rgba(16,185,129,0.08)', padding: '5px 12px', borderRadius: '20px', alignItems: 'center' }}>
              <span className="stock-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981' }}></span> In Stock
            </div>
          </div>

          {/* Description */}
          <div className="section" style={{ background: '#FFFFFF', marginTop: '8px', padding: '20px 16px' }}>
            <h2 className="section-title" style={{ fontSize: '16px', fontWeight: 700, color: '#1F2937', marginBottom: '14px' }}>Description</h2>
            <p className={`description-text ${isDescriptionExpanded ? 'expanded' : ''}`} style={{ fontSize: '14px', lineHeight: 1.7, color: '#6B7280', display: isDescriptionExpanded ? 'block' : '-webkit-box', WebkitLineClamp: isDescriptionExpanded ? 'none' : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {p.desc} This custom product is handcrafted with care using the finest materials available. Custom prints are laminated to prevent fading or damage. An ideal surprise gift for birthdays, anniversaries, and other special events that remains as a permanent keepsake for years.
            </p>
            <button className="read-more-btn" onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)} style={{ background: 'none', border: 'none', color: '#4F46E5', fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginTop: '8px', padding: 0 }}>
              {isDescriptionExpanded ? 'Read less' : 'Read more'}
            </button>
          </div>

          {/* Specifications */}
          <div className="section" style={{ background: '#FFFFFF', marginTop: '8px', padding: '20px 16px' }}>
            <h2 className="section-title" style={{ fontSize: '16px', fontWeight: 700, color: '#1F2937', marginBottom: '14px' }}>Specifications</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', color: '#6B7280' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}><td style={{ padding: '8px 0', fontWeight: 600, color: '#1F2937', width: '40%' }}>Material</td><td style={{ padding: '8px 0' }}>Premium Sourced Materials</td></tr>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}><td style={{ padding: '8px 0', fontWeight: 600, color: '#1F2937' }}>Personalization</td><td style={{ padding: '8px 0' }}>Yes (Photo & Text)</td></tr>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}><td style={{ padding: '8px 0', fontWeight: 600, color: '#1F2937' }}>Weight</td><td style={{ padding: '8px 0' }}>approx. 350 grams</td></tr>
                <tr><td style={{ padding: '8px 0', fontWeight: 600, color: '#1F2937' }}>Packaging</td><td style={{ padding: '8px 0' }}>Deluxe Gift Wrap Box Included</td></tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Customer Reviews */}
      <div className="section" style={{ background: '#FFFFFF', marginTop: '8px', padding: '20px 16px' }}>
        <h2 className="section-title" style={{ fontSize: '16px', fontWeight: 700, color: '#1F2937', marginBottom: '14px' }}>Customer Reviews</h2>
        <div className="avg-rating-box" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#F9FAFB', borderRadius: '14px', marginBottom: '16px' }}>
          <span className="avg-score" style={{ fontSize: '40px', fontWeight: 700 }}>{p.rating}</span>
          <div className="avg-details" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div className="avg-stars">{renderStars(p.rating)}</div>
            <span className="avg-count" style={{ fontSize: '13px', color: '#9CA3AF' }}>Based on {p.reviews} reviews</span>
          </div>
        </div>
        <div>
          {reviews.map((r, idx) => (
            <div key={idx} className="review-card" style={{ padding: '14px 0', borderBottom: idx < reviews.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
              <div className="review-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="reviewer-name" style={{ fontSize: '14px', fontWeight: 600 }}>{r.name}</span>
                <span className="review-date" style={{ fontSize: '12px', color: '#9CA3AF' }}>{r.date}</span>
              </div>
              <div className="review-stars" style={{ marginBottom: '6px' }}>{renderStars(r.stars)}</div>
              <p className="review-comment" style={{ fontSize: '13px', lineHeight: 1.6, color: '#6B7280' }}>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Products */}
      <div className="section" style={{ background: '#FFFFFF', marginTop: '8px', padding: '20px 16px' }}>
        <h2 className="section-title" style={{ fontSize: '16px', fontWeight: 700, color: '#1F2937', marginBottom: '14px' }}>Similar Products</h2>
        <div className="similar-scroll" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
          {similarIds.map(sid => {
            const s = products[sid];
            return (
              <div key={sid} className="similar-card" onClick={() => { setView('product'); setSelectedProductId(sid); window.scrollTo(0,0); }} style={{ minWidth: '140px', maxWidth: '140px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E5E7EB', overflow: 'hidden', cursor: 'pointer' }}>
                <img src={`/assets/images/products/${s.img}`} alt={s.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
                <div className="similar-card-info" style={{ padding: '10px' }}>
                  <div className="similar-card-name" style={{ fontSize: '12px', fontWeight: 600, color: '#1F2937', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                  <div className="similar-card-price" style={{ fontSize: '14px', fontWeight: 700 }}>₹{s.price}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="bottom-action" style={{ position: 'fixed', bottom: '64px', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', background: '#FFFFFF', borderTop: '1px solid #E5E7EB', padding: '12px 16px', display: 'flex', gap: '12px', zIndex: 100 }}>
        <button className="btn-add-cart" onClick={handleAddToCart} style={{ flex: 1, padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', background: '#4F46E5', color: '#FFFFFF', border: 'none', transition: 'background 0.2s' }}>Add to Cart</button>
        <button className="btn-buy-now" onClick={handleBuyNow} style={{ flex: 1, padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', background: '#FFFFFF', color: '#4F46E5', border: '2px solid #4F46E5', transition: 'all 0.2s' }}>Buy Now</button>
      </div>
    </div>
  );
}
