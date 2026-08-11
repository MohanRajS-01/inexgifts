import { db } from '../firebase';
import { collection, setDoc, getDocs, doc, onSnapshot } from 'firebase/firestore';

const DEFAULT_CATEGORIES = [
  'LED Lamps',
  'Frames',
  'Cushions',
  'Mugs',
  'Gift Sets',
  'Chocolates',
  'Keychains',
  'Flowers',
  'Greeting Cards',
  'Personalized Gifts',
  'Combos'
];

export const categoryService = {
  // Subscribe to Categories in real-time
  subscribeCategories: (callback) => {
    try {
      const colRef = collection(db, 'categories');
      return onSnapshot(colRef, (snap) => {
        if (!snap.empty) {
          const custom = snap.docs.map(d => d.data().name);
          const combined = Array.from(new Set([...DEFAULT_CATEGORIES, ...custom]));
          callback(combined);
        } else {
          callback(DEFAULT_CATEGORIES);
        }
      });
    } catch (e) {
      console.warn("Categories subscription notice:", e.message);
      return () => {};
    }
  },

  // Get categories list
  getCategories: async () => {
    try {
      const snap = await getDocs(collection(db, 'categories'));
      if (!snap.empty) {
        const custom = snap.docs.map(d => d.data().name);
        return Array.from(new Set([...DEFAULT_CATEGORIES, ...custom]));
      }
    } catch (e) {}
    return DEFAULT_CATEGORIES;
  },

  // Add new custom category to Firestore
  addCategory: async (categoryName) => {
    const clean = categoryName.trim();
    if (!clean) return;
    const catId = clean.toLowerCase().replace(/[^a-z0-9]/g, '_');
    try {
      await setDoc(doc(db, 'categories', catId), {
        id: catId,
        name: clean,
        createdAt: new Date().toISOString()
      }, { merge: true });
      console.log("⚡ New Category saved in Firestore:", clean);
    } catch (e) {
      console.error("Could not save category to Firestore:", e);
    }
    return clean;
  }
};
