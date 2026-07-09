import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F8F9FC] border-t border-[#EAEAEA] mt-16 sm:mt-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 py-12 md:py-16">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* About Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[14px] font-bold text-textMain tracking-wide uppercase">
              INEX Gifts
            </h3>
            <p className="text-[12px] text-grayText font-semibold leading-relaxed">
              Premium destination for high-quality, personalized gifts. We make gifting seamless, surprise-oriented, and memorable for your loved ones.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[14px] font-bold text-textMain tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="text-[12px] text-grayText font-semibold space-y-2">
              <li><a href="#bestseller" className="hover:text-primary transition-colors">Shop Bestsellers</a></li>
              <li><a href="#categories" className="hover:text-primary transition-colors">Occasion Collection</a></li>
              <li><a href="#promo" className="hover:text-primary transition-colors">Schedule a Surprise</a></li>
              <li><a href="#reviews" className="hover:text-primary transition-colors">Customer Reviews</a></li>
            </ul>
          </div>

          {/* Customer Support Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[14px] font-bold text-textMain tracking-wide uppercase">
              Customer Support
            </h3>
            <ul className="text-[12px] text-grayText font-semibold space-y-2">
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#shipping" className="hover:text-primary transition-colors">Shipping & Delivery</a></li>
              <li><a href="#returns" className="hover:text-primary transition-colors">Returns & Refunds</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Social Icons Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[14px] font-bold text-textMain tracking-wide uppercase">
              Follow Us
            </h3>
            <p className="text-[12px] text-grayText font-semibold">
              Stay updated with our latest custom collections and discounts.
            </p>
            {/* Social Icons row */}
            <div className="flex items-center gap-4.5 mt-1">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-grayText hover:text-[#FF4FA3] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-grayText hover:text-primary transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              {/* Twitter */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-grayText hover:text-primary transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Divider */}
        <div className="border-t border-[#EAEAEA] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-grayText font-semibold">
            &copy; {new Date().getFullYear()} INEX Gifts. All rights reserved.
          </span>
          <div className="flex items-center gap-6 text-[11px] text-grayText font-semibold">
            <a href="#privacy" className="hover:text-primary">Privacy Policy</a>
            <a href="#terms" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
