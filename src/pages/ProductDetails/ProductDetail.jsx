import React, { useState, useRef } from 'react';
import { Share2, Star, Truck, ShieldCheck, Gift, Eye, Upload, CornerRightDown, Check, Minus, Plus, ShoppingCart, Trees, Box } from 'lucide-react';
import './ProductDetail.css';

const defaultThumbnails = [
  { id: 1, src: '/main-lamp.jpg', alt: 'Heart lamp' },
  { id: 2, src: '/thumb1.jpg', alt: 'Another engraved lamp' },
  { id: 3, src: '/thumb2.jpg', alt: 'Heart lamp with text' },
  { id: 4, src: '/thumb3.jpg', alt: 'Rectangular lamp' },
];

function ProductVisuals({ product, showToast }) {
  const thumbnails = [
    { id: 1, src: product?.image || '/main-lamp.jpg', alt: product?.title || 'Heart lamp' },
    ...defaultThumbnails.slice(1)
  ];
  const [activeThumb, setActiveThumb] = useState(thumbnails[0]);
  const [mainOpacity, setMainOpacity] = useState(1);
  const [currentImg, setCurrentImg] = useState(thumbnails[0].src);

  const handleThumbClick = (thumb) => {
    setActiveThumb(thumb);
    setMainOpacity(0);
    setTimeout(() => {
      setCurrentImg(thumb.src);
      setMainOpacity(1);
    }, 150);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'LED Photo Lamp',
      text: 'Check out this personalized LED Photo Lamp.',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        showToast('Product link copied to clipboard.');
      } else {
        window.prompt('Copy this link:', shareData.url);
      }
    } catch (error) {
      if (error?.name !== 'AbortError') {
        showToast('Unable to share right now.');
      }
    }
  };

  return (
    <div className="product-visuals">
      <div className="main-image-container">
        <span className="tag-bestseller">Bestseller</span>
        <button className="icon-btn share-btn" aria-label="Share" onClick={handleShare}>
          <Share2 />
        </button>
        <img
          src={currentImg}
          alt={activeThumb.alt}
          className="main-image"
          style={{ opacity: mainOpacity }}
        />
        <div className="image-counter">{activeThumb.id}/6</div>
      </div>

      <div className="thumbnail-gallery">
        {thumbnails.map((thumb) => (
          <div
            key={thumb.id}
            className={`thumbnail ${activeThumb.id === thumb.id ? 'active' : ''}`}
            onClick={() => handleThumbClick(thumb)}
          >
            <img src={thumb.src} alt={thumb.alt} />
          </div>
        ))}
        <div className="thumbnail more-images" onClick={() => handleThumbClick({ id: 5, src: '/thumb4.jpg', alt: 'More' })}>
          <img src="/thumb4.jpg" alt="Grey thumbnail" />
          <div className="overlay">+2</div>
        </div>
      </div>
    </div>
  );
}

function ProductInfo({ product }) {
  return (
    <div className="product-info-section">
      <h2 className="product-title">{product?.title || 'LED Photo Lamp'}</h2>
      <p className="product-subtitle">Personalized with 1 Photo</p>

      <div className="rating">
        <Star className="star-filled" />
        <span className="rating-score">4.8</span>
        <a href="#" className="rating-reviews">(320 reviews)</a>
      </div>

      <div className="pricing">
        <span className="price-current">₹{product?.price || '999'}</span>
        {product?.discount && <span className="price-tag">{product.discount}</span>}
        {product?.originalPrice && <span className="price-original">₹{product.originalPrice}</span>}
      </div>
      <p className="tax-info">Inclusive of all taxes</p>

      <div className="features-list">
        <div className="feature-item">
          <Truck className="text-green icon-lg" />
          <div className="feature-text">
            <span className="feature-title">Free Delivery</span>
            <span className="feature-desc">Get it by Sat, 24 May</span>
          </div>
        </div>
        <div className="feature-item">
          <ShieldCheck className="text-blue icon-lg" />
          <div className="feature-text">
            <span className="feature-title">Premium Quality</span>
            <span className="feature-desc">7 Days Replacement</span>
          </div>
        </div>
        <div className="feature-item">
          <Gift className="text-purple icon-lg" />
          <div className="feature-text">
            <span className="feature-title">Perfect Gift</span>
            <span className="feature-desc">For every special occasion</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomizationSection({ showToast }) {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [selectedShape, setSelectedShape] = useState('heart');
  const [selectedColor, setSelectedColor] = useState('warm-white');
  const [selectedBase, setSelectedBase] = useState('wood');
  const [customText, setCustomText] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target.result);
        showToast('<span style="display:flex;align-items:center;gap:4px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Photo uploaded successfully!</span>');
      };
      reader.readAsDataURL(file);
    } else {
      showToast('<span style="display:flex;align-items:center;gap:4px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Please upload a valid JPG/PNG file.</span>');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
        handleFileUpload({ target: { files: e.dataTransfer.files } });
      }
    }
  };

  return (
    <div className="customization-section">
      <div className="section-header">
        <div>
          <h3 className="section-title">Customize Your Lamp</h3>
          <p className="section-subtitle">Make it truly yours ✨</p>
        </div>
        <button className="preview-btn" onClick={() => showToast('<span style="display:flex;align-items:center;gap:4px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg> Generating 3D Preview...</span>')}>
          <Eye className="icon-sm" /> Preview
        </button>
      </div>

      <div className="custom-step">
        <label className="step-label">1. Add Your Photo <span className="required">*</span></label>
        <div className="upload-area-container">
          <div
            className={`upload-box ${isDragOver ? 'dragover' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
          >
            <Upload className="upload-icon" />
            <span className="upload-title">Upload Photo</span>
            <span className="upload-desc">JPG, PNG up to 10MB</span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/png, image/jpeg"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />

          <div className="upload-arrow">
            <CornerRightDown />
          </div>

          <div className="upload-example">
            <span className="example-badge">Example</span>
            <img src={photoPreview || '/example-photo.jpg'} alt="Upload preview" />
          </div>
        </div>
      </div>

      <div className="custom-step">
        <label className="step-label">2. Choose Lamp Shape</label>
        <div className="options-grid shapes-grid">
          {[
            { id: 'heart', label: 'Heart', svg: <svg className="shape-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
            { id: 'round', label: 'Round', svg: <svg className="shape-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg> },
            { id: 'rectangle', label: 'Rectangle', svg: <svg className="shape-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="14" x="3" y="5" rx="2" ry="2"/></svg> },
            { id: 'star', label: 'Star', svg: <svg className="shape-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
          ].map((shape) => (
            <div
              key={shape.id}
              className={`option-card ${selectedShape === shape.id ? 'active' : ''}`}
              onClick={() => setSelectedShape(shape.id)}
            >
              {shape.svg}
              <span>{shape.label}</span>
              <div className="check-badge"><Check className="icon-xs" /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="custom-step">
        <label className="step-label">3. Add Text <span className="optional">(Optional)</span></label>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter text (e.g. I love you forever)"
            maxLength="30"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
          />
          <span className="char-count">{customText.length}/30</span>
        </div>
      </div>

      <div className="custom-step">
        <label className="step-label">4. Choose Light Color</label>
        <div className="options-grid colors-grid">
          {[
            { id: 'warm-white', label: 'Warm White', class: 'warm-white' },
            { id: 'cool-white', label: 'Cool White', class: 'cool-white' },
            { id: 'multicolor', label: 'Multicolor', class: 'multicolor' },
          ].map((color) => (
            <div
              key={color.id}
              className={`option-card row-card ${selectedColor === color.id ? 'active' : ''}`}
              onClick={() => setSelectedColor(color.id)}
            >
              <div className={`color-circle ${color.class}`}></div>
              <span>{color.label}</span>
              <div className="check-badge"><Check className="icon-xs" /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="custom-step">
        <label className="step-label">5. Choose Base Type</label>
        <div className="options-grid bases-grid">
          {[
            { id: 'wood', label: 'Wooden Base', icon: <Trees size={24} className="text-secondary" /> },
            { id: 'white', label: 'White Base', icon: <Box size={24} className="text-secondary" /> },
          ].map((base) => (
            <div
              key={base.id}
              className={`option-card row-card ${selectedBase === base.id ? 'active' : ''}`}
              onClick={() => setSelectedBase(base.id)}
            >
              {base.icon}
              <span>{base.label}</span>
              <div className="check-badge"><Check className="icon-xs" /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BottomBar({ product, qty, setQty, onAddToCart }) {
  return (
    <div className="bottom-bar">
      <div className="bottom-bar-inner">
        <div className="bottom-price">
          <span className="price-current">₹{product?.price || '999'}</span>
          {product?.originalPrice && <span className="price-original">₹{product.originalPrice}</span>}
          {product?.discount && <span className="price-tag-text">{product.discount}</span>}
        </div>

        <div className="bottom-actions">
          <div className="quantity-selector">
            <button className="qty-btn" aria-label="Decrease Quantity" onClick={() => qty > 1 && setQty(qty - 1)}>
              <Minus className="icon-sm" />
            </button>
            <span className="qty-value">{qty}</span>
            <button className="qty-btn" aria-label="Increase Quantity" onClick={() => qty < 99 && setQty(qty + 1)}>
              <Plus className="icon-sm" />
            </button>
          </div>

          <button className="add-to-cart-btn" onClick={() => onAddToCart(qty)}>
            <ShoppingCart className="icon-sm" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductDetail({ product, showToast, qty, setQty, onAddToCart }) {
  return (
    <>
      <main className="main-content">
        <ProductVisuals product={product} showToast={showToast} />
        <div className="product-details-container">
          <ProductInfo product={product} />
          <hr className="divider" />
          <CustomizationSection showToast={showToast} />
        </div>
      </main>
      <BottomBar product={product} qty={qty} setQty={setQty} onAddToCart={onAddToCart} />
    </>
  );
}

export default ProductDetail;
