import React, { useState } from 'react';

export default function Customize({ setView, addToCart }) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('Mug');
  const [textMessage, setTextMessage] = useState('');
  const [selectedFont, setSelectedFont] = useState('Classic');
  const [selectedColor, setSelectedColor] = useState('black');
  const [imagePreview, setImagePreview] = useState(null);

  const productTypes = [
    { name: 'Mug', img: 'mugs.jpg', folder: 'categories' },
    { name: 'Cushion', img: 'cushions.jpg', folder: 'categories' },
    { name: 'Photo Frame', img: 'photo_frames.jpg', folder: 'categories' },
    { name: 'Keychain', img: 'keychains.jpg', folder: 'categories' },
    { name: 'Photo Lamp', img: 'led_photo_lamp.jpg', folder: 'products' },
    { name: 'T-Shirt', img: 'gift_sets.jpg', folder: 'categories' }
  ];

  const fonts = ['Classic', 'Modern', 'Handwritten', 'Bold'];
  const colors = [
    { name: 'black', hex: '#1F2937' },
    { name: 'red', hex: '#EF4444' },
    { name: 'blue', hex: '#3B82F6' },
    { name: 'purple', hex: '#8B5CF6' },
    { name: 'green', hex: '#10B981' }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    const customizedItem = {
      id: `custom-${Date.now()}`,
      name: `Customized ${selectedType} (${selectedFont} / ${selectedColor})`,
      price: 599,
      original: 799,
      qty: 1,
      // Use fallback image if no file was uploaded
      img: productTypes.find(t => t.name === selectedType)?.img,
      customImage: imagePreview,
      customMessage: textMessage,
      isCustom: true
    };
    
    addToCart(customizedItem);
    setView('cart');
  };

  return (
    <div className="main-content" style={{ paddingBottom: '120px' }}>
      {/* Header */}
      <header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 20px', background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 100 }}>
        <button className="header-back" onClick={() => { if (step > 1) setStep(step - 1); else setView('gifts'); }} aria-label="Go back" style={{ position: 'absolute', left: '16px', width: '38px', height: '38px', borderRadius: '12px', border: '1px solid #E5E7EB', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1F2937', cursor: 'pointer' }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h1 className="header-title" style={{ fontSize: '18px', fontWeight: 700 }}>Customize Gift</h1>
      </header>

      {/* Progress Steps */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 30px', background: 'white', borderBottom: '1px solid #F3F4F6' }}>
        {['Choose Product', 'Customize', 'Preview'].map((sName, index) => {
          const sNum = index + 1;
          const isActive = step >= sNum;
          return (
            <div key={sNum} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative' }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: step === sNum ? '#4F46E5' : (step > sNum ? '#EEF2FF' : '#FFFFFF'),
                border: '2.5px solid #4F46E5',
                borderColor: isActive ? '#4F46E5' : '#E5E7EB',
                color: step === sNum ? 'white' : (step > sNum ? '#4F46E5' : '#9CA3AF'),
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
              }}>
                {step > sNum ? '✓' : sNum}
              </div>
              <span style={{ fontSize: '10px', fontWeight: isActive ? 600 : 500, color: isActive ? '#4F46E5' : '#9CA3AF', marginTop: '6px' }}>{sName}</span>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div style={{ padding: '16px' }}>
        
        {/* Step 1 View */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Select Product Type</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {productTypes.map(t => {
                const isSelected = selectedType === t.name;
                return (
                  <div 
                    key={t.name} 
                    onClick={() => setSelectedType(t.name)}
                    style={{
                      background: 'white',
                      borderRadius: '16px',
                      border: isSelected ? '2px solid #4F46E5' : '1px solid #E5E7EB',
                      padding: '12px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 4px 12px rgba(79,70,229,0.1)' : 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    <img 
                      src={`/assets/images/${t.folder}/${t.img}`} 
                      alt={t.name} 
                      style={{ width: '100%', aspectRatio: '1.2', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} 
                    />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>{t.name}</span>
                  </div>
                );
              })}
            </div>
            <button onClick={() => setStep(2)} style={{ width: '100%', padding: '14px', background: '#4F46E5', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>Next: Add Details</button>
          </div>
        )}

        {/* Step 2 View */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Upload Photo & Text</h2>
            
            {/* File upload widget */}
            <div style={{ border: '2px dashed #E5E7EB', borderRadius: '16px', padding: '24px 16px', textAlign: 'center', background: 'white', marginBottom: '20px', position: 'relative' }}>
              {imagePreview ? (
                <div>
                  <img src={imagePreview} alt="Upload preview" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', margin: '0 auto 12px' }} />
                  <button onClick={() => setImagePreview(null)} style={{ padding: '6px 14px', background: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Remove Image</button>
                </div>
              ) : (
                <label style={{ cursor: 'pointer', display: 'block' }}>
                  <div style={{ fontSize: '40px', marginBottom: '8px', color: '#9CA3AF' }}>📸</div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937', display: 'block' }}>Upload Photo</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px', display: 'block' }}>Supports JPEG, PNG up to 5MB</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                </label>
              )}
            </div>

            {/* Custom Message Text */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyMessage: 'space-between', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>Custom Message</label>
                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{textMessage.length}/100</span>
              </div>
              <textarea 
                placeholder="Enter text you want printed (e.g. 'Happy Birthday Mom!')"
                value={textMessage}
                maxLength={100}
                onChange={(e) => setTextMessage(e.target.value)}
                style={{ width: '100%', height: '80px', padding: '12px', border: '1.5px solid #E5E7EB', borderRadius: '12px', fontSize: '14px', outline: 'none', resize: 'none' }}
              />
            </div>

            {/* Font Selector */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937', display: 'block', marginBottom: '8px' }}>Font Style</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {fonts.map(f => (
                  <button 
                    key={f}
                    onClick={() => setSelectedFont(f)}
                    style={{
                      padding: '10px 4px',
                      borderRadius: '8px',
                      border: selectedFont === f ? '1.5px solid #4F46E5' : '1px solid #E5E7EB',
                      background: selectedFont === f ? '#EEF2FF' : 'white',
                      color: selectedFont === f ? '#4F46E5' : '#1F2937',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937', display: 'block', marginBottom: '8px' }}>Text Color</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {colors.map(c => (
                  <button 
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: c.hex,
                      border: selectedColor === c.name ? '3px solid #FFFFFF' : 'none',
                      outline: selectedColor === c.name ? '2px solid #4F46E5' : 'none',
                      cursor: 'pointer'
                    }}
                    aria-label={`Select ${c.name}`}
                  />
                ))}
              </div>
            </div>

            <button onClick={() => setStep(3)} style={{ width: '100%', padding: '14px', background: '#4F46E5', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>Next: Preview Mockup</button>
          </div>
        )}

        {/* Step 3 View */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Mockup Preview</h2>

            {/* Mockup visual display card */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '16px', marginBottom: '20px', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 16px', borderRadius: '12px', overflow: 'hidden', background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Mockup base" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EEF2FF', color: '#4F46E5', fontSize: '32px' }}>🎁</div>
                )}
                {textMessage && (
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '10px',
                    right: '10px',
                    background: 'rgba(255,255,255,0.85)',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: selectedFont === 'Handwritten' ? 'cursive' : (selectedFont === 'Modern' ? 'sans-serif' : 'serif'),
                    color: colors.find(c => c.name === selectedColor)?.hex
                  }}>
                    {textMessage}
                  </div>
                )}
              </div>
              
              <div style={{ textAlign: 'left', borderTop: '1px solid #F3F4F6', paddingTop: '12px' }}>
                <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 500 }}>PRODUCT TYPE</span>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937', marginBottom: '6px' }}>Personalized {selectedType}</h3>
                <p style={{ fontSize: '13px', color: '#6B7280' }}>Message: <strong style={{ color: '#1F2937' }}>{textMessage || 'None'}</strong></p>
                <p style={{ fontSize: '13px', color: '#6B7280' }}>Font: <strong style={{ color: '#1F2937' }}>{selectedFont}</strong> | Color: <strong style={{ color: '#1F2937' }}>{selectedColor}</strong></p>
              </div>
            </div>

            {/* Price section */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Total Price</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 700, color: '#4F46E5' }}>₹599</span>
                    <span style={{ fontSize: '13px', color: '#9CA3AF', textDecoration: 'line-through' }}>₹799</span>
                  </div>
                </div>
                <span style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>25% OFF</span>
              </div>
            </div>

            <button onClick={handleAddToCart} style={{ width: '100%', padding: '14px', background: '#4F46E5', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>Add to Cart & View</button>
          </div>
        )}
      </div>
    </div>
  );
}
