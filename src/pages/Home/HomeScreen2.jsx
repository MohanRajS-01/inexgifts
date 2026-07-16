import { useState, useEffect } from "react";
import {
  FiSearch, FiHeart, FiShoppingBag, FiUser, FiChevronRight, FiChevronLeft,
  FiUploadCloud, FiType, FiCalendar, FiEye, FiCheckCircle, FiShield,
  FiTruck, FiHeadphones, FiAward, FiMenu, FiX, FiArrowRight, FiInstagram,
  FiGift, FiFacebook
} from "react-icons/fi";
import { FaWhatsapp, FaHeart, FaStar, FaQuoteLeft } from "react-icons/fa";
import "./HomeScreen2.css";

// Mock Data
const bannerSlides = [
  {
    image: "/assets/lamp_heart_couple.png",
    tagline: "3D HEART LED LAMPS",
    title: "Illuminate Your Love Story",
    subtitle: "Custom printed acrylic with warm ambient glow. Personalize with your names and special anniversary date.",
    bgColor: "from-indigo-50/80 to-purple-50/80",
    textColor: "text-indigo-900"
  },
  {
    image: "/assets/images/products/wooden_collage_frame.jpg",
    tagline: "PREMIUM WOODEN CRAFTS",
    title: "Freeze Sweet Moments Forever",
    subtitle: "Handcrafted natural wood multi-photo collage frame. The perfect display for family memories.",
    bgColor: "from-amber-50/80 to-orange-50/80",
    textColor: "text-amber-900"
  },
  {
    image: "/assets/purple_giftbox.png",
    tagline: "LUXURY CELEBRATION BOXES",
    title: "Exquisite Curated Hampers",
    subtitle: "Premium gift packages filled with chocolates, custom mugs, and handwritten greeting cards.",
    bgColor: "from-pink-50/80 to-rose-50/80",
    textColor: "text-rose-900"
  }
];

const occasions = [
  { name: "Birthday Gifts", image: "/Banner.jpg", count: "140+ Items", link: "#" },
  { name: "Anniversary Special", image: "/Annivarsary.jpg", count: "98 Items", link: "#" },
  { name: "Love & Valentine", image: "/assets/lamp_heart_text.png", count: "65 Items", link: "#" },
  { name: "Wedding Hampers", image: "/assets/images/categories/gift_sets.jpg", count: "120+ Items", link: "#" },
  { name: "Housewarming", image: "/assets/images/categories/photo_frames.jpg", count: "45 Items", link: "#" },
  { name: "Custom Mugs", image: "/assets/images/categories/mugs.jpg", count: "80 Items", link: "#" }
];

const bestSellers = [
  {
    id: "bs-1",
    title: "Heart Couple 3D LED Photo Lamp",
    image: "/assets/lamp_heart_couple.png",
    price: 799,
    originalPrice: 1199,
    rating: 4.9,
    reviewCount: 184,
    badge: "Bestseller",
    badgeColor: "bg-purple-600"
  },
  {
    id: "bs-2",
    title: "Premium Chocolate Celebration Box",
    image: "/assets/images/products/premium_gift_set.jpg",
    price: 1499,
    originalPrice: 1999,
    rating: 4.8,
    reviewCount: 92,
    badge: "Limited",
    badgeColor: "bg-pink-600"
  },
  {
    id: "bs-3",
    title: "Handcrafted Wooden Collage Frame",
    image: "/assets/images/products/wooden_collage_frame.jpg",
    price: 679,
    originalPrice: 799,
    rating: 4.7,
    reviewCount: 120,
    badge: "Popular",
    badgeColor: "bg-amber-600"
  },
  {
    id: "bs-4",
    title: "Personalized Photo Cushion",
    image: "/assets/images/products/photo_cushion.jpg",
    price: 499,
    originalPrice: 699,
    rating: 4.6,
    reviewCount: 64,
    badge: "New",
    badgeColor: "bg-teal-600"
  },
  {
    id: "bs-5",
    title: "Magic Customized Photo Mug",
    image: "/assets/images/products/customized_mug.jpg",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviewCount: 310,
    badge: "Hot",
    badgeColor: "bg-red-500"
  },
  {
    id: "bs-6",
    title: "Elegant Custom Name Necklace",
    image: "/Necklace.jpg",
    price: 899,
    originalPrice: 1299,
    rating: 4.9,
    reviewCount: 78,
    badge: "Trending",
    badgeColor: "bg-blue-600"
  }
];

const customerReviews = [
  {
    id: "rev-1",
    name: "Anjali Sharma",
    location: "New Delhi",
    rating: 5,
    comment: "Absolutely beautiful lamp! The 3D printing of our photo is so clean and clear, and the warm light adds such a romantic ambient glow to our bedroom. Gifted it to my husband for our anniversary and he loved it!",
    product: "Heart Couple LED Lamp",
    date: "2 days ago"
  },
  {
    id: "rev-2",
    name: "Rohan Singhal",
    location: "Mumbai",
    rating: 5,
    comment: "The wooden collage frame quality exceeded all expectations. The wood texture is rich, solid, and feels incredibly premium. Shipping was super fast and it arrived in a beautiful gift-ready package.",
    product: "Wooden Collage Frame",
    date: "1 week ago"
  },
  {
    id: "rev-3",
    name: "Meera Krishnan",
    location: "Bangalore",
    rating: 5,
    comment: "Amazing customer support! I uploaded the wrong image initially but emailed them right away. They updated it instantly and provided a free preview within hours. The print details on the cushion are stellar.",
    product: "Custom Photo Cushion",
    date: "2 weeks ago"
  }
];

const instagramPosts = [
  { image: "/assets/lamp_portrait.png", likes: "1.2k", comments: 48 },
  { image: "/assets/mug.png", likes: "982", comments: 24 },
  { image: "/assets/cushion.png", likes: "2.1k", comments: 95 },
  { image: "/assets/images/products/flowers_bouquet.jpg", likes: "840", comments: 16 },
  { image: "/assets/images/products/greeting_card.jpg", likes: "1.5k", comments: 38 },
  { image: "/assets/images/products/chocolate_box.jpg", likes: "712", comments: 12 }
];

export default function HomeScreen2({
  onAddToCart,
  onAddToWishlist,
  hideHeader = false,
  hideMobileNav = false,
  hideWhatsApp = false,
  cartCount: parentCartCount,
  wishlistCount: parentWishlistCount
}) {
  const [localCartCount, setLocalCartCount] = useState(2);
  const [localWishlistCount, setLocalWishlistCount] = useState(0);

  const cartCount = parentCartCount !== undefined ? parentCartCount : localCartCount;
  const wishlistCount = parentWishlistCount !== undefined ? parentWishlistCount : localWishlistCount;
  const [wishlistItems, setWishlistItems] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [showNewsletterSuccess, setShowNewsletterSuccess] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [activeTab, setActiveTab] = useState("home");

  // Auto-play Hero Slider
  useEffect(() => {
    const sliderTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(sliderTimer);
  }, []);

  // Auto-play Review Slider
  useEffect(() => {
    const reviewTimer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % customerReviews.length);
    }, 6000);
    return () => clearInterval(reviewTimer);
  }, []);

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleAddToCart = (productName) => {
    setLocalCartCount((prev) => prev + 1);
    if (onAddToCart) onAddToCart();
    triggerToast(`Added "${productName}" to Cart!`);
  };

  const toggleWishlist = (productId, productName) => {
    const isAdded = !wishlistItems[productId];
    setWishlistItems((prev) => ({ ...prev, [productId]: isAdded }));
    setLocalWishlistCount((prev) => (isAdded ? prev + 1 : Math.max(0, prev - 1)));
    if (onAddToWishlist) onAddToWishlist(isAdded);
    triggerToast(isAdded ? `Added "${productName}" to Wishlist!` : `Removed "${productName}" from Wishlist.`);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    setShowNewsletterSuccess(true);
    setNewsletterEmail("");
    setTimeout(() => setShowNewsletterSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16 md:pb-0 flex flex-col">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white border border-slate-700/50 px-6 py-3 rounded-full shadow-2xl z-[150] flex items-center gap-2.5 animate-scale-in">
          <FiCheckCircle className="text-emerald-400 h-5 w-5" />
          <span className="font-semibold text-xs tracking-wider uppercase text-slate-100">{toast.message}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      {!hideHeader && (
        <>
          <header className="header-glass sticky top-0 z-[100] w-full px-4 md:px-8 py-3.5 flex items-center justify-between shadow-premium transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 text-white shadow-glow">
            <FiAward className="h-5 w-5 animate-pulse" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-tight text-slate-900">INEX</span>
            <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-pink-600">Gifts</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-[15px] font-medium text-slate-700">
          <a href="#" className="hover:text-violet-600 transition-colors">Home</a>
          <a href="#best-sellers" className="hover:text-violet-600 transition-colors">Bestsellers</a>
          <a href="#occasions" className="hover:text-violet-600 transition-colors">Occasions</a>
          <a href="#reviews" className="hover:text-violet-600 transition-colors">Reviews</a>
          <a href="#instagram" className="hover:text-violet-600 transition-colors">Gallery</a>
        </nav>

        {/* Header Interactions (Right) */}
        <div className="flex items-center gap-2.5 md:gap-4">
          {/* Desktop Search */}
          <div className="relative hidden md:block w-64 lg:w-80">
            <input
              type="text"
              placeholder="Search custom gifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-10 pr-4 text-xs font-medium text-slate-700 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-violet-600/20 focus:outline-none transition-all duration-300 shadow-inner"
            />
            <FiSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 h-4.5 w-4.5" />
          </div>

          {/* Search Toggle Mobile */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <FiSearch className="h-5 w-5" />
          </button>

          {/* Wishlist Icon */}
          <button className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors relative">
            <FiHeart className="h-5 w-5 hover:text-pink-600 transition-colors" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm scale-95">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors relative">
            <FiShoppingBag className="h-5 w-5 hover:text-violet-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-[10px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm scale-95">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar */}
          <button className="hidden md:flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
            </div>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          >
            {mobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Search Dropdown */}
      {searchOpen && (
        <div className="md:hidden bg-white px-4 py-3.5 border-b border-slate-100 flex items-center gap-3 animate-fade-in z-[90]">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search custom gifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-10 pr-4 text-xs font-medium focus:bg-white focus:outline-none transition-all"
            />
            <FiSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 h-4.5 w-4.5" />
          </div>
          <button onClick={() => setSearchOpen(false)} className="text-xs font-semibold text-slate-500 hover:text-slate-900 px-1">
            Cancel
          </button>
        </div>
      )}

      {/* Mobile Side Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] bg-slate-900/40 backdrop-blur-sm z-[99] lg:hidden animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-[80%] max-w-xs bg-white h-full p-6 shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <nav className="flex flex-col space-y-6 text-base font-semibold text-slate-800">
              <a href="#" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between hover:text-violet-600 transition-colors">
                <span>Home</span> <FiChevronRight />
              </a>
              <a href="#best-sellers" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between hover:text-violet-600 transition-colors">
                <span>Bestsellers</span> <FiChevronRight />
              </a>
              <a href="#occasions" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between hover:text-violet-600 transition-colors">
                <span>Occasions</span> <FiChevronRight />
              </a>
              <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between hover:text-violet-600 transition-colors">
                <span>Reviews</span> <FiChevronRight />
              </a>
              <a href="#instagram" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between hover:text-violet-600 transition-colors">
                <span>Gallery</span> <FiChevronRight />
              </a>
            </nav>
            <div className="mt-10 pt-8 border-t border-slate-100 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">Anjali Sharma</p>
                <p className="text-xs font-semibold text-slate-400">Delhi, India</p>
              </div>
            </div>
          </div>
        </div>
      )}
        </>
      )}

      {/* HERO BANNER SECTION (Autoplay Slider) */}
      <section className="relative w-full max-w-[1600px] mx-auto px-4 md:px-8 py-6">
        <div className="relative rounded-3xl overflow-hidden shadow-premium bg-slate-100 min-h-[460px] md:min-h-[520px] flex items-center">
          {bannerSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between p-6 md:p-16 bg-gradient-to-r ${slide.bgColor} transition-opacity duration-1000 ${
                idx === currentSlide ? "opacity-100 z-10 scale-100" : "opacity-0 -z-10 scale-105"
              }`}
            >
              {/* Slide Content */}
              <div className="flex-1 max-w-xl text-center md:text-left z-10 mt-6 md:mt-0 flex flex-col items-center md:items-start">
                <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-pink-600 mb-3 bg-pink-100/50 px-3 py-1 rounded-full w-max">
                  {slide.tagline}
                </span>
                <h1 className={`text-3xl md:text-6xl font-extrabold tracking-tight ${slide.textColor} leading-[1.1] mb-4`}>
                  {slide.title.split(" ").slice(0, -2).join(" ")}{" "}
                  <span className="font-cursive text-pink-600 font-normal text-4xl md:text-7xl block md:inline md:ml-1 leading-none">
                    {slide.title.split(" ").slice(-2).join(" ")}
                  </span>
                </h1>
                <p className="text-slate-600 text-sm md:text-lg mb-8 font-medium leading-relaxed max-w-md">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <a
                    href="#best-sellers"
                    className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold text-sm tracking-wider uppercase py-3.5 px-8 rounded-full shadow-glow hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Customize Now</span>
                    <FiChevronRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="#occasions"
                    className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-sm tracking-wider uppercase py-3.5 px-8 rounded-full transition-all text-center"
                  >
                    View Occasions
                  </a>
                </div>
              </div>

              {/* Slide Image */}
              <div className="flex-1 w-full max-w-[280px] md:max-w-[420px] aspect-square flex items-center justify-center relative z-10 mt-4 md:mt-0">
                <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-95"></div>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)] animate-float"
                />
              </div>
            </div>
          ))}

          {/* Slider Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)}
            className="absolute left-4 md:left-6 z-25 h-10 w-10 md:h-12 md:w-12 bg-white/70 hover:bg-white backdrop-blur-md rounded-full shadow-md flex items-center justify-center text-slate-800 transition-all hover:scale-105"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)}
            className="absolute right-4 md:right-6 z-25 h-10 w-10 md:h-12 md:w-12 bg-white/70 hover:bg-white backdrop-blur-md rounded-full shadow-md flex items-center justify-center text-slate-800 transition-all hover:scale-105"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>

          {/* Slider Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-25">
            {bannerSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "w-7 bg-violet-600" : "w-2.5 bg-slate-400/60 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* OCCASION COLLECTION SECTION */}
      <section id="occasions" className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-1.5 text-pink-600 bg-pink-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <FiGift className="h-4.5 w-4.5" />
            <span>Curated Collections</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Shop by Occasion</h2>
          <p className="text-slate-500 text-sm md:text-base mt-2 max-w-md font-medium">
            Handpicked custom templates and premium gift hampers tailored for every celebration.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {occasions.map((occ, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-premium-hover cursor-pointer bg-slate-200"
            >
              <img
                src={occ.image}
                alt={occ.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left flex flex-col justify-end">
                <span className="text-[9px] font-bold text-pink-400 uppercase tracking-widest mb-1.5">
                  {occ.count}
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                  {occ.name}
                </h3>
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-white/90 bg-white/20 backdrop-blur-sm rounded-full py-1 px-3 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore</span>
                  <FiChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLER SECTION */}
      <section id="best-sellers" className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-violet-600 bg-violet-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <FiAward className="h-4.5 w-4.5 animate-pulse" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Our Best Sellers</h2>
            <p className="text-slate-500 text-sm md:text-base mt-2 font-medium">
              Explore the customized creations that our clients love and buy most.
            </p>
          </div>
          <button className="mt-4 md:mt-0 mx-auto md:mx-0 flex items-center gap-1 text-sm font-bold text-violet-600 hover:text-violet-700 transition-colors">
            <span>View All Bestsellers</span>
            <FiArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {bestSellers.map((product) => {
            const isWishlisted = !!wishlistItems[product.id];
            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-100 shadow-premium p-3 flex flex-col transition-all duration-300 hover:shadow-xl hover:border-slate-200 relative"
              >
                {/* Badge & Wishlist Button */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`${product.badgeColor} text-white text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-sm`}>
                    {product.badge}
                  </span>
                </div>
                <button
                  onClick={() => toggleWishlist(product.id, product.title)}
                  className="absolute top-4 right-4 z-10 h-8 w-8 bg-white/90 backdrop-blur-md rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-pink-600 hover:scale-105 transition-all"
                >
                  {isWishlisted ? (
                    <FaHeart className="h-4.5 w-4.5 text-pink-600 animate-scale-in" />
                  ) : (
                    <FiHeart className="h-4.5 w-4.5" />
                  )}
                </button>

                {/* Product Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 mb-3 cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white/95 text-slate-800 text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                      <FiEye className="h-4 w-4" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 hover:text-violet-600 transition-colors mb-1 min-h-[36px] leading-tight">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center text-amber-400">
                      <FaStar className="h-3 w-3" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">{product.rating}</span>
                    <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
                  </div>

                  {/* Pricing and Cart */}
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 line-through leading-none mb-0.5 font-semibold">
                        ₹{product.originalPrice}
                      </span>
                      <span className="text-[15px] font-extrabold text-slate-900 leading-none">
                        ₹{product.price}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product.title)}
                      className="h-8.5 w-8.5 bg-violet-600 text-white rounded-full hover:bg-pink-600 flex items-center justify-center transition-colors shadow-glow hover:shadow-glow-pink"
                    >
                      <FiShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROMOTIONAL BANNER SECTION */}
      <section className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-8">
        <div className="bg-gradient-to-br from-indigo-900 via-violet-950 to-pink-700 rounded-[32px] overflow-hidden relative shadow-2xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between min-h-[380px]">
          {/* Ambient shapes */}
          <div className="accent-glow-circle top-0 right-1/4"></div>
          <div className="absolute top-1/2 left-8 h-20 w-20 bg-pink-500/10 rounded-full blur-xl"></div>

          {/* Left Text */}
          <div className="relative z-10 flex-1 max-w-lg text-center md:text-left flex flex-col items-center md:items-start mb-8 md:mb-0">
            <span className="bg-white/10 backdrop-blur-md text-pink-300 border border-white/10 text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4">
              Seasonal Campaign
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">
              Flat <span className="text-pink-400">25% OFF</span> + Free Express Shipping
            </h2>
            <p className="text-slate-300 text-sm md:text-base font-medium mb-8 leading-relaxed max-w-sm">
              Use promo code at checkout. Valid on customized couple gift boxes & hampers this week only.
            </p>
            <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1.5 pl-5 w-full max-w-xs sm:w-auto">
              <span className="text-xs font-extrabold tracking-widest text-slate-100">PROMO:</span>
              <span className="text-sm font-black tracking-wider text-pink-400">GIFT25</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("GIFT25");
                  triggerToast("Promo code 'GIFT25' copied to clipboard!");
                }}
                className="bg-white hover:bg-slate-50 text-indigo-900 font-extrabold text-xs tracking-wider uppercase py-2.5 px-5 rounded-full transition-all ml-auto"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Right Product Collage */}
          <div className="flex-1 flex justify-center items-center relative min-h-[220px] w-full max-w-md">
            {/* Background elements */}
            <div className="absolute h-48 w-48 bg-white/5 rounded-full blur-2xl"></div>

            {/* Floating Image 1 */}
            <div className="absolute -left-4 z-10 animate-float" style={{ animationDelay: "0s" }}>
              <div className="h-32 w-32 bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-3xl shadow-2xl">
                <img
                  src="/assets/mug.png"
                  alt="Custom mug"
                  className="h-full w-full object-contain filter drop-shadow-lg"
                />
              </div>
            </div>

            {/* Center Image 2 */}
            <div className="z-20 h-44 w-44 bg-white/20 backdrop-blur-md border border-white/25 p-4 rounded-[36px] shadow-2xl animate-float" style={{ animationDelay: "1s" }}>
              <img
                src="/assets/purple_giftbox.png"
                alt="Celebration gift box"
                className="h-full w-full object-contain filter drop-shadow-xl"
              />
            </div>

            {/* Floating Image 3 */}
            <div className="absolute -right-4 z-10 animate-float" style={{ animationDelay: "2s" }}>
              <div className="h-32 w-32 bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-3xl shadow-2xl">
                <img
                  src="/assets/cushion.png"
                  alt="Custom cushion"
                  className="h-full w-full object-contain filter drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS SECTION */}
      <section id="reviews" className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-10 bg-slate-100 rounded-[32px] my-10 relative overflow-hidden">
        {/* Soft decorative glow */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl"></div>

        <div className="flex flex-col items-center text-center mb-10 relative z-10">
          <div className="inline-flex items-center gap-1 text-violet-600 bg-violet-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <FaStar className="h-3.5 w-3.5 fill-current" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Our Customers Speak</h2>
          <p className="text-slate-500 text-sm md:text-base mt-2 max-w-sm font-medium">
            Over 10,000+ verified buyers rated us 4.8/5 stars for product presentation and delivery.
          </p>
        </div>

        {/* Carousel container */}
        <div className="relative max-w-3xl mx-auto z-10">
          <div className="overflow-hidden min-h-[220px]">
            {customerReviews.map((rev, idx) => (
              <div
                key={rev.id}
                className={`transition-all duration-700 flex flex-col items-center text-center ${
                  idx === currentReview ? "opacity-100 scale-100 block" : "opacity-0 scale-95 hidden"
                }`}
              >
                <div className="inline-flex items-center justify-center text-violet-400 bg-violet-50 rounded-full h-12 w-12 mb-6">
                  <FaQuoteLeft className="h-6 w-6" />
                </div>
                <p className="text-slate-700 text-base md:text-xl font-medium leading-relaxed italic max-w-xl">
                  "{rev.comment}"
                </p>

                {/* Rating stars */}
                <div className="flex items-center gap-0.5 justify-center mt-6 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400 h-4.5 w-4.5" />
                  ))}
                </div>

                <h4 className="text-sm md:text-base font-extrabold text-slate-950 flex items-center justify-center gap-1.5">
                  <span>{rev.name}</span>
                  <span className="inline-flex h-1.5 w-1.5 bg-slate-300 rounded-full"></span>
                  <span className="text-xs font-bold text-slate-400">{rev.location}</span>
                </h4>
                <div className="mt-2.5 flex items-center justify-center gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-md py-0.5 px-2">
                    Verified Buyer
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-200/50 py-0.5 px-2 rounded-md">
                    Purchased: {rev.product}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {customerReviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentReview(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentReview ? "w-6 bg-violet-600" : "w-2 bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM GALLERY SECTION */}
      <section id="instagram" className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-pink-600 bg-pink-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <FiInstagram className="h-4.5 w-4.5" />
            <span>@INEXGifts</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Showcase Your Joy</h2>
          <p className="text-slate-500 text-sm md:text-base mt-2 max-w-sm font-medium">
            Post your personalized gift opening using hashtag <span className="text-pink-600 font-bold">#INEXGifts</span> to get featured!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, idx) => (
            <div key={idx} className="instagram-item group rounded-2xl aspect-square bg-slate-200">
              <img
                src={post.image}
                alt={`Instagram highlight ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay on hover */}
              <div className="instagram-overlay absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <div className="flex items-center gap-4 text-sm font-extrabold">
                  <span className="flex items-center gap-1.5">
                    <FaHeart className="text-pink-500" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiInstagram /> {post.comments}
                  </span>
                </div>
                <span className="mt-4 text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-sm py-1 px-3.5 rounded-full text-white/95">
                  Shop Product
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES GRID SECTION */}
      <section className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-8 border-t border-slate-100">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-premium hover:shadow-md transition-shadow">
            <div className="h-11 w-11 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0">
              <FiTruck className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-0.5">Free Express Shipping</h4>
              <p className="text-xs font-semibold text-slate-400 leading-snug">Fast secure delivery to 24k+ zipcodes</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-premium hover:shadow-md transition-shadow">
            <div className="h-11 w-11 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0">
              <FiGift className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-0.5">Premium Box Packing</h4>
              <p className="text-xs font-semibold text-slate-400 leading-snug">Double boxed wrap with handwritten notes</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-premium hover:shadow-md transition-shadow">
            <div className="h-11 w-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <FiShield className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-0.5">100% Secure Checkout</h4>
              <p className="text-xs font-semibold text-slate-400 leading-snug">Fully encrypted payments via UPI/Cards</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-premium hover:shadow-md transition-shadow">
            <div className="h-11 w-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <FiHeadphones className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-0.5">24/7 Live Support</h4>
              <p className="text-xs font-semibold text-slate-400 leading-snug">Connect via WhatsApp for customization help</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 px-4 md:px-8 mt-12 w-full max-w-[1600px] mx-auto rounded-t-[36px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-slate-900 pb-12">
          {/* Logo & Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-5 cursor-pointer">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 text-white shadow-glow">
                <FiAward className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold tracking-tight text-white">INEX</span>
                <span className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-pink-500">Gifts</span>
              </div>
            </div>
            <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">
              INEX Gifts specializes in handcrafted and personalized custom gifts, photo frames, mugs, and ambient lighting setups designed to freeze memories forever.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="h-9 w-9 bg-slate-900 hover:bg-pink-600/20 hover:text-pink-500 rounded-xl flex items-center justify-center transition-colors">
                <FiInstagram className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="h-9 w-9 bg-slate-900 hover:bg-blue-600/20 hover:text-blue-500 rounded-xl flex items-center justify-center transition-colors">
                <FiFacebook className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="h-9 w-9 bg-slate-900 hover:bg-emerald-600/20 hover:text-emerald-500 rounded-xl flex items-center justify-center transition-colors">
                <FaWhatsapp className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Shop categories links */}
          <div>
            <h4 className="text-slate-200 text-sm font-extrabold tracking-wider uppercase mb-5">Shop Categories</h4>
            <ul className="space-y-3.5 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">3D LED Photo Lamps</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customized Photo Cushions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Handmade Wooden Frames</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Personalized Name Necklaces</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Corporate Celebration Hamper Box</a></li>
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h4 className="text-slate-200 text-sm font-extrabold tracking-wider uppercase mb-5">Customer Care</h4>
            <ul className="space-y-3.5 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customization Process</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Exchange Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs & Live Chat Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support Team</a></li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div>
            <h4 className="text-slate-200 text-sm font-extrabold tracking-wider uppercase mb-5">Stay Updated</h4>
            <p className="text-slate-500 text-xs font-semibold mb-4 leading-relaxed">
              Subscribe to get notified about special product drops, promo codes, and customization catalogs.
            </p>

            {showNewsletterSuccess ? (
              <div className="bg-emerald-950/40 border border-emerald-900 text-emerald-400 p-4 rounded-xl flex items-start gap-2.5 animate-scale-in">
                <FiCheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-100">Subscription Active!</p>
                  <p className="text-[10px] font-semibold text-emerald-500/80 mt-0.5">We've sent a discount voucher code to your inbox.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2.5">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-xs font-semibold text-slate-300 placeholder-slate-600 focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold text-xs tracking-wider uppercase py-3 px-6 rounded-xl hover:shadow-glow transition-all"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] font-bold text-slate-600">
          <p>© 2026 INEX Gifts Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="h-3 w-[1px] bg-slate-800"></span>
            <span className="hover:text-slate-400 cursor-pointer">Terms & Conditions</span>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION */}
      {!hideMobileNav && (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/60 flex items-center justify-around md:hidden z-[99] shadow-2xl">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center justify-center w-12 mobile-nav-btn ${activeTab === "home" ? "active text-violet-600" : "text-slate-400"}`}
        >
          <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>

        <a
          href="#occasions"
          onClick={() => setActiveTab("categories")}
          className={`flex flex-col items-center justify-center w-12 mobile-nav-btn ${activeTab === "categories" ? "active text-violet-600" : "text-slate-400"}`}
        >
          <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <rect x="3" y="3" width="7" height="9" />
            <rect x="14" y="3" width="7" height="5" />
            <rect x="14" y="12" width="7" height="9" />
            <rect x="3" y="16" width="7" height="5" />
          </svg>
          <span className="text-[10px] font-bold mt-1">Categories</span>
        </a>

        <a
          href="#best-sellers"
          onClick={() => setActiveTab("wishlist")}
          className={`flex flex-col items-center justify-center w-12 mobile-nav-btn relative ${activeTab === "wishlist" ? "active text-violet-600" : "text-slate-400"}`}
        >
          <FiHeart className="h-5.5 w-5.5" />
          {wishlistCount > 0 && (
            <span className="absolute top-1 right-1.5 bg-pink-500 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
              {wishlistCount}
            </span>
          )}
          <span className="text-[10px] font-bold mt-1">Wishlist</span>
        </a>

        <button
          onClick={() => setActiveTab("cart")}
          className={`flex flex-col items-center justify-center w-12 mobile-nav-btn relative ${activeTab === "cart" ? "active text-violet-600" : "text-slate-400"}`}
        >
          <FiShoppingBag className="h-5.5 w-5.5" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1.5 bg-violet-600 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-bold mt-1">Cart</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center justify-center w-12 mobile-nav-btn ${activeTab === "profile" ? "active text-violet-600" : "text-slate-400"}`}
        >
          <FiUser className="h-5.5 w-5.5" />
          <span className="text-[10px] font-bold mt-1">Profile</span>
        </button>
      </nav>
      )}

      {/* Floating WhatsApp contact */}
      {!hideWhatsApp && (
        <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-8 right-6 h-12.5 w-12.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all z-40 hover:shadow-emerald-500/20"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>
      )}
    </div>
  );
}
