import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toast } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: -24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.95 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="toast-container"
        >
          <div className="toast-inner">
            <div className="toast-icon-wrap">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <span className="toast-message">{toast.message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
