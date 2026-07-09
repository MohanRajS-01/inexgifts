import React from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const instagramPosts = [
  { id: 1, image: "/src/assets/instagram_1.png", hasHeart: true, isHeartFilled: false },
  { id: 2, image: "/src/assets/instagram_2.png", hasHeart: false, isHeartFilled: false },
  { id: 3, image: "/src/assets/instagram_3.png", hasHeart: true, isHeartFilled: false },
  { id: 4, image: "/src/assets/instagram_4.png", hasHeart: true, isHeartFilled: false },
  { id: 5, image: "/src/assets/instagram_5.png", hasHeart: true, isHeartFilled: true },
];

export default function InstagramGallery() {
  return (
    /* Mobile: full-bleed scroll strip with padding so edges never clip */
    <div className="mobile-slider sm:grid sm:grid-cols-4 lg:grid-cols-5 sm:gap-6">
      {instagramPosts.map((post, idx) => (
        <motion.div
          key={post.id}
          whileHover={{ scale: 1.02 }}
          className={`mobile-slider-item w-[130px] sm:w-full aspect-square bg-gray-50 rounded-[20px] sm:rounded-[22px] relative overflow-hidden shadow-sm group cursor-pointer border border-[#EAEAEA] ${
            idx === 4 ? "sm:hidden lg:block" : ""
          }`}
        >
          {/* Post Image */}
          <img
            src={post.image}
            alt={`Instagram Post ${post.id}`}
            className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500"
          />

          {/* Semi-transparent Overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Heart overlay */}
          {post.hasHeart && (
            <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5">
              <Heart
                className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] ${
                  post.isHeartFilled
                    ? "fill-[#FF4FA3] stroke-[#FF4FA3]"
                    : "stroke-white fill-none"
                }`}
              />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
