import { useState } from 'react';
import { orders } from '../data/orders';

export const useOrders = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    
    // Auto-remove toast after 2.5s
    setTimeout(() => {
      removeToast(id);
    }, 2500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.trim().toLowerCase();
    const tabMatch = activeTab === 'all' || order.status === activeTab;
    const searchMatch =
      !query ||
      order.product.toLowerCase().includes(query) ||
      order.id.toLowerCase().includes(query);
    return tabMatch && searchMatch;
  });

  return {
    orders,
    filteredOrders,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedOrder,
    setSelectedOrder,
    trackedOrder,
    setTrackedOrder,
    sidebarOpen,
    setSidebarOpen,
    searchActive,
    setSearchActive,
    toasts,
    addToast,
    removeToast,
  };
};
export default useOrders;
