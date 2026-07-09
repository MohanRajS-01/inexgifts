import { useRef, useState } from "react";
const giftsShowcase = new URL('/public/assets/gifts_showcase.png', import.meta.url).href;

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

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [showOtp, setShowOtp] = useState(false);
  const [otpDisplay, setOtpDisplay] = useState("+91 XXXXXXXX");
  const otpRefs = useRef([]);

  const submitLabel = activeTab === "login" ? "Send OTP" : "Register with OTP";

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = mobile.trim();

    if (!/^\d{10}$/.test(cleaned)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setOtpDisplay(`+91 ${cleaned}`);
    setOtp(Array(6).fill(""));
    setShowOtp(true);
    setTimeout(() => otpRefs.current[0]?.focus(), 0);
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

    alert(`OTP verified successfully! (Code: ${enteredOtp})`);
    setShowOtp(false);
    setOtp(Array(6).fill(""));
    setMobile("");
  };

  const closeOtp = () => {
    setShowOtp(false);
    setOtp(Array(6).fill(""));
  };

  const handleResend = (e) => {
    e.preventDefault();
    alert("A new OTP has been sent to your mobile number.");
    setOtp(Array(6).fill(""));
    otpRefs.current[0]?.focus();
  };

  return (
    <div className="app min-h-screen bg-[#fcfbfe] text-[#1a1523] flex items-center justify-center p-0 sm:p-4 lg:p-6">
      <div className="w-full max-w-[1440px] h-[100vh] sm:h-auto min-h-[900px] lg:h-[920px] grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 p-4 sm:p-6 lg:p-8">
        <aside className="hidden lg:flex panel panel--promo relative flex-col justify-between overflow-hidden rounded-[40px] border border-[rgba(91,69,255,0.08)] bg-[linear-gradient(145deg,_#efecff_0%,_#fef7ff_100%)] p-8 sm:p-10 lg:p-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#5b45ff] text-white shadow-[0_8px_16px_rgba(91,69,255,0.25)]">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 20 8 15 13"></polyline>
                  <path d="M22 12V21a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V12c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2z"></path>
                  <rect x="2" y="5" width="20" height="5" rx="1"></rect>
                  <line x1="12" y1="5" x2="12" y2="23"></line>
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[#1f1a3a]">INEX</span>
                <span className="mt-[2px] text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#5b45ff]">Gifts</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6">
            <p className="mb-2 text-[0.85rem] font-bold uppercase tracking-[0.1em] text-[#5b45ff]">Make Every Moment</p>
            <h1 className="text-[2.8rem] font-extrabold leading-[1.2] text-[#1f1a3a]">
              Extra Special <span className="ml-1 inline-block align-middle font-['Dancing_Script'] text-[3.5rem] font-bold text-[#4f3bf6]">♡</span>
            </h1>
            <p className="mt-3 text-[1.05rem] font-medium text-[#6d6585]">Personalized gifts for your loved ones 🎁</p>
          </div>

          <div className="relative my-4 flex min-h-[250px] flex-1 items-center justify-center">
            <div className="absolute h-[80%] w-[80%] rounded-full bg-[radial-gradient(circle,_rgba(219,206,255,0.4)_0%,_rgba(254,247,255,0)_70%)]"></div>
            <img src={giftsShowcase} alt="Personalized Gifts Showcase" className="relative z-10 max-h-full max-w-[90%] object-contain drop-shadow-[0_20px_40px_rgba(79,59,246,0.12)]" />
          </div>

          <div className="relative z-10 mb-6 grid grid-cols-1 gap-4 rounded-[28px] border border-[rgba(91,69,255,0.04)] bg-white p-6 shadow-[0_12px_36px_rgba(91,69,255,0.04)] sm:grid-cols-2">
            {features.map((item, index) => (
              <div key={index} className="flex items-center gap-[14px]">
                <div className="flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center rounded-[14px] bg-[#f4f2ff] text-[#5b45ff]">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.9rem] font-bold text-[#1f1a3a]">{item.title}</span>
                  <span className="mt-[2px] text-[0.8rem] text-[#8c85a5]">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-[rgba(91,69,255,0.08)] pt-6">
            <div className="flex flex-col gap-1">
              <div className="text-[1.1rem] tracking-[2px] text-[#fbc02d]">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div className="text-[0.82rem] font-semibold text-[#6d6585]">4.8/5 from 10,000+ happy customers</div>
            </div>
            <a href="#" className="text-[0.9rem] font-bold text-[#5b45ff] transition-colors hover:text-[#4332d9]">Need help? Contact Us</a>
          </div>
        </aside>

        <main className="panel panel--auth flex items-center justify-center rounded-[40px] bg-[#f7f6fc] p-0">
          <div className="auth-inner relative flex w-full max-w-[480px] flex-col overflow-hidden rounded-[32px] border border-[rgba(91,69,255,0.08)] bg-white shadow-[0_20px_60px_rgba(79,59,246,0.10),0_4px_16px_rgba(0,0,0,0.04)]">
            <div className="z-10 flex justify-end bg-white px-6 pt-3 pb-0">
              <button type="button" className="flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white px-3.5 py-1.5 text-[0.82rem] font-semibold text-[#4a5568] transition-colors hover:bg-[#f7fafc]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>English</span>
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            <div className="scroll-content flex-1 overflow-y-auto px-8 py-7">
              <div className="mb-6 mt-3">
                <h2 className="text-[1.7rem] font-extrabold text-[#1a1523]">Welcome Back! 👋</h2>
                <p className="mt-1 text-[0.9rem] font-medium text-[#718096]">Login to continue to INEX Gifts</p>
              </div>

              <div className="mb-6 flex rounded-full bg-[#f3f0fc] p-1">
                <button
                  type="button"
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-3 text-[0.92rem] font-bold transition-all ${activeTab === "login" ? "bg-white text-[#4f3bf6] shadow-[0_4px_12px_rgba(79,59,246,0.08)]" : "text-[#718096]"}`}
                  onClick={() => switchTab("login")}
                >
                  <svg className={`h-4 w-4 ${activeTab === "login" ? "text-[#4f3bf6]" : "text-[#718096]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  <span>Login</span>
                </button>
                <button
                  type="button"
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-3 text-[0.92rem] font-bold transition-all ${activeTab === "register" ? "bg-white text-[#4f3bf6] shadow-[0_4px_12px_rgba(79,59,246,0.08)]" : "text-[#718096]"}`}
                  onClick={() => switchTab("register")}
                >
                  <svg className={`h-4 w-4 ${activeTab === "register" ? "text-[#4f3bf6]" : "text-[#718096]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="16" y1="11" x2="22" y2="11" />
                  </svg>
                  <span>Register</span>
                </button>
              </div>

              <span className="mb-3 block text-center text-[0.95rem] font-medium text-[#718096]">Login with</span>

              <div className="mb-4 flex justify-center gap-3">
                <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e2e8f0] bg-white transition-colors hover:bg-[#f8fafc]" aria-label="Login with Google">
                  <svg className="h-[22px] w-[22px]" viewBox="0 0 488 512" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                    <path fill="#34A853" d="M139.5 341.3l-22.1-16.9-74.3 57.8C68.6 444.7 153.3 488 248 488c66.1 0 121.7-21.8 162.3-59.2l-76.7-59.4c-21.4 14.4-48.9 23-85.6 23-65.8 0-121.5-44.4-141.5-104.1z" />
                    <path fill="#FBBC05" d="M139.5 170.7c20-59.7 75.7-104.1 141.5-104.1 38.7 0 73.3 13.3 100.7 39.3l71.1-71.1C406.7 38.1 331.5 8 281 8 186.1 8 103.6 51.3 68.2 128.7l71.3 42z" />
                    <path fill="#EA4335" d="M248 104.1c34.8 0 66.1 11.9 90.7 35.3l67.6-67.6C371.3 55.5 313.2 32 248 32 153.3 32 68.6 75.3 45.1 130.8l74.3 57.8C139.5 127 191.3 104.1 248 104.1z" />
                  </svg>
                </button>
                <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e2e8f0] bg-white transition-colors hover:bg-[#f8fafc]" aria-label="Login with Facebook">
                  <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e2e8f0] bg-white transition-colors hover:bg-[#f8fafc]" aria-label="Login with Apple">
                  <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.054 2.107-.973 3.956-.973 1.853 0 2.385.973 3.966.942 1.6-.027 2.661-1.474 3.64-2.9 1.128-1.64 1.592-3.23 1.621-3.314-.03-.016-3.11-1.194-3.143-4.757-.027-2.986 2.445-4.42 2.557-4.482-1.4-2.05-3.56-2.285-4.32-2.34-1.977-.16-3.83 1.21-4.838 1.21zM15.932 4.16c.808-.98 1.348-2.332 1.2-3.682-1.16.047-2.563.771-3.395 1.745-.733.844-1.373 2.215-1.2 3.543 1.29.1 2.613-.655 3.395-1.606z" />
                  </svg>
                </button>
              </div>

              <div className="mb-5 flex items-center justify-center">
                <div className="h-px flex-1 bg-[#e2e8f0]"></div>
                <span className="px-3 text-[0.9rem] font-medium uppercase tracking-[0.2em] text-[#718096]">or</span>
                <div className="h-px flex-1 bg-[#e2e8f0]"></div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-[0.9rem] font-semibold text-[#4a5568]" htmlFor="mobile">Mobile Number</label>
                  <div className="flex items-center rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 shadow-sm">
                    <span className="mr-2 flex items-center text-[#7b8794]">
                      <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <span className="mr-2 text-[0.95rem] font-semibold text-[#4a5568]">+91</span>
                    <input
                      id="mobile"
                      type="tel"
                      className="w-full border-none bg-transparent text-[0.95rem] text-[#1f2937] outline-none"
                      placeholder="Enter your mobile number"
                      maxLength="10"
                      autoComplete="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                  <span className="mt-2 block text-[0.8rem] text-[#718096]">We will send you a 6 digit OTP</span>
                </div>

                <button type="submit" className="w-full rounded-2xl bg-[#4f3bf6] px-4 py-3 text-[0.95rem] font-semibold text-white shadow-[0_8px_20px_rgba(79,59,246,0.25)] transition-transform hover:-translate-y-0.5">
                  {submitLabel}
                </button>
              </form>

              <div className="mt-5 flex items-center gap-3 rounded-[20px] border border-[#e9e4ff] bg-[#f8f6ff] p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ece8ff] text-[#4f3bf6]">
                  <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 11l2 2 4-4" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <strong className="text-[0.95rem] text-[#1f1a3a]">Your data is 100% secure</strong>
                  <span className="text-[0.85rem] text-[#718096]">We don't share your details with anyone</span>
                </div>
              </div>

              <p className="mt-4 text-center text-[0.92rem] text-[#4a5568]">
                New to INEX Gifts?{' '}
                <a href="#" className="font-semibold text-[#4f3bf6]" onClick={(e) => { e.preventDefault(); switchTab("register"); }}>
                  Register Now
                  <svg className="ml-1 inline-block h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-[#f0ebff] bg-[#fcfbff] px-4 py-4 sm:grid-cols-4">
              {trustBadges.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2 rounded-2xl bg-white/80 p-2 text-center shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f3f0ff] text-[#5b45ff]">
                    {item.icon}
                  </div>
                  <span className="text-[0.72rem] font-semibold leading-tight text-[#6d6585]">{item.label}</span>
                </div>
              ))}
            </div>

            {showOtp && (
              <div className="absolute inset-0 flex items-center justify-center bg-[rgba(15,23,42,0.55)] p-4" onClick={(e) => e.target === e.currentTarget && closeOtp()}>
                <div className="w-full max-w-[360px] rounded-[28px] bg-white p-8 text-center shadow-2xl">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f2ff] text-[#4f3bf6]">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  </div>
                  <h3 className="text-[1.4rem] font-bold text-[#1f1a3a]">Verify OTP</h3>
                  <p className="mt-2 text-[0.95rem] text-[#718096]">
                    We've sent a 6-digit code to <strong className="text-[#1f1a3a]">{otpDisplay}</strong>
                  </p>
                  <div className="mt-5 flex justify-center gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength="1"
                        className="h-12 w-12 rounded-xl border border-[#d7d3e6] text-center text-[1.2rem] font-bold text-[#1f1a3a] outline-none focus:border-[#4f3bf6] focus:ring-2 focus:ring-[#ece8ff]"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                      />
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center gap-3">
                    <button type="button" className="rounded-2xl border border-[#e2e8f0] px-4 py-2.5 text-[0.95rem] font-semibold text-[#4a5568]" onClick={closeOtp}>
                      Cancel
                    </button>
                    <button type="button" className="rounded-2xl bg-[#4f3bf6] px-4 py-2.5 text-[0.95rem] font-semibold text-white" onClick={handleOtpVerify}>
                      Verify
                    </button>
                  </div>
                  <p className="mt-4 text-[0.9rem] text-[#718096]">
                    Didn't get it? <a href="#" className="font-semibold text-[#4f3bf6]" onClick={handleResend}>Resend OTP</a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
