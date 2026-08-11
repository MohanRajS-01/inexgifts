import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const cartService = {
  getCartKey: (email) => {
    const clean = email ? email.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, '_') : 'guest';
    return `inex_cart_${clean}`;
  },

  // Get cart items strictly for logged-in email (Firestore FIRST)
  getCart: async (email) => {
    if (!email) return [];

    const key = cartService.getCartKey(email);
    const docId = email.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');

    let firestoreItems = null;
    try {
      const snap = await getDoc(doc(db, 'carts', docId));
      if (snap.exists() && Array.isArray(snap.data()?.items)) {
        firestoreItems = snap.data().items;
      }
    } catch (e) {
      console.warn("Firestore cart fetch notice:", e.message);
    }

    if (firestoreItems !== null) {
      try {
        localStorage.setItem(key, JSON.stringify(firestoreItems));
      } catch {}
      return firestoreItems;
    }

    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  // Save cart items strictly for logged-in email into Firestore & local storage
  saveCart: async (email, items) => {
    if (!email) return;

    const key = cartService.getCartKey(email);
    const docId = email.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');

    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }

    try {
      await setDoc(doc(db, 'carts', docId), {
        email: email.trim().toLowerCase(),
        items,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      console.log("⚡ Cart saved to Firestore backend for:", email);
    } catch (e) {
      console.warn("Could not save cart to Firestore:", e.message);
    }
  }
};
