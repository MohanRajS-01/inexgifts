import React, { useState } from "react";
import { Heart, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();

  const isBestseller = product.badgeType === "bestseller";
  const badgeBg = isBestseller ? "bg-[#FF4FA3]" : "bg-[#FF9F29]";

  const handleAdd = () => {
    if (adding) return;
    setAdding(true);
    addItem(product);
    setTimeout(() => setAdding(false), 500);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="flex-shrink-0 sm:flex-shrink w-full sm:w-full bg-white rounded-card overflow-hidden border border-[#EAEAEA] shadow-soft relative flex flex-col justify-between h-full"
    >
      {/* Product Image Section */}
      <div className="relative h-[140px] sm:h-[220px] bg-gray-50 overflow-hidden group flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-500 rounded-t-card"
        />

        {/* Popularity Badge */}
        <span
          className={`absolute top-3 left-3 text-[9px] sm:text-[10px] font-bold text-white px-2.5 py-0.5 rounded-full ${badgeBg}`}
        >
          {product.badge}
        </span>

        {/* Wishlist Heart Button */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 p-1.5 sm:p-2 rounded-full bg-black/10 backdrop-blur-[2px] transition-colors hover:bg-black/20 text-white"
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
              liked ? "fill-[#FF4FA3] stroke-[#FF4FA3]" : "stroke-white"
            }`}
          />
        </button>
      </div>

      {/* Product Content Details (fills vertical space to align pricing) */}
      <div className="p-3 sm:p-4.5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-[12px] sm:text-[14px] font-bold text-textMain line-clamp-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-[11px] text-grayText font-semibold">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#FBBF24] stroke-[#FBBF24]" />
            <span className="font-bold text-textMain">{product.rating}</span>
            <span>({product.reviewsCount})</span>
          </div>
        </div>

        {/* Pricing & Add Button */}
        <div className="flex items-end justify-between mt-3">
          <div className="flex flex-col">
            <span className="text-[14px] sm:text-[16px] font-extrabold text-textMain">
              ₹{product.price}
            </span>
            <span className="text-[10.5px] sm:text-[12px] text-grayText line-through font-semibold">
              ₹{product.originalPrice}
            </span>
          </div>

          {/* Floating Action Add Button */}
          <motion.button
            onClick={handleAdd}
            animate={adding ? { scale: [1, 1.3, 0.9, 1] } : { scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#5B3DF5] flex items-center justify-center text-white shadow-md hover:bg-[#482ee0] transition-colors btn-ripple"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[3]" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
