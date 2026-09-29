import { FiChevronRight, FiHeart, FiShoppingCart, FiUploadCloud, FiType, FiCalendar, FiEye, FiCheckCircle, FiShield, FiTruck, FiSmile, FiHeadphones, FiAward, FiSearch } from 'react-icons/fi';
import { FaWhatsapp, FaHeart, FaThLarge } from 'react-icons/fa';
import { useState, useEffect, useMemo } from 'react';

const categories = [
  { name: 'Gift Boxes', image: '/Gift.jpg', bgColor: 'bg-purple-100' },
  { name: 'Photo Frames', image: '/Frames.jpg', bgColor: 'bg-orange-100' },
  { name: 'Banners', image: '/poster.jpg', bgColor: 'bg-pink-100' },
  { name: 'Birthday', image: '/Banner.jpg', bgColor: 'bg-red-100' },
  { name: 'Anniversary', image: '/Annivarsary.jpg', bgColor: 'bg-rose-100' },
  { name: 'Cars', image: '/Cars.jpg', bgColor: 'bg-red-50' },
  { name: 'Personalized', image: '/Personalised.jpg', bgColor: 'bg-gray-100' },
  { name: 'Cushions', image: '/cusion.jpg', bgColor: 'bg-orange-50' },
  { name: 'Combo Gifts', image: '/Combo.jpg', bgColor: 'bg-blue-100' },
  { name: 'View All', icon: <FaThLarge />, bgColor: 'bg-purple-50', isViewAll: true },
];


import { bannerService } from '../../services/bannerService';
import { productService } from '../../services/productService';
import { couponService } from '../../services/couponService';
import { giftsData } from '../../data/gifts';

const Home = ({ onAddToCart, onAddToWishlist, wishlistItems = [], onSearch, onOpenProduct, setView, setSelectedCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [couponToast, setCouponToast] = useState(null);
  const [searchVal, setSearchVal] = useState("");
  const [banners, setBanners] = useState(() => bannerService.getBanners());
  const [storeProducts, setStoreProducts] = useState([]);
  const [activeCoupon, setActiveCoupon] = useState(null);

  const isProductWishlisted = (product) => {
    if (!product || !Array.isArray(wishlistItems)) return false;
    const pid = String(product.id || '');
    const ptitle = product.title || product.name || '';
    return wishlistItems.some(w => (pid && String(w.id) === pid) || (ptitle && w.title === ptitle));
  };

  const allCatalogProducts = useMemo(() => {
    if (storeProducts.length > 0) {
      const mapped = storeProducts.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category || 'Gifts',
        price: Number(p.currentPrice || p.price) || 999,
        originalPrice: Number(p.originalPrice) || Math.round((Number(p.currentPrice || p.price) || 999) * 1.25),
        rating: typeof p.rating === 'string' ? p.rating : `${p.rating || 4.8} (${p.reviewsCount || 12})`,
        image: p.image || '/assets/images/products/led_photo_lamp.jpg',
        images: Array.isArray(p.images) && p.images.length > 0 ? p.images : (p.image ? [p.image] : ['/assets/images/products/led_photo_lamp.jpg']),
        inStock: p.inStock !== false,
        deliveryText: p.deliveryText || 'Get it in 2-3 Days',
        badge: p.badge || 'Bestseller'
      }));
      const setIds = new Set(mapped.map(m => String(m.id)));
      const remainder = giftsData.map(g => ({
        ...g,
        rating: `${g.rating} (${g.ratingCount || 125})`
      })).filter(g => !setIds.has(String(g.id)));
      return [...mapped, ...remainder];
    }
    return giftsData.map(g => ({
      ...g,
      rating: `${g.rating} (${g.ratingCount || 125})`
    }));
  }, [storeProducts]);

  useEffect(() => {
    const unsubBanners = bannerService.subscribeBanners((latestBanners) => {
      if (latestBanners && latestBanners.length > 0) {
        setBanners(latestBanners);
      }
    });

    const unsubProducts = productService.subscribeProducts((latestProducts) => {
      if (latestProducts && latestProducts.length > 0) {
        setStoreProducts(latestProducts);
      } else {
        setStoreProducts([]);
      }
    });

    const unsubCoupons = couponService.subscribeCoupons((latestCoupons) => {
      if (latestCoupons && latestCoupons.length > 0) {
        const sorted = [...latestCoupons].sort((a, b) => (b.rate || 0) - (a.rate || 0));
        setActiveCoupon(sorted[0]);
      }
    });

    return () => {
      if (unsubBanners) unsubBanners();
      if (unsubProducts) unsubProducts();
      if (unsubCoupons) unsubCoupons();
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch && searchVal.trim()) {
      onSearch(searchVal.trim());
    }
  };

  const handleAddToCartClick = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    if (onAddToCart) onAddToCart(product);
  };

  const handleWishlistClick = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToWishlist && product) {
      onAddToWishlist(product);
    }
  };

  useEffect(() => {
    if (!banners.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners]);

  const activeBanner = banners[currentSlide] || banners[0] || {};

  return (
    <>
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
        {showToast && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-2xl z-[100] flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
            <FiCheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-bold text-[10px] sm:text-sm tracking-wide">PRODUCT ADDED TO CART</span>
          </div>
        )}

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearchSubmit} className="md:hidden mb-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary text-sm shadow-sm"
              placeholder="Search for gifts, frames..."
            />
          </div>
        </form>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6 md:mb-10">
          <div className="lg:col-span-3 rounded-2xl overflow-hidden relative flex flex-col justify-center p-5 md:p-12 h-[200px] sm:h-[300px] md:h-full md:min-h-[400px]">

            {/* Background Slider */}
            {banners.map((b, idx) => (
              <div
                key={b.id || idx}
                className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
                  }`}
              >
                <img 
                  src={b.image || '/Banner1.png'} 
                  alt={b.title || `Banner ${idx + 1}`} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800';
                  }}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent"></div>
              </div>
            ))}

            {/* Foreground Content */}
            <div className="relative z-10 w-[65%] sm:w-[55%] md:w-2/3 lg:w-1/2">
              <h1 className="text-[15px] sm:text-xl md:text-5xl font-bold text-gray-900 mb-0.5 md:mb-2 tracking-tight leading-tight">
                {activeBanner.title || 'Make Every Moment'}<br />
                <span className="font-cursive text-secondary text-[22px] sm:text-3xl md:text-7xl font-normal leading-tight">
                  {activeBanner.subtitle || 'Extra Special'}
                </span>
              </h1>
              <div className="font-alt text-gray-800 mt-1 md:mt-4 mb-2 md:mb-8 max-w-[170px] sm:max-w-[200px] md:max-w-md text-[11px] sm:text-sm md:text-xl font-medium">
                <p className="mb-0.5 md:mb-1.5">{activeBanner.desc || 'Unique gifts for your special ones.'}</p>
              </div>
              <button 
                onClick={() => setView && setView('gift')}
                className="bg-primary hover:bg-opacity-90 text-white font-medium mt-4 md:mt-0 py-1.5 px-4 md:py-3 md:px-8 rounded-full text-xs md:text-base shadow-lg shadow-primary/30 transition-all flex items-center group w-max"
              >
                Shop Now <FiChevronRight className="ml-1 md:ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Slider Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-primary' : 'w-2 bg-gray-400 hover:bg-gray-500'
                    }`}
                  onClick={() => setCurrentSlide(idx)}
                />
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-3 justify-between min-h-[400px]">
            <div className="bg-white p-5 rounded-[24px] border border-slate-400 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center space-x-5 hover:shadow-md transition-all">
              <div className="bg-purple-100/80 w-14 h-14 rounded-2xl flex items-center justify-center text-primary"><FiAward className="h-6 w-6" /></div>
              <div>
                <h4 className="font-semibold text-gray-900 text-[15px] mb-0.5">Premium Quality</h4>
                <p className="text-[13px] text-gray-500">Finest quality products</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-[24px] border border-slate-400 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center space-x-5 hover:shadow-md transition-all">
              <div className="bg-pink-100/80 w-14 h-14 rounded-2xl flex items-center justify-center text-secondary"><FiHeart className="h-6 w-6" /></div>
              <div>
                <h4 className="font-semibold text-gray-900 text-[15px] mb-0.5">Personalized Gifts</h4>
                <p className="text-[13px] text-gray-500">Make it truly yours</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-[24px] border border-slate-400 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center space-x-5 hover:shadow-md transition-all">
              <div className="bg-green-100/80 w-14 h-14 rounded-2xl flex items-center justify-center text-green-600"><FiShield className="h-6 w-6" /></div>
              <div>
                <h4 className="font-semibold text-gray-900 text-[15px] mb-0.5">Secure Payments</h4>
                <p className="text-[13px] text-gray-500">100% safe & secure</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-[24px] border border-slate-400 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center space-x-5 hover:shadow-md transition-all">
              <div className="bg-blue-100/80 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600"><FiTruck className="h-6 w-6" /></div>
              <div>
                <h4 className="font-semibold text-gray-900 text-[15px] mb-0.5">Fast Delivery</h4>
                <p className="text-[13px] text-gray-500">On time, every time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6 md:mb-12 overflow-x-auto pb-1 md:pb-4 hide-scrollbar">
          <div className="flex space-x-5 md:justify-between min-w-max px-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 cursor-pointer group"
                onClick={() => {
                  if (category.isViewAll) {
                    if (setSelectedCategory) setSelectedCategory('All');
                    if (setView) setView('gift');
                  } else {
                    if (setSelectedCategory) setSelectedCategory(category.name);
                    if (setView) setView('gift');
                  }
                }}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${category.bgColor} flex items-center justify-center text-3xl shadow-sm group-hover:shadow-md transition-all overflow-hidden border-2 border-white group-hover:border-primary/30 ${category.isViewAll ? 'text-primary' : ''}`}>
                  {category.image ? (
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    category.icon
                  )}
                </div>
                <span className={`text-xs md:text-sm font-medium text-center leading-tight ${category.isViewAll ? 'text-primary' : 'text-gray-700'}`}>
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Now & Special Offer */}
        <div className="mb-12 flex flex-col lg:flex-row gap-6">

          {/* Trending Now Container */}
          <div className="lg:w-3/4 flex flex-col min-w-0 bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-end mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">Trending Now</h2>
              <button
                onClick={() => {
                  if (typeof setView === 'function') setView('gift');
                  else if (typeof onSearch === 'function') onSearch('');
                }}
                className="text-primary font-bold hover:underline flex items-center text-xs md:text-sm cursor-pointer"
              >
                See All <FiChevronRight className="ml-1" />
              </button>
            </div>

            <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-2 hide-scrollbar snap-x items-start">
              {allCatalogProducts.slice(0, 12).map((product) => (
                <div key={product.id} onClick={() => onOpenProduct && onOpenProduct(product)} className="w-[calc(50%-6px)] sm:w-[200px] lg:w-[calc((100%-3rem)/4)] flex-shrink-0 snap-start bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow group relative flex flex-col cursor-pointer">
                  <div className="relative rounded-xl overflow-hidden mb-3 aspect-[4/3] bg-gray-100 w-full">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500';
                      }}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      loading="lazy" 
                    />

                    {product.inStock === false ? (
                      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-600 text-white text-[8px] sm:text-[10px] font-extrabold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md shadow">
                        Out of Stock
                      </span>
                    ) : product.badge ? (
                      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-pink-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md">
                        {product.badge}
                      </span>
                    ) : null}
                    <button 
                      onClick={(e) => handleWishlistClick(e, product)} 
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 h-6 w-6 sm:h-8 sm:w-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-500 hover:text-secondary hover:bg-white transition-colors"
                      aria-label="Toggle Wishlist"
                    >
                      {isProductWishlisted(product) ? (
                        <FaHeart className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                      ) : (
                        <FiHeart className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 hover:text-red-500" />
                      )}
                    </button>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5 sm:mb-1 truncate">{product.title}</h3>
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-[10px] sm:text-xs">★</span>
                        <span className="text-[9px] sm:text-xs text-gray-500 ml-1">{product.rating}</span>
                      </div>
                      <span className="text-[9px] text-emerald-600 font-semibold truncate">🚚 {product.deliveryText || '2-3 Days'}</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-1 sm:pt-2">
                      <div className="flex flex-row items-baseline gap-1 flex-wrap">
                        <span className="text-sm sm:text-base font-bold text-gray-900 leading-none">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-[9px] sm:text-xs text-gray-400 line-through leading-none">₹{product.originalPrice}</span>
                        )}
                      </div>
                      {product.inStock === false ? (
                        <span className="text-[10px] font-extrabold text-red-600 bg-red-50 border border-red-200 px-2 py-1 rounded-lg">
                          Out of Stock
                        </span>
                      ) : (
                        <button onClick={(e) => handleAddToCartClick(e, product)} className="h-7 w-7 sm:h-9 sm:w-9 bg-primary text-white hover:bg-opacity-90 rounded-full flex items-center justify-center transition-colors shadow-md shadow-primary/20">
                          <FiShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Offer Banner (Right side on desktop) */}
          <div className="lg:w-1/4 flex-shrink-0">
            <div className="w-full h-full bg-[#fdfcff] rounded-[24px] p-3 sm:p-4 lg:p-8 flex items-center border border-dashed border-purple-200 shadow-sm relative overflow-hidden lg:flex-col lg:items-start lg:justify-between">

              {/* Background Image Container (Desktop) */}
              <div className="flex-shrink-0 z-0 lg:absolute lg:-right-12 lg:-bottom-12 opacity-100 hidden lg:block">
                <div className="lg:w-72 lg:h-72 lg:bg-[#f1dee6] rounded-full flex items-center justify-center">
                  <img src="/discount_tags.png" alt="Discount" className="lg:w-56 lg:h-56 object-contain mix-blend-multiply drop-shadow-sm" />
                </div>
              </div>

              {/* Mobile Image (Hidden on Desktop) */}
              <div className="flex-shrink-0 z-10 lg:hidden">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center">
                  <img src="/discount_tags.png" alt="Discount" className="w-10 h-10 sm:w-14 sm:h-14 object-contain mix-blend-multiply drop-shadow-sm" />
                </div>
              </div>

              {/* Text and Button Container */}
              <div className="relative z-10 flex-1 flex flex-row items-center justify-between w-full lg:flex-col lg:items-start lg:justify-between lg:h-full ml-3 lg:ml-0">
                <div className="lg:mt-2">
                  <h2 className="text-[13px] sm:text-lg lg:text-3xl font-bold text-[#1e1b4b] mb-0.5 lg:mb-2 leading-tight">
                    {activeCoupon?.title || "Today's Special Offer!"}
                  </h2>
                  <p className="text-[11px] sm:text-sm lg:text-[17px] text-gray-500 font-medium">
                    Get Flat <span className="text-[#de4b83] font-bold">{activeCoupon ? activeCoupon.rate : 20}% OFF</span> on all orders
                  </p>
                </div>
                <button
                  onClick={() => {
                    const codeToCopy = activeCoupon?.code || 'INEX20';
                    try { navigator.clipboard?.writeText(codeToCopy); } catch {}
                    setCouponToast(true);
                    setTimeout(() => setCouponToast(null), 2000);
                  }}
                  className="bg-gradient-to-r from-[#df4682] to-[#ec7297] hover:opacity-90 active:scale-95 text-white font-medium py-1.5 px-3 sm:py-2 sm:px-5 lg:mt-auto lg:py-3 lg:px-6 rounded-full text-[10px] sm:text-sm lg:text-base shadow-sm transition-all flex items-center group whitespace-nowrap ml-2 lg:ml-0 z-10 relative cursor-pointer"
                >
                  Grab Now <FiChevronRight className="ml-0.5 sm:ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>



        {/* Copied Coupon Sentence (Shown for 2 seconds directly above Personalize Your Gift) */}
        {couponToast && (
          <div className="mb-4 py-2.5 px-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-sm animate-fade-in">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>Coupon "{activeCoupon?.code || 'INEX20'}" copied! Get Flat {activeCoupon?.rate || 20}% OFF on checkout.</span>
          </div>
        )}

        {/* Personalize Your Gift */}
        <div className="mb-12 relative">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">Personalize Your Gift</h2>
          <p className="text-gray-500 text-sm mb-6">Add a personal touch and make it unforgettable.</p>

          <div className="grid grid-cols-4 gap-2 md:gap-4">
            <div className="bg-purple-50 rounded-lg md:rounded-2xl p-2 py-4 md:p-5 flex flex-col items-center text-center border border-purple-100 hover:shadow-md transition-shadow cursor-pointer min-h-[120px] md:min-h-[150px]">
              <div className="bg-white h-8 w-8 md:h-14 md:w-14 rounded-full flex items-center justify-center text-primary shadow-sm mb-2 md:mb-3">
                <FiUploadCloud className="h-4 w-4 md:h-6 md:w-6" />
              </div>
              <h4 className="font-bold text-gray-900 text-[9px] sm:text-[11px] md:text-sm mb-0.5 md:mb-1">Upload Photo</h4>
              <p className="text-[7px] sm:text-[9px] md:text-xs text-gray-500 leading-tight">Add your favorite photo</p>
            </div>

            <div className="bg-pink-50 rounded-lg md:rounded-2xl p-2 py-4 md:p-5 flex flex-col items-center text-center border border-pink-100 hover:shadow-md transition-shadow cursor-pointer min-h-[120px] md:min-h-[150px]">
              <div className="bg-white h-8 w-8 md:h-14 md:w-14 rounded-full flex items-center justify-center text-secondary shadow-sm mb-2 md:mb-3">
                <FiType className="h-4 w-4 md:h-6 md:w-6" />
              </div>
              <h4 className="font-bold text-gray-900 text-[9px] sm:text-[11px] md:text-sm mb-0.5 md:mb-1">Add Text</h4>
              <p className="text-[7px] sm:text-[9px] md:text-xs text-gray-500 leading-tight">Write name, quote or message</p>
            </div>

            <div className="bg-orange-50 rounded-lg md:rounded-2xl p-2 py-4 md:p-5 flex flex-col items-center text-center border border-orange-100 hover:shadow-md transition-shadow cursor-pointer min-h-[120px] md:min-h-[150px]">
              <div className="bg-white h-8 w-8 md:h-14 md:w-14 rounded-full flex items-center justify-center text-orange-500 shadow-sm mb-2 md:mb-3">
                <FiCalendar className="h-4 w-4 md:h-6 md:w-6" />
              </div>
              <h4 className="font-bold text-gray-900 text-[9px] sm:text-[11px] md:text-sm mb-0.5 md:mb-1">Choose Date</h4>
              <p className="text-[7px] sm:text-[9px] md:text-xs text-gray-500 leading-tight">Select delivery or occasion date</p>
            </div>

            <div className="bg-green-50 rounded-lg md:rounded-2xl p-2 py-4 md:p-5 flex flex-col items-center text-center border border-green-100 hover:shadow-md transition-shadow cursor-pointer min-h-[120px] md:min-h-[150px]">
              <div className="bg-white h-8 w-8 md:h-14 md:w-14 rounded-full flex items-center justify-center text-green-500 shadow-sm mb-2 md:mb-3">
                <FiEye className="h-4 w-4 md:h-6 md:w-6" />
              </div>
              <h4 className="font-bold text-gray-900 text-[9px] sm:text-[11px] md:text-sm mb-0.5 md:mb-1">Preview & Order</h4>
              <p className="text-[7px] sm:text-[9px] md:text-xs text-gray-500 leading-tight">Preview your gift and place order</p>
            </div>
          </div>
        </div>

        {/* Customer Reviews & Testimonials */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Customer Stories & Reviews</h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Real feedback from happy gift receivers</p>
            </div>
            <button
              onClick={() => setView && setView('gift')}
              className="text-primary font-bold hover:underline text-xs md:text-sm flex items-center gap-1"
            >
              Explore Store <FiChevronRight />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  {'★'.repeat(5)}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic mb-4">
                  "The 3D LED lamp with our couple photo turned out breathtaking! The wooden finish is super smooth and the glow is warm and romantic. My partner was truly amazed."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-extrabold flex items-center justify-center text-xs">
                  AS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Anjali Sharma</h4>
                  <p className="text-[10px] text-gray-400">Verified Buyer • Heart 3D Lamp</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  {'★'.repeat(5)}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic mb-4">
                  "Ordered a wooden collage frame for my parents' anniversary. The print resolution was razor sharp and delivery arrived 1 day ahead of schedule in pristine condition!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-xs">
                  RS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Rohan Singhal</h4>
                  <p className="text-[10px] text-gray-400">Verified Buyer • Collage Frame</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  {'★'.repeat(5)}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic mb-4">
                  "The customized photo cushion is so soft and fluffy! Customer support helped me preview the layout on WhatsApp before printing. 10/10 service!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                <div className="w-9 h-9 rounded-full bg-pink-100 text-pink-700 font-extrabold flex items-center justify-center text-xs">
                  MK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Meera Krishnan</h4>
                  <p className="text-[10px] text-gray-400">Verified Buyer • Photo Cushion</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <FiTruck className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-gray-900">Free Express Delivery</h5>
              <p className="text-[10px] text-gray-500">On all orders above ₹999</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
              <FiShield className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-gray-900">100% Quality Guaranteed</h5>
              <p className="text-[10px] text-gray-500">Laser cut & premium finish</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <FiAward className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-gray-900">Handcrafted with Love</h5>
              <p className="text-[10px] text-gray-500">Over 10,000+ happy clients</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <FiHeadphones className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-gray-900">Dedicated Support</h5>
              <p className="text-[10px] text-gray-500">Instant WhatsApp assistance</p>
            </div>
          </div>
        </div>

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/919123456789?text=Hi%20INEX%20Gifts%2C%20I%20want%20to%20customize%20a%20gift!"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 md:bottom-6 right-6 h-12 w-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.6)] hover:shadow-[0_0_25px_rgba(34,197,94,0.8)] hover:scale-110 transition-all z-50"
          title="Chat with us on WhatsApp"
        >
          <FaWhatsapp className="h-7 w-7" />
        </a>

      </main>

      {/* Clean Modern Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm">
                IN
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">INEX GIFTS</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Crafting unforgettable personalized gifts, engraved acrylic LED photo lamps, wooden frames, and curated celebration hampers with love.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setView && setView('gift')} className="hover:text-white transition">
                  Shop All Gifts
                </button>
              </li>
              <li>
                <button onClick={() => setView && setView('gift')} className="hover:text-white transition">
                  Explore Gifts & Categories
                </button>
              </li>
              <li>
                <button onClick={() => setView && setView('orders')} className="hover:text-white transition">
                  Track My Orders
                </button>
              </li>
              <li>
                <button onClick={() => setView && setView('profile')} className="hover:text-white transition">
                  My Profile & Settings
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Customer Care</h4>
            <ul className="space-y-2 text-xs">
              <li className="text-slate-400">WhatsApp: <span className="text-white">+91 91234 56789</span></li>
              <li className="text-slate-400">Email: <span className="text-white">support@inexgifts.com</span></li>
              <li className="text-slate-400">Operating Hours: <span className="text-white">9:00 AM - 9:00 PM</span></li>
              <li className="text-slate-400">Fast 2-3 Day Express Shipping Across India</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Management</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setView && setView('admin-login')} className="hover:text-indigo-400 text-slate-400 transition font-mono">
                  Admin Portal Login →
                </button>
              </li>
              <li className="text-[11px] text-slate-500 pt-2">
                Real-time Firestore Backend & Storage Powered
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} INEX Gifts Private Limited. All Rights Reserved.</p>
          <p>Handcrafted with passion in India 🇮🇳</p>
        </div>
      </footer>
    </>
  );
};

export default Home;

