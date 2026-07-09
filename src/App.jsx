import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Header,
  Sidebar,
  Categories,
  FilterTags,
  ProductCard,
  BottomNav,
  Drawers,
  StatusBar,
  Banner,
  WishlistPage,
  CartPage,
  ProfilePage,
  OrdersPage
} from './components/SearchScreen';
import { productsData } from './data/products';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('photo frame');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeNav, setActiveNav] = useState('home');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query) {
      setActiveCategory('all');
    }
  };
  const [cart, setCart] = useState([
    { ...productsData[0], quantity: 1 },
    { ...productsData[1], quantity: 1 },
    { ...productsData[2], quantity: 1 }
  ]);
  const [toasts, setToasts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(null);
  const [currentSort, setCurrentSort] = useState('relevance');
  const [activeFilterTab, setActiveFilterTab] = useState('price');
  const [filters, setFilters] = useState({});
  const [wishlist, setWishlist] = useState([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const showToast = (message, type = 'cart') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2800);
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item.title === product.title);
    if (isInWishlist) {
      setWishlist(prev => prev.filter(item => item.title !== product.title));
      showToast('Removed from wishlist', 'wishlist');
    } else {
      setWishlist(prev => [...prev, product]);
      showToast('Added to wishlist ❤️', 'wishlist');
    }
  };

  const isWishlisted = (product) => wishlist.some(item => item.title === product.title);

  const addToCart = (product) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.title === product.title);
      if (idx > -1) {
        const nextCart = [...prev];
        nextCart[idx] = { ...nextCart[idx], quantity: nextCart[idx].quantity + 1 };
        return nextCart;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added to cart 🛒`, 'cart');
  };

  const removeFromCart = (title) => {
    setCart(prev => prev.filter(item => item.title !== title));
    showToast(`Removed from cart 🛒`, 'cart');
  };

  const updateCartQuantity = (title, quantity) => {
    if (quantity <= 0) {
      removeFromCart(title);
      return;
    }
    setCart(prev => prev.map(item => item.title === title ? { ...item, quantity } : item));
  };

  const checkoutCart = () => {
    setCart([]);
    showToast(`Order placed successfully! 🎉`, 'cart');
    setActiveNav('home');
  };

  const handleFilterChange = (id, value) => {
    if (id === 'clearAll') { setFilters({}); return; }
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const filteredProducts = useMemo(() => {
    let result = productsData;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (activeCategory !== 'all') result = result.filter(p => p.category.includes(activeCategory));
    if (filters.minPrice500 || filters.priceOver1000)
      result = result.filter(p => p.price >= 1000 || (filters.minPrice500 && p.price >= 500));
    else if (filters.priceUnder500) result = result.filter(p => p.price < 500);
    else if (filters.price500to1000) result = result.filter(p => p.price >= 500 && p.price <= 1000);
    if (filters.ratingHigh) result = result.filter(p => p.rating >= 4.5);
    else if (filters.ratingMedium) result = result.filter(p => p.rating >= 4.0);
    if (filters.discount40) result = result.filter(p => parseInt(p.discountPercent) >= 40);
    else if (filters.discount30) result = result.filter(p => parseInt(p.discountPercent) >= 30);
    if (currentSort === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    else if (currentSort === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    else if (currentSort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    else if (currentSort === 'popularity') result = [...result].sort((a, b) => b.popularity - a.popularity);
    return result;
  }, [searchQuery, activeCategory, filters, currentSort]);

  return (
    <>
      <div className="device-frame">
        <div className="device-screen">
          <StatusBar />

          <Header
            searchQuery={searchQuery}
            setSearchQuery={handleSearchChange}
            clearSearch={() => { setSearchQuery(''); setActiveCategory('all'); }}
            cartCount={cartCount}
            activeNav={activeNav}
            setActiveNav={setActiveNav}
          />

          <main className="scrollable-content">
            <AnimatePresence mode="wait">

              {/* ── WISHLIST PAGE ── */}
              {activeNav === 'wishlist' && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ flex: 1 }}
                >
                  <WishlistPage
                    wishlist={wishlist}
                    addToCart={addToCart}
                    toggleWishlist={toggleWishlist}
                    setActiveNav={setActiveNav}
                  />
                </motion.div>
              )}

              {/* ── CART PAGE ── */}
              {activeNav === 'cart' && (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ flex: 1 }}
                >
                  <CartPage
                    cart={cart}
                    removeFromCart={removeFromCart}
                    updateCartQuantity={updateCartQuantity}
                    setActiveNav={setActiveNav}
                    checkoutCart={checkoutCart}
                  />
                </motion.div>
              )}

              {/* ── PROFILE PAGE ── */}
              {activeNav === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ flex: 1 }}
                >
                  <ProfilePage setActiveNav={setActiveNav} showToast={showToast} />
                </motion.div>
              )}

              {/* ── ORDERS PAGE ── */}
              {activeNav === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ flex: 1 }}
                >
                  <OrdersPage setActiveNav={setActiveNav} />
                </motion.div>
              )}

              {/* ── HOME / SEARCH PAGE ── */}
              {activeNav !== 'wishlist' && activeNav !== 'cart' && activeNav !== 'profile' && activeNav !== 'orders' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  style={{ flex: 1 }}
                >
                  <div className="main-container-inner">
                    <Sidebar filters={filters} handleFilterChange={handleFilterChange} />
                    <div className="content-pane">
                      <section className="results-meta-section">
                        <div className="meta-text-container">
                          <h1 className="results-heading">
                            Results for {searchQuery
                              ? <span className="highlight-query">"{searchQuery}"</span>
                              : 'All Products'}
                          </h1>
                          <p className="results-count">{filteredProducts.length} products found</p>
                        </div>
                        <button className="sort-btn" onClick={() => setDrawerOpen('sort')}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
                            <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
                            <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
                            <line x1="17" y1="16" x2="23" y2="16" />
                          </svg>
                          <span>Sort</span>
                        </button>
                      </section>

                      <Categories 
                        activeCategory={activeCategory} 
                        setActiveCategory={(category) => {
                          setActiveCategory(category);
                          setSearchQuery('');
                        }} 
                      />

                      <FilterTags
                        minPrice500={filters.minPrice500}
                        setMinPrice500={(val) => handleFilterChange('minPrice500', val)}
                        openFilterDrawer={(tab) => { setDrawerOpen('filter'); if (typeof tab === 'string') setActiveFilterTab(tab); }}
                      />

                      <section className="results-list-section">
                        <h2 className="section-title">Top Results</h2>
                        <motion.div layout className="products-container">
                          <AnimatePresence>
                            {filteredProducts.map((p) => (
                              <ProductCard
                                key={p.title}
                                product={p}
                                addToCart={() => addToCart(p)}
                                isWishlisted={isWishlisted(p)}
                                toggleWishlist={() => toggleWishlist(p)}
                              />
                            ))}
                          </AnimatePresence>
                          {filteredProducts.length === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                              style={{ padding: '2rem', textAlign: 'center', width: '100%', color: 'var(--text-muted)' }}>
                              No products found.
                            </motion.div>
                          )}
                        </motion.div>
                      </section>

                      <Banner />
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </main>

          <BottomNav
            activeNav={activeNav}
            setActiveNav={setActiveNav}
            wishlistCount={wishlist.length}
          />

          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="whatsapp-fab" aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.004 3.2C9.158 3.2 3.6 8.735 3.6 15.552c0 2.18.573 4.308 1.662 6.18L3.2 28.8l7.284-1.91a12.35 12.35 0 0 0 5.52 1.312c6.846 0 12.396-5.535 12.396-12.35S22.85 3.2 16.004 3.2zm0 22.608a10.22 10.22 0 0 1-5.21-1.428l-.374-.222-3.876 1.016 1.036-3.78-.244-.388A10.15 10.15 0 0 1 5.77 15.55c0-5.636 4.593-10.22 10.234-10.22 5.64 0 10.226 4.584 10.226 10.22 0 5.64-4.586 10.258-10.226 10.258zm5.61-7.66c-.308-.154-1.82-.898-2.102-.999-.282-.102-.488-.154-.693.154-.206.308-.796.999-.976 1.205-.18.205-.359.23-.667.077-.308-.154-1.3-.48-2.477-1.527-.916-.816-1.534-1.824-1.714-2.132-.18-.308-.02-.474.135-.627.138-.138.308-.36.462-.538.153-.18.205-.308.308-.513.102-.206.05-.386-.026-.54-.077-.154-.693-1.67-.95-2.287-.25-.601-.504-.52-.693-.53-.18-.008-.386-.01-.591-.01-.206 0-.54.078-.822.386-.282.308-1.078 1.054-1.078 2.568 0 1.515 1.104 2.98 1.258 3.184.154.206 2.172 3.316 5.262 4.65.735.318 1.31.508 1.757.65.738.236 1.41.203 1.942.123.592-.088 1.82-.744 2.078-1.462.256-.718.256-1.334.18-1.462-.078-.128-.283-.206-.592-.36z"/>
            </svg>
          </a>

          <Drawers
            drawerOpen={drawerOpen}
            closeDrawers={() => setDrawerOpen(null)}
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
            filters={filters}
            handleFilterChange={handleFilterChange}
            activeFilterTab={activeFilterTab}
            setActiveFilterTab={setActiveFilterTab}
          />
        </div>
      </div>

      {/* Toasts — fixed, outside app frame, never blocks clicks */}
      <div className="toast-container" aria-live="polite">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              className={`toast toast-${toast.type}`}
              initial={{ opacity: 0, y: -24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            >
              <div className="toast-icon">
                {toast.type === 'wishlist'
                  ? <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                  : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><polyline points="20 6 9 17 4 12" /></svg>
                }
              </div>
              <span>{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
