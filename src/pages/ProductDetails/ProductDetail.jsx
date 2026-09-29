import React, { useState, useRef } from 'react';
import { Share2, Star, Truck, ShieldCheck, Gift, Eye, Upload, CornerRightDown, Check, Minus, Plus, ShoppingCart, Trees, Box, Zap, X } from 'lucide-react';
import './ProductDetail.css';

const defaultThumbnails = [
  { id: 1, src: '/main-lamp.jpg', alt: 'Heart lamp' },
  { id: 2, src: '/thumb1.jpg', alt: 'Another engraved lamp' },
  { id: 3, src: '/thumb2.jpg', alt: 'Heart lamp with text' },
  { id: 4, src: '/thumb3.jpg', alt: 'Rectangular lamp' },
];

function ProductVisuals({ product, showToast }) {
  // Build dynamic image list strictly from product.images or product.image
  const imageList = (() => {
    if (Array.isArray(product?.images) && product.images.length > 0) {
      const valid = product.images.filter(img => typeof img === 'string' && img.trim() !== '');
      if (valid.length > 0) return valid;
    }
    if (product?.image && typeof product.image === 'string' && product.image.trim() !== '') {
      return [product.image.trim()];
    }
    return ['/assets/images/products/led_photo_lamp.jpg'];
  })();

  const thumbnails = imageList.map((src, index) => ({
    id: index + 1,
    src: src,
    alt: `${product?.title || 'Product'} ${index + 1}`
  }));

  const [activeThumb, setActiveThumb] = useState(thumbnails[0]);
  const [mainOpacity, setMainOpacity] = useState(1);
  const [currentImg, setCurrentImg] = useState(thumbnails[0]?.src);

  // Update currentImg when product changes
  React.useEffect(() => {
    if (thumbnails[0]) {
      setActiveThumb(thumbnails[0]);
      setCurrentImg(thumbnails[0].src);
    }
  }, [product?.id, product?.image, JSON.stringify(product?.images)]);

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
      title: product?.title || 'INEX Gifts Product',
      text: `Check out ${product?.title || 'this product'} on INEX Gifts.`,
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
        <button type="button" className="product-share-btn" aria-label="Share product" onClick={handleShare} title="Share Product">
          <Share2 size={18} />
        </button>
        <img
          src={currentImg || '/assets/images/products/led_photo_lamp.jpg'}
          alt={activeThumb?.alt || product?.title || 'Product'}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600';
          }}
          className="main-image"
          style={{ opacity: mainOpacity }}
        />
        {thumbnails.length > 1 && (
          <div className="image-counter">{activeThumb?.id || 1}/{thumbnails.length}</div>
        )}
      </div>

      {thumbnails.length > 1 && (
        <div className="thumbnail-gallery">
          {thumbnails.map((thumb) => (
            <div
              key={thumb.id}
              className={`thumbnail ${activeThumb?.id === thumb.id ? 'active' : ''}`}
              onClick={() => handleThumbClick(thumb)}
            >
              <img 
                src={thumb.src} 
                alt={thumb.alt}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200';
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductInfo({ product, qty = 1, setQty, onAddToCart, onBuyNow }) {
  const isOutOfStock = product?.inStock === false;

  return (
    <div className="product-info-section">
      <div className="flex items-center gap-3">
        <h2 className="product-title m-0">{product?.title || 'LED Photo Lamp'}</h2>
        {isOutOfStock && (
          <span className="bg-red-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Out of Stock
          </span>
        )}
      </div>
      <p className="product-subtitle">{product?.subtitle || 'Personalized Gift'}</p>

      <div className="rating">
        <Star className="star-filled" />
        <span className="rating-score">{product?.rating || 4.8}</span>
        <span className="rating-reviews">({product?.reviewsCount || 320} reviews)</span>
      </div>

      <div className="pricing">
        <span className="price-current">₹{product?.price || product?.currentPrice || '999'}</span>
        {product?.discount && <span className="price-tag">{product.discount}% OFF</span>}
        {product?.originalPrice && <span className="price-original">₹{product.originalPrice}</span>}
      </div>
      <p className="tax-info">Inclusive of all taxes & free delivery</p>

      {/* Seamless Action Section */}
      <div className="mt-5 mb-6 max-w-lg w-full">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          {setQty && !isOutOfStock && (
            <div className="flex items-center h-12 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs shrink-0">
              <button
                type="button"
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="w-10 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold transition-colors cursor-pointer select-none"
                aria-label="Decrease Quantity"
              >
                <Minus size={15} />
              </button>
              <span className="w-9 h-full flex items-center justify-center font-extrabold text-slate-900 text-sm select-none">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                className="w-10 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold transition-colors cursor-pointer select-none"
                aria-label="Increase Quantity"
              >
                <Plus size={15} />
              </button>
            </div>
          )}

          {isOutOfStock ? (
            <button
              type="button"
              disabled
              className="flex-1 h-12 bg-slate-200 text-slate-500 font-extrabold text-xs sm:text-sm rounded-xl cursor-not-allowed border border-slate-300 flex items-center justify-center"
            >
              🚫 Currently Out of Stock
            </button>
          ) : (
            <div className="flex-1 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => onAddToCart && onAddToCart(qty)}
                className="flex-1 min-w-[130px] h-12 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart size={17} /> Add to Cart
              </button>
              <button
                type="button"
                onClick={() => onBuyNow ? onBuyNow(qty) : (onAddToCart && onAddToCart(qty))}
                className="flex-1 min-w-[120px] h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Zap size={16} /> Buy Now
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="features-list mt-8 pt-2">
        <div className="feature-item">
          <Truck className="text-green icon-lg" />
          <div className="feature-text">
            <span className="feature-title">Expected Delivery</span>
            <span className="feature-desc font-bold text-indigo-700">{product?.deliveryText || 'Get it in 2-3 Business Days'}</span>
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

function CustomizationSection({ product, showToast, onAddToCart, qty }) {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [selectedShape, setSelectedShape] = useState('heart');
  const [selectedColor, setSelectedColor] = useState('warm-white');
  const [selectedBase, setSelectedBase] = useState('wood');
  const [selectedFabric, setSelectedFabric] = useState('velvet');
  const [selectedFrameStyle, setSelectedFrameStyle] = useState('wood');
  const [customText, setCustomText] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const fileInputRef = useRef(null);

  const titleLower = (product?.title || '').toLowerCase();
  const categoryLower = (product?.category || '').toLowerCase();

  const isCushion = titleLower.includes('cushion') || categoryLower.includes('cushion');
  const isFrame = titleLower.includes('frame') || categoryLower.includes('frame');
  const isMug = titleLower.includes('mug') || categoryLower.includes('mug');
  const isLamp = titleLower.includes('lamp') || categoryLower.includes('lamp') || titleLower.includes('led');
  const isChocolate = titleLower.includes('chocolate') || categoryLower.includes('chocolate') || titleLower.includes('box');

  const customizationTitle = isCushion
    ? 'Customize Your Cushion'
    : isFrame
    ? 'Customize Your Photo Frame'
    : isMug
    ? 'Customize Your Ceramic Mug'
    : isLamp
    ? 'Customize Your LED Lamp'
    : isChocolate
    ? 'Personalize Your Gift Hamper'
    : `Customize Your Gift`;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target.result);
        if (showToast) {
          showToast(`Photo uploaded successfully! Click Preview to see your live ${isCushion ? 'cushion' : isFrame ? 'frame' : isLamp ? 'lamp' : 'gift'}.`);
        }
      };
      reader.readAsDataURL(file);
    } else {
      if (showToast) {
        showToast('Please upload a valid JPG, PNG, or WebP photo.');
      }
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

  const handleCustomAddToCart = () => {
    const customItem = {
      ...product,
      image: photoPreview || product?.image,
      subtitle: customText ? `"${customText}"` : (isCushion ? 'Personalized Cushion' : isFrame ? 'Personalized Frame' : 'Custom Gift'),
      customText: customText || '',
      quantity: qty || 1
    };
    if (onAddToCart) onAddToCart(customItem);
  };

  return (
    <div className="customization-section">
      <div className="section-header">
        <div>
          <h3 className="section-title">{customizationTitle}</h3>
          <p className="section-subtitle">Make it truly yours ✨</p>
        </div>
        <button 
          type="button" 
          className="preview-btn flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl border border-indigo-200 transition active:scale-95" 
          onClick={() => setShowPreviewModal(true)}
        >
          <Eye size={15} /> Preview
        </button>
      </div>

      {/* STEP 1: UPLOAD PHOTO */}
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
            accept="image/png, image/jpeg, image/webp"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />

          <div className="upload-arrow">
            <CornerRightDown />
          </div>

          <div className="upload-example">
            <span className="example-badge">{photoPreview ? 'Uploaded ✓' : 'Preview'}</span>
            <img src={photoPreview || product?.image || '/assets/images/products/led_photo_lamp.jpg'} alt="Upload preview" />
          </div>
        </div>
      </div>

      {/* STEP 2: DYNAMIC OPTIONS BASED ON PRODUCT TYPE */}
      {isCushion ? (
        <>
          <div className="custom-step">
            <label className="step-label">2. Choose Cushion Shape & Size</label>
            <div className="options-grid shapes-grid">
              {[
                { id: 'heart', label: 'Heart (14"x14")', svg: <svg className="shape-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
                { id: 'square', label: 'Square (16"x16")', svg: <svg className="shape-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="4"/></svg> },
                { id: 'lumbar', label: 'Rectangle (12"x20")', svg: <svg className="shape-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="5" rx="3"/></svg> },
              ].map((opt) => (
                <div
                  key={opt.id}
                  className={`option-card ${selectedShape === opt.id ? 'active' : ''}`}
                  onClick={() => setSelectedShape(opt.id)}
                >
                  {opt.svg}
                  <span>{opt.label}</span>
                  <div className="check-badge"><Check className="icon-xs" /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="custom-step">
            <label className="step-label">3. Choose Cushion Fabric Material</label>
            <div className="options-grid bases-grid">
              {[
                { id: 'velvet', label: 'Soft Velvet Plush' },
                { id: 'satin', label: 'Glossy Silk Satin' },
                { id: 'canvas', label: 'Natural Canvas' },
              ].map((fab) => (
                <div
                  key={fab.id}
                  className={`option-card row-card ${selectedFabric === fab.id ? 'active' : ''}`}
                  onClick={() => setSelectedFabric(fab.id)}
                >
                  <span className="font-bold text-xs sm:text-sm">{fab.label}</span>
                  <div className="check-badge"><Check className="icon-xs" /></div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : isFrame ? (
        <>
          <div className="custom-step">
            <label className="step-label">2. Choose Frame Size</label>
            <div className="options-grid shapes-grid">
              {[
                { id: 'small', label: 'Table Top (6"x8")' },
                { id: 'medium', label: 'Wall Mount (8"x12")' },
                { id: 'large', label: 'Collage (12"x18")' },
              ].map((size) => (
                <div
                  key={size.id}
                  className={`option-card ${selectedShape === size.id ? 'active' : ''}`}
                  onClick={() => setSelectedShape(size.id)}
                >
                  <span className="font-bold text-xs sm:text-sm">{size.label}</span>
                  <div className="check-badge"><Check className="icon-xs" /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="custom-step">
            <label className="step-label">3. Choose Frame Border Style</label>
            <div className="options-grid bases-grid">
              {[
                { id: 'wood', label: 'Natural Oak Wood' },
                { id: 'black', label: 'Matte Modern Black' },
                { id: 'white', label: 'Minimalist White' },
              ].map((style) => (
                <div
                  key={style.id}
                  className={`option-card row-card ${selectedFrameStyle === style.id ? 'active' : ''}`}
                  onClick={() => setSelectedFrameStyle(style.id)}
                >
                  <span className="font-bold text-xs sm:text-sm">{style.label}</span>
                  <div className="check-badge"><Check className="icon-xs" /></div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : isMug ? (
        <>
          <div className="custom-step">
            <label className="step-label">2. Choose Mug Type</label>
            <div className="options-grid shapes-grid">
              {[
                { id: 'standard', label: 'Classic Ceramic (350ml)' },
                { id: 'magic', label: 'Magic Color Reveal' },
                { id: 'frosted', label: 'Frosted Matte Black' },
              ].map((mug) => (
                <div
                  key={mug.id}
                  className={`option-card ${selectedShape === mug.id ? 'active' : ''}`}
                  onClick={() => setSelectedShape(mug.id)}
                >
                  <span className="font-bold text-xs sm:text-sm">{mug.label}</span>
                  <div className="check-badge"><Check className="icon-xs" /></div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : isLamp ? (
        <>
          <div className="custom-step">
            <label className="step-label">2. Choose Lamp Shape</label>
            <div className="options-grid shapes-grid">
              {[
                { id: 'heart', label: 'Heart', svg: <svg className="shape-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
                { id: 'round', label: 'Round', svg: <svg className="shape-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg> },
                { id: 'rectangle', label: 'Rectangle', svg: <svg className="shape-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="14" x="3" y="5" rx="2" ry="2"/></svg> },
                { id: 'star', label: 'Star', svg: <svg className="shape-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
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
            <label className="step-label">3. Choose Light Glow Color</label>
            <div className="options-grid colors-grid">
              {[
                { id: 'warm-white', label: 'Warm Glow', class: 'warm-white' },
                { id: 'cool-white', label: 'Cool White', class: 'cool-white' },
                { id: 'multicolor', label: 'Multicolor RGB', class: 'multicolor' },
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
            <label className="step-label">4. Choose Base Material</label>
            <div className="options-grid bases-grid">
              {[
                { id: 'wood', label: 'Natural Wooden Base', icon: <Trees size={24} className="text-secondary" /> },
                { id: 'white', label: 'Minimalist White Base', icon: <Box size={24} className="text-secondary" /> },
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
        </>
      ) : (
        <div className="custom-step">
          <label className="step-label">2. Gift Packaging Style</label>
          <div className="options-grid bases-grid">
            {[
              { id: 'deluxe', label: 'Luxury Ribbon Box' },
              { id: 'hamper', label: 'Golden Festive Basket' },
              { id: 'keepsake', label: 'Wooden Keepsake Chest' },
            ].map((box) => (
              <div
                key={box.id}
                className={`option-card row-card ${selectedShape === box.id ? 'active' : ''}`}
                onClick={() => setSelectedShape(box.id)}
              >
                <span className="font-bold text-xs sm:text-sm">{box.label}</span>
                <div className="check-badge"><Check className="icon-xs" /></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3/4: CUSTOM TEXT */}
      <div className="custom-step">
        <label className="step-label">
          {isCushion ? 'Add Custom Name / Text Print' :
           isFrame ? 'Add Header / Engraved Quote' :
           isMug ? 'Add Custom Quote or Name' :
           isLamp ? 'Add Engraved Message' :
           'Add Greeting Card Message'} 
          <span className="optional">(Optional)</span>
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder={
              isCushion ? 'e.g. Best Mother Ever / Love You Always' :
              isFrame ? 'e.g. Together Forever • 14.02.2024' :
              isMug ? 'e.g. Best Dad in the World ☕' :
              isLamp ? 'e.g. Love You to the Moon & Back' :
              'e.g. Wishing You a Very Happy Birthday!'
            }
            maxLength="35"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
          />
          <span className="char-count">{customText.length}/35</span>
        </div>
      </div>

      {/* Interactive Live Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl relative flex flex-col items-center">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition cursor-pointer"
              aria-label="Close Preview"
            >
              <X size={18} />
            </button>

            <h3 className="text-white font-extrabold text-lg mb-1 flex items-center gap-2">
              ✨ Live Customization Preview
            </h3>
            <p className="text-xs text-slate-400 mb-5 text-center">
              Real-time preview of your personalized {isCushion ? 'cushion' : isFrame ? 'frame' : isLamp ? 'lamp' : 'gift'}
            </p>

            {/* Visual Preview Stage based on Product Type */}
            {isCushion ? (
              <div className="w-full aspect-square max-w-[260px] bg-slate-950 rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden border border-slate-800 shadow-inner">
                {/* Cushion Body */}
                <div className={`relative w-48 h-48 bg-gradient-to-tr from-amber-50 to-white shadow-2xl flex flex-col items-center justify-center p-3 border-4 border-amber-100 ${
                  selectedShape === 'heart' ? 'rounded-[40%_40%_50%_50%]' : 'rounded-3xl'
                }`}>
                  <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-md border-2 border-white mb-1.5">
                    <img
                      src={photoPreview || product?.image || '/assets/cushion.png'}
                      alt="Cushion Photo Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-serif font-extrabold text-amber-900 italic tracking-wide text-center truncate max-w-full px-2">
                    {customText || 'Best Mother Ever'}
                  </span>
                </div>
              </div>
            ) : isFrame ? (
              <div className="w-full aspect-square max-w-[260px] bg-slate-950 rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden border border-slate-800 shadow-inner">
                {/* Frame Border */}
                <div className={`w-44 h-52 p-3.5 shadow-2xl flex flex-col items-center justify-between ${
                  selectedFrameStyle === 'black' ? 'bg-slate-950 border-8 border-slate-900' :
                  selectedFrameStyle === 'white' ? 'bg-white border-8 border-slate-200' :
                  'bg-amber-100 border-8 border-amber-900'
                } rounded-lg`}>
                  <div className="w-full flex-1 bg-white p-1 rounded overflow-hidden shadow-inner flex items-center justify-center">
                    <img
                      src={photoPreview || product?.image || '/wooden_collage_frame.png'}
                      alt="Frame Preview"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 tracking-wider text-center truncate pt-1 uppercase">
                    {customText || 'Together Forever'}
                  </span>
                </div>
              </div>
            ) : isLamp ? (
              <div className="w-full aspect-square max-w-[260px] bg-slate-950 rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden border border-slate-800/80 shadow-inner">
                <div 
                  className={`absolute inset-4 rounded-full filter blur-2xl opacity-60 transition-all duration-500 ${
                    selectedColor === 'warm-white' ? 'bg-amber-400' :
                    selectedColor === 'cool-white' ? 'bg-sky-300' :
                    'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse'
                  }`}
                />
                <div className={`relative z-10 w-44 h-44 border-4 border-white/40 overflow-hidden flex items-center justify-center shadow-2xl transition-all duration-300 ${
                  selectedShape === 'heart' ? 'rounded-[40%_40%_50%_50%]' :
                  selectedShape === 'round' ? 'rounded-full' :
                  selectedShape === 'star' ? 'rounded-3xl rotate-45' :
                  'rounded-2xl'
                }`}>
                  <img
                    src={photoPreview || product?.image || '/assets/images/products/led_photo_lamp.jpg'}
                    alt="Engraved Photo Preview"
                    className="w-full h-full object-cover filter brightness-110 contrast-125"
                  />
                </div>
                <div className={`w-40 h-10 mt-1 rounded-b-xl z-20 flex flex-col items-center justify-center border-t-2 transition-all shadow-xl ${
                  selectedBase === 'wood' 
                    ? 'bg-amber-900 border-amber-700 text-amber-100' 
                    : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}>
                  <span className="text-[10px] font-extrabold tracking-wider uppercase truncate px-2 max-w-full">
                    {customText || 'INEX GIFTS'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full aspect-square max-w-[260px] bg-slate-950 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden border border-slate-800 shadow-inner">
                <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl relative">
                  <img
                    src={photoPreview || product?.image || '/assets/gift_box.png'}
                    alt="Gift Preview"
                    className="w-full h-full object-cover"
                  />
                  {customText && (
                    <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-xs p-2 text-center text-white text-xs font-bold">
                      "{customText}"
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Customization Details Summary */}
            <div className="w-full mt-4 bg-slate-950/70 rounded-xl p-3 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Photo:</span>
                <span className="font-bold text-emerald-400">{photoPreview ? 'Custom Photo Uploaded ✓' : 'Default Sample Photo'}</span>
              </div>
              {customText && (
                <div className="flex justify-between border-t border-slate-800/80 pt-1 mt-1">
                  <span className="text-slate-400">Printed Text:</span>
                  <span className="font-bold text-amber-300 truncate max-w-[180px]">"{customText}"</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="w-full flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Change Options
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPreviewModal(false);
                  handleCustomAddToCart();
                }}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ShoppingCart size={15} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BottomBar({ product, qty, setQty, onAddToCart }) {
  const isOutOfStock = product?.inStock === false;

  return (
    <div className="bottom-bar">
      <div className="bottom-bar-inner">
        <div className="bottom-price">
          <span className="price-current">₹{product?.price || product?.currentPrice || '999'}</span>
          {product?.originalPrice && <span className="price-original">₹{product.originalPrice}</span>}
        </div>

        <div className="bottom-actions">
          {!isOutOfStock && (
            <div className="quantity-selector">
              <button className="qty-btn" aria-label="Decrease Quantity" onClick={() => qty > 1 && setQty(qty - 1)}>
                <Minus className="icon-sm" />
              </button>
              <span className="qty-value">{qty}</span>
              <button className="qty-btn" aria-label="Increase Quantity" onClick={() => qty < 99 && setQty(qty + 1)}>
                <Plus className="icon-sm" />
              </button>
            </div>
          )}

          {isOutOfStock ? (
            <button disabled className="add-to-cart-btn bg-slate-300 text-slate-600 cursor-not-allowed border-none font-bold">
              Out of Stock
            </button>
          ) : (
            <button className="add-to-cart-btn" onClick={() => onAddToCart(qty)}>
              <ShoppingCart className="icon-sm" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductDetail({ product, showToast, qty, setQty, onAddToCart, onBuyNow, hideBottomBar }) {
  return (
    <>
      <main className="product-detail-one-main">
        <ProductVisuals product={product} showToast={showToast} />
        <div className="product-details-container">
          <ProductInfo product={product} qty={qty} setQty={setQty} onAddToCart={onAddToCart} onBuyNow={onBuyNow} />
          <hr className="divider" />
          <CustomizationSection product={product} showToast={showToast} onAddToCart={onAddToCart} qty={qty} />
        </div>
      </main>
      {!hideBottomBar && <BottomBar product={product} qty={qty} setQty={setQty} onAddToCart={onAddToCart} />}
    </>
  );
}

export default ProductDetail;
