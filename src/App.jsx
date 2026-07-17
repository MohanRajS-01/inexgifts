import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/HomeScreen1";
import MobileBottomNav from "./components/MobileBottom";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search";
import ProductDetail from "./pages/ProductDetails/ProductDetail";
import Categories from "./pages/Categories/Categories";
import MyCart from "./pages/Cart/MyCart";
import Wishlist from "./pages/Wishlist/Wishlist";
import MyOrder from "./pages/Orders/MyOrder";
import Profile from "./pages/Profile/Profile";

function App() {
  const [view, setView] = useState('splash');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(2); // Starting with 2 to match previous design
  const [wishlistCount, setWishlistCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => setCartCount(prev => prev + 1);
  const handleAddToWishlist = (isAdded) => {
    if (isAdded) {
      setWishlistCount(prev => prev + 1);
    } else {
      setWishlistCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setView('search');
  };

  const openProduct = (product) => {
    setSelectedProduct(product || null);
    setQty(1);
    setView('product');
  };

  const renderView = () => {
    switch (view) {
      case 'splash':
        return <SplashScreen onComplete={() => setView('login')} />;
      case 'login':
        return <Login setView={setView} />;
      case 'search':
        return (
          <Search 
            setView={setView} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            onOpenProduct={openProduct}
          />
        );
      case 'product':
        return selectedProduct ? (
          <ProductDetail product={selectedProduct} showToast={() => {}} qty={qty} setQty={setQty} onAddToCart={() => { handleAddToCart(); setView('cart'); }} />
        ) : null;
      case 'categories':
        return <Categories />;
      case 'cart':
        return <MyCart />;
      case 'wishlist':
        return <Wishlist />;
      case 'orders':
        return <MyOrder />;
      case 'profile':
        return <Profile />;
      case 'home1':
      default:
        return <Home onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} onSearch={handleSearch} onOpenProduct={openProduct} />;
    }
  };

  const showNav = !['splash', 'login', 'search'].includes(view);

  return (
    <div className={
      view === 'splash' ? 'w-full h-screen overflow-hidden' : 
      'w-full min-h-screen bg-gray-50'
    }>
      {showNav && <Navbar cartCount={cartCount} wishlistCount={wishlistCount} onSearch={handleSearch} setView={setView} />}
      <div className={showNav ? "pb-24 md:pb-0" : ""}>
        {renderView()}
      </div>
      {showNav && <MobileBottomNav setView={setView} currentView={view} />}
    </div>
  );
}

export default App;
