import React, { useState, useMemo } from 'react';
import { products } from '../data/products';

export default function Gifts({ setView, setSelectedProductId, wishlist, toggleWishlist, cart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Popular');

  const categories = [
    { id: 'all', name: 'All', icon: true },
    { id: 'gift-sets', name: 'Gift Sets', img: 'gift_sets.jpg' },
    { id: 'mugs', name: 'Mugs', img: 'mugs.jpg' },
    { id: 'photo-frames', name: 'Photo Frames', img: 'photo_frames.jpg' },
    { id: 'cushions', name: 'Cushions', img: 'cushions.jpg' },
    { id: 'chocolates', name: 'Chocolates', img: 'chocolates.jpg' },
    { id: 'keychains', name: 'Keychains', img: 'keychains.jpg' }
  ];

  // Category mapping to product lists
  const categoryMap = {
    'all': [1, 2, 3, 4, 5, 6, 7, 8, 9],
    'gift-sets': [3],
    'mugs': [5],
    'photo-frames': [4],
    'cushions': [2],
    'chocolates': [9],
    'keychains': [7]
  };

  const handleProductClick = (id) => {
    setSelectedProductId(id);
    setView('product');
  };

  const handleSortToggle = () => {
    const options = ['Popular', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Rating'];
    const currentIndex = options.indexOf(sortOption);
    const nextIndex = (currentIndex + 1) % options.length;
    setSortOption(options[nextIndex]);
  };

  const filteredProducts = useMemo(() => {
    const listIds = categoryMap[activeCategory] || [];
    let items = listIds.map(id => products[id]);

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q));
    }

    // Sort sorting
    if (sortOption === 'Price: Low to High') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price: High to Low') {
      items.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Rating') {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [activeCategory, searchQuery, sortOption]);

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="main-content" style={{ paddingBottom: '20px' }}>
      {/* Top Header */}
      <header className="top-header">
        <button className="header-btn back-btn" aria-label="Go back" onClick={() => setView('home')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h1 className="header-title">Gifts</h1>
        <div className="header-actions">
          <button className="header-btn" aria-label="Wishlist" onClick={() => setView('wishlist')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button className="header-btn cart-btn" aria-label="Shopping cart" onClick={() => setView('cart')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar" style={{ display: 'flex', alignItems: 'center', background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: '12px', padding: '0 12px', height: '44px', flex: 1 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for gifts, frames, mugs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: '14px' }}
          />
          <button className="camera-btn" aria-label="Search by image">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </button>
        </div>
        <button className="sort-header-btn" onClick={handleSortToggle} style={{ marginLeft: '10px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="16" y2="12"></line>
            <line x1="4" y1="18" x2="12" y2="18"></line>
          </svg>
          Sort
        </button>
      </div>

      {/* Categories */}
      <div className="categories-section">
        <div className="categories-scroll">
          {categories.map(cat => (
            <button 
              key={cat.id} 
              className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <div className={`category-icon-wrapper ${activeCategory === cat.id ? 'active' : ''}`}>
                {cat.icon ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="8" height="8" rx="1.5"></rect>
                    <rect x="13" y="3" width="8" height="8" rx="1.5"></rect>
                    <rect x="3" y="13" width="8" height="8" rx="1.5"></rect>
                    <rect x="13" y="13" width="8" height="8" rx="1.5"></rect>
                  </svg>
                ) : (
                  <img src={`/assets/images/categories/${cat.img}`} alt={cat.name} />
                )}
              </div>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-scroll">
          <button className="filter-chip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            Filters
          </button>
          <button className="filter-chip" onClick={() => alert('Filter applied')}>Price ▾</button>
          <button className="filter-chip" onClick={() => alert('Filter applied')}>Occasion ▾</button>
          <button className="filter-chip" onClick={() => alert('Filter applied')}>Personalization ▾</button>
          <button className="filter-chip" onClick={() => alert('Filter applied')}>Rating ▾</button>
        </div>
      </div>

      {/* Results Header */}
      <div className="results-header">
        <span className="results-count">{filteredProducts.length}+ gifts found</span>
        <div className="results-actions">
          <button className="sort-by-btn" onClick={handleSortToggle}>
            Sort by: <strong>{sortOption}</strong>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <button className="grid-toggle-btn" aria-label="Toggle grid view">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
            </svg>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map(product => {
          const isWishlisted = wishlist.includes(product.id);
          return (
            <div 
              key={product.id} 
              className="product-card" 
              onClick={() => handleProductClick(product.id)}
              style={{ animation: 'fadeInUp 0.4s ease backwards' }}
            >
              <div className="product-image-wrapper">
                <img 
                  className="product-image" 
                  src={`/assets/images/products/${product.img}`} 
                  alt={product.name}
                  loading="lazy"
                />
                {product.badge && <span className={`product-badge ${product.badge}`}>{product.badge === 'new-arrival' ? 'New Arrival' : product.badge}</span>}
                <button 
                  className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  aria-label="Add to wishlist"
                >
                  <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <div className="product-rating">
                  <span className="star-icon">★</span>
                  <span className="rating-value">{product.rating}</span>
                  <span className="rating-count">({product.reviews})</span>
                </div>
                <div className="product-pricing">
                  <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="original-price">₹{product.original.toLocaleString('en-IN')}</span>
                  <span className="discount-badge">{product.off}</span>
                </div>
                <div className="delivery-info">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{product.delivery}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customize Banner */}
      <div className="customize-banner" onClick={() => setView('customize')} style={{ cursor: 'pointer' }}>
        <div className="banner-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="7" width="20" height="14" rx="2" fill="#FFD93D"/>
            <path d="M12 7V3" stroke="#FF6B6B" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="2" r="1.5" fill="#FF6B6B"/>
            <path d="M2 11h20" stroke="#FF9F43" stroke-width="1.5"/>
            <circle cx="8" cy="14" r="1.5" fill="#FF6B6B"/>
            <circle cx="16" cy="14" r="1.5" fill="#6C5CE7"/>
            <circle cx="12" cy="17" r="1.5" fill="#00B894"/>
          </svg>
        </div>
        <div className="banner-text">
          <p className="banner-title">Can't find what you're looking for?</p>
          <p className="banner-subtitle">Explore customized gifts made just for your loved ones.</p>
        </div>
        <button className="customize-btn">Customize Now</button>
      </div>
    </div>
  );
}
