import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const DEFAULT_USERS = [
  {
    name: "Alex Morgan",
    phone: "9876543210",
    email: "user@example.com",
    password: "password123",
    role: "customer",
    registeredAt: new Date().toISOString()
  },
  {
    name: "VENKATESH (Admin)",
    phone: "9123456789",
    email: "admin@inexgifts.com",
    password: "admin123",
    role: "admin",
    registeredAt: new Date().toISOString()
  }
];

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

const DEFAULT_PRODUCTS = [
  {
    id: 'prod_1',
    title: 'Personalized 3D Crystal LED Lamp',
    category: 'LED Lamps',
    originalPrice: 1999,
    currentPrice: 1499,
    rating: 4.9,
    reviewsCount: 128,
    image: '/assets/images/products/led_photo_lamp.jpg',
    inStock: true
  },
  {
    id: 'prod_2',
    title: 'Customized Engraved Wooden Frame',
    category: 'Frames',
    originalPrice: 1299,
    currentPrice: 899,
    rating: 4.8,
    reviewsCount: 95,
    image: '/assets/frame.png',
    inStock: true
  },
  {
    id: 'prod_3',
    title: 'Personalized Couples Photo Cushion',
    category: 'Cushions',
    originalPrice: 799,
    currentPrice: 599,
    rating: 4.7,
    reviewsCount: 64,
    image: '/assets/cushion.png',
    inStock: true
  }
];

export const initFirestoreDatabase = async () => {
  try {
    // 1. Seed Users Collection
    for (const u of DEFAULT_USERS) {
      const docId = u.email.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');
      await setDoc(doc(db, 'users', docId), u, { merge: true });
    }

    // 2. Seed Banners Collection
    for (const b of DEFAULT_BANNERS) {
      await setDoc(doc(db, 'banners', b.id), b, { merge: true });
    }

    // 3. Seed Products Collection
    for (const p of DEFAULT_PRODUCTS) {
      await setDoc(doc(db, 'products', p.id), p, { merge: true });
    }

    console.log("⚡ Firestore collections (users, banners, products) initialized!");
  } catch (err) {
    console.error("Firestore initialization notice:", err);
  }
};
