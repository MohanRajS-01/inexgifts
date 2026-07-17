import { useRef, useState } from "react";
import giftsShowcase from "../../assets/gifts_showcase.png";

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
    if (typeof setView === 'function') {
      setView('home1');
    }
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
    <div className="app min-h-screen bg-[#f6f2ff] text-[#1f1b33] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-[1440px] grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
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

        <main className="relative rounded-[40px] bg-white p-6 shadow-[0_30px_70px_rgba(79,59,246,0.08)]">
          <div className="flex justify-end text-sm text-[#6e6a8a]">
            <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[#ede9ff] bg-[#fbf8ff] px-4 py-2 font-semibold text-[#5f5a7f] shadow-sm transition hover:bg-[#f4efff]">
              English
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>

          <div className="mt-6">
            <h2 className="text-[2.2rem] font-extrabold text-[#1f1b33]">Welcome Back! <span>👋</span></h2>
            <p className="mt-3 text-[0.98rem] text-[#6f6a85]">Login to continue to INEX Gifts</p>
          </div>

          <div className="mt-7 flex rounded-full bg-[#f5f1ff] p-1">
            <button
              type="button"
              className={`flex flex-1 items-center justify-center rounded-full px-4 py-3 text-[0.94rem] font-semibold transition ${activeTab === "login" ? "bg-white text-[#6c53ff] shadow-[0_12px_30px_rgba(124,99,255,0.12)]" : "text-[#8f8ba8]"}`}
              onClick={() => switchTab("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={`flex flex-1 items-center justify-center rounded-full px-4 py-3 text-[0.94rem] font-semibold transition ${activeTab === "register" ? "bg-white text-[#6c53ff] shadow-[0_12px_30px_rgba(124,99,255,0.12)]" : "text-[#8f8ba8]"}`}
              onClick={() => switchTab("register")}
            >
              Register
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button type="button" onClick={() => typeof setView === 'function' && setView('home1')} className="flex h-14 items-center justify-center rounded-[18px] border border-[#ece6ff] bg-white text-[#3e3a58] shadow-sm transition hover:bg-[#f6f2ff]">
              <svg className="h-5 w-5" viewBox="0 0 488 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            </button>
            <button type="button" onClick={() => typeof setView === 'function' && setView('home1')} className="flex h-14 items-center justify-center rounded-[18px] border border-[#ece6ff] bg-white text-[#3e3a58] shadow-sm transition hover:bg-[#f6f2ff]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button type="button" onClick={() => typeof setView === 'function' && setView('home1')} className="flex h-14 items-center justify-center rounded-[18px] border border-[#ece6ff] bg-white text-[#3e3a58] shadow-sm transition hover:bg-[#f6f2ff]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.054 2.107-.973 3.956-.973 1.853 0 2.385.973 3.966.942 1.6-.027 2.661-1.474 3.64-2.9 1.128-1.64 1.592-3.23 1.621-3.314-.03-.016-3.11-1.194-3.143-4.757-.027-2.986 2.445-4.42 2.557-4.482-1.4-2.05-3.56-2.285-4.32-2.34-1.977-.16-3.83 1.21-4.838 1.21zM15.932 4.16c.808-.98 1.348-2.332 1.2-3.682-1.16.047-2.563.771-3.395 1.745-.733.844-1.373 2.215-1.2 3.543 1.29.1 2.613-.655 3.395-1.606z" />
              </svg>
            </button>
          </div>

          <div className="mt-7 flex items-center gap-3 text-[0.85rem] uppercase tracking-[0.22em] text-[#a79fe4]">
            <span className="h-px flex-1 bg-[#ece6ff]"></span>
            or
            <span className="h-px flex-1 bg-[#ece6ff]"></span>
          </div>

          <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
            <div className="rounded-[28px] border border-[#ece6ff] bg-[#fbf8ff] p-4 shadow-sm">
              <label htmlFor="mobile" className="block text-[0.92rem] font-semibold text-[#5d5780]">Mobile Number</label>
              <div className="mt-3 flex items-center gap-3 rounded-[22px] border border-[#e9e4ff] bg-white px-4 py-3 shadow-sm">
                <span className="text-[#7f78a4]">+91</span>
                <input
                  id="mobile"
                  type="tel"
                  className="w-full border-none bg-transparent text-[0.95rem] text-[#25223b] outline-none placeholder:text-[#b7add6]"
                  placeholder="Enter your mobile number"
                  maxLength="10"
                  autoComplete="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                />
              </div>
              <p className="mt-2 text-[0.82rem] text-[#7c76a5]">We will send you a 6-digit OTP.</p>
            </div>

            <button type="submit" className="w-full rounded-[28px] bg-gradient-to-r from-[#7d67ff] to-[#5b45ff] px-6 py-4 text-[0.95rem] font-semibold text-white shadow-[0_18px_40px_rgba(124,103,255,0.28)] transition hover:opacity-95">
              {submitLabel}
            </button>
          </form>

          <div className="mt-6 rounded-[24px] border border-[#ece6ff] bg-[#f8f5ff] p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#efe9ff] text-[#6c53ff]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 11l2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-[0.95rem] font-semibold text-[#25223b]">Your data is 100% secure</p>
                <p className="text-[0.85rem] text-[#7c76a5]">We don’t share your details with anyone.</p>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-[0.92rem] text-[#6f6a85]">
            New to INEX Gifts?{' '}
            <a href="#" className="font-semibold text-[#6c53ff]" onClick={(e) => { e.preventDefault(); switchTab("register"); }}>
              Register Now
            </a>
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#f1efff] pt-5 sm:grid-cols-4">
            {trustBadges.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2 rounded-[20px] bg-[#faf8ff] p-3 text-center shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f4efff] text-[#6c53ff]">
                  {item.icon}
                </div>
                <p className="text-[0.72rem] font-semibold leading-tight text-[#7c76a9]">{item.label}</p>
              </div>
            ))}
          </div>

          {showOtp && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-[rgba(15,23,42,0.55)] p-4" onClick={(e) => e.target === e.currentTarget && closeOtp()}>
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
                <div className="mt-5 grid grid-cols-6 gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="1"
                      className="h-12 w-full rounded-[18px] border border-[#e5e1f7] bg-[#faf7ff] text-center text-[1.15rem] font-bold text-[#1f1a3a] outline-none focus:border-[#7c63ff] focus:ring-2 focus:ring-[#ede8ff]"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                    />
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button type="button" className="rounded-[24px] border border-[#e7e3ff] px-4 py-2.5 text-[0.95rem] font-semibold text-[#5f5a7f]" onClick={closeOtp}>
                    Cancel
                  </button>
                  <button type="button" className="rounded-[24px] bg-[#6c53ff] px-4 py-2.5 text-[0.95rem] font-semibold text-white" onClick={handleOtpVerify}>
                    Verify
                  </button>
                </div>
                <p className="mt-4 text-[0.9rem] text-[#7c76a5]">
                  Didn&apos;t get it? <a href="#" className="font-semibold text-[#6c53ff]" onClick={handleResend}>Resend OTP</a>
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
