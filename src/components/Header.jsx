import React, { useState, useEffect, useRef } from "react";
import { Menu, Search, Bell, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNotifications } from "../context/NotificationContext";
import SearchOverlay from "./SearchOverlay";
import NotificationDrawer from "./NotificationDrawer";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { unreadCount } = useNotifications();

  const notifBtnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 w-full bg-white ${
          scrolled
            ? "bg-white/85 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[64px] flex items-center justify-between">
          
          {/* Left Side: Mobile Hamburger or Desktop Brand Logo */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-1.5 text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
              <Menu className="w-6 h-6 stroke-[2]" />
            </button>
            
            <div className="hidden lg:flex items-center select-none">
              <LogoSVG />
            </div>
          </div>

          {/* Center: Mobile Brand Logo or Desktop Navigation Links */}
          <div className="flex-1 flex justify-center lg:justify-center">
            {/* Logo on Mobile */}
            <div className="lg:hidden">
              <LogoSVG />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 font-semibold text-[14px] text-grayText">
              <a href="#home" className="text-primary hover:text-primary transition-colors">Home</a>
              <a href="#categories" className="hover:text-primary transition-colors">Categories</a>
              <a href="#gifts" className="hover:text-primary transition-colors">Gifts</a>
              <a href="#orders" className="hover:text-primary transition-colors">Orders</a>
              <a href="#profile" className="hover:text-primary transition-colors">Profile</a>
            </nav>
          </div>

          {/* Right Side: Action Icons */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Open search"
            >
              <Search className="w-[22px] h-[22px] stroke-[2]" />
            </button>

            {/* Notification Button */}
            <div className="relative" ref={notifBtnRef}>
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-[22px] h-[22px] stroke-[2]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#FF4FA3] rounded-full border border-white" />
                )}
              </button>
              {/* Notification Drawer positioned relative to button */}
              <NotificationDrawer
                isOpen={notifOpen}
                onClose={() => setNotifOpen(false)}
              />
            </div>

            {/* Cart Button */}
            <button
              onClick={() => navigate("/cart")}
              className="p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors relative"
              aria-label="Go to cart"
            >
              <ShoppingCart className="w-[22px] h-[22px] stroke-[2]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#FF4FA3] text-white text-[9px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border border-white px-[3px]">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay (portal-like, renders after header) */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

// Brand Logo SVG Helper
function LogoSVG() {
  return (
    <svg
      width="110"
      height="32"
      viewBox="0 0 110 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
    >
      {/* Ribbon Dot of i */}
      <path
        d="M 12 18 C 11.5 16, 9 13, 7 15.5 C 5.5 17.5, 9.5 20, 12 21 C 14.5 20, 18.5 17.5, 17 15.5 C 15 13, 12.5 16, 12 18 Z"
        fill="#FF4FA3"
      />
      <path
        d="M 12 18 C 12 15, 11 11, 14 11 C 16 11, 16 14, 12 18 Z"
        fill="#FF4FA3"
      />
      <path
        d="M 12 18 C 12 15, 13 11, 10 11 C 8 11, 8 14, 12 18 Z"
        fill="#FF4FA3"
      />
      
      {/* iNEX Text */}
      <text
        x="3"
        y="26"
        fontFamily="Poppins"
        fontWeight="800"
        fontSize="18"
        fill="#5B3DF5"
      >
        iNEX
      </text>
      
      {/* Gifts Text */}
      <text
        x="48"
        y="25"
        fontFamily="Arial, sans-serif"
        fontStyle="italic"
        fontWeight="bold"
        fontSize="18"
        fill="#FF4FA3"
        letterSpacing="-0.5"
      >
        Gifts
      </text>
    </svg>
  );
}
