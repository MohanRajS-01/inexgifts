import React from 'react';
import { products } from '../data/products';

export default function Home({ setView, setSelectedProductId, wishlist, toggleWishlist, cart }) {
  const trendingIds = [1, 2, 3, 5];
  const bestsellerIds = [4, 6, 9, 7];

  const categories = [
    { id: 'gift-sets', name: 'Gift Sets', img: 'gift_sets.jpg' },
    { id: 'mugs', name: 'Mugs', img: 'mugs.jpg' },
    { id: 'photo-frames', name: 'Photo Frames', img: 'photo_frames.jpg' },
    { id: 'cushions', name: 'Cushions', img: 'cushions.jpg' },
    { id: 'chocolates', name: 'Chocolates', img: 'chocolates.jpg' },
    { id: 'keychains', name: 'Keychains', img: 'keychains.jpg' }
  ];

  const handleProductClick = (id) => {
    setSelectedProductId(id);
    setView('product');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="main-content">
      {/* Header */}
      <header className="home-header fade-in-section">
        <div className="greeting">
          <h1>Hello, User! 👋</h1>
          <p>Find the perfect gift today</p>
        </div>
        <div className="header-actions">
          <button className="header-icon-btn" aria-label="Notifications" onClick={() => alert('No new notifications')}>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            <span className="notification-dot"></span>
          </button>
          <button className="header-icon-btn" aria-label="Cart" onClick={() => setView('cart')}>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="search-bar fade-in-section" onClick={() => setView('gifts')}>
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input type="text" placeholder="Search for perfect gifts..." readOnly />
        <button className="camera-btn" aria-label="Search by image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px' }}>
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>
      </div>



      {/* Shop by Category */}
      <div className="section-header fade-in-section">
        <h2>Shop by Category</h2>
        <span style={{ cursor: 'pointer', color: '#4F46E5', fontSize: '13px', fontWeight: 600 }} onClick={() => setView('categories')}>See All →</span>
      </div>
      <div className="categories-scroll fade-in-section">
        {categories.map(cat => (
          <div key={cat.id} className="category-item" onClick={() => setView('gifts')}>
            <div className="category-icon">
              <img src={`/assets/images/categories/${cat.img}`} alt={cat.name} />
            </div>
            <span className="category-label">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Trending Gifts */}
      <div className="section-header fade-in-section">
        <h2>Trending Gifts 🔥</h2>
        <span style={{ cursor: 'pointer', color: '#4F46E5', fontSize: '13px', fontWeight: 600 }} onClick={() => setView('gifts')}>View All</span>
      </div>
      <div className="products-scroll fade-in-section">
        {trendingIds.map(id => {
          const item = products[id];
          return (
            <div key={id} className="product-card" onClick={() => handleProductClick(id)}>
              <div className="product-card-image">
                <img src={`/assets/images/products/${item.img}`} alt={item.name} />
                {item.badge && <span className="discount-badge">{item.badge === 'bestseller' ? 'Best Seller' : (item.badge === 'new-arrival' ? 'New' : 'Popular')}</span>}
              </div>
              <div className="product-card-info">
                <h3 className="product-card-title">{item.name}</h3>
                <div className="product-card-rating">
                  <svg fill="currentColor" viewBox="0 0 24 24" style={{ width: '12px', height: '12px', color: '#F59E0B' }}>
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span>{item.rating}</span>
                </div>
                <div className="product-card-price">
                  <span className="price-current">₹{item.price}</span>
                  <span className="price-original">₹{item.original}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Best Sellers */}
      <div className="section-header fade-in-section">
        <h2>Best Sellers ⭐</h2>
        <span style={{ cursor: 'pointer', color: '#4F46E5', fontSize: '13px', fontWeight: 600 }} onClick={() => setView('gifts')}>View All</span>
      </div>
      <div className="products-scroll fade-in-section">
        {bestsellerIds.map(id => {
          const item = products[id];
          return (
            <div key={id} className="product-card" onClick={() => handleProductClick(id)}>
              <div className="product-card-image">
                <img src={`/assets/images/products/${item.img}`} alt={item.name} />
                {item.badge && <span className="discount-badge">{item.badge === 'bestseller' ? 'Best Seller' : (item.badge === 'new-arrival' ? 'New' : 'Popular')}</span>}
              </div>
              <div className="product-card-info">
                <h3 className="product-card-title">{item.name}</h3>
                <div className="product-card-rating">
                  <svg fill="currentColor" viewBox="0 0 24 24" style={{ width: '12px', height: '12px', color: '#F59E0B' }}>
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span>{item.rating}</span>
                </div>
                <div className="product-card-price">
                  <span className="price-current">₹{item.price}</span>
                  <span className="price-original">₹{item.original}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery Banner */}
      <div className="delivery-banner fade-in-section" onClick={() => setView('gifts')} style={{ cursor: 'pointer' }}>
        <div className="delivery-icon">🚚</div>
        <div className="delivery-info">
          <h3 className="delivery-text">Free Delivery on orders above ₹499</h3>
          <p className="delivery-subtext">Order now and save more!</p>
        </div>
        <button className="delivery-btn">
          Order Now
        </button>
      </div>
    </div>
  );
}
