import React from 'react';

const SVG = {
  home: <svg xmlns="http://www.w3.org/2000/svg" className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  categories: <svg xmlns="http://www.w3.org/2000/svg" className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  gifts: <svg xmlns="http://www.w3.org/2000/svg" className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>,
  orders: <svg xmlns="http://www.w3.org/2000/svg" className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>,
  profile: <svg xmlns="http://www.w3.org/2000/svg" className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
};

export const BottomNavigation = ({ activeTab = 'Orders', onNavClick }) => {
  const items = [
    { id: 'home', label: 'Home', icon: SVG.home },
    { id: 'categories', label: 'Categories', icon: SVG.categories },
    { id: 'gifts', label: 'Gifts', icon: SVG.gifts, isGift: true },
    { id: 'orders', label: 'Orders', icon: SVG.orders },
    { id: 'profile', label: 'Profile', icon: SVG.profile }
  ];

  return (
    <nav className="bottom-nav">
      {items.map((item) => {
        const isActive = activeTab.toLowerCase() === item.label.toLowerCase();
        
        if (item.isGift) {
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="bottom-nav-item gift-item"
              onClick={(e) => {
                e.preventDefault();
                onNavClick(item.label);
              }}
            >
              <div className="elevated-gift-btn">
                {item.icon}
              </div>
              <span className="bottom-nav-label">{item.label}</span>
            </a>
          );
        }

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onNavClick(item.label);
            }}
          >
            {item.icon}
            <span className="bottom-nav-label">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
