import React, { useState, useMemo } from 'react';

export default function Categories({ setView, cart }) {
  const [searchQuery, setSearchQuery] = useState('');

  const list = [
    { id: 'gift-sets', name: 'Gift Sets', count: '245+ items', img: 'gift_sets.jpg', isProd: false },
    { id: 'mugs', name: 'Mugs', count: '189+ items', img: 'mugs.jpg', isProd: false },
    { id: 'photo-frames', name: 'Photo Frames', count: '156+ items', img: 'photo_frames.jpg', isProd: false },
    { id: 'cushions', name: 'Cushions', count: '134+ items', img: 'cushions.jpg', isProd: false },
    { id: 'chocolates', name: 'Chocolates', count: '178+ items', img: 'chocolates.jpg', isProd: false },
    { id: 'keychains', name: 'Keychains', count: '92+ items', img: 'keychains.jpg', isProd: false },
    { id: 'flowers', name: 'Flowers & Bouquets', count: '120+ items', img: 'flowers_bouquet.jpg', isProd: true },
    { id: 'cards', name: 'Greeting Cards', count: '87+ items', img: 'greeting_card.jpg', isProd: true },
    { id: 'photo-gifts', name: 'Photo Gifts', count: '198+ items', img: 'photo_cushion.jpg', isProd: true },
    { id: 'personalized', name: 'Personalized Gifts', count: '310+ items', img: 'customized_mug.jpg', isProd: true },
    { id: 'premium', name: 'Premium Hampers', count: '76+ items', img: 'premium_gift_set.jpg', isProd: true },
    { id: 'lamps', name: 'Photo Lamps', count: '145+ items', img: 'led_photo_lamp.jpg', isProd: true }
  ];

  const handleCategoryClick = () => {
    setView('gifts');
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(cat => cat.name.toLowerCase().includes(q));
  }, [searchQuery]);

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="main-content" style={{ paddingBottom: '20px' }}>
      {/* Header */}
      <header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#FFFFFF', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #E5E7EB' }}>
        <button className="header-btn" onClick={() => setView('home')} aria-label="Go back" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E5E7EB', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1F2937' }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span className="header-title" style={{ fontSize: '18px', fontWeight: 700 }}>Categories</span>
        <button className="header-btn" aria-label="Cart" onClick={() => setView('cart')} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E5E7EB', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1F2937', position: 'relative' }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/><path d="M1 1h3l2.7 13.4a1 1 0 001 .8h9.7a1 1 0 001-.8L20 6H6"/></svg>
          {cartCount > 0 && <span className="cart-badge" style={{ position: 'absolute', top: '-2px', right: '-2px', background: '#EF4444', color: '#fff', fontSize: '10px', fontWeight: 700, width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
        </button>
      </header>

      {/* Search bar */}
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: '12px', padding: '0 12px', height: '44px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" style={{ marginRight: '8px' }}>
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: '14px' }}
          />
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', padding: '0 16px 20px' }}>
          {filteredCategories.map((cat, idx) => (
            <div 
              key={cat.id} 
              onClick={handleCategoryClick}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #E5E7EB',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                animation: 'fadeInUp 0.4s ease backwards',
                animationDelay: `${idx * 0.05}s`
              }}
              className="scroll-card-category"
            >
              <div style={{ width: '100%', height: '120px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={cat.isProd ? `/assets/images/products/${cat.img}` : `/assets/images/categories/${cat.img}`} 
                  alt={cat.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)' }} />
              </div>
              <div style={{ padding: '12px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937' }}>{cat.name}</h3>
                <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 500 }}>{cat.count}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9CA3AF' }}>
          <p style={{ fontSize: '14px' }}>No categories found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
