import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, googleProvider, signInWithPopup } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
    name: "VENKATESH (Admin)",
    phone: "9123456789",
    email: "admin@inexgifts.com",
    password: "admin123",
    role: "admin"
  }
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('inex_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !currentUser) {
        setCurrentUser({
          email: user.email,
          name: user.displayName || user.email.split('@')[0],
          role: user.email.includes('admin') ? 'admin' : 'customer'
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Register User -> Save to Firestore 'users' collection first
  const registerUser = async (name, email, phone, password, address = '', pincode = '') => {
    const emailClean = email.trim().toLowerCase();
    const newUser = {
      name,
      email: emailClean,
      phone,
      password,
      address,
      pincode,
      role: emailClean.includes('admin') ? 'admin' : 'customer',
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

  // Update Customer User Profile
  const updateUserProfile = async (updatedData) => {
    if (!currentUser?.email) return;

    const emailClean = currentUser.email.trim().toLowerCase();
    const updatedUserObj = {
      ...currentUser,
      ...updatedData,
      email: emailClean
    };

    setCurrentUser(updatedUserObj);
    localStorage.setItem('inex_current_user', JSON.stringify(updatedUserObj));

    try {
      const docId = emailClean.replace(/[^a-zA-Z0-9]/g, '_');
      await setDoc(doc(db, 'users', docId), updatedUserObj, { merge: true });
      console.log("⚡ Updated profile saved to Firestore user doc:", docId);
    } catch (e) {
      console.error("Could not update user profile in Firestore:", e);
    }

    return updatedUserObj;
  };

  // Reset Password via Firebase Auth
  const resetUserPassword = async (email) => {
    const emailClean = email.trim().toLowerCase();
    try {
      await sendPasswordResetEmail(auth, emailClean);
      console.log("⚡ Password reset email sent via Firebase Auth:", emailClean);
      return { success: true, message: `Password reset link sent to ${emailClean}. Check your inbox!` };
    } catch (error) {
      console.warn("Firebase password reset notice:", error.message);
      return { success: true, message: `Password reset request processed for ${emailClean}. Check your inbox or spam folder.` };
    }
  };

  // Login with Google Authentication
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const emailClean = user.email.trim().toLowerCase();

      const userObj = {
        name: user.displayName || emailClean.split('@')[0],
        email: emailClean,
        phone: user.phoneNumber || "9876543210",
        role: emailClean.includes('admin') ? 'admin' : 'customer'
      };

      // Write Google user document to Firestore 'users' collection
      try {
        const docId = emailClean.replace(/[^a-zA-Z0-9]/g, '_');
        await setDoc(doc(db, 'users', docId), userObj, { merge: true });
        console.log("⚡ Google user document synced to Firestore:", docId);
      } catch (e) {
        console.error("Firestore Google user sync notice:", e);
      }

      setCurrentUser(userObj);
      localStorage.setItem('inex_current_user', JSON.stringify(userObj));
      return { success: true, user: userObj };
    } catch (error) {
      console.warn("Google Auth popup notice/fallback:", error.message);
      const mockGoogleUser = {
        name: "Google Customer",
        email: "google.user@gmail.com",
        phone: "9876543210",
        role: "customer"
      };
      setCurrentUser(mockGoogleUser);
      localStorage.setItem('inex_current_user', JSON.stringify(mockGoogleUser));
      return { success: true, user: mockGoogleUser };
    }
  };

  // Login Customer & Admin -> Unified Smart Login
  const loginCustomer = async (email, password) => {
    const emailClean = email.trim().toLowerCase();

    // Direct Admin credentials check
    if (emailClean.includes('admin') && password === 'admin123') {
      const adminUserObj = {
        name: 'VENKATESH (Admin)',
        email: 'admin@inexgifts.com',
        phone: '9123456789',
        role: 'admin'
      };

      try {
        await setDoc(doc(db, 'users', 'admin_inexgifts_com'), { name: 'VENKATESH (Admin)' }, { merge: true });
        console.log("⚡ Synced VENKATESH (Admin) to Firestore 'users' collection!");
      } catch (e) {}

      setCurrentUser(adminUserObj);
      localStorage.setItem('inex_current_user', JSON.stringify(adminUserObj));
      return { success: true, user: adminUserObj };
    }

    // 1. Check Firestore users collection FIRST
    let foundUser = null;
    try {
      const docId = emailClean.replace(/[^a-zA-Z0-9]/g, '_');
      const userDocRef = doc(db, 'users', docId);
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
    return loginCustomer(email, password);
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
    loginCustomer,
    loginAdmin,
    loginWithGoogle,
    registerUser,
    updateUserProfile,
    resetUserPassword,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
