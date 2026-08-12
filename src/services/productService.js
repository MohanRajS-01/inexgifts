import { db } from '../firebase';
import { collection, setDoc, getDocs, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { giftsData } from '../data/gifts';

const LOCAL_PRODUCTS_KEY = 'inex_products_cache';

const DEFAULT_PRODUCTS = giftsData.map(g => ({
  id: String(g.id),
  title: g.title,
  category: g.category || 'Gifts',
  originalPrice: Number(g.originalPrice) || Math.round((g.price || 999) * 1.25),
  currentPrice: Number(g.price) || 999,
  rating: Number(g.rating) || 4.8,
  reviewsCount: Number(g.ratingCount) || 24,
  image: g.image || '/assets/lamp_portrait.png',
  images: g.images && g.images.length > 0 ? g.images : [g.image || '/assets/lamp_portrait.png'],
  inStock: true
}));

export const productService = {
  // Real-time Firestore live subscription for Products
  subscribeProducts: (callback) => {
    try {
      const colRef = collection(db, 'products');
      return onSnapshot(colRef, (snap) => {
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          try {
            localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(list));
          } catch {}
          callback(list);
        } else {
          callback(DEFAULT_PRODUCTS);
        }
      });
    } catch (e) {
      console.warn("Firestore products subscription notice:", e.message);
      return () => {};
    }
  },

  // Get all products from Firestore 'products' collection
  getProducts: async () => {
    let firestoreProducts = [];
    try {
      const colRef = collection(db, 'products');
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        firestoreProducts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (e) {
      console.warn("Firestore products query notice:", e.message);
    }

    if (firestoreProducts.length > 0) {
      try {
        localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(firestoreProducts));
      } catch {}
      return firestoreProducts;
    }

    const local = (() => {
      try {
        const s = localStorage.getItem(LOCAL_PRODUCTS_KEY);
        return s ? JSON.parse(s) : DEFAULT_PRODUCTS;
      } catch { return DEFAULT_PRODUCTS; }
    })();

    return local;
  },

  // Save/Create product directly into Firestore database
  addProduct: async (productData) => {
    const pId = productData.id || `PROD-${Math.floor(1000 + Math.random() * 9000)}`;
    const cleanImages = Array.isArray(productData.images) && productData.images.length > 0
      ? productData.images.filter(img => typeof img === 'string' && img.trim() !== '')
      : (productData.image ? [productData.image] : []);

    const primaryImage = cleanImages[0] || productData.image || '/assets/images/products/led_photo_lamp.jpg';
    const finalImages = cleanImages.length > 0 ? cleanImages : [primaryImage];

    const newProduct = {
      id: pId,
      title: productData.title ? productData.title.trim() : 'Custom Product',
      category: productData.category || 'Gifts',
      originalPrice: Number(productData.originalPrice) || 1299,
      currentPrice: Number(productData.currentPrice) || 999,
      image: primaryImage,
      images: finalImages,
      rating: Number(productData.rating) || 4.8,
      reviewsCount: Number(productData.reviewsCount) || 1,
      inStock: productData.inStock !== false,
      deliveryText: productData.deliveryText || 'Get it in 2-3 Business Days',
      material: productData.material || '',
      packageIncludes: productData.packageIncludes || '',
      createdAt: new Date().toISOString()
    };

    // Save to LocalStorage
    try {
      const existing = await productService.getProducts();
      const updated = [newProduct, ...existing.filter(p => p.id !== pId)];
      localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(updated));
    } catch (e) {}

    // Save directly to Firestore collection 'products'
    try {
      await setDoc(doc(db, 'products', pId), newProduct, { merge: true });
      console.log("⚡ Product with images saved in Firestore:", pId, finalImages);
    } catch (e) {
      console.error("Could not save product to Firestore:", e);
    }

    return newProduct;
  },

  // Delete product from Firestore collection
  deleteProduct: async (id) => {
    try {
      const docRef = doc(db, 'products', id);
      await deleteDoc(docRef);
      console.log("⚡ Deleted product from Firestore:", id);
    } catch (e) {
      console.error("Could not delete product from Firestore:", e);
    }

    try {
      const existing = await productService.getProducts();
      const updated = existing.filter(p => p.id !== id);
      localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(updated));
    } catch (e) {}
  }
};
