import { FiSearch, FiHeart, FiBell, FiShoppingCart, FiMenu, FiX, FiGift, FiShoppingBag, FiShield, FiUser } from 'react-icons/fi';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ cartCount = 0, wishlistCount = 0, setView, onSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const { currentUser, isAdmin } = useAuth() || {};

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      if (onSearch) onSearch(searchVal.trim());
      if (setView) setView('search');
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center gap-4">

          {/* Logo */}
          <div 
            onClick={() => setView && setView('home1')} 
            className="flex-shrink-0 flex items-center cursor-pointer select-none group"
          >
            <span className="text-xl sm:text-2xl font-extrabold text-indigo-600 tracking-tight group-hover:opacity-90 transition">
              INEX<span className="text-pink-500 text-xs sm:text-sm align-top italic ml-1 font-serif">Gifts</span>
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FiSearch className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="block w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-full leading-5 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all shadow-inner"
                placeholder="Search for gifts, photo frames, hampers..."
              />
            </div>
          </form>

          {/* Right Side Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            
            {/* Admin Quick Link */}
            {isAdmin && (
              <button 
                onClick={() => setView && setView('admin')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-bold transition shadow-sm"
              >
                <FiShield className="h-4 w-4" /> Admin
              </button>
            )}

            <button 
              onClick={() => setView && setView('gift')}
              className="flex flex-col items-center justify-center w-14 lg:w-16 py-1 text-slate-600 hover:text-indigo-600 transition-colors relative group"
            >
              <FiGift className="h-5 w-5 lg:h-6 lg:w-6 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] lg:text-xs mt-1 font-semibold">Gifts</span>
            </button>

            <button 
              onClick={() => setView && setView('orders')}
              className="flex flex-col items-center justify-center w-14 lg:w-16 py-1 text-slate-600 hover:text-indigo-600 transition-colors relative group"
            >
              <FiShoppingBag className="h-5 w-5 lg:h-6 lg:w-6 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] lg:text-xs mt-1 font-semibold">Orders</span>
            </button>

            <button 
              onClick={() => setView && setView('wishlist')}
              className="flex flex-col items-center justify-center w-14 lg:w-16 py-1 text-slate-600 hover:text-indigo-600 transition-colors relative group"
            >
              <div className="relative">
                <FiHeart className="h-5 w-5 lg:h-6 lg:w-6 group-hover:scale-110 transition-transform" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white shadow">{wishlistCount}</span>
                )}
              </div>
              <span className="text-[10px] lg:text-xs mt-1 font-semibold">Wishlist</span>
            </button>

            <button 
              onClick={() => setView && setView('cart')}
              className="flex flex-col items-center justify-center w-14 lg:w-16 py-1 text-slate-600 hover:text-indigo-600 transition-colors relative group"
            >
              <div className="relative">
                <FiShoppingCart className="h-5 w-5 lg:h-6 lg:w-6 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow">{cartCount}</span>
                )}
              </div>
              <span className="text-[10px] lg:text-xs mt-1 font-semibold">Cart</span>
            </button>

            {/* Profile Dropdown / Login Link */}
            <div 
              onClick={() => setView && setView(currentUser ? 'profile' : 'login')}
              className="flex items-center ml-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-all cursor-pointer select-none"
            >
              <div className="h-8 w-8 rounded-full bg-indigo-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : <FiUser className="h-4 w-4" />}
              </div>
              <div className="ml-2.5 flex flex-col">
                <span className="text-[10px] text-slate-400 font-medium leading-tight">
                  {currentUser ? 'Welcome' : 'Account'}
                </span>
                <span className="text-xs font-extrabold text-slate-800 leading-tight truncate max-w-[100px]">
                  {currentUser?.name || 'Sign In'}
                </span>
              </div>
            </div>

          </div>

          {/* Mobile icons & menu button */}
          <div className="flex items-center md:hidden space-x-3">
            <button 
              onClick={() => setView && setView('wishlist')}
              className="p-1.5 text-slate-700 hover:text-indigo-600 relative"
            >
              <FiHeart className="h-6 w-6 stroke-[2]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[9px] font-bold text-white">{wishlistCount}</span>
              )}
            </button>
            
            <button 
              onClick={() => setView && setView('cart')}
              className="p-1.5 text-slate-700 hover:text-indigo-600 relative"
            >
              <FiShoppingCart className="h-6 w-6 stroke-[2]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white">{cartCount}</span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-4 space-y-2 shadow-lg">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <FiSearch className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-full bg-slate-50 text-slate-800 text-xs outline-none focus:border-indigo-500"
              placeholder="Search gifts..."
            />
          </form>

          <button 
            onClick={() => { setView && setView('home1'); setMobileMenuOpen(false); }} 
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            Home
          </button>
          <button 
            onClick={() => { setView && setView('categories'); setMobileMenuOpen(false); }} 
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            Categories
          </button>
          <button 
            onClick={() => { setView && setView('gift'); setMobileMenuOpen(false); }} 
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            Gifts Catalog
          </button>
          <button 
            onClick={() => { setView && setView('orders'); setMobileMenuOpen(false); }} 
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            My Orders
          </button>
          <button 
            onClick={() => { setView && setView('profile'); setMobileMenuOpen(false); }} 
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            My Profile
          </button>
          {isAdmin && (
            <button 
              onClick={() => { setView && setView('admin'); setMobileMenuOpen(false); }} 
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-indigo-600 bg-indigo-50"
            >
              🛡️ Admin Dashboard
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
