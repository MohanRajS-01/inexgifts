import React from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

const CartTabs = ({ activeTab, onTabChange, cartCount = 0, wishlistCount = 0 }) => {
    return (
        <div className="w-full bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
            <div className="max-w-3xl mx-auto flex">
                <button
                    className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 text-sm sm:text-base font-semibold border-b-2 transition-colors duration-200 ${activeTab === 'cart'
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    onClick={() => onTabChange('cart')}
                >
                    <FiShoppingCart size={16} />
                    <span>My Cart ({cartCount})</span>
                </button>
                <button
                    className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 text-sm sm:text-base font-semibold border-b-2 transition-colors duration-200 ${activeTab === 'wishlist'
                            ? 'border-pink-500 text-pink-500'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    onClick={() => onTabChange('wishlist')}
                >
                    <FiHeart size={16} />
                    <span>Wishlist ({wishlistCount})</span>
                </button>
            </div>
        </div>
    );
};

export default CartTabs;
