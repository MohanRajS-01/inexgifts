import { useEffect, useRef, useState, useMemo } from 'react';
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Gift,
  Sun,
  Leaf,
  ShieldCheck,
  Shield,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Usb,
} from 'lucide-react';
import '../../style.css';
import ProductDetail from './ProductDetail';
import { reviewService } from '../../services/reviewService';

const tabs = [
  { id: 'features-section', label: 'Features' },
  { id: 'details-section', label: 'Product Details' },
  { id: 'reviews-section', label: 'Reviews (320)' },
  { id: 'similar-section', label: 'Similar Products' },
];

const heroImages = [
  {
    src: '/assets/lamp_heart_couple.png',
    alt: 'LED Photo Lamp - Couple View',
  },
  {
    src: '/assets/lamp_heart_text.png',
    alt: 'LED Photo Lamp - Text View',
  },
  {
    src: '/assets/lamp_portrait.png',
    alt: 'LED Photo Lamp - Portrait View',
  },
  {
    src: '/assets/lamp_heart_couple.png',
    alt: 'LED Photo Lamp - Warm Glow View',
  },
];

const getDynamicSpecsAndFeatures = (product) => {
  const cat = (product?.category || '').toLowerCase();
  const title = (product?.title || '').toLowerCase();
  const customMat = product?.material || '';
  const customPkg = product?.packageIncludes || '';

  let col1 = [];
  let col2 = [];

  if (cat.includes('frame') || title.includes('frame') || title.includes('collage')) {
    col1 = [
      { label: 'Material', value: customMat || 'Solid Hardwood & Premium Glass' },
      { label: 'Photo Size', value: 'High Definition Photo Print Included' },
      { label: 'Mounting Type', value: 'Wall Hanging & Table Stand Included' },
      { label: 'Finish', value: 'Smooth Matte Natural Wood Polish' },
      { label: 'Product Dimensions', value: '12 x 18 inches (Customizable)' },
    ];
    col2 = [
      { label: 'Photo Capacity', value: 'Multiple Photo Collage Layout' },
      { label: 'Printing Technology', value: 'HD Glossy Waterproof UV Print' },
      { label: 'Durability', value: 'Dustproof & Fade Resistant (10+ Yrs)' },
      { label: 'Package Includes', value: customPkg || '1 Wooden Frame, Wall Hooks, Desktop Stand' },
    ];
  } else if (cat.includes('chocolate') || cat.includes('box') || cat.includes('gift set') || title.includes('chocolate')) {
    col1 = [
      { label: 'Type', value: 'Artisanal Premium Handcrafted Chocolates' },
      { label: 'Flavors', value: 'Assorted Dark, Milk & Hazelnut Truffles' },
      { label: 'Weight', value: '350g (12 - 16 Pieces)' },
      { label: 'Dietary Info', value: '100% Vegetarian' },
      { label: 'Shelf Life', value: '6 Months from Manufacture Date' },
    ];
    col2 = [
      { label: 'Customization', value: 'Personalized Greeting Card & Name Print' },
      { label: 'Storage', value: 'Store in a Cool & Dry Place (18°C - 22°C)' },
      { label: 'Occasion', value: 'Birthday, Anniversary & Special Celebrations' },
      { label: 'Package Includes', value: customPkg || '1 Premium Gift Box, Greeting Card, Ribbon Wrapping' },
    ];
  } else if (cat.includes('mug') || cat.includes('cushion') || title.includes('mug') || title.includes('cushion')) {
    col1 = [
      { label: 'Material', value: customMat || (title.includes('cushion') ? 'Soft Velvet Satin Microfiber' : 'High Grade AAA Ceramic') },
      { label: 'Capacity / Size', value: title.includes('cushion') ? '16 x 16 inches' : '350 ml (Standard Coffee Mug)' },
      { label: 'Print Type', value: 'Full Wrap Permanent Sublimation Print' },
      { label: 'Maintenance', value: title.includes('cushion') ? 'Washable Cover with Filler' : 'Microwave & Dishwasher Safe' },
    ];
    col2 = [
      { label: 'Photo Quality', value: 'Ultra HD Vibrant Color Print' },
      { label: 'Durability', value: 'Scratch & Fade Proof Print' },
      { label: 'Package Includes', value: customPkg || (title.includes('cushion') ? '1 Printed Cushion Cover + Soft Filler' : '1 Printed Ceramic Mug in Thermocol Box') },
    ];
  } else {
    col1 = [
      { label: 'Material', value: customMat || 'Acrylic + Wooden Base' },
      { label: 'Light Type', value: 'LED Warm Glow' },
      { label: 'Power Source', value: 'USB Cable (Included)' },
      { label: 'Voltage', value: '5V (Low Power Consumption)' },
      { label: 'Wattage', value: '3W' },
      { label: 'Product Dimensions', value: '18 x 16 x 5 cm' },
    ];
    col2 = [
      { label: 'Photo Customization', value: '1 Custom Photo Engraved' },
      { label: 'Printing', value: 'High Quality Laser Etched / UV Print' },
      { label: 'Light Colors', value: 'Warm White / Cool White / Multicolor' },
      { label: 'Base Options', value: 'Wooden / White Base' },
      { label: 'Package Includes', value: customPkg || `1 ${product?.title || 'Personalized Item'}, USB Cable, Gift Box` },
    ];
  }

  const featuresList = [
    { icon: Gift, label: 'Personalized Just for You', className: 'purple-bg' },
    { icon: Sun, label: cat.includes('frame') ? 'HD Vivid Colors' : cat.includes('chocolate') ? 'Freshly Handcrafted' : 'Soft LED Glow', className: 'blue-bg' },
    { icon: Leaf, label: 'Premium Quality Finish', className: 'indigo-bg' },
    { icon: ShieldCheck, label: customMat ? customMat.slice(0, 20) : 'High Grade Durable Material', className: 'navy-bg' },
    { icon: Usb, label: cat.includes('lamp') ? 'USB Powered' : 'Gift Packaging Included', className: 'violet-bg' },
    { icon: Shield, label: 'Safe & Long Lasting', className: 'sky-bg' },
  ];

  return { detailsColumns: [col1, col2], features: featuresList };
};

const ratingBars = [
  { value: '5', width: '82%' },
  { value: '4', width: '13%' },
  { value: '3', width: '3%' },
  { value: '2', width: '1%' },
  { value: '1', width: '1%' },
];

const reviewPhotos = [
  '/assets/lamp_heart_couple.png',
  '/assets/lamp_heart_text.png',
  '/assets/lamp_portrait.png',
  '/assets/lamp_heart_text.png',
  '/assets/lamp_heart_couple.png',
  '/assets/lamp_portrait.png',
];

const reviewSlides = [
  {
    initial: 'R',
    name: 'Rahul Sharma',
    date: '2 Days ago',
    text: 'Amazing product! The quality is superb and it looks even better in real. Perfect gift for my girlfriend. She loved it!',
    photo: '/assets/lamp_portrait.png',
  },
  {
    initial: 'P',
    name: 'Priya Nair',
    date: '1 Week ago',
    text: 'Ordered it for my husband\'s birthday and he absolutely loved it! The lamp glows beautifully. Highly recommend!',
    photo: '/assets/lamp_heart_couple.png',
  },
  {
    initial: 'A',
    name: 'Arjun Mehta',
    date: '2 Weeks ago',
    text: 'Delivery was fast and packaging was really premium. The photo quality on the lamp is crystal clear. Worth every rupee!',
    photo: '/assets/lamp_heart_text.png',
  },
  {
    initial: 'S',
    name: 'Sneha Rao',
    date: '2 Weeks ago',
    text: 'Beautiful LED lamp, glowing bright. Highly recommend this for customized birthday gifts. INEX Gifts was very supportive.',
    photo: '/assets/lamp_heart_couple.png',
  },
];

const similarProducts = [
  {
    title: 'Photo Cushion',
    price: '₹499',
    rating: '4.7',
    reviews: '(189)',
    image: '/assets/cushion.png',
  },
  {
    title: 'Customized Mug',
    price: '₹299',
    rating: '4.6',
    reviews: '(215)',
    image: '/assets/mug.png',
  },
  {
    title: 'Acrylic Photo Frame',
    price: '₹649',
    rating: '4.8',
    reviews: '(158)',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=400&auto=format&fit=crop',
  },
  {
    title: 'Photo Keychain',
    price: '₹199',
    rating: '4.5',
    reviews: '(86)',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=400&auto=format&fit=crop',
  },
  {
    title: 'Explosion Gift Box',
    price: '₹1,199',
    rating: '4.9',
    reviews: '(120)',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop',
  },
];

function ProductDetails({ product, showToast, qty, setQty, onAddToCart, onToggleWishlist, onBack, onOpenCart, cartCount }) {
  const [quantity, setQuantity] = useState(qty || 1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('features-section');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [similarWishlist, setSimilarWishlist] = useState(similarProducts.map(() => false));
  const [addedFeedback, setAddedFeedback] = useState(false);

  const dynamicSpecs = useMemo(() => getDynamicSpecsAndFeatures(product), [product]);
  const features = dynamicSpecs.features;
  const detailsColumns = dynamicSpecs.detailsColumns;

  // Firestore Customer Reviews
  const [firestoreReviews, setFirestoreReviews] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchReviews = async () => {
      const pId = product?.id || 'prod_1';
      const pTitle = product?.title || '';
      const data = await reviewService.getProductReviews(pId, pTitle);
      if (isMounted) setFirestoreReviews(data);
    };
    fetchReviews();
    return () => { isMounted = false; };
  }, [product]);

  const displayReviewSlides = useMemo(() => {
    if (firestoreReviews.length > 0) {
      const formattedFirestore = firestoreReviews.map((r) => ({
        initial: r.userName ? r.userName.charAt(0).toUpperCase() : 'U',
        name: r.userName || 'Verified Buyer',
        date: r.date || 'Recently',
        text: r.comment,
        rating: r.rating || 5,
        photo: r.productImage || product?.image || '/assets/lamp_portrait.png',
      }));
      return [...formattedFirestore, ...reviewSlides];
    }
    return reviewSlides;
  }, [firestoreReviews, product]);

  const sectionRefs = useRef({});
  const tabRefs = useRef({});
  const indicatorRef = useRef(null);
  const manualScrollingRef = useRef(false);

  useEffect(() => {
    const activeTabButton = tabRefs.current[activeTab];
    if (!activeTabButton || !indicatorRef.current) return;

    indicatorRef.current.style.width = `${activeTabButton.offsetWidth}px`;
    indicatorRef.current.style.transform = `translateX(${activeTabButton.offsetLeft}px)`;
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      const activeTabButton = tabRefs.current[activeTab];
      if (!activeTabButton || !indicatorRef.current) return;
      indicatorRef.current.style.width = `${activeTabButton.offsetWidth}px`;
      indicatorRef.current.style.transform = `translateX(${activeTabButton.offsetLeft}px)`;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (manualScrollingRef.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviewSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox.open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightbox.open]);

  useEffect(() => {
    if (!addedFeedback) return;
    const timer = setTimeout(() => setAddedFeedback(false), 1500);
    return () => clearTimeout(timer);
  }, [addedFeedback]);

  const updateQuantity = (value) => {
    setQuantity(Math.max(1, value));
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(quantity);
    }
    setQuantity(1);
    setAddedFeedback(true);
  };

  const handleToggleWishlist = () => {
    const nextWishlisted = !isWishlisted;
    setIsWishlisted(nextWishlisted);
    if (onToggleWishlist) {
      onToggleWishlist(nextWishlisted);
    }
  };

  const handleSimilarWishlist = (index) => {
    setSimilarWishlist((previous) =>
      previous.map((isSaved, idx) => (idx === index ? !isSaved : isSaved))
    );
  };

  const scrollToSection = (id) => {
    const section = sectionRefs.current[id];
    const header = document.querySelector('.app-header');
    const tabNav = document.querySelector('.tab-nav');
    if (!section) return;

    manualScrollingRef.current = true;
    setActiveTab(id);

    const offsetTop = section.getBoundingClientRect().top + window.scrollY;
    const offset = (header?.offsetHeight || 0) + (tabNav?.offsetHeight || 0) + 8;
    window.scrollTo({ top: offsetTop - offset, behavior: 'smooth' });

    window.setTimeout(() => {
      manualScrollingRef.current = false;
    }, 900);
  };

  const openLightbox = (src, alt) => {
    setLightbox({ open: true, src, alt });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, src: '', alt: '' });
  };

  return (
    <div className="pd-app-container">
      <header className="app-header">
        <button className="header-btn" aria-label="Go back" onClick={() => onBack && onBack()}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="header-title">LED Photo Lamp</h1>
        <div className="header-actions">
          <button className="header-btn wishlist-btn" aria-label="Add to wishlist" onClick={handleToggleWishlist}>
            <Heart
              className="wishlist-icon"
              fill={isWishlisted ? '#EF4444' : 'none'}
              stroke={isWishlisted ? '#EF4444' : 'currentColor'}
              size={18}
            />
          </button>
          <button className="header-btn cart-btn" aria-label="View cart" onClick={() => onOpenCart && onOpenCart()}>
            <ShoppingCart size={18} />
            <span className="cart-badge" id="cart-badge-count">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      <ProductDetail
        product={product}
        showToast={showToast}
        qty={quantity}
        setQty={setQuantity}
        onAddToCart={handleAddToCart}
        hideBottomBar={true}
      />

      <nav className="tab-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => scrollToSection(tab.id)}
            ref={(element) => {
              tabRefs.current[tab.id] = element;
            }}
          >
            {tab.label}
          </button>
        ))}
        <div className="tab-indicator" ref={indicatorRef} />
      </nav>

      <main className="main-content">

        <section id="features-section" className="scroll-section" ref={(el) => (sectionRefs.current['features-section'] = el)}>
          <div className="section-title-wrapper">
            <Heart className="title-heart-icon" size={20} />
            <h2 className="section-title">Why You'll Love It</h2>
          </div>
          <div className="features-grid">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div className="feature-card" key={feature.label}>
                  <div className={`feature-icon-wrapper ${feature.className}`}>
                    <Icon size={20} />
                  </div>
                  <p className="feature-text">{feature.label}</p>
                </div>
              );
            })}
          </div>
          <div className="promo-box">
            <div className="promo-left">
              <div className="promo-lightbulb">
                <Lightbulb size={18} />
              </div>
              <p className="promo-text">
                Perfect to surprise your loved ones on birthdays, anniversaries, valentine's day and other special occasions.
              </p>
            </div>
            <div className="promo-right">
              <img src="/assets/purple_giftbox.png" alt="Gift box with ribbon" className="promo-img" />
            </div>
          </div>
        </section>

        <section id="details-section" className="scroll-section" ref={(el) => (sectionRefs.current['details-section'] = el)}>
          <div className="section-title-wrapper border-top">
            <h2 className="section-title-plain">Product Details</h2>
          </div>
          <div className="details-grid">
            {detailsColumns.map((column, index) => (
              <div className="details-column" key={index}>
                <ul>
                  {column.map((item) => (
                    <li key={item.label}>
                      <span className="detail-label">{item.label}</span>
                      <span className="detail-value">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="quality-badge-box">
            <div className="badge-icon">
              <ShieldCheck size={16} />
            </div>
            <div className="badge-content">
              <h4 className="badge-title">Quality Assured</h4>
              <p className="badge-text">At INEX Gifts, we ensure the best quality and customer satisfaction.</p>
            </div>
          </div>
        </section>

        <section id="reviews-section" className="scroll-section" ref={(el) => (sectionRefs.current['reviews-section'] = el)}>
          <div className="section-title-wrapper border-top flex-space">
            <h2 className="section-title-plain">Customer Reviews</h2>
            <a href="#" className="view-all-link">
              View All <ChevronRight size={14} />
            </a>
          </div>

          <div className="reviews-summary-row">
            <div className="rating-overview">
              <div className="rating-number">4.8</div>
              <div className="rating-stars">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="star-filled" size={14} />
                ))}
              </div>
              <div className="rating-count">(320 Reviews)</div>
            </div>
            <div className="rating-bars">
              {ratingBars.map((bar) => (
                <div className="bar-row" key={bar.value}>
                  <span className="bar-label">
                    {bar.value} <Star size={10} />
                  </span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: bar.width }} />
                  </div>
                  <span className="bar-percent">{bar.width}</span>
                </div>
              ))}
            </div>
            <div className="review-photo-grid">
              {reviewPhotos.map((photo, index) => (
                <div className={`rp-img-wrap ${index === reviewPhotos.length - 1 ? 'rp-more' : ''}`} key={photo + index} onClick={() => openLightbox(photo, 'Review photo')}>
                  <img src={photo} alt="Review photo" className={`rp-img ${index === reviewPhotos.length - 1 ? 'rp-blur' : ''}`} />
                  {index === reviewPhotos.length - 1 ? <div className="rp-overlay">+24<br />Photos</div> : null}
                </div>
              ))}
            </div>
          </div>

          <div className="review-slideshow" id="review-slideshow">
            <div className="review-slide-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {displayReviewSlides.map((review, idx) => (
                <div className="review-slide" key={review.name + idx}>
                  <div className="review-card">
                    <div className="review-card-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">{review.initial}</div>
                        <div className="reviewer-meta">
                          <div className="reviewer-name-row">
                            <span className="reviewer-name">{review.name}</span>
                            <span className="verified-badge">
                              <ShieldCheck size={10} /> Verified Buyer
                            </span>
                          </div>
                          <div className="review-stars-row">
                            <div className="review-stars">
                              {[...Array(5)].map((_, index) => (
                                <Star
                                  key={index}
                                  className={index < (review.rating || 5) ? 'star-filled' : 'text-slate-300'}
                                  size={14}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review-date">{review.date}</div>
                    </div>
                    <div className="review-body">
                      <p className="review-text">{review.text}</p>
                      {review.photo && (
                        <img
                          src={review.photo}
                          alt={`${review.name}'s review photo`}
                          className="review-thumb-img"
                          onClick={() => openLightbox(review.photo, `${review.name} review photo`)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="slide-arrow slide-arrow-prev" type="button" id="slide-prev" aria-label="Previous review" onClick={() => setCurrentSlide((prev) => (prev - 1 + displayReviewSlides.length) % displayReviewSlides.length)}>
              <ChevronLeft size={16} />
            </button>
            <button className="slide-arrow slide-arrow-next" type="button" id="slide-next" aria-label="Next review" onClick={() => setCurrentSlide((prev) => (prev + 1) % displayReviewSlides.length)}>
              <ChevronRight size={16} />
            </button>
            <div className="carousel-dots" id="carousel-dots">
              {displayReviewSlides.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${currentSlide === index ? 'active' : ''}`}
                  data-index={index}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="similar-section" className="scroll-section" ref={(el) => (sectionRefs.current['similar-section'] = el)}>
          <div className="section-title-wrapper border-top flex-space">
            <h2 className="section-title-plain">Similar Products</h2>
            <a href="#" className="view-all-link">
              View All <ChevronRight size={14} />
            </a>
          </div>
          <div className="similar-slider">
            {similarProducts.map((product, index) => (
              <div className="product-card" key={product.title}>
                <div className="card-img-container">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500';
                    }}
                    className="card-img" 
                  />
                  <button className="card-wishlist" type="button" aria-label="Add to wishlist" onClick={() => handleSimilarWishlist(index)}>
                    <Heart
                      fill={similarWishlist[index] ? '#EF4444' : 'none'}
                      stroke={similarWishlist[index] ? '#EF4444' : 'currentColor'}
                      size={14}
                    />
                  </button>
                </div>
                <div className="card-info">
                  <h3 className="card-title">{product.title}</h3>
                  <div className="card-price">{product.price}</div>
                  <div className="card-rating">
                    <Star className="star-filled" size={10} />
                    <span className="rating-val">{product.rating}</span>
                    <span className="rating-count">{product.reviews}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer sticky bottom-0 z-50 bg-white border-t border-slate-200 shadow-2xl py-3.5 px-4 sm:px-8 flex items-center justify-between gap-4">
        <div className="price-container">
          <div className="price-row flex items-baseline gap-2">
            <span className="price-current text-xl sm:text-2xl font-extrabold text-slate-900">₹{product?.price || product?.currentPrice || '999'}</span>
            {product?.originalPrice && <span className="price-original text-xs sm:text-sm text-slate-400 line-through">₹{product.originalPrice}</span>}
            {product?.discount && <span className="price-discount text-xs font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded">{product.discount}% OFF</span>}
          </div>
        </div>
        <div className="footer-actions flex items-center gap-3">
          <div className="qty-selector flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            <button className="qty-btn px-3 py-1.5 text-slate-600 font-bold hover:bg-slate-200" type="button" aria-label="Decrease quantity" onClick={() => updateQuantity(quantity - 1)}>
              —
            </button>
            <span className="qty-value px-3 font-bold text-slate-800 text-sm" id="qty-count">
              {quantity}
            </span>
            <button className="qty-btn px-3 py-1.5 text-slate-600 font-bold hover:bg-slate-200" type="button" aria-label="Increase quantity" onClick={() => updateQuantity(quantity + 1)}>
              +
            </button>
          </div>
          <button className="add-to-cart-btn bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-extrabold px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 text-sm cursor-pointer" type="button" id="add-to-cart-action" onClick={handleAddToCart}>
            <ShoppingCart className="btn-cart-icon" size={18} />
            <span>{addedFeedback ? '✓ Added to Cart!' : 'Add to Cart'}</span>
          </button>
        </div>
      </footer>

      {lightbox.open ? (
        <div className="lightbox-modal active" onClick={(event) => event.target === event.currentTarget && closeLightbox()}>
          <button className="lightbox-close" type="button" aria-label="Close modal" onClick={closeLightbox}>
            &times;
          </button>
          <img className="lightbox-content" src={lightbox.src} alt={lightbox.alt} />
        </div>
      ) : null}
    </div>
  );
}

export default ProductDetails;
