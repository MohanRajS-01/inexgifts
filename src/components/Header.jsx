import React from 'react';
import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';

function Header({ isWishlisted, setIsWishlisted, showToast, cartCount }) {
  return (
    <header className="header">
      <button className="icon-btn" aria-label="Go Back" onClick={() => showToast('Navigating back...')}>
        <ArrowLeft />
      </button>
      <h1 className="header-title">Product Details</h1>
      <div className="header-actions">
        <button 
          className="icon-btn" 
          aria-label="Wishlist"
          onClick={() => {
            const next = !isWishlisted;
            setIsWishlisted(next);
            if (next) {
              showToast('<span style="display:flex;align-items:center;gap:4px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent-pink-text)" stroke="var(--accent-pink-text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> Added to Wishlist!</span>');
            } else {
              showToast('Removed from Wishlist.');
            }
          }}
        >
          <Heart fill={isWishlisted ? 'var(--accent-pink-text)' : 'none'} color={isWishlisted ? 'var(--accent-pink-text)' : 'currentColor'} />
        </button>
        <button className="icon-btn cart-btn" aria-label="Cart">
          <ShoppingCart />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}

export default Header;
