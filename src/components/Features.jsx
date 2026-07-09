import React from "react";
import { Award, Shield, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

// Custom delivery scooter icon
const ScooterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#5B3DF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 sm:w-7 sm:h-7 flex-shrink-0">
    <circle cx="5.5" cy="17.5" r="2.5" />
    <circle cx="18.5" cy="17.5" r="2.5" />
    <path d="M5.5 15h11.5" />
    <path d="M8.5 15l2-6h6l1 3" />
    <path d="M18.5 15v-3h-1.5" />
    <path d="M3 10h3" />
    <path d="M4 12.5h1" />
  </svg>
);

const features = [
  {
    id: 1,
    title: "Same Day Delivery",
    icon: <ScooterIcon />,
  },
  {
    id: 2,
    title: "Premium Quality",
    icon: <Award className="w-7 h-7 sm:w-7 sm:h-7 text-[#5B3DF5] stroke-[2]" />,
  },
  {
    id: 3,
    title: "Secure Payment",
    icon: <Shield className="w-7 h-7 sm:w-7 sm:h-7 text-[#5B3DF5] stroke-[2]" />,
  },
  {
    id: 4,
    title: "Easy Returns",
    icon: <RotateCcw className="w-7 h-7 sm:w-7 sm:h-7 text-[#5B3DF5] stroke-[2]" />,
  },
];

export default function Features() {
  return (
    /* Mobile: full-bleed scroll strip with padding so edges never clip */
    <div className="mobile-slider sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
      {features.map((feature) => (
        <motion.div
          key={feature.id}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="mobile-slider-item w-[148px] sm:w-full bg-[#F8F9FC] border border-[#EAEAEA] rounded-[20px] p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:shadow-md transition-all duration-300 min-h-[44px]"
        >
          {/* Feature Icon — larger on mobile */}
          <div className="p-2.5 sm:p-3 bg-[#EEF2FF] rounded-full flex items-center justify-center flex-shrink-0">
            {feature.icon}
          </div>

          {/* Feature Title — larger on mobile */}
          <span className="text-[12px] sm:text-[13px] font-bold text-textMain leading-tight">
            {feature.title}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
