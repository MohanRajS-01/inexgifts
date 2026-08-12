import React, { useState, useEffect } from 'react';
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
  FiHelpCircle,
  FiLock,
  FiSave,
  FiCheckCircle,
  FiEdit3,
  FiX
} from 'react-icons/fi';

export default function Profile({ setView, wishlistCount = 0 }) {
  const { currentUser, isAdmin, logout, updateUserProfile } = useAuth();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: ''
  });

  const [feedback, setFeedback] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        pincode: currentUser.pincode || ''
      });
    }
  }, [currentUser]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    setSaving(true);
    try {
      if (updateUserProfile) {
        await updateUserProfile({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          pincode: formData.pincode.trim()
        });
      }
      setIsEditModalOpen(false);
      setFeedback("✨ Profile details & delivery address updated in Cloud Firestore!");
      setTimeout(() => setFeedback(null), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

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

      </header>

      {/* Toast Notification */}
      {feedback && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-500 animate-bounce">
          <FiCheckCircle className="h-4 w-4 shrink-0" /> {feedback}
        </div>
      )}

      {/* Main Container */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Profile Banner Card with Pencil Edit Icon */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex items-center justify-between gap-4">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-44 h-44 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

          <div className="flex items-center gap-4 relative z-10 min-w-0">
            <div className="h-16 w-16 sm:h-20 sm:w-20 bg-white/20 border-2 border-white/40 rounded-full flex items-center justify-center text-white text-2xl font-extrabold shadow-inner shrink-0">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-2xl font-extrabold text-white leading-tight truncate">
                  {currentUser?.name || 'Guest User'}
                </h2>
                {isAdmin && (
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow shrink-0">
                    Admin
                  </span>
                )}
              </div>

              <p className="text-xs text-indigo-100 flex items-center gap-1.5 truncate">
                <FiMail className="h-3.5 w-3.5 shrink-0" /> {currentUser?.email || 'user@example.com'}
              </p>

              {currentUser?.phone && (
                <p className="text-xs text-indigo-100 flex items-center gap-1.5">
                  <FiPhone className="h-3.5 w-3.5 shrink-0" /> +91 {currentUser.phone}
                </p>
              )}

              {currentUser?.address && (
                <p className="text-[11px] text-indigo-200 flex items-center gap-1.5 truncate pt-0.5">
                  <FiMapPin className="h-3 w-3 shrink-0" /> {(currentUser.address || '').replace(/,\s*Chennai\s*$/i, '')} {currentUser.pincode && `(${currentUser.pincode})`}
                </p>
              )}
            </div>
          </div>

          {/* Pencil Edit Icon Button */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            title="Edit Profile Details & Address"
            className="relative z-10 p-3 sm:px-4 sm:py-2.5 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-2xl shadow-lg backdrop-blur-md transition flex items-center gap-2 font-bold text-xs cursor-pointer group shrink-0"
          >
            <FiEdit3 className="h-4 w-4 text-amber-300 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Edit Profile</span>
          </button>
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
            onClick={() => setIsEditModalOpen(true)}
            className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl font-bold">
                <FiMapPin />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition">Saved Delivery Address</h3>
                <p className="text-xs text-slate-500">Click pencil icon to edit delivery address</p>
              </div>
            </div>
            <FiEdit3 className="h-5 w-5 text-indigo-500 group-hover:scale-110 transition-transform" />
          </div>

          {isAdmin && (
            <div
              onClick={() => setView && setView('admin')}
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
          )}

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

      {/* Edit Profile Modal (Opened by Pencil Icon Button) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 border border-slate-200 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <FiEdit3 className="text-indigo-600" /> Edit Profile & Address
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Update your account name, mobile number, and default delivery address.</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name (Editable) */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold rounded-2xl pl-10 pr-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Email Address (READ-ONLY / DISABLED) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <span className="text-[10px] text-amber-600 font-extrabold flex items-center gap-1">
                      <FiLock className="h-3 w-3" /> Email Locked
                    </span>
                  </div>
                  <div className="relative">
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      readOnly
                      title="Email address cannot be changed for security reasons"
                      className="w-full bg-slate-100 border border-slate-200 text-slate-500 text-xs font-mono font-bold rounded-2xl pl-10 pr-4 py-3 cursor-not-allowed select-none opacity-80"
                    />
                  </div>
                </div>

                {/* Phone Number (Editable) */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Phone Number</label>
                  <div className="relative">
                    <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold rounded-2xl pl-10 pr-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Pincode (Editable) */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Delivery Pincode</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="6-digit delivery pincode"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono font-bold rounded-2xl pl-10 pr-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Street Address (Editable) */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Delivery Address (Door No, Street, Landmark)</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter complete delivery address for gift orders..."
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-2xl p-3.5 outline-none focus:border-indigo-500 focus:bg-white transition resize-none"
                />
              </div>

              {/* Save / Cancel Buttons */}
              <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <FiSave className="h-4 w-4" />
                  <span>{saving ? 'Saving...' : 'Save Profile Changes ✓'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
