import { db } from '../firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

export const userService = {
  // Get all real registered users strictly from Cloud Firestore 'users' collection & sync order stats
  getUsers: async () => {
    let firestoreUsers = [];
    let firestoreOrders = [];

    // 1. Fetch Users strictly from Cloud Firestore 'users' collection
    try {
      const usersSnap = await getDocs(collection(db, 'users'));
      if (!usersSnap.empty) {
        firestoreUsers = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (e) {
      console.warn("Firestore users query notice:", e.message);
    }

    // 2. Fetch Orders from Cloud Firestore 'orders' collection for order statistics
    try {
      const ordersSnap = await getDocs(collection(db, 'orders'));
      if (!ordersSnap.empty) {
        firestoreOrders = ordersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (e) {
      console.warn("Firestore orders query notice:", e.message);
    }

    // 3. Local storage registered users
    const localUsers = (() => {
      try {
        const s = localStorage.getItem('inex_registered_users');
        const parsed = s ? JSON.parse(s) : [];
        return parsed.filter(u => u && u.email && !u.email.includes('example.com'));
      } catch {
        return [];
      }
    })();

    // 4. Map user accounts strictly registered in Firestore / LocalStorage
    const userMap = new Map();

    const mergeUser = (u) => {
      if (!u.email || u.email.includes('example.com')) return;
      const key = u.email.trim().toLowerCase();
      const existing = userMap.get(key) || {
        name: 'Customer',
        email: key,
        phone: 'Not Provided',
        address: 'Not Provided',
        pincode: '',
        role: key.includes('admin') ? 'admin' : 'customer',
        registeredAt: 'Recently',
        ordersCount: 0,
        totalSpent: 0
      };

      if (u.name && u.name !== 'Customer') existing.name = u.name;
      if (u.phone && u.phone !== 'Not Provided') existing.phone = u.phone;
      if (u.address && u.address !== 'Not Provided') existing.address = u.address;
      if (u.pincode) existing.pincode = u.pincode;
      if (u.role) existing.role = u.role;
      if (u.registeredAt || u.createdAt) existing.registeredAt = u.registeredAt || u.createdAt;

      userMap.set(key, existing);
    };

    localUsers.forEach(mergeUser);
    firestoreUsers.forEach(mergeUser);

    // 5. Aggregate order statistics for registered users
    firestoreOrders.forEach(ord => {
      const email = ord.customerEmail ? ord.customerEmail.trim().toLowerCase() : null;
      if (email && userMap.has(email)) {
        const user = userMap.get(email);
        user.ordersCount += 1;
        user.totalSpent += Number(ord.totalAmount) || 0;
        if (ord.shippingAddress?.fullName && (user.name === 'Customer' || !user.name)) {
          user.name = ord.shippingAddress.fullName;
        }
        if (ord.shippingAddress?.phone && user.phone === 'Not Provided') {
          user.phone = ord.shippingAddress.phone;
        }
        if (ord.shippingAddress?.street && user.address === 'Not Provided') {
          user.address = ord.shippingAddress.street;
        }
        if (ord.shippingAddress?.pincode && !user.pincode) {
          user.pincode = ord.shippingAddress.pincode;
        }
      }
    });

    return Array.from(userMap.values());
  },

  // Subscribe to real-time users collection updates directly from Cloud Firestore
  subscribeUsers: (callback) => {
    userService.getUsers().then(callback);

    let unsub = () => {};
    try {
      unsub = onSnapshot(collection(db, 'users'), async () => {
        const latest = await userService.getUsers();
        callback(latest);
      });
    } catch (e) {
      console.warn("Firestore users subscription fallback:", e);
    }
    return unsub;
  }
};
