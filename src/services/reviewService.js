import { db } from '../firebase';
import { collection, setDoc, getDocs, doc } from 'firebase/firestore';

const LOCAL_REVIEWS_KEY = 'inex_product_reviews';

export const reviewService = {
  // Get all reviews stored in Firestore & local cache strictly for this individual product
  getProductReviews: async (productId, productTitle = '') => {
    let firestoreReviews = [];
    try {
      const colRef = collection(db, 'reviews');
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        firestoreReviews = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (e) {
      console.warn("Firestore reviews query notice:", e.message);
    }

    const cleanTitle = (productTitle || '').trim().toLowerCase();
    const cleanId = String(productId || '').trim().toLowerCase();

    const isMatch = (r) => {
      const rId = String(r.productId || '').trim().toLowerCase();
      const rTitle = String(r.productTitle || '').trim().toLowerCase();
      if (cleanId && rId === cleanId) return true;
      if (cleanTitle && rTitle && (rTitle === cleanTitle || cleanTitle.includes(rTitle) || rTitle.includes(cleanTitle))) return true;
      return false;
    };

    const local = (() => {
      try {
        const s = localStorage.getItem(LOCAL_REVIEWS_KEY);
        return s ? JSON.parse(s) : [];
      } catch { return []; }
    })();

    const matchedFirestore = firestoreReviews.filter(isMatch);
    const matchedLocal = local.filter(isMatch);

    const combined = [...matchedFirestore, ...matchedLocal];
    return Array.from(new Map(combined.map(r => [r.id, r])).values());
  },

  // Save new review directly to Firestore 'reviews' collection
  addReview: async (reviewData) => {
    const reviewId = `REV-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReview = {
      id: reviewId,
      createdAt: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-GB'),
      ...reviewData
    };

    // Save to local storage cache
    try {
      const s = localStorage.getItem(LOCAL_REVIEWS_KEY);
      const existing = s ? JSON.parse(s) : [];
      localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify([newReview, ...existing]));
    } catch (e) {
      console.error(e);
    }

    // Save directly to Firestore database collection 'reviews'
    try {
      await setDoc(doc(db, 'reviews', reviewId), newReview, { merge: true });
      console.log("⚡ Customer review saved to Firestore:", reviewId);
    } catch (e) {
      console.error("Could not save review to Firestore:", e);
    }

    return newReview;
  }
};
