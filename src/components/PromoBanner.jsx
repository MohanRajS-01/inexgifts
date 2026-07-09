import React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PromoBanner() {
  return (
    <div className="w-full">
      <div className="w-full rounded-banner bg-gradient-to-r from-[#FFF2F6] via-[#FFF3F8] to-[#F5F2FF] border border-[#FFE3F2] p-6 sm:p-10 lg:p-16 flex items-center justify-between relative overflow-hidden h-[190px] sm:h-[320px] shadow-soft">
        
        {/* Left Side Content */}
        <div className="flex flex-col justify-center h-full z-10 max-w-[58%]">
          {/* Header Tagline */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] sm:text-[14px] font-bold text-textMain tracking-wide">
              Schedule Surprise
            </span>
            <span className="text-xs sm:text-base">🎉</span>
          </div>

          {/* Main Title */}
          <h2 className="text-[22px] sm:text-[34px] lg:text-[42px] font-extrabold text-[#FF4FA3] mt-1 sm:mt-3 leading-tight tracking-tight">
            Book in Advance
          </h2>

          {/* Description */}
          <p className="text-[10.5px] sm:text-[14px] lg:text-[16px] text-[#6B7280] font-semibold mt-1 sm:mt-2 leading-snug">
            Pick a date & time. We'll make it special!
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-between bg-gradient-to-r from-[#FF4FA3] to-[#5B3DF5] text-white text-[11px] sm:text-xs font-bold py-2.5 sm:py-3.5 px-5 sm:px-8 rounded-buttons w-fit shadow-md shadow-pink-500/25 btn-ripple mt-4 sm:mt-6"
          >
            <span>Schedule Now</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 ml-1 stroke-[3]" />
          </motion.button>
        </div>

        {/* Right Side Illustration */}
        <div className="absolute right-3 sm:right-10 lg:right-16 bottom-3 sm:bottom-6 top-3 sm:top-6 w-[40%] sm:w-[35%] flex items-center justify-center">
          <img
            src="/src/assets/promo_banner_illustration.png"
            alt="Schedule Surprise Illustration"
            className="w-full h-full object-contain transform hover:scale-103 transition-transform duration-300 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
