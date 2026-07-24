import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/HomeScreen1";
import MobileBottomNav from "./components/MobileBottom";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search";
import ProductDetails2 from "./pages/ProductDetails/ProductDetails2";
import Categories from "./pages/Categories/Categories";
import MyOrder from "./pages/Orders/MyOrder";
import CartPage from "./pages/Cart/CartPage";
import Wishlist from "./pages/Wishlist/Wishlist";
import Profile from "./pages/Profile/Profile";
import Gift from "./pages/Gift/Gift";
const DEFAULT_CART = [
  {
    id: 'led_lamp',
    title: 'LED Photo Lamp',
    subtitle: 'Personalized with 1 photo',
    image: '/assets/images/products/led_photo_lamp.jpg',
    originalPrice: 1299,
    currentPrice: 999,
    discount: 23,
    quantity: 1,
    optionType: 'Size',
    selectedOption: 'Medium',
    options: ['Medium', 'Small', 'Large']
  },
  {
    id: 'photo_cushion',
    title: 'Photo Cushion',
    subtitle: 'Personalized with 6 photos',
    image: '/assets/cushion.png',
    originalPrice: 599,
    currentPrice: 499,
    discount: 17,
    quantity: 1,
    optionType: 'Size',
    selectedOption: '16 x 16 inch',
    options: ['16 x 16 inch', '12 x 12 inch', '18 x 18 inch']
  }
];

const DEFAULT_WISHLIST = [
  { id: 'collage_frame', title: 'Wooden Collage Photo Frame', price: 749, image: '/assets/images/products/wooden_collage_frame.jpg' },
  { id: 'customized_mug', title: 'Customized Mug', price: 299, image: '/assets/images/products/customized_mug.jpg' },
  { id: 'keychain', title: 'Personalized Keychain', price: 199, image: '/assets/images/products/photo_keychain.jpg' }
];

function App() {
  const [view, setView] = useState('splash');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [previousView, setPreviousView] = useState('home1');
  const [selectedCategory, setSelectedCategory] = useState('Gift Boxes');

  // LocalStorage Backed Cart & Wishlist State
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('inex_cart_items');
      return saved ? JSON.parse(saved) : DEFAULT_CART;
    } catch {
      return DEFAULT_CART;
    }
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('inex_wishlist_items');
      return saved ? JSON.parse(saved) : DEFAULT_WISHLIST;
    } catch {
      return DEFAULT_WISHLIST;
    }
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('inex_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cartItems]);

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

  // Add Product to Cart (Handles both full product object and count number)
  const handleAddToCart = (productOrCount, addQuantity = 1) => {
    if (typeof productOrCount === 'number') {
      // Simple count trigger
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
  const handleToggleWishlist = (productOrIsAdded) => {
    if (typeof productOrIsAdded === 'boolean') {
      return;
    }

    if (!productOrIsAdded) return;

    const product = productOrIsAdded;
    const itemId = String(product.id || product.title || Date.now());
    const itemTitle = product.title || product.name || 'Custom Product';
    const itemPrice = typeof product.price === 'number' ? product.price : parseFloat(String(product.price || '999').replace(/[^0-9.]/g, '')) || 999;
    const itemImage = product.image || '/assets/images/products/wooden_collage_frame.jpg';

    setWishlistItems((prevItems) => {
      const exists = prevItems.some(i => i.id === itemId || i.title === itemTitle);
      if (exists) {
        return prevItems.filter(i => i.id !== itemId && i.title !== itemTitle);
      } else {
        return [...prevItems, {
          id: itemId,
          title: itemTitle,
          price: itemPrice,
          image: itemImage,
          subtitle: product.subtitle || 'Saved Product'
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
            onAddToCart={(addQty = 1) => { handleAddToCart(selectedProduct, addQty); setView('cart'); }}
            onToggleWishlist={() => handleToggleWishlist(selectedProduct)}
            onBack={() => setView(previousView || 'home1')}
            onOpenCart={() => setView('cart')}
            cartCount={cartCount}
          />
        ) : null;
      case 'categories':
        return (
          <Categories
            setView={setView}
            onSearch={handleSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case 'gift':
  return (
    <Gift
      setView={setView}
      onAddToCart={handleAddToCart}
      onAddToWishlist={handleToggleWishlist}
      onOpenProduct={openProduct}
      cartCount={cartCount}
      wishlistCount={wishlistCount}
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
          />
        );
      case 'wishlist':
        return <Wishlist wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} cartItems={cartItems} setCartItems={setCartItems} onAddToCart={handleAddToCart} setView={setView} />;
      case 'orders':
        return <MyOrder />;
      case 'profile':
        return <Profile />;
      case 'home1':
      default:
        return (
          <Home
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleToggleWishlist}
            onSearch={handleSearch}
            onOpenProduct={openProduct}
            setView={setView}
            setSelectedCategory={setSelectedCategory}
          />
        );
    }
  };

  const showNav = !['splash', 'login', 'search'].includes(view);

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
      {showNav && <MobileBottomNav setView={setView} currentView={view} />}
    </div>
  );
}

export default App;
