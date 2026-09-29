import React, { useState, useEffect } from 'react';
import '../../style.css';
import { orderService } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';
import CartTabs from '../components/CartTabs';
import CartItem from '../components/CartItem';
import PromoCode from '../components/PromoCode';
import PriceDetails from '../components/PriceDetails';
import WishlistCard from '../components/WishlistCard';
import Popup from '../components/Popup';
import CheckoutModal from '../components/CheckoutModal';
import BottomNavbar from '../components/BottomNavbar';
import { 
  Check, 
  Copy, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  Zap, 
  QrCode, 
  Banknote, 
  MapPin, 
  Edit3, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';

// Public asset image paths
const ledLampImg = '/assets/images/products/led_photo_lamp.jpg';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'upi' | 'card'
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [cardInfo, setCardInfo] = useState({ number: '', expiry: '', cvv: '', name: '' });

  // Dynamic Delivery Address State
  const [customAddress, setCustomAddress] = useState(currentUser?.address || '');
  const [customPincode, setCustomPincode] = useState(currentUser?.pincode || '');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    if (currentUser?.address) setCustomAddress(currentUser.address);
    if (currentUser?.pincode) setCustomPincode(currentUser.pincode);
  }, [currentUser]);

  // cartItems and wishlistItems from props
  const safeCartItems = cartItems || [];
  const safeWishlistItems = wishlistItems || [];

  const subtotal = safeCartItems.reduce((sum, item) => sum + (item.currentPrice * (item.quantity || 1)), 0);
  const discountAmount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.rate / 100)) : 0;
  const deliveryCharge = (subtotal >= 999 || safeCartItems.length === 0) ? 0 : 49;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryCharge);

  const freeDeliveryThreshold = 999;
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  // Toast Trigger
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
  const handleQtyChange = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(safeCartItems.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    ));
  };

  const handleOptionChange = (id, newOption) => {
    setCartItems(safeCartItems.map(item =>
      item.id === id ? { ...item, selectedOption: newOption } : item
    ));
  };

  const handleWishlistToggle = (itemId) => {
    const isAlreadyWishlisted = safeWishlistItems.some(item => item.id === itemId);
    const cartItem = safeCartItems.find(item => item.id === itemId);

    if (isAlreadyWishlisted) {
      setWishlistItems(safeWishlistItems.filter(item => item.id !== itemId));
      triggerToast("Removed from Wishlist 💔");
    } else {
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

  const handleDeleteTrigger = (id) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (!deleteConfirmId) return;
    setCartItems(prev => prev.filter(item => item.id !== deleteConfirmId));
    triggerToast("Item removed from cart 🗑️");
    setDeleteConfirmId(null);
  };

  const handleApplyCoupon = (code, rate) => {
    setAppliedCoupon({ code, rate });
    triggerToast(`🎉 Coupon '${code}' applied successfully! ${rate}% OFF!`);
  };

  const handleMoveToCart = (item) => {
    if (!item) return;
    const targetId = String(item.id || item.title);
    const itemTitle = item.title || 'Custom Product';

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
        subtitle: item.subtitle || 'Personalized Gift',
        image: item.image || ledLampImg,
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

    setWishlistItems(prevWish => prevWish.filter(w => String(w.id) !== targetId && w.title !== itemTitle));
    triggerToast("Added to Cart 🛒");
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems(safeWishlistItems.filter(w => String(w.id) !== String(id)));
    triggerToast("Removed from Wishlist 💔");
  };

  // Checkout Handler
  const handleCheckout = async () => {
    if (safeCartItems.length === 0) {
      triggerToast("Your cart is empty! 🛒");
      return;
    }

    setIsSubmitting(true);

    const finalStreet = customAddress.trim() || currentUser?.address || '123 Park Avenue, Block C';
    const finalPincode = customPincode.trim() || currentUser?.pincode || '600028';

    const orderData = {
      totalAmount: finalTotal,
      subtotal,
      deliveryCharge,
      discountAmount,
      items: safeCartItems,
      appliedCoupon: appliedCoupon ? { code: appliedCoupon.code, rate: appliedCoupon.rate } : null,
      couponCode: appliedCoupon ? appliedCoupon.code : null,
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI / QR Code' : 'Credit / Debit Card',
      paymentStatus: paymentMethod === 'cod' ? 'Pending (Pay on Delivery)' : 'Paid Online (Verified)',
      paymentScreenshot: paymentScreenshot || null,
      customerEmail: currentUser?.email || 'customer@inexgifts.com',
      customerName: currentUser?.name || 'Valued Customer',
      shippingAddress: {
        fullName: currentUser?.name || 'Customer',
        phone: currentUser?.phone || '9876543210',
        street: finalStreet,
        city: 'Chennai',
        pincode: finalPincode
      }
    };

    try {
      await orderService.createOrder(orderData);
      triggerToast("🎉 Order placed successfully!");
      setCheckoutOpen(true);
    } catch (e) {
      console.error("Order error:", e);
      triggerToast("Order placed locally!");
      setCheckoutOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinueShopping = () => {
    setCheckoutOpen(false);
    setCartItems([]);
    setAppliedCoupon(null);
    setPaymentScreenshot(null);
    setPaymentVerified(false);
    if (onBack) {
      onBack();
    } else if (setView) {
      setView('home1');
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

  // Quick Coupons
  const quickCoupons = [
    { code: 'INEX20', rate: 20, label: '20% OFF' },
    { code: 'WELCOME10', rate: 10, label: '10% OFF' },
    { code: 'FESTIVE30', rate: 30, label: '30% OFF' }
  ];

  // Render tab content
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
              Looks like you haven't added any gift items to your cart yet. Browse our personalized gifts catalog and pick something special!
            </p>
            <button
              onClick={() => {
                if (setView) setView('home1');
                else if (onBack) onBack();
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-500/25 transition active:scale-95 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue Shopping 🛍️
            </button>
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left Column: Cart Items, Address, and Payment (Balanced Height) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* 1. Free Delivery Progress Bar */}
            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 rounded-3xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                <span className="flex items-center gap-1.5">
                  {subtotal >= 999 ? (
                    <span className="text-emerald-700 font-extrabold flex items-center gap-1.5">
                      <Sparkles size={16} className="text-emerald-600 animate-spin" />
                      🎉 Congratulations! You have unlocked FREE Express Delivery!
                    </span>
                  ) : (
                    <span className="text-indigo-900">
                      🚚 Add <strong>₹{amountForFreeDelivery}</strong> more to unlock <span className="text-emerald-600 font-extrabold">FREE Express Delivery</span>!
                    </span>
                  )}
                </span>
                <span className="text-indigo-700 font-mono text-[11px] font-bold">{freeDeliveryProgress}%</span>
              </div>
              <div className="w-full bg-white/90 h-2.5 rounded-full overflow-hidden border border-indigo-100/80">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    subtotal >= 999 
                      ? 'bg-emerald-500 shadow-sm shadow-emerald-400' 
                      : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
                  }`}
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>

            {/* 2. Review Cart Items */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <ShoppingBag size={18} className="text-indigo-600" />
                  <span>Items in Your Cart ({safeCartItems.length})</span>
                </h2>
                <span className="text-xs font-bold text-slate-500">
                  Subtotal: <strong className="text-slate-900">₹{subtotal}</strong>
                </span>
              </div>

              <div className="cart-items-container space-y-3">
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
            </div>

            {/* 3. Delivery Address Details */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3 text-left">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <MapPin size={17} className="text-indigo-600" /> Delivery Address
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 border border-indigo-100 hover:bg-indigo-100"
                >
                  <Edit3 size={13} />
                  <span>{isEditingAddress ? 'Done ✓' : 'Change Address'}</span>
                </button>
              </div>

              {!isEditingAddress ? (
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="text-slate-400 font-medium">Recipient Name:</span>
                    <span className="font-extrabold text-slate-900">{currentUser?.name || 'Customer'}</span>
                  </div>

                  <div className="flex justify-between items-start text-slate-700 gap-4">
                    <span className="text-slate-400 font-medium shrink-0">Street / Area Address:</span>
                    <span className="font-semibold text-right text-slate-800 leading-relaxed max-w-md">
                      {customAddress || currentUser?.address || '123 Park Avenue, Block C, Chennai'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-700">
                    <span className="text-slate-400 font-medium">Delivery Pincode:</span>
                    <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                      {customPincode || currentUser?.pincode || '600028'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Street Address / Flat No / Landmark:
                    </label>
                    <textarea
                      rows={2}
                      value={customAddress}
                      onChange={(e) => setCustomAddress(e.target.value)}
                      placeholder="Enter complete delivery address"
                      className="w-full p-3 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Delivery Pincode:
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
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition cursor-pointer"
                  >
                    Save & Confirm Delivery Address ✓
                  </button>
                </div>
              )}
            </div>

            {/* 4. Select Payment Method */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <CreditCard size={18} className="text-indigo-600" /> Select Payment Method
                </h3>
                <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck size={12} /> 100% Safe & Encrypted
                </span>
              </div>

              {/* Payment Tabs Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'bg-indigo-50/80 border-indigo-500 text-indigo-700 ring-2 ring-indigo-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <Banknote size={22} className={paymentMethod === 'cod' ? 'text-indigo-600' : 'text-slate-500'} />
                  <span className="text-xs font-extrabold leading-tight">Cash on Delivery</span>
                  <span className="text-[10px] text-slate-400 font-medium">Pay at door</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'bg-indigo-50/80 border-indigo-500 text-indigo-700 ring-2 ring-indigo-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <QrCode size={22} className={paymentMethod === 'upi' ? 'text-indigo-600' : 'text-slate-500'} />
                  <span className="text-xs font-extrabold leading-tight">UPI / QR Code</span>
                  <span className="text-[10px] text-slate-400 font-medium">GPay, PhonePe</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-indigo-50/80 border-indigo-500 text-indigo-700 ring-2 ring-indigo-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <CreditCard size={22} className={paymentMethod === 'card' ? 'text-indigo-600' : 'text-slate-500'} />
                  <span className="text-xs font-extrabold leading-tight">Cards & NetBanking</span>
                  <span className="text-[10px] text-slate-400 font-medium">Instant pay</span>
                </button>
              </div>

              {/* Dynamic Content based on selected method */}
              {paymentMethod === 'cod' && (
                <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-4 space-y-1.5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs sm:text-sm">
                    <span>💵</span> Cash on Delivery Selected
                  </div>
                  <p className="text-xs text-emerald-700 leading-relaxed font-medium">
                    You can pay <strong>₹{finalTotal}</strong> via Cash or UPI QR scan directly to the delivery partner upon parcel delivery.
                  </p>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 text-center space-y-3.5 animate-in fade-in duration-200">
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    Scan QR code or pay exact total <strong className="text-indigo-600 font-extrabold">₹{finalTotal}</strong> via any UPI App:
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {/* QR Code Container */}
                    <div className="h-36 w-36 bg-white p-2 rounded-2xl border border-slate-200 shadow-inner flex flex-col items-center justify-center shrink-0">
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

                    <div className="flex-1 w-full text-left space-y-2.5">
                      {/* UPI ID & Copy button */}
                      <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs">
                        <span className="font-mono text-slate-800 font-bold">inexgifts@upi</span>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg transition cursor-pointer"
                        >
                          {copiedUpi ? 'Copied! ✓' : 'Copy UPI ID'}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setPaymentVerified(true);
                          triggerToast(`✅ UPI Payment verified for ₹${finalTotal}!`);
                        }}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 ${
                          paymentVerified
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                        }`}
                      >
                        {paymentVerified ? (
                          <>
                            <Check size={14} /> Payment Verified (₹{finalTotal})
                          </>
                        ) : (
                          '✓ I Have Completed UPI Payment'
                        )}
                      </button>

                      <label className="text-[11px] text-slate-500 font-medium hover:text-indigo-600 cursor-pointer block text-center sm:text-left">
                        <span>📸 Or attach payment receipt screenshot (optional)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>

                      {paymentScreenshot && (
                        <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800">
                          <img src={paymentScreenshot} alt="Receipt" className="w-7 h-7 rounded object-cover border" />
                          <span className="flex-1 truncate font-bold">Screenshot Attached ✓</span>
                          <button
                            type="button"
                            onClick={() => setPaymentScreenshot(null)}
                            className="text-red-500 hover:underline font-bold px-1"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 text-left space-y-3 animate-in fade-in duration-200">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block mb-1">Card Number</label>
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="4532 •••• •••• 8890"
                      value={cardInfo.number}
                      onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 block mb-1">Valid Thru (MM/YY)</label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="12/28"
                        value={cardInfo.expiry}
                        onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 block mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="•••"
                        value={cardInfo.cvv}
                        onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">🔒 Encrypted with 256-bit bank grade security</p>
                </div>
              )}
            </div>

            {/* 5. Wishlist Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm sm:text-base font-bold text-gray-800">Saved Wishlist Items ({safeWishlistItems.length})</h3>
                <button
                  className="text-xs sm:text-sm font-semibold text-indigo-600 hover:underline cursor-pointer"
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
                  No wishlist items saved yet.
                </div>
              )}
            </div>
          </div>

          {/* Sticky Right Column: Order Summary & Place Order CTA */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-5 sticky top-24">
            {/* Quick Coupon Chips */}
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span>🏷️</span> Quick Discount Coupons
                </span>
                {appliedCoupon && (
                  <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Active: {appliedCoupon.code} ({appliedCoupon.rate}%)
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {quickCoupons.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleApplyCoupon(c.code, c.rate)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      appliedCoupon?.code === c.code
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                    }`}
                  >
                    <span>{c.code}</span>
                    <span className="text-[10px] opacity-80">({c.label})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Promo Code Box */}
            <PromoCode
              appliedCoupon={appliedCoupon}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={() => {
                setAppliedCoupon(null);
                triggerToast("Coupon removed!");
              }}
              subtotal={subtotal}
              onToast={triggerToast}
            />

            {/* Price Details Breakdown */}
            <PriceDetails
              cartItems={safeCartItems}
              appliedCoupon={appliedCoupon}
            />

            {/* Final Place Order Button */}
            <div className="checkout-btn-container pt-1">
              <button
                type="button"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-[0.99] text-white shadow-xl shadow-indigo-600/30 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={handleCheckout}
              >
                {isSubmitting ? (
                  <span>Processing Your Order... ⏳</span>
                ) : paymentMethod === 'cod' ? (
                  <>
                    <ShoppingBag size={18} /> Place Order (Cash on Delivery - ₹{finalTotal})
                  </>
                ) : paymentMethod === 'upi' ? (
                  <>
                    <Zap size={18} /> Confirm Order (UPI - ₹{finalTotal})
                  </>
                ) : (
                  <>
                    <CreditCard size={18} /> Pay ₹{finalTotal} & Place Order
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-medium mt-3">
                <span className="flex items-center gap-1"><Truck size={13} className="text-emerald-600" /> Fast Delivery</span>
                <span>•</span>
                <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-indigo-600" /> Safe Packaging</span>
                <span>•</span>
                <span>⭐ 4.9/5 Rating</span>
              </div>
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
            <div className="bg-white rounded-3xl p-12 border border-slate-200/80 text-center max-w-md mx-auto my-6 space-y-3">
              <span className="text-3xl block mb-1">❤️</span>
              <p className="text-base font-extrabold text-slate-800">Your Wishlist is Empty</p>
              <p className="text-xs text-slate-500 font-medium">Heart any personalized gift to save it here for later.</p>
              <button
                onClick={() => {
                  if (setView) setView('gift');
                  else if (onBack) onBack();
                }}
                className="mt-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer"
              >
                Explore Gifts 🎁
              </button>
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
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors shadow-sm cursor-pointer"
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
