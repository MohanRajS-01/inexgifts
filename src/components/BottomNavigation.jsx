import React, { useState } from "react";
import { Home, LayoutGrid, Gift, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNavigation() {
  const [activeTab, setActiveTab] = useState("home");

  const tabBtn = (id, label, Icon) => (
    <motion.button
      key={id}
      onClick={() => setActiveTab(id)}
      whileTap={{ scale: 0.82 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] py-1 transition-colors ${
        activeTab === id ? "text-[#5B3DF5]" : "text-gray-400"
      }`}
    >
      <Icon className="w-[22px] h-[22px] stroke-[2]" />
      <span className="text-[9px] font-bold mt-1">{label}</span>
    </motion.button>
  );

  return (
    <div
      className="fixed bottom-0 left-0 right-0 w-full h-[72px] bg-white border-t border-[#EAEAEA] z-40 px-4 flex items-center justify-between pb-1.5 lg:hidden"
      style={{ boxShadow: "0 -6px 24px rgba(0,0,0,0.07)" }}
    >
      {tabBtn("home", "Home", Home)}
      {tabBtn("categories", "Categories", LayoutGrid)}

      {/* Center Highlighted Gifts Button */}
      <motion.button
        onClick={() => setActiveTab("gifts")}
        whileTap={{ scale: 0.82 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] relative -mt-6"
      >
        <div className="w-12 h-12 bg-gradient-to-tr from-[#5B3DF5] to-[#8C75FF] rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-500/25 border-4 border-white">
          <Gift className="w-5 h-5 stroke-[2] fill-white/10" />
        </div>
        <span
          className={`text-[9px] font-bold mt-1 transition-colors ${
            activeTab === "gifts" ? "text-[#5B3DF5]" : "text-gray-400"
          }`}
        >
          Gifts
        </span>
      </motion.button>

      {tabBtn("orders", "Orders", ShoppingBag)}
      {tabBtn("profile", "Profile", User)}
    </div>
  );
}
