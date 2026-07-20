import React, { useState, useRef, useEffect } from 'react';
import { FiMenu, FiSearch, FiShoppingCart, FiHome, FiGrid, FiGift, FiShoppingBag, FiUser, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { MdCake, MdChildFriendly, MdFavoriteBorder, MdSchool, MdCardGiftcard, MdFace, MdFavorite } from 'react-icons/md';
import "./Categories.css";

function Categories({ setView, onSearch, selectedCategory, setSelectedCategory }) {
  const [activeTab, setActiveTab] = useState(1);
  const [expandOccasions, setExpandOccasions] = useState(false);
  const [expandPopular, setExpandPopular] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [favorites, setFavorites] = useState([]);
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [scrollPage, setScrollPage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const categoryRef = useRef(null);
  const visibleItemsPerPage = 10;

  const handleAction = (message) => {
    // No-op or log instead of annoying alerts
    console.log(message);
  };

  // Close menu when clicking overlay
  const closeMenu = () => setMenuOpen(false);

  // Category data with filtering attributes
  const allCategories = [
    { title: 'Gift Boxes', items: '128 items', img: '/images/gift_boxes_1783346024487.png', bgColor: '#F2EAFB', emoji: '🎁', type: 'gifts', rating: 4.8, popularity: 95 },
    { title: 'Photo Frames', items: '96 items', img: '/images/photo_frames_1783346033855.png', bgColor: '#FBEAEA', emoji: '🖼️', type: 'decor', rating: 4.6, popularity: 85 },
    { title: 'Personalized Mugs', items: '72 items', img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200&h=200&fit=crop&crop=center', bgColor: '#EFEFEF', emoji: '☕', type: 'personalized', rating: 4.7, popularity: 88 },
    { title: 'Cushions', items: '58 items', img: 'https://images.unsplash.com/photo-1588036936928-b1b01ea7a8a1?w=200&h=200&fit=crop&crop=center', bgColor: '#EAF5FB', emoji: '🛋️', type: 'decor', rating: 4.5, popularity: 75 },
    { title: 'Keychains', items: '64 items', img: 'https://images.unsplash.com/photo-1621607512022-6aecc4fed814?w=200&h=200&fit=crop&crop=center', bgColor: '#EEFBEA', emoji: '🔑', type: 'accessories', rating: 4.4, popularity: 72 },
    { title: 'LED Lamps', items: '46 items', img: '/images/led_lamp.png', bgColor: '#FBF4EA', emoji: '💡', type: 'tech', rating: 4.9, popularity: 92 },
    { title: 'Flowers & Bouquets', items: '83 items', img: '/images/flowers_bouquets.png', bgColor: '#EAFBEF', emoji: '🌹', type: 'gifts', rating: 4.3, popularity: 80 },
    { title: 'Greeting Cards', items: '39 items', img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=200&h=200&fit=crop&crop=center', bgColor: '#FBEAF0', emoji: '💌', type: 'gifts', rating: 4.2, popularity: 65 },
    { title: 'Chocolates', items: '67 items', img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&h=200&fit=crop&crop=center', bgColor: '#FBF8EA', emoji: '🍫', type: 'gifts', rating: 4.6, popularity: 90 },
    { title: 'Gift Sets', items: '55 items', img: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=200&h=200&fit=crop&crop=center', bgColor: '#EAEFFB', emoji: '🎀', type: 'gifts', rating: 4.7, popularity: 86 },
    { title: 'Candles', items: '42 items', img: '/images/candles.png', bgColor: '#FFF4E8', emoji: '🕯️', type: 'decor', rating: 4.6, popularity: 82 },
    { title: 'Canvas Prints', items: '28 items', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200&h=200&fit=crop&crop=center', bgColor: '#F3F0FF', emoji: '🎨', type: 'decor', rating: 4.5, popularity: 78 },
    { title: 'Name Plates', items: '36 items', img: 'https://images.unsplash.com/photo-1586281380923-5fa6fca1a2c7?w=200&h=200&fit=crop&crop=center', bgColor: '#E9F1FE', emoji: '🖋️', type: 'personalized', rating: 4.4, popularity: 74 },
    { title: 'Scrapbooks', items: '20 items', img: 'https://images.unsplash.com/photo-1499744937866-d7e566a20a61?w=200&h=200&fit=crop&crop=center', bgColor: '#FFF7EA', emoji: '📖', type: 'craft', rating: 4.3, popularity: 70 },
    { title: 'Calendars', items: '18 items', img: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=200&h=200&fit=crop&crop=center', bgColor: '#E8F5E9', emoji: '📅', type: 'stationery', rating: 4.2, popularity: 68 },
    { title: 'Blankets', items: '34 items', img: '/images/blanket.png', bgColor: '#F0F5FF', emoji: '🛏️', type: 'home', rating: 4.7, popularity: 79 },
    { title: 'Bags', items: '45 items', img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=200&h=200&fit=crop&crop=center', bgColor: '#FFF0F7', emoji: '🎒', type: 'accessories', rating: 4.5, popularity: 77 },
    { title: 'Mobile Covers', items: '29 items', img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&h=200&fit=crop&crop=center', bgColor: '#EFF5FF', emoji: '📱', type: 'tech', rating: 4.6, popularity: 83 },
    { title: 'Soft Toys', items: '51 items', img: 'https://images.unsplash.com/photo-1559715745-e1b33a271c8f?w=200&h=200&fit=crop&crop=center', bgColor: '#FFF5F8', emoji: '🧸', type: 'kids', rating: 4.8, popularity: 91 },
    { title: 'Headphones', items: '38 items', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&crop=center', bgColor: '#F0F0FF', emoji: '🎧', type: 'tech', rating: 4.7, popularity: 86 },
    { title: 'Books', items: '64 items', img: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200&h=200&fit=crop&crop=center', bgColor: '#F7F3E8', emoji: '📚', type: 'books', rating: 4.8, popularity: 89 },
    { title: 'Indoor Plants', items: '30 items', img: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=200&h=200&fit=crop&crop=center', bgColor: '#EFF8F0', emoji: '🌿', type: 'home', rating: 4.6, popularity: 81 },
    { title: 'Tea & Coffee Sets', items: '27 items', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop&crop=center', bgColor: '#FEF4E9', emoji: '🍵', type: 'kitchen', rating: 4.5, popularity: 76 },
    { title: 'Smart Gadgets', items: '22 items', img: '/images/smart_gadgets.png', bgColor: '#EAF0FF', emoji: '⌚', type: 'tech', rating: 4.7, popularity: 87 },
    { title: 'Bluetooth Speakers', items: '19 items', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop&crop=center', bgColor: '#EEF7FF', emoji: '🔊', type: 'tech', rating: 4.6, popularity: 84 },
    { title: 'Gaming Accessories', items: '23 items', img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=200&h=200&fit=crop&crop=center', bgColor: '#F3F3FF', emoji: '🎮', type: 'tech', rating: 4.5, popularity: 80 },
    { title: 'Watches', items: '16 items', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&crop=center', bgColor: '#F3F2FF', emoji: '⌚', type: 'accessories', rating: 4.4, popularity: 73 },
    { title: 'Awards & Trophies', items: '14 items', img: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=200&h=200&fit=crop&crop=center', bgColor: '#FFF8E8', emoji: '🏆', type: 'corporate', rating: 4.5, popularity: 75 },
    { title: 'Premium Pens', items: '26 items', img: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=200&h=200&fit=crop&crop=center', bgColor: '#EFF1FB', emoji: '✒️', type: 'stationery', rating: 4.6, popularity: 79 },
  ];

  // Filter categories
  const filteredCategories = selectedFilter === 'all'
    ? allCategories
    : allCategories.filter(cat => cat.type === selectedFilter);

  // Sort categories
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortBy === 'popularity') return b.popularity - a.popularity;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return 0;
    return 0;
  });

  const categoryDisplay = sortedCategories.slice(0, 20);
  const categoryPageCount = Math.max(1, Math.ceil(categoryDisplay.length / visibleItemsPerPage));

  const handleCategoryScroll = () => {
    const el = categoryRef.current;
    if (!el) return;
    const maxScroll = Math.max(1, el.scrollWidth - el.clientWidth);
    const ratio = el.scrollLeft / maxScroll;
    const page = Math.round(ratio * (categoryPageCount - 1));
    setScrollPage(page);
  };

  useEffect(() => {
    handleCategoryScroll();
  }, [categoryPageCount]);

  const toggleFavorite = (item) => {
    const isFavorite = favorites.some(fav => fav.title === item.title);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.title !== item.title));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const isFavorite = (item) => favorites.some(fav => fav.title === item.title);

  const openQuickView = (item) => {
    setQuickViewItem(item);
    setShowQuickView(true);
  };

  return (
    <div className="scrollable-content no-scrollbar pb-10">
      {/* Page Title */}
      <div className="px-4 pt-6 md:px-14">
        <h1 className="text-2xl font-extrabold text-gray-800">Categories</h1>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <FiSearch size={20} color="#A0A0A0" />
          <input
            type="text"
            className="search-input"
            placeholder="Search for gifts, frames, mugs..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim() && onSearch) {
                onSearch(e.target.value.trim());
              }
            }}
          />
        </div>
      </div>

      {/* Category Grid */}
      <div className="category-scroll-wrapper">
        <div
          className="category-grid"
          ref={categoryRef}
          onScroll={handleCategoryScroll}
        >
          {categoryDisplay.map((item, index) => (
            <div
              key={index}
              className={`grid-item ${selectedCategory === item.title ? 'selected' : ''}`}
              onClick={() => {
                if (setSelectedCategory) {
                  setSelectedCategory(item.title);
                }
                if (onSearch) {
                  onSearch(item.title);
                }
              }}
            >
              <div className="grid-emoji-badge">{item.emoji}</div>
              <div className="grid-image-container" style={{ backgroundColor: item.bgColor }}>
                <img src={item.img} alt={item.title} />
              </div>
              <div className="grid-title">{item.title}</div>
              <div className="grid-subtitle">{item.items}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="dots-container">
        {Array.from({ length: categoryPageCount }, (_, dotIndex) => (
          <div
            key={dotIndex}
            className={dotIndex === scrollPage ? 'dot-active' : 'dot-inactive'}
          />
        ))}
      </div>

      {/* Shop by Occasion */}
      <div className="section-header">
        <h2 className="section-title">Shop by Occasion</h2>
        <button
          className="view-all-btn"
          onClick={() => setExpandOccasions(!expandOccasions)}
        >
          {expandOccasions ? 'Show Less <' : 'View All >'}
        </button>
      </div>

      <div className={`occasions-row no-scrollbar ${expandOccasions ? 'expanded' : ''}`}>
        {[
          { label: 'Birthday', icon: <MdCake size={26} color="#D500F9" />, bgColor: '#F8EEFA' },
          { label: 'Anniversary', icon: (
            <div className="stacked-icon">
              <MdFavoriteBorder className="svg-1" size={15} color="#FF4081" />
              <MdFavoriteBorder className="svg-2" size={15} color="#FF4081" />
            </div>
          ), bgColor: '#FDEEF2' },
          { label: 'Wedding', icon: <span style={{ fontSize: '22px' }}>💍</span>, bgColor: '#FEF6E9' },
          { label: 'Baby Shower', icon: <MdChildFriendly size={26} color="#448AFF" />, bgColor: '#EFF7FE' },
          { label: "Valentine's Day", icon: <MdFavoriteBorder size={26} color="#E91E63" />, bgColor: '#FDEEF2' },
          { label: 'Graduation', icon: <MdSchool size={26} color="#2196F3" />, bgColor: '#EFF3FB' },
          { label: 'Festivals', icon: <span style={{ fontSize: '22px' }}>🎉</span>, bgColor: '#FEF3E8' },
          // Additional occasions
          ...(expandOccasions ? [
            { label: "Mother's Day", icon: <span style={{ fontSize: '28px' }}>👩‍❤️</span>, bgColor: '#FFE0EB' },
            { label: "Father's Day", icon: <span style={{ fontSize: '28px' }}>👨‍❤️</span>, bgColor: '#E3F2FD' },
            { label: 'Friendship Day', icon: <span style={{ fontSize: '28px' }}>🤝</span>, bgColor: '#FFFDE7' },
            { label: 'Housewarming', icon: <span style={{ fontSize: '28px' }}>🏠</span>, bgColor: '#EEF1FC' },
            { label: 'Congratulations', icon: <span style={{ fontSize: '28px' }}>🎊</span>, bgColor: '#F3E5F5' },
            { label: 'Farewell', icon: <span style={{ fontSize: '28px' }}>👋</span>, bgColor: '#FFE0B2' },
            { label: 'Christmas', icon: <span style={{ fontSize: '28px' }}>🎄</span>, bgColor: '#FFEBEE' },
            { label: 'New Year', icon: <span style={{ fontSize: '28px' }}>🎆</span>, bgColor: '#FFF4E0' },
            { label: 'Diwali', icon: <span style={{ fontSize: '28px' }}>🪔</span>, bgColor: '#FFCC80' },
            { label: 'Pongal', icon: <span style={{ fontSize: '28px' }}>☀️</span>, bgColor: '#FFF3E0' },
            { label: 'Eid', icon: <span style={{ fontSize: '28px' }}>🌙</span>, bgColor: '#E0F2F1' },
            { label: 'Holi', icon: <span style={{ fontSize: '28px' }}>🎨</span>, bgColor: '#FFEBEE' },
            { label: 'Retirement', icon: <MdCardGiftcard size={32} color="#0288D1" />, bgColor: '#E1F5FE' },
          ] : [])
        ].map((item, index) => (
          <div key={index} className="occasion-item" onClick={() => {
            if (onSearch) {
              onSearch(item.label);
            }
          }}>
            <div className="occasion-icon-box" style={{ backgroundColor: item.bgColor }}>
              {item.icon}
            </div>
            <div className="occasion-label">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Popular Categories */}
      <div className="section-header">
        <h2 className="section-title">Popular Categories</h2>
        <button className="view-all-btn" onClick={() => setExpandPopular(!expandPopular)}>{expandPopular ? 'Show Less <' : 'View All >'}</button>
      </div>

      <div className="popular-list">
        {[
          { title: 'Personalized Gifts', subtitle: 'Make every moment special\nwith a personal touch.', icon: <MdCardGiftcard size={18} color="#5331E5" />, bgColor: '#F7F7FD', img: '/images/personalized_gifts_1783345971762.png', btnColor: '#5331E5' },
          { title: 'For Her', subtitle: 'Thoughtful gifts that celebrate\nher in the most special way.', icon: <MdFavoriteBorder size={18} color="#FF4081" />, bgColor: '#FDF3F7', img: '/images/for_her_1783345982164.png', btnColor: '#FF4081' },
          { title: 'For Him', subtitle: 'Unique and premium gifts\nhe will absolutely love.', icon: <MdCardGiftcard size={18} color="#448AFF" />, bgColor: '#F2F7FC', img: '/images/for_him_1783345994885.png', btnColor: '#448AFF' },
          { title: 'For Kids', subtitle: 'Fun, adorable and exciting gifts\nfor your little ones.', icon: <MdFace size={18} color="#4CAF50" />, bgColor: '#F3FBF6', img: '/images/for_kids_1783346006058.png', btnColor: '#4CAF50' },
          ...(expandPopular ? [
            { title: 'Gift Hampers', subtitle: 'Beautiful hampers packed with\ndelightful surprises.', icon: <MdCardGiftcard size={18} color="#FF8C42" />, bgColor: '#FEF6E9', img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=260&fit=crop&crop=center', btnColor: '#FF8C42' },
            { title: 'Mobile Accessories', subtitle: 'Latest gadgets and phone\naccessories you need.', icon: <MdCardGiftcard size={18} color="#448AFF" />, bgColor: '#EFF7FE', img: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400&h=260&fit=crop&crop=center', btnColor: '#448AFF' },
            { title: 'Perfumes', subtitle: 'Luxury fragrances that make\na lasting impression.', icon: <MdFavoriteBorder size={18} color="#E91E63" />, bgColor: '#FDF3F7', img: '/images/perfumes.png', btnColor: '#E91E63' },
            { title: 'Wallet', subtitle: 'Stylish and durable wallets\nfor everyday elegance.', icon: <MdCardGiftcard size={18} color="#8B6F47" />, bgColor: '#F2F7FC', img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=260&fit=crop&crop=center', btnColor: '#8B6F47' },
            { title: 'Watches', subtitle: 'Premium timepieces that\nadd sophistication.', icon: <MdCardGiftcard size={18} color="#34495E" />, bgColor: '#EFF3FB', img: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=260&fit=crop&crop=center', btnColor: '#34495E' },
            { title: 'Luxury Gifts', subtitle: 'Exclusive premium gifts for\nthe discerning taste.', icon: <MdCardGiftcard size={18} color="#C9A84C" />, bgColor: '#F3FBF6', img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=260&fit=crop&crop=center', btnColor: '#C9A84C' },
            { title: 'Trending Gifts', subtitle: 'Hot picks and bestsellers\nthat are in demand.', icon: <MdCardGiftcard size={18} color="#FF6B6B" />, bgColor: '#FEF6E9', img: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=260&fit=crop&crop=center', btnColor: '#FF6B6B' },
          ] : []),
        ].map((item, index) => (
          <div key={index} className="popular-card" style={{ backgroundColor: item.bgColor }} onClick={() => {
            if (onSearch) {
              onSearch(item.title);
            }
          }}>
            <div className="popular-info">
              <div>
                <div className="popular-header">
                  <div className="popular-icon">{item.icon}</div>
                  <div className="popular-title">{item.title}</div>
                </div>
                <div className="popular-subtitle" style={{ whiteSpace: 'pre-line' }}>{item.subtitle}</div>
              </div>
              <button className="shop-now-btn" style={{ color: item.btnColor }}>Shop Now &gt;</button>
            </div>
            <div className="popular-image-container">
              <img src={item.img} alt={item.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
