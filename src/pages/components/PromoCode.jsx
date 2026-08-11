import React, { useState } from 'react';
import { FiTag } from 'react-icons/fi';
import { couponService } from '../../services/couponService';

const PromoCode = ({ appliedCoupon, onApplyCoupon, onToast }) => {
  const [code, setCode] = useState('');
  const [validating, setValidating] = useState(false);

  const handleApply = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) { onToast('Please enter a coupon code.'); return; }
    if (appliedCoupon) { onToast(`Coupon ${appliedCoupon.code} is already applied.`); return; }

    setValidating(true);
    try {
      const foundCoupon = await couponService.validateCoupon(trimmed);
      if (foundCoupon && foundCoupon.active) {
        onApplyCoupon(trimmed, foundCoupon.rate);
        onToast(`Coupon ${trimmed} applied! ${foundCoupon.rate}% OFF 🎉`);
        setCode('');
      } else {
        onToast(`Invalid coupon '${trimmed}'. Please check and try again!`);
      }
    } catch (e) {
      onToast('Could not validate coupon. Try again.');
    }
    setValidating(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-3 sm:mb-4">
      <div className="flex items-center gap-2 mb-3 text-gray-700 font-semibold text-sm sm:text-base">
        <FiTag size={16} className="text-indigo-500" />
        <span>Promo Code</span>
      </div>
      {appliedCoupon ? (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 sm:px-4 py-2.5 text-sm text-green-700 font-medium">
          🎉 <strong>{appliedCoupon.code}</strong> — {appliedCoupon.rate}% discount applied!
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-base text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-mono font-bold uppercase"
            type="text"
            placeholder="Enter coupon code (e.g. INEX20)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleApply()}
          />
          <button
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm sm:text-base font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition-colors flex-shrink-0"
            onClick={handleApply}
            disabled={validating}
          >
            {validating ? 'Applying...' : 'Apply'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PromoCode;
