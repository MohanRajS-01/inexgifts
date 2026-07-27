import React from 'react';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';

const WishlistCard = ({ item, onRemoveFromWishlist, onAddToCart, isWishlisted }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden hover:-translate-y-0.5 transition-transform duration-200">
            {/* Image with Heart button top-right */}
            <div className="relative w-full aspect-square overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200'; }}
                />
                {/* Heart button — top-right corner of image */}
                <button
                    className={`absolute top-2 right-2 p-1.5 rounded-full shadow transition-colors ${isWishlisted ? 'bg-pink-500 text-white' : 'bg-white/90 text-gray-500 hover:text-pink-500'}`}
                    onClick={() => onRemoveFromWishlist(item.id)}
                    title="Remove from Wishlist"
                >
                    <FiHeart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1 p-2.5 sm:p-3 flex-1">
                {/* Title */}
                <p className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">{item.title}</p>

                {/* Price + offer — RIGHT side bottom aligned */}
                <div className="flex flex-col items-end mt-auto pt-1">
                    <p className="text-sm sm:text-base font-bold text-indigo-600">₹{item.price}</p>
                    <span className="text-[10px] sm:text-xs text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded-md mt-0.5">
                        In Stock
                    </span>
                </div>

                {/* Add to Cart button */}
                <button
                    className="mt-2 flex items-center justify-center gap-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white text-[11px] sm:text-xs font-semibold py-1.5 sm:py-2 rounded-xl transition-colors w-full"
                    onClick={() => onAddToCart(item)}
                >
                    <FiShoppingCart size={12} />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
};

export default WishlistCard;
