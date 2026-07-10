import React from 'react';

const SVG = {
  search: <svg xmlns="http://www.w3.org/2000/svg" className="search-bar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
};

export const SearchBar = ({ value, onChange, onClear }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && onClear) {
      onClear();
    }
  };

  return (
    <div className="search-bar-wrapper" id="searchBarWrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Search orders, items..."
        aria-label="Search orders"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {SVG.search}
    </div>
  );
};

export default SearchBar;
