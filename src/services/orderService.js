import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc } from 'firebase/firestore';

const LOCAL_STORAGE_ORDERS_KEY = 'inex_customer_orders';

const DEFAULT_MOCK_ORDERS = [
  {
    id: 'ORD-9824',
    date: '2026-08-10',
    totalAmount: 1498,
    status: 'Processing',
    paymentMethod: 'UPI / Online Payment',
    customerEmail: 'user@example.com',
    shippingAddress: {
      fullName: 'Alex Morgan',
      phone: '9876543210',
      street: '123 Park Avenue, Block C',
      city: 'Chennai',
      pincode: '600028'
    },
    items: [
      {
        id: 'led_lamp',
        title: 'LED Photo Lamp',
        quantity: 1,
        currentPrice: 999,
        image: '/LEDphoto.jpg'
      },
      {
        id: 'cushion',
        title: 'Customized Cushion',
        quantity: 1,
        currentPrice: 499,
        image: '/Customcushion.jpg'
      }
    ]
  },
  {
    id: 'ORD-7612',
    date: '2026-08-01',
    totalAmount: 679,
    status: 'Delivered',
    paymentMethod: 'Cash on Delivery',
    customerEmail: 'user@example.com',
    shippingAddress: {
      fullName: 'Alex Morgan',
      phone: '9876543210',
      street: '123 Park Avenue, Block C',
      city: 'Chennai',
      pincode: '600028'
    },
    items: [
      {
        id: 'frame',
        title: 'Collage Photo Frame',
        quantity: 1,
        currentPrice: 679,
        image: '/Customized.jpg'
      }
    ]
  }
];

export const orderService = {
  // Get orders locally
  getLocalOrders: () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_MOCK_ORDERS;
    } catch {
      return DEFAULT_MOCK_ORDERS;
    }
  },

  // Save orders locally
  saveOrdersLocally: (orders) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
      window.dispatchEvent(new CustomEvent('inex_orders_updated', { detail: orders }));
    } catch (e) {
      console.error('Error saving orders locally:', e);
    }
  },

  // Place a new order
  createOrder: async (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-GB'),
      status: 'Processing',
      ...orderData
    };

    const existing = orderService.getLocalOrders();
    const updated = [newOrder, ...existing];
    orderService.saveOrdersLocally(updated);

    // Save to Firestore with explicit document ID
    const saveToFirestore = async () => {
      try {
        await setDoc(doc(db, 'orders', newOrder.id), newOrder, { merge: true });
        console.log("⚡ Order written to Firestore successfully:", newOrder.id);
      } catch (e) {
        console.error("Could not save order to Firestore:", e);
      }
    };

    saveToFirestore();

    return newOrder;
  },

  // Get orders strictly filtered by logged-in user email (Admin sees all)
  getOrders: async (userEmail = null) => {
    if (!userEmail) return [];

    const emailClean = userEmail.trim().toLowerCase();

    let firestoreOrders = [];
    try {
      const colRef = collection(db, 'orders');
      let q;
      if (emailClean.includes('admin')) {
        q = query(colRef);
      } else {
        q = query(colRef, where('customerEmail', '==', emailClean));
      }
      const snap = await getDocs(q);
      if (!snap.empty) {
        firestoreOrders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (e) {
      console.warn("Firestore orders query fallback:", e.message);
    }

    const local = orderService.getLocalOrders();

    // Combine Firestore & local orders without duplicates
    const combined = [...firestoreOrders, ...local];
    const uniqueOrders = Array.from(new Map(combined.map(o => [o.id, o])).values());

    if (emailClean.includes('admin')) {
      return uniqueOrders;
    }

    // STRICT EMAIL FILTERING: Only return orders belonging to this exact email
    return uniqueOrders.filter(o => o.customerEmail && o.customerEmail.trim().toLowerCase() === emailClean);
  },

  // Update order status (Admin operation)
  updateOrderStatus: async (orderId, newStatus) => {
    const orders = orderService.getLocalOrders();
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    orderService.saveOrdersLocally(updated);

    try {
      const docRef = doc(db, 'orders', orderId);
      await updateDoc(docRef, { status: newStatus });
    } catch (e) {
      console.warn("Could not update order status in Firestore:", e);
    }

    return updated;
  }
};
