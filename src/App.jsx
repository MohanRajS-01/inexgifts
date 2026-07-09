import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MobileBottomNav from "./components/MobileBottomNav";

function App() {
  const [cartCount, setCartCount] = useState(2); // Starting with 2 to match previous design
  const [wishlistCount, setWishlistCount] = useState(0);

  const handleAddToCart = () => setCartCount(prev => prev + 1);
  const handleAddToWishlist = (isAdded) => {
    if (isAdded) {
      setWishlistCount(prev => prev + 1);
    } else {
      setWishlistCount(prev => Math.max(0, prev - 1));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-24 md:pb-0">
      <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />
      <Home onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />
      <MobileBottomNav />
    </div>
  );
}

export default App;
