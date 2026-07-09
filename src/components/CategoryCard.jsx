import React from "react";
import { motion } from "framer-motion";

// Responsive custom SVG icons for each category
const CategoryIcon = ({ type }) => {
  const svgClasses = "w-10 h-10 sm:w-13 sm:h-13 flex-shrink-0";
  switch (type) {
    case "Birthday":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={svgClasses}>
          <rect x="8" y="52" width="48" height="4" rx="2" fill="#E9D5FF" />
          <rect x="12" y="38" width="40" height="14" rx="4" fill="#C084FC" />
          <path d="M 12 43 Q 17 46 22 43 T 32 43 T 42 43 T 52 43 L 52 52 L 12 52 Z" fill="#A855F7" opacity="0.3" />
          <rect x="18" y="24" width="28" height="14" rx="4" fill="#F472B6" />
          <path d="M 18 29 Q 22 31 25 29 T 32 29 T 39 29 T 46 29 L 46 38 L 18 38 Z" fill="#EC4899" opacity="0.3" />
          <rect x="24" y="14" width="2" height="10" rx="1" fill="#FBBF24" />
          <path d="M 25 8 C 26 11, 24 13, 25 14 C 26 13, 27 11, 25 8 Z" fill="#F59E0B" />
          
          <rect x="31" y="12" width="2" height="12" rx="1" fill="#FBBF24" />
          <path d="M 32 6 C 33 9, 31 11, 32 12 C 33 11, 34 9, 32 6 Z" fill="#EF4444" />
          
          <rect x="38" y="14" width="2" height="10" rx="1" fill="#FBBF24" />
          <path d="M 39 8 C 40 11, 38 13, 39 14 C 40 13, 41 11, 39 8 Z" fill="#F59E0B" />
        </svg>
      );
    case "Anniversary":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={svgClasses}>
          <path
            d="M 24 12 C 16 12, 14 20, 24 30 C 34 20, 32 12, 24 12 Z"
            fill="#F472B6"
          />
          <path
            d="M 24 12 C 18 12, 16.5 17, 24 25 C 31.5 17, 30 12, 24 12 Z"
            fill="#EC4899"
            opacity="0.5"
          />
          <path
            d="M 40 18 C 32 18, 30 26, 40 36 C 50 26, 48 18, 40 18 Z"
            fill="#EC4899"
          />
          <path
            d="M 40 18 C 34 18, 32.5 22, 40 30 C 47.5 22, 46 18, 40 18 Z"
            fill="#D946EF"
            opacity="0.4"
          />
          <polygon points="24,30 22,33 26,33" fill="#EC4899" />
          <polygon points="40,36 38,39 42,39" fill="#D946EF" />
          
          <path d="M 24 33 Q 28 44, 25 54" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 40 39 Q 34 46, 36 56" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "Wedding":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={svgClasses}>
          <path d="M 18 14 L 20 18 L 24 20 L 20 22 L 18 26 L 16 22 L 12 20 L 16 18 Z" fill="#FBBF24" />
          <path d="M 48 10 L 49.5 13 L 52.5 14 L 49.5 15 L 48 18 L 46.5 15 L 43.5 14 L 46.5 13 Z" fill="#F59E0B" />
          
          <circle cx="25" cy="38" r="16" stroke="#FBBF24" strokeWidth="4" />
          <circle cx="25" cy="38" r="12" stroke="#F59E0B" strokeWidth="1.5" />
          <circle cx="39" cy="38" r="16" stroke="#F59E0B" strokeWidth="4" />
          <circle cx="39" cy="38" r="12" stroke="#D97706" strokeWidth="1.5" />
          
          <polygon points="25,16 29,22 25,26 21,22" fill="#93C5FD" />
          <polygon points="25,16 27,22 25,26 23,22" fill="#E0F2FE" />
        </svg>
      );
    case "Baby Shower":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={svgClasses}>
          <path d="M 32 10 Q 28 14, 28 18 L 36 18 Q 36 14, 32 10 Z" fill="#F59E0B" />
          <rect x="22" y="18" width="20" height="6" rx="2" fill="#60A5FA" />
          <rect x="20" y="24" width="24" height="28" rx="6" fill="#BFDBFE" />
          <rect x="23" y="27" width="18" height="22" rx="3" fill="#EFF6FF" />
          <line x1="26" y1="32" x2="31" y2="32" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="38" x2="33" y2="38" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="44" x2="30" y2="44" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "Corporate":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={svgClasses}>
          <path d="M 24 16 L 24 10 Q 24 8, 26 8 L 38 8 Q 40 8, 40 10 L 40 16 Z" stroke="#3B82F6" strokeWidth="4" fill="none" />
          <rect x="10" y="16" width="44" height="34" rx="6" fill="#3B82F6" />
          <path d="M 10 32 L 54 32 L 54 50 L 10 50 Z" fill="#2563EB" opacity="0.2" />
          <rect x="28" y="28" width="8" height="8" rx="2" fill="#FBBF24" />
          <circle cx="32" cy="32" r="1.5" fill="#1E3A8A" />
          <rect x="18" y="16" width="4" height="34" fill="#1D4ED8" />
          <rect x="42" y="16" width="4" height="34" fill="#1D4ED8" />
        </svg>
      );
    default:
      return null;
  }
};

export default function CategoryCard({ category }) {
  const getGradient = (name) => {
    switch (name) {
      case "Birthday":
        return "bg-gradient-to-b from-[#F5F3FF] to-[#EBE5FF] border border-[#F1EBFF]";
      case "Anniversary":
        return "bg-gradient-to-b from-[#FFF0F6] to-[#FFE3F1] border border-[#FFEBF5]";
      case "Wedding":
        return "bg-gradient-to-b from-[#FFFDF5] to-[#FEF3C7] border border-[#FFF8E1]";
      case "Baby Shower":
        return "bg-gradient-to-b from-[#F4FBF7] to-[#E3F9ED] border border-[#EEFBF3]";
      case "Corporate":
        return "bg-gradient-to-b from-[#F0F7FF] to-[#E0EFFF] border border-[#EDF4FF]";
      default:
        return "bg-gray-50 border border-gray-100";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`flex-shrink-0 sm:flex-shrink w-[84px] sm:w-full ${getGradient(category.name)} p-2.5 sm:p-4 rounded-card flex flex-col items-center justify-between h-[110px] sm:h-[135px] cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.015)] hover:shadow-md transition-all duration-300`}
    >
      {/* Dynamic responsive icon */}
      <div className="flex-grow flex items-center justify-center">
        <CategoryIcon type={category.name} />
      </div>

      {/* Text Info */}
      <div className="text-center mt-1 sm:mt-2">
        <h4 className="text-[11.5px] sm:text-[13px] font-bold text-textMain leading-tight">
          {category.name}
        </h4>
        <span className="text-[9.5px] sm:text-[11px] text-grayText font-medium block mt-0.5">
          {category.subtitle}
        </span>
      </div>
    </motion.div>
  );
}
