import React from 'react';
import SearchBar from './SearchBar';

const SVG = {
  back: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
  hamburger: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  search: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  cart: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>,
  chevron: <svg xmlns="http://www.w3.org/2000/svg" className="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
};

export const Header = ({
  searchActive,
  setSearchActive,
  searchQuery,
  setSearchQuery,
  onBackClick,
  onCartClick,
  onProfileClick,
  onHamburgerClick
}) => {
  const handleMobileSearchToggle = () => {
    const nextActive = !searchActive;
    setSearchActive(nextActive);
    if (!nextActive) {
      setSearchQuery('');
    }
  };

  return (
    <header className={`header ${searchActive ? 'search-active' : ''}`}>
      <div className="header-left">
        {/* Back Button (Mobile Only) */}
        <button className="back-btn" onClick={onBackClick} aria-label="Go Back">
          {SVG.back}
        </button>
        {/* Hamburger menu (Mobile/Tablet Only) */}
        <button className="hamburger-menu-btn" id="hamburgerBtn" onClick={onHamburgerClick} aria-label="Toggle Navigation Menu">
          {SVG.hamburger}
        </button>
        <h1 className="header-title">My Orders</h1>
      </div>

      <div className="header-right">
        {/* Search Bar Wrapper */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => {
            setSearchQuery('');
            setSearchActive(false);
          }}
        />

        {/* Search Mobile Button */}
        <button
          className="search-mobile-btn"
          id="searchMobileBtn"
          onClick={handleMobileSearchToggle}
          aria-label="Search Orders"
        >
          {SVG.search}
        </button>

        {/* Shopping Cart Icon */}
        <button className="cart-icon-btn" onClick={onCartClick} aria-label="Shopping Cart">
          {SVG.cart}
          <span className="cart-notification-badge">2</span>
        </button>

        {/* User Profile Details */}
        <div className="profile-dropdown-btn" onClick={onProfileClick}>
          <img src="/assets/images/profile.png" alt="John Doe Profile" className="user-avatar" />
          <span className="username">John Doe</span>
          {SVG.chevron}
        </div>
      </div>
    </header>
  );
};

export default Header;
