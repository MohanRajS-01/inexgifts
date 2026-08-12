import { db } from '../firebase';
import { collection, setDoc, getDocs, deleteDoc, doc, getDoc, onSnapshot } from 'firebase/firestore';

const LOCAL_COUPONS_KEY = 'inex_coupons_cache';

const DEFAULT_COUPONS = [
  { code: 'INEX20', title: "Today's Special Offer!", rate: 20, desc: 'Flat 20% OFF on all orders', minOrder: 499, active: true },
  { code: 'WELCOME10', title: "Welcome New Buyer Deal!", rate: 10, desc: '10% OFF for new buyers', minOrder: 299, active: true },
  { code: 'FESTIVE30', title: "Mega Festive Offer!", rate: 30, desc: '30% Mega Festive Savings', minOrder: 999, active: true }
];

const DEFAULT_SEASONAL_CAMPAIGN = {
  tag: 'Seasonal Campaign',
  title: 'Flat 25% OFF + Free Express Shipping',
  desc: 'Use promo code at checkout. Valid on customized couple gift boxes & hampers this week only.',
  code: 'GIFT25',
  discountText: '25% OFF'
};

export const couponService = {
  // Get / Subscribe Seasonal Campaign Banner details from Firestore settings/seasonal_campaign
  getSeasonalCampaign: async () => {
    try {
      const docRef = doc(db, 'settings', 'seasonal_campaign');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        try {
          localStorage.setItem('inex_seasonal_campaign', JSON.stringify(data));
        } catch (e) {}
        return data;
      }
    } catch (e) {}

    try {
      const cached = localStorage.getItem('inex_seasonal_campaign');
      if (cached) return JSON.parse(cached);
    } catch (e) {}

    return DEFAULT_SEASONAL_CAMPAIGN;
  },

  subscribeSeasonalCampaign: (callback) => {
    couponService.getSeasonalCampaign().then(callback);
    try {
      return onSnapshot(doc(db, 'settings', 'seasonal_campaign'), (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          try {
            localStorage.setItem('inex_seasonal_campaign', JSON.stringify(data));
          } catch (e) {}
          callback(data);
        }
      });
    } catch (e) {
      return () => {};
    }
  },

  saveSeasonalCampaign: async (campaignData) => {
    const payload = {
      tag: campaignData.tag || 'Seasonal Campaign',
      title: campaignData.title || 'Flat 25% OFF + Free Express Shipping',
      desc: campaignData.desc || 'Use promo code at checkout.',
      code: (campaignData.code || 'GIFT25').trim().toUpperCase(),
      discountText: campaignData.discountText || '25% OFF',
      updatedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('inex_seasonal_campaign', JSON.stringify(payload));
    } catch (e) {}

    try {
      await setDoc(doc(db, 'settings', 'seasonal_campaign'), payload, { merge: true });
      console.log("⚡ Seasonal Campaign saved in Firestore:", payload);
    } catch (e) {
      console.error("Could not save seasonal campaign to Firestore:", e);
    }

    // Auto-ensure promo code exists in coupons collection if active
    try {
      await couponService.addCoupon({
        code: payload.code,
        title: payload.title,
        rate: parseFloat(payload.discountText.replace(/[^0-9.]/g, '')) || 25,
        desc: payload.desc,
        minOrder: 0,
        active: true
      });
    } catch (e) {}

    return payload;
  },

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
      const cleaned = firestoreCoupons.map(c => ({
        ...c,
        title: c.title || "Today's Special Offer!",
        rate: Number(c.rate) || 20,
        desc: (c.desc && !c.desc.includes('undefined')) ? c.desc : `Flat ${c.rate || 20}% OFF on all orders`
      }));
      try {
        localStorage.setItem(LOCAL_COUPONS_KEY, JSON.stringify(cleaned));
      } catch {}
      return cleaned;
    }

    const local = (() => {
      try {
        const s = localStorage.getItem(LOCAL_COUPONS_KEY);
        return s ? JSON.parse(s) : DEFAULT_COUPONS;
      } catch { return DEFAULT_COUPONS; }
    })();

    return local;
  },

  // Subscribe to real-time coupons updates directly from Cloud Firestore
  subscribeCoupons: (callback) => {
    couponService.getCoupons().then(callback);

    let unsub = () => {};
    try {
      unsub = onSnapshot(collection(db, 'coupons'), async () => {
        const latest = await couponService.getCoupons();
        callback(latest);
      });
    } catch (e) {
      console.warn("Firestore coupons subscription fallback:", e);
    }
    return unsub;
  },

  // Save/Create coupon directly into Firestore database
  addCoupon: async (couponData) => {
    const codeClean = couponData.code.trim().toUpperCase();
    const rateNum = Number(couponData.rate) || 20;
    const titleClean = couponData.title?.trim() || "Today's Special Offer!";
    const descClean = (couponData.desc && !couponData.desc.includes('undefined')) 
      ? couponData.desc 
      : `Flat ${rateNum}% OFF on all orders`;

    const newCoupon = {
      id: codeClean,
      code: codeClean,
      title: titleClean,
      rate: rateNum,
      desc: descClean,
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

  // Update existing coupon details (Title, Rate, Desc, Min Order, Active state)
  updateCoupon: async (code, updatedData) => {
    const codeClean = code.trim().toUpperCase();
    const rateNum = Number(updatedData.rate) || 20;
    const titleClean = updatedData.title?.trim() || "Today's Special Offer!";
    const descClean = (updatedData.desc && !updatedData.desc.includes('undefined')) 
      ? updatedData.desc 
      : `Flat ${rateNum}% OFF on all orders`;

    const updatedCoupon = {
      id: codeClean,
      code: codeClean,
      title: titleClean,
      rate: rateNum,
      desc: descClean,
      minOrder: Number(updatedData.minOrder) || 0,
      active: updatedData.active !== undefined ? Boolean(updatedData.active) : true,
      updatedAt: new Date().toISOString()
    };

    // Save to LocalStorage
    try {
      const existing = await couponService.getCoupons();
      const updated = existing.map(c => c.code === codeClean ? { ...c, ...updatedCoupon } : c);
      localStorage.setItem(LOCAL_COUPONS_KEY, JSON.stringify(updated));
    } catch (e) {}

    // Save to Firestore
    try {
      await setDoc(doc(db, 'coupons', codeClean), updatedCoupon, { merge: true });
      console.log("⚡ Coupon updated in Firestore:", codeClean);
    } catch (e) {
      console.error("Could not update coupon in Firestore:", e);
    }

    return updatedCoupon;
  },

  // Toggle active status (Enable / Disable coupon)
  toggleCouponStatus: async (code, currentActive) => {
    return await couponService.updateCoupon(code, { active: !currentActive });
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
    const found = coupons.find(c => c.code === clean && (c.active === undefined || c.active === true));
    return found || null;
  }
};
