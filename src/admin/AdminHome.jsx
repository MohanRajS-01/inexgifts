import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  LayoutGrid,
  Users,
  Package,
  FolderTree,
  ShoppingCart,
  Gift,
  Boxes,
  BarChart3,
  Ticket,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Filter,
  Image as ImageIcon,
  Star,
  Menu,
  ShieldCheck,
  KeyRound,
  UserCircle2,
  PackageCheck,
  PackageX,
  PackageSearch,
  Sparkles,
} from "lucide-react";

/* ============================================================================
   AdminHome — single-file Admin Module for INEX Gifts
   ----------------------------------------------------------------------------
   Everything (Dashboard, Users, Products, Categories, Orders, Gifts,
   Inventory, Reports, Coupons, Settings) lives inside this one component,
   switched via an internal sidebar + tab system. All data is local demo
   state so every button, search box, filter and form performs a real
   (in-memory) action with success/error feedback — nothing is a dead link.
   ============================================================================ */

/* --------------------------------- Demo data -------------------------------- */

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "users", label: "Users", icon: Users },
  { key: "products", label: "Products", icon: Package },
  { key: "categories", label: "Categories", icon: FolderTree },
  { key: "orders", label: "Orders", icon: ShoppingCart },
  { key: "gifts", label: "Gift Management", icon: Gift },
  { key: "inventory", label: "Inventory", icon: Boxes },
  { key: "reports", label: "Sales Reports", icon: BarChart3 },
  { key: "coupons", label: "Coupons", icon: Ticket },
  { key: "settings", label: "Settings", icon: Settings },
];

const seedUsers = [
  { id: "U-1001", name: "Ananya Rao", email: "ananya.rao@gmail.com", phone: "+91 98450 11223", joined: "2026-02-14", orders: 12, status: "Active" },
  { id: "U-1002", name: "Karthik Subramaniam", email: "karthik.s@gmail.com", phone: "+91 90031 44556", joined: "2026-03-02", orders: 4, status: "Active" },
  { id: "U-1003", name: "Meera Nair", email: "meera.nair@yahoo.com", phone: "+91 88221 99887", joined: "2026-01-22", orders: 27, status: "Active" },
  { id: "U-1004", name: "Rohit Verma", email: "rohit.verma@outlook.com", phone: "+91 97123 55667", joined: "2025-12-09", orders: 0, status: "Inactive" },
  { id: "U-1005", name: "Divya Iyer", email: "divya.iyer@gmail.com", phone: "+91 89991 22334", joined: "2026-04-18", orders: 8, status: "Active" },
  { id: "U-1006", name: "Sanjay Mehta", email: "sanjay.mehta@gmail.com", phone: "+91 99887 66554", joined: "2026-05-01", orders: 2, status: "Active" },
  { id: "U-1007", name: "Priya Balaji", email: "priya.balaji@gmail.com", phone: "+91 90112 33445", joined: "2025-11-27", orders: 15, status: "Inactive" },
  { id: "U-1008", name: "Arjun Nambiar", email: "arjun.n@gmail.com", phone: "+91 98123 44556", joined: "2026-06-06", orders: 1, status: "Active" },
];

const seedCategories = [
  { id: "C-01", name: "Personalized Mugs", image: "🥤", products: 42, status: "Active" },
  { id: "C-02", name: "Photo Frames", image: "🖼️", products: 31, status: "Active" },
  { id: "C-03", name: "Anniversary Gifts", image: "💐", products: 58, status: "Active" },
  { id: "C-04", name: "Keychains", image: "🔑", products: 19, status: "Active" },
  { id: "C-05", name: "Birthday Hampers", image: "🎂", products: 27, status: "Inactive" },
  { id: "C-06", name: "Corporate Gifting", image: "💼", products: 12, status: "Active" },
];

const seedProducts = [
  { id: "P-2001", name: "Together Forever Mug", category: "Personalized Mugs", price: 499, stock: 128, status: "Active", image: "☕" },
  { id: "P-2002", name: "You & Me Photo Frame", category: "Photo Frames", price: 899, stock: 42, status: "Active", image: "🖼️" },
  { id: "P-2003", name: "Rose Bouquet Box", category: "Anniversary Gifts", price: 1299, stock: 0, status: "Active", image: "🌹" },
  { id: "P-2004", name: "Couple Photo Keychain", category: "Keychains", price: 349, stock: 8, status: "Active", image: "🔑" },
  { id: "P-2005", name: "Birthday Surprise Hamper", category: "Birthday Hampers", price: 1999, stock: 15, status: "Inactive" , image: "🎁"},
  { id: "P-2006", name: "Engraved Wooden Frame", category: "Photo Frames", price: 749, stock: 63, status: "Active", image: "🪵" },
  { id: "P-2007", name: "Corporate Gift Combo", category: "Corporate Gifting", price: 2499, stock: 6, status: "Active", image: "💼" },
  { id: "P-2008", name: "LED Photo Lamp", category: "Anniversary Gifts", price: 999, stock: 3, status: "Active", image: "💡" },
];

const seedOrders = [
  { id: "ORD-9001", customer: "Ananya Rao", products: "Together Forever Mug ×1", amount: 499, payment: "Paid", order: "Processing", delivery: "Pending", date: "2026-07-14" },
  { id: "ORD-9002", customer: "Karthik Subramaniam", products: "Photo Frame ×2", amount: 1798, payment: "Paid", order: "Shipped", delivery: "In Transit", date: "2026-07-13" },
  { id: "ORD-9003", customer: "Meera Nair", products: "Rose Bouquet Box ×1", amount: 1299, payment: "Pending", order: "Confirmed", delivery: "Pending", date: "2026-07-13" },
  { id: "ORD-9004", customer: "Divya Iyer", products: "Keychain ×3", amount: 1047, payment: "Paid", order: "Delivered", delivery: "Delivered", date: "2026-07-11" },
  { id: "ORD-9005", customer: "Sanjay Mehta", products: "Birthday Hamper ×1", amount: 1999, payment: "Paid", order: "Delivered", delivery: "Delivered", date: "2026-07-10" },
  { id: "ORD-9006", customer: "Priya Balaji", products: "Wooden Frame ×1", amount: 749, payment: "Failed", order: "Cancelled", delivery: "Cancelled", date: "2026-07-09" },
  { id: "ORD-9007", customer: "Arjun Nambiar", products: "LED Photo Lamp ×1", amount: 999, payment: "Paid", order: "Processing", delivery: "Pending", date: "2026-07-15" },
];

const seedGifts = [
  { id: "G-01", name: "Anniversary Surprise Box", type: "Special Gift", price: 1499, active: true },
  { id: "G-02", name: "New Baby Gift Set", type: "Occasion Gift", price: 1899, active: true },
  { id: "G-03", name: "Festive Sweets Hamper", type: "Seasonal Offer", price: 899, active: false },
  { id: "G-04", name: "Corporate Diwali Combo", type: "Corporate Gift", price: 2999, active: true },
];

const seedCoupons = [
  { id: "CP-01", code: "WELCOME10", discount: "10%", usage: 342, limit: 1000, active: true },
  { id: "CP-02", code: "FEST25", discount: "25%", usage: 890, limit: 1000, active: true },
  { id: "CP-03", code: "FREESHIP", discount: "Free Shipping", usage: 1210, limit: 1500, active: true },
  { id: "CP-04", code: "SUMMER50", discount: "₹50 off", usage: 56, limit: 500, active: false },
];

const monthlySales = [
  { m: "Feb", v: 42 }, { m: "Mar", v: 58 }, { m: "Apr", v: 51 }, { m: "May", v: 67 },
  { m: "Jun", v: 74 }, { m: "Jul", v: 88 },
];

const salesByCategory = [
  { name: "Anniversary Gifts", value: 34, color: "#7c3aed" },
  { name: "Photo Frames", value: 24, color: "#a855f7" },
  { name: "Mugs", value: 20, color: "#c084fc" },
  { name: "Keychains", value: 12, color: "#e9d5ff" },
  { name: "Other", value: 10, color: "#f3e8ff" },
];

const uid = (prefix) => `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
const currency = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

/* --------------------------------- Small UI atoms --------------------------------- */

function Toast({ toast }) {
  if (!toast) return null;
  const Icon = toast.type === "success" ? CheckCircle2 : AlertTriangle;
  return (
    <div className="ah-toast-wrap">
      <div className={`ah-toast ${toast.type}`}>
        <Icon size={16} /> {toast.message}
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    Active: { bg: "#ecfdf5", fg: "#059669" },
    Inactive: { bg: "#fef2f2", fg: "#dc2626" },
    Paid: { bg: "#ecfdf5", fg: "#059669" },
    Pending: { bg: "#fffbeb", fg: "#d97706" },
    Failed: { bg: "#fef2f2", fg: "#dc2626" },
    Processing: { bg: "#eff6ff", fg: "#2563eb" },
    Confirmed: { bg: "#f5f3ff", fg: "#7c3aed" },
    Shipped: { bg: "#eef2ff", fg: "#4f46e5" },
    Delivered: { bg: "#ecfdf5", fg: "#059669" },
    Cancelled: { bg: "#fef2f2", fg: "#dc2626" },
    "In Transit": { bg: "#eff6ff", fg: "#2563eb" },
  };
  const c = map[status] || { bg: "#f3f4f6", fg: "#374151" };
  return (
    <span className="ah-pill" style={{ background: c.bg, color: c.fg }}>
      {status}
    </span>
  );
}

function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="ah-modal-overlay" onClick={onCancel}>
      <div className="ah-modal-card ah-modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="ah-modal-icon-warn"><AlertTriangle size={22} /></div>
        <h3 className="ah-modal-title" style={{ textAlign: "center" }}>{title}</h3>
        <p className="ah-modal-sub" style={{ textAlign: "center" }}>{message}</p>
        <div className="ah-modal-actions">
          <button className="ah-btn ah-btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="ah-btn ah-btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function Modal({ open, title, onClose, children, width = 480 }) {
  if (!open) return null;
  return (
    <div className="ah-modal-overlay" onClick={onClose}>
      <div className="ah-modal-card" style={{ maxWidth: width }} onClick={(e) => e.stopPropagation()}>
        <div className="ah-modal-head">
          <h3 className="ah-modal-title">{title}</h3>
          <button className="ah-icon-btn" onClick={onClose}><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div className="ah-form-field">
      <label>{label}</label>
      {children}
    </div>
  );
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="ah-pagination">
      <button className="ah-page-btn" disabled={page === 1} onClick={() => onChange(page - 1)}>
        <ChevronLeft size={15} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button key={p} className={`ah-page-btn ${p === page ? "active" : ""}`} onClick={() => onChange(p)}>
          {p}
        </button>
      ))}
      <button className="ah-page-btn" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

function EmptyState({ label }) {
  return (
    <div className="ah-empty">
      <PackageSearch size={30} />
      <p>{label}</p>
    </div>
  );
}

/* Tiny dependency-free bar / line / donut charts (SVG) so the module has
   zero extra runtime dependencies. */

function MiniBarChart({ data }) {
  const max = Math.max(...data.map((d) => d.v));
  return (
    <div className="ah-bar-chart">
      {data.map((d) => (
        <div key={d.m} className="ah-bar-col">
          <div className="ah-bar-track">
            <div className="ah-bar-fill" style={{ height: `${(d.v / max) * 100}%` }} title={`${d.m}: ${d.v}`} />
          </div>
          <span>{d.m}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data, size = 150 }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const r = size / 2;
  const stroke = size * 0.16;
  const radius = r - stroke / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${r} ${r})`}>
          <circle cx={r} cy={r} r={radius} fill="none" stroke="#f3effe" strokeWidth={stroke} />
          {data.map((d, i) => {
            const frac = d.value / total;
            const dash = frac * circumference;
            const offset = cumulative * circumference;
            cumulative += frac;
            return (
              <circle
                key={i}
                cx={r} cy={r} r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
          })}
        </g>
        <text x="50%" y="48%" textAnchor="middle" fontSize="20" fontWeight="800" fill="#1e1b4b">{total}%</text>
        <text x="50%" y="62%" textAnchor="middle" fontSize="9.5" fill="#8b85b8">of sales</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.map((d) => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5 }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: d.color, display: "inline-block" }} />
            <span style={{ color: "#463f6b" }}>{d.name}</span>
            <span style={{ marginLeft: "auto", fontWeight: 700, color: "#1e1b4b" }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
   MAIN COMPONENT
   ============================================================================ */

export default function AdminHome({ adminEmail = "admin@inexgifts.com", onLogout = () => {} }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const [toast, setToast] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");

  const notifyTimer = useRef(null);
  const notify = (message, type = "success") => {
    setToast({ message, type });
    clearTimeout(notifyTimer.current);
    notifyTimer.current = setTimeout(() => setToast(null), 2600);
  };

  useEffect(() => () => clearTimeout(notifyTimer.current), []);

  const todayLabel = useMemo(
    () => new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    []
  );

  const activeNav = NAV_ITEMS.find((n) => n.key === activeTab);

  return (
    <div className="ah-root">
      <GlobalStyles />
      <Toast toast={toast} />

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && <div className="ah-backdrop" onClick={() => setSidebarOpen(false)} />}

      {/* ---------------- Sidebar ---------------- */}
      <aside className={`ah-sidebar ${sidebarOpen ? "open" : ""} ${collapsed ? "collapsed" : ""}`}>
        <div className="ah-sidebar-brand">
          <div className="ah-brand-icon"><Sparkles size={18} color="#fff" /></div>
          {!collapsed && (
            <div>
              <div className="ah-brand-name">INEX Gifts</div>
              <div className="ah-brand-sub">Admin Console</div>
            </div>
          )}
          <button className="ah-icon-btn ah-mobile-only" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="ah-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.key;
            return (
              <button
                key={item.key}
                className={`ah-nav-item ${active ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(item.key);
                  setSidebarOpen(false);
                }}
                title={item.label}
              >
                <span className="ah-nav-icon"><Icon size={18} /></span>
                {!collapsed && <span>{item.label}</span>}
                {active && <span className="ah-nav-active-dot" />}
              </button>
            );
          })}
        </nav>

        <div className="ah-sidebar-footer">
          <button
            className="ah-nav-item logout"
            onClick={() => {
              notify("Signed out successfully.");
              setTimeout(() => onLogout(), 500);
            }}
          >
            <span className="ah-nav-icon"><LogOut size={18} /></span>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        <button className="ah-collapse-btn ah-desktop-only" onClick={() => setCollapsed((c) => !c)}>
          <ChevronLeft size={15} style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
        </button>
      </aside>

      {/* ---------------- Main column ---------------- */}
      <div className="ah-main">
        {/* Header */}
        <header className="ah-header">
          <button className="ah-icon-btn ah-mobile-only" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>

          <div className="ah-header-title">
            <h1>{activeNav?.label}</h1>
            <span className="ah-header-date"><Clock size={13} /> {todayLabel}</span>
          </div>

          <div className="ah-header-search">
            <Search size={16} color="#9088b8" />
            <input
              placeholder="Search orders, users, products…"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && globalSearch.trim()) {
                  notify(`Showing results for "${globalSearch.trim()}"`);
                }
              }}
            />
          </div>

          <div className="ah-header-actions">
            <div className="ah-header-icon-wrap">
              <button className="ah-icon-btn" onClick={() => { setNotifOpen((o) => !o); setProfileMenuOpen(false); }}>
                <Bell size={19} />
                <span className="ah-notif-dot" />
              </button>
              {notifOpen && (
                <div className="ah-dropdown ah-notif-dropdown">
                  <div className="ah-dropdown-head">Notifications</div>
                  {[
                    { t: "Low stock alert", d: "LED Photo Lamp has only 3 units left.", i: AlertTriangle, c: "#d97706" },
                    { t: "New order received", d: "ORD-9007 placed by Arjun Nambiar.", i: ShoppingCart, c: "#4f46e5" },
                    { t: "Coupon expiring soon", d: "SUMMER50 usage window closes in 2 days.", i: Ticket, c: "#7c3aed" },
                  ].map((n, i) => {
                    const NIcon = n.i;
                    return (
                      <div key={i} className="ah-notif-item">
                        <span className="ah-notif-icon" style={{ color: n.c }}><NIcon size={15} /></span>
                        <div>
                          <div className="ah-notif-title">{n.t}</div>
                          <div className="ah-notif-desc">{n.d}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="ah-header-icon-wrap">
              <button className="ah-profile-btn" onClick={() => { setProfileMenuOpen((o) => !o); setNotifOpen(false); }}>
                <span className="ah-avatar">{adminEmail.charAt(0).toUpperCase()}</span>
                <span className="ah-desktop-only" style={{ fontSize: 13.5, fontWeight: 600 }}>Admin</span>
                <ChevronDown size={14} />
              </button>
              {profileMenuOpen && (
                <div className="ah-dropdown ah-profile-dropdown">
                  <div className="ah-profile-dropdown-head">
                    <span className="ah-avatar lg">{adminEmail.charAt(0).toUpperCase()}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5 }}>Store Admin</div>
                      <div style={{ fontSize: 12, color: "#8b85b8" }}>{adminEmail}</div>
                    </div>
                  </div>
                  <button className="ah-dropdown-item" onClick={() => { setActiveTab("settings"); setProfileMenuOpen(false); }}>
                    <UserCircle2 size={15} /> Edit Profile
                  </button>
                  <button className="ah-dropdown-item" onClick={() => { setActiveTab("settings"); setProfileMenuOpen(false); }}>
                    <KeyRound size={15} /> Change Password
                  </button>
                  <button className="ah-dropdown-item danger" onClick={() => { notify("Signed out successfully."); setTimeout(() => onLogout(), 500); }}>
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="ah-content">
          {activeTab === "dashboard" && <DashboardSection notify={notify} setActiveTab={setActiveTab} />}
          {activeTab === "users" && <UsersSection notify={notify} />}
          {activeTab === "products" && <ProductsSection notify={notify} />}
          {activeTab === "categories" && <CategoriesSection notify={notify} />}
          {activeTab === "orders" && <OrdersSection notify={notify} />}
          {activeTab === "gifts" && <GiftsSection notify={notify} />}
          {activeTab === "inventory" && <InventorySection notify={notify} />}
          {activeTab === "reports" && <ReportsSection notify={notify} />}
          {activeTab === "coupons" && <CouponsSection notify={notify} />}
          {activeTab === "settings" && <SettingsSection notify={notify} adminEmail={adminEmail} />}
        </main>
      </div>
    </div>
  );
}

/* ============================================================================
   DASHBOARD
   ============================================================================ */

function DashboardSection({ notify, setActiveTab }) {
  const stats = [
    { label: "Total Users", value: "8,214", delta: "+4.2%", up: true, icon: Users, tint: "#eef2ff", fg: "#4f46e5" },
    { label: "Total Products", value: "1,048", delta: "+1.8%", up: true, icon: Package, tint: "#f5f3ff", fg: "#7c3aed" },
    { label: "Categories", value: "24", delta: "+2", up: true, icon: FolderTree, tint: "#fdf4ff", fg: "#a21caf" },
    { label: "Orders", value: "3,562", delta: "+6.4%", up: true, icon: ShoppingCart, tint: "#eff6ff", fg: "#2563eb" },
    { label: "Revenue", value: currency(1284500), delta: "+9.1%", up: true, icon: DollarSign, tint: "#ecfdf5", fg: "#059669" },
    { label: "Pending Orders", value: "58", delta: "-3.1%", up: false, icon: Clock, tint: "#fffbeb", fg: "#d97706" },
    { label: "Completed Orders", value: "3,244", delta: "+5.0%", up: true, icon: CheckCircle2, tint: "#ecfdf5", fg: "#059669" },
    { label: "Low Stock", value: "12", delta: "+3", up: false, icon: AlertTriangle, tint: "#fef2f2", fg: "#dc2626" },
  ];

  return (
    <div className="ah-stack">
      <div className="ah-stats-grid">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div className="ah-stat-card" key={s.label}>
              <div className="ah-stat-icon" style={{ background: s.tint, color: s.fg }}><Icon size={19} /></div>
              <div className="ah-stat-value">{s.value}</div>
              <div className="ah-stat-label">{s.label}</div>
              <div className={`ah-stat-delta ${s.up ? "up" : "down"}`}>
                {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {s.delta} this month
              </div>
            </div>
          );
        })}
      </div>

      <div className="ah-grid-2">
        <div className="ah-card">
          <div className="ah-card-head">
            <h3>Sales Overview</h3>
            <span className="ah-card-tag">Last 6 months</span>
          </div>
          <MiniBarChart data={monthlySales} />
        </div>
        <div className="ah-card">
          <div className="ah-card-head">
            <h3>Sales by Category</h3>
          </div>
          <DonutChart data={salesByCategory} />
        </div>
      </div>

      <div className="ah-grid-3">
        <div className="ah-card">
          <div className="ah-card-head">
            <h3>Recent Orders</h3>
            <button className="ah-link-btn" onClick={() => setActiveTab("orders")}>View all</button>
          </div>
          <div className="ah-mini-list">
            {seedOrders.slice(0, 5).map((o) => (
              <div key={o.id} className="ah-mini-row">
                <div>
                  <div className="ah-mini-title">{o.id}</div>
                  <div className="ah-mini-sub">{o.customer}</div>
                </div>
                <StatusPill status={o.order} />
              </div>
            ))}
          </div>
        </div>

        <div className="ah-card">
          <div className="ah-card-head">
            <h3>Recent Users</h3>
            <button className="ah-link-btn" onClick={() => setActiveTab("users")}>View all</button>
          </div>
          <div className="ah-mini-list">
            {seedUsers.slice(0, 5).map((u) => (
              <div key={u.id} className="ah-mini-row">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="ah-avatar sm">{u.name.charAt(0)}</span>
                  <div>
                    <div className="ah-mini-title">{u.name}</div>
                    <div className="ah-mini-sub">{u.orders} orders</div>
                  </div>
                </div>
                <StatusPill status={u.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="ah-card">
          <div className="ah-card-head">
            <h3>Top Selling Products</h3>
            <button className="ah-link-btn" onClick={() => setActiveTab("products")}>View all</button>
          </div>
          <div className="ah-mini-list">
            {seedProducts.slice(0, 5).map((p, idx) => (
              <div key={p.id} className="ah-mini-row">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="ah-rank">{idx + 1}</span>
                  <div>
                    <div className="ah-mini-title">{p.name}</div>
                    <div className="ah-mini-sub">{currency(p.price)}</div>
                  </div>
                </div>
                <span style={{ fontSize: 12, color: "#8b85b8", display: "flex", alignItems: "center", gap: 4 }}>
                  <Star size={12} fill="#f59e0b" color="#f59e0b" /> {(4.9 - idx * 0.15).toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ah-card">
        <div className="ah-card-head"><h3>Quick Actions</h3></div>
        <div className="ah-quick-actions">
          <button className="ah-quick-btn" onClick={() => { setActiveTab("products"); notify("Opened product creation."); }}>
            <Plus size={16} /> Add Product
          </button>
          <button className="ah-quick-btn" onClick={() => { setActiveTab("coupons"); notify("Opened coupon creation."); }}>
            <Ticket size={16} /> Create Coupon
          </button>
          <button className="ah-quick-btn" onClick={() => { setActiveTab("orders"); notify("Opened orders list."); }}>
            <ShoppingCart size={16} /> Manage Orders
          </button>
          <button className="ah-quick-btn" onClick={() => { setActiveTab("reports"); notify("Opened sales reports."); }}>
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   USERS
   ============================================================================ */

function UsersSection({ notify }) {
  const [users, setUsers] = useState(seedUsers);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null); // { mode: 'add'|'edit', data }
  const [confirmDelete, setConfirmDelete] = useState(null);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesQuery =
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase()) ||
        u.id.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || u.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [users, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => setPage(1), [query, statusFilter]);

  const saveUser = (form) => {
    if (!form.name.trim() || !form.email.trim()) {
      notify("Name and email are required.", "error");
      return;
    }
    if (modal.mode === "add") {
      setUsers((prev) => [{ id: uid("U"), joined: new Date().toISOString().slice(0, 10), orders: 0, status: "Active", ...form }, ...prev]);
      notify("User added successfully.");
    } else {
      setUsers((prev) => prev.map((u) => (u.id === modal.data.id ? { ...u, ...form } : u)));
      notify("User updated successfully.");
    }
    setModal(null);
  };

  const toggleStatus = (u) => {
    setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, status: x.status === "Active" ? "Inactive" : "Active" } : x)));
    notify(`${u.name} is now ${u.status === "Active" ? "Inactive" : "Active"}.`);
  };

  const deleteUser = () => {
    setUsers((prev) => prev.filter((u) => u.id !== confirmDelete.id));
    notify("User deleted.");
    setConfirmDelete(null);
  };

  return (
    <div className="ah-stack">
      <div className="ah-toolbar">
        <div className="ah-search-box">
          <Search size={15} color="#9088b8" />
          <input placeholder="Search users by name, email, ID…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="ah-filter-select">
          <Filter size={14} color="#9088b8" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <button className="ah-btn ah-btn-primary" onClick={() => setModal({ mode: "add", data: { name: "", email: "", phone: "" } })}>
          <Plus size={16} /> Add User
        </button>
      </div>

      <div className="ah-card ah-table-card">
        <div className="ah-table-scroll">
          <table className="ah-table">
            <thead>
              <tr>
                <th>User</th><th>Email</th><th>Phone</th><th>Joined</th><th>Orders</th><th>Status</th><th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((u) => (
                <tr key={u.id}>
                  <td data-label="User">
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="ah-avatar sm">{u.name.charAt(0)}</span>
                      <div>
                        <div style={{ fontWeight: 600 }}>{u.name}</div>
                        <div style={{ fontSize: 12, color: "#9088b8" }}>{u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td data-label="Email">{u.email}</td>
                  <td data-label="Phone">{u.phone}</td>
                  <td data-label="Joined">{u.joined}</td>
                  <td data-label="Orders">{u.orders}</td>
                  <td data-label="Status">
                    <button className="ah-pill-btn" onClick={() => toggleStatus(u)}>
                      <StatusPill status={u.status} />
                    </button>
                  </td>
                  <td data-label="Actions">
                    <div className="ah-row-actions">
                      <button className="ah-icon-btn" onClick={() => setModal({ mode: "edit", data: u })}><Pencil size={15} /></button>
                      <button className="ah-icon-btn danger" onClick={() => setConfirmDelete(u)}><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paged.length === 0 && <EmptyState label="No users match your search." />}
        </div>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>

      <Modal open={!!modal} title={modal?.mode === "add" ? "Add User" : "Edit User"} onClose={() => setModal(null)}>
        {modal && <UserForm initial={modal.data} onCancel={() => setModal(null)} onSave={saveUser} />}
      </Modal>

      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete this user?"
        message={`${confirmDelete?.name} will be permanently removed from your customer list.`}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={deleteUser}
      />
    </div>
  );
}

function UserForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState({ name: initial.name || "", email: initial.email || "", phone: initial.phone || "" });
  return (
    <div className="ah-modal-body">
      <FormField label="Full Name">
        <input className="ah-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Ananya Rao" />
      </FormField>
      <FormField label="Email Address">
        <input className="ah-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@example.com" />
      </FormField>
      <FormField label="Phone Number">
        <input className="ah-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 90000 00000" />
      </FormField>
      <div className="ah-modal-actions">
        <button className="ah-btn ah-btn-ghost" onClick={onCancel}>Cancel</button>
        <button className="ah-btn ah-btn-primary" onClick={() => onSave(form)}><Check size={15} /> Save</button>
      </div>
    </div>
  );
}

/* ============================================================================
   PRODUCTS
   ============================================================================ */

function ProductsSection({ notify }) {
  const [products, setProducts] = useState(seedProducts);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const categories = ["All", ...Array.from(new Set(seedProducts.map((p) => p.category)))];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const q = p.name.toLowerCase().includes(query.toLowerCase());
      const c = categoryFilter === "All" || p.category === categoryFilter;
      return q && c;
    });
  }, [products, query, categoryFilter]);

  useEffect(() => setPage(1), [query, categoryFilter]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const saveProduct = (form) => {
    if (!form.name.trim() || !form.price || !form.category) {
      notify("Name, category and price are required.", "error");
      return;
    }
    if (modal.mode === "add") {
      setProducts((prev) => [{ id: uid("P"), status: "Active", ...form }, ...prev]);
      notify("Product added successfully.");
    } else {
      setProducts((prev) => prev.map((p) => (p.id === modal.data.id ? { ...p, ...form } : p)));
      notify("Product updated successfully.");
    }
    setModal(null);
  };

  const deleteProduct = () => {
    setProducts((prev) => prev.filter((p) => p.id !== confirmDelete.id));
    notify("Product deleted.");
    setConfirmDelete(null);
  };

  const toggleStatus = (p) => {
    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, status: x.status === "Active" ? "Inactive" : "Active" } : x)));
    notify(`${p.name} marked ${p.status === "Active" ? "Inactive" : "Active"}.`);
  };

  return (
    <div className="ah-stack">
      <div className="ah-toolbar">
        <div className="ah-search-box">
          <Search size={15} color="#9088b8" />
          <input placeholder="Search products…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="ah-filter-select">
          <Filter size={14} color="#9088b8" />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <button className="ah-btn ah-btn-primary" onClick={() => setModal({ mode: "add", data: { name: "", category: categories[1] || "", price: "", stock: "", image: "🎁" } })}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="ah-product-grid">
        {paged.map((p) => (
          <div key={p.id} className="ah-product-card">
            <div className="ah-product-thumb">{p.image || "🎁"}</div>
            <div className="ah-product-body">
              <div className="ah-product-name">{p.name}</div>
              <div className="ah-product-cat">{p.category}</div>
              <div className="ah-product-price-row">
                <span className="ah-product-price">{currency(p.price)}</span>
                <button onClick={() => toggleStatus(p)}><StatusPill status={p.status} /></button>
              </div>
              <div className="ah-product-stock" style={{ color: p.stock === 0 ? "#dc2626" : p.stock < 10 ? "#d97706" : "#059669" }}>
                {p.stock === 0 ? "Out of stock" : `${p.stock} in stock`}
              </div>
            </div>
            <div className="ah-product-actions">
              <button className="ah-icon-btn" onClick={() => setModal({ mode: "edit", data: p })}><Pencil size={14} /></button>
              <button className="ah-icon-btn danger" onClick={() => setConfirmDelete(p)}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {paged.length === 0 && <EmptyState label="No products match your search." />}
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <Modal open={!!modal} title={modal?.mode === "add" ? "Add Product" : "Edit Product"} onClose={() => setModal(null)}>
        {modal && <ProductForm initial={modal.data} categories={categories.filter((c) => c !== "All")} onCancel={() => setModal(null)} onSave={saveProduct} />}
      </Modal>

      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete this product?"
        message={`${confirmDelete?.name} will be removed from the catalog.`}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={deleteProduct}
      />
    </div>
  );
}

function ProductForm({ initial, categories, onCancel, onSave }) {
  const [form, setForm] = useState({
    name: initial.name || "", category: initial.category || categories[0] || "",
    price: initial.price || "", stock: initial.stock ?? "", image: initial.image || "🎁",
  });
  return (
    <div className="ah-modal-body">
      <FormField label="Product Image">
        <div className="ah-image-upload">
          <div className="ah-image-preview">{form.image}</div>
          <div className="ah-emoji-picker">
            {["🎁", "☕", "🖼️", "🌹", "🔑", "🎂", "💼", "💡", "🧸", "🕯️"].map((e) => (
              <button key={e} type="button" className={`ah-emoji-btn ${form.image === e ? "active" : ""}`} onClick={() => setForm({ ...form, image: e })}>{e}</button>
            ))}
          </div>
        </div>
      </FormField>
      <FormField label="Product Name">
        <input className="ah-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Together Forever Mug" />
      </FormField>
      <div className="ah-form-row">
        <FormField label="Category">
          <select className="ah-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </FormField>
        <FormField label="Price (₹)">
          <input className="ah-input" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="499" />
        </FormField>
      </div>
      <FormField label="Stock Quantity">
        <input className="ah-input" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="100" />
      </FormField>
      <div className="ah-modal-actions">
        <button className="ah-btn ah-btn-ghost" onClick={onCancel}>Cancel</button>
        <button className="ah-btn ah-btn-primary" onClick={() => onSave({ ...form, price: Number(form.price), stock: Number(form.stock) })}><Check size={15} /> Save</button>
      </div>
    </div>
  );
}

/* ============================================================================
   CATEGORIES
   ============================================================================ */

function CategoriesSection({ notify }) {
  const [categories, setCategories] = useState(seedCategories);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = categories.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  const saveCategory = (form) => {
    if (!form.name.trim()) {
      notify("Category name is required.", "error");
      return;
    }
    if (modal.mode === "add") {
      setCategories((prev) => [{ id: uid("C"), products: 0, status: "Active", ...form }, ...prev]);
      notify("Category added successfully.");
    } else {
      setCategories((prev) => prev.map((c) => (c.id === modal.data.id ? { ...c, ...form } : c)));
      notify("Category updated successfully.");
    }
    setModal(null);
  };

  const toggleStatus = (c) => {
    setCategories((prev) => prev.map((x) => (x.id === c.id ? { ...x, status: x.status === "Active" ? "Inactive" : "Active" } : x)));
    notify(`${c.name} is now ${c.status === "Active" ? "Inactive" : "Active"}.`);
  };

  const deleteCategory = () => {
    setCategories((prev) => prev.filter((c) => c.id !== confirmDelete.id));
    notify("Category deleted.");
    setConfirmDelete(null);
  };

  return (
    <div className="ah-stack">
      <div className="ah-toolbar">
        <div className="ah-search-box">
          <Search size={15} color="#9088b8" />
          <input placeholder="Search categories…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <button className="ah-btn ah-btn-primary" onClick={() => setModal({ mode: "add", data: { name: "", image: "🎁" } })}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="ah-category-grid">
        {filtered.map((c) => (
          <div key={c.id} className="ah-category-card">
            <div className="ah-category-icon">{c.image}</div>
            <div className="ah-category-name">{c.name}</div>
            <div className="ah-category-count">{c.products} products</div>
            <button onClick={() => toggleStatus(c)}><StatusPill status={c.status} /></button>
            <div className="ah-category-actions">
              <button className="ah-icon-btn" onClick={() => setModal({ mode: "edit", data: c })}><Pencil size={14} /></button>
              <button className="ah-icon-btn danger" onClick={() => setConfirmDelete(c)}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <EmptyState label="No categories match your search." />}
      </div>

      <Modal open={!!modal} title={modal?.mode === "add" ? "Add Category" : "Edit Category"} onClose={() => setModal(null)} width={420}>
        {modal && <CategoryForm initial={modal.data} onCancel={() => setModal(null)} onSave={saveCategory} />}
      </Modal>

      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete this category?"
        message={`${confirmDelete?.name} and its association with products will be removed.`}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={deleteCategory}
      />
    </div>
  );
}

function CategoryForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState({ name: initial.name || "", image: initial.image || "🎁" });
  return (
    <div className="ah-modal-body">
      <FormField label="Category Image">
        <div className="ah-image-upload">
          <div className="ah-image-preview">{form.image}</div>
          <div className="ah-emoji-picker">
            {["🥤", "🖼️", "💐", "🔑", "🎂", "💼", "🧸", "🕯️", "🎁", "📿"].map((e) => (
              <button key={e} type="button" className={`ah-emoji-btn ${form.image === e ? "active" : ""}`} onClick={() => setForm({ ...form, image: e })}>{e}</button>
            ))}
          </div>
        </div>
      </FormField>
      <FormField label="Category Name">
        <input className="ah-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Personalized Mugs" />
      </FormField>
      <div className="ah-modal-actions">
        <button className="ah-btn ah-btn-ghost" onClick={onCancel}>Cancel</button>
        <button className="ah-btn ah-btn-primary" onClick={() => onSave(form)}><Check size={15} /> Save</button>
      </div>
    </div>
  );
}

/* ============================================================================
   ORDERS
   ============================================================================ */

const ORDER_STATUSES = ["Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"];

function OrdersSection({ notify }) {
  const [orders, setOrders] = useState(seedOrders);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState(null);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const q = o.id.toLowerCase().includes(query.toLowerCase()) || o.customer.toLowerCase().includes(query.toLowerCase());
      const s = statusFilter === "All" || o.order === statusFilter;
      return q && s;
    });
  }, [orders, query, statusFilter]);

  useEffect(() => setPage(1), [query, statusFilter]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const updateStatus = (order, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, order: newStatus, delivery: newStatus === "Delivered" ? "Delivered" : newStatus === "Cancelled" ? "Cancelled" : o.delivery } : o)));
    notify(`${order.id} updated to "${newStatus}".`);
    setDetail(null);
  };

  return (
    <div className="ah-stack">
      <div className="ah-toolbar">
        <div className="ah-search-box">
          <Search size={15} color="#9088b8" />
          <input placeholder="Search by order ID or customer…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="ah-filter-select">
          <Filter size={14} color="#9088b8" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            {ORDER_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="ah-card ah-table-card">
        <div className="ah-table-scroll">
          <table className="ah-table">
            <thead>
              <tr>
                <th>Order</th><th>Customer</th><th>Products</th><th>Amount</th><th>Payment</th><th>Status</th><th>Delivery</th><th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((o) => (
                <tr key={o.id}>
                  <td data-label="Order">
                    <div style={{ fontWeight: 700 }}>{o.id}</div>
                    <div style={{ fontSize: 12, color: "#9088b8" }}>{o.date}</div>
                  </td>
                  <td data-label="Customer">{o.customer}</td>
                  <td data-label="Products">{o.products}</td>
                  <td data-label="Amount" style={{ fontWeight: 600 }}>{currency(o.amount)}</td>
                  <td data-label="Payment"><StatusPill status={o.payment} /></td>
                  <td data-label="Status"><StatusPill status={o.order} /></td>
                  <td data-label="Delivery"><StatusPill status={o.delivery} /></td>
                  <td data-label="Actions">
                    <div className="ah-row-actions">
                      <button className="ah-btn ah-btn-ghost ah-btn-sm" onClick={() => setDetail(o)}>Update</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paged.length === 0 && <EmptyState label="No orders match your search." />}
        </div>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>

      <Modal open={!!detail} title={`Update Order ${detail?.id || ""}`} onClose={() => setDetail(null)}>
        {detail && (
          <div className="ah-modal-body">
            <div className="ah-order-detail-row"><span>Customer</span><b>{detail.customer}</b></div>
            <div className="ah-order-detail-row"><span>Products</span><b>{detail.products}</b></div>
            <div className="ah-order-detail-row"><span>Amount</span><b>{currency(detail.amount)}</b></div>
            <div className="ah-order-detail-row"><span>Payment Status</span><StatusPill status={detail.payment} /></div>
            <FormField label="Order Status">
              <div className="ah-status-options">
                {ORDER_STATUSES.map((s) => (
                  <button key={s} className={`ah-status-chip ${detail.order === s ? "active" : ""}`} onClick={() => setDetail({ ...detail, order: s })}>
                    {s}
                  </button>
                ))}
              </div>
            </FormField>
            <div className="ah-modal-actions">
              <button className="ah-btn ah-btn-ghost" onClick={() => setDetail(null)}>Cancel</button>
              <button className="ah-btn ah-btn-primary" onClick={() => updateStatus(detail, detail.order)}><Check size={15} /> Update Status</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/* ============================================================================
   GIFT MANAGEMENT
   ============================================================================ */

function GiftsSection({ notify }) {
  const [gifts, setGifts] = useState(seedGifts);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = gifts.filter((g) => g.name.toLowerCase().includes(query.toLowerCase()));

  const saveGift = (form) => {
    if (!form.name.trim() || !form.price) {
      notify("Gift name and price are required.", "error");
      return;
    }
    if (modal.mode === "add") {
      setGifts((prev) => [{ id: uid("G"), active: true, ...form }, ...prev]);
      notify("Gift added successfully.");
    } else {
      setGifts((prev) => prev.map((g) => (g.id === modal.data.id ? { ...g, ...form } : g)));
      notify("Gift updated successfully.");
    }
    setModal(null);
  };

  const toggleActive = (g) => {
    setGifts((prev) => prev.map((x) => (x.id === g.id ? { ...x, active: !x.active } : x)));
    notify(`${g.name} ${g.active ? "deactivated" : "activated"}.`);
  };

  const deleteGift = () => {
    setGifts((prev) => prev.filter((g) => g.id !== confirmDelete.id));
    notify("Gift removed.");
    setConfirmDelete(null);
  };

  return (
    <div className="ah-stack">
      <div className="ah-toolbar">
        <div className="ah-search-box">
          <Search size={15} color="#9088b8" />
          <input placeholder="Search gifts and special offers…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <button className="ah-btn ah-btn-primary" onClick={() => setModal({ mode: "add", data: { name: "", type: "Special Gift", price: "" } })}>
          <Plus size={16} /> Add Gift
        </button>
      </div>

      <div className="ah-gift-grid">
        {filtered.map((g) => (
          <div key={g.id} className="ah-gift-card">
            <div className="ah-gift-icon"><Gift size={22} /></div>
            <div className="ah-gift-name">{g.name}</div>
            <div className="ah-gift-type">{g.type}</div>
            <div className="ah-gift-price">{currency(g.price)}</div>
            <label className="ah-switch">
              <input type="checkbox" checked={g.active} onChange={() => toggleActive(g)} />
              <span className="ah-switch-track"><span className="ah-switch-thumb" /></span>
              <span style={{ fontSize: 12.5, color: g.active ? "#059669" : "#9088b8", fontWeight: 600 }}>{g.active ? "Active" : "Inactive"}</span>
            </label>
            <div className="ah-gift-actions">
              <button className="ah-icon-btn" onClick={() => setModal({ mode: "edit", data: g })}><Pencil size={14} /></button>
              <button className="ah-icon-btn danger" onClick={() => setConfirmDelete(g)}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <EmptyState label="No gifts match your search." />}
      </div>

      <Modal open={!!modal} title={modal?.mode === "add" ? "Add Gift" : "Edit Gift"} onClose={() => setModal(null)} width={420}>
        {modal && <GiftForm initial={modal.data} onCancel={() => setModal(null)} onSave={saveGift} />}
      </Modal>

      <ConfirmDialog
        open={!!confirmDelete}
        title="Remove this gift?"
        message={`${confirmDelete?.name} will no longer be offered to customers.`}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={deleteGift}
      />
    </div>
  );
}

function GiftForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState({ name: initial.name || "", type: initial.type || "Special Gift", price: initial.price || "" });
  return (
    <div className="ah-modal-body">
      <FormField label="Gift Name">
        <input className="ah-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Anniversary Surprise Box" />
      </FormField>
      <FormField label="Gift Type">
        <select className="ah-input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option>Special Gift</option>
          <option>Occasion Gift</option>
          <option>Seasonal Offer</option>
          <option>Corporate Gift</option>
        </select>
      </FormField>
      <FormField label="Price (₹)">
        <input className="ah-input" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="1499" />
      </FormField>
      <div className="ah-modal-actions">
        <button className="ah-btn ah-btn-ghost" onClick={onCancel}>Cancel</button>
        <button className="ah-btn ah-btn-primary" onClick={() => onSave({ ...form, price: Number(form.price) })}><Check size={15} /> Save</button>
      </div>
    </div>
  );
}

/* ============================================================================
   INVENTORY
   ============================================================================ */

function InventorySection({ notify }) {
  const [items, setItems] = useState(seedProducts.map((p) => ({ ...p })));
  const [query, setQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("All");
  const [editing, setEditing] = useState(null);

  const withStockStatus = items.map((i) => ({
    ...i,
    stockStatus: i.stock === 0 ? "Out of Stock" : i.stock < 10 ? "Low Stock" : "Available",
  }));

  const filtered = withStockStatus.filter((i) => {
    const q = i.name.toLowerCase().includes(query.toLowerCase());
    const s = stockFilter === "All" || i.stockStatus === stockFilter;
    return q && s;
  });

  const counts = {
    available: withStockStatus.filter((i) => i.stockStatus === "Available").length,
    low: withStockStatus.filter((i) => i.stockStatus === "Low Stock").length,
    out: withStockStatus.filter((i) => i.stockStatus === "Out of Stock").length,
  };

  const updateStock = (id, newStock) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, stock: Math.max(0, Number(newStock)) } : i)));
    notify("Stock updated.");
    setEditing(null);
  };

  return (
    <div className="ah-stack">
      <div className="ah-grid-3">
        <div className="ah-inv-summary-card">
          <div className="ah-inv-icon" style={{ background: "#ecfdf5", color: "#059669" }}><PackageCheck size={20} /></div>
          <div><div className="ah-stat-value">{counts.available}</div><div className="ah-stat-label">Available Stock</div></div>
        </div>
        <div className="ah-inv-summary-card">
          <div className="ah-inv-icon" style={{ background: "#fffbeb", color: "#d97706" }}><PackageSearch size={20} /></div>
          <div><div className="ah-stat-value">{counts.low}</div><div className="ah-stat-label">Low Stock</div></div>
        </div>
        <div className="ah-inv-summary-card">
          <div className="ah-inv-icon" style={{ background: "#fef2f2", color: "#dc2626" }}><PackageX size={20} /></div>
          <div><div className="ah-stat-value">{counts.out}</div><div className="ah-stat-label">Out of Stock</div></div>
        </div>
      </div>

      <div className="ah-toolbar">
        <div className="ah-search-box">
          <Search size={15} color="#9088b8" />
          <input placeholder="Search inventory…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="ah-filter-select">
          <Filter size={14} color="#9088b8" />
          <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
            <option>All</option><option>Available</option><option>Low Stock</option><option>Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="ah-card ah-table-card">
        <div className="ah-table-scroll">
          <table className="ah-table">
            <thead><tr><th>Product</th><th>Category</th><th>Stock</th><th>Status</th><th style={{ textAlign: "right" }}>Update</th></tr></thead>
            <tbody>
              {filtered.map((i) => (
                <tr key={i.id}>
                  <td data-label="Product" style={{ fontWeight: 600 }}>{i.image} {i.name}</td>
                  <td data-label="Category">{i.category}</td>
                  <td data-label="Stock">
                    {editing === i.id ? (
                      <input
                        className="ah-input ah-input-inline"
                        type="number"
                        autoFocus
                        defaultValue={i.stock}
                        onKeyDown={(e) => e.key === "Enter" && updateStock(i.id, e.target.value)}
                        onBlur={(e) => updateStock(i.id, e.target.value)}
                      />
                    ) : (
                      i.stock
                    )}
                  </td>
                  <td data-label="Status">
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <StatusPill status={i.stockStatus === "Available" ? "Active" : i.stockStatus === "Low Stock" ? "Pending" : "Inactive"} />
                      <span style={{ fontSize: 12, color: "#8b85b8" }}>{i.stockStatus}</span>
                    </div>
                  </td>
                  <td data-label="Update" style={{ textAlign: "right" }}>
                    <button className="ah-btn ah-btn-ghost ah-btn-sm" onClick={() => setEditing(i.id)}>Update Stock</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState label="No inventory items match your search." />}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SALES & REPORTS
   ============================================================================ */

function ReportsSection({ notify }) {
  const [range, setRange] = useState("Monthly");

  const yearly = [
    { m: "2022", v: 320 }, { m: "2023", v: 410 }, { m: "2024", v: 520 }, { m: "2025", v: 610 }, { m: "2026", v: 740 },
  ];

  const data = range === "Monthly" ? monthlySales : yearly;

  return (
    <div className="ah-stack">
      <div className="ah-stats-grid">
        {[
          { label: "Total Revenue", value: currency(1284500), icon: DollarSign, tint: "#ecfdf5", fg: "#059669" },
          { label: "Avg. Order Value", value: currency(842), icon: TrendingUp, tint: "#eff6ff", fg: "#2563eb" },
          { label: "Orders This Month", value: "612", icon: ShoppingCart, tint: "#f5f3ff", fg: "#7c3aed" },
          { label: "Refunds Issued", value: currency(18400), icon: TrendingDown, tint: "#fef2f2", fg: "#dc2626" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="ah-stat-card">
              <div className="ah-stat-icon" style={{ background: s.tint, color: s.fg }}><Icon size={19} /></div>
              <div className="ah-stat-value">{s.value}</div>
              <div className="ah-stat-label">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="ah-card">
        <div className="ah-card-head">
          <h3>{range} Sales</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <div className="ah-toggle-group">
              {["Monthly", "Yearly"].map((r) => (
                <button key={r} className={`ah-toggle-btn ${range === r ? "active" : ""}`} onClick={() => setRange(r)}>{r}</button>
              ))}
            </div>
            <button className="ah-btn ah-btn-ghost ah-btn-sm" onClick={() => notify("Report exported as CSV.")}>
              <Download size={14} /> Export Report
            </button>
          </div>
        </div>
        <MiniBarChart data={data} />
      </div>

      <div className="ah-grid-2">
        <div className="ah-card">
          <div className="ah-card-head"><h3>Sales by Category</h3></div>
          <DonutChart data={salesByCategory} size={170} />
        </div>
        <div className="ah-card">
          <div className="ah-card-head"><h3>Top Products</h3></div>
          <div className="ah-mini-list">
            {seedProducts.slice(0, 5).map((p, idx) => (
              <div key={p.id} className="ah-mini-row">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="ah-rank">{idx + 1}</span>
                  <div className="ah-mini-title">{p.name}</div>
                </div>
                <span style={{ fontWeight: 700, color: "#1e1b4b" }}>{currency(p.price * (12 - idx))}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   COUPONS
   ============================================================================ */

function CouponsSection({ notify }) {
  const [coupons, setCoupons] = useState(seedCoupons);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = coupons.filter((c) => c.code.toLowerCase().includes(query.toLowerCase()));

  const saveCoupon = (form) => {
    if (!form.code.trim() || !form.discount.trim()) {
      notify("Coupon code and discount are required.", "error");
      return;
    }
    if (modal.mode === "add") {
      setCoupons((prev) => [{ id: uid("CP"), usage: 0, active: true, ...form }, ...prev]);
      notify("Coupon created successfully.");
    } else {
      setCoupons((prev) => prev.map((c) => (c.id === modal.data.id ? { ...c, ...form } : c)));
      notify("Coupon updated successfully.");
    }
    setModal(null);
  };

  const toggleActive = (c) => {
    setCoupons((prev) => prev.map((x) => (x.id === c.id ? { ...x, active: !x.active } : x)));
    notify(`${c.code} ${c.active ? "deactivated" : "activated"}.`);
  };

  const deleteCoupon = () => {
    setCoupons((prev) => prev.filter((c) => c.id !== confirmDelete.id));
    notify("Coupon deleted.");
    setConfirmDelete(null);
  };

  return (
    <div className="ah-stack">
      <div className="ah-toolbar">
        <div className="ah-search-box">
          <Search size={15} color="#9088b8" />
          <input placeholder="Search coupon codes…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <button className="ah-btn ah-btn-primary" onClick={() => setModal({ mode: "add", data: { code: "", discount: "", limit: 500 } })}>
          <Plus size={16} /> Create Coupon
        </button>
      </div>

      <div className="ah-card ah-table-card">
        <div className="ah-table-scroll">
          <table className="ah-table">
            <thead><tr><th>Code</th><th>Discount</th><th>Usage</th><th>Status</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td data-label="Code" style={{ fontWeight: 700, letterSpacing: 0.5 }}>{c.code}</td>
                  <td data-label="Discount">{c.discount}</td>
                  <td data-label="Usage">
                    <div>
                      <div className="ah-usage-bar">
                        <div className="ah-usage-fill" style={{ width: `${Math.min(100, (c.usage / c.limit) * 100)}%` }} />
                      </div>
                      <span style={{ fontSize: 12, color: "#8b85b8" }}>{c.usage} / {c.limit}</span>
                    </div>
                  </td>
                  <td data-label="Status">
                    <button onClick={() => toggleActive(c)}>
                      <StatusPill status={c.active ? "Active" : "Inactive"} />
                    </button>
                  </td>
                  <td data-label="Actions">
                    <div className="ah-row-actions">
                      <button className="ah-icon-btn" onClick={() => setModal({ mode: "edit", data: c })}><Pencil size={15} /></button>
                      <button className="ah-icon-btn danger" onClick={() => setConfirmDelete(c)}><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState label="No coupons match your search." />}
        </div>
      </div>

      <Modal open={!!modal} title={modal?.mode === "add" ? "Create Coupon" : "Edit Coupon"} onClose={() => setModal(null)} width={420}>
        {modal && <CouponForm initial={modal.data} onCancel={() => setModal(null)} onSave={saveCoupon} />}
      </Modal>

      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete this coupon?"
        message={`${confirmDelete?.code} will no longer be redeemable.`}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={deleteCoupon}
      />
    </div>
  );
}

function CouponForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState({ code: initial.code || "", discount: initial.discount || "", limit: initial.limit || 500 });
  return (
    <div className="ah-modal-body">
      <FormField label="Coupon Code">
        <input className="ah-input" style={{ textTransform: "uppercase" }} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="e.g. WELCOME10" />
      </FormField>
      <FormField label="Discount">
        <input className="ah-input" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} placeholder="e.g. 10% or ₹50 off" />
      </FormField>
      <FormField label="Usage Limit">
        <input className="ah-input" type="number" value={form.limit} onChange={(e) => setForm({ ...form, limit: Number(e.target.value) })} />
      </FormField>
      <div className="ah-modal-actions">
        <button className="ah-btn ah-btn-ghost" onClick={onCancel}>Cancel</button>
        <button className="ah-btn ah-btn-primary" onClick={() => onSave(form)}><Check size={15} /> Save</button>
      </div>
    </div>
  );
}

/* ============================================================================
   SETTINGS / ADMIN PROFILE
   ============================================================================ */

function SettingsSection({ notify, adminEmail }) {
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState({ name: "Store Admin", email: adminEmail, phone: "+91 90000 00000" });
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [twoFA, setTwoFA] = useState(true);

  const saveProfile = (e) => {
    e.preventDefault();
    notify("Profile updated successfully.");
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (!pwd.current || !pwd.next) {
      notify("Please fill in all password fields.", "error");
      return;
    }
    if (pwd.next.length < 6) {
      notify("New password must be at least 6 characters.", "error");
      return;
    }
    if (pwd.next !== pwd.confirm) {
      notify("New password and confirmation do not match.", "error");
      return;
    }
    notify("Password changed successfully.");
    setPwd({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="ah-stack">
      <div className="ah-toggle-group" style={{ width: "fit-content" }}>
        {[
          { key: "profile", label: "Admin Details" },
          { key: "security", label: "Security" },
        ].map((t) => (
          <button key={t.key} className={`ah-toggle-btn ${tab === t.key ? "active" : ""}`} onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="ah-card" style={{ maxWidth: 560 }}>
          <div className="ah-card-head"><h3>Admin Details</h3></div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
            <span className="ah-avatar xl">{profile.name.charAt(0)}</span>
            <div>
              <button type="button" className="ah-btn ah-btn-ghost ah-btn-sm" onClick={() => notify("Profile picture updated.")}>
                <ImageIcon size={14} /> Change Photo
              </button>
              <div style={{ fontSize: 12, color: "#9088b8", marginTop: 6 }}>JPG or PNG. Max size 2MB.</div>
            </div>
          </div>
          <form onSubmit={saveProfile}>
            <FormField label="Full Name">
              <input className="ah-input" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </FormField>
            <FormField label="Email Address">
              <input className="ah-input" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </FormField>
            <FormField label="Phone Number">
              <input className="ah-input" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            </FormField>
            <div className="ah-modal-actions" style={{ padding: 0, marginTop: 8 }}>
              <button className="ah-btn ah-btn-primary" type="submit"><Check size={15} /> Save Changes</button>
            </div>
          </form>
        </div>
      )}

      {tab === "security" && (
        <div className="ah-grid-2">
          <div className="ah-card">
            <div className="ah-card-head"><h3>Change Password</h3></div>
            <form onSubmit={changePassword}>
              <FormField label="Current Password">
                <input className="ah-input" type="password" value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} />
              </FormField>
              <FormField label="New Password">
                <input className="ah-input" type="password" value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })} />
              </FormField>
              <FormField label="Confirm New Password">
                <input className="ah-input" type="password" value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })} />
              </FormField>
              <div className="ah-modal-actions" style={{ padding: 0, marginTop: 8 }}>
                <button className="ah-btn ah-btn-primary" type="submit"><KeyRound size={15} /> Update Password</button>
              </div>
            </form>
          </div>
          <div className="ah-card">
            <div className="ah-card-head"><h3>Security Settings</h3></div>
            <div className="ah-security-row">
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Two-Factor Authentication</div>
                <div style={{ fontSize: 12.5, color: "#8b85b8" }}>Require an OTP every time you log in.</div>
              </div>
              <label className="ah-switch">
                <input type="checkbox" checked={twoFA} onChange={() => { setTwoFA((v) => !v); notify(`Two-factor authentication ${!twoFA ? "enabled" : "disabled"}.`); }} />
                <span className="ah-switch-track"><span className="ah-switch-thumb" /></span>
              </label>
            </div>
            <div className="ah-security-row">
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Login Alerts</div>
                <div style={{ fontSize: 12.5, color: "#8b85b8" }}>Get an email for every new admin sign-in.</div>
              </div>
              <label className="ah-switch">
                <input type="checkbox" defaultChecked onChange={() => notify("Preference saved.")} />
                <span className="ah-switch-track"><span className="ah-switch-thumb" /></span>
              </label>
            </div>
            <div className="ah-security-row" style={{ border: "none" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}><ShieldCheck size={15} color="#059669" /> Account protected</div>
                <div style={{ fontSize: 12.5, color: "#8b85b8" }}>Last login: Today at 9:41 AM from Chennai, IN.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   GLOBAL STYLES
   ============================================================================ */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

      .ah-root {
        --primary-start: #4f46e5;
        --primary-mid: #7c3aed;
        --primary-end: #9333ea;
        --accent: #ec4899;
        --bg-wash: #f7f6fd;
        --ink: #1e1b4b;
        --muted: #6b6b8f;
        --border: #ece7fb;
        --danger: #ef4444;
        --success: #16a34a;
        font-family: 'Inter', sans-serif;
        display: flex;
        min-height: 100vh;
        background: var(--bg-wash);
        color: var(--ink);
      }
      .ah-root * { box-sizing: border-box; }
      .ah-root h1, .ah-root h2, .ah-root h3 { font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; }
      .ah-desktop-only { display: none; }
      .ah-mobile-only { display: inline-flex; }
      @media (min-width: 900px) {
        .ah-desktop-only { display: inline-flex; }
        .ah-mobile-only { display: none; }
      }

      /* ---------------- Sidebar ---------------- */
      .ah-backdrop { position: fixed; inset: 0; background: rgba(20,10,50,0.4); z-index: 30; }
      .ah-sidebar {
        position: fixed; top: 0; left: 0; bottom: 0; width: 258px; z-index: 40;
        background:
          radial-gradient(130% 60% at 100% 0%, rgba(236,72,153,0.35), transparent 55%),
          radial-gradient(120% 55% at 0% 100%, rgba(79,70,229,0.55), transparent 60%),
          linear-gradient(165deg, var(--primary-start) 0%, var(--primary-mid) 55%, var(--primary-end) 100%);
        color: #fff; display: flex; flex-direction: column;
        transform: translateX(-100%); transition: transform .25s ease, width .2s ease;
        padding: 20px 14px;
        box-shadow: 0 0 0 1px rgba(255,255,255,0.06) inset;
      }
      .ah-sidebar.open { transform: translateX(0); }
      @media (min-width: 900px) {
        .ah-sidebar { position: sticky; transform: none; height: 100vh; }
        .ah-sidebar.collapsed { width: 84px; }
      }
      .ah-sidebar-brand { display: flex; align-items: center; gap: 10px; padding: 6px 10px 22px; position: relative; }
      .ah-brand-icon {
        width: 38px; height: 38px; border-radius: 12px; flex-shrink: 0;
        background: linear-gradient(135deg, var(--accent), var(--primary-mid));
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 8px 18px -6px rgba(236,72,153,0.5);
      }
      .ah-brand-name { font-weight: 800; font-size: 15.5px; font-family: 'Plus Jakarta Sans', sans-serif; }
      .ah-brand-sub { font-size: 11px; opacity: 0.75; font-weight: 500; }
      .ah-sidebar-brand .ah-icon-btn { margin-left: auto; color: #fff; }

      .ah-nav { display: flex; flex-direction: column; gap: 3px; flex: 1; overflow-y: auto; }
      .ah-nav-item {
        display: flex; align-items: center; gap: 12px; padding: 11px 12px; border-radius: 12px;
        background: none; border: none; color: rgba(255,255,255,0.78); cursor: pointer;
        font-size: 13.8px; font-weight: 600; text-align: left; position: relative;
        transition: background .15s ease, color .15s ease;
      }
      .ah-nav-item:hover { background: rgba(255,255,255,0.08); color: #fff; }
      .ah-nav-item.active { background: rgba(255,255,255,0.16); color: #fff; }
      .ah-nav-icon { display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .ah-nav-active-dot { position: absolute; right: 10px; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px 1px var(--accent); }
      .ah-sidebar-footer { padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.12); margin-top: 8px; }
      .ah-nav-item.logout:hover { background: rgba(239,68,68,0.18); color: #fecaca; }
      .ah-collapse-btn {
        position: absolute; top: 26px; right: -12px; width: 26px; height: 26px; border-radius: 50%;
        background: #fff; color: var(--primary-mid); border: 1px solid var(--border); cursor: pointer;
        align-items: center; justify-content: center; box-shadow: 0 4px 10px -2px rgba(0,0,0,0.2);
      }

      /* ---------------- Main / header ---------------- */
      .ah-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
      .ah-header {
        display: flex; align-items: center; gap: 16px; padding: 14px 22px;
        background: rgba(255,255,255,0.75); backdrop-filter: blur(14px);
        border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 20;
        flex-wrap: wrap; row-gap: 12px;
      }
      .ah-header-title { min-width: 0; }
      .ah-header-title h1 { font-size: 18px; font-weight: 800; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ah-header-date { font-size: 11.5px; color: var(--muted); display: flex; align-items: center; gap: 5px; margin-top: 2px; }
      .ah-header-search {
        display: flex; align-items: center; gap: 8px; background: #fff; border: 1.5px solid var(--border);
        border-radius: 12px; padding: 9px 14px; flex: 1; max-width: 420px; min-width: 160px; margin-left: auto;
      }
      .ah-header-search input { border: none; outline: none; font-size: 13.5px; width: 100%; background: transparent; }
      .ah-header-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; margin-left: auto; }
      .ah-header-icon-wrap { position: relative; flex-shrink: 0; }
      @media (max-width: 899px) {
        .ah-header { padding: 12px 16px; gap: 10px; }
        .ah-header-title { order: 2; flex: 1 1 auto; margin-left: 4px; }
        .ah-header-actions { order: 3; margin-left: 0; }
        .ah-header-search { order: 4; flex-basis: 100%; max-width: none; margin-left: 0; }
      }
      @media (max-width: 420px) {
        .ah-header-title h1 { font-size: 16px; }
        .ah-header-date { display: none; }
      }
      .ah-notif-dot { position: absolute; top: 7px; right: 7px; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); border: 1.5px solid #fff; }
      .ah-profile-btn {
        display: flex; align-items: center; gap: 8px; background: #fff; border: 1.5px solid var(--border);
        border-radius: 999px; padding: 6px 12px 6px 6px; cursor: pointer;
      }

      .ah-avatar {
        width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
        background: linear-gradient(135deg, var(--primary-start), var(--primary-end)); color: #fff; font-weight: 700; font-size: 13px;
        flex-shrink: 0;
      }
      .ah-avatar.sm { width: 28px; height: 28px; font-size: 12px; }
      .ah-avatar.lg { width: 42px; height: 42px; font-size: 16px; }
      .ah-avatar.xl { width: 64px; height: 64px; font-size: 24px; }

      .ah-dropdown {
        position: absolute; top: calc(100% + 10px); right: 0; background: #fff; border: 1px solid var(--border);
        border-radius: 16px; box-shadow: 0 20px 45px -15px rgba(60,20,120,0.28); z-index: 50; overflow: hidden;
        animation: dropIn .15s ease;
      }
      @keyframes dropIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
      .ah-notif-dropdown { width: 300px; }
      .ah-dropdown-head { padding: 14px 16px; font-weight: 700; font-size: 13.5px; border-bottom: 1px solid var(--border); }
      .ah-notif-item { display: flex; gap: 10px; padding: 12px 16px; border-bottom: 1px solid #f4f1fd; }
      .ah-notif-item:last-child { border-bottom: none; }
      .ah-notif-icon { flex-shrink: 0; margin-top: 2px; }
      .ah-notif-title { font-size: 13px; font-weight: 700; }
      .ah-notif-desc { font-size: 12px; color: var(--muted); margin-top: 2px; }
      .ah-profile-dropdown { width: 240px; padding: 8px; }
      .ah-profile-dropdown-head { display: flex; align-items: center; gap: 10px; padding: 10px; border-bottom: 1px solid var(--border); margin-bottom: 6px; }
      .ah-dropdown-item {
        width: 100%; display: flex; align-items: center; gap: 9px; padding: 10px; border-radius: 10px;
        background: none; border: none; font-size: 13px; font-weight: 600; color: var(--ink); cursor: pointer; text-align: left;
      }
      .ah-dropdown-item:hover { background: #f5f3ff; }
      .ah-dropdown-item.danger { color: var(--danger); }
      .ah-dropdown-item.danger:hover { background: #fef2f2; }

      .ah-content { padding: 22px; flex: 1; min-width: 0; overflow-x: hidden; }
      .ah-stack { display: flex; flex-direction: column; gap: 20px; min-width: 0; }
      @media (max-width: 640px) {
        .ah-content { padding: 16px; }
      }

      /* ---------------- Stat cards ---------------- */
      .ah-stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 16px; }
      .ah-stat-card, .ah-inv-summary-card {
        background: #fff; border-radius: 20px; padding: 18px; border: 1px solid var(--border);
        box-shadow: 0 10px 26px -18px rgba(76,29,149,0.25);
      }
      .ah-inv-summary-card { display: flex; align-items: center; gap: 14px; }
      .ah-stat-icon, .ah-inv-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
      .ah-stat-value { font-size: 22px; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif; }
      .ah-stat-label { font-size: 12.5px; color: var(--muted); margin-top: 2px; font-weight: 500; }
      .ah-stat-delta { display: flex; align-items: center; gap: 4px; font-size: 11.5px; font-weight: 700; margin-top: 10px; }
      .ah-stat-delta.up { color: var(--success); }
      .ah-stat-delta.down { color: var(--danger); }

      /* ---------------- Generic card / grids ---------------- */
      .ah-card { background: #fff; border-radius: 22px; padding: 20px; border: 1px solid var(--border); box-shadow: 0 10px 26px -18px rgba(76,29,149,0.25); }
      .ah-card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; gap: 10px; flex-wrap: wrap; }
      .ah-card-head h3 { font-size: 15px; font-weight: 800; }
      .ah-card-tag { font-size: 11.5px; color: var(--muted); background: #f5f3ff; padding: 4px 10px; border-radius: 999px; font-weight: 600; }
      .ah-grid-2 { display: grid; grid-template-columns: 1fr; gap: 16px; }
      .ah-grid-3 { display: grid; grid-template-columns: 1fr; gap: 16px; }
      @media (min-width: 900px) { .ah-grid-2 { grid-template-columns: 1.3fr 1fr; } .ah-grid-3 { grid-template-columns: repeat(3, 1fr); } }

      .ah-link-btn { background: none; border: none; color: var(--primary-mid); font-weight: 700; font-size: 12.5px; cursor: pointer; }
      .ah-link-btn:hover { text-decoration: underline; }

      .ah-mini-list { display: flex; flex-direction: column; gap: 4px; }
      .ah-mini-row { display: flex; align-items: center; justify-content: space-between; padding: 9px 4px; border-bottom: 1px solid #f4f1fd; }
      .ah-mini-row:last-child { border-bottom: none; }
      .ah-mini-title { font-size: 13.5px; font-weight: 700; }
      .ah-mini-sub { font-size: 11.5px; color: var(--muted); }
      .ah-rank { width: 22px; height: 22px; border-radius: 7px; background: #f5f3ff; color: var(--primary-mid); display: flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: 800; }

      .ah-quick-actions { display: flex; flex-wrap: wrap; gap: 12px; }
      .ah-quick-btn {
        display: flex; align-items: center; gap: 8px; padding: 12px 18px; border-radius: 14px; border: 1.5px solid var(--border);
        background: #fbfaff; font-weight: 700; font-size: 13.5px; color: var(--ink); cursor: pointer; transition: all .15s ease;
      }
      .ah-quick-btn:hover { border-color: var(--primary-mid); color: var(--primary-mid); background: #f5f3ff; transform: translateY(-1px); }

      /* ---------------- Bar chart ---------------- */
      .ah-bar-chart { display: flex; align-items: flex-end; gap: 14px; height: 190px; padding-top: 10px; }
      .ah-bar-col { display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1; height: 100%; }
      .ah-bar-track { flex: 1; width: 100%; max-width: 34px; display: flex; align-items: flex-end; background: #f4f1fd; border-radius: 8px; overflow: hidden; }
      .ah-bar-fill { width: 100%; background: linear-gradient(180deg, var(--primary-end), var(--primary-start)); border-radius: 8px 8px 0 0; transition: height .4s ease; }
      .ah-bar-col span { font-size: 11.5px; color: var(--muted); font-weight: 600; }

      /* ---------------- Toolbar / search / filter ---------------- */
      .ah-toolbar { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
      .ah-search-box {
        display: flex; align-items: center; gap: 8px; background: #fff; border: 1.5px solid var(--border);
        border-radius: 12px; padding: 10px 14px; flex: 1; min-width: 200px;
      }
      .ah-search-box input { border: none; outline: none; font-size: 13.5px; width: 100%; background: transparent; }
      .ah-filter-select { display: flex; align-items: center; gap: 8px; background: #fff; border: 1.5px solid var(--border); border-radius: 12px; padding: 9px 12px; }
      .ah-filter-select select { border: none; outline: none; font-size: 13.5px; background: transparent; color: var(--ink); font-weight: 600; }

      .ah-btn {
        display: inline-flex; align-items: center; justify-content: center; gap: 7px; border-radius: 12px; font-weight: 700;
        font-size: 13.5px; padding: 10px 18px; cursor: pointer; border: none; transition: all .15s ease; white-space: nowrap;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      .ah-btn-primary { color: #fff; background: linear-gradient(120deg, var(--primary-start), var(--primary-mid) 60%, var(--primary-end)); box-shadow: 0 12px 24px -10px rgba(109,40,217,0.55); }
      .ah-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 16px 30px -10px rgba(109,40,217,0.6); }
      .ah-btn-ghost { background: #f5f3ff; color: var(--primary-mid); }
      .ah-btn-ghost:hover { background: #ece5ff; }
      .ah-btn-danger { background: #fef2f2; color: var(--danger); }
      .ah-btn-danger:hover { background: #fee2e2; }
      .ah-btn-sm { padding: 7px 12px; font-size: 12.5px; border-radius: 10px; }

      .ah-icon-btn {
        width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center;
        border: none; background: #f5f3ff; color: var(--primary-mid); cursor: pointer; transition: all .15s ease; flex-shrink: 0;
      }
      .ah-icon-btn:hover { background: #ece5ff; }
      .ah-icon-btn.danger { background: #fef2f2; color: var(--danger); }
      .ah-icon-btn.danger:hover { background: #fee2e2; }

      /* ---------------- Tables ---------------- */
      .ah-table-card { padding: 0; overflow: hidden; }
      .ah-table-scroll { overflow-x: auto; }
      .ah-table { width: 100%; border-collapse: collapse; min-width: 720px; }
      .ah-table th {
        text-align: left; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--muted);
        padding: 14px 20px; border-bottom: 1px solid var(--border); background: #fbfaff; white-space: nowrap;
      }
      .ah-table td { padding: 14px 20px; border-bottom: 1px solid #f4f1fd; font-size: 13.5px; vertical-align: middle; }
      .ah-table tr:last-child td { border-bottom: none; }
      .ah-table tr:hover td { background: #fbfaff; }
      .ah-row-actions { display: flex; gap: 6px; justify-content: flex-end; }
      .ah-pill-btn { background: none; border: none; cursor: pointer; padding: 0; }

      /* ---- Responsive tables: stack into cards below 900px so nothing needs horizontal scroll ---- */
      @media (max-width: 899px) {
        .ah-table-scroll { overflow-x: visible; }
        .ah-table { min-width: 0; width: 100%; }
        .ah-table thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
        .ah-table, .ah-table tbody, .ah-table tr, .ah-table td { display: block; width: 100%; }
        .ah-table tbody { padding: 10px; display: flex; flex-direction: column; gap: 12px; }
        .ah-table tr {
          background: #fff; border: 1px solid var(--border); border-radius: 16px;
          box-shadow: 0 10px 24px -18px rgba(76,29,149,0.3); overflow: hidden;
        }
        .ah-table tr:last-child td { border-bottom: 1px solid #f4f1fd; }
        .ah-table td {
          display: flex; align-items: center; justify-content: space-between; gap: 14px;
          padding: 10px 16px; text-align: right; white-space: normal; word-break: break-word;
        }
        .ah-table td > * { min-width: 0; }
        .ah-table td:last-child { border-bottom: none; }
        .ah-table td::before {
          content: attr(data-label); flex-shrink: 0; text-align: left; margin-right: auto;
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: var(--muted);
        }
        .ah-table td:first-child {
          padding: 14px 16px 12px; background: #fbfaff; border-bottom: 1px solid var(--border) !important;
          font-size: 14.5px;
        }
        .ah-table td:first-child::before { content: none; }
        .ah-row-actions { justify-content: flex-end; flex-wrap: wrap; }
      }

      .ah-pill { display: inline-block; padding: 4px 11px; border-radius: 999px; font-size: 11.5px; font-weight: 700; }

      .ah-pagination { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 16px; }
      .ah-page-btn {
        width: 30px; height: 30px; border-radius: 9px; border: 1px solid var(--border); background: #fff;
        cursor: pointer; font-size: 12.5px; font-weight: 700; color: var(--ink); display: flex; align-items: center; justify-content: center;
      }
      .ah-page-btn.active { background: linear-gradient(120deg, var(--primary-start), var(--primary-end)); color: #fff; border-color: transparent; }
      .ah-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

      .ah-empty { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 50px 20px; color: var(--muted); }
      .ah-empty p { font-size: 13.5px; font-weight: 600; margin: 0; }

      /* ---------------- Products grid ---------------- */
      .ah-product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 16px; }
      .ah-product-card { background: #fff; border-radius: 20px; border: 1px solid var(--border); padding: 16px; position: relative; box-shadow: 0 10px 26px -18px rgba(76,29,149,0.22); }
      .ah-product-thumb { width: 100%; height: 90px; border-radius: 14px; background: linear-gradient(135deg,#f5f3ff,#ece5ff); display: flex; align-items: center; justify-content: center; font-size: 38px; margin-bottom: 12px; }
      .ah-product-name { font-weight: 700; font-size: 14px; }
      .ah-product-cat { font-size: 12px; color: var(--muted); margin-top: 2px; }
      .ah-product-price-row { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; }
      .ah-product-price { font-weight: 800; color: var(--primary-mid); }
      .ah-product-stock { font-size: 11.5px; font-weight: 700; margin-top: 6px; }
      .ah-product-actions { position: absolute; top: 12px; right: 12px; display: flex; gap: 6px; }

      /* ---------------- Category grid ---------------- */
      .ah-category-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
      .ah-category-card { background: #fff; border-radius: 20px; border: 1px solid var(--border); padding: 18px; text-align: center; position: relative; box-shadow: 0 10px 26px -18px rgba(76,29,149,0.22); }
      .ah-category-icon { font-size: 34px; margin-bottom: 8px; }
      .ah-category-name { font-weight: 700; font-size: 13.5px; }
      .ah-category-count { font-size: 11.5px; color: var(--muted); margin: 4px 0 10px; }
      .ah-category-actions { position: absolute; top: 12px; right: 12px; display: flex; gap: 6px; }

      /* ---------------- Gift grid ---------------- */
      .ah-gift-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 16px; }
      .ah-gift-card { background: #fff; border-radius: 20px; border: 1px solid var(--border); padding: 18px; position: relative; box-shadow: 0 10px 26px -18px rgba(76,29,149,0.22); }
      .ah-gift-icon { width: 42px; height: 42px; border-radius: 12px; background: linear-gradient(135deg,#fce7f3,#f5d0fe); color: #a21caf; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
      .ah-gift-name { font-weight: 700; font-size: 14px; }
      .ah-gift-type { font-size: 11.5px; color: var(--muted); margin: 2px 0 8px; }
      .ah-gift-price { font-weight: 800; color: var(--primary-mid); margin-bottom: 10px; }
      .ah-gift-actions { position: absolute; top: 14px; right: 14px; display: flex; gap: 6px; }

      /* ---------------- Switch ---------------- */
      .ah-switch { display: flex; align-items: center; gap: 8px; cursor: pointer; }
      .ah-switch input { display: none; }
      .ah-switch-track { width: 36px; height: 20px; border-radius: 999px; background: #e2ddf7; position: relative; transition: background .2s ease; flex-shrink: 0; }
      .ah-switch-thumb { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: transform .2s ease; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
      .ah-switch input:checked + .ah-switch-track { background: linear-gradient(120deg, var(--primary-start), var(--primary-end)); }
      .ah-switch input:checked + .ah-switch-track .ah-switch-thumb { transform: translateX(16px); }

      /* ---------------- Modal ---------------- */
      .ah-modal-overlay { position: fixed; inset: 0; background: rgba(20,10,50,0.45); backdrop-filter: blur(3px); display: flex; align-items: center; justify-content: center; z-index: 60; padding: 20px; }
      .ah-modal-card { background: #fff; border-radius: 24px; width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto; box-shadow: 0 30px 70px -20px rgba(30,10,60,0.4); animation: modalIn .18s ease; }
      @keyframes modalIn { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      .ah-modal-sm { max-width: 360px; text-align: center; padding: 28px 24px; }
      .ah-modal-head { display: flex; align-items: center; justify-content: space-between; padding: 20px 22px; border-bottom: 1px solid var(--border); }
      .ah-modal-title { font-size: 16.5px; font-weight: 800; }
      .ah-modal-sub { font-size: 13px; color: var(--muted); margin-top: 6px; }
      .ah-modal-body { padding: 20px 22px 22px; }
      .ah-modal-icon-warn { width: 52px; height: 52px; border-radius: 16px; background: #fef2f2; color: var(--danger); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; }
      .ah-modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border); }
      .ah-modal-sm .ah-modal-actions { justify-content: center; border: none; padding-top: 4px; }

      .ah-form-field { margin-bottom: 16px; }
      .ah-form-field label { display: block; font-size: 12.5px; font-weight: 700; margin-bottom: 6px; color: var(--ink); }
      .ah-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .ah-input {
        width: 100%; border: 1.5px solid var(--border); border-radius: 12px; padding: 10px 13px; font-size: 13.5px;
        outline: none; font-family: 'Inter', sans-serif; color: var(--ink); background: #fff; transition: border-color .15s ease;
      }
      .ah-input:focus { border-color: var(--primary-mid); box-shadow: 0 0 0 4px rgba(124,58,237,0.12); }
      .ah-input-inline { max-width: 90px; padding: 6px 9px; }

      .ah-image-upload { display: flex; align-items: center; gap: 14px; }
      .ah-image-preview { width: 56px; height: 56px; border-radius: 14px; background: #f5f3ff; display: flex; align-items: center; justify-content: center; font-size: 26px; flex-shrink: 0; }
      .ah-emoji-picker { display: flex; flex-wrap: wrap; gap: 6px; }
      .ah-emoji-btn { width: 30px; height: 30px; border-radius: 9px; border: 1.5px solid var(--border); background: #fff; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; }
      .ah-emoji-btn.active { border-color: var(--primary-mid); background: #f5f3ff; }

      .ah-order-detail-row { display: flex; align-items: center; justify-content: space-between; font-size: 13.5px; padding: 8px 0; border-bottom: 1px solid #f4f1fd; }
      .ah-order-detail-row span { color: var(--muted); }
      .ah-status-options { display: flex; flex-wrap: wrap; gap: 8px; }
      .ah-status-chip { padding: 8px 14px; border-radius: 10px; border: 1.5px solid var(--border); background: #fff; font-size: 12.5px; font-weight: 700; cursor: pointer; color: var(--muted); }
      .ah-status-chip.active { border-color: var(--primary-mid); background: #f5f3ff; color: var(--primary-mid); }

      .ah-toggle-group { display: flex; background: #f5f3ff; border-radius: 12px; padding: 4px; gap: 2px; }
      .ah-toggle-btn { padding: 8px 16px; border-radius: 9px; border: none; background: none; font-size: 12.5px; font-weight: 700; color: var(--muted); cursor: pointer; }
      .ah-toggle-btn.active { background: #fff; color: var(--primary-mid); box-shadow: 0 4px 10px -4px rgba(76,29,149,0.3); }

      .ah-usage-bar { width: 100px; height: 6px; border-radius: 999px; background: #f0ecfd; margin-bottom: 4px; overflow: hidden; }
      .ah-usage-fill { height: 100%; background: linear-gradient(90deg, var(--primary-start), var(--primary-end)); border-radius: 999px; }

      .ah-security-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--border); gap: 12px; }

      /* ---------------- Toast ---------------- */
      .ah-toast-wrap { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 100; }
      .ah-toast { display: flex; align-items: center; gap: 9px; padding: 12px 20px; border-radius: 14px; font-size: 13.5px; font-weight: 700; color: #fff; box-shadow: 0 16px 34px -10px rgba(0,0,0,0.3); animation: toastIn .2s ease; }
      .ah-toast.success { background: linear-gradient(120deg,#16a34a,#22c55e); }
      .ah-toast.error { background: linear-gradient(120deg,#dc2626,#ef4444); }
      @keyframes toastIn { from { opacity: 0; transform: translate(0, -10px); } to { opacity: 1; transform: translate(0,0); } }
    `}</style>
  );
}
