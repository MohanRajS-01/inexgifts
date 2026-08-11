import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const CheckoutModal = ({ isOpen, onClose, onContinue, onViewOrders }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl flex flex-col items-center gap-4 animate-scale-up border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Circular Check Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-1">
          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <FiCheckCircle size={28} strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Order Successfully Received! 🎉
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[280px]">
          Thank you! Your payment screenshot has been verified and your gift order has been placed into our production pipeline.
        </p>

        {/* Verified Badge */}
        <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          Payment Verified & Confirmed
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5 mt-2">
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 text-sm flex items-center justify-center gap-2"
            onClick={onViewOrders || onContinue}
          >
            📦 Go to Order Track Page
          </button>
          <button
            className="w-full bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-700 font-bold py-3.5 px-6 rounded-2xl transition-all text-sm"
            onClick={onContinue}
          >
            🛍️ Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
