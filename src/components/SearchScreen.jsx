import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// ─── StatusBar ───────────────────────────────────────────────────────────────
export function StatusBar() {
  return (
    <div className="status-bar" id="statusBar">
      <div className="status-left">9:41</div>
      <div className="status-notch"></div>
      <div className="status-right">
        <svg className="status-icon" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="16" width="3" height="4" rx="0.5" />
          <rect x="7" y="12" width="3" height="8" rx="0.5" />
          <rect x="12" y="8" width="3" height="12" rx="0.5" />
          <rect x="17" y="3" width="3" height="17" rx="0.5" />
        </svg>
        <svg className="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.5 16.55a5 5 0 0 1 7 0" />
          <path d="M12 20h.01" />
        </svg>
        <div className="battery-container">
          <span>100</span>
          <div className="battery-body">
            <div className="battery-level"></div>
          </div>
          <div className="battery-cap"></div>
        </div>
      </div>
    </div>
  );
}


// ─── Header ──────────────────────────────────────────────────────────────────
export function Header({ 
  searchQuery, 
  setSearchQuery, 
  clearSearch, 
  cartCount,
  activeNav,
  setActiveNav
}) {
  return (
    <header className="app-header">
      <button 
        className="icon-btn back-btn" 
        aria-label="Go back"
        onClick={() => setActiveNav('home')}
        style={{ visibility: activeNav !== 'home' ? 'visible' : 'hidden' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>

      <div className="brand-logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span>FrameCraft</span>
      </div>

      <div className="search-bar-container">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input 
          type="text" 
          className="search-input" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..." 
        />
        {searchQuery && (
          <button className="clear-btn" aria-label="Clear search" onClick={clearSearch}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
        <button className="camera-btn" aria-label="Search by photo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>
      </div>

      <div className="desktop-nav-menu">
        {['home', 'categories', 'wishlist', 'orders', 'profile'].map((nav) => (
          <a 
            key={nav}
            href="#" 
            className={`desktop-nav-link ${activeNav === nav ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveNav(nav); }}
          >
            {nav.charAt(0).toUpperCase() + nav.slice(1)}
          </a>
        ))}
      </div>

      <button 
        className={`icon-btn cart-btn ${activeNav === 'cart' ? 'active' : ''}`} 
        aria-label="Shopping Cart"
        onClick={() => setActiveNav('cart')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <motion.span 
          key={cartCount}
          initial={{ scale: 0.2 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="cart-badge"
        >
          {cartCount}
        </motion.span>
      </button>
    </header>
  );
}


// ─── Sidebar ─────────────────────────────────────────────────────────────────
export function Sidebar({ filters, handleFilterChange }) {
  const FilterGroup = ({ title, options, prefix }) => (
    <div className="sidebar-filter-group">
      <h4>{title}</h4>
      {options.map((opt) => (
        <label key={opt.id} className="checkbox-option">
          <input 
            type="checkbox" 
            checked={!!filters[opt.id]}
            onChange={(e) => handleFilterChange(opt.id, e.target.checked)}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  );

  return (
    <aside className="desktop-sidebar">
      <FilterGroup 
        title="Price" 
        options={[
          { id: 'priceUnder500', label: 'Under ₹500' },
          { id: 'price500to1000', label: '₹500 - ₹1,000' },
          { id: 'priceOver1000', label: 'Over ₹1,000' }
        ]} 
      />
      <FilterGroup 
        title="Material" 
        options={[
          { id: 'matWooden', label: 'Wooden' },
          { id: 'matAcrylic', label: 'Acrylic' },
          { id: 'matLed', label: 'LED Glow Glass' },
          { id: 'matOther', label: 'Metal & Other' }
        ]} 
      />
      <FilterGroup 
        title="Rating" 
        options={[
          { id: 'ratingHigh', label: '4.5 ★ & above' },
          { id: 'ratingMedium', label: '4.0 ★ & above' }
        ]} 
      />
      <FilterGroup 
        title="Discount" 
        options={[
          { id: 'discount30', label: '30% and above' },
          { id: 'discount40', label: '40% and above' }
        ]} 
      />
    </aside>
  );
}


// ─── Categories ──────────────────────────────────────────────────────────────
const categoriesData = [
  { id: 'all', label: 'All', iconType: 'grid' },
  { id: 'collage', label: 'Collage Frames', img: '/assets/wooden_collage_frame.png' },
  { id: 'wooden', label: 'Wooden Frames', img: '/assets/wooden_personalized_frame.png' },
  { id: 'led', label: 'LED Frames', img: '/assets/led_frame.png' },
  { id: 'acrylic', label: 'Acrylic Frames', img: '/assets/acrylic_frame.png' },
  { id: 'couple', label: 'Couple Frames', img: '/assets/acrylic_frame.png' },
  { id: 'keychain', label: 'Keychains', img: '/assets/spotify_keychain.png' },
  { id: 'ring', label: 'Promise Rings', img: '/assets/couple_rings.png' },
  { id: 'love', label: 'Love Gifts', img: '/assets/love_gift_box.png' },
  { id: 'mug', label: 'Mugs', img: '/assets/custom_mug.png' },
  { id: 'cushion', label: 'Cushions', img: '/assets/photo_cushion.png' },
  { id: 'bouquet', label: 'Bouquets', img: '/assets/bouquet_flowers.png' },
  { id: 'chocolate', label: 'Chocolates', img: '/assets/chocolate_gift_box.png' },
  { id: 'hamper', label: 'Hampers', img: '/assets/hamper_gift_basket.png' },
  { id: 'teddy', label: 'Teddy Bears', img: '/assets/teddy_bear_plush.png' }
];

export function Categories({ activeCategory, setActiveCategory }) {
  return (
    <section className="horizontal-scroll categories-section">
      {categoriesData.map((cat) => (
        <div 
          key={cat.id} 
          className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
          onClick={() => setActiveCategory(cat.id)}
        >
          <div className={`category-circle ${cat.id === 'all' ? 'all-circle' : ''} ${['bouquet', 'chocolate', 'hamper', 'teddy'].includes(cat.id) ? 'cat-emoji-circle' : ''}`}>
            {cat.iconType === 'grid' ? (
              <div className="grid-icon-sim">
                <span></span><span></span><span></span><span></span>
              </div>
            ) : (
              <img src={cat.img} alt={cat.label} />
            )}
          </div>
          <span className="category-label">{cat.label}</span>
        </div>
      ))}
    </section>
  );
}


// ─── FilterTags ──────────────────────────────────────────────────────────────
export function FilterTags({ minPrice500, setMinPrice500, openFilterDrawer }) {
  const filterDropdowns = ['Price', 'Size', 'Material', 'Rating', 'Discount'];

  return (
    <section className="horizontal-scroll filters-section">
      <button className="filter-pill primary" onClick={openFilterDrawer}>
        <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <span>Filters</span>
      </button>

      {filterDropdowns.map(filter => (
        <button key={filter} className="filter-pill dropdown" onClick={() => openFilterDrawer(filter.toLowerCase())}>
          <span>{filter}</span>
          <svg className="chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      ))}

      <button 
        className={`filter-pill min500-pill ${minPrice500 ? 'active' : ''}`} 
        onClick={() => setMinPrice500(!minPrice500)}
      >
        <span>Min ₹500</span>
      </button>
    </section>
  );
}


// ─── StarRating (internal helper) ────────────────────────────────────────────
function StarRating({ rating }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="star-rating-row">
      <div className="stars-visual">
        {stars.map(star => {
          const filled = rating >= star;
          const partial = !filled && rating > star - 1;
          const fillPercent = partial ? Math.round((rating - (star - 1)) * 100) : filled ? 100 : 0;
          return (
            <span key={star} className="star-wrap">
              <svg viewBox="0 0 20 20" width="13" height="13">
                <defs>
                  <linearGradient id={`sg-${star}-${Math.round(rating * 10)}`}>
                    <stop offset={`${fillPercent}%`} stopColor="var(--star-color)" />
                    <stop offset={`${fillPercent}%`} stopColor="#e0e0e0" />
                  </linearGradient>
                </defs>
                <polygon
                  points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                  fill={`url(#sg-${star}-${Math.round(rating * 10)})`}
                  stroke="none"
                />
              </svg>
            </span>
          );
        })}
      </div>
      <span className="rating-num">{rating}</span>
    </div>
  );
}


// ─── ProductCard ─────────────────────────────────────────────────────────────
export function ProductCard({ product, addToCart, isWishlisted, toggleWishlist }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.2 }}
      layout
      className="product-card"
      data-category={product.category}
    >
      <div className="product-image-container">
        {product.badge && (
          <span className={`product-badge ${product.badge}`}>
            {product.badgeText}
          </span>
        )}

        <motion.button
          className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          whileTap={{ scale: 0.75 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist();
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={isWishlisted ? '#ff3b5c' : 'none'}
            stroke={isWishlisted ? '#ff3b5c' : 'currentColor'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </motion.button>

        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>

        <StarRating rating={product.rating} />

        <p className="rating-count-text">({product.ratingCount} ratings)</p>


        <div className="product-price-container">
          <span className="current-price">₹{product.price}</span>
          {product.originalPrice && (
            <span className="original-price">₹{product.originalPrice}</span>
          )}
          {product.discountPercent && (
            <span className="discount-percent">{product.discountPercent}</span>
          )}
        </div>

        <div
          className="delivery-info"
          dangerouslySetInnerHTML={{ __html: product.deliveryText }}
        />

        <motion.button
          className="add-to-cart-btn"
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart();
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}


// ─── BottomNav ───────────────────────────────────────────────────────────────
export function BottomNav({ activeNav, setActiveNav, wishlistCount }) {
  const navItems = [
    { id: 'home', label: 'Home', svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )},
    { id: 'categories', label: 'Categories', svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    )},
    { id: 'wishlist', label: 'Wishlist', svgClass: 'nav-heart-svg', svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-heart-svg">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    )},
    { id: 'orders', label: 'Orders', svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    )},
    { id: 'profile', label: 'Profile', svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )}
  ];

  return (
    <footer className="app-footer">
      <nav className="bottom-nav">
        {navItems.map(item => (
          <a 
            key={item.id} 
            href="#" 
            className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveNav(item.id); }}
            style={{ position: 'relative' }}
          >
            {item.svg}
            <span className="nav-label">{item.label}</span>
            {item.id === 'wishlist' && wishlistCount > 0 && (
              <motion.span 
                key={wishlistCount}
                initial={{ scale: 0.2 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="cart-badge"
                style={{ top: '-4px', right: '12px' }}
              >
                {wishlistCount}
              </motion.span>
            )}
          </a>
        ))}
      </nav>
    </footer>
  );
}


// ─── Drawers ─────────────────────────────────────────────────────────────────
export function Drawers({ 
  drawerOpen, 
  closeDrawers, 
  currentSort, 
  setCurrentSort, 
  filters, 
  handleFilterChange,
  activeFilterTab,
  setActiveFilterTab
}) {
  const isSortOpen = drawerOpen === 'sort';
  const isFilterOpen = drawerOpen === 'filter';

  return (
    <>
      {drawerOpen && <div className="drawer-overlay active" onClick={closeDrawers}></div>}

      <div className={`bottom-drawer ${isSortOpen ? 'active' : ''}`} id="sortDrawer">
        <div className="drawer-handle"></div>
        <div className="drawer-header">
          <h3>Sort By</h3>
          <button className="drawer-close" onClick={closeDrawers}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="drawer-content">
          {[
            { id: 'relevance', label: 'Relevance (Default)' },
            { id: 'price-low', label: 'Price: Low to High' },
            { id: 'price-high', label: 'Price: High to Low' },
            { id: 'rating', label: 'Customer Rating' },
            { id: 'popularity', label: 'Popularity' }
          ].map(opt => (
            <div 
              key={opt.id}
              className={`sort-option ${currentSort === opt.id ? 'active' : ''}`}
              onClick={() => { setCurrentSort(opt.id); closeDrawers(); }}
            >
              <span>{opt.label}</span>
              <div className="radio-sim">
                <div className="radio-sim-inner"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`bottom-drawer ${isFilterOpen ? 'active' : ''}`} id="filterDrawer">
        <div className="drawer-handle"></div>
        <div className="drawer-header">
          <h3>Filter Options</h3>
          <button className="drawer-close" onClick={closeDrawers}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="drawer-content filter-drawer-grid">
          <div className="filter-sidebar">
            {['price', 'material', 'rating', 'discount'].map(tab => (
              <div 
                key={tab}
                className={`sidebar-tab ${activeFilterTab === tab ? 'active' : ''}`}
                onClick={() => setActiveFilterTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </div>
            ))}
          </div>
          <div className="filter-options-pane">
            <div className={`pane-content ${activeFilterTab === 'price' ? 'active' : ''}`}>
              <label className="checkbox-option">
                <input type="checkbox" checked={!!filters['minPrice500']} onChange={(e) => handleFilterChange('minPrice500', e.target.checked)} />
                <span>Min ₹500 &amp; above</span>
              </label>
              <label className="checkbox-option">
                <input type="checkbox" checked={!!filters['priceUnder500']} onChange={(e) => handleFilterChange('priceUnder500', e.target.checked)} />
                <span>Under ₹500</span>
              </label>
              <label className="checkbox-option">
                <input type="checkbox" checked={!!filters['price500to1000']} onChange={(e) => handleFilterChange('price500to1000', e.target.checked)} />
                <span>₹500 - ₹1,000</span>
              </label>
              <label className="checkbox-option">
                <input type="checkbox" checked={!!filters['priceOver1000']} onChange={(e) => handleFilterChange('priceOver1000', e.target.checked)} />
                <span>Over ₹1,000</span>
              </label>
            </div>
            <div className={`pane-content ${activeFilterTab === 'material' ? 'active' : ''}`}>
              <label className="checkbox-option">
                <input type="checkbox" checked={!!filters['matWooden']} onChange={(e) => handleFilterChange('matWooden', e.target.checked)} />
                <span>Wooden</span>
              </label>
              <label className="checkbox-option">
                <input type="checkbox" checked={!!filters['matAcrylic']} onChange={(e) => handleFilterChange('matAcrylic', e.target.checked)} />
                <span>Acrylic</span>
              </label>
              <label className="checkbox-option">
                <input type="checkbox" checked={!!filters['matLed']} onChange={(e) => handleFilterChange('matLed', e.target.checked)} />
                <span>LED Glow Glass</span>
              </label>
              <label className="checkbox-option">
                <input type="checkbox" checked={!!filters['matOther']} onChange={(e) => handleFilterChange('matOther', e.target.checked)} />
                <span>Metal & Other</span>
              </label>
            </div>
            <div className={`pane-content ${activeFilterTab === 'rating' ? 'active' : ''}`}>
              <label className="checkbox-option">
                <input type="checkbox" checked={!!filters['ratingHigh']} onChange={(e) => handleFilterChange('ratingHigh', e.target.checked)} />
                <span>4.5 ★ & above</span>
              </label>
              <label className="checkbox-option">
                <input type="checkbox" checked={!!filters['ratingMedium']} onChange={(e) => handleFilterChange('ratingMedium', e.target.checked)} />
                <span>4.0 ★ & above</span>
              </label>
            </div>
            <div className={`pane-content ${activeFilterTab === 'discount' ? 'active' : ''}`}>
              <label className="checkbox-option">
                <input type="checkbox" checked={!!filters['discount30']} onChange={(e) => handleFilterChange('discount30', e.target.checked)} />
                <span>30% and above</span>
              </label>
              <label className="checkbox-option">
                <input type="checkbox" checked={!!filters['discount40']} onChange={(e) => handleFilterChange('discount40', e.target.checked)} />
                <span>40% and above</span>
              </label>
            </div>
          </div>
        </div>
        <div className="drawer-footer">
          <button className="clear-filters-btn" onClick={() => handleFilterChange('clearAll', true)}>Clear All</button>
          <button className="apply-filters-btn" onClick={closeDrawers}>Apply Filters</button>
        </div>
      </div>
    </>
  );
}


// ─── Banner ──────────────────────────────────────────────────────────────────
export function Banner() {
  return (
    <section className="banner-section">
      <div className="banner-card">
        <div className="banner-content">
          <div className="banner-icon-container">
            <div className="banner-heart-badge">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
          <h3 className="banner-title">Can't find what you're looking for?</h3>
          <p className="banner-description">Try a different keyword or browse our categories.</p>
          <button className="banner-btn">Explore Categories</button>
        </div>
        <div className="banner-image-container">
          <img src="/assets/gift_boxes_banner.png" alt="Gift Boxes Banner" className="banner-gifts-img" />
        </div>
      </div>
    </section>
  );
}


// ─── WishlistPage ────────────────────────────────────────────────────────────
export function WishlistPage({ wishlist, addToCart, toggleWishlist, setActiveNav }) {
  return (
    <div className="main-container-inner">
      <div className="content-pane" style={{ width: '100%', flexGrow: 1 }}>
        
        {/* Premium favorites header banner */}
        <div className="wishlist-banner" style={{
          background: 'linear-gradient(135deg, #ff3b5c 0%, #ff6b8b 100%)',
          padding: '28px 24px',
          borderRadius: '20px',
          color: 'white',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 8px 24px rgba(255, 59, 92, 0.15)'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" width="24" height="24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>My Wishlist</h1>
            <p style={{ margin: '4px 0 0 0', opacity: 0.9, fontSize: '13px', fontWeight: '500' }}>
              {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved to favorites
            </p>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 24px',
              textAlign: 'center',
              background: 'var(--bg-card)',
              border: '1px dashed var(--border-color)',
              borderRadius: '16px',
              marginTop: '10px',
            }}
          >
            <div className="empty-icon" style={{ fontSize: '48px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="48" height="48" style={{ color: 'var(--text-muted)' }}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h2 className="empty-title" style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '8px' }}>Your wishlist is empty</h2>
            <p className="empty-subtitle" style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>Tap the ❤️ on any product to save it here</p>
            <button className="apply-filters-btn" style={{ width: 'auto', padding: '10px 24px' }} onClick={() => setActiveNav('home')}>
              Explore Products
            </button>
          </motion.div>
        ) : (
          <section className="results-list-section" style={{ marginTop: '0' }}>
            <motion.div layout className="products-container">
              <AnimatePresence>
                {wishlist.map((product) => (
                  <ProductCard
                    key={product.title}
                    product={product}
                    addToCart={() => addToCart(product)}
                    isWishlisted={true}
                    toggleWishlist={() => toggleWishlist(product)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}


// ─── CartPage ────────────────────────────────────────────────────────────────
export function CartPage({ cart, removeFromCart, updateCartQuantity, setActiveNav, checkoutCart }) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const originalSubtotal = cart.reduce((acc, item) => acc + (item.originalPrice || item.price) * item.quantity, 0);
  
  // Free Shipping Threshold (₹500)
  const freeShippingThreshold = 500;
  const deliveryFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 49;
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  // Promo code discounts
  let couponDiscount = 0;
  if (appliedCoupon === 'CRAFT20') {
    couponDiscount = Math.round(subtotal * 0.2); // 20% OFF
  } else if (appliedCoupon === 'WELCOME100') {
    couponDiscount = Math.min(100, subtotal); // Flat ₹100 OFF
  }

  const totalDiscount = (originalSubtotal - subtotal) + couponDiscount;
  const total = subtotal - couponDiscount + deliveryFee;

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'CRAFT20' || code === 'WELCOME100') {
      setAppliedCoupon(code);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try CRAFT20 or WELCOME100');
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  return (
    <div className="main-container-inner">
      <div className="content-pane" style={{ width: '100%', flexGrow: 1 }}>
        
        {/* Premium shopping bag banner */}
        <div className="cart-banner" style={{
          background: 'linear-gradient(135deg, var(--primary-color) 0%, #6e5eff 100%)',
          padding: '28px 24px',
          borderRadius: '20px',
          color: 'white',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 8px 24px rgba(62, 48, 232, 0.15)'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="24" height="24">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>Shopping Cart</h1>
            <p style={{ margin: '4px 0 0 0', opacity: 0.9, fontSize: '13px', fontWeight: '500' }}>
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
            </p>
          </div>
        </div>

        {cart.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 24px',
              textAlign: 'center',
              background: 'var(--bg-card)',
              border: '1px dashed var(--border-color)',
              borderRadius: '16px',
              marginTop: '10px',
            }}
          >
            <div className="empty-icon" style={{ fontSize: '48px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="48" height="48" style={{ color: 'var(--text-muted)' }}>
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <h2 className="empty-title" style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '8px' }}>Your cart is empty</h2>
            <p className="empty-subtitle" style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>Add some products to your cart to checkout</p>
            <button className="apply-filters-btn" style={{ width: 'auto', padding: '10px 24px' }} onClick={() => setActiveNav('home')}>
              Explore Products
            </button>
          </motion.div>
        ) : (
          <div className="cart-layout" style={{ marginTop: '0' }}>
            <div className="cart-items-section">
              
              {/* Free Shipping Progress Indicator */}
              <div style={{
                background: 'var(--bg-card)',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                padding: '16px',
                marginBottom: '20px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '8px' }}>
                  <span>
                    {subtotal >= freeShippingThreshold ? (
                      <span>🎉 You qualify for <strong>FREE Delivery</strong>!</span>
                    ) : (
                      <span>🚚 Add <strong>₹{freeShippingThreshold - subtotal}</strong> more for <strong>FREE Delivery</strong></span>
                    )}
                  </span>
                  <span>₹{subtotal} / ₹{freeShippingThreshold}</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    background: subtotal >= freeShippingThreshold ? '#00bf8a' : 'var(--primary-color)',
                    borderRadius: '4px',
                    transition: 'width 0.4s ease-out'
                  }}></div>
                </div>
              </div>

              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.title}
                    className="cart-item-card"
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={item.image} alt={item.title} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h3 className="cart-item-title">{item.title}</h3>
                      <div className="cart-item-price-row">
                        <span className="cart-item-price">₹{item.price}</span>
                        {item.originalPrice && (
                          <span className="cart-item-original">₹{item.originalPrice}</span>
                        )}
                      </div>
                      <div className="cart-item-actions">
                        <div className="quantity-control">
                          <button
                            className="quantity-btn"
                            onClick={() => updateCartQuantity(item.title, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="quantity-val">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => updateCartQuantity(item.title, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(item.title)}
                          aria-label="Remove item"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="cart-summary-section">
              
              {/* Promo Code Card */}
              <div style={{
                background: 'var(--bg-card)',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>Apply Coupons</h4>
                {!appliedCoupon ? (
                  <div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Enter CRAFT20 or WELCOME100"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        style={{
                          flexGrow: 1,
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          fontSize: '13px',
                          background: 'var(--bg-main)',
                          color: 'var(--text-main)'
                        }}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="apply-filters-btn"
                        style={{ width: 'auto', padding: '10px 16px', fontSize: '13px' }}
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p style={{ color: '#ff3b5c', fontSize: '12px', margin: '6px 0 0 0', fontWeight: '500' }}>{couponError}</p>
                    )}
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <button
                        onClick={() => { setCouponCode('CRAFT20'); setAppliedCoupon('CRAFT20'); setCouponError(''); }}
                        style={{
                          textAlign: 'left',
                          background: 'rgba(62, 48, 232, 0.05)',
                          border: '1px dashed var(--primary-color)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: 'var(--primary-color)',
                          fontWeight: '600'
                        }}
                      >
                        🏷️ CRAFT20 - Save 20% on all orders!
                      </button>
                      <button
                        onClick={() => { setCouponCode('WELCOME100'); setAppliedCoupon('WELCOME100'); setCouponError(''); }}
                        style={{
                          textAlign: 'left',
                          background: 'rgba(16, 185, 129, 0.05)',
                          border: '1px dashed #10b981',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: '#10b981',
                          fontWeight: '600'
                        }}
                      >
                        🏷️ WELCOME100 - Flat ₹100 off!
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(16, 185, 129, 0.06)',
                    border: '1px solid #10b981',
                    borderRadius: '10px',
                    padding: '10px 14px'
                  }}>
                    <div>
                      <span style={{ color: '#10b981', fontSize: '13px', fontWeight: '700' }}>✔️ Code {appliedCoupon} Applied!</span>
                      <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: 'var(--text-muted)' }}>
                        {appliedCoupon === 'CRAFT20' ? '20% discount applied' : 'Flat ₹100 discount applied'}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '12px'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Order Summary Card */}
              <div className="summary-card">
                <h3 className="summary-title">Order Summary</h3>
                <div className="summary-row">
                  <span>Price ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>₹{originalSubtotal}</span>
                </div>
                {originalSubtotal > subtotal && (
                  <div className="summary-row" style={{ color: '#10b981' }}>
                    <span>Catalog Discount</span>
                    <span>-₹{originalSubtotal - subtotal}</span>
                  </div>
                )}
                {appliedCoupon && (
                  <div className="summary-row" style={{ color: '#10b981' }}>
                    <span>Coupon Discount ({appliedCoupon})</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Delivery Charges</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
                <button className="checkout-btn" onClick={checkoutCart}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// ─── ProfilePage ─────────────────────────────────────────────────────────────
export function ProfilePage({ setActiveNav, showToast }) {
  const settingsList = [
    {
      title: 'Orders & Tracking',
      items: [
        { id: 'orders', label: 'My Orders', desc: 'View past orders, track shipments & download invoices', icon: '🛍️' },
        { id: 'addresses', label: 'Manage Addresses', desc: 'Edit or add delivery locations', icon: '📍' }
      ]
    },
    {
      title: 'Payment & Wallet',
      items: [
        { id: 'payments', label: 'Saved Payments', desc: 'Credit cards, UPI, and netbanking options', icon: '💳' },
        { id: 'giftcards', label: 'Gift Cards', desc: 'Check card balance or redeem gift vouchers', icon: '🎁' }
      ]
    },
    {
      title: 'Support & Settings',
      items: [
        { 
          id: 'help', 
          label: 'Help Center & Chat', 
          desc: '24/7 support for order or payment issues', 
          icon: (
            <svg viewBox="0 0 24 24" fill="#25d366" width="22" height="22" style={{ display: 'block' }}>
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.963L2 22l5.233-1.371a9.944 9.944 0 0 0 4.779 1.21h.004c5.505 0 9.99-4.478 9.99-9.985A9.998 9.998 0 0 0 12.012 2zm5.835 14.16c-.252.712-1.258 1.309-1.737 1.39-.479.08-1.102.138-1.785-.08a11.173 11.173 0 0 1-4.148-2.617 12.018 12.018 0 0 1-2.863-3.957c-.439-.757-.042-1.172.339-1.579.18-.193.398-.456.596-.684.198-.228.264-.38.397-.65.132-.27.066-.507-.033-.705-.099-.198-.891-2.147-1.221-2.943-.321-.775-.65-.67-.892-.682-.23-.012-.495-.015-.76-.015-.264 0-.693.099-1.056.494-.363.395-1.385 1.353-1.385 3.3 0 1.947 1.419 3.824 1.617 4.088.198.264 2.793 4.265 6.766 5.981 2.378 1.028 3.328 1.139 4.542.957.734-.11 2.248-.92 2.562-1.81.314-.89.314-1.654.22-1.812-.094-.158-.347-.253-.699-.429z" />
            </svg>
          )
        },
        { id: 'account', label: 'Account Security', desc: 'Update email, phone number, and passwords', icon: '🔒' }
      ]
    }
  ];

  const handleLogout = () => {
    showToast('Logged out successfully', 'wishlist');
    setActiveNav('home');
  };

  return (
    <div className="main-container-inner">
      <div className="content-pane" style={{ width: '100%', flexGrow: 1 }}>
        
        {/* Profile Card Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
          padding: '32px 24px',
          borderRadius: '20px',
          color: 'white',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '120px',
            height: '120px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '50%'
          }}></div>
          
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'var(--primary-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            fontWeight: '800',
            boxShadow: '0 0 0 4px rgba(62, 48, 232, 0.3)'
          }}>
            T
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800' }}>Thalan</h2>
            <p style={{ margin: '4px 0 0 0', opacity: 0.8, fontSize: '13px' }}>thalan@example.com</p>
            <span style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '2px 10px',
              fontSize: '11px',
              fontWeight: '600',
              marginTop: '6px'
            }}>
              Gold Member 🏆
            </span>
          </div>
        </div>

        {/* Settings Navigation Groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {settingsList.map((group, index) => (
            <div key={index}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-muted)',
                marginBottom: '12px',
                paddingLeft: '4px'
              }}>
                {group.title}
              </h3>
              <div style={{
                background: 'var(--bg-card)',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)'
              }}>
                {group.items.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px',
                      cursor: 'pointer',
                      borderBottom: idx === group.items.length - 1 ? 'none' : '1px solid var(--border-color)',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-main)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>{item.icon}</span>
                    <div style={{ flexGrow: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>{item.label}</h4>
                      <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-light)' }}>{item.desc}</p>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16" style={{ color: 'var(--text-light)' }}>
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Logout Action Button */}
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              background: 'var(--bg-card)',
              border: '1px solid #ff3b5c',
              color: '#ff3b5c',
              borderRadius: '14px',
              padding: '14px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              marginBottom: '40px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 59, 92, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-card)';
            }}
          >
            <span>🚪</span> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}


// ─── OrdersPage ──────────────────────────────────────────────────────────────
export function OrdersPage({ setActiveNav }) {
  const orders = [
    {
      id: 'FC-94829',
      date: 'July 6, 2026',
      status: 'In Transit',
      statusColor: '#d97706',
      statusBg: 'rgba(217, 119, 6, 0.08)',
      deliveryText: 'Estimated delivery: maximum 1 day',
      items: [
        {
          title: 'LED Photo Frame',
          image: 'assets/led_frame.png',
          price: 899,
          quantity: 1
        }
      ],
      total: 899
    },
    {
      id: 'FC-84920',
      date: 'June 28, 2026',
      status: 'Delivered',
      statusColor: '#10b981',
      statusBg: 'rgba(16, 185, 129, 0.08)',
      deliveryText: 'Delivered on June 30, 2026',
      items: [
        {
          title: 'Wooden Collage Photo Frame',
          image: 'assets/wooden_collage_frame.png',
          price: 699,
          quantity: 1
        },
        {
          title: 'Personalized Spotify Acrylic Keychain',
          image: 'assets/spotify_keychain.png',
          price: 299,
          quantity: 2
        }
      ],
      total: 1297
    }
  ];

  return (
    <div className="main-container-inner">
      <div className="content-pane" style={{ width: '100%', flexGrow: 1 }}>
        
        {/* Orders Page Banner */}
        <div className="orders-banner" style={{
          background: 'linear-gradient(135deg, #4b5563 0%, #1f2937 100%)',
          padding: '28px 24px',
          borderRadius: '20px',
          color: 'white',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 8px 24px rgba(75, 85, 99, 0.15)'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="24" height="24">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>Order History</h1>
            <p style={{ margin: '4px 0 0 0', opacity: 0.9, fontSize: '13px', fontWeight: '500' }}>
              Track shipments and review past orders
            </p>
          </div>
        </div>

        {/* Order Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: 'var(--bg-card)',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {/* Order Header info */}
              <div style={{
                padding: '16px',
                background: 'var(--bg-main)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div>
                    <p style={{ margin: '0 0 2px 0', fontSize: '11px', color: 'var(--text-light)', fontWeight: '600', textTransform: 'uppercase' }}>Order ID</p>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>#{order.id}</span>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 2px 0', fontSize: '11px', color: 'var(--text-light)', fontWeight: '600', textTransform: 'uppercase' }}>Placed On</p>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>{order.date}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    display: 'inline-block',
                    color: order.statusColor,
                    background: order.statusBg,
                    border: `1px solid ${order.statusColor}22`,
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items list */}
              <div style={{ padding: '16px' }}>
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      paddingBottom: idx === order.items.length - 1 ? '0' : '16px',
                      borderBottom: idx === order.items.length - 1 ? 'none' : '1px solid var(--border-color)',
                      marginBottom: idx === order.items.length - 1 ? '0' : '16px',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '64px',
                        height: '64px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)'
                      }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>{item.title}</h4>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-light)' }}>
                        Quantity: {item.quantity} • ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer summary info */}
              <div style={{
                padding: '16px',
                borderTop: '1px dashed var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>
                  {order.deliveryText}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-light)', fontWeight: '600' }}>Total Paid:</span>
                  <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primary-color)' }}>₹{order.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
