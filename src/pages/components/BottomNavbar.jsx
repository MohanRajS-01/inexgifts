// BottomNavbar — delegates to the app's existing MobileBottomNav or renders nothing.
// CartPage calls this; on the main app the real bottom nav is already rendered by App.jsx.
// We render null here to avoid double-rendering the bottom nav.
import React from 'react';

const BottomNavbar = ({ activeNav, onNavChange }) => {
    // The main app already renders MobileBottomNav. Rendering null prevents duplication.
    return null;
};

export default BottomNavbar;
