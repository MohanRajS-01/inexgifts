import React, { useState } from 'react';
import { FiMinus, FiPlus, FiTrash2, FiHeart } from 'react-icons/fi';

const CartItem = ({ item, onQtyChange, onDelete, onWishlistToggle, onOptionChange, isWishlisted }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="relative bg-white rounded-2xl border border-gray-200/80 shadow-sm p-4 sm:p-5 mb-3 sm:mb-4 transition-all duration-200">
            {/* Wishlist Heart Icon — Top-Right Corner */}
            <button
                className={`absolute top-4 right-4 text-gray-400 hover:text-pink-500 transition-colors ${isWishlisted ? 'text-pink-500' : 'text-gray-400'
                    }`}
                onClick={() => onWishlistToggle(item.id)}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
                <FiHeart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-6 sm:pr-8">
                {/* Left Side: Product Image + Info + Controls */}
                <div className="flex gap-3 sm:gap-4 items-start sm:items-center">
                    {/* Product Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-xl flex-shrink-0 bg-gray-50">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200'; }}
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-1.5 min-w-0">
                        {/* Title & Subtitle */}
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">{item.title}</h3>
                            {item.subtitle && <p className="text-xs text-gray-400 truncate mt-0.5">{item.subtitle}</p>}
                        </div>

                        {/* Dropdown Selector */}
                        {item.options && item.options.length > 0 && (
                            <div className="relative inline-block">
                                <button
                                    className="flex items-center gap-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-xl px-3 py-1 hover:bg-gray-50 transition-colors"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span>{item.optionType}: {item.selectedOption}</span>
                                    <span className="text-gray-400 text-[10px] ml-1">▾</span>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 min-w-[130px] overflow-hidden">
                                        {item.options.map((opt) => (
                                            <button
                                                key={opt}
                                                className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${opt === item.selectedOption ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                                onClick={() => { onOptionChange(item.id, opt); setDropdownOpen(false); }}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Quantity Stepper + Delete Button */}
                        <div className="flex items-center gap-3 mt-1">
                            {/* Stepper: [-] 1 [+] */}
                            <div className="flex items-center bg-gray-100 rounded-xl px-2 py-1 gap-2 border border-gray-200/50">
                                <button
                                    className="text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
                                    onClick={() => onQtyChange(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                >
                                    <FiMinus size={12} />
                                </button>
                                <span className="text-xs font-bold text-gray-800 min-w-[16px] text-center">
                                    {item.quantity}
                                </span>
                                <button
                                    className="text-gray-500 hover:text-gray-800 transition-colors"
                                    onClick={() => onQtyChange(item.id, item.quantity + 1)}
                                >
                                    <FiPlus size={12} />
                                </button>
                            </div>

                            {/* Trash Icon */}
                            <button
                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                onClick={() => onDelete(item.id)}
                                title="Remove item"
                            >
                                <FiTrash2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Price Details (Aligned to Bottom-Right) */}
                <div className="flex flex-col items-end justify-end mt-2 sm:mt-auto self-end">
                    <div className="flex items-center gap-1.5 mb-0.5">
                        {item.originalPrice > item.currentPrice && (
                            <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                        )}
                        {item.discount > 0 && (
                            <span className="bg-pink-100 text-pink-600 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                                {item.discount}% OFF
                            </span>
                        )}
                    </div>
                    <span className="text-lg sm:text-xl font-black text-gray-900">
                        ₹{item.currentPrice * item.quantity}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
