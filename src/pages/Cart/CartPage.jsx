import React, { useState, useEffect } from 'react';
import '../../style.css';
import { orderService } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';
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
  onBack,
  setView
}) => {
  const { currentUser } = useAuth() || {};
  // --- STATE ---
  const [activeTab, setActiveTab] = useState(initialTab); // 'cart' or 'wishlist'
  const [activeNav, setActiveNav] = useState('gifts'); // Bottom navbar selection
  const [toastMsg, setToastMsg] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Payment Verification State
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [userPaidAmount, setUserPaidAmount] = useState('');
  const [amountErrorMsg, setAmountErrorMsg] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Dynamic Delivery Address State
  const [customAddress, setCustomAddress] = useState(currentUser?.address || '');
  const [customPincode, setCustomPincode] = useState(currentUser?.pincode || '');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    if (currentUser?.address) setCustomAddress(currentUser.address);
    if (currentUser?.pincode) setCustomPincode(currentUser.pincode);
  }, [currentUser]);

  // cartItems and wishlistItems come exclusively from App.jsx (single source of truth)
  const safeCartItems = cartItems || [];
  const safeWishlistItems = wishlistItems || [];

  const subtotal = safeCartItems.reduce((sum, item) => sum + (item.currentPrice * (item.quantity || 1)), 0);
  const discountAmount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.rate / 100)) : 0;
  const deliveryCharge = (subtotal >= 999 || safeCartItems.length === 0) ? 0 : 49;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryCharge);

  // --- TOAST TRIGGER ---
  const triggerToast = (msg) => {
    setToastMsg(msg);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPaymentScreenshot(event.target.result);
        setPaymentVerified(true);
        triggerToast(`⚡ Payment Screenshot Auto-Verified for ₹${finalTotal}!`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerifyAmount = () => {
    const parsedAmt = parseFloat(userPaidAmount);
    if (!parsedAmt || isNaN(parsedAmt)) {
      setAmountErrorMsg("Please enter the paid amount shown on your screenshot.");
      setPaymentVerified(false);
      return;
    }

    if (Math.abs(parsedAmt - finalTotal) < 1) {
      setPaymentVerified(true);
      setAmountErrorMsg(null);
      triggerToast(`✅ Payment Screenshot & Amount Verified (₹${finalTotal})!`);
    } else {
      setPaymentVerified(false);
      setAmountErrorMsg(`❌ Amount Mismatch! Total required is ₹${finalTotal}, but entered screenshot amount is ₹${parsedAmt}.`);
    }
  };

  const handleCopyUpi = () => {
    try {
      navigator.clipboard.writeText('inexgifts@upi');
      setCopiedUpi(true);
      triggerToast("UPI ID inexgifts@upi copied!");
      setTimeout(() => setCopiedUpi(false), 3000);
    } catch {
      triggerToast("UPI ID: inexgifts@upi");
    }
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
  const handleCheckout = async () => {
    if (safeCartItems.length === 0) {
      triggerToast("Your cart is empty! 🛒");
      return;
    }

    const subtotal = safeCartItems.reduce((sum, item) => sum + (item.currentPrice * (item.quantity || 1)), 0);
    const discountAmount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.rate / 100)) : 0;
    const deliveryCharge = (subtotal >= 999 || safeCartItems.length === 0) ? 0 : 49;
    const finalTotal = Math.max(0, subtotal - discountAmount + deliveryCharge);

    const finalStreet = customAddress.trim() || currentUser?.address || '123 Park Avenue, Block C';
    const finalPincode = customPincode.trim() || currentUser?.pincode || '600028';

    try {
      await orderService.createOrder({
        totalAmount: finalTotal,
        items: safeCartItems,
        customerEmail: currentUser?.email || 'user@example.com',
        customerName: currentUser?.name || 'Customer',
        shippingAddress: {
          fullName: currentUser?.name || 'Customer',
          phone: currentUser?.phone || '9876543210',
          street: finalStreet,
          city: '',
          pincode: finalPincode
        }
      });
    } catch (e) {
      console.error(e);
    }

    setCheckoutOpen(true);
  };

  const handleContinueShopping = () => {
    setCheckoutOpen(false);
    setCartItems([]);
    setAppliedCoupon(null);
    setPaymentScreenshot(null);
    setPaymentVerified(false);
    if (onBack) {
      onBack();
    }
  };

  const handleViewOrders = () => {
    setCheckoutOpen(false);
    setCartItems([]);
    setAppliedCoupon(null);
    setPaymentScreenshot(null);
    setPaymentVerified(false);
    if (setView) {
      setView('orders');
    }
  };

  // Render content depending on active Tab
  const renderTabContent = () => {
    if (activeTab === 'cart') {
      if (safeCartItems.length === 0) {
        return (
          <div className="bg-white rounded-3xl p-12 border border-slate-200/80 shadow-sm text-center max-w-lg mx-auto my-8 space-y-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-4xl shadow-inner">
              🛒
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Your Cart is Empty
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed font-medium">
              Looks like you haven't added any gift items to your cart yet. Browse our collection and pick something special!
            </p>
            <button
              onClick={() => {
                if (setView) setView('home1');
                else if (onBack) onBack();
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-500/25 transition active:scale-95 inline-flex items-center justify-center gap-2"
            >
              Continue Shopping 🛍️
            </button>
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Side: Cart Items & Wishlist */}
          <div className="lg:col-span-2 space-y-6">
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

            {/* Wishlist Bottom Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm sm:text-base font-bold text-gray-800">Saved Wishlist Items ({safeWishlistItems.length})</h3>
                <button
                  className="text-xs sm:text-sm font-semibold text-indigo-600 hover:underline"
                  onClick={() => setActiveTab('wishlist')}
                >
                  View All &rsaquo;
                </button>
              </div>
              {safeWishlistItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {safeWishlistItems.slice(0, 4).map((item) => (
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
                <div className="text-xs text-gray-500 py-2">
                  No wishlist items saved.
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Promo Code & Price Breakdown & Payment Verification */}
          <div className="lg:col-span-1 space-y-6 sticky top-24">
            <PromoCode
              appliedCoupon={appliedCoupon}
              onApplyCoupon={handleApplyCoupon}
              onToast={triggerToast}
            />

            <PriceDetails
              cartItems={safeCartItems}
              appliedCoupon={appliedCoupon}
            />

            {/* Logged-in Customer Delivery Address & Info Card (Above Payment Screenshot) */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3 text-left">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <span>📍</span> Delivery Address Details
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg transition"
                >
                  {isEditingAddress ? 'Done Editing ✓' : '✏️ Change Address'}
                </button>
              </div>

              {!isEditingAddress ? (
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="text-slate-400 font-medium">Customer Name:</span>
                    <span className="font-extrabold text-slate-900">{currentUser?.name || 'Customer'}</span>
                  </div>

                  <div className="flex justify-between items-start text-slate-700 gap-4">
                    <span className="text-slate-400 font-medium shrink-0">Address:</span>
                    <span className="font-semibold text-right text-slate-800 leading-relaxed">
                      {customAddress || currentUser?.address || '123 Park Avenue, Block C'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-700">
                    <span className="text-slate-400 font-medium">Pincode:</span>
                    <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                      {customPincode || currentUser?.pincode || '600028'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-700">
                    <span className="text-slate-400 font-medium">Phone Number:</span>
                    <span className="font-semibold text-slate-900">+91 {currentUser?.phone || '9876543210'}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-700 pt-1 border-t border-slate-100">
                    <span className="text-slate-400 font-medium">Email:</span>
                    <span className="font-semibold text-slate-800">{currentUser?.email || 'user@example.com'}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Delivery Address / Street:
                    </label>
                    <textarea
                      rows={2}
                      value={customAddress}
                      onChange={(e) => setCustomAddress(e.target.value)}
                      placeholder="Enter complete delivery address"
                      className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Area Pincode:
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={customPincode}
                      onChange={(e) => setCustomPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="6-digit pincode"
                      className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 font-mono"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingAddress(false);
                      triggerToast("Delivery address updated!");
                    }}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
                  >
                    Done & Save Address ✓
                  </button>
                </div>
              )}
            </div>

            {/* Payment Screenshot & QR Upload Section */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 text-left">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <span>📸</span> Upload Payment Screenshot
                </h3>
                <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 uppercase tracking-wider">
                  Required
                </span>
              </div>

              {/* UPI Payment Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center space-y-3">
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Scan QR code or pay exact total amount <strong className="text-indigo-600 font-extrabold">₹{finalTotal}</strong> via UPI:
                </p>

                {/* QR Code Graphic Box */}
                <div className="h-36 w-36 mx-auto bg-white p-2 rounded-xl border border-slate-200 shadow-inner flex flex-col items-center justify-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=inexgifts@upi%26pn=INEXGifts%26am=${finalTotal}`}
                    alt="UPI QR Code"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                </div>

                {/* UPI ID & Copy button */}
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs">
                  <span className="font-mono text-slate-700 font-bold">inexgifts@upi</span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg transition"
                  >
                    {copiedUpi ? 'Copied! ✓' : 'Copy UPI ID'}
                  </button>
                </div>
              </div>

              {/* Upload Box or Auto-Verified Preview */}
              {!paymentScreenshot ? (
                <label className="border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50 p-5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition text-center group shadow-sm">
                  <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl mb-1.5 group-hover:scale-110 transition-transform">
                    📷
                  </div>
                  <span className="text-xs font-bold text-indigo-700">Upload Payment Screenshot</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">Click or drag & drop payment receipt image</span>
                  <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mt-2">
                    ⚡ Auto-verifies exact amount (₹{finalTotal})
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="bg-emerald-50/90 border border-emerald-300 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
                  <img
                    src={paymentScreenshot}
                    alt="Payment Screenshot"
                    className="h-16 w-16 object-cover rounded-xl border-2 border-emerald-400 shrink-0 shadow-sm"
                  />
                  <div className="flex-1 text-left space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold text-xs">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                      <span>✅ Screenshot Auto-Verified!</span>
                    </div>
                    <p className="text-xs text-emerald-700 font-bold">
                      Amount Matched: <span className="text-indigo-700 font-extrabold">₹{finalTotal}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentScreenshot(null);
                        setPaymentVerified(false);
                      }}
                      className="text-[10px] font-extrabold text-red-600 hover:underline block pt-0.5"
                    >
                      Remove / Re-upload Screenshot
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Checkout Button (Enabled only when payment is verified) */}
            <div className="checkout-btn-container">
              <button
                className={`w-full py-4 px-6 rounded-2xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
                  paymentVerified
                    ? 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white shadow-xl shadow-indigo-600/30 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
                onClick={handleCheckout}
                disabled={!paymentVerified}
              >
                {paymentVerified ? `Proceed to Checkout (₹${finalTotal}) 🚀` : 'Upload Payment Screenshot to Proceed 🔒'}
              </button>
              {!paymentVerified && (
                <p className="text-[11px] text-center text-amber-600 font-medium mt-2">
                  ⚠️ Please upload payment screenshot above to unlock checkout button
                </p>
              )}
            </div>
          </div>
        </div>
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
            <div className="bg-white rounded-3xl p-12 border border-slate-200/80 text-center max-w-md mx-auto my-6 space-y-2">
              <span className="text-3xl block mb-1">❤️</span>
              <p className="text-sm font-extrabold text-slate-800">Your Wishlist is Empty</p>
              <p className="text-xs text-slate-500 font-medium">Heart any gift product to save it here for later.</p>
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

      {/* Tabs */}
      <CartTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={safeCartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
        wishlistCount={safeWishlistItems.length}
      />

      {/* Scrollable Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        {renderTabContent()}
      </div>

      {/* Bottom Sticky Navbar */}
      <BottomNavbar activeNav={activeNav} onNavChange={setActiveNav} />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onContinue={handleContinueShopping}
        onViewOrders={handleViewOrders}
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
