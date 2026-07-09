import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNavigation from "../components/BottomNavigation";
import Toast from "../components/Toast";

export default function Cart() {
  const { cart, cartTotal, removeItem, updateQty } = useCart();

  return (
    <div className="w-full min-h-screen bg-white flex flex-col relative pb-[72px] lg:pb-0 text-textMain overflow-x-hidden">
      <Header />
      <Toast />

      <main className="max-w-[1200px] mx-auto w-full px-6 md:px-10 lg:px-12 py-10 flex-1">
        
        {/* Page Title */}
        <div className="cart-page-title-row">
          <Link to="/" className="cart-back-link">
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="cart-page-title">
            Your Cart
            {cart.length > 0 && (
              <span className="cart-page-count">{cart.length} item{cart.length !== 1 ? "s" : ""}</span>
            )}
          </h1>
        </div>

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="cart-layout">
            {/* Item List */}
            <div className="cart-items-panel">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.25 }}
                    className="cart-item"
                  >
                    {/* Product Image */}
                    <div className="cart-item-img-wrap">
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                    </div>

                    {/* Product Info */}
                    <div className="cart-item-info">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-price-line">
                        ₹{item.price}
                        <span className="cart-item-original-price">₹{item.originalPrice}</span>
                      </p>

                      {/* Qty & Remove */}
                      <div className="cart-item-actions">
                        <div className="qty-control">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="qty-btn"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="qty-value">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="qty-btn"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="cart-remove-btn"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="cart-item-subtotal">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="cart-summary-panel">
              <h2 className="cart-summary-title">Order Summary</h2>
              <div className="cart-summary-rows">
                {cart.map((item) => (
                  <div key={item.id} className="cart-summary-row">
                    <span className="cart-summary-row-name">
                      {item.name} × {item.qty}
                    </span>
                    <span>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                  </div>
                ))}
                <div className="cart-summary-divider" />
                <div className="cart-summary-row">
                  <span>Delivery</span>
                  <span className="cart-summary-free">FREE</span>
                </div>
                <div className="cart-summary-total-row">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button className="cart-checkout-btn">
                Proceed to Checkout
              </button>
              <Link to="/" className="cart-continue-link">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
}

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="empty-cart"
    >
      <div className="empty-cart-illustration">
        <ShoppingBag className="empty-cart-bag-icon" />
        <div className="empty-cart-blob" />
      </div>
      <h2 className="empty-cart-heading">Your cart is empty</h2>
      <p className="empty-cart-sub">
        Looks like you haven't added any gifts yet. Start exploring!
      </p>
      <Link to="/" className="empty-cart-cta">
        Browse Gifts
      </Link>
    </motion.div>
  );
}
