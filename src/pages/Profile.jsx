import React, { useState } from 'react';

export default function Profile({ setView, wishlist }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="main-content" style={{ paddingBottom: '20px' }}>
      {/* Header */}
      <header className="header" id="profile-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 20px', background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 className="header-title" style={{ fontSize: '18px', fontWeight: 700 }}>My Profile</h1>
        <button className="header-action" id="settings-btn" aria-label="Settings" onClick={() => alert('Settings menu opened!')} style={{ position: 'absolute', right: '16px', width: '38px', height: '38px', borderRadius: '12px', border: '1px solid #E5E7EB', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', cursor: 'pointer' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </header>

      {/* User Card */}
      <div className="user-card" id="user-card" style={{ background: '#FFFFFF', margin: '20px', borderRadius: '20px', padding: '28px 24px', textAlign: 'center', border: '1px solid #E5E7EB', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(135deg, #4F46E5, #7C3AED, #EC4899)', opacity: 0.08 }}></div>
        <div className="avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', position: 'relative', zIndex: 1, boxShadow: '0 4px 16px rgba(79, 70, 229, 0.25)' }}>
          <span className="avatar-initials" style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '1px' }}>U</span>
        </div>
        <div className="user-name" style={{ fontSize: '20px', fontWeight: 700, color: '#1F2937', marginBottom: '4px' }}>User</div>
        <div className="user-email" style={{ fontSize: '13px', color: '#6B7280', marginBottom: '2px' }}>user@email.com</div>
        <div className="user-phone" style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '18px' }}>+91 99999 99999</div>
        <button className="btn-edit-profile" id="edit-profile-btn" onClick={() => alert('Edit Profile clicked')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 24px', borderRadius: '12px', border: '1.5px solid #4F46E5', background: 'transparent', color: '#4F46E5', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Edit Profile
        </button>
      </div>

      {/* Stats Row */}
      <div className="stats-row" id="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', padding: '0 20px', marginBottom: '20px' }}>
        <div className="stat-box" onClick={() => setView('orders')} style={{ background: '#FFFFFF', borderRadius: '16px', padding: '18px 12px', textAlign: 'center', border: '1px solid #E5E7EB', cursor: 'pointer' }}>
          <div className="stat-number" style={{ fontSize: '26px', fontWeight: 800, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, marginBottom: '4px' }}>12</div>
          <div className="stat-label" style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Orders</div>
        </div>
        <div className="stat-box" onClick={() => setView('wishlist')} style={{ background: '#FFFFFF', borderRadius: '16px', padding: '18px 12px', textAlign: 'center', border: '1px solid #E5E7EB', cursor: 'pointer' }}>
          <div className="stat-number" style={{ fontSize: '26px', fontWeight: 800, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, marginBottom: '4px' }}>{wishlist.length}</div>
          <div className="stat-label" style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Wishlist</div>
        </div>
        <div className="stat-box" style={{ background: '#FFFFFF', borderRadius: '16px', padding: '18px 12px', textAlign: 'center', border: '1px solid #E5E7EB' }}>
          <div className="stat-number" style={{ fontSize: '26px', fontWeight: 800, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, marginBottom: '4px' }}>3</div>
          <div className="stat-label" style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Coupons</div>
        </div>
      </div>

      {/* Menu Section 1 */}
      <div className="menu-section" style={{ background: '#FFFFFF', margin: '0 20px 16px', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 18px', borderBottom: '1px solid #F3F4F6', cursor: 'pointer' }} onClick={() => alert('Address manager is coming soon!')}>
          <div className="menu-icon purple" style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#F5F3FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div className="menu-text" style={{ flex: 1 }}>
            <div className="menu-label" style={{ fontSize: '14px', fontWeight: 600 }}>My Addresses</div>
            <div className="menu-subtitle" style={{ fontSize: '12px', color: '#9CA3AF' }}>2 saved addresses</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}><polyline points="9 18 15 12 9 6"/></svg>
        </div>
        <div className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 18px', borderBottom: '1px solid #F3F4F6', cursor: 'pointer' }} onClick={() => alert('Cards manager is coming soon!')}>
          <div className="menu-icon blue" style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          </div>
          <div className="menu-text" style={{ flex: 1 }}>
            <div className="menu-label" style={{ fontSize: '14px', fontWeight: 600 }}>Payment Methods</div>
            <div className="menu-subtitle" style={{ fontSize: '12px', color: '#9CA3AF' }}>1 card saved</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}><polyline points="9 18 15 12 9 6"/></svg>
        </div>
        <div className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 18px' }}>
          <div className="menu-icon amber" style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
          <div className="menu-text" style={{ flex: 1 }}>
            <div className="menu-label" style={{ fontSize: '14px', fontWeight: 600 }}>Notifications</div>
            <div className="menu-subtitle" style={{ fontSize: '12px', color: '#9CA3AF' }}>{notificationsEnabled ? 'Push & email alerts' : 'Alerts disabled'}</div>
          </div>
          <label className="toggle-switch" style={{ position: 'relative', display: 'inline-block', width: '42px', height: '24px', cursor: 'pointer' }}>
            <input type="checkbox" checked={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} style={{ opacity: 0, width: 0, height: 0 }} />
            <span className="toggle-slider" style={{ position: 'absolute', cursor: 'pointer', inset: 0, background: notificationsEnabled ? '#4F46E5' : '#D1D5DB', borderRadius: '24px', transition: 'background 0.3s' }}>
              <span style={{ position: 'absolute', content: '', height: '18px', width: '18px', left: '3px', bottom: '3px', background: 'white', borderRadius: '50%', transform: notificationsEnabled ? 'translateX(18px)' : 'translateX(0)', transition: 'transform 0.3s' }}></span>
            </span>
          </label>
        </div>
      </div>

      {/* Menu Section 2 */}
      <div className="menu-section" style={{ background: '#FFFFFF', margin: '0 20px 16px', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 18px', borderBottom: '1px solid #F3F4F6', cursor: 'pointer' }} onClick={() => setView('wishlist')}>
          <div className="menu-icon rose" style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#FFF1F2', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <div className="menu-text" style={{ flex: 1 }}>
            <div className="menu-label" style={{ fontSize: '14px', fontWeight: 600 }}>My Wishlist</div>
            <div className="menu-subtitle" style={{ fontSize: '12px', color: '#9CA3AF' }}>{wishlist.length} items saved</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}><polyline points="9 18 15 12 9 6"/></svg>
        </div>
        <div className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 18px', borderBottom: '1px solid #F3F4F6', cursor: 'pointer' }} onClick={() => setView('orders')}>
          <div className="menu-icon green" style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <div className="menu-text" style={{ flex: 1 }}>
            <div className="menu-label" style={{ fontSize: '14px', fontWeight: 600 }}>My Orders</div>
            <div className="menu-subtitle" style={{ fontSize: '12px', color: '#9CA3AF' }}>Track & manage orders</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>

      {/* Logout */}
      <div className="logout-section" style={{ padding: '0 20px', marginBottom: '16px' }}>
        <button className="btn-logout" onClick={() => { if (confirm('Are you sure you want to logout?')) setView('home'); }} style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1.5px solid #EF4444', background: 'transparent', color: '#EF4444', fontSize: '15px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </button>
      </div>

      {/* Version */}
      <div className="version-text" style={{ textAlign: 'center', fontSize: '12px', color: '#D1D5DB', padding: '12px 0 24px', fontWeight: 500 }}>Version 2.1.0</div>
    </div>
  );
}
