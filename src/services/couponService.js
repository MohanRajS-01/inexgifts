import { db } from '../firebase';
import { collection, setDoc, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';

const LOCAL_COUPONS_KEY = 'inex_coupons_cache';

const DEFAULT_COUPONS = [
  { code: 'INEX20', rate: 20, desc: 'Flat 20% OFF on all gifts', minOrder: 499, active: true },
  { code: 'WELCOME10', rate: 10, desc: '10% OFF for new buyers', minOrder: 299, active: true },
  { code: 'FESTIVE30', rate: 30, desc: '30% Mega Festive Savings', minOrder: 999, active: true }
];

export const couponService = {
  // Fetch all coupons from Firestore 'coupons' collection
  getCoupons: async () => {
    let firestoreCoupons = [];
    try {
      const colRef = collection(db, 'coupons');
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        firestoreCoupons = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (e) {
      console.warn("Firestore coupons query notice:", e.message);
    }

    if (firestoreCoupons.length > 0) {
      try {
        localStorage.setItem(LOCAL_COUPONS_KEY, JSON.stringify(firestoreCoupons));
      } catch {}
      return firestoreCoupons;
    }

    const local = (() => {
      try {
        const s = localStorage.getItem(LOCAL_COUPONS_KEY);
        return s ? JSON.parse(s) : DEFAULT_COUPONS;
      } catch { return DEFAULT_COUPONS; }
    })();

    return local;
  },

  // Save/Create coupon directly into Firestore database
  addCoupon: async (couponData) => {
    const codeClean = couponData.code.trim().toUpperCase();
    const newCoupon = {
      id: codeClean,
      code: codeClean,
      rate: Number(couponData.rate) || 10,
      desc: couponData.desc || `${couponData.rate}% Discount`,
      minOrder: Number(couponData.minOrder) || 0,
      active: true,
      createdAt: new Date().toISOString()
    };

    // Save to LocalStorage
    try {
      const existing = await couponService.getCoupons();
      const updated = [newCoupon, ...existing.filter(c => c.code !== codeClean)];
      localStorage.setItem(LOCAL_COUPONS_KEY, JSON.stringify(updated));
    } catch (e) {}

    // Save directly to Firestore database collection 'coupons'
    try {
      await setDoc(doc(db, 'coupons', codeClean), newCoupon, { merge: true });
      console.log("⚡ Coupon saved in Firestore:", codeClean);
    } catch (e) {
      console.error("Could not save coupon to Firestore:", e);
    }

    return newCoupon;
  },

  // Delete coupon from Firestore
  deleteCoupon: async (code) => {
    const codeClean = code.trim().toUpperCase();
    try {
      const existing = await couponService.getCoupons();
      const updated = existing.filter(c => c.code !== codeClean);
      localStorage.setItem(LOCAL_COUPONS_KEY, JSON.stringify(updated));
    } catch (e) {}

    try {
      await deleteDoc(doc(db, 'coupons', codeClean));
      console.log("⚡ Coupon deleted from Firestore:", codeClean);
    } catch (e) {
      console.error("Could not delete coupon from Firestore:", e);
    }
  },

  // Validate coupon typed by customer on Cart Page
  validateCoupon: async (codeTyped) => {
    if (!codeTyped) return null;
    const clean = codeTyped.trim().toUpperCase();

    // Query Firestore first
    try {
      const docSnap = await getDoc(doc(db, 'coupons', clean));
      if (docSnap.exists() && docSnap.data()?.active) {
        return docSnap.data();
      }
    } catch (e) {}

    // Check local cache
    const coupons = await couponService.getCoupons();
    const found = coupons.find(c => c.code === clean && c.active);
    return found || null;
  }
};
