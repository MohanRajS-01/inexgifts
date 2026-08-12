import React, { useState, useEffect } from 'react';
import { FiTag, FiEdit2, FiCheckCircle, FiAlertCircle, FiX, FiGift, FiLock } from 'react-icons/fi';
import { couponService } from '../../services/couponService';
import { orderService } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';

const PromoCode = ({ appliedCoupon, onApplyCoupon, onRemoveCoupon, subtotal = 0, onToast }) => {
  const { currentUser } = useAuth() || {};
  const [code, setCode] = useState('');
  const [validating, setValidating] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  // Subscribe to active coupons from Firestore
  useEffect(() => {
    const unsub = couponService.subscribeCoupons((coups) => {
      setAvailableCoupons(coups.filter(c => c.active !== false));
    });
    return () => unsub();
  }, []);

  // Fetch logged-in customer's order history to enforce coupon limits
  useEffect(() => {
    if (currentUser?.email) {
      orderService.getOrders(currentUser.email).then(orders => {
        setUserOrders(orders || []);
      });
    }
  }, [currentUser]);

  const validateAndApply = async (codeToApply) => {
    const trimmed = codeToApply.trim().toUpperCase();
    if (!trimmed) {
      if (onToast) onToast('Please enter a coupon code.');
      return;
    }

    setValidating(true);
    try {
      const foundCoupon = await couponService.validateCoupon(trimmed);
      if (foundCoupon && foundCoupon.active !== false) {
        
        // 1. CHECK IF USER HAS ALREADY USED THIS COUPON CODE BEFORE
        const usedCodes = userOrders
          .map(o => o.appliedCoupon?.code || o.couponCode)
          .filter(Boolean)
          .map(c => c.trim().toUpperCase());

        if (usedCodes.includes(trimmed)) {
          if (onToast) {
            onToast(`⚠️ You have already used coupon '${trimmed}'. Each coupon can be used only once per account.`);
          }
          setValidating(false);
          return;
        }

        // 2. CHECK NEW BUYER COUPON RULE (WELCOME10 / newUsersOnly)
        const isWelcomeCoupon = trimmed.includes('WELCOME') || foundCoupon.newUsersOnly;
        if (isWelcomeCoupon && userOrders.length > 0) {
          if (onToast) {
            onToast(`⚠️ Coupon '${trimmed}' is valid for new buyers on their 1st order only.`);
          }
          setValidating(false);
          return;
        }

        // 3. CHECK MIN ORDER CONDITION
        const minOrder = Number(foundCoupon.minOrder) || 0;
        if (subtotal < minOrder) {
          const needed = minOrder - subtotal;
          if (onToast) {
            onToast(`⚠️ Coupon '${trimmed}' is valid only for orders of min ₹${minOrder}. Add ₹${needed} more to your order!`);
          }
        } else {
          onApplyCoupon(trimmed, foundCoupon.rate, minOrder);
          if (onToast) {
            onToast(`🎉 Coupon '${trimmed}' applied! ${foundCoupon.rate}% OFF discount!`);
          }
          setCode('');
        }
      } else {
        if (onToast) onToast(`Invalid coupon '${trimmed}'. Please check and try again!`);
      }
    } catch (e) {
      if (onToast) onToast('Could not validate coupon. Try again.');
    }
    setValidating(false);
  };

  const handleManualApply = () => {
    validateAndApply(code);
  };

  const usedCodes = userOrders
    .map(o => o.appliedCoupon?.code || o.couponCode)
    .filter(Boolean)
    .map(c => c.trim().toUpperCase());

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-4 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-800 font-extrabold text-sm sm:text-base">
          <FiTag size={18} className="text-indigo-600" />
          <span>Apply Promo Code</span>
        </div>
        {appliedCoupon && (
          <button
            type="button"
            onClick={onRemoveCoupon}
            className="text-xs font-bold text-slate-500 hover:text-red-600 flex items-center gap-1 bg-slate-100 hover:bg-red-50 px-2.5 py-1 rounded-lg transition cursor-pointer"
          >
            <FiEdit2 size={12} /> Edit / Change
          </button>
        )}
      </div>

      {/* Applied Coupon View with Edit Option */}
      {appliedCoupon ? (
        <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between text-sm text-emerald-950 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2.5">
            <FiCheckCircle className="text-emerald-600 shrink-0" size={20} />
            <div>
              <p className="font-extrabold text-emerald-950 leading-tight flex items-center gap-1.5">
                Coupon <span className="font-mono text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">{appliedCoupon.code}</span> Applied!
              </p>
              <p className="text-xs text-emerald-800 font-medium mt-0.5">
                Flat {appliedCoupon.rate}% OFF discount applied on checkout.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onRemoveCoupon}
              title="Edit or Change Coupon"
              className="text-xs font-bold text-indigo-700 bg-white hover:bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl transition flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <FiEdit2 size={12} /> Edit
            </button>
            <button
              type="button"
              onClick={onRemoveCoupon}
              title="Remove Coupon"
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition cursor-pointer"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>
      ) : (
        /* Coupon Input Form & Available Coupons List */
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 text-sm font-mono font-extrabold text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all uppercase"
              type="text"
              placeholder="Enter code (e.g. INEX20)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleManualApply()}
            />
            <button
              className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-50 text-white text-xs sm:text-sm font-extrabold px-4 sm:px-5 py-2.5 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
              onClick={handleManualApply}
              disabled={validating}
            >
              {validating ? 'Applying...' : 'Apply'}
            </button>
          </div>

          {/* Available Coupons Cards List */}
          {availableCoupons.length > 0 && (
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <FiGift className="text-indigo-500" /> Available Store Coupons:
              </p>
              <div className="space-y-2">
                {availableCoupons.map((c) => {
                  const codeClean = c.code.trim().toUpperCase();
                  const isAlreadyUsed = usedCodes.includes(codeClean);
                  const isWelcome = codeClean.includes('WELCOME') || c.newUsersOnly;
                  const isWelcomeBlocked = isWelcome && userOrders.length > 0;
                  const minOrder = Number(c.minOrder) || 0;
                  const isSubtotalEligible = subtotal >= minOrder;
                  const needed = minOrder - subtotal;

                  const canApply = !isAlreadyUsed && !isWelcomeBlocked && isSubtotalEligible;

                  return (
                    <div
                      key={c.code}
                      className={`p-3 rounded-2xl border transition flex items-center justify-between gap-3 ${
                        canApply
                          ? 'bg-slate-50/80 border-slate-200 hover:border-indigo-300'
                          : 'bg-slate-100/60 border-slate-200 opacity-80'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-extrabold text-indigo-700 text-xs sm:text-sm bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                            {c.code}
                          </span>
                          <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                            {c.rate}% OFF
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium truncate">{c.desc}</p>
                        
                        {/* Status Messages */}
                        {isAlreadyUsed ? (
                          <p className="text-[10px] font-extrabold text-slate-500 flex items-center gap-1">
                            <FiLock size={10} /> Already Used (1-time per login)
                          </p>
                        ) : isWelcomeBlocked ? (
                          <p className="text-[10px] font-extrabold text-amber-700 flex items-center gap-1">
                            <FiLock size={10} /> Valid for New Buyers (1st Order Only)
                          </p>
                        ) : minOrder > 0 ? (
                          <p className={`text-[10px] font-bold ${isSubtotalEligible ? 'text-slate-500' : 'text-amber-700'}`}>
                            {isSubtotalEligible
                              ? `✓ Min Order: ₹${minOrder}`
                              : `⚠️ Min Order: ₹${minOrder} (Add ₹${needed} more to qualify)`}
                          </p>
                        ) : null}
                      </div>

                      {canApply ? (
                        <button
                          type="button"
                          onClick={() => validateAndApply(c.code)}
                          disabled={validating}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition shrink-0 cursor-pointer"
                        >
                          Apply
                        </button>
                      ) : isAlreadyUsed ? (
                        <button
                          type="button"
                          onClick={() => onToast && onToast(`⚠️ You have already used coupon '${c.code}'. Each coupon can be used only once per account.`)}
                          className="px-3 py-1.5 bg-slate-200 text-slate-600 font-extrabold text-[11px] rounded-xl border border-slate-300 shrink-0 cursor-pointer"
                        >
                          Used 🔒
                        </button>
                      ) : isWelcomeBlocked ? (
                        <button
                          type="button"
                          onClick={() => onToast && onToast(`⚠️ Coupon '${c.code}' is valid for new buyers on their 1st order only.`)}
                          className="px-3 py-1.5 bg-amber-100 text-amber-900 font-extrabold text-[11px] rounded-xl border border-amber-300 shrink-0 cursor-pointer"
                        >
                          New User Only 🔒
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onToast && onToast(`⚠️ Coupon '${c.code}' is valid for min order of ₹${minOrder}. Add ₹${needed} more to your order!`)}
                          className="px-3 py-1.5 bg-amber-100 text-amber-900 font-extrabold text-[11px] rounded-xl border border-amber-300 shrink-0 cursor-pointer"
                        >
                          Min ₹{minOrder} Req
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromoCode;
