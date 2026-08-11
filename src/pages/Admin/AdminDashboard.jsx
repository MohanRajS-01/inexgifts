import React, { useState, useEffect } from 'react';
import { bannerService } from '../../services/bannerService';
import { orderService } from '../../services/orderService';
import { couponService } from '../../services/couponService';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { useAuth } from '../../context/AuthContext';
import { 
  FiImage, 
  FiShoppingBag, 
  FiPlus, 
  FiTrash2, 
  FiEdit, 
  FiCheckCircle, 
  FiLogOut, 
  FiHome, 
  FiRefreshCw, 
  FiLayers,
  FiEye,
  FiZap,
  FiTag,
  FiBox,
  FiFolderPlus,
  FiX
} from 'react-icons/fi';

export default function AdminDashboard({ setView }) {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('banners'); // 'banners' | 'orders' | 'products' | 'coupons'

  // Banner State
  const [banners, setBanners] = useState([]);
  const [editingBanner, setEditingBanner] = useState(null);
  const [showBannerForm, setShowBannerForm] = useState(false);
  const [bannerForm, setBannerForm] = useState({
    id: '',
    title: '',
    subtitle: '',
    desc: '',
    image: '',
    tag: 'Special Offer'
  });

  // Orders State
  const [orders, setOrders] = useState([]);

  // Products State
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productForm, setProductForm] = useState({
    id: '',
    title: '',
    category: 'LED Lamps',
    originalPrice: 1999,
    currentPrice: 1499,
    image: '/assets/images/products/led_photo_lamp.jpg'
  });

  // Category State
  const [categories, setCategories] = useState([]);
  const [showCustomCatInput, setShowCustomCatInput] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  // Coupons State
  const [coupons, setCoupons] = useState([]);
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: '',
    rate: 20,
    desc: 'Flat 20% OFF Discount',
    minOrder: 499
  });

  // Feedback Notification
  const [feedback, setFeedback] = useState(null);

  const showNotification = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  // Load Banners with live subscription
  useEffect(() => {
    const unsub = bannerService.subscribeBanners((latestBanners) => {
      setBanners(latestBanners);
    });
    return () => unsub();
  }, []);

  // Load Categories with live subscription
  useEffect(() => {
    const unsubCat = categoryService.subscribeCategories((latestCat) => {
      setCategories(latestCat);
    });
    return () => unsubCat();
  }, []);

  // Load Products with live subscription
  useEffect(() => {
    const unsubProds = productService.subscribeProducts((latestProds) => {
      setProducts(latestProds);
    });
    return () => unsubProds();
  }, []);

  // Load Orders
  const fetchOrders = async () => {
    const data = await orderService.getOrders('admin@inexgifts.com');
    setOrders(data);
  };

  // Load Coupons
  const fetchCoupons = async () => {
    const coups = await couponService.getCoupons();
    setCoupons(coups);
  };

  useEffect(() => {
    fetchOrders();
    fetchCoupons();
  }, []);

  // Banner Actions
  const handleOpenNewBanner = () => {
    setEditingBanner(null);
    setBannerForm({
      id: `banner_${Date.now()}`,
      title: 'Mega Festive Discount',
      subtitle: 'Flat 25% OFF',
      desc: 'Exclusive personalized gifts on huge discount today.',
      image: '/Banner1.png',
      tag: 'Limited Offer'
    });
    setShowBannerForm(true);
  };

  const handleEditBanner = (b) => {
    setEditingBanner(b);
    setBannerForm({ ...b });
    setShowBannerForm(true);
  };

  const handleSaveBannerSubmit = async (e) => {
    e.preventDefault();
    if (!bannerForm.title || !bannerForm.image) {
      alert("Please provide title and image URL");
      return;
    }

    await bannerService.saveBanner(bannerForm);
    setShowBannerForm(false);
    showNotification("✨ Banner saved! Changes are now reflecting live on Customer Home Screen.");
  };

  const handleDeleteBanner = async (bannerId) => {
    if (window.confirm("Are you sure you want to remove this hero banner?")) {
      await bannerService.deleteBanner(bannerId);
      showNotification("🗑️ Banner removed successfully.");
    }
  };

  const handleResetBanners = async () => {
    if (window.confirm("Reset all banners to default collection?")) {
      await bannerService.resetToDefaults();
      showNotification("🔄 Banners reset to defaults.");
    }
  };

  // Order Actions
  const handleUpdateStatus = async (orderId, newStatus) => {
    await orderService.updateOrderStatus(orderId, newStatus);
    await fetchOrders();
    showNotification(`📦 Order ${orderId} status updated to ${newStatus}`);
  };

  // Product Actions
  const handleOpenNewProduct = () => {
    setEditingProduct(null);
    setProductForm({
      id: `PROD-${Math.floor(1000 + Math.random() * 9000)}`,
      title: '',
      category: categories[0] || 'LED Lamps',
      originalPrice: 1999,
      currentPrice: 1499,
      image: '/assets/images/products/led_photo_lamp.jpg',
      inStock: true,
      deliveryText: 'Get it in 2-3 Business Days'
    });
    setShowCustomCatInput(false);
    setShowProductForm(true);
  };

  const handleEditProduct = (p) => {
    setEditingProduct(p);
    setProductForm({
      id: p.id,
      title: p.title || '',
      category: p.category || 'LED Lamps',
      originalPrice: p.originalPrice || Math.round((p.currentPrice || 999) * 1.25),
      currentPrice: p.currentPrice || 999,
      image: p.image || '/assets/images/products/led_photo_lamp.jpg',
      inStock: p.inStock !== false,
      deliveryText: p.deliveryText || 'Get it in 2-3 Business Days'
    });
    setShowCustomCatInput(false);
    setShowProductForm(true);
  };

  const handleToggleStockStatus = async (product) => {
    const newStockState = !(product.inStock !== false);
    const updated = { ...product, inStock: newStockState };
    await productService.addProduct(updated);
    showNotification(`📦 Product '${product.title}' is now ${newStockState ? 'IN STOCK ✓' : 'OUT OF STOCK ✕'}`);
  };

  const handleSaveProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.title || !productForm.currentPrice) {
      alert("Please enter title and price.");
      return;
    }

    await productService.addProduct(productForm);
    setShowProductForm(false);
    showNotification(editingProduct ? `✨ Product '${productForm.title}' details updated in Firestore!` : `🛍️ Product '${productForm.title}' created in Firestore!`);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Delete this product from Firestore?")) {
      await productService.deleteProduct(id);
      showNotification("🗑️ Product deleted from Firestore.");
    }
  };

  // Custom Category Handler
  const handleAddNewCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const addedName = await categoryService.addCategory(newCatName.trim());
    if (addedName) {
      setProductForm(prev => ({ ...prev, category: addedName }));
      setNewCatName('');
      setShowCustomCatInput(false);
      showNotification(`🏷️ Custom Category '${addedName}' saved to Firestore!`);
    }
  };

  // Coupon Actions
  const handleSaveCouponSubmit = async (e) => {
    e.preventDefault();
    if (!couponForm.code || !couponForm.rate) {
      alert("Please enter coupon code and discount percentage.");
      return;
    }

    await couponService.addCoupon(couponForm);
    setShowCouponForm(false);
    setCouponForm({
      code: '',
      rate: 20,
      desc: 'Flat 20% OFF Discount',
      minOrder: 499
    });
    await fetchCoupons();
    showNotification(`🏷️ Coupon '${couponForm.code.toUpperCase()}' created in Firestore! Customers can now type and apply it.`);
  };

  const handleDeleteCoupon = async (code) => {
    if (window.confirm(`Delete coupon '${code}' from Firestore?`)) {
      await couponService.deleteCoupon(code);
      await fetchCoupons();
      showNotification(`🗑️ Coupon '${code}' deleted.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* Top Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-indigo-600/20 text-indigo-400 p-2 rounded-xl border border-indigo-500/30">
              <FiLayers className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-extrabold text-white text-base leading-none">INEX Gifts Admin</h1>
              <span className="text-[10px] text-slate-400 font-medium">Cloud Firestore Realtime Sync</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setView('home1')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center gap-1.5"
            >
              <FiEye className="h-3.5 w-3.5" /> Customer View
            </button>

            <button
              onClick={() => {
                logout();
                setView('login');
              }}
              className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
            >
              <FiLogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Floating Notification */}
      {feedback && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-500 text-slate-950 font-extrabold text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <FiZap className="h-4 w-4" /> {feedback}
        </div>
      )}

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Overview Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-4 flex flex-col">
            <span className="text-xs font-semibold text-slate-400">Total Banners</span>
            <span className="text-2xl font-extrabold text-white mt-1">{banners.length}</span>
            <span className="text-[10px] text-emerald-400 mt-1 font-medium">⚡ Active & Synced</span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-4 flex flex-col">
            <span className="text-xs font-semibold text-slate-400">Total Orders</span>
            <span className="text-2xl font-extrabold text-white mt-1">{orders.length}</span>
            <span className="text-[10px] text-indigo-400 mt-1 font-medium">📦 Customer Orders</span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-4 flex flex-col">
            <span className="text-xs font-semibold text-slate-400">Total Products</span>
            <span className="text-2xl font-extrabold text-white mt-1">{products.length}</span>
            <span className="text-[10px] text-purple-400 mt-1 font-medium">🛍️ In Store</span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-4 flex flex-col">
            <span className="text-xs font-semibold text-slate-400">Active Coupons</span>
            <span className="text-2xl font-extrabold text-amber-400 mt-1">{coupons.length}</span>
            <span className="text-[10px] text-slate-400 mt-1 font-medium">🏷️ Firestore Synced</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-slate-700 mb-6 gap-2">
          <button
            onClick={() => setActiveTab('banners')}
            className={`px-4 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'banners'
                ? 'border-indigo-500 text-indigo-400 bg-slate-800/50 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FiImage className="h-4 w-4" /> Home Banners ({banners.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'orders'
                ? 'border-indigo-500 text-indigo-400 bg-slate-800/50 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FiShoppingBag className="h-4 w-4" /> Customer Orders ({(orders || []).length})
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'products'
                ? 'border-indigo-500 text-indigo-400 bg-slate-800/50 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FiBox className="h-4 w-4" /> Manage Products ({(products || []).length})
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'coupons'
                ? 'border-indigo-500 text-indigo-400 bg-slate-800/50 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FiTag className="h-4 w-4" /> Manage Coupons ({(coupons || []).length})
          </button>
        </div>

        {/* TAB 1: BANNER MANAGEMENT */}
        {activeTab === 'banners' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Hero Carousel Banners</h3>
                <p className="text-xs text-slate-400">Add or edit banners to change what customers see on the main homepage slider.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetBanners}
                  className="px-3.5 py-2.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-xl transition flex items-center gap-1.5"
                >
                  <FiRefreshCw className="h-3.5 w-3.5" /> Reset Defaults
                </button>
                <button
                  onClick={handleOpenNewBanner}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
                >
                  <FiPlus className="h-4 w-4" /> Add New Banner
                </button>
              </div>
            </div>

            {/* Banner Form Modal */}
            {showBannerForm && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-extrabold text-white">
                      {editingBanner ? '✏️ Edit Hero Banner' : '➕ Add New Hero Banner'}
                    </h4>
                    <button
                      onClick={() => setShowBannerForm(false)}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveBannerSubmit} className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Banner Title</label>
                      <input
                        type="text"
                        required
                        value={bannerForm.title}
                        onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                        placeholder="e.g. Make Every Moment"
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={bannerForm.subtitle}
                        onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                        placeholder="e.g. Extra Special"
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Tag / Badge</label>
                      <input
                        type="text"
                        value={bannerForm.tag}
                        onChange={(e) => setBannerForm({ ...bannerForm, tag: e.target.value })}
                        placeholder="e.g. Bestseller, Trending, 20% OFF"
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Description</label>
                      <textarea
                        value={bannerForm.desc}
                        onChange={(e) => setBannerForm({ ...bannerForm, desc: e.target.value })}
                        placeholder="e.g. Unique gifts for your special ones..."
                        rows={2}
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-medium resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Image Path / URL</label>
                      <input
                        type="text"
                        required
                        value={bannerForm.image}
                        onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                        placeholder="e.g. /Banner1.png or image URL"
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setShowBannerForm(false)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                      >
                        {editingBanner ? 'Update Banner ✓' : 'Save Banner ✓'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Banners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {(banners || []).map((b, idx) => (
                <div key={b.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col">
                  <div className="relative h-44 bg-slate-800 overflow-hidden">
                    <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow">
                      Slide #{idx + 1}
                    </span>
                    <div className="absolute bottom-3 left-4 right-4">
                      <h4 className="text-white font-extrabold text-base leading-tight">{b.title}</h4>
                      <p className="text-indigo-300 text-sm font-semibold">{b.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between bg-slate-800">
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{b.desc}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/80">
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <FiCheckCircle className="h-3.5 w-3.5" /> Displaying on Homepage
                      </span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEditBanner(b)} className="p-2 bg-slate-700 hover:bg-slate-600 text-indigo-300 rounded-xl transition">
                          <FiEdit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteBanner(b.id)} className="p-2 bg-slate-700 hover:bg-red-500/30 text-red-400 rounded-xl transition">
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ORDER MANAGEMENT */}
        {activeTab === 'orders' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Customer Orders</h3>
                <p className="text-xs text-slate-400">Track and update delivery status for customer orders in real time.</p>
              </div>

              <button
                onClick={fetchOrders}
                className="px-3.5 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-xl transition flex items-center gap-1.5"
              >
                <FiRefreshCw className="h-3.5 w-3.5" /> Refresh Orders
              </button>
            </div>

            {(!orders || orders.length === 0) ? (
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-12 text-center">
                <FiShoppingBag className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white">No Orders Received Yet</h4>
                <p className="text-xs text-slate-400 mt-1">When customers place orders from their cart, they will appear here instantly.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {(orders || []).map((ord) => (
                  <div key={ord.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-white text-base">{ord.id}</span>
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                          ord.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          ord.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {ord.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300">
                        Date: <span className="font-semibold text-white">{ord.date || ord.createdAt}</span> | Total: <span className="font-bold text-emerald-400">₹{ord.totalAmount}</span>
                      </p>

                      <div className="text-xs text-slate-400">
                        Email: <span className="text-indigo-300 font-mono font-bold">{ord.customerEmail || 'user@example.com'}</span> | Name: <span className="text-slate-200">{ord.shippingAddress?.fullName || 'Customer'}</span> ({ord.shippingAddress?.phone || '9876543210'})
                      </div>

                      <div className="text-xs text-amber-300 font-medium">
                        📍 Delivery Address: <span className="text-slate-200 font-semibold">{(ord.shippingAddress?.street || 'Not Provided').replace(/,\s*Chennai\s*$/i, '')}</span> {ord.shippingAddress?.pincode && <span className="text-indigo-300 font-mono font-bold">({ord.shippingAddress.pincode})</span>}
                      </div>

                      <div className="text-[11px] text-slate-400 mt-2">
                        Items: {ord.items?.map(i => `${i.title} (x${i.quantity || 1})`).join(', ') || 'Custom Products'}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <label className="text-xs text-slate-300 font-semibold">Change Status:</label>
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-xs text-slate-100 rounded-xl px-3 py-2 outline-none focus:border-indigo-500 font-semibold"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Add & Edit Products</h3>
                <p className="text-xs text-slate-400">Edit product details, prices, or add new items with custom categories directly in Cloud Firestore.</p>
              </div>

              <button
                onClick={handleOpenNewProduct}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
              >
                <FiPlus className="h-4 w-4" /> Add New Product
              </button>
            </div>

            {/* Product Form Modal */}
            {showProductForm && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-extrabold text-white">
                      {editingProduct ? '✏️ Edit Product Details & Price' : '➕ Add New Product to Firestore'}
                    </h4>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                      ID: {productForm.id}
                    </span>
                  </div>

                  <form onSubmit={handleSaveProductSubmit} className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Product Title</label>
                      <input
                        type="text"
                        required
                        value={productForm.title}
                        onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                        placeholder="e.g. Personalized Photo Lamp"
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>

                    {/* Category Selection with Custom Category Addition */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs text-slate-300 font-semibold">Category</label>
                        <button
                          type="button"
                          onClick={() => setShowCustomCatInput(!showCustomCatInput)}
                          className="text-[11px] font-extrabold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        >
                          <FiFolderPlus className="h-3 w-3" /> {showCustomCatInput ? 'Select Existing' : '+ Add Custom Category'}
                        </button>
                      </div>

                      {showCustomCatInput ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                            placeholder="Type new category name (e.g. Jewelry)"
                            className="flex-1 bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500"
                          />
                          <button
                            type="button"
                            onClick={handleAddNewCategory}
                            className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-medium"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Current Selling Price (₹)</label>
                        <input
                          type="number"
                          required
                          value={productForm.currentPrice}
                          onChange={(e) => setProductForm({ ...productForm, currentPrice: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 text-white text-xs font-bold text-emerald-400 rounded-xl p-3 outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Original Price (₹)</label>
                        <input
                          type="number"
                          value={productForm.originalPrice}
                          onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Stock Status Availability Toggle */}
                    <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <div>
                        <span className="text-xs font-bold text-white block">Stock Availability</span>
                        <span className="text-[10px] text-slate-400">Controls whether customers see 'Add to Cart' or 'Out of Stock'</span>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={productForm.inStock}
                          onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700 cursor-pointer"
                        />
                        <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${productForm.inStock ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                          {productForm.inStock ? 'In Stock ✓' : 'Out of Stock ✕'}
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Expected Delivery Days / Text</label>
                      <input
                        type="text"
                        value={productForm.deliveryText}
                        onChange={(e) => setProductForm({ ...productForm, deliveryText: e.target.value })}
                        placeholder="e.g. Get it in 2-3 Business Days or Get it by Tomorrow"
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Product Image URL</label>
                      <input
                        type="text"
                        required
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setShowProductForm(false)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                      >
                        {editingProduct ? 'Update Product Details ✓' : 'Save Product to Firestore ✓'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-md">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={p.image} alt={p.title} className="w-14 h-14 rounded-xl object-cover border border-slate-700 bg-slate-900 shrink-0" />
                    <div className="min-w-0 space-y-0.5">
                      <h4 className="text-xs font-bold text-white truncate">{p.title}</h4>
                      <p className="text-[10px] text-slate-400 truncate">
                        <span className="text-indigo-300 font-semibold">{p.category}</span> | <strong className="text-emerald-400 font-bold">₹{p.currentPrice}</strong>
                      </p>
                      <div className="flex items-center gap-2 pt-0.5">
                        <button
                          onClick={() => handleToggleStockStatus(p)}
                          title="Click to toggle stock status"
                          className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md border transition ${
                            p.inStock !== false
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30'
                          }`}
                        >
                          {p.inStock !== false ? 'In Stock ✓' : 'Out of Stock ✕'}
                        </button>
                        <span className="text-[9px] text-slate-400 truncate">🚚 {p.deliveryText || '2-3 Days'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleEditProduct(p)}
                      title="Edit Product Details & Price"
                      className="p-2 bg-slate-700 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-xl transition"
                    >
                      <FiEdit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      title="Delete Product"
                      className="p-2 bg-slate-700 hover:bg-red-500/30 text-red-400 rounded-xl transition"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COUPONS MANAGEMENT */}
        {activeTab === 'coupons' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Add & Manage Promo Coupons</h3>
                <p className="text-xs text-slate-400">Create discount coupons in Firestore. Customers apply these exact codes on the Cart Page.</p>
              </div>

              <button
                onClick={() => setShowCouponForm(true)}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
              >
                <FiPlus className="h-4 w-4" /> Add New Coupon
              </button>
            </div>

            {/* Coupon Form Modal */}
            {showCouponForm && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
                  <h4 className="text-base font-extrabold text-white">Create Coupon Code in Firestore</h4>
                  <form onSubmit={handleSaveCouponSubmit} className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Coupon Code (e.g. INEX20)</label>
                      <input
                        type="text"
                        required
                        value={couponForm.code}
                        onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                        placeholder="e.g. SPECIAL25"
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs font-mono font-bold rounded-xl p-3 outline-none focus:border-indigo-500 uppercase"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Discount Rate (%)</label>
                        <input
                          type="number"
                          required
                          value={couponForm.rate}
                          onChange={(e) => setCouponForm({ ...couponForm, rate: e.target.value })}
                          placeholder="e.g. 20"
                          className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Min Order Amount (₹)</label>
                        <input
                          type="number"
                          value={couponForm.minOrder}
                          onChange={(e) => setCouponForm({ ...couponForm, minOrder: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Description</label>
                      <input
                        type="text"
                        value={couponForm.desc}
                        onChange={(e) => setCouponForm({ ...couponForm, desc: e.target.value })}
                        placeholder="e.g. Flat 20% OFF on all items"
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowCouponForm(false)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl"
                      >
                        Save Coupon to Firestore ✓
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Coupons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-amber-400 text-base">{c.code}</span>
                      <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-500/30">
                        {c.rate}% OFF
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{c.desc}</p>
                    <p className="text-[10px] text-slate-400">Min Order: ₹{c.minOrder || 0}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCoupon(c.code)}
                    className="p-2 bg-slate-700 hover:bg-red-500/30 text-red-400 rounded-xl transition"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
