import { db } from '../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';

const DEFAULT_BANNERS = [
  {
    id: 'banner_1',
    title: 'Make Every Moment',
    subtitle: 'Extra Special',
    desc: 'Unique gifts for your special ones. Thoughtful. Personal. Memorable.',
    image: '/Banner1.png',
    active: true,
    tag: 'Bestseller'
  },
  {
    id: 'banner_2',
    title: 'Personalized Photo Gifts',
    subtitle: 'Crafted with Love',
    desc: 'Turn your favorite memories into customized LED lamps and frames.',
    image: '/Banner2.png',
    active: true,
    tag: 'Trending'
  },
  {
    id: 'banner_3',
    title: 'Flat 20% OFF',
    subtitle: 'On All Combos',
    desc: 'Surprise your loved ones with customized hampers and gift boxes.',
    image: '/Banner3.png',
    active: true,
    tag: 'Offer'
  },
  {
    id: 'banner_4',
    title: 'Special Anniversary Deals',
    subtitle: 'Celebrate Love',
    desc: 'Express your feelings with engraved wooden frames and couples cushions.',
    image: '/Banner4.png',
    active: true,
    tag: 'New Arrival'
  }
];

const LOCAL_STORAGE_KEY = 'inex_admin_banners';

export const bannerService = {
  // Get initial banners with local storage sync fallback
  getBanners: () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_BANNERS;
    } catch {
      return DEFAULT_BANNERS;
    }
  },

  // Save banners locally and dispatch custom event for instant cross-component live sync
  saveBannersLocally: (banners) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(banners));
      window.dispatchEvent(new CustomEvent('inex_banners_updated', { detail: banners }));
    } catch (e) {
      console.error('Error saving banners locally:', e);
    }
  },

  // Subscribe to real-time banner updates (Firestore + LocalStorage event listener)
  subscribeBanners: (callback) => {
    // Initial fetch from localStorage or defaults
    const current = bannerService.getBanners();
    callback(current);

    // Listen to local CustomEvent for instant UI reflection
    const handleLocalUpdate = (e) => {
      if (e.detail) {
        callback(e.detail);
      }
    };
    window.addEventListener('inex_banners_updated', handleLocalUpdate);

    // Attempt Firebase Firestore listener
    let unsubscribeFirestore = () => {};
    try {
      const bannersColRef = collection(db, 'banners');
      unsubscribeFirestore = onSnapshot(bannersColRef, (snapshot) => {
        if (!snapshot.empty) {
          const firestoreBanners = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          bannerService.saveBannersLocally(firestoreBanners);
          callback(firestoreBanners);
        }
      }, (error) => {
        console.warn("Firestore banner snapshot fallback to local:", error.message);
      });
    } catch (err) {
      console.warn("Firebase firestore disabled, using local event subscriber:", err);
    }

    return () => {
      window.removeEventListener('inex_banners_updated', handleLocalUpdate);
      unsubscribeFirestore();
    };
  },

  // Add or update a banner (Admin function)
  saveBanner: async (banner) => {
    const banners = bannerService.getBanners();
    const existingIdx = banners.findIndex(b => b.id === banner.id);
    let updated;
    if (existingIdx > -1) {
      updated = [...banners];
      updated[existingIdx] = { ...updated[existingIdx], ...banner };
    } else {
      const newBanner = { ...banner, id: banner.id || `banner_${Date.now()}` };
      updated = [...banners, newBanner];
    }

    bannerService.saveBannersLocally(updated);

    // Sync to Firestore
    try {
      const docRef = doc(db, 'banners', banner.id || `banner_${Date.now()}`);
      await setDoc(docRef, banner, { merge: true });
    } catch (e) {
      console.warn("Could not sync banner to Firestore, saved locally:", e);
    }

    return updated;
  },

  // Delete a banner (Admin function)
  deleteBanner: async (bannerId) => {
    const banners = bannerService.getBanners();
    const updated = banners.filter(b => b.id !== bannerId);
    bannerService.saveBannersLocally(updated);

    try {
      await deleteDoc(doc(db, 'banners', bannerId));
    } catch (e) {
      console.warn("Could not delete banner from Firestore:", e);
    }

    return updated;
  },

  // Reset to default banners
  resetDefaults: () => {
    bannerService.saveBannersLocally(DEFAULT_BANNERS);
    return DEFAULT_BANNERS;
  }
};
