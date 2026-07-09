import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function ReviewCard({ review }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex-shrink-0 sm:flex-shrink w-[250px] sm:w-full h-[135px] sm:h-[160px] bg-white rounded-card p-4 sm:p-5 border border-[#EAEAEA] shadow-soft flex flex-col justify-between"
    >
      {/* Reviewer Info */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-[#EAEAEA]"
        />
        
        <div className="flex flex-col">
          <h4 className="text-[12px] sm:text-[14px] font-bold text-textMain leading-tight">
            {review.name}
          </h4>
          
          {/* Star Rating */}
          <div className="flex items-center gap-0.5 mt-0.5 sm:mt-1">
            {[...Array(review.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#FBBF24] stroke-[#FBBF24]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Review Comment */}
      <p className="text-[10.5px] sm:text-[12px] text-grayText font-semibold mt-2 leading-relaxed italic line-clamp-3">
        {review.comment}
      </p>
    </motion.div>
  );
}
