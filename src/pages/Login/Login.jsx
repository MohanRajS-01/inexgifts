import { useRef, useState } from "react";
import giftsShowcase from "../../assets/gifts_showcase.png";
import { useAuth } from "../../context/AuthContext";

const DEFAULT_USERS = [
  {
    name: "Alex Morgan",
    phone: "9876543210",
    email: "user@example.com",
    password: "password123",
  },
  {
    name: "VENKATESH (Admin)",
    phone: "9123456789",
    email: "mohan@inexgifts.com",
    password: "password123",
  }
];

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 11l2 2 4-4" />
      </svg>
    ),
    title: "Premium Quality",
    desc: "Finest quality products",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="16" y1="11" x2="22" y2="11" />
      </svg>
    ),
    title: "Personalized for You",
    desc: "Custom made with love",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <rect x="9" y="11" width="6" height="5" rx="1" />
        <path d="M10 11V9a2 2 0 1 1 4 0v2" />
      </svg>
    ),
    title: "Secure Shopping",
    desc: "100% safe & secure",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Fast Delivery",
    desc: "On-time delivery promise",
  },
];

const trustBadges = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    label: "Secure Checkout",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      </svg>
    ),
    label: "7 Days Replacement",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 11l2 2 4-4" />
      </svg>
    ),
    label: "100% Genuine Products",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    label: "Customer Support",
  },
];

export default function Login({ setView }) {
  const { loginCustomer, registerUser, loginWithGoogle, resetUserPassword } = useAuth() || {};

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const emailClean = forgotEmail.trim().toLowerCase();
    if (!emailClean || !/\S+@\S+\.\S+/.test(emailClean)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      if (resetUserPassword) {
        const res = await resetUserPassword(emailClean);
        setSuccessMessage(res.message || `Password reset link has been sent to ${emailClean}! Check your email inbox.`);
      } else {
        setSuccessMessage(`Password reset request sent for ${emailClean}! Please check your email inbox.`);
      }
      setForgotPasswordModal(false);
      setForgotEmail("");
    } catch (err) {
      setErrorMessage(err.message || "Failed to send password reset email.");
    }
  };
  const [activeTab, setActiveTab] = useState("login");
  const [loginMode, setLoginMode] = useState("email"); // "email" | "otp"

  // Google Login Handler
  const handleGoogleLogin = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      if (loginWithGoogle) {
        const res = await loginWithGoogle();
        setSuccessMessage(`Welcome, ${res.user.name}! Logging you in with Google...`);
        setTimeout(() => {
          if (typeof setView === "function") {
            if (res.user.role === 'admin') {
              setView("admin");
            } else {
              setView("home1");
            }
          }
        }, 600);
      }
    } catch (err) {
      setErrorMessage(err.message || "Could not sign in with Google.");
    }
  };

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state (Name, Phone Number, Email, Delivery Address, Pincode, Password)
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regPincode, setRegPincode] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);

  // OTP login state
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [showOtp, setShowOtp] = useState(false);
  const [otpDisplay, setOtpDisplay] = useState("+91 XXXXXXXX");
  const otpRefs = useRef([]);

  // UI feedback
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const getRegisteredUsers = () => {
    try {
      const stored = localStorage.getItem("inex_registered_users");
      if (stored) return JSON.parse(stored);
    } catch (err) {
      console.error(err);
    }
    return DEFAULT_USERS;
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleFillDemo = () => {
    setLoginEmail("user@example.com");
    setLoginPassword("password123");
    setErrorMessage("");
  };

  // Login Submit (Email & Password)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const emailClean = loginEmail.trim().toLowerCase();
    const passClean = loginPassword.trim();

    if (!emailClean) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(emailClean)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!passClean) {
      setErrorMessage("Please enter your password.");
      return;
    }

    try {
      if (loginCustomer) {
        const res = await loginCustomer(emailClean, passClean);
        setSuccessMessage(`Welcome back, ${res.user.name}! Redirecting...`);
        setTimeout(() => {
          if (typeof setView === "function") {
            if (res.user.role === 'admin') {
              setView("admin");
            } else {
              setView("home1");
            }
          }
        }, 600);
      }
    } catch (err) {
      setErrorMessage(err.message || "Invalid email or password.");
    }
  };

  // Register Submit (Name, Phone Number, Email, Delivery Address, Pincode, Password)
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const nameClean = regName.trim();
    const phoneClean = regPhone.trim().replace(/\D/g, "");
    const emailClean = regEmail.trim().toLowerCase();
    const addressClean = regAddress.trim();
    const pincodeClean = regPincode.trim();
    const passClean = regPassword.trim();

    if (!nameClean) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!phoneClean || phoneClean.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!emailClean || !/\S+@\S+\.\S+/.test(emailClean)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!addressClean) {
      setErrorMessage("Please enter your delivery address.");
      return;
    }

    if (!pincodeClean || pincodeClean.length < 6) {
      setErrorMessage("Please enter a valid 6-digit pincode.");
      return;
    }

    if (!passClean || passClean.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (!agreedTerms) {
      setErrorMessage("Please accept the Terms & Conditions to proceed.");
      return;
    }

    try {
      if (registerUser) {
        await registerUser(nameClean, emailClean, phoneClean, passClean, addressClean, pincodeClean);
        setSuccessMessage("Account created successfully with delivery address! Logging you in...");
        setTimeout(() => {
          if (typeof setView === "function") {
            setView("home1");
          }
        }, 800);
      }
    } catch (err) {
      setErrorMessage(err.message || "Could not register account.");
    }
  };

  // OTP Login Submit
  const handleOtpLoginSubmit = (e) => {
    e.preventDefault();
    const cleaned = mobile.trim();

    if (!/^\d{10}$/.test(cleaned)) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setErrorMessage("");
    setOtpDisplay(`+91 ${cleaned}`);
    setOtp(Array(6).fill(""));
    setShowOtp(true);
    setTimeout(() => otpRefs.current[0]?.focus(), 50);
  };

  const handleOtpChange = (index, value) => {
    const nextValue = value.replace(/\D/g, "").slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = nextValue;
    setOtp(newOtp);

    if (nextValue && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      otpRefs.current[index - 1]?.focus();
      return;
    }
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    if (!allowed.includes(e.key) && !/^\d$/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    if (/^\d{6}$/.test(pasted)) {
      setOtp(pasted.split(""));
      otpRefs.current[5]?.focus();
    }
  };

  const handleOtpVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6 || otp.some((digit) => digit === "")) {
      alert("Please enter the full 6-digit OTP.");
      return;
    }

    alert(`OTP verified successfully!`);
    setShowOtp(false);
    setOtp(Array(6).fill(""));
    setMobile("");
    if (typeof setView === "function") {
      setView("home1");
    }
  };

  const closeOtp = () => {
    setShowOtp(false);
    setOtp(Array(6).fill(""));
  };

  return (
    <div className="app min-h-screen bg-[#f6f2ff] text-[#1f1b33] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-[1440px] grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        
        {/* Left Side: Branding & Features Showcase */}
        <aside className="hidden lg:flex relative flex-col justify-between overflow-hidden rounded-[40px] border border-[#ebe5ff] bg-[linear-gradient(160deg,_#f8f2ff_0%,_#fff9fe_100%)] p-8 shadow-[0_30px_70px_rgba(79,59,246,0.09)]">
          <div>
            <div className="flex items-center gap-3 rounded-[24px] border border-[#ebe5ff] bg-white/90 px-4 py-3 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#6c53ff] text-white shadow-[0_12px_24px_rgba(109,88,255,0.22)]">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="4" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[1.45rem] font-extrabold tracking-[-0.03em] text-[#1f1b33]">INEX</span>
                <span className="mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[#7d67ff]">Gifts</span>
              </div>
            </div>

            <div className="mt-10 max-w-[440px]">
              <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-[#7d67ff]">Make every moment</p>
              <h1 className="text-[3.4rem] font-extrabold leading-[0.95] tracking-[-0.03em] text-[#1f1b33]">
                Extra Special <span className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#f5edff] text-[#7d67ff]">♥</span>
              </h1>
              <p className="mt-4 text-[1rem] leading-7 text-[#6f6a85]">Personalized gifts for your loved ones, delivered with premium presentation and care.</p>
            </div>
          </div>

          <div className="relative my-8 flex min-h-[280px] items-center justify-center rounded-[36px] bg-white/95 p-4 shadow-[0_18px_60px_rgba(79,59,246,0.16)]">
            <div className="absolute inset-x-8 top-8 h-24 rounded-[36px] bg-[radial-gradient(circle_at_top,_rgba(124,99,255,0.24)_0%,_rgba(255,255,255,0)_100%)]"></div>
            <img src={giftsShowcase} alt="Gift showcase" className="relative z-10 h-full w-full rounded-[32px] object-cover object-center" />
          </div>

          <div className="grid gap-4 rounded-[32px] border border-[#ebe5ff] bg-white p-6 shadow-sm sm:grid-cols-2">
            {features.map((item, index) => (
              <div key={index} className="flex items-start gap-3 rounded-[24px] bg-[#f8f4ff] p-4">
                <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-[14px] bg-[#ede9ff] text-[#6c53ff]">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[0.92rem] font-semibold text-[#1f1b33]">{item.title}</p>
                  <p className="mt-1 text-[0.82rem] text-[#7d7594]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-[#eee7ff] pt-6 text-[#6f6a85]">
            <p className="text-[0.95rem] font-semibold text-[#1f1b33]">4.8/5 from 10,000+ happy customers</p>
            <a href="#" className="text-[0.95rem] font-semibold text-[#6c53ff] transition hover:text-[#5040d4]">Need help? Contact us</a>
          </div>
        </aside>

        {/* Right Side: Authentication Card */}
        <main className="relative rounded-[40px] bg-white p-6 sm:p-8 shadow-[0_30px_70px_rgba(79,59,246,0.08)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-sm text-[#6e6a8a]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => typeof setView === 'function' && setView('home1')}
                  className="inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-[#6c53ff] hover:text-[#5040d4] transition"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Back to Home
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[#ede9ff] bg-[#fbf8ff] px-4 py-2 font-semibold text-[#5f5a7f] shadow-sm transition hover:bg-[#f4efff]">
                  English
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-[2.1rem] sm:text-[2.3rem] font-extrabold text-[#1f1b33]">
                {activeTab === "login" ? "Welcome Back! 👋" : "Create an Account 🎁"}
              </h2>
              <p className="mt-2 text-[0.98rem] text-[#6f6a85]">
                {activeTab === "login" 
                  ? "Log in using your email & password to explore INEX Gifts" 
                  : "Register with your details to unlock exclusive personalized gift offers"}
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="mt-6 flex rounded-full bg-[#f5f1ff] p-1.5">
              <button
                type="button"
                className={`flex flex-1 items-center justify-center rounded-full px-4 py-3 text-[0.95rem] font-bold transition ${
                  activeTab === "login"
                    ? "bg-white text-[#6c53ff] shadow-[0_12px_30px_rgba(124,99,255,0.15)]"
                    : "text-[#8f8ba8] hover:text-[#5f5980]"
                }`}
                onClick={() => switchTab("login")}
              >
                Login
              </button>
              <button
                type="button"
                className={`flex flex-1 items-center justify-center rounded-full px-4 py-3 text-[0.95rem] font-bold transition ${
                  activeTab === "register"
                    ? "bg-white text-[#6c53ff] shadow-[0_12px_30px_rgba(124,99,255,0.15)]"
                    : "text-[#8f8ba8] hover:text-[#5f5980]"
                }`}
                onClick={() => switchTab("register")}
              >
                Register
              </button>
            </div>

            {/* Feedback Alerts */}
            {errorMessage && (
              <div className="mt-5 flex items-center gap-3 rounded-[20px] bg-[#fff0f2] border border-[#ffccd3] p-4 text-[#d92d20]">
                <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-[0.9rem] font-medium leading-snug">{errorMessage}</p>
              </div>
            )}

            {successMessage && (
              <div className="mt-5 flex items-center gap-3 rounded-[20px] bg-[#f0fdf4] border border-[#bbf7d0] p-4 text-[#15803d]">
                <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p className="text-[0.9rem] font-semibold leading-snug">{successMessage}</p>
              </div>
            )}

            {/* LOGIN FORM (Email & Password) */}
            {activeTab === "login" && (
              <div className="mt-6">
                {loginMode === "email" ? (
                  <form className="space-y-4" onSubmit={handleLoginSubmit}>
                    {/* Email Input */}
                    <div>
                      <label htmlFor="loginEmail" className="block text-[0.9rem] font-semibold text-[#4a4568] mb-1.5">
                        Email Address
                      </label>
                      <div className="flex items-center gap-3 rounded-[22px] border border-[#e5e0fb] bg-[#fbf9ff] px-4 py-3.5 focus-within:border-[#7d67ff] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#eee9ff] transition">
                        <svg className="h-5 w-5 text-[#8e87b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <input
                          id="loginEmail"
                          type="email"
                          required
                          className="w-full bg-transparent text-[0.95rem] text-[#1f1b33] outline-none placeholder:text-[#ab9fcd]"
                          placeholder="name@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="loginPassword" className="block text-[0.9rem] font-semibold text-[#4a4568]">
                          Password
                        </label>
                        <button
                          type="button"
                          className="text-[0.84rem] font-semibold text-[#6c53ff] hover:text-[#5040d4]"
                          onClick={() => setForgotPasswordModal(true)}
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="flex items-center gap-3 rounded-[22px] border border-[#e5e0fb] bg-[#fbf9ff] px-4 py-3.5 focus-within:border-[#7d67ff] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#eee9ff] transition">
                        <svg className="h-5 w-5 text-[#8e87b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <input
                          id="loginPassword"
                          type={showLoginPassword ? "text" : "password"}
                          required
                          className="w-full bg-transparent text-[0.95rem] text-[#1f1b33] outline-none placeholder:text-[#ab9fcd]"
                          placeholder="Enter your password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="text-[#8e87b8] hover:text-[#6c53ff] focus:outline-none"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                        >
                          {showLoginPassword ? (
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                              <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember me options */}
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2.5 cursor-pointer text-[0.88rem] text-[#635c85]">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 rounded border-[#d4cbff] text-[#6c53ff] focus:ring-[#7d67ff]"
                        />
                        Remember me
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="mt-2 w-full rounded-[26px] bg-gradient-to-r from-[#7d67ff] to-[#5b45ff] px-6 py-4 text-[0.98rem] font-bold text-white shadow-[0_16px_36px_rgba(124,103,255,0.32)] transition hover:opacity-95 active:scale-[0.99]"
                    >
                      Log In to INEX Gifts
                    </button>
                  </form>
                ) : (
                  /* Mobile OTP Mode */
                  <form className="space-y-4" onSubmit={handleOtpLoginSubmit}>
                    <div className="rounded-[28px] border border-[#ece6ff] bg-[#fbf8ff] p-4 shadow-sm">
                      <label htmlFor="mobile" className="block text-[0.92rem] font-semibold text-[#5d5780]">Mobile Number</label>
                      <div className="mt-3 flex items-center gap-3 rounded-[22px] border border-[#e9e4ff] bg-white px-4 py-3 shadow-sm">
                        <span className="text-[#7f78a4] font-semibold">+91</span>
                        <input
                          id="mobile"
                          type="tel"
                          className="w-full border-none bg-transparent text-[0.95rem] text-[#25223b] outline-none placeholder:text-[#b7add6]"
                          placeholder="Enter 10-digit mobile number"
                          maxLength="10"
                          autoComplete="tel"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                        />
                      </div>
                      <p className="mt-2 text-[0.82rem] text-[#7c76a5]">We will send you a 6-digit OTP code.</p>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-[26px] bg-gradient-to-r from-[#7d67ff] to-[#5b45ff] px-6 py-4 text-[0.95rem] font-bold text-white shadow-[0_18px_40px_rgba(124,103,255,0.28)] transition hover:opacity-95"
                    >
                      Send Login OTP
                    </button>
                  </form>
                )}

                {/* Login Mode Toggle */}
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    className="text-[0.88rem] font-semibold text-[#6c53ff] hover:underline"
                    onClick={() => {
                      setLoginMode(loginMode === "email" ? "otp" : "email");
                      setErrorMessage("");
                    }}
                  >
                    {loginMode === "email" ? "📲 Login with Mobile OTP instead" : "📧 Login with Email & Password instead"}
                  </button>
                </div>
              </div>
            )}

            {/* REGISTER FORM (Name, Phone Number, Email, Password) */}
            {activeTab === "register" && (
              <form className="mt-5 space-y-3.5" onSubmit={handleRegisterSubmit}>
                {/* Full Name */}
                <div>
                  <label htmlFor="regName" className="block text-[0.88rem] font-semibold text-[#4a4568] mb-1">
                    Full Name
                  </label>
                  <div className="flex items-center gap-3 rounded-[20px] border border-[#e5e0fb] bg-[#fbf9ff] px-4 py-3 focus-within:border-[#7d67ff] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#eee9ff] transition">
                    <svg className="h-5 w-5 text-[#8e87b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      id="regName"
                      type="text"
                      required
                      className="w-full bg-transparent text-[0.93rem] text-[#1f1b33] outline-none placeholder:text-[#ab9fcd]"
                      placeholder="Enter your full name"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="regPhone" className="block text-[0.88rem] font-semibold text-[#4a4568] mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-3 rounded-[20px] border border-[#e5e0fb] bg-[#fbf9ff] px-4 py-3 focus-within:border-[#7d67ff] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#eee9ff] transition">
                    <span className="text-[#7d67ff] font-semibold text-[0.9rem]">+91</span>
                    <input
                      id="regPhone"
                      type="tel"
                      required
                      maxLength="10"
                      className="w-full bg-transparent text-[0.93rem] text-[#1f1b33] outline-none placeholder:text-[#ab9fcd]"
                      placeholder="10-digit mobile number"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="regEmail" className="block text-[0.88rem] font-semibold text-[#4a4568] mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 rounded-[20px] border border-[#e5e0fb] bg-[#fbf9ff] px-4 py-3 focus-within:border-[#7d67ff] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#eee9ff] transition">
                    <svg className="h-5 w-5 text-[#8e87b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <input
                      id="regEmail"
                      type="email"
                      required
                      className="w-full bg-transparent text-[0.93rem] text-[#1f1b33] outline-none placeholder:text-[#ab9fcd]"
                      placeholder="name@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <label htmlFor="regAddress" className="block text-[0.88rem] font-semibold text-[#4a4568] mb-1">
                    Delivery Address / Street
                  </label>
                  <div className="flex items-center gap-3 rounded-[20px] border border-[#e5e0fb] bg-[#fbf9ff] px-4 py-3 focus-within:border-[#7d67ff] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#eee9ff] transition">
                    <svg className="h-5 w-5 text-[#8e87b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <input
                      id="regAddress"
                      type="text"
                      required
                      className="w-full bg-transparent text-[0.93rem] text-[#1f1b33] outline-none placeholder:text-[#ab9fcd]"
                      placeholder="e.g. 123 Park Avenue, Block C, Chennai"
                      value={regAddress}
                      onChange={(e) => setRegAddress(e.target.value)}
                    />
                  </div>
                </div>

                {/* Pincode */}
                <div>
                  <label htmlFor="regPincode" className="block text-[0.88rem] font-semibold text-[#4a4568] mb-1">
                    Area Pincode
                  </label>
                  <div className="flex items-center gap-3 rounded-[20px] border border-[#e5e0fb] bg-[#fbf9ff] px-4 py-3 focus-within:border-[#7d67ff] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#eee9ff] transition">
                    <svg className="h-5 w-5 text-[#8e87b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    <input
                      id="regPincode"
                      type="text"
                      required
                      maxLength="6"
                      className="w-full bg-transparent text-[0.93rem] text-[#1f1b33] outline-none placeholder:text-[#ab9fcd]"
                      placeholder="e.g. 600028"
                      value={regPincode}
                      onChange={(e) => setRegPincode(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="regPassword" className="block text-[0.88rem] font-semibold text-[#4a4568] mb-1">
                    Create Password
                  </label>
                  <div className="flex items-center gap-3 rounded-[20px] border border-[#e5e0fb] bg-[#fbf9ff] px-4 py-3 focus-within:border-[#7d67ff] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#eee9ff] transition">
                    <svg className="h-5 w-5 text-[#8e87b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                      id="regPassword"
                      type={showRegPassword ? "text" : "password"}
                      required
                      className="w-full bg-transparent text-[0.93rem] text-[#1f1b33] outline-none placeholder:text-[#ab9fcd]"
                      placeholder="At least 6 characters"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="text-[#8e87b8] hover:text-[#6c53ff] focus:outline-none"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                    >
                      {showRegPassword ? (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms agreement */}
                <div className="pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer text-[0.85rem] text-[#635c85]">
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="h-4 w-4 rounded border-[#d4cbff] text-[#6c53ff] focus:ring-[#7d67ff]"
                    />
                    I agree to the <a href="#" className="text-[#6c53ff] font-semibold hover:underline">Terms of Service</a> & <a href="#" className="text-[#6c53ff] font-semibold hover:underline">Privacy Policy</a>
                  </label>
                </div>

                {/* Submit Register Button */}
                <button
                  type="submit"
                  className="mt-2 w-full rounded-[26px] bg-gradient-to-r from-[#7d67ff] to-[#5b45ff] px-6 py-3.5 text-[0.98rem] font-bold text-white shadow-[0_16px_36px_rgba(124,103,255,0.32)] transition hover:opacity-95 active:scale-[0.99]"
                >
                  Register Account
                </button>
              </form>
            )}

            {/* Social Logins (Google Only) */}
            <div className="mt-6 flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.2em] text-[#a79fe4]">
              <span className="h-px flex-1 bg-[#ece6ff]"></span>
              or continue with
              <span className="h-px flex-1 bg-[#ece6ff]"></span>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex h-12 items-center justify-center gap-3 rounded-[22px] border border-[#ece6ff] bg-[#fbf9ff] hover:bg-white text-[#3e3a58] font-extrabold text-xs sm:text-sm shadow-xs transition cursor-pointer active:scale-95"
                title="Google Login"
              >
                <svg className="h-5 w-5" viewBox="0 0 488 512" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </div>

          {/* Bottom Security Notice & Footer Badges */}
          <div className="mt-6">
            <div className="rounded-[24px] border border-[#ece6ff] bg-[#f8f5ff] p-3.5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#efe9ff] text-[#6c53ff]">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 11l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.9rem] font-semibold text-[#25223b]">100% Encrypted & Safe</p>
                  <p className="text-[0.82rem] text-[#7c76a5]">Your personal details are protected by enterprise grade security.</p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-[0.9rem] text-[#6f6a85]">
              {activeTab === "login" ? (
                <>
                  New to INEX Gifts?{" "}
                  <button type="button" className="font-bold text-[#6c53ff] hover:underline" onClick={() => switchTab("register")}>
                    Register Now
                  </button>
                </>
              ) : (
                <>
                  Already registered?{" "}
                  <button type="button" className="font-bold text-[#6c53ff] hover:underline" onClick={() => switchTab("login")}>
                    Log In Here
                  </button>
                </>
              )}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#f1efff] pt-4 sm:grid-cols-4">
              {trustBadges.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-1.5 rounded-[18px] bg-[#faf8ff] p-2.5 text-center shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f4efff] text-[#6c53ff]">
                    {item.icon}
                  </div>
                  <p className="text-[0.7rem] font-semibold leading-tight text-[#7c76a9]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* OTP Modal (if mobile OTP mode is used) */}
          {showOtp && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-[rgba(15,23,42,0.55)] p-4 rounded-[40px]" onClick={(e) => e.target === e.currentTarget && closeOtp()}>
              <div className="w-full max-w-[360px] rounded-[28px] bg-white p-6 text-center shadow-2xl">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f2ff] text-[#4f3bf6]">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </div>
                <h3 className="text-[1.3rem] font-bold text-[#1f1a3a]">Verify OTP Code</h3>
                <p className="mt-1.5 text-[0.9rem] text-[#718096]">
                  Sent 6-digit code to <strong className="text-[#1f1a3a]">{otpDisplay}</strong>
                </p>
                <div className="mt-4 grid grid-cols-6 gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="1"
                      className="h-11 w-full rounded-[16px] border border-[#e5e1f7] bg-[#faf7ff] text-center text-[1.1rem] font-bold text-[#1f1a3a] outline-none focus:border-[#7c63ff] focus:ring-2 focus:ring-[#ede8ff]"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                    />
                  ))}
                </div>
                <div className="mt-5 flex gap-2 justify-center">
                  <button type="button" className="rounded-[20px] border border-[#e7e3ff] px-4 py-2 text-[0.88rem] font-semibold text-[#5f5a7f]" onClick={closeOtp}>
                    Cancel
                  </button>
                  <button type="button" className="rounded-[20px] bg-[#6c53ff] px-5 py-2 text-[0.88rem] font-semibold text-white" onClick={handleOtpVerify}>
                    Verify & Login
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Forgot Password Modal */}
          {forgotPasswordModal && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-[rgba(15,23,42,0.55)] p-4 rounded-[40px]" onClick={(e) => e.target === e.currentTarget && setForgotPasswordModal(false)}>
              <div className="w-full max-w-[380px] rounded-[28px] bg-white p-6 shadow-2xl">
                <h3 className="text-[1.3rem] font-bold text-[#1f1a3a]">Reset Password</h3>
                <p className="mt-2 text-[0.88rem] text-[#6f6a85]">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <form onSubmit={handleForgotPasswordSubmit} className="mt-4 space-y-4">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full rounded-[18px] border border-[#e5e0fb] bg-[#fbf9ff] px-4 py-3 text-[0.92rem] outline-none focus:border-[#7d67ff]"
                  />
                  <div className="flex gap-2 justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordModal(false)}
                      className="rounded-[20px] border border-[#e7e3ff] px-4 py-2 text-[0.88rem] font-semibold text-[#5f5a7f]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-[20px] bg-[#6c53ff] px-5 py-2 text-[0.88rem] font-semibold text-white shadow-md hover:bg-[#583eff]"
                    >
                      Send Reset Link
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
