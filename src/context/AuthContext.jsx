import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

const DEFAULT_USERS = [
  {
    name: "Alex Morgan",
    phone: "9876543210",
    email: "user@example.com",
    password: "password123",
    role: "customer"
  },
  {
    name: "Mohan Raj (Admin)",
    phone: "9123456789",
    email: "admin@inexgifts.com",
    password: "admin123",
    role: "admin"
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('inex_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // Sync with Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const mappedUser = {
          uid: user.uid,
          name: user.displayName || user.email.split('@')[0],
          email: user.email,
          role: user.email.toLowerCase().includes('admin') ? 'admin' : 'customer'
        };
        setCurrentUser(mappedUser);
        localStorage.setItem('inex_current_user', JSON.stringify(mappedUser));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Register User -> Save to Firestore 'users' collection first with address and pincode
  const registerUser = async (name, email, phone, password, address = '', pincode = '') => {
    const emailClean = email.trim().toLowerCase();
    const newUser = {
      name,
      email: emailClean,
      phone,
      password,
      address: address || "123 Park Avenue, Block C",
      pincode: pincode || "600028",
      role: 'customer',
      registeredAt: new Date().toISOString()
    };

    // 1. Save to Firestore users collection
    try {
      const docId = emailClean.replace(/[^a-zA-Z0-9]/g, '_');
      await setDoc(doc(db, 'users', docId), newUser, { merge: true });
      console.log("⚡ Registered user written to Firestore:", docId);
    } catch (err) {
      console.error("Firestore user registration save error:", err);
    }

    // 2. Save to local registered users
    const existing = (() => {
      try {
        const s = localStorage.getItem('inex_registered_users');
        return s ? JSON.parse(s) : DEFAULT_USERS;
      } catch { return DEFAULT_USERS; }
    })();

    const updatedRegistered = [...existing.filter(u => u.email.toLowerCase() !== emailClean), newUser];
    localStorage.setItem('inex_registered_users', JSON.stringify(updatedRegistered));

    // Optional Firebase Auth account creation
    try {
      await createUserWithEmailAndPassword(auth, emailClean, password);
    } catch (e) {
      console.warn("Firebase Auth optional account creation:", e.message);
    }

    setCurrentUser(newUser);
    localStorage.setItem('inex_current_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  // Login Customer -> Check Firestore FIRST, allow login ONLY if registered!
  const loginCustomer = async (email, password) => {
    const emailClean = email.trim().toLowerCase();

    // 1. Check Firestore users collection FIRST
    let foundUser = null;
    try {
      const userDocRef = doc(db, 'users', emailClean);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        foundUser = userSnap.data();
      }
    } catch (e) {
      console.warn("Firestore user query fallback:", e.message);
    }

    // 2. Check local registered users if not found in Firestore snapshot
    if (!foundUser) {
      const registeredList = (() => {
        try {
          const s = localStorage.getItem('inex_registered_users');
          return s ? JSON.parse(s) : DEFAULT_USERS;
        } catch { return DEFAULT_USERS; }
      })();

      foundUser = registeredList.find(u => u.email.toLowerCase() === emailClean);
    }

    // 3. STRICT CHECK: Allow login ONLY after registration!
    if (!foundUser) {
      throw new Error("Account not registered! Please register your account first before logging in.");
    }

    // 4. Verify Password
    if (foundUser.password && foundUser.password !== password) {
      throw new Error("Incorrect password. Please try again.");
    }

    // Try signing in via Firebase Auth if enabled
    try {
      await signInWithEmailAndPassword(auth, emailClean, password);
    } catch (e) {
      console.warn("Firebase Auth sign in optional:", e.message);
    }

    const userObj = {
      name: foundUser.name || emailClean.split('@')[0],
      email: emailClean,
      phone: foundUser.phone || "9876543210",
      address: foundUser.address || "",
      pincode: foundUser.pincode || "",
      role: foundUser.role || (emailClean.includes('admin') ? 'admin' : 'customer')
    };

    setCurrentUser(userObj);
    localStorage.setItem('inex_current_user', JSON.stringify(userObj));
    return { success: true, user: userObj };
  };

  const loginAdmin = async (email, password) => {
    const emailClean = email.trim().toLowerCase();
    if (emailClean === "admin@inexgifts.com" && password === "admin123") {
      const adminUser = {
        name: "Admin Manager",
        email: emailClean,
        role: "admin"
      };
      setCurrentUser(adminUser);
      localStorage.setItem('inex_current_user', JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }
    
    return await loginCustomer(email, password);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
    setCurrentUser(null);
    localStorage.removeItem('inex_current_user');
  };

  const value = {
    currentUser,
    isAdmin: currentUser?.role === 'admin' || currentUser?.email?.toLowerCase().includes('admin'),
    loginCustomer,
    loginAdmin,
    registerUser,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
