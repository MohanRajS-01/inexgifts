import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/HomeScreen1";
import MobileBottomNav from "./components/MobileBottom";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search";
import ProductDetails2 from "./pages/ProductDetails/ProductDetails2";
import MyOrder from "./pages/Orders/MyOrder";
import CartPage from "./pages/Cart/CartPage";
import Wishlist from "./pages/Wishlist/Wishlist";
import Profile from "./pages/Profile/Profile";
import Gift from "./pages/Gift/Gift";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { initFirestoreDatabase } from "./services/initFirestore";
import { cartService } from "./services/cartService";

function AppContent() {
  const { currentUser } = useAuth() || {};
  const [view, setView] = useState('splash');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [previousView, setPreviousView] = useState('home1');
  const [selectedCategory, setSelectedCategory] = useState('Gift Boxes');

  // Customer Cart & Wishlist: Real, clean state backed by localStorage & Firestore
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('inex_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('inex_wishlist_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Auto-seed initial Firestore Database collections (users, banners, products) only if empty
  useEffect(() => {
    initFirestoreDatabase();
  }, []);

  // Sync cart from Firestore backend when user logs in
  useEffect(() => {
    if (currentUser?.email) {
      cartService.getCart(currentUser.email).then((remoteCart) => {
        if (Array.isArray(remoteCart) && remoteCart.length > 0) {
          setCartItems(remoteCart);
        }
      });
    }
  }, [currentUser?.email]);

  // Save to localStorage & sync with Firestore backend
  useEffect(() => {
    try {
      localStorage.setItem('inex_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }

    if (currentUser?.email) {
      cartService.saveCart(currentUser.email, cartItems);
    }
  }, [cartItems, currentUser?.email]);

  useEffect(() => {
    try {
      localStorage.setItem('inex_wishlist_items', JSON.stringify(wishlistItems));
    } catch (e) {
      console.error('Error saving wishlist to localStorage', e);
    }
  }, [wishlistItems]);

  // Derived counts
  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const wishlistCount = wishlistItems.length;

  // Add Product to Cart
  const handleAddToCart = (productOrCount, addQuantity = 1) => {
    if (typeof productOrCount === 'number') {
      return;
    }

    if (!productOrCount) return;

    const product = productOrCount;
    const itemId = String(product.id || product.title || Date.now());
    const itemTitle = product.title || product.name || 'Custom Product';
    const itemPrice = typeof product.price === 'number' ? product.price : parseFloat(String(product.price || '999').replace(/[^0-9.]/g, '')) || 999;
    const origPrice = product.originalPrice ? (typeof product.originalPrice === 'number' ? product.originalPrice : parseFloat(String(product.originalPrice).replace(/[^0-9.]/g, ''))) : Math.round(itemPrice * 1.25);
    const itemImage = product.image || '/assets/images/products/led_photo_lamp.jpg';
    const qtyToAdd = product.quantity || addQuantity || 1;

    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(i => i.id === itemId || i.title === itemTitle);
      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + qtyToAdd
        };
        return updated;
      } else {
        const newItem = {
          id: itemId,
          title: itemTitle,
          subtitle: product.subtitle || 'Personalized Gift',
          image: itemImage,
          originalPrice: origPrice,
          currentPrice: itemPrice,
          discount: Math.round(((origPrice - itemPrice) / origPrice) * 100) || 20,
          quantity: qtyToAdd,
          optionType: 'Size',
          selectedOption: 'Standard',
          options: ['Standard', 'Large']
        };
        return [...prevItems, newItem];
      }
    });
  };

  // Toggle Wishlist Product
  const handleToggleWishlist = (product) => {
    if (!product || typeof product !== 'object') return;

    const itemId = String(product.id || '');
    const itemTitle = product.title || product.name || '';
    const rawPrice = product.currentPrice ?? product.price ?? 999;
    const itemPrice = typeof rawPrice === 'number'
      ? rawPrice
      : parseFloat(String(rawPrice).replace(/[^0-9.]/g, '')) || 999;
    const origPrice = product.originalPrice ? (typeof product.originalPrice === 'number' ? product.originalPrice : parseFloat(String(product.originalPrice).replace(/[^0-9.]/g, ''))) : Math.round(itemPrice * 1.25);
    const itemImage = product.image || (Array.isArray(product.images) && product.images[0]) || '/assets/images/products/led_photo_lamp.jpg';

    setWishlistItems((prevItems) => {
      const exists = prevItems.some(i => (itemId && String(i.id) === itemId) || (itemTitle && i.title === itemTitle));
      if (exists) {
        return prevItems.filter(i => !((itemId && String(i.id) === itemId) || (itemTitle && i.title === itemTitle)));
      } else {
        return [...prevItems, {
          id: itemId || String(Date.now()),
          title: itemTitle || 'Custom Product',
          price: itemPrice,
          currentPrice: itemPrice,
          originalPrice: origPrice,
          image: itemImage,
          images: Array.isArray(product.images) && product.images.length > 0 ? product.images : [itemImage],
          subtitle: product.subtitle || product.category || 'Saved Gift'
        }];
      }
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setView('search');
  };

  const openProduct = (product) => {
    setPreviousView(view);
    setSelectedProduct(product || null);
    setQty(1);
    setView('product2');
  };

  const renderView = () => {
    switch (view) {
      case 'splash':
        return <SplashScreen onComplete={() => setView('login')} />;
      case 'login':
        return <Login setView={setView} />;
      case 'admin-login':
        return <AdminLogin setView={setView} />;
      case 'admin':
        return <AdminDashboard setView={setView} />;
      case 'search':
        return (
          <Search
            setView={setView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            onOpenProduct={openProduct}
          />
        );
      case 'product2':
        return selectedProduct ? (
          <ProductDetails2
            product={selectedProduct}
            showToast={() => { }}
            qty={qty}
            setQty={setQty}
            onAddToCart={(itemOrQty = 1) => {
              if (typeof itemOrQty === 'object' && itemOrQty !== null) {
                handleAddToCart(itemOrQty, itemOrQty.quantity || 1);
              } else {
                handleAddToCart(selectedProduct, itemOrQty);
              }
              setView('cart');
            }}
            onToggleWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
            onBack={() => setView(previousView || 'home1')}
            onOpenCart={() => setView('cart')}
            cartCount={cartCount}
          />
        ) : null;
      case 'categories':
      case 'gift':
        return (
          <Gift
            setView={setView}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
            onOpenProduct={openProduct}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            initialCategory={selectedCategory}
          />
        );
      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            setCartItems={setCartItems}
            wishlistItems={wishlistItems}
            setWishlistItems={setWishlistItems}
            onBack={() => setView(previousView || 'home1')}
            setView={setView}
          />
        );
      case 'wishlist':
        return (
          <Wishlist
            wishlistItems={wishlistItems}
            setWishlistItems={setWishlistItems}
            cartItems={cartItems}
            setCartItems={setCartItems}
            onAddToCart={handleAddToCart}
            setView={setView}
          />
        );
      case 'orders':
        return <MyOrder setView={setView} />;
      case 'profile':
        return <Profile setView={setView} wishlistCount={wishlistCount} />;
      case 'home1':
      default:
        return (
          <Home
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
            onSearch={handleSearch}
            onOpenProduct={openProduct}
            setView={setView}
            setSelectedCategory={setSelectedCategory}
          />
        );
    }
  };

  const showNav = !['splash', 'login', 'search', 'admin', 'admin-login'].includes(view);

  return (
    <div className={
      view === 'splash' ? 'w-full h-screen overflow-hidden' :
        'w-full min-h-screen bg-gray-50'
    }>
      {showNav && (
        <div className={view === "gift" ? "hidden md:block" : ""}>
          <Navbar
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            onSearch={handleSearch}
            setView={setView}
          />
        </div>
      )}
      <div className={showNav ? "pb-24 md:pb-0" : ""}>
        {renderView()}
      </div>
      {showNav && <MobileBottomNav setView={setView} currentView={view} wishlistCount={wishlistCount} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
