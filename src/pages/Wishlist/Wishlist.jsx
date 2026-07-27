import React from 'react';
import CartPage from '../Cart/CartPage';

export default function Wishlist({ wishlistItems, setWishlistItems, cartItems, setCartItems, onAddToCart, setView }) {
  return (
    <CartPage
      initialTab="wishlist"
      cartItems={cartItems}
      setCartItems={setCartItems}
      wishlistItems={wishlistItems}
      setWishlistItems={setWishlistItems}
      onBack={() => setView('home1')}
    />
  );
}
