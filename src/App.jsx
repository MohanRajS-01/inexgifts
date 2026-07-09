import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import ProductDetailPage from './components/ProductDetailPage.jsx';
import Toast from './components/Toast.jsx';

function App() {
  const [toastMessage, setToastMessage] = useState(null);
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [toastKey, setToastKey] = useState(0); // to force re-render toast
  const [cartCount, setCartCount] = useState(3);

  const showToast = (message) => {
    setToastMessage(message);
    setToastKey(prev => prev + 1);
  };

  const handleAddToCart = (quantity) => {
    setCartCount(prev => prev + quantity);
    showToast(`<span style="display:flex;align-items:center;gap:4px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-yellow)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> Added ${quantity} item(s) to Cart!</span>`);
  };

  return (
    <div className="app-container">
      <Header 
        isWishlisted={isWishlisted} 
        setIsWishlisted={setIsWishlisted} 
        showToast={showToast}
        cartCount={cartCount}
      />
      <ProductDetailPage 
        showToast={showToast}
        qty={qty}
        setQty={setQty}
        onAddToCart={handleAddToCart}
      />
      <Toast 
        key={toastKey} 
        message={toastMessage} 
        onHide={() => setToastMessage(null)} 
      />
    </div>
  );
}

export default App;
