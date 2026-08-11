import React, { useState } from "react";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";

/**
 * AdminLogin
 * -----------------------------------------------------------------------
 * Premium admin login screen for the INEX Gifts Admin Console.
 * Shares the purple-gradient / glassmorphism design language of the
 * customer app, but uses an entirely independent split-screen layout
 * built specifically for an admin/back-office audience.
 *
 * Usage:
 *   <AdminLogin onLoginSuccess={(admin) => { ... }} />
 *
 * Demo credentials (for the built-in mock auth):
 *   email:    admin@inexgifts.com
 *   password: Admin@123
 * -----------------------------------------------------------------------
 */

const DEMO_EMAIL = "admin@inexgifts.com";
const DEMO_PASSWORD = "Admin@123";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AdminLogin({ onLoginSuccess = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const [toast, setToast] = useState(null);

  const validate = () => {
    const next = {};
    if (!email.trim()) {
      next.email = "Email address is required";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      next.email = "Enter a valid email address";
    }
    if (!password) {
      next.password = "Password is required";
    } else if (password.length < 6) {
      next.password = "Password must be at least 6 characters";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError("");
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulated network round-trip for the demo auth check.
    setTimeout(() => {
      setIsSubmitting(false);
      const emailMatches = email.trim().toLowerCase() === DEMO_EMAIL;
      const passwordMatches = password === DEMO_PASSWORD;

      if (emailMatches && passwordMatches) {
        setToast({ type: "success", message: "Welcome back! Redirecting to your dashboard…" });
        setTimeout(() => {
          onLoginSuccess({ email: email.trim(), remember });
        }, 700);
      } else {
        setAuthError("Incorrect email or password. Please try again.");
        setToast({ type: "error", message: "Login failed. Check your credentials." });
      }
    }, 900);
  };

  return (
    <div className="admin-login-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

        .admin-login-root {
          --primary-start: #4f46e5;
          --primary-mid: #7c3aed;
          --primary-end: #9333ea;
          --accent: #ec4899;
          --bg-wash: #f5f3ff;
          --ink: #1e1b4b;
          --muted: #6b6b8f;
          --danger: #ef4444;
          --success: #16a34a;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          width: 100%;
          display: flex;
          background: var(--bg-wash);
          color: var(--ink);
          position: relative;
          overflow: hidden;
        }
        .admin-login-root * { box-sizing: border-box; }
        .heading-font { font-family: 'Plus Jakarta Sans', sans-serif; }

        /* ---------- Left showcase panel ---------- */
        .admin-showcase {
          position: relative;
          flex: 1.05;
          min-width: 0;
          display: none;
          padding: 56px 60px;
          color: #fff;
          overflow: hidden;
          background:
            radial-gradient(120% 140% at 15% 10%, rgba(236,72,153,0.55), transparent 55%),
            radial-gradient(120% 140% at 90% 90%, rgba(79,70,229,0.65), transparent 55%),
            linear-gradient(160deg, var(--primary-start) 0%, var(--primary-mid) 55%, var(--primary-end) 100%);
        }
        @media (min-width: 980px) {
          .admin-showcase { display: flex; flex-direction: column; justify-content: space-between; }
        }
        .showcase-blob {
          position: absolute;
          border-radius: 999px;
          filter: blur(2px);
          opacity: 0.35;
          background: rgba(255,255,255,0.18);
        }
        .blob-1 { width: 260px; height: 260px; top: -80px; right: -60px; }
        .blob-2 { width: 180px; height: 180px; bottom: 10%; left: -40px; }

        .orbit-wrap {
          position: relative;
          width: 240px;
          height: 240px;
          margin: 24px auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .orbit-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px dashed rgba(255,255,255,0.35);
          animation: spin 18s linear infinite;
        }
        .orbit-ring.inner {
          inset: 26px;
          border-style: solid;
          border-color: rgba(255,255,255,0.18);
          animation-duration: 26s;
          animation-direction: reverse;
        }
        .orbit-dot {
          position: absolute;
          top: -7px;
          left: calc(50% - 7px);
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 16px 4px rgba(255,255,255,0.75);
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .shield-core {
          position: relative;
          width: 128px;
          height: 128px;
          border-radius: 32px;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.35);
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 45px -15px rgba(30,10,60,0.55);
        }

        .showcase-feature {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 16px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.16);
          backdrop-filter: blur(10px);
        }
        .showcase-feature-icon {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* ---------- Right form panel ---------- */
        .admin-form-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 20px;
          position: relative;
          z-index: 1;
        }
        .admin-form-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 28px;
          padding: 40px 36px 32px;
          box-shadow: 0 25px 60px -20px rgba(79,20,140,0.28), 0 4px 14px -4px rgba(79,20,140,0.10);
        }
        .brand-mark {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
        }
        .brand-mark-icon {
          width: 42px; height: 42px;
          border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
          box-shadow: 0 8px 18px -6px rgba(124,58,237,0.55);
        }
        .field-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 6px;
          display: block;
        }
        .field-shell {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border: 1.5px solid #e6e1fb;
          border-radius: 14px;
          padding: 12px 14px;
          transition: border-color .15s ease, box-shadow .15s ease;
        }
        .field-shell:focus-within {
          border-color: var(--primary-mid);
          box-shadow: 0 0 0 4px rgba(124,58,237,0.12);
        }
        .field-shell.has-error {
          border-color: var(--danger);
        }
        .field-shell input {
          border: none;
          outline: none;
          flex: 1;
          font-size: 14.5px;
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          background: transparent;
          min-width: 0;
        }
        .field-shell input::placeholder { color: #a8a3c9; }
        .field-error {
          color: var(--danger);
          font-size: 12.5px;
          margin-top: 6px;
          font-weight: 500;
        }
        .toggle-eye {
          background: none; border: none; cursor: pointer; color: #8b85b8;
          display: flex; align-items: center; padding: 2px;
        }
        .toggle-eye:hover { color: var(--primary-mid); }

        .remember-row {
          display: flex; align-items: center; justify-content: space-between;
          margin: 16px 0 22px;
          font-size: 13.5px;
        }
        .remember-check {
          display: flex; align-items: center; gap: 8px; color: var(--muted); cursor: pointer; user-select: none;
        }
        .remember-check input {
          width: 16px; height: 16px; accent-color: var(--primary-mid); cursor: pointer;
        }
        .forgot-link {
          color: var(--primary-mid);
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          background: none; border: none; font-size: 13.5px;
        }
        .forgot-link:hover { text-decoration: underline; }

        .login-btn {
          width: 100%;
          border: none;
          cursor: pointer;
          border-radius: 14px;
          padding: 14px 16px;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: linear-gradient(120deg, var(--primary-start), var(--primary-mid) 55%, var(--primary-end));
          box-shadow: 0 14px 28px -10px rgba(109,40,217,0.55);
          transition: transform .15s ease, box-shadow .15s ease, opacity .15s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .login-btn:hover { transform: translateY(-1px); box-shadow: 0 18px 34px -10px rgba(109,40,217,0.65); }
        .login-btn:active { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.75; cursor: not-allowed; transform: none; }

        .auth-error-banner {
          display: flex; align-items: center; gap: 8px;
          background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c;
          font-size: 13px; font-weight: 500; border-radius: 12px; padding: 10px 12px; margin-bottom: 16px;
        }

        .divider-row { display: flex; align-items: center; gap: 12px; margin: 22px 0 18px; }
        .divider-row .line { flex: 1; height: 1px; background: #e8e3fa; }
        .divider-row span { font-size: 12px; color: #a8a3c9; font-weight: 600; }

        .helper-footer {
          text-align: center; margin-top: 22px; font-size: 13px; color: var(--muted);
        }

        .toast-wrap {
          position: fixed;
          top: 22px; left: 50%; transform: translateX(-50%);
          z-index: 50;
          animation: toastIn .25s ease;
        }
        @keyframes toastIn { from { opacity: 0; transform: translate(-50%, -12px); } to { opacity: 1; transform: translate(-50%, 0); } }
        .toast-pill {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 18px; border-radius: 14px; font-size: 13.5px; font-weight: 600;
          box-shadow: 0 12px 30px -10px rgba(0,0,0,0.25);
          color: #fff;
        }
        .toast-pill.success { background: linear-gradient(120deg,#16a34a,#22c55e); }
        .toast-pill.error { background: linear-gradient(120deg,#dc2626,#ef4444); }

        .demo-hint {
          margin-top: 18px;
          font-size: 12px;
          color: #9088b8;
          background: #f6f4ff;
          border: 1px dashed #d9d2f8;
          border-radius: 12px;
          padding: 10px 12px;
          line-height: 1.5;
        }
        .demo-hint b { color: var(--ink); }
      `}</style>

      {toast && (
        <div className="toast-wrap" role="status">
          <div className={`toast-pill ${toast.type}`}>
            {toast.type === "success" ? <ShieldCheck size={16} /> : <Sparkles size={16} />}
            {toast.message}
          </div>
        </div>
      )}

      {/* Left showcase / brand panel */}
      <div className="admin-showcase">
        <div className="showcase-blob blob-1" />
        <div className="showcase-blob blob-2" />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.3)"
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div className="heading-font" style={{ fontWeight: 800, fontSize: 20, letterSpacing: 0.3 }}>INEX Gifts</div>
              <div style={{ fontSize: 11.5, opacity: 0.85, fontWeight: 600, letterSpacing: 1.2 }}>ADMIN CONSOLE</div>
            </div>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div className="orbit-wrap">
            <div className="orbit-ring">
              <div className="orbit-dot" />
            </div>
            <div className="orbit-ring inner" />
            <div className="shield-core">
              <ShieldCheck size={54} strokeWidth={1.6} />
            </div>
          </div>
          <h1 className="heading-font" style={{ fontSize: 27, fontWeight: 800, margin: "20px 0 8px", lineHeight: 1.25 }}>
            Command the storefront,<br /> one decision at a time.
          </h1>
          <p style={{ fontSize: 14.5, opacity: 0.88, maxWidth: 340, margin: "0 auto", lineHeight: 1.6 }}>
            Orders, inventory, gifting campaigns and customer trust — all in a single, secure console built for the INEX Gifts team.
          </p>
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="showcase-feature">
            <div className="showcase-feature-icon"><ShieldCheck size={17} /></div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13.5 }}>Role-based access</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>Every admin action is scoped, logged and reversible.</div>
            </div>
          </div>
          <div className="showcase-feature">
            <div className="showcase-feature-icon"><Sparkles size={17} /></div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13.5 }}>Real-time operations</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>Live orders, stock and revenue, refreshed as it happens.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="admin-form-panel">
        <div className="admin-form-card">
          <div className="brand-mark">
            <div className="brand-mark-icon"><ShieldCheck size={22} color="#fff" /></div>
            <div>
              <div className="heading-font" style={{ fontWeight: 800, fontSize: 16 }}>INEX Gifts</div>
              <div style={{ fontSize: 11.5, color: "#8b85b8", fontWeight: 600, letterSpacing: 0.6 }}>ADMIN LOGIN</div>
            </div>
          </div>

          <h2 className="heading-font" style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>
            Welcome Back 👋
          </h2>
          <p style={{ fontSize: 13.5, color: "#6b6b8f", margin: "0 0 26px" }}>
            Sign in to manage products, orders and customers.
          </p>

          {authError && (
            <div className="auth-error-banner">
              <Lock size={14} /> {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: 18 }}>
              <label className="field-label" htmlFor="admin-email">Email Address</label>
              <div className={`field-shell ${errors.email ? "has-error" : ""}`}>
                <Mail size={17} color="#8b85b8" />
                <input
                  id="admin-email"
                  type="email"
                  placeholder="you@inexgifts.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                />
              </div>
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>

            <div>
              <label className="field-label" htmlFor="admin-password">Password</label>
              <div className={`field-shell ${errors.password ? "has-error" : ""}`}>
                <Lock size={17} color="#8b85b8" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-eye"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && <div className="field-error">{errors.password}</div>}
            </div>

            <div className="remember-row">
              <label className="remember-check">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Remember me
              </label>
              <button type="button" className="forgot-link" onClick={() => setToast({ type: "success", message: "Password reset link sent to your email." })}>
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="login-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="spin-icon" style={{ animation: "spin 1s linear infinite" }} />
                  Signing in…
                </>
              ) : (
                <>
                  Login <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="divider-row"><div className="line" /><span>SECURE ADMIN ACCESS</span><div className="line" /></div>

          <p className="helper-footer">
            Trouble signing in? Contact your <b style={{ color: "#4f46e5" }}>Super Admin</b>.
          </p>

          <div className="demo-hint">
            <b>Demo credentials</b> — email: admin@inexgifts.com · password: Admin@123
          </div>
        </div>
      </div>
    </div>
  );
}
