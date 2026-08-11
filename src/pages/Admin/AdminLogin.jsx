import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiShield, FiLock, FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

export default function AdminLogin({ setView }) {
  const { loginAdmin } = useAuth();
  const [email, setEmail] = useState('admin@inexgifts.com');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      await loginAdmin(email, password);
      setSuccessMsg('Admin Credentials Authorized! Redirecting to Management Dashboard...');
      setTimeout(() => {
        if (setView) setView('admin');
      }, 700);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid Admin Credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10">
        
        {/* Back link */}
        <button
          type="button"
          onClick={() => setView && setView('home1')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition mb-6"
        >
          <FiArrowLeft className="h-4 w-4" /> Back to Storefront
        </button>

        {/* Header Badge */}
        <div className="flex items-center justify-center mb-4">
          <div className="h-16 w-16 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10">
            <FiShield className="h-8 w-8" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-white tracking-tight">
          Admin Portal
        </h1>
        <p className="text-xs sm:text-sm text-center text-slate-400 mt-1 mb-6">
          Authorized personnel access only for INEX Gifts Management
        </p>

        {/* Error / Success Feedback */}
        {errorMsg && (
          <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-medium text-center">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
            <FiCheckCircle className="h-4 w-4" /> {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FiMail className="h-5 w-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@inexgifts.com"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FiLock className="h-5 w-5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-700/60 text-center">
          <p className="text-[11px] text-slate-400">
            Default Demo Admin: <span className="text-indigo-400 font-mono">admin@inexgifts.com</span> / <span className="text-indigo-400 font-mono">admin123</span>
          </p>
        </div>

      </div>
    </div>
  );
}
