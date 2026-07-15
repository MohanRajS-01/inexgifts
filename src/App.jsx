import React, { useState } from 'react';
import Home from './pages/Home';
import Gifts from './pages/Gifts';
import Categories from './pages/Categories';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/MyOrders';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Customize from './pages/Customize';

export default function App() {
  const [view, setView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(1);
  const [wishlist, setWishlist] = useState([1, 2, 3, 5]);
  const [cart, setCart] = useState([
    { id: 1, name: 'LED Photo Lamp', price: 999, original: 1299, qty: 1, img: 'led_photo_lamp.jpg' },
    { id: 5, name: 'Customized Mug', price: 299, original: 399, qty: 2, img: 'customized_mug.jpg' },
    { id: 9, name: 'Chocolate Box', price: 699, original: 899, qty: 1, img: 'chocolate_box.jpg' }
  ]);

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addToCart = (newItem) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === newItem.id);
      if (exists) {
        return prev.map(item => 
          item.id === newItem.id ? { ...item, qty: item.qty + (newItem.qty || 1) } : item
        );
      }
      return [...prev, { ...newItem, qty: newItem.qty || 1 }];
    });
  };

  // View renderer helper
  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <Home 
            setView={setView} 
            setSelectedProductId={setSelectedProductId} 
            wishlist={wishlist} 
            toggleWishlist={toggleWishlist} 
            cart={cart}
          />
        );
      case 'gifts':
        return (
          <Gifts 
            setView={setView} 
            setSelectedProductId={setSelectedProductId} 
            wishlist={wishlist} 
            toggleWishlist={toggleWishlist} 
            cart={cart}
          />
        );
      case 'categories':
        return <Categories setView={setView} cart={cart} />;
      case 'product':
        return (
          <ProductDetail 
            id={selectedProductId} 
            setView={setView} 
            wishlist={wishlist} 
            toggleWishlist={toggleWishlist} 
            addToCart={addToCart}
          />
        );
      case 'cart':
        return <Cart cart={cart} setCart={setCart} setView={setView} />;
      case 'orders':
        return <Orders setView={setView} setSelectedProductId={setSelectedProductId} />;
      case 'profile':
        return <Profile setView={setView} wishlist={wishlist} />;
      case 'wishlist':
        return (
          <Wishlist 
            setView={setView} 
            wishlist={wishlist} 
            toggleWishlist={toggleWishlist} 
            setSelectedProductId={setSelectedProductId} 
            addToCart={addToCart}
          />
        );
      case 'customize':
        return <Customize setView={setView} addToCart={addToCart} />;
      default:
        return (
          <Home 
            setView={setView} 
            setSelectedProductId={setSelectedProductId} 
            wishlist={wishlist} 
            toggleWishlist={toggleWishlist} 
            cart={cart}
          />
        );
    }
  };

  // Tab highlighting matcher
  const getActiveTab = () => {
    if (view === 'home') return 'home';
    if (view === 'categories') return 'categories';
    if (view === 'gifts' || view === 'product' || view === 'cart' || view === 'wishlist' || view === 'customize') return 'gifts';
    if (view === 'orders') return 'orders';
    if (view === 'profile') return 'profile';
    return 'home';
  };

  const activeTab = getActiveTab();

  return (
    <div className="app-container">
      {/* Desktop Header Navigation (hidden on mobile) */}
      <header className="desktop-header">
        <div className="desktop-header-inner">
          <div className="logo" onClick={() => { setView('home'); window.scrollTo(0,0); }}>🎁 Gifts Store</div>
          
          {/* Centered Desktop Search Bar (IGP Style) */}
          <div className="desktop-header-search" onClick={() => { setView('gifts'); window.scrollTo(0,0); }} style={{ flex: 1, maxWidth: '460px', margin: '0 20px', position: 'relative', display: 'flex', alignItems: 'center', background: '#F3F4F6', borderRadius: '9999px', padding: '8px 16px', border: '1px solid #E5E7EB', cursor: 'pointer' }}>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#6B7280" style={{ width: '18px', height: '18px', marginRight: '8px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search for gifts, frames, mugs..." 
              readOnly 
              style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '13px', color: '#1F2937', cursor: 'pointer' }}
            />
          </div>

          <nav className="desktop-nav-links">
            <button className={activeTab === 'home' ? 'active' : ''} onClick={() => { setView('home'); window.scrollTo(0,0); }}>Home</button>
            <button className={activeTab === 'categories' ? 'active' : ''} onClick={() => { setView('categories'); window.scrollTo(0,0); }}>Categories</button>
            <button className={activeTab === 'gifts' ? 'active' : ''} onClick={() => { setView('gifts'); window.scrollTo(0,0); }}>Gifts</button>
            <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => { setView('orders'); window.scrollTo(0,0); }}>Orders</button>
          </nav>
          <div className="desktop-header-actions">
            <button className={`desktop-action-btn ${view === 'wishlist' ? 'active' : ''}`} onClick={() => { setView('wishlist'); window.scrollTo(0,0); }} title="Wishlist">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              {wishlist.length > 0 && <span className="action-badge">{wishlist.length}</span>}
            </button>
            <button className={`desktop-action-btn ${view === 'cart' ? 'active' : ''}`} onClick={() => { setView('cart'); window.scrollTo(0,0); }} title="Cart">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/><path d="M1 1h3l2.7 13.4a1 1 0 001 .8h9.7a1 1 0 001-.8L20 6H6"/></svg>
              {cart.reduce((acc, item) => acc + item.qty, 0) > 0 && (
                <span className="action-badge">{cart.reduce((acc, item) => acc + item.qty, 0)}</span>
              )}
            </button>
            <button className={`desktop-action-btn ${view === 'profile' ? 'active' : ''}`} onClick={() => { setView('profile'); window.scrollTo(0,0); }} title="Profile">
              <span className="profile-avatar">U</span>
            </button>
          </div>
        </div>
      </header>

      {renderView()}

      {/* Shared Bottom Navigation Bar */}
      <nav className="bottom-nav" id="bottom-nav">
        <button 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => { setView('home'); window.scrollTo(0,0); }}
          style={{ background: 'none', border: 'none' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Home</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => { setView('categories'); window.scrollTo(0,0); }}
          style={{ background: 'none', border: 'none' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
          </svg>
          <span>Categories</span>
        </button>
        <button 
          className={`nav-center-wrapper ${activeTab === 'gifts' ? 'active' : ''}`}
          onClick={() => { setView('gifts'); window.scrollTo(0,0); }}
          style={{ background: 'none', border: 'none' }}
        >
          <div className="nav-item-center">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" style={{ width: '24px', height: '24px', color: '#FFFFFF' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"/>
            </svg>
          </div>
          <span>Gifts</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => { setView('orders'); window.scrollTo(0,0); }}
          style={{ background: 'none', border: 'none' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span>Orders</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => { setView('profile'); window.scrollTo(0,0); }}
          style={{ background: 'none', border: 'none' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}
