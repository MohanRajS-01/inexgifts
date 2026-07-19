import { FiChevronRight, FiHeart, FiShoppingCart, FiUploadCloud, FiType, FiCalendar, FiEye, FiCheckCircle, FiShield, FiTruck, FiSmile, FiHeadphones, FiAward, FiSearch } from 'react-icons/fi';
import { FaWhatsapp, FaHeart, FaThLarge } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import HomeScreen2 from "./HomeScreen2";

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

const trendingProducts = [
  {
    id: 1,
    title: 'LED Photo Lamp',
    discount: '-20%',
    rating: '4.8 (125)',
    price: '799',
    originalPrice: '999',
    image: '/LEDphoto.jpg'
  },
  {
    id: 2,
    title: 'Collage Photo Frame',
    discount: '-15%',
    rating: '4.7 (96)',
    price: '679',
    originalPrice: '799',
    image: 'Customized.jpg'
  },
  {
    id: 3,
    title: 'Premium Gift Set',
    discount: '-25%',
    rating: '4.9 (201)',
    price: '1,499',
    originalPrice: '1,999',
    image: '/Premium.jpg'
  },
  {
    id: 4,
    title: 'Customized Cushion',
    image: '/Customcushion.jpg',
    price: '499',
    originalPrice: null,
    rating: '4.6 (76)',
    badge: 'New',
  },
  {
    id: 5,
    title: 'Personalized Mug',
    image: '/Mug.jpg',
    price: '299',
    originalPrice: '399',
    rating: '4.8 (342)',
    discount: '-25%',
  },
  {
    id: 6,
    title: 'Wooden Engraved Frame',
    image: '/Wooden.jpg',
    price: '549',
    originalPrice: '699',
    rating: '4.7 (112)',
    discount: '-21%',
  },
  {
    id: 7,
    title: 'Custom Name Necklace',
    image: '/Necklace.jpg',
    price: '899',
    originalPrice: null,
    rating: '4.9 (88)',
    badge: 'Bestseller',
  },
];

const bannerImages = [
  '/Banner1.png',
  '/Banner2.png',
  '/Banner3.png',
  '/Banner4.png'
];

const Home = ({ onAddToCart, onAddToWishlist, onSearch, onOpenProduct }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wishlistItems, setWishlistItems] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [searchVal, setSearchVal] = useState("");

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

  const handleWishlistClick = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    const isCurrentlyAdded = !!wishlistItems[productId];
    const isAddedNow = !isCurrentlyAdded;
    
    setWishlistItems(prev => ({ ...prev, [productId]: isAddedNow }));
    if (onAddToWishlist) onAddToWishlist(isAddedNow);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
          {bannerImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
            >
              <img src={img} alt={`Banner ${idx + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent"></div>
            </div>
          ))}

          {/* Foreground Content */}
          <div className="relative z-10 w-[60%] sm:w-[50%] md:w-2/3 lg:w-1/2">
            <h1 className="text-[15px] sm:text-xl md:text-5xl font-bold text-gray-900 mb-0.5 md:mb-2 tracking-tight leading-tight">
              Make Every Moment<br/>
              <span className="font-cursive text-secondary text-[22px] sm:text-3xl md:text-7xl font-normal leading-tight">Extra Special</span>
            </h1>
            <div className="font-alt text-gray-800 mt-1 md:mt-4 mb-2 md:mb-8 max-w-[170px] sm:max-w-[200px] md:max-w-md text-[11px] sm:text-sm md:text-xl font-medium">
              <p className="mb-0.5 md:mb-1.5">Unique gifts for your special ones.</p>
              <p>Thoughtful. Personal. Memorable.</p>
            </div>
            <button className="bg-primary hover:bg-opacity-90 text-white font-medium mt-4 md:mt-0 py-1.5 px-4 md:py-3 md:px-8 rounded-full text-xs md:text-base shadow-lg shadow-primary/30 transition-all flex items-center group w-max">
              Shop Now <FiChevronRight className="ml-1 md:ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Slider Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {bannerImages.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'w-6 bg-primary' : 'w-2 bg-gray-400 hover:bg-gray-500'
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
              <div key={index} className="flex flex-col items-center gap-2 cursor-pointer group">
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
            <button className="text-primary font-bold hover:underline flex items-center text-xs md:text-sm">
              See All <FiChevronRight className="ml-1" />
            </button>
          </div>
  
          <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-2 hide-scrollbar snap-x items-start">
            {trendingProducts.map((product) => (
              <div key={product.id} onClick={() => onOpenProduct && onOpenProduct(product)} className="w-[calc(50%-6px)] sm:w-[200px] lg:w-[calc((100%-3rem)/4)] flex-shrink-0 snap-start bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow group relative flex flex-col cursor-pointer">
                <div className="relative rounded-xl overflow-hidden mb-3 aspect-[4/3] bg-gray-100 w-full">
                  <img src={product.image} alt={product.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />

                  {product.badge && (
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-pink-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md">
                      {product.badge}
                    </span>
                  )}
                  <button onClick={(e) => handleWishlistClick(e, product.id)} className="absolute top-2 right-2 sm:top-3 sm:right-3 h-6 w-6 sm:h-8 sm:w-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-500 hover:text-secondary hover:bg-white transition-colors">
                    {wishlistItems[product.id] ? (
                      <FaHeart className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
                    ) : (
                      <FiHeart className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                  </button>
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5 sm:mb-1 truncate">{product.title}</h3>
                  <div className="flex items-center mb-1 sm:mb-2">
                    <span className="text-yellow-400 text-[10px] sm:text-xs">★</span>
                    <span className="text-[9px] sm:text-xs text-gray-500 ml-1">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-1 sm:pt-2">
                    <div className="flex flex-row items-baseline gap-1 flex-wrap">
                      <span className="text-sm sm:text-base font-bold text-gray-900 leading-none">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-[9px] sm:text-xs text-gray-400 line-through leading-none">₹{product.originalPrice}</span>
                      )}
                    </div>
                    <button onClick={(e) => handleAddToCartClick(e, product)} className="h-7 w-7 sm:h-9 sm:w-9 bg-primary text-white hover:bg-opacity-90 rounded-full flex items-center justify-center transition-colors shadow-md shadow-primary/20">
                      <FiShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
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
                    Today's Special Offer!
                  </h2>
                  <p className="text-[11px] sm:text-sm lg:text-[17px] text-gray-500 font-medium">
                    Get Flat <span className="text-[#de4b83] font-bold">20% OFF</span> on all orders
                  </p>
                </div>
                <button className="bg-gradient-to-r from-[#df4682] to-[#ec7297] hover:opacity-90 text-white font-medium py-1.5 px-3 sm:py-2 sm:px-5 lg:mt-auto lg:py-3 lg:px-6 rounded-full text-[10px] sm:text-sm lg:text-base shadow-sm transition-all flex items-center group whitespace-nowrap ml-2 lg:ml-0 z-10 relative">
                  Grab Now <FiChevronRight className="ml-0.5 sm:ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
        </div>
      </div>
        


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

        {/* WhatsApp Floating Button */}
        <button className="fixed bottom-24 md:bottom-6 right-6 h-12 w-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.6)] hover:shadow-[0_0_25px_rgba(34,197,94,0.8)] hover:scale-110 transition-all z-50">
          <FaWhatsapp className="h-7 w-7" />
        </button>
      </div>

      </main>
      <HomeScreen2 onAddToCart={onAddToCart} onAddToWishlist={onAddToWishlist} onOpenProduct={onOpenProduct} hideHeader={true} hideMobileNav={true} hideWhatsApp={true} />
    </>
  );
};

export default Home;
