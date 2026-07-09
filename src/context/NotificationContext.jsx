import React, { createContext, useContext, useState, useCallback } from "react";

const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    icon: "📦",
    title: "Order Shipped!",
    message: "Your order has been shipped.",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    icon: "🎁",
    title: "Special Offer",
    message: "20% OFF on personalized gifts.",
    time: "1 hr ago",
    read: false,
  },
  {
    id: 3,
    icon: "💍",
    title: "New Collection",
    message: "New Anniversary Collection available.",
    time: "3 hr ago",
    read: false,
  },
];

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used inside NotificationProvider");
  return ctx;
}
