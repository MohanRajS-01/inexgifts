import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from "react";

// --------------- State shape ---------------
// cart: [{ id, name, image, price, originalPrice, badge, badgeType, rating, reviewsCount, qty }]

const STORAGE_KEY = "inex_cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // storage full — ignore
  }
}

// --------------- Reducer ---------------
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((i) => i.id === action.product.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.product, qty: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter((i) => i.id !== action.id);
    case "UPDATE_QTY": {
      if (action.qty <= 0) {
        return state.filter((i) => i.id !== action.id);
      }
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: action.qty } : i
      );
    }
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

// --------------- Context ---------------
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart);
  const [toast, setToast] = useState(null); // { id, message }

  // Persist on every change
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addItem = useCallback((product) => {
    dispatch({ type: "ADD_ITEM", product });
    // Show toast
    const toastId = Date.now();
    setToast({ id: toastId, message: "Added to Cart" });
    setTimeout(() => setToast((t) => (t?.id === toastId ? null : t)), 2500);
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: "REMOVE_ITEM", id });
  }, []);

  const updateQty = useCallback((id, qty) => {
    dispatch({ type: "UPDATE_QTY", id, qty });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, cartCount, cartTotal, addItem, removeItem, updateQty, clearCart, toast }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
