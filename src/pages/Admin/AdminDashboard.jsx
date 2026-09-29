import React, { useState, useEffect } from 'react';
import { bannerService } from '../../services/bannerService';
import { orderService } from '../../services/orderService';
import { couponService } from '../../services/couponService';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { userService } from '../../services/userService';
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
  FiX,
  FiUsers,
  FiSearch,
  FiUploadCloud,
  FiUpload,
  FiLoader,
  FiStar,
  FiExternalLink
} from 'react-icons/fi';
import { uploadImageToFirebase, uploadMultipleImagesToFirebase } from '../../services/storageService';

export default function AdminDashboard({ setView }) {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('banners'); // 'banners' | 'orders' | 'products' | 'coupons' | 'users'

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

  // Product Image Upload States
  const [isUploadingProduct, setIsUploadingProduct] = useState(false);
  const [productUploadProgress, setProductUploadProgress] = useState(0);
  const [productUploadStatus, setProductUploadStatus] = useState('');

  // Banner Image Upload States
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [bannerUploadProgress, setBannerUploadProgress] = useState(0);

  // Category State
  const [categories, setCategories] = useState([]);
  const [showCustomCatInput, setShowCustomCatInput] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  // Coupons State
  const [coupons, setCoupons] = useState([]);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: '',
    title: "Today's Special Offer!",
    rate: 20,
    desc: 'Flat 20% OFF Discount',
    minOrder: 499,
    active: true
  });

  // Seasonal Campaign State
  const [seasonalCampaign, setSeasonalCampaign] = useState({
    tag: 'Seasonal Campaign',
    title: 'Flat 25% OFF + Free Express Shipping',
    desc: 'Use promo code at checkout. Valid on customized couple gift boxes & hampers this week only.',
    code: 'GIFT25',
    discountText: '25% OFF'
  });
  const [showSeasonalForm, setShowSeasonalForm] = useState(false);

  // Registered Users State
  const [users, setUsers] = useState([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');

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

  // Load Users with live subscription
  useEffect(() => {
    const unsubUsers = userService.subscribeUsers((latestUsers) => {
      setUsers(latestUsers);
    });
    return () => unsubUsers();
  }, []);

  // Load Orders
  const fetchOrders = async () => {
    const data = await orderService.getAllOrders();
    setOrders(data);
  };

  // Load Coupons
  const fetchCoupons = async () => {
    const coups = await couponService.getCoupons();
    setCoupons(coups);
  };

  // Load Registered Users
  const fetchUsers = async () => {
    const uList = await userService.getUsers();
    setUsers(uList);
    showNotification("🔄 Refreshed registered users list from Firestore!");
  };

  useEffect(() => {
    fetchOrders();
    fetchCoupons();
    fetchUsers();
    const unsubSeasonal = couponService.subscribeSeasonalCampaign((data) => {
      if (data) setSeasonalCampaign(data);
    });
    return () => unsubSeasonal();
  }, []);

  const handleSaveSeasonalSubmit = async (e) => {
    e.preventDefault();
    if (!seasonalCampaign.title || !seasonalCampaign.code) {
      alert("Please enter title and promo code.");
      return;
    }

    await couponService.saveSeasonalCampaign(seasonalCampaign);
    setShowSeasonalForm(false);
    showNotification("✨ Seasonal Campaign Banner & Promo Code saved live in Firestore!");
    fetchCoupons();
  };

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
      image: '',
      images: [],
      inStock: true,
      deliveryText: 'Get it in 2-3 Business Days'
    });
    setIsUploadingProduct(false);
    setProductUploadProgress(0);
    setShowCustomCatInput(false);
    setShowProductForm(true);
  };

  const handleEditProduct = (p) => {
    setEditingProduct(p);
    const existingImages = Array.isArray(p.images) && p.images.length > 0
      ? p.images
      : (p.image ? [p.image] : []);
    setProductForm({
      id: p.id,
      title: p.title || '',
      category: p.category || 'LED Lamps',
      originalPrice: p.originalPrice || Math.round((p.currentPrice || 999) * 1.25),
      currentPrice: p.currentPrice || 999,
      image: p.image || existingImages[0] || '',
      images: existingImages,
      inStock: p.inStock !== false,
      deliveryText: p.deliveryText || 'Get it in 2-3 Business Days'
    });
    setIsUploadingProduct(false);
    setProductUploadProgress(0);
    setShowCustomCatInput(false);
    setShowProductForm(true);
  };

  // Upload multiple images or single image to Firebase Storage for Product
  const handleProductImageFilesUpload = async (files) => {
    if (!files || files.length === 0) return;
    setIsUploadingProduct(true);
    setProductUploadProgress(0);
    setProductUploadStatus(`Uploading ${files.length} image(s) to Firebase Storage...`);

    try {
      const uploadResults = await uploadMultipleImagesToFirebase(files, {
        folder: 'products',
        onProgress: (percent) => setProductUploadProgress(percent)
      });

      const newUrls = uploadResults.map(r => r.url).filter(Boolean);

      setProductForm(prev => {
        const existing = (prev.images || []).filter(img => typeof img === 'string' && img.trim() !== '');
        const combined = [...existing, ...newUrls];
        return {
          ...prev,
          image: combined[0] || '',
          images: combined
        };
      });

      showNotification(`⚡ Uploaded ${newUrls.length} image(s) directly to Firebase Storage!`);
    } catch (err) {
      console.error("Firebase Storage product image upload error:", err);
      showNotification(`⚠️ Upload error: ${err.message || 'Failed to upload'}`);
    } finally {
      setIsUploadingProduct(false);
      setProductUploadProgress(0);
      setProductUploadStatus('');
    }
  };

  // Replace a single image at index
  const handleReplaceProductImageAt = async (index, file) => {
    if (!file) return;
    setIsUploadingProduct(true);
    setProductUploadProgress(0);
    setProductUploadStatus(`Uploading replacement image to Firebase Storage...`);

    try {
      const res = await uploadImageToFirebase(file, {
        folder: 'products',
        onProgress: (percent) => setProductUploadProgress(percent)
      });

      if (res && res.url) {
        setProductForm(prev => {
          const updated = [...(prev.images || [])];
          updated[index] = res.url;
          return {
            ...prev,
            image: index === 0 ? res.url : (prev.image || updated[0]),
            images: updated
          };
        });
        showNotification(`⚡ Image #${index + 1} updated with Firebase Storage URL!`);
      }
    } catch (err) {
      console.error("Firebase Storage image replace error:", err);
      showNotification(`⚠️ Replace failed: ${err.message}`);
    } finally {
      setIsUploadingProduct(false);
      setProductUploadProgress(0);
      setProductUploadStatus('');
    }
  };

  // Set an image as primary cover
  const handleMakeCoverImage = (index) => {
    if (index === 0) return;
    setProductForm(prev => {
      const current = [...(prev.images || [])];
      const selected = current.splice(index, 1)[0];
      const reordered = [selected, ...current];
      return {
        ...prev,
        image: selected,
        images: reordered
      };
    });
    showNotification("★ Set as primary cover image!");
  };

  // Banner image upload to Firebase Storage
  const handleBannerImageUpload = async (file) => {
    if (!file) return;
    setIsUploadingBanner(true);
    setBannerUploadProgress(0);
    try {
      const res = await uploadImageToFirebase(file, {
        folder: 'banners',
        onProgress: (percent) => setBannerUploadProgress(percent)
      });
      if (res && res.url) {
        setBannerForm(prev => ({ ...prev, image: res.url }));
        showNotification("⚡ Banner image uploaded to Firebase Storage!");
      }
    } catch (err) {
      console.error("Banner upload error:", err);
      showNotification(`⚠️ Banner upload notice: ${err.message}`);
    } finally {
      setIsUploadingBanner(false);
      setBannerUploadProgress(0);
    }
  };

  const handleAddImageField = () => {
    setProductForm(prev => ({
      ...prev,
      images: [...(prev.images || []), '']
    }));
  };

  const handleImageFieldChange = (index, value) => {
    setProductForm(prev => {
      const updated = [...(prev.images || [])];
      updated[index] = value;
      return {
        ...prev,
        image: index === 0 ? value : (prev.image || value),
        images: updated
      };
    });
  };

  const handleRemoveImageField = (index) => {
    setProductForm(prev => {
      const updated = (prev.images || []).filter((_, i) => i !== index);
      return {
        ...prev,
        image: updated[0] || '',
        images: updated.length > 0 ? updated : []
      };
    });
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

    const cleanImages = (productForm.images || [])
      .map(img => typeof img === 'string' ? img.trim() : '')
      .filter(img => img !== '');

    const primaryImage = cleanImages[0] || productForm.image || '/assets/images/products/led_photo_lamp.jpg';
    const finalImages = cleanImages.length > 0 ? cleanImages : [primaryImage];

    const finalProductPayload = {
      ...productForm,
      image: primaryImage,
      images: finalImages
    };

    await productService.addProduct(finalProductPayload);
    setShowProductForm(false);
    showNotification(editingProduct ? `✨ Product '${productForm.title}' details updated in Firestore!` : `🛍️ Product '${productForm.title}' created with ${finalImages.length} image(s) in Firestore!`);
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
  const handleOpenNewCoupon = () => {
    setEditingCoupon(null);
    setCouponForm({
      code: '',
      rate: 20,
      desc: 'Flat 20% OFF Discount',
      minOrder: 499,
      active: true
    });
    setShowCouponForm(true);
  };

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
    setCouponForm({
      code: coupon.code,
      rate: coupon.rate,
      desc: coupon.desc || '',
      minOrder: coupon.minOrder || 0,
      active: coupon.active !== false
    });
    setShowCouponForm(true);
  };

  const handleToggleCouponStatus = async (coupon) => {
    const currentActive = coupon.active !== false;
    await couponService.toggleCouponStatus(coupon.code, currentActive);
    await fetchCoupons();
    showNotification(!currentActive ? `🟢 Coupon '${coupon.code}' Enabled (Active)!` : `🔴 Coupon '${coupon.code}' Disabled (Inactive)!`);
  };

  const handleSaveCouponSubmit = async (e) => {
    e.preventDefault();
    if (!couponForm.code || !couponForm.rate) {
      alert("Please enter coupon code and discount percentage.");
      return;
    }

    if (editingCoupon) {
      await couponService.updateCoupon(editingCoupon.code, couponForm);
      showNotification(`✏️ Coupon '${couponForm.code}' updated in Firestore!`);
    } else {
      await couponService.addCoupon(couponForm);
      showNotification(`🏷️ Coupon '${couponForm.code.toUpperCase()}' created in Firestore!`);
    }

    setShowCouponForm(false);
    setEditingCoupon(null);
    setCouponForm({
      code: '',
      rate: 20,
      desc: 'Flat 20% OFF Discount',
      minOrder: 499,
      active: true
    });
    await fetchCoupons();
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
            className={`px-4 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${activeTab === 'banners'
                ? 'border-indigo-500 text-indigo-400 bg-slate-800/50 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
          >
            <FiImage className="h-4 w-4" /> Home Banners ({banners.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${activeTab === 'orders'
                ? 'border-indigo-500 text-indigo-400 bg-slate-800/50 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
          >
            <FiShoppingBag className="h-4 w-4" /> Customer Orders ({(orders || []).length})
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${activeTab === 'products'
                ? 'border-indigo-500 text-indigo-400 bg-slate-800/50 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
          >
            <FiBox className="h-4 w-4" /> Manage Products ({(products || []).length})
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${activeTab === 'coupons'
                ? 'border-indigo-500 text-indigo-400 bg-slate-800/50 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
          >
            <FiTag className="h-4 w-4" /> Manage Coupons ({(coupons || []).length})
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${activeTab === 'users'
                ? 'border-indigo-500 text-indigo-400 bg-slate-800/50 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
          >
            <FiUsers className="h-4 w-4" /> Registered Users ({(users || []).length})
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
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs text-slate-300 font-semibold block">Image Path / URL</label>
                        <label className="text-[11px] font-extrabold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer">
                          {isUploadingBanner ? (
                            <span className="flex items-center gap-1">
                              <FiLoader className="h-3 w-3 animate-spin" /> Uploading {bannerUploadProgress}%
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <FiUpload className="h-3 w-3" /> Upload to Firebase
                            </span>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            disabled={isUploadingBanner}
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleBannerImageUpload(e.target.files[0]);
                                e.target.value = '';
                              }
                            }}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        required
                        value={bannerForm.image}
                        onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                        placeholder="e.g. /Banner1.png or Firebase Storage URL"
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-mono"
                      />
                      {bannerForm.image && (
                        <div className="mt-2 h-24 rounded-xl overflow-hidden border border-slate-700 relative bg-slate-800">
                          <img src={bannerForm.image} alt="Banner Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
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
                    <img
                      src={b.image}
                      alt={b.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800';
                      }}
                      className="w-full h-full object-cover"
                    />
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
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${ord.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
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
                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                        <FiBox className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-white">
                          {editingProduct ? '✏️ Edit Product Details & Images' : '➕ Add New Product to Firestore'}
                        </h4>
                        <p className="text-[11px] text-slate-400">Upload images to Firebase & manage catalog item</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-lg border border-indigo-500/20">
                        ID: {productForm.id}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowProductForm(false)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                      >
                        <FiX className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSaveProductSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Product Title</label>
                      <input
                        type="text"
                        required
                        value={productForm.title}
                        onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                        placeholder="e.g. Personalized Wooden Photo Lamp"
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

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Material / Finish (Optional)</label>
                        <input
                          type="text"
                          value={productForm.material || ''}
                          onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                          placeholder="e.g. Premium Acrylic + Solid Wood"
                          className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Package Includes (Optional)</label>
                        <input
                          type="text"
                          value={productForm.packageIncludes || ''}
                          onChange={(e) => setProductForm({ ...productForm, packageIncludes: e.target.value })}
                          placeholder="e.g. 1 Product, USB Cable, Gift Box"
                          className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-medium"
                        />
                      </div>
                    </div>

                    {/* Firebase Storage Product Image Uploader Section */}
                    <div className="space-y-3 p-4 bg-slate-800/60 rounded-2xl border border-slate-700/80">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-xs text-white font-bold flex items-center gap-1.5">
                            <FiImage className="text-indigo-400" /> Product Images ({productForm.images?.filter(Boolean).length || 0})
                          </label>
                          <p className="text-[10px] text-slate-400">Upload image files directly to Firebase Storage & save download URLs</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddImageField}
                          className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 px-2.5 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg border border-indigo-500/20 transition"
                        >
                          <FiPlus className="h-3 w-3" /> Add URL Field
                        </button>
                      </div>

                      {/* Drag & Drop / Click Upload Area */}
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                            handleProductImageFilesUpload(e.dataTransfer.files);
                          }
                        }}
                        className={`relative border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center transition flex flex-col items-center justify-center cursor-pointer ${
                          isUploadingProduct
                            ? 'border-indigo-500 bg-indigo-500/10 pointer-events-none'
                            : 'border-slate-600 hover:border-indigo-400 bg-slate-900/60 hover:bg-slate-900/90'
                        }`}
                        onClick={() => {
                          if (!isUploadingProduct) {
                            document.getElementById('product-file-upload-input')?.click();
                          }
                        }}
                      >
                        <input
                          id="product-file-upload-input"
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              handleProductImageFilesUpload(e.target.files);
                              e.target.value = '';
                            }
                          }}
                        />

                        {isUploadingProduct ? (
                          <div className="space-y-2 py-2 w-full max-w-xs" onClick={(e) => e.stopPropagation()}>
                            <FiLoader className="h-8 w-8 text-indigo-400 animate-spin mx-auto" />
                            <p className="text-xs font-bold text-indigo-300">{productUploadStatus || 'Saving image to Firebase...'}</p>
                            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                              <div
                                className="bg-gradient-to-r from-indigo-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${productUploadProgress}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                              <span>{productUploadProgress}% complete</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setIsUploadingProduct(false);
                                  setProductUploadProgress(0);
                                }}
                                className="text-red-400 hover:text-red-300 font-semibold underline cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1.5 pointer-events-none">
                            <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                              <FiUploadCloud className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white">
                                <span className="text-indigo-400 underline">Click to upload image</span> or drag & drop files
                              </p>
                              <p className="text-[10px] text-slate-400">PNG, JPG, WEBP, GIF (Saved as URL in Firebase)</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Image Gallery & Previews */}
                      {productForm.images && productForm.images.length > 0 && (
                        <div className="space-y-2.5 pt-1">
                          <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                            <span>Product Gallery ({productForm.images.length})</span>
                            <span className="text-[10px] text-indigo-300">First image is the primary cover photo</span>
                          </div>

                          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                            {productForm.images.map((imgUrl, imgIdx) => {
                              const isCover = imgIdx === 0;
                              return (
                                <div
                                  key={imgIdx}
                                  className={`p-2.5 rounded-xl border flex items-center gap-3 transition ${
                                    isCover ? 'bg-indigo-950/40 border-indigo-500/40' : 'bg-slate-900 border-slate-700/80'
                                  }`}
                                >
                                  {/* Thumbnail Preview */}
                                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center">
                                    {imgUrl ? (
                                      <img
                                        src={imgUrl}
                                        alt={`Preview ${imgIdx}`}
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200';
                                        }}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <FiImage className="text-slate-500 h-5 w-5" />
                                    )}
                                    {isCover && (
                                      <span className="absolute bottom-0 inset-x-0 bg-indigo-600 text-white text-[8px] font-extrabold text-center py-0.5">
                                        COVER
                                      </span>
                                    )}
                                  </div>

                                  {/* URL Input & Actions */}
                                  <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-[10px] font-bold text-slate-300 flex items-center gap-1">
                                        {isCover ? (
                                          <span className="text-amber-400 flex items-center gap-1"><FiStar className="h-3 w-3 fill-amber-400" /> Primary Cover Image</span>
                                        ) : (
                                          `Gallery Image #${imgIdx + 1}`
                                        )}
                                      </span>
                                      <div className="flex items-center gap-1.5">
                                        {!isCover && (
                                          <button
                                            type="button"
                                            onClick={() => handleMakeCoverImage(imgIdx)}
                                            className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold px-2 py-0.5 rounded bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 transition"
                                          >
                                            Set as Cover
                                          </button>
                                        )}
                                        {imgUrl && imgUrl.startsWith('http') && (
                                          <a
                                            href={imgUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[10px] text-slate-400 hover:text-white flex items-center gap-0.5"
                                            title="Open image in new tab"
                                          >
                                            <FiExternalLink className="h-3 w-3" />
                                          </a>
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                      <input
                                        type="text"
                                        required={isCover}
                                        value={imgUrl}
                                        onChange={(e) => handleImageFieldChange(imgIdx, e.target.value)}
                                        placeholder={isCover ? "Cover Image URL or upload above" : "Additional gallery image URL"}
                                        className="flex-1 bg-slate-800 border border-slate-700 text-white text-[11px] rounded-lg p-2 outline-none focus:border-indigo-500 font-mono truncate"
                                      />

                                      {/* Single slot replace button */}
                                      <label
                                        className="p-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300 rounded-lg cursor-pointer border border-slate-700 transition shrink-0"
                                        title="Replace this image with file from device"
                                      >
                                        <FiUpload className="h-3.5 w-3.5" />
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                              handleReplaceProductImageAt(imgIdx, e.target.files[0]);
                                              e.target.value = '';
                                            }
                                          }}
                                        />
                                      </label>

                                      {/* Remove button */}
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveImageField(imgIdx)}
                                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition border border-red-500/20 shrink-0"
                                        title="Remove Image"
                                      >
                                        <FiTrash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      <p className="text-[10px] text-slate-400">All image URLs are stored directly in Firestore when saving this product.</p>
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
                        disabled={isUploadingProduct}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 disabled:opacity-50 flex items-center gap-2"
                      >
                        {isUploadingProduct && <FiLoader className="h-3.5 w-3.5 animate-spin" />}
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
                    <img
                      src={p.image}
                      alt={p.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400';
                      }}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-700 bg-slate-900 shrink-0"
                    />
                    <div className="min-w-0 space-y-0.5">
                      <h4 className="text-xs font-bold text-white truncate">{p.title}</h4>
                      <p className="text-[10px] text-slate-400 truncate">
                        <span className="text-indigo-300 font-semibold">{p.category}</span> | <strong className="text-emerald-400 font-bold">₹{p.currentPrice}</strong>
                      </p>
                      <div className="flex items-center gap-2 pt-0.5">
                        <button
                          onClick={() => handleToggleStockStatus(p)}
                          title="Click to toggle stock status"
                          className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md border transition ${p.inStock !== false
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
          <div className="space-y-6">
            {/* Seasonal Campaign Featured Banner Box */}
            <div className="bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-pink-900/90 border border-indigo-500/30 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-300 bg-pink-500/20 px-3 py-1 rounded-full border border-pink-500/30">
                  ⭐ Featured Homepage Banner: {seasonalCampaign.tag || 'Seasonal Campaign'}
                </span>
                <h4 className="text-xl font-extrabold text-white pt-1">{seasonalCampaign.title}</h4>
                <p className="text-xs text-slate-300 max-w-xl">{seasonalCampaign.desc}</p>
                <div className="pt-2 flex items-center justify-center md:justify-start gap-2 text-xs font-mono">
                  <span className="text-slate-400 font-bold">Active Promo Code:</span>
                  <span className="bg-pink-500/20 text-pink-400 font-extrabold px-3 py-1 rounded-lg border border-pink-500/30 text-sm">
                    {seasonalCampaign.code}
                  </span>
                  <span className="text-emerald-400 font-bold ml-2">({seasonalCampaign.discountText || '25% OFF'})</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSeasonalForm(true)}
                className="px-5 py-3 bg-white text-indigo-950 font-extrabold text-xs rounded-xl shadow-lg hover:bg-slate-100 transition cursor-pointer shrink-0"
              >
                ✏️ Edit Seasonal Campaign Banner
              </button>
            </div>

            {/* Seasonal Campaign Edit Modal */}
            {showSeasonalForm && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-base font-extrabold text-white">
                      ⭐ Edit Seasonal Campaign Banner & Code
                    </h4>
                    <button
                      onClick={() => setShowSeasonalForm(false)}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveSeasonalSubmit} className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Campaign Badge Tag</label>
                      <input
                        type="text"
                        value={seasonalCampaign.tag}
                        onChange={(e) => setSeasonalCampaign({ ...seasonalCampaign, tag: e.target.value })}
                        placeholder="e.g. Seasonal Campaign or Festive Discount"
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Banner Headline Title</label>
                      <input
                        type="text"
                        required
                        value={seasonalCampaign.title}
                        onChange={(e) => setSeasonalCampaign({ ...seasonalCampaign, title: e.target.value })}
                        placeholder="e.g. Flat 25% OFF + Free Express Shipping"
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs font-bold rounded-xl p-3 outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Promo Code (e.g. GIFT25)</label>
                        <input
                          type="text"
                          required
                          value={seasonalCampaign.code}
                          onChange={(e) => setSeasonalCampaign({ ...seasonalCampaign, code: e.target.value.toUpperCase() })}
                          placeholder="e.g. GIFT25"
                          className="w-full bg-slate-800 border border-slate-700 text-white text-xs font-mono font-extrabold rounded-xl p-3 outline-none focus:border-indigo-500 uppercase text-pink-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Discount Rate / Badge</label>
                        <input
                          type="text"
                          value={seasonalCampaign.discountText}
                          onChange={(e) => setSeasonalCampaign({ ...seasonalCampaign, discountText: e.target.value })}
                          placeholder="e.g. 25% OFF"
                          className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Subtitle / Description Text</label>
                      <textarea
                        rows={2}
                        value={seasonalCampaign.desc}
                        onChange={(e) => setSeasonalCampaign({ ...seasonalCampaign, desc: e.target.value })}
                        placeholder="e.g. Use promo code at checkout. Valid on customized couple gift hampers."
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 resize-none font-medium"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setShowSeasonalForm(false)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                      >
                        Save Seasonal Banner ✓
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold text-white">Add & Manage Promo Coupons</h3>
                <p className="text-xs text-slate-400">Create discount coupons in Firestore. Customers apply these exact codes on the Cart Page.</p>
              </div>

              <button
                onClick={handleOpenNewCoupon}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5 cursor-pointer"
              >
                <FiPlus className="h-4 w-4" /> Add New Coupon
              </button>
            </div>

            {/* Coupon Form Modal */}
            {showCouponForm && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-extrabold text-white">
                      {editingCoupon ? '✏️ Edit Coupon Code in Firestore' : '➕ Create Coupon Code in Firestore'}
                    </h4>
                    <button
                      onClick={() => setShowCouponForm(false)}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveCouponSubmit} className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Banner Offer Title (Homepage Headline)</label>
                      <input
                        type="text"
                        value={couponForm.title}
                        onChange={(e) => setCouponForm({ ...couponForm, title: e.target.value })}
                        placeholder="e.g. Today's Special Offer!"
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Coupon Code (e.g. INEX20)</label>
                      <input
                        type="text"
                        required
                        disabled={!!editingCoupon}
                        value={couponForm.code}
                        onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                        placeholder="e.g. SPECIAL25"
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs font-mono font-bold rounded-xl p-3 outline-none focus:border-indigo-500 uppercase disabled:opacity-60 disabled:cursor-not-allowed"
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
                          className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-bold text-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Min Order Amount (₹)</label>
                        <input
                          type="number"
                          value={couponForm.minOrder}
                          onChange={(e) => setCouponForm({ ...couponForm, minOrder: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 font-bold"
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

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="couponActive"
                        checked={couponForm.active !== false}
                        onChange={(e) => setCouponForm({ ...couponForm, active: e.target.checked })}
                        className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                      />
                      <label htmlFor="couponActive" className="text-xs text-slate-300 font-semibold cursor-pointer">
                        Enable Coupon (Active for customer checkout)
                      </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setShowCouponForm(false)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                      >
                        {editingCoupon ? 'Update Coupon ✓' : 'Save Coupon ✓'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Coupons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-amber-400 text-base">{c.code}</span>
                      <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-500/30">
                        {c.rate}% OFF
                      </span>
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${c.active !== false
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                      {c.active !== false ? '🟢 Active' : '🔴 Disabled'}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-xs text-slate-300 font-medium">{c.desc}</p>
                    <p className="text-[10px] text-slate-400">Min Order: ₹{c.minOrder || 0}</p>
                  </div>

                  {/* Actions: Enable / Disable Toggle, Edit, Delete */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-700/60">
                    <button
                      type="button"
                      onClick={() => handleToggleCouponStatus(c)}
                      className={`px-3 py-1.5 text-xs font-extrabold rounded-xl transition cursor-pointer ${c.active !== false
                          ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                    >
                      {c.active !== false ? 'Disable 🚫' : 'Enable 🟢'}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditCoupon(c)}
                        title="Edit Coupon Details"
                        className="p-2 bg-slate-700 hover:bg-indigo-600/40 text-indigo-300 rounded-xl transition cursor-pointer"
                      >
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCoupon(c.code)}
                        title="Delete Coupon"
                        className="p-2 bg-slate-700 hover:bg-red-500/30 text-red-400 rounded-xl transition cursor-pointer"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FiUsers className="text-indigo-400" /> Customer & User Accounts ({(users || []).length})
                </h3>
                <p className="text-xs text-slate-400">View registered customers, delivery addresses, total orders, and lifetime spent.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    placeholder="Search by name, email, phone..."
                    className="bg-slate-800 border border-slate-700 text-white text-xs rounded-xl pl-9 pr-4 py-2 outline-none focus:border-indigo-500 w-64 font-medium"
                  />
                </div>
                <button
                  onClick={fetchUsers}
                  className="px-3.5 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-xl transition flex items-center gap-1.5"
                >
                  <FiRefreshCw className="h-3.5 w-3.5" /> Refresh Users
                </button>
              </div>
            </div>

            {/* Users List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(users || [])
                .filter(u => {
                  if (!userSearchQuery) return true;
                  const q = userSearchQuery.toLowerCase();
                  return (
                    (u.name && u.name.toLowerCase().includes(q)) ||
                    (u.email && u.email.toLowerCase().includes(q)) ||
                    (u.phone && u.phone.toLowerCase().includes(q))
                  );
                })
                .map((u) => (
                  <div key={u.email} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-700 text-white font-extrabold text-sm flex items-center justify-center shadow-md shrink-0">
                            {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-extrabold text-white truncate">
                              {u.name}
                            </h4>
                            <span className="text-xs text-indigo-300 font-mono block truncate">{u.email}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 ${u.role === 'admin'
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}>
                          {u.role}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Phone:</span>
                          <span className="font-semibold text-slate-200">{u.phone}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Pincode:</span>
                          <span className="font-mono font-bold text-indigo-300">{u.pincode || 'N/A'}</span>
                        </div>
                        <div className="pt-1.5 border-t border-slate-800 text-[11px] text-slate-400">
                          📍 <span className="text-slate-300">{(u.address || 'No Address Provided').replace(/,\s*Chennai\s*$/i, '')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/80 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Total Orders</span>
                        <span className="font-extrabold text-white text-sm">{u.ordersCount} Placed</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Total Spent</span>
                        <span className="font-extrabold text-emerald-400 text-sm">₹{u.totalSpent}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
