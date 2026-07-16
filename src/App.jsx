import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/HomeScreen1";
import MobileBottomNav from "./components/MobileBottom";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import Login from "./pages/Login/Login";

function App() {
  const [view, setView] = useState('splash');
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
    <div className={
      view === 'splash' ? 'w-full h-screen overflow-hidden' : 
      'w-full min-h-screen bg-gray-50'
    }>
      {view === 'splash' && (
        <SplashScreen onComplete={() => setView('login')} />
      )}
      {view === 'login' && (
        <Login setView={setView} />
      )}
      {view === 'home1' && (
        <div className="min-h-screen flex flex-col bg-gray-50 pb-24 md:pb-0">
          <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />
          <Home onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />
          <MobileBottomNav />
        </div>
      )}
    </div>
  );
}

export default App;

