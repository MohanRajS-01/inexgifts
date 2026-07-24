import React, { useState } from 'react';
import '../../style.css';
import Header from '../components/Header';
import CartTabs from '../components/CartTabs';
import CartItem from '../components/CartItem';
import PromoCode from '../components/PromoCode';
import PriceDetails from '../components/PriceDetails';
import WishlistCard from '../components/WishlistCard';
import Popup from '../components/Popup';
import CheckoutModal from '../components/CheckoutModal';
import BottomNavbar from '../components/BottomNavbar';

// Public asset image paths
const ledLampImg = '/assets/images/products/led_photo_lamp.jpg';
const cushionImg = '/assets/cushion.png';
const giftSetImg = '/assets/images/products/premium_gift_set.jpg';
const collageFrameImg = '/assets/images/products/wooden_collage_frame.jpg';
const customizedMugImg = '/assets/images/products/customized_mug.jpg';
const keychainImg = '/assets/images/products/photo_keychain.jpg';
const acrylicFrameImg = '/acrylic_frame.png';
const explosionBoxImg = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80';

const CartPage = ({
  cartItems,
  setCartItems,
  wishlistItems,
  setWishlistItems,
  initialTab = 'cart',
  onBack
}) => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState(initialTab); // 'cart' or 'wishlist'
  const [activeNav, setActiveNav] = useState('gifts'); // Bottom navbar selection
  const [toastMsg, setToastMsg] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // cartItems and wishlistItems come exclusively from App.jsx (single source of truth)
  const safeCartItems = cartItems || [];
  const safeWishlistItems = wishlistItems || [];

  // --- TOAST TRIGGER ---
  const triggerToast = (msg) => {
    setToastMsg(msg);
  };

  // --- ACTIONS ---

  // Quantity Change
  const handleQtyChange = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(safeCartItems.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    ));
  };

  // Dropdown Change
  const handleOptionChange = (id, newOption) => {
    setCartItems(safeCartItems.map(item =>
      item.id === id ? { ...item, selectedOption: newOption } : item
    ));
  };

  // Wishlist Toggle inside Cart Item
  const handleWishlistToggle = (itemId) => {
    const isAlreadyWishlisted = safeWishlistItems.some(item => item.id === itemId);
    const cartItem = safeCartItems.find(item => item.id === itemId);

    if (isAlreadyWishlisted) {
      // Remove from wishlist
      setWishlistItems(safeWishlistItems.filter(item => item.id !== itemId));
      triggerToast("Removed from Wishlist 💔");
    } else {
      // Add to wishlist
      const newWishlistItem = {
        id: itemId,
        title: cartItem ? cartItem.title : "Product",
        price: cartItem ? cartItem.currentPrice : 999,
        image: cartItem ? cartItem.image : ledLampImg
      };
      setWishlistItems([...safeWishlistItems, newWishlistItem]);
      triggerToast("Added to Wishlist ❤️");
    }
  };

  // Delete Cart Item with Confirmation Popup
  const handleDeleteTrigger = (id) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (!deleteConfirmId) return;
    setCartItems(prev => prev.filter(item => item.id !== deleteConfirmId));
    triggerToast("Item removed from cart 🗑️");
    setDeleteConfirmId(null);
  };

  const handleContinueShoppingAction = () => {
    setActiveNav('gifts');
  };

  // Add Promo Code
  const handleApplyCoupon = (code, rate) => {
    setAppliedCoupon({ code, rate });
  };

  // Add Item to Cart from Wishlist (Moves the item)
  const handleMoveToCart = (item) => {
    if (!item) return;
    const targetId = String(item.id || item.title);
    const itemTitle = item.title || 'Custom Product';

    // Check if product is already in cart
    const existingIndex = safeCartItems.findIndex(c => String(c.id) === targetId || c.title === itemTitle);
    if (existingIndex > -1) {
      const updatedCart = [...safeCartItems];
      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity: (updatedCart[existingIndex].quantity || 1) + 1
      };
      setCartItems(updatedCart);
    } else {
      const itemPrice = typeof item.price === 'number' ? item.price : (item.currentPrice || parseFloat(String(item.price || '999').replace(/[^0-9.]/g, '')) || 999);
      const origPrice = item.originalPrice ? (typeof item.originalPrice === 'number' ? item.originalPrice : parseFloat(String(item.originalPrice).replace(/[^0-9.]/g, ''))) : Math.round(itemPrice * 1.25);

      const newCartItem = {
        id: item.id || targetId,
        title: itemTitle,
        subtitle: item.subtitle || 'From Wishlist',
        image: item.image || '/assets/images/products/led_photo_lamp.jpg',
        originalPrice: origPrice,
        currentPrice: itemPrice,
        discount: Math.round(((origPrice - itemPrice) / origPrice) * 100) || 20,
        quantity: 1,
        optionType: 'Size',
        selectedOption: 'Standard',
        options: ['Standard', 'Large']
      };
      setCartItems([...safeCartItems, newCartItem]);
    }

    // Remove from wishlist
    setWishlistItems(prevWish => prevWish.filter(w => String(w.id) !== targetId && w.title !== itemTitle));
    triggerToast("Added to Cart 🛒");
  };

  // Wishlist card heart toggle (removes from wishlist)
  const handleRemoveFromWishlist = (id) => {
    setWishlistItems(safeWishlistItems.filter(w => w.id !== id));
    triggerToast("Removed from Wishlist 💔");
  };

  const pendingDeleteItem = safeCartItems.find(item => item.id === deleteConfirmId);

  // Checkout handlers
  const handleCheckout = () => {
    if (safeCartItems.length === 0) {
      triggerToast("Your cart is empty! 🛒");
      return;
    }
    setCheckoutOpen(true);
  };

  const handleContinueShopping = () => {
    setCheckoutOpen(false);
    setCartItems([]);
    setAppliedCoupon(null);
    if (onBack) {
      onBack();
    }
  };

  // Render content depending on active Tab
  const renderTabContent = () => {
    if (activeTab === 'cart') {
      if (safeCartItems.length === 0) {
        return (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--secondary-text)' }}>
            <div style={{ width: '72px', height: '72px', margin: '0 auto 20px', borderRadius: '24px', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '28px' }}>🛒</span>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary-text)', marginBottom: '12px' }}>
              Your Cart is Empty
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '24px', maxWidth: '320px', marginLeft: 'auto', marginRight: 'auto' }}>
              Looks like you haven't added anything yet.
            </p>
            <button
              className="checkout-btn"
              onClick={handleContinueShoppingAction}
              style={{ minWidth: '180px' }}
            >
              Continue Shopping
            </button>
          </div>
        );
      }

      return (
        <>
          <div className="cart-items-container">
            {safeCartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQtyChange={handleQtyChange}
                onDelete={handleDeleteTrigger}
                onWishlistToggle={handleWishlistToggle}
                onOptionChange={handleOptionChange}
                isWishlisted={safeWishlistItems.some(w => w.id === item.id)}
              />
            ))}
          </div>

          {/* Promo code entry */}
          <PromoCode
            appliedCoupon={appliedCoupon}
            onApplyCoupon={handleApplyCoupon}
            onToast={triggerToast}
          />

          {/* Price breakup card */}
          <PriceDetails
            cartItems={safeCartItems}
            appliedCoupon={appliedCoupon}
          />

          {/* Proceed to checkout button */}
          <div className="checkout-btn-container">
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      );
    } else {
      // Direct full-page style Wishlist view if tab toggled
      return (
        <div className="pt-4">
          <h2 className="text-base font-bold text-gray-800 mb-3 sm:mb-4">My Wishlist ({safeWishlistItems.length})</h2>
          {safeWishlistItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {safeWishlistItems.map((item) => (
                <WishlistCard
                  key={item.id}
                  item={item}
                  onRemoveFromWishlist={handleRemoveFromWishlist}
                  onAddToCart={handleMoveToCart}
                  isWishlisted={true}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--secondary-text)' }}>
              <p>Your wishlist is empty.</p>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Toast Notifications */}
      {toastMsg && (
        <div className="toast-container">
          <Popup message={toastMsg} onClose={() => setToastMsg(null)} />
        </div>
      )}

      {/* Header removed */}

      {/* Tabs */}
      <CartTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={safeCartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
        wishlistCount={safeWishlistItems.length}
      />

      {/* Scrollable Content */}
      <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 md:px-6 pb-24 md:pb-10">
        {renderTabContent()}

        {/* Wishlist Bottom Section (always visible on Cart tab matching screenshot) */}
        {activeTab === 'cart' && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-base font-bold text-gray-800">Wishlist ({safeWishlistItems.length})</h3>
              <a
                href="#"
                className="text-xs sm:text-sm font-semibold text-indigo-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('wishlist');
                }}
              >
                View All &rsaquo;
              </a>
            </div>
            {safeWishlistItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {safeWishlistItems.slice(0, 5).map((item) => (
                  <WishlistCard
                    key={item.id}
                    item={item}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                    onAddToCart={handleMoveToCart}
                    isWishlisted={true}
                  />
                ))}
              </div>
            ) : (
              <div style={{ padding: '0 20px', fontSize: '12px', color: 'var(--secondary-text)' }}>
                No wishlist items remaining.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Sticky Navbar */}
      <BottomNavbar activeNav={activeNav} onNavChange={setActiveNav} />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onContinue={handleContinueShopping}
      />

      {/* Delete Confirmation Popup Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setDeleteConfirmId(null)}>
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-sm w-full shadow-xl border border-gray-100 flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900">Remove Item?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Are you sure you want to remove this product from your cart?
            </p>
            <div className="flex gap-3 mt-2">
              <button
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors shadow-sm"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
