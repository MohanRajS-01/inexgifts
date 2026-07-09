import React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Components
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import PromoBanner from "../components/PromoBanner";
import ReviewCard from "../components/ReviewCard";
import InstagramGallery from "../components/InstagramGallery";
import Features from "../components/Features";
import Footer from "../components/Footer";
import BottomNavigation from "../components/BottomNavigation";
import Toast from "../components/Toast";

// Data
import { products } from "../data/products";
import { categories } from "../data/categories";
import { reviews } from "../data/reviews";

// WhatsApp Floating Icon SVG
const WhatsAppIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
      fill="currentColor"
    />
  </svg>
);

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col relative pb-[72px] lg:pb-0 text-textMain overflow-x-hidden">
      
      {/* Sticky Header */}
      <Header />
      <Toast />

      {/* Main Content Layout Container */}
      {/*
        Desktop: standard padded container.
        Mobile: px-4 for section headings; sliders break out to full-bleed via
        negative margin + padding technique (handled in .mobile-slider CSS).
      */}
      <main className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-16 space-y-16 sm:space-y-24 flex-1 overflow-x-hidden min-w-0">
        
        {/* 1. Best Seller Section */}
        <section id="bestseller" className="w-full min-w-0">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-[17px] sm:text-[24px] font-bold text-textMain tracking-tight">
              Best Seller
            </h2>
            <button className="min-h-[44px] px-2 text-[12px] sm:text-[14px] font-semibold text-primary flex items-center gap-0.5 hover:underline">
              <span>See All</span>
              <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
            </button>
          </div>
          
          {/* Mobile: scroll-snap strip / Tablet: 3-col grid / Desktop: 4-col grid */}
          <div className="mobile-slider-compact sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:gap-6 items-stretch">
            {products.map((product) => (
              <div key={product.id} className="mobile-slider-item w-[150px] sm:w-full h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* 2. Occasion Collection Section */}
        <section id="categories" className="w-full min-w-0">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-[17px] sm:text-[24px] font-bold text-textMain tracking-tight">
              Occasion Collection
            </h2>
            <button className="min-h-[44px] px-2 text-[12px] sm:text-[14px] font-semibold text-primary flex items-center gap-0.5 hover:underline">
              <span>View All</span>
              <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
            </button>
          </div>
          
          {/* Mobile: scroll-snap strip / Tablet: 3-col grid / Desktop: 5-col grid */}
          <div className="mobile-slider sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:gap-6">
            {categories.map((category) => (
              <div key={category.id} className="mobile-slider-item w-[90px] sm:w-full">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </section>

        {/* 3. Schedule Surprise Promotional Banner */}
        <section id="promo" className="w-full min-w-0">
          <PromoBanner />
        </section>

        {/* 4. What Our Customers Say (Reviews) Section */}
        <section id="reviews" className="w-full min-w-0">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-[17px] sm:text-[24px] font-bold text-textMain tracking-tight">
              What Our Customers Say
            </h2>
            <button className="min-h-[44px] px-2 text-[12px] sm:text-[14px] font-semibold text-primary flex items-center gap-0.5 hover:underline">
              <span>See All</span>
              <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
            </button>
          </div>
          
          {/* Mobile: scroll-snap strip / Tablet: 2-col grid / Desktop: 3-col grid */}
          <div className="mobile-slider sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 items-stretch">
            {reviews.map((review) => (
              <div key={review.id} className="mobile-slider-item w-[270px] sm:w-full h-full">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </section>

        {/* 5. Follow Us On Instagram Section */}
        <section id="instagram" className="w-full min-w-0">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-[17px] sm:text-[24px] font-bold text-textMain tracking-tight">
              Follow Us On Instagram
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-grayText">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF4FA3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span className="text-[11px] sm:text-[13px] font-semibold">@inex.gifts</span>
              </div>
              <button className="min-h-[44px] px-2 text-[12px] sm:text-[14px] font-semibold text-primary flex items-center gap-0.5 hover:underline">
                <span>See More</span>
                <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
          <InstagramGallery />
        </section>

        {/* 6. Features Section */}
        <section id="features" className="w-full border-t border-[#EAEAEA] pt-12 sm:pt-16 min-w-0">
          <Features />
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button — raised above bottom nav on mobile */}
      <motion.a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-[88px] lg:bottom-8 right-5 lg:right-8 z-50 w-[52px] h-[52px] bg-[#25D366] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#20ba59] transition-colors"
        style={{ boxShadow: "0 4px 18px rgba(37, 211, 102, 0.4)" }}
      >
        <WhatsAppIcon />
        <span className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-ping z-[-1]" />
      </motion.a>

      {/* Sticky Mobile Bottom Navigation (lg:hidden) */}
      <BottomNavigation />
    </div>
  );
}
