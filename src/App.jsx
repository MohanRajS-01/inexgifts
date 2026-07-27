import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MyOrders from './pages/MyOrders';
import ProductDetails from './pages/ProductDetails';
import TrackOrder from './pages/TrackOrder';
import Header from './components/Header';

// Common Layout Wrapper
function Layout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

// Simple Placeholder components for other pages
function HomePlaceholder() {
  return (
    <div className="placeholder-page">
      <Header title="Home" />
      <div className="placeholder-card">
        <h3>Welcome to GiftShop!</h3>
        <p>Explore personalized and unique gifts for your loved ones.</p>
      </div>
    </div>
  );
}

function CategoriesPlaceholder() {
  return (
    <div className="placeholder-page">
      <Header title="Categories" />
      <div className="placeholder-card">
        <h3>Browse Categories</h3>
        <p>Explore our collection categorized by occasion, recipient, and gift types.</p>
      </div>
    </div>
  );
}

function GiftsPlaceholder() {
  return (
    <div className="placeholder-page">
      <Header title="Gift Collections" />
      <div className="placeholder-card">
        <h3>Special Gift Collections</h3>
        <p>Handpicked premium gift packages and hampers.</p>
      </div>
    </div>
  );
}

function ProfilePlaceholder() {
  return (
    <div className="placeholder-page">
      <Header title="User Profile" />
      <div className="placeholder-card">
        <h3>My Profile</h3>
        <p>Manage your account details, shipping addresses, and payment methods.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect Root to Orders dashboard */}
        <Route path="/" element={<Navigate to="/orders" replace />} />
        
        {/* Main Orders Page */}
        <Route
          path="/orders"
          element={
            <Layout>
              <MyOrders />
            </Layout>
          }
        />
        
        {/* View Details Page */}
        <Route
          path="/product-details/:id"
          element={
            <Layout>
              <ProductDetails />
            </Layout>
          }
        />
        
        {/* Track Shipment Page */}
        <Route
          path="/track-order/:id"
          element={
            <Layout>
              <TrackOrder />
            </Layout>
          }
        />
        
        {/* Other menu options placeholders */}
        <Route
          path="/home"
          element={
            <Layout>
              <HomePlaceholder />
            </Layout>
          }
        />
        <Route
          path="/categories"
          element={
            <Layout>
              <CategoriesPlaceholder />
            </Layout>
          }
        />
        <Route
          path="/gifts"
          element={
            <Layout>
              <GiftsPlaceholder />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <ProfilePlaceholder />
            </Layout>
          }
        />

        {/* Fallback to Orders dashboard */}
        <Route path="*" element={<Navigate to="/orders" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
