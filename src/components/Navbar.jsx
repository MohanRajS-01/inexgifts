import { FiSearch, FiHeart, FiBell, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = ({ cartCount = 0, wishlistCount = 0, onSearch, setView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch && searchVal.trim()) {
      onSearch(searchVal.trim());
    }
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setView && setView('home1')}>
            <span className="text-xl font-bold text-primary tracking-tight">
              INEX<span className="text-pink-500 text-xs align-top italic ml-1">Gifts</span>
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out"
                placeholder="Search for gifts, frames, banners..."
              />
            </div>
          </form>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors relative" onClick={() => setView && setView('wishlist')}>
              <div className="relative">
                <FiHeart className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] text-white">{wishlistCount}</span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium">Wishlist</span>
            </button>
            <button className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors relative">
              <div className="relative">
                <FiBell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] text-white">2</span>
              </div>
              <span className="text-[10px] mt-1 font-medium">Notifications</span>
            </button>
            <button className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors relative" onClick={() => setView && setView('cart')}>
              <div className="relative">
                <FiShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] text-white">{cartCount}</span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium">Cart</span>
            </button>
            <div className="flex items-center ml-4 cursor-pointer hover:opacity-80" onClick={() => setView && setView('profile')}>
              <div className="h-9 w-9 rounded-full bg-gray-200 overflow-hidden border border-gray-300 flex items-center justify-center text-gray-500">
                U
               </div>
              <div className="ml-2 flex flex-col">
                <span className="text-xs text-gray-500 leading-tight">Hello, Priya</span>
                <span className="text-sm font-semibold text-gray-800 leading-tight">My Account ▾</span>
              </div>
            </div>
          </div>

          {/* Mobile icons & menu button */}
          <div className="flex items-center md:hidden space-x-4">
            <button className="text-[#3b3559] hover:text-primary transition-colors relative" onClick={() => setView && setView('wishlist')}>
              <FiHeart className="h-[22px] w-[22px] stroke-[2]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#de4b83] text-[9px] font-bold text-white">{wishlistCount}</span>
              )}
            </button>
            <button className="text-[#3b3559] hover:text-primary transition-colors relative">
              <FiBell className="h-[22px] w-[22px] stroke-[2]" />
              <span className="absolute top-0 right-0.5 h-1.5 w-1.5 rounded-full bg-[#de4b83]"></span>
            </button>
            <button className="text-[#3b3559] hover:text-primary transition-colors relative" onClick={() => setView && setView('cart')}>
              <FiShoppingCart className="h-[22px] w-[22px] stroke-[2]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#de4b83] text-[9px] font-bold text-white">{cartCount}</span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-1 ml-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-4 pt-4 pb-3 space-y-1">
             <form onSubmit={handleSearchSubmit} className="relative w-full mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                placeholder="Search..."
              />
            </form>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" onClick={(e) => { e.preventDefault(); setView && setView('home1'); }}>Home</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" onClick={(e) => { e.preventDefault(); setView && setView('categories'); }}>Categories</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" onClick={(e) => { e.preventDefault(); setView && setView('gift'); }}>Gifts</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" onClick={(e) => { e.preventDefault(); setView && setView('orders'); }}>Orders</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" onClick={(e) => { e.preventDefault(); setView && setView('profile'); }}>Profile</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
