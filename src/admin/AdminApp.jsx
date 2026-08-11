import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminHome from "./AdminHome";

/**
 * Example wiring only — drop this into a NEW route such as /admin.
 * It does not touch any existing customer routes or components.
 */
export default function AdminApp() {
  const [admin, setAdmin] = useState(null); // null = logged out

  if (!admin) {
    return <AdminLogin onLoginSuccess={(a) => setAdmin(a)} />;
  }

  return <AdminHome adminEmail={admin.email} onLogout={() => setAdmin(null)} />;
}
