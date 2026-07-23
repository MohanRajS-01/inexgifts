import React, { useState } from 'react';
import Header from '../components/Header';
import CartTabs from '../components/CartTabs';
import CartItem from '../components/CartItem';
import PromoCode from '../components/PromoCode';
import PriceDetails from '../components/PriceDetails';
import WishlistCard from '../components/WishlistCard';
import Popup from '../components/Popup';
import CheckoutModal from '../components/CheckoutModal';
import BottomNavbar from '../components/BottomNavbar';

// Import local image assets
import ledLampImg from '../assets/images/led_lamp.png';
import cushionImg from '../assets/images/cushion.png';
import giftSetImg from '../assets/images/gift_set.png';
import collageFrameImg from '../assets/images/collage_frame.png';
import customizedMugImg from '../assets/images/customized_mug.png';
import keychainImg from '../assets/images/keychain.png';
import acrylicFrameImg from '../assets/images/acrylic_frame.png';
import explosionBoxImg from '../assets/images/explosion_box.png';

const CartPage = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('cart'); // 'cart' or 'wishlist'
  const [activeNav, setActiveNav] = useState('gifts'); // Bottom navbar selection
  const [toastMsg, setToastMsg] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Cart list
  const [cartItems, setCartItems] = useState([
    {
      id: 'led_lamp',
      title: 'LED Photo Lamp',
      subtitle: 'Personalized with 1 photo',
      image: ledLampImg,
      originalPrice: 1299,
      currentPrice: 999,
      discount: 23,
      quantity: 1,
      optionType: 'Size',
      selectedOption: 'Medium',
      options: ['Medium', 'Small', 'Large']
    },
    {
      id: 'photo_cushion',
      title: 'Photo Cushion',
      subtitle: 'Personalized with 6 photos',
      image: cushionImg,
      originalPrice: 599,
      currentPrice: 499,
      discount: 17,
      quantity: 1,
      optionType: 'Size',
      selectedOption: '16 x 16 inch',
      options: ['16 x 16 inch', '12 x 12 inch', '18 x 18 inch']
    },
    {
      id: 'gift_set',
      title: 'Premium Gift Set',
      subtitle: 'Blue Edition',
      image: giftSetImg,
      originalPrice: 1999,
      currentPrice: 1499,
      discount: 25,
      quantity: 1,
      optionType: 'Color',
      selectedOption: 'Blue',
      options: ['Blue', 'Black', 'Brown']
    },
    {
      id: 'mini_gift_box',
      title: 'Mini Surprise Gift Box',
      subtitle: 'Festive edition',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
      originalPrice: 1299,
      currentPrice: 949,
      discount: 27,
      quantity: 1,
      optionType: 'Color',
      selectedOption: 'Red & Black',
      options: ['Red & Black', 'Blue & Gold']
    },
    {
      id: 'name_plate',
      title: 'Acrylic Name Plate',
      subtitle: 'Personalized gift',
      image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
      originalPrice: 899,
      currentPrice: 699,
      discount: 22,
      quantity: 1,
      optionType: 'Size',
      selectedOption: 'Medium',
      options: ['Medium', 'Large']
    }
  ]);

  // Wishlist list
  const [wishlistItems, setWishlistItems] = useState([
    { id: 'collage_frame', title: 'Wooden Collage Photo Frame', price: 749, image: collageFrameImg },
    { id: 'customized_mug', title: 'Customized Mug', price: 299, image: customizedMugImg },
    { id: 'keychain', title: 'Personalized Keychain', price: 199, image: keychainImg },
    { id: 'acrylic_frame', title: 'Acrylic LED Frame', price: 899, image: acrylicFrameImg },
    { id: 'explosion_box', title: 'Explosion Gift Box', price: 1199, image: explosionBoxImg },
    { id: 'mini_gift_box', title: 'Mini Surprise Gift Box', price: 949, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80' },
    { id: 'name_plate', title: 'Acrylic Name Plate', price: 699, image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80' },
    { id: 'memory_kit', title: 'Memory Lane Gift Kit', price: 899, image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80' }
  ]);

  // --- TOAST TRIGGER ---
  const triggerToast = (msg) => {
    setToastMsg(msg);
  };

  // --- ACTIONS ---

  // Quantity Change
  const handleQtyChange = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQty } : item
    ));
  };

  // Dropdown Change
  const handleOptionChange = (id, newOption) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, selectedOption: newOption } : item
    ));
  };

  // Wishlist Toggle inside Cart Item
  const handleWishlistToggle = (itemId) => {
    const isAlreadyWishlisted = wishlistItems.some(item => item.id === itemId);
    const cartItem = cartItems.find(item => item.id === itemId);

    if (isAlreadyWishlisted) {
      // Remove from wishlist
      setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
      triggerToast("Removed from Wishlist 💔");
    } else {
      // Add to wishlist
      const newWishlistItem = {
        id: itemId,
        title: cartItem ? cartItem.title : "Product",
        price: cartItem ? cartItem.currentPrice : 999,
        image: cartItem ? cartItem.image : ledLampImg
      };
      setWishlistItems([...wishlistItems, newWishlistItem]);
      triggerToast("Added to Wishlist ❤️");
    }
  };

  // Delete Cart Item
  const handleDeleteTrigger = (id) => {
    console.log('Delete triggered for ID:', id);
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (!deleteConfirmId) return;
    setCartItems((prevItems) => prevItems.filter(item => item.id !== deleteConfirmId));
    triggerToast("Item removed from cart.");
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
    // Check if product is already in cart
    const existing = cartItems.find(c => c.id === item.id);
    if (existing) {
      setCartItems(cartItems.map(c => 
        c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
      ));
    } else {
      // Add new cart item with defaults
      const mapping = {
        collage_frame: { original: 999, discount: 25, optionType: 'Size', defaultOpt: 'Standard', opts: ['Standard', 'Large'] },
        customized_mug: { original: 399, discount: 25, optionType: 'Color', defaultOpt: 'White', opts: ['White', 'Black'] },
        keychain: { original: 299, discount: 33, optionType: 'Material', defaultOpt: 'Metal', opts: ['Metal', 'Wood'] },
        acrylic_frame: { original: 1199, discount: 25, optionType: 'Size', defaultOpt: 'Medium', opts: ['Medium', 'Large'] },
        explosion_box: { original: 1599, discount: 25, optionType: 'Color', defaultOpt: 'Red & Black', opts: ['Red & Black', 'Blue & Gold'] },
        mini_gift_box: { original: 1299, discount: 27, optionType: 'Color', defaultOpt: 'Red & Black', opts: ['Red & Black', 'Blue & Gold'] },
        name_plate: { original: 899, discount: 22, optionType: 'Size', defaultOpt: 'Medium', opts: ['Medium', 'Large'] },
        memory_kit: { original: 1199, discount: 25, optionType: 'Color', defaultOpt: 'Blue', opts: ['Blue', 'Brown'] }
      };

      const meta = mapping[item.id] || { original: item.price, discount: 0, optionType: 'Size', defaultOpt: 'Standard', opts: ['Standard'] };

      const newCartItem = {
        id: item.id,
        title: item.title,
        subtitle: 'From your wishlist',
        image: item.image,
        originalPrice: meta.original,
        currentPrice: item.price,
        discount: meta.discount,
        quantity: 1,
        optionType: meta.optionType,
        selectedOption: meta.defaultOpt,
        options: meta.opts
      };
      setCartItems([...cartItems, newCartItem]);
    }

    // Remove from wishlist
    setWishlistItems(wishlistItems.filter(w => w.id !== item.id));
    triggerToast("Added to Cart 🛒");
  };

  // Wishlist card heart toggle (removes from wishlist)
  const handleRemoveFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(w => w.id !== id));
    triggerToast("Removed from Wishlist 💔");
  };

  const pendingDeleteItem = cartItems.find(item => item.id === deleteConfirmId);

  // Checkout handlers
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      triggerToast("Your cart is empty! 🛒");
      return;
    }
    setCheckoutOpen(true);
  };

  const handleContinueShopping = () => {
    setCheckoutOpen(false);
    // Reset/clear cart items or keep them? Usually continue shopping closes the success state. Let's clear the cart on success!
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Render content depending on active Tab
  const renderTabContent = () => {
    if (activeTab === 'cart') {
      if (cartItems.length === 0) {
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
            {cartItems.map((item) => (
              <CartItem 
                key={item.id}
                item={item}
                onQtyChange={handleQtyChange}
                onDelete={handleDeleteTrigger}
                onWishlistToggle={handleWishlistToggle}
                onOptionChange={handleOptionChange}
                isWishlisted={wishlistItems.some(w => w.id === item.id)}
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
            cartItems={cartItems} 
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
        <div className="cart-items-container">
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', padding: '0 20px' }}>My Wishlist ({wishlistItems.length})</h2>
          {wishlistItems.length > 0 ? (
            <div className="wishlist-vertical-list">
              {wishlistItems.map((item) => (
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
    <div className="app-container">
      {/* Toast Notifications */}
      {toastMsg && (
        <div className="toast-container">
          <Popup message={toastMsg} onClose={() => setToastMsg(null)} />
        </div>
      )}

      {/* Header */}
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onTabChange={setActiveTab} 
        activeTab={activeTab} 
      />

      {/* Tabs */}
      <CartTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistItems.length}
      />

      {/* Scrollable Content */}
      <div className="app-content">
        {renderTabContent()}

        {/* Wishlist Bottom Section (always visible on Cart tab matching screenshot) */}
        {activeTab === 'cart' && (
          <div className="wishlist-section">
            <div className="wishlist-section-header">
              <h3 className="wishlist-section-title">Wishlist ({wishlistItems.length})</h3>
              <a 
                href="#" 
                className="view-all-link"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('wishlist');
                }}
              >
                View All &gt;
              </a>
            </div>
            {wishlistItems.length > 0 ? (
              <div className="wishlist-vertical-list">
                {wishlistItems.slice(0, 5).map((item) => (
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmId(null)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="confirm-title">Remove Item?</h3>
            <p className="confirm-desc">
              Are you sure you want to remove this product from your cart?
            </p>
            <div className="confirm-btn-row">
              <button className="confirm-btn cancel" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button className="confirm-btn danger" onClick={confirmDelete}>
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
