import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiShoppingBag, 
  FiHeart, 
  FiMapPin, 
  FiShield, 
  FiLogOut, 
  FiChevronRight,
  FiArrowLeft,
  FiHelpCircle
} from 'react-icons/fi';

export default function Profile({ setView, wishlistCount = 0 }) {
  const { currentUser, isAdmin, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    if (setView) setView('login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView && setView('home1')}
            className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">My Account</h1>
            <p className="text-[11px] text-slate-500 font-medium">Manage profile, orders & settings</p>
          </div>
        </div>

        {isAdmin ? (
          <button
            onClick={() => setView && setView('admin')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-bold shadow-md shadow-indigo-600/20 transition"
          >
            <FiShield className="h-4 w-4" /> Admin Portal
          </button>
        ) : (
          <button
            onClick={() => setView && setView('admin-login')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-slate-200 rounded-full text-xs font-semibold transition"
          >
            <FiShield className="h-3.5 w-3.5 text-indigo-400" /> Admin Login
          </button>
        )}
      </header>

      {/* Main Container */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Profile Card */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-44 h-44 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="h-16 w-16 sm:h-20 sm:w-20 bg-white/20 border-2 border-white/40 rounded-full flex items-center justify-center text-white text-2xl font-extrabold shadow-inner shrink-0">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-2xl font-extrabold text-white leading-tight">
                  {currentUser?.name || 'Guest User'}
                </h2>
                {isAdmin && (
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                    Admin
                  </span>
                )}
              </div>

              <p className="text-xs text-indigo-100 flex items-center gap-1.5">
                <FiMail className="h-3.5 w-3.5" /> {currentUser?.email || 'user@example.com'}
              </p>

              {currentUser?.phone && (
                <p className="text-xs text-indigo-100 flex items-center gap-1.5">
                  <FiPhone className="h-3.5 w-3.5" /> +91 {currentUser.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div
            onClick={() => setView && setView('orders')}
            className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-xl font-bold">
                <FiShoppingBag />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition">My Orders</h3>
                <p className="text-xs text-slate-500">Track current & past gift orders</p>
              </div>
            </div>
            <FiChevronRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>

          <div
            onClick={() => setView && setView('wishlist')}
            className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center text-xl font-bold">
                <FiHeart />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition">My Wishlist</h3>
                <p className="text-xs text-slate-500">Saved favorite gifts</p>
              </div>
            </div>
            <FiChevronRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>

          <div
            onClick={() => setView && setView('cart')}
            className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl font-bold">
                <FiMapPin />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition">Saved Addresses</h3>
                <p className="text-xs text-slate-500">Manage delivery locations</p>
              </div>
            </div>
            <FiChevronRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>

          <div
            onClick={() => setView && setView('admin-login')}
            className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-xl font-bold">
                <FiShield />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition">Admin Dashboard</h3>
                <p className="text-xs text-slate-500">Manage store banners & orders</p>
              </div>
            </div>
            <FiChevronRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>

        </div>

        {/* Customer Support & Info */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900">Need Assistance?</h3>
          
          <div className="flex items-center justify-between text-xs text-slate-600 py-1">
            <span className="flex items-center gap-2 font-medium">
              <FiHelpCircle className="h-4 w-4 text-indigo-600" /> WhatsApp Support (24x7)
            </span>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="text-emerald-600 font-bold hover:underline">
              Chat Now
            </a>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 py-1 border-t border-slate-100">
            <span className="font-medium">App Version</span>
            <span className="text-slate-400 font-mono">v2.4.0 (Firebase Enabled)</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-3xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-sm"
        >
          <FiLogOut className="h-4 w-4" /> Log Out of Account
        </button>

      </main>

    </div>
  );
}
