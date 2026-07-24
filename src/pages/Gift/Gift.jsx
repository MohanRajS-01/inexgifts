import React, { useState, useMemo } from 'react';
import { 
  FiArrowLeft, 
  FiHeart, 
  FiShoppingCart, 
  FiSearch, 
  FiCamera, 
  FiSliders, 
  FiChevronDown, 
  FiStar, 
  FiTruck, 
  FiGrid, 
  FiList, 
  FiFilter, 
  FiCheck,
  FiX
} from 'react-icons/fi';
import { giftsData } from '../../data/gifts';
import './Gift.css';

const categories = [
  { id: 'all', name: 'All', icon: <FiGrid className="h-6 w-6 text-indigo-600" /> },
  { id: 'gift_sets', name: 'Gift Sets', image: '/assets/gift_box.png' },
  { id: 'mugs', name: 'Mugs', image: '/assets/mug.png' },
  { id: 'photo_frames', name: 'Photo Frames', image: '/wooden_collage_frame.png' },
  { id: 'cushions', name: 'Cushions', image: '/assets/cushion.png' },
  { id: 'chocolates', name: 'Chocolates', image: '/chocolate_gift_box.png' },
  { id: 'keychains', name: 'Keychains', image: '/spotify_keychain.png' },
  { id: 'flowers', name: 'Flowers', image: '/bouquet_flowers.png' },
  { id: 'greeting_cards', name: 'Greeting Cards', image: '/hamper_birthday.png' },
  { id: 'lamps', name: 'Lamps', image: '/assets/lamp_portrait.png' },
  { id: 'personalized', name: 'Personalized Gifts', image: '/wooden_personalized_frame.png' },
];

export default function Gift({ 
  setView, 
  onAddToCart, 
  onAddToWishlist, 
  onOpenProduct, 
  cartCount = 2, 
  wishlistCount = 0 
}) {
  // Search state
  const [searchVal, setSearchVal] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  // Filtering states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('all');
  const [occasionFilter, setOccasionFilter] = useState('all');
  const [personalizationFilter, setPersonalizationFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [deliveryFilter, setDeliveryFilter] = useState("all");
const [availabilityFilter, setAvailabilityFilter] = useState("all");

  // Sorting and Layout states
  const [sortOption, setSortOption] = useState('Popular');
  const [isGridLayout, setIsGridLayout] = useState(true);

  // Dropdown open states
  const [activeDropdown, setActiveDropdown] = useState(null); // 'price' | 'occasion' | 'personalization' | 'rating' | 'sort' | 'filterPanel' | null

  // Local Wishlist state to support immediate toggle in grid
  const [wishlistItems, setWishlistItems] = useState(() => {
    // mock list
    return { g1: true, g13: true };
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearch(searchVal.trim());
  };

  const handleSearchChange = (e) => {
    setSearchVal(e.target.value);
    // Instant filter on keystroke
    setActiveSearch(e.target.value.trim());
  };

  const toggleWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    const isAdded = !wishlistItems[productId];
    setWishlistItems(prev => ({ ...prev, [productId]: isAdded }));
    if (onAddToWishlist) {
      onAddToWishlist(isAdded);
    }
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(prev => prev === dropdown ? null : dropdown);
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const clearAllFilters = () => {
    setPriceFilter('all');
    setOccasionFilter('all');
    setPersonalizationFilter('all');
    setRatingFilter('all');
    setDeliveryFilter("all");
    setAvailabilityFilter("all");
    setActiveDropdown(null);
  };

  // Cumulative filtered & sorted products
  const filteredProducts = useMemo(() => {
    let result = [...giftsData];

    // 1. Search Query filter (case-insensitive)
    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        (p.occasion && p.occasion.toLowerCase().includes(q))
      );
    }

    // 2. Category Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => {
        // Map category tabs to product category tags
        const catMap = {
          'Gift Sets': 'Gift Sets',
          'Mugs': 'Mugs',
          'Photo Frames': 'Photo Frames',
          'Cushions': 'Cushions',
          'Chocolates': 'Chocolates',
          'Keychains': 'Keychains',
          'Flowers': 'Flowers',
          'Greeting Cards': 'Greeting Cards',
          'Lamps': 'Lamps',
          'Personalized Gifts': 'Personalized Gifts'
        };
        return p.category === catMap[selectedCategory];
      });
    }

    // 3. Price Dropdown filter
    if (priceFilter !== 'all') {
      if (priceFilter === 'under_500') {
        result = result.filter(p => p.price < 500);
      } else if (priceFilter === '500_1000') {
        result = result.filter(p => p.price >= 500 && p.price <= 1000);
      } else if (priceFilter === '1000_2000') {
        result = result.filter(p => p.price >= 1000 && p.price <= 2000);
      } else if (priceFilter === 'over_2000') {
        result = result.filter(p => p.price > 2000);
      }
    }

    // 4. Occasion Dropdown filter
    if (occasionFilter !== 'all') {
      result = result.filter(p => p.occasion && p.occasion.toLowerCase() === occasionFilter.toLowerCase());
    }

    // 5. Personalization Dropdown filter
    if (personalizationFilter !== 'all') {
      result = result.filter(p => p.personalization && p.personalization.toLowerCase() === personalizationFilter.toLowerCase());
    }

    // 6. Rating Dropdown filter
    if (ratingFilter !== 'all') {
      const minRating = parseFloat(ratingFilter);
      result = result.filter(p => p.rating >= minRating);
    }
    // Delivery Filter
if (deliveryFilter !== "all") {
  result = result.filter(
    (p) => p.deliveryText && p.deliveryText.includes(deliveryFilter)
  );
}

// Availability Filter
if (availabilityFilter !== "all") {
  result = result.filter(
    (p) => p.availability === availabilityFilter
  );
}
    // 7. Sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'Newest':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        case 'Best Selling':
          return b.salesCount - a.salesCount;
        case 'Highest Rating':
          return b.rating - a.rating;
        case 'Price Low to High':
          return a.price - b.price;
        case 'Price High to Low':
          return b.price - a.price;
        case 'Popular':
        default:
          return b.popularity - a.popularity;
      }
    });

    return result;
  }, [
  activeSearch,
  selectedCategory,
  priceFilter,
  occasionFilter,
  personalizationFilter,
  ratingFilter,
  deliveryFilter,
  availabilityFilter,
  sortOption
]);

  // Occasions list helper
  const occasionsList = ['Birthday', 'Anniversary', 'Valentine', 'Wedding', 'Corporate', 'Festival', 'General'];

  return (
    <div className="gift-page-container w-full min-h-screen bg-slate-50 pb-20">
      
      {/* 1. MOBILE HEADER BAR */}
      <header className="mobile-gift-header md:hidden sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between z-50">
        <button 
          onClick={() => setView('home1')} 
          className="p-1.5 text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Go Back"
        >
          <FiArrowLeft className="h-5 w-5 stroke-[2.5]" />
        </button>
        <span className="text-lg font-bold text-slate-900 font-alt">Gifts</span>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('wishlist')} 
            className="p-1 text-slate-800 hover:text-red-500 relative transition-colors"
            aria-label="Wishlist"
          >
            <FiHeart className="h-5.5 w-5.5 stroke-[2]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1.5 h-4 w-4 bg-[#e53b75] text-[9px] font-bold text-white rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setView('cart')} 
            className="p-1 text-slate-800 hover:text-indigo-600 relative transition-colors"
            aria-label="Cart"
          >
            <FiShoppingCart className="h-5.5 w-5.5 stroke-[2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 h-4 w-4 bg-[#e53b75] text-[9px] font-bold text-white rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="w-full max-w-screen-2xl mx-auto px-8 xl:px-12 py-4 sm:py-6">
        
        {/* DESKTOP BREADCRUMB & TITLE */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span className="cursor-pointer hover:text-indigo-600" onClick={() => setView('home1')}>Home</span>
              <span>/</span>
              <span className="text-slate-800">Gifts</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-1 font-alt">Gifts Catalog</h1>
          </div>
          <p className="text-sm text-slate-500 font-medium">Browse our exclusive collections tailored for your loved ones.</p>
        </div>

        {/* 2. SEARCH & SORT BAR */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FiSearch className="h-5 w-5" />
              </span>
              <input
                type="text"
                value={searchVal}
                onChange={handleSearchChange}
                placeholder="Search for gifts, frames, mugs..."
                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-10 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              />
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 cursor-pointer hover:text-slate-600">
                <FiCamera className="h-5 w-5" />
              </span>
            </div>
          </form>
          <button 
            type="button"
            onClick={() => toggleDropdown('sort')}
            className={`flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm shrink-0 relative ${activeDropdown === 'sort' ? 'ring-2 ring-indigo-500/20 border-indigo-500' : ''}`}
          >
            <FiSliders className="h-4 w-4 text-slate-500" />
            <span className="hidden sm:inline">Sort</span>
            <FiChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${activeDropdown === 'sort' ? 'rotate-180' : ''}`} />

            {/* Sort options popup */}
            {activeDropdown === 'sort' && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-[100] py-1.5 text-left font-normal animate-fade-in">
                {['Popular', 'Newest', 'Best Selling', 'Highest Rating', 'Price Low to High', 'Price High to Low'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSortOption(opt);
                      setActiveDropdown(null);
                    }}
                    className={`w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-indigo-50 transition-colors ${sortOption === opt ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'}`}
                  >
                    <span>{opt}</span>
                    {sortOption === opt && <FiCheck className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            )}
          </button>
        </div>

        {/* 3. CATEGORY HORIZONTAL SCROLL LIST */}
        <div className="relative mb-5 sm:mb-6">
          <div className="category-scroll-container flex gap-3 overflow-x-auto py-3 px-1 hide-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all shrink-0 cursor-pointer min-w-[100px] sm:min-w-[120px] ${isActive ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500/20 shadow-md transform scale-102' : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}
                >
                  <div className={`h-11 w-11 sm:h-14 sm:w-14 rounded-xl flex items-center justify-center overflow-hidden mb-2 ${isActive ? 'bg-white shadow-inner' : 'bg-slate-100'}`}>
                    {cat.icon ? (
                      cat.icon
                    ) : (
                      <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <span className={`text-[11px] sm:text-xs tracking-tight font-bold whitespace-nowrap ${isActive ? 'text-indigo-600' : 'text-slate-600'}`}>
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. RESULTS SUMMARY ROW */}
<div className="flex items-center justify-between border-t border-slate-100 pt-4 mb-4 select-none">

  {/* Left Side */}
  <span className="text-sm font-bold text-slate-600">
    {filteredProducts.length === giftsData.length
      ? "1,245+ gifts found"
      : `${filteredProducts.length} gift${filteredProducts.length === 1 ? "" : "s"} found`}
  </span>

  {/* Right Side */}
  <div className="flex items-center gap-2">

    {/* Sort */}
    <div className="relative hidden sm:block">
      <button
        onClick={() => toggleDropdown("sort")}
        className="flex items-center gap-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition"
      >
        {sortOption}
        <FiChevronDown
          className={`transition-transform ${
            activeDropdown === "sort" ? "rotate-180" : ""
          }`}
        />
      </button>

      {activeDropdown === "sort" && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2">
          {[
            "Popular",
            "Newest",
            "Best Selling",
            "Highest Rating",
            "Price Low to High",
            "Price High to Low",
          ].map((option) => (
            <button
              key={option}
              onClick={() => {
                setSortOption(option);
                setActiveDropdown(null);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-indigo-50 ${
                sortOption === option
                  ? "text-indigo-600 font-bold bg-indigo-50"
                  : "text-slate-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>

    {/* Grid */}
    <button
      onClick={() => setIsGridLayout(true)}
      className={`p-2 rounded-lg border transition ${
        isGridLayout
          ? "bg-indigo-50 border-indigo-300 text-indigo-600"
          : "border-slate-200 text-slate-500 hover:bg-slate-50"
      }`}
      title="Grid View"
    >
      <FiGrid className="h-4 w-4" />
    </button>

    {/* List */}
    <button
      onClick={() => setIsGridLayout(false)}
      className={`p-2 rounded-lg border transition ${
        !isGridLayout
          ? "bg-indigo-50 border-indigo-300 text-indigo-600"
          : "border-slate-200 text-slate-500 hover:bg-slate-50"
      }`}
      title="List View"
    >
      <FiList className="h-4 w-4" />
    </button>

    {/* Filter */}
    <button
      onClick={() => toggleDropdown("filterPanel")}
      className={`p-2 rounded-lg border transition ${
        activeDropdown === "filterPanel"
          ? "bg-indigo-50 border-indigo-300 text-indigo-600"
          : "border-slate-200 text-slate-500 hover:bg-slate-50"
      }`}
      title="Filters"
    >
      <FiFilter className="h-4 w-4" />
    </button>

  </div>
</div>
    {activeDropdown === "filterPanel" && (
  <>
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-40"
      onClick={() => setActiveDropdown(null)}
    />

    {/* Filter Popup */}
    <div
  className="
fixed z-[999]

left-1/2
top-1/2
-translate-x-1/2
-translate-y-1/2

w-[92%]
max-w-[360px]
max-h-[85vh]

bg-white
rounded-3xl
shadow-2xl
border
border-slate-200
overflow-hidden

md:left-auto
md:top-24
md:right-8
md:translate-x-0
md:translate-y-0
md:w-[400px]

animate-fade-in
"
>

      {/* Header */}

      <div className="flex items-center justify-between px-5 py-4 border-b">

        <h3 className="text-lg font-bold text-slate-800">
          Filters
        </h3>

        <button
          onClick={() => setActiveDropdown(null)}
          className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center"
        >
          <FiX size={18}/>
        </button>

      </div>

      {/* Body */}

      <div className="flex-1 overflow-y-auto p-5 space-y-4">

        {/* Price */}

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Price
          </label>

          <select
            value={priceFilter}
            onChange={(e)=>setPriceFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="all">All Prices</option>
            <option value="under_500">Under ₹500</option>
            <option value="500_1000">₹500 - ₹1000</option>
            <option value="1000_2000">₹1000 - ₹2000</option>
            <option value="over_2000">Above ₹2000</option>
          </select>
        </div>

        {/* Occasion */}

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Occasion
          </label>

          <select
            value={occasionFilter}
            onChange={(e)=>setOccasionFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="all">All</option>

            {occasionsList.map(item=>(
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>
        </div>

        {/* Delivery */}

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Delivery
          </label>

          <select
            value={deliveryFilter}
            onChange={(e)=>setDeliveryFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="all">All</option>
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
            <option value="2 Days">2 Days</option>
          </select>
        </div>

        {/* Availability */}

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Availability
          </label>

          <select
            value={availabilityFilter}
            onChange={(e)=>setAvailabilityFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="all">All</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* Rating */}

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Rating
          </label>

          <select
            value={ratingFilter}
            onChange={(e)=>setRatingFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="all">All Ratings</option>
            <option value="4.8">4.8★ & Above</option>
            <option value="4.5">4.5★ & Above</option>
            <option value="4.0">4.0★ & Above</option>
          </select>
        </div>

      </div>

      {/* Footer */}

      <div className="sticky bottom-0 bg-white border-t p-5 flex gap-3">

        <button
          onClick={clearAllFilters}
          className="flex-1 py-3 rounded-xl border border-slate-300 font-semibold hover:bg-slate-100"
        >
          Reset
        </button>

        <button
          onClick={()=>setActiveDropdown(null)}
          className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        >
          Apply
        </button>

      </div>

    </div>
  </>
)}
        {/* 6. PRODUCT DISPLAY */}
        {filteredProducts.length === 0 ? (
          <div className="w-full bg-white rounded-2xl border border-slate-100 py-16 px-4 text-center my-6 shadow-sm">
            <span className="text-4xl">🔍</span>
            <h3 className="text-lg font-extrabold text-slate-800 mt-4 font-alt">No Gifts Match Your Filters</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">Try resetting some dropdown filters, selecting another category, or adjusting your search query.</p>
            <button
              onClick={() => {
                clearAllFilters();
                setSearchVal('');
                setActiveSearch('');
                setSelectedCategory('All');
              }}
              className="mt-5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
            >
              Reset All Search & Filters
            </button>
          </div>
        ) : isGridLayout ? (
          
          /* GRID VIEW */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 2xl:grid-cols-6 gap-4 lg:gap-5">
            {filteredProducts.map((p) => {
              const isLiked = !!wishlistItems[p.id];
              return (
                <div
                  key={p.id}
                  onClick={() => onOpenProduct && onOpenProduct(p)}
                  className="gift-product-card bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col group cursor-pointer hover:shadow-xl hover:border-slate-200 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Card Image Container */}
                  <div className="relative aspect-square w-full bg-slate-50 overflow-hidden shrink-0">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Left Tag Badge */}
                    {p.badge && (
                      <span className={`absolute top-2.5 left-2.5 px-2.5 py-1 text-[9px] font-extrabold tracking-wide uppercase text-white rounded-md shadow-sm ${
                        p.badge === 'Bestseller' ? 'bg-[#e53b75]' : 
                        p.badge === 'Popular' ? 'bg-[#5B3EE0]' : 
                        p.badge === 'Trending' ? 'bg-cyan-500' : 'bg-rose-500'
                      }`}>
                        {p.badge}
                      </span>
                    )}

                    {/* Right Heart Toggle */}
                    <button
                      onClick={(e) => toggleWishlist(e, p.id)}
                      className="absolute top-2.5 right-2.5 h-8 w-8 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 group-hover:scale-102"
                      aria-label="Add to Wishlist"
                    >
                      <FiHeart 
                        className={`h-4.5 w-4.5 transition-colors ${
                          isLiked ? 'text-red-500 fill-red-500' : 'text-slate-400'
                        }`} 
                      />
                    </button>
                  </div>

                  {/* Card Details */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3 className="text-slate-800 text-xs sm:text-sm font-bold tracking-tight line-clamp-2 min-h-[32px] sm:min-h-[40px] group-hover:text-indigo-600 transition-colors">
                        {p.title}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 text-slate-400 text-[10px] sm:text-xs mt-1.5">
                        <FiStar className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        <span className="font-extrabold text-slate-700">{p.rating}</span>
                        <span>({p.ratingCount})</span>
                      </div>
                    </div>

                    <div className="mt-3.5">
                      {/* Pricing Row */}
                      <div className="flex flex-wrap items-baseline gap-1 sm:gap-1.5 mb-1.5">
                        <span className="text-sm sm:text-base font-extrabold text-slate-900">₹{p.price.toLocaleString('en-IN')}</span>
                        {p.originalPrice && (
                          <>
                            <span className="text-[10px] sm:text-xs text-slate-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                            <span className="text-[10px] sm:text-xs font-bold text-[#e53b75]">{p.discountPercent}</span>
                          </>
                        )}
                      </div>

                      {/* Delivery Row */}
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500 font-medium">
                        <FiTruck className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{p.deliveryText}</span>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          
          /* LIST VIEW */
          <div className="flex flex-col gap-3 max-w-4xl mx-auto">
            {filteredProducts.map((p) => {
              const isLiked = !!wishlistItems[p.id];
              return (
                <div
                  key={p.id}
                  onClick={() => onOpenProduct && onOpenProduct(p)}
                  className="gift-product-card bg-white border border-slate-100 rounded-2xl overflow-hidden flex cursor-pointer hover:shadow-xl hover:border-slate-200 transition-all duration-300 group"
                >
                  {/* Image container */}
                  <div className="relative aspect-square w-32 sm:w-44 bg-slate-50 overflow-hidden shrink-0">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {p.badge && (
                      <span className={`absolute top-2 left-2 px-2 py-0.5 text-[8px] font-extrabold tracking-wide uppercase text-white rounded shadow-sm ${
                        p.badge === 'Bestseller' ? 'bg-[#e53b75]' : 
                        p.badge === 'Popular' ? 'bg-[#5B3EE0]' : 
                        p.badge === 'Trending' ? 'bg-cyan-500' : 'bg-rose-500'
                      }`}>
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Details column */}
                  <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-slate-800 text-sm sm:text-lg font-bold tracking-tight group-hover:text-indigo-600 transition-colors">
                          {p.title}
                        </h3>

                        {/* Heart toggle list view */}
                        <button
                          onClick={(e) => toggleWishlist(e, p.id)}
                          className="h-8 w-8 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all active:scale-90"
                          aria-label="Add to Wishlist"
                        >
                          <FiHeart 
                            className={`h-4.5 w-4.5 transition-colors ${
                              isLiked ? 'text-red-500 fill-red-500' : 'text-slate-400'
                            }`} 
                          />
                        </button>
                      </div>

                      {/* Rating details list */}
                      <div className="flex items-center gap-1 text-slate-400 text-xs mt-1.5">
                        <FiStar className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        <span className="font-extrabold text-slate-700">{p.rating}</span>
                        <span>({p.ratingCount} reviews)</span>
                        <span className="mx-1.5">•</span>
                        <span className="text-slate-500 font-semibold">{p.category}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                      {/* Price Details */}
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg sm:text-2xl font-extrabold text-slate-900">₹{p.price.toLocaleString('en-IN')}</span>
                          {p.originalPrice && (
                            <>
                              <span className="text-xs sm:text-sm text-slate-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                              <span className="text-xs sm:text-sm font-bold text-[#e53b75]">{p.discountPercent}</span>
                            </>
                          )}
                        </div>

                        {/* Delivery */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
                          <FiTruck className="h-3.5 w-3.5 text-slate-400" />
                          <span>{p.deliveryText}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onAddToCart) onAddToCart(p);
                        }}
                        className="px-4 py-2 bg-[#5B3EE0] hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
                      >
                        Add to Cart
                      </button>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* 7. CUSTOMIZE PROMO BANNER */}
        <div className="customize-promo-banner mt-12 bg-gradient-to-r from-violet-100 to-indigo-100 rounded-3xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-violet-200/50">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 sm:h-16 sm:w-16 bg-white/80 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-sm">
              🎁
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-800 font-alt leading-tight">Can't find what you're looking for?</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5">Explore customized gifts made just for your loved ones.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={() => setView('categories')} // Navigate to categories search
              className="w-full sm:w-auto px-6 py-3 bg-white text-indigo-700 font-extrabold text-xs rounded-xl shadow-md border border-indigo-100 hover:bg-slate-50 hover:shadow-lg active:scale-95 transition-all text-center whitespace-nowrap"
            >
              Customize Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
