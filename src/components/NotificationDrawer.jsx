import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCheck } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";

export default function NotificationDrawer({ isOpen, onClose }) {
  const { notifications, markAllRead } = useNotifications();
  const panelRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      // Delay to avoid triggering on the opener button click
      setTimeout(() => document.addEventListener("mousedown", handleClick), 50);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          key="notification-drawer"
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="notif-drawer"
        >
          {/* Header */}
          <div className="notif-drawer-header">
            <div className="notif-drawer-title-row">
              <Bell className="w-4 h-4 text-primary" />
              <span className="notif-drawer-title">Notifications</span>
            </div>
            <button
              onClick={markAllRead}
              className="notif-mark-read-btn"
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark all read</span>
            </button>
          </div>

          {/* Notification List */}
          <ul className="notif-list">
            {notifications.map((n) => (
              <li key={n.id} className={`notif-item${n.read ? " notif-item--read" : ""}`}>
                <span className="notif-item-icon">{n.icon}</span>
                <div className="notif-item-body">
                  <p className="notif-item-title">{n.title}</p>
                  <p className="notif-item-message">{n.message}</p>
                  <p className="notif-item-time">{n.time}</p>
                </div>
                {!n.read && <span className="notif-unread-dot" />}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
