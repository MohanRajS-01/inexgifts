import React from 'react';
import { FiCheck } from 'react-icons/fi';

const CheckoutModal = ({ isOpen, onClose, onContinue }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl flex flex-col items-center gap-4 animate-scale-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Purple Circular Icon with White Check */}
                <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-1">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                        <FiCheck size={24} strokeWidth={3} />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                    Checkout Successful
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-[260px]">
                    Thank you for shopping with us!<br />Your order has been placed successfully.
                </p>

                {/* Action Buttons */}
                <div className="w-full flex flex-col gap-2.5 mt-2">
                    <button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md shadow-indigo-200 text-sm"
                        onClick={onContinue}
                    >
                        Continue Shopping
                    </button>
                    <button
                        className="w-full bg-gray-100 hover:bg-gray-200 active:scale-[0.99] text-gray-700 font-bold py-3.5 px-6 rounded-2xl transition-all text-sm"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
