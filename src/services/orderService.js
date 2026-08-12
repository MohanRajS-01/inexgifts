import { db } from '../firebase';
import { collection, setDoc, getDocs, doc, query, where, updateDoc } from 'firebase/firestore';

const LOCAL_STORAGE_ORDERS_KEY = 'inex_placed_orders';

export const orderService = {
  // Get orders locally
  getLocalOrders: () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
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

    // Save to Firestore with explicit document ID and sync customer user document
    const saveToFirestore = async () => {
      try {
        await setDoc(doc(db, 'orders', newOrder.id), newOrder, { merge: true });
        console.log("⚡ Order written to Firestore successfully:", newOrder.id);

        if (newOrder.customerEmail) {
          const userDocId = newOrder.customerEmail.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');
          const userData = {
            name: newOrder.shippingAddress?.fullName || newOrder.customerEmail.split('@')[0],
            email: newOrder.customerEmail.trim().toLowerCase(),
            phone: newOrder.shippingAddress?.phone || '',
            address: newOrder.shippingAddress?.street || '',
            pincode: newOrder.shippingAddress?.pincode || '',
            role: newOrder.customerEmail.toLowerCase().includes('admin') ? 'admin' : 'customer',
            lastOrderAt: new Date().toISOString()
          };
          await setDoc(doc(db, 'users', userDocId), userData, { merge: true });
          console.log("⚡ Customer user document synced to Firestore 'users' collection:", userDocId);
        }
      } catch (e) {
        console.error("Could not save order to Firestore:", e);
      }
    };

    saveToFirestore();

    return newOrder;
  },

  // Get ALL orders for Admin Dashboard Management
  getAllOrders: async () => {
    let firestoreOrders = [];
    try {
      const snap = await getDocs(collection(db, 'orders'));
      if (!snap.empty) {
        firestoreOrders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (e) {
      console.warn("Firestore orders query fallback:", e.message);
    }
    const local = orderService.getLocalOrders();
    const combined = [...firestoreOrders, ...local];
    return Array.from(new Map(combined.map(o => [o.id, o])).values());
  },

  // Get orders STRICTLY belonging to the logged-in user email
  getOrders: async (userEmail = null) => {
    if (!userEmail) return [];

    const emailClean = userEmail.trim().toLowerCase();

    let firestoreOrders = [];
    try {
      const colRef = collection(db, 'orders');
      const q = query(colRef, where('customerEmail', '==', emailClean));
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

    // STRICT EMAIL FILTERING: Return ONLY orders belonging to this exact logged-in user email
    return uniqueOrders.filter(o => o.customerEmail && o.customerEmail.trim().toLowerCase() === emailClean);
  },

  // Clear local mock orders cache
  clearLocalOrdersCache: () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_ORDERS_KEY);
    } catch {}
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
