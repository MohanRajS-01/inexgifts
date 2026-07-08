import { useEffect, useRef, useState } from 'react';
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
import './style.css';

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

const features = [
  { icon: Gift, label: 'Personalized Just for You', className: 'purple-bg' },
  { icon: Sun, label: 'Soft LED Glow', className: 'blue-bg' },
  { icon: Leaf, label: 'Energy Efficient', className: 'indigo-bg' },
  { icon: ShieldCheck, label: 'Premium Acrylic', className: 'navy-bg' },
  { icon: Usb, label: 'USB Powered', className: 'violet-bg' },
  { icon: Shield, label: 'Safe & Long Lasting', className: 'sky-bg' },
];

const detailsColumns = [
  [
    { label: 'Material', value: 'Acrylic + Wooden Base' },
    { label: 'Light Type', value: 'LED' },
    { label: 'Power Source', value: 'USB Cable (Included)' },
    { label: 'Voltage', value: '5V' },
    { label: 'Wattage', value: '3W' },
    { label: 'Product Dimensions', value: '18 x 16 x 5 cm' },
  ],
  [
    { label: 'Photo', value: '1 Photo (Customizable)' },
    { label: 'Printing', value: 'High Quality UV Print' },
    { label: 'Light Colors', value: 'Warm White / Cool White / Multicolor' },
    { label: 'Base Options', value: 'Wooden / White' },
    { label: 'Package Includes', value: '1 LED Lamp, USB Cable, User Manual, Gift Box' },
  ],
];

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

function App() {
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(3);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('features-section');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [similarWishlist, setSimilarWishlist] = useState(similarProducts.map(() => false));
  const [addedFeedback, setAddedFeedback] = useState(false);

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

  const setQty = (value) => {
    setQuantity(Math.max(1, value));
  };

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + quantity);
    setQuantity(1);
    setAddedFeedback(true);
  };

  const handleToggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
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
    <div className="app-container">
      <header className="app-header">
        <button className="header-btn" aria-label="Go back">
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
          <button className="header-btn cart-btn" aria-label="View cart">
            <ShoppingCart size={18} />
            <span className="cart-badge" id="cart-badge-count">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

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
        <section className="desktop-hero" aria-label="Product Overview">
          <div className="desktop-hero-inner">
            <div className="desktop-gallery-col">
              <div className="desktop-main-img-wrap">
                <img
                  id="desktop-main-img"
                  src={heroImages[selectedImageIdx].src}
                  alt={heroImages[selectedImageIdx].alt}
                  className="desktop-main-img"
                />
              </div>
              <div className="desktop-thumb-row">
                {heroImages.map((image, index) => (
                  <img
                    key={image.src + index}
                    src={image.src}
                    alt={image.alt}
                    className={`desktop-thumb ${selectedImageIdx === index ? 'active' : ''}`}
                    onClick={() => setSelectedImageIdx(index)}
                  />
                ))}
              </div>
            </div>

            <div className="desktop-info-col">
              <div>
                <h2 className="desktop-product-title">LED Photo Lamp</h2>
                <p className="desktop-product-subtitle">Personalized Heart-Shaped Acrylic Night Lamp with Wooden Base</p>
              </div>
              <div className="desktop-rating-summary">
                <div className="review-stars">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="star-filled" size={18} />
                  ))}
                </div>
                <span className="desktop-rating-text">
                  4.8 <span className="muted-text">(320 Reviews)</span>
                </span>
              </div>
              <div className="desktop-feature-tags">
                <span className="feat-tag">🎁 Personalized</span>
                <span className="feat-tag">💡 Soft LED Glow</span>
                <span className="feat-tag">🌿 Energy Efficient</span>
                <span className="feat-tag">🔌 USB Powered</span>
                <span className="feat-tag">💎 Premium Acrylic</span>
                <span className="feat-tag">🛡️ Safe & Long Lasting</span>
              </div>
              <div className="desktop-price-block">
                <span className="price-current">₹999</span>
                <span className="price-original">₹1,299</span>
                <span className="price-discount">23% OFF</span>
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
            </div>
          </div>
        </section>

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
              {reviewSlides.map((review) => (
                <div className="review-slide" key={review.name}>
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
                                <Star key={index} className="star-filled" size={14} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review-date">{review.date}</div>
                    </div>
                    <div className="review-body">
                      <p className="review-text">{review.text}</p>
                      <img
                        src={review.photo}
                        alt={`${review.name}'s review photo`}
                        className="review-thumb-img"
                        onClick={() => openLightbox(review.photo, `${review.name} review photo`)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="slide-arrow slide-arrow-prev" type="button" id="slide-prev" aria-label="Previous review" onClick={() => setCurrentSlide((prev) => (prev - 1 + reviewSlides.length) % reviewSlides.length)}>
              <ChevronLeft size={16} />
            </button>
            <button className="slide-arrow slide-arrow-next" type="button" id="slide-next" aria-label="Next review" onClick={() => setCurrentSlide((prev) => (prev + 1) % reviewSlides.length)}>
              <ChevronRight size={16} />
            </button>
            <div className="carousel-dots" id="carousel-dots">
              {reviewSlides.map((_, index) => (
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
                  <img src={product.image} alt={product.title} className="card-img" />
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

      <footer className="app-footer">
        <div className="price-container">
          <div className="price-row">
            <span className="price-current">₹999</span>
            <span className="price-original">₹1,299</span>
            <span className="price-discount">23% OFF</span>
          </div>
        </div>
        <div className="footer-actions">
          <div className="qty-selector">
            <button className="qty-btn" type="button" aria-label="Decrease quantity" onClick={() => setQty(quantity - 1)}>
              —
            </button>
            <span className="qty-value" id="qty-count">
              {quantity}
            </span>
            <button className="qty-btn" type="button" aria-label="Increase quantity" onClick={() => setQty(quantity + 1)}>
              +
            </button>
          </div>
          <button className="add-to-cart-btn" type="button" id="add-to-cart-action" onClick={handleAddToCart}>
            <ShoppingCart className="btn-cart-icon" size={16} />
            <span>{addedFeedback ? '✓ Added!' : 'Add to Cart'}</span>
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

export default App;
