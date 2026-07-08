import React, { useEffect, useRef, useCallback } from 'react';

/* -------------------------------------------------------
   Constants
   ------------------------------------------------------- */
const CONFETTI_COLORS = [
  '#FFDE4D','#FF4E88','#33B8FF','#44FFD2',
  '#FF7B54','#C060A8','#FFD358','#3DE6C7',
  '#FF5E7E','#6C5CE7',
];

const SPARKLE_POSITIONS = [
  { top:  9, left: 12 }, { top: 12, left: 82 },
  { top: 22, left:  6 }, { top: 20, left: 90 },
  { top: 35, left:  4 }, { top: 30, left: 95 },
  { top: 48, left: 10 }, { top: 44, left: 88 },
  { top: 18, left: 38 }, { top: 14, left: 62 },
  { top: 40, left: 25 }, { top: 38, left: 75 },
];

/* -------------------------------------------------------
   Corner Radar — Top Left (cyan / green)
   ------------------------------------------------------- */
function CornerRadarTopLeft() {
  const rings = [40, 75, 110, 145, 180];
  const color = '#00F0FF';
  const dotPositions = [
    { cx: 55,  cy: 22  },
    { cx: 90,  cy: 50  },
    { cx: 30,  cy: 70  },
    { cx: 120, cy: 20  },
    { cx: 15,  cy: 105 },
  ];

  const containerRef = useRef(null);
  const animationsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any previous animations
    animationsRef.current.forEach(anim => anim.cancel());
    animationsRef.current = [];

    // Concentric rings
    const ringEls = containerRef.current.querySelectorAll('.radar-ring');
    ringEls.forEach((el, i) => {
      const anim = el.animate([
        { opacity: 0, strokeWidth: '1.5' },
        { opacity: 0.85, strokeWidth: '1.2', offset: 0.2 },
        { opacity: 0.3, strokeWidth: '0.8', offset: 0.8 },
        { opacity: 0, strokeWidth: '0.5' }
      ], {
        duration: 3000,
        delay: i * 450,
        easing: 'ease-in-out',
        iterations: Infinity
      });
      animationsRef.current.push(anim);
    });

    // Grid lines
    const gridEls = containerRef.current.querySelectorAll('.grid-line');
    gridEls.forEach((el) => {
      const anim = el.animate([
        { opacity: 0.15 },
        { opacity: 0.5 }
      ], {
        duration: 3000,
        easing: 'ease-in-out',
        direction: 'alternate',
        iterations: Infinity
      });
      animationsRef.current.push(anim);
    });

    // Sweep line
    const sweepEl = containerRef.current.querySelector('.sweep-line');
    if (sweepEl) {
      const anim = sweepEl.animate([
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(360deg)' }
      ], {
        duration: 4000,
        easing: 'linear',
        iterations: Infinity
      });
      animationsRef.current.push(anim);
    }

    // Glowing dots
    const dotEls = containerRef.current.querySelectorAll('.glowing-dot');
    dotEls.forEach((el, i) => {
      const anim = el.animate([
        { opacity: 0.2 },
        { opacity: 1 }
      ], {
        duration: 2000,
        delay: i * 400,
        easing: 'ease-in-out',
        direction: 'alternate',
        iterations: Infinity
      });
      animationsRef.current.push(anim);
    });

    return () => {
      animationsRef.current.forEach(anim => anim.cancel());
      animationsRef.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute top-0 left-0 overflow-hidden pointer-events-none z-10
        w-[clamp(160px,40vw,220px)] h-[clamp(160px,40vw,220px)]
        md:w-[clamp(200px,22vw,300px)] md:h-[clamp(200px,22vw,300px)]
        max-[379px]:w-[120px] max-[379px]:h-[120px]"
    >
      <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className="w-full h-full">

        {/* Pulsing concentric arcs */}
        {rings.map((r, i) => (
          <circle
            key={`tl-${i}`}
            cx="0" cy="0" r={r}
            stroke={color} strokeWidth="1" fill="none"
            className="radar-ring opacity-0 origin-[0%_0%]"
          />
        ))}

        {/* Grid lines */}
        <line x1="0" y1="0" x2="200" y2="0"   stroke={color} strokeWidth="0.6" strokeDasharray="4 6" className="grid-line opacity-[0.15]" />
        <line x1="0" y1="0" x2="0"   y2="200" stroke={color} strokeWidth="0.6" strokeDasharray="4 6" className="grid-line opacity-[0.15]" />
        <line x1="0" y1="0" x2="200" y2="60"  stroke={color} strokeWidth="0.4" strokeDasharray="5 8" className="grid-line opacity-[0.15]" />
        <line x1="0" y1="0" x2="60"  y2="200" stroke={color} strokeWidth="0.4" strokeDasharray="5 8" className="grid-line opacity-[0.15]" />
        <line x1="0" y1="0" x2="200" y2="200" stroke={color} strokeWidth="0.4" strokeDasharray="3 10" className="grid-line opacity-[0.15]" />

        {/* Rotating sweep line */}
        <line x1="0" y1="0" x2="200" y2="30"
          stroke={color} strokeWidth="1.5"
          className="sweep-line origin-[0%_0%] opacity-60"
        />

        {/* Glowing dots */}
        {dotPositions.map((d, i) => (
          <circle
            key={`tl-dot-${i}`}
            cx={d.cx} cy={d.cy} r="2" fill={color}
            className="glowing-dot opacity-[0.2]"
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        ))}

        {/* Neon green corner bracket lines */}
        <path d="M0 0 L170 0"         stroke="#00FF88" strokeWidth="2.5" opacity="0.9" />
        <path d="M0 0 L0 170"         stroke="#00FF88" strokeWidth="2.5" opacity="0.9" />
        <path d="M170 0 L170 12 M170 0 L158 0" stroke="#00FF88" strokeWidth="2.5" fill="none" opacity="0.85" />
        <path d="M0 170 L12 170 M0 170 L0 158" stroke="#00FF88" strokeWidth="2.5" fill="none" opacity="0.85" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------
   Corner Radar — Bottom Right (pink / magenta)
   ------------------------------------------------------- */
function CornerRadarBottomRight() {
  const rings        = [40, 75, 110, 145, 180];
  const color        = '#FF3EBD';
  const dotPositions = [
    { cx: 145, cy: 178 },
    { cx: 110, cy: 150 },
    { cx: 170, cy: 110 },
    { cx: 80,  cy: 178 },
    { cx: 185, cy: 80  },
  ];

  const containerRef = useRef(null);
  const animationsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    animationsRef.current.forEach(anim => anim.cancel());
    animationsRef.current = [];

    // Concentric rings
    const ringEls = containerRef.current.querySelectorAll('.radar-ring');
    ringEls.forEach((el, i) => {
      const anim = el.animate([
        { opacity: 0, strokeWidth: '1.5' },
        { opacity: 0.85, strokeWidth: '1.2', offset: 0.2 },
        { opacity: 0.3, strokeWidth: '0.8', offset: 0.8 },
        { opacity: 0, strokeWidth: '0.5' }
      ], {
        duration: 3000,
        delay: i * 450,
        easing: 'ease-in-out',
        iterations: Infinity
      });
      animationsRef.current.push(anim);
    });

    // Grid lines
    const gridEls = containerRef.current.querySelectorAll('.grid-line');
    gridEls.forEach((el) => {
      const anim = el.animate([
        { opacity: 0.15 },
        { opacity: 0.5 }
      ], {
        duration: 3000,
        easing: 'ease-in-out',
        direction: 'alternate',
        iterations: Infinity
      });
      animationsRef.current.push(anim);
    });

    // Sweep line
    const sweepEl = containerRef.current.querySelector('.sweep-line');
    if (sweepEl) {
      const anim = sweepEl.animate([
        { transform: 'rotate(180deg)' },
        { transform: 'rotate(540deg)' }
      ], {
        duration: 4000,
        easing: 'linear',
        iterations: Infinity
      });
      animationsRef.current.push(anim);
    }

    // Glowing dots
    const dotEls = containerRef.current.querySelectorAll('.glowing-dot');
    dotEls.forEach((el, i) => {
      const anim = el.animate([
        { opacity: 0.2 },
        { opacity: 1 }
      ], {
        duration: 2000,
        delay: i * 400,
        easing: 'ease-in-out',
        direction: 'alternate',
        iterations: Infinity
      });
      animationsRef.current.push(anim);
    });

    return () => {
      animationsRef.current.forEach(anim => anim.cancel());
      animationsRef.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute bottom-0 right-0 overflow-hidden pointer-events-none z-10
        w-[clamp(160px,40vw,220px)] h-[clamp(160px,40vw,220px)]
        md:w-[clamp(200px,22vw,300px)] md:h-[clamp(200px,22vw,300px)]
        max-[379px]:w-[120px] max-[379px]:h-[120px]"
    >
      <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className="w-full h-full">

        {/* Pulsing concentric arcs */}
        {rings.map((r, i) => (
          <circle
            key={`br-${i}`}
            cx="200" cy="200" r={r}
            stroke={color} strokeWidth="1" fill="none"
            className="radar-ring opacity-0 origin-[100%_100%]"
          />
        ))}

        {/* Grid lines */}
        <line x1="200" y1="200" x2="0"   y2="200" stroke={color} strokeWidth="0.6" strokeDasharray="4 6" className="grid-line opacity-[0.15]" />
        <line x1="200" y1="200" x2="200" y2="0"   stroke={color} strokeWidth="0.6" strokeDasharray="4 6" className="grid-line opacity-[0.15]" />
        <line x1="200" y1="200" x2="0"   y2="140" stroke={color} strokeWidth="0.4" strokeDasharray="5 8" className="grid-line opacity-[0.15]" />
        <line x1="200" y1="200" x2="140" y2="0"   stroke={color} strokeWidth="0.4" strokeDasharray="5 8" className="grid-line opacity-[0.15]" />
        <line x1="200" y1="200" x2="0"   y2="0"   stroke={color} strokeWidth="0.4" strokeDasharray="3 10" className="grid-line opacity-[0.15]" />

        {/* Rotating sweep line */}
        <line x1="200" y1="200" x2="0" y2="170"
          stroke={color} strokeWidth="1.5"
          className="sweep-line origin-[100%_100%] opacity-60"
        />

        {/* Glowing dots */}
        {dotPositions.map((d, i) => (
          <circle
            key={`br-dot-${i}`}
            cx={d.cx} cy={d.cy} r="2" fill={color}
            className="glowing-dot opacity-[0.2]"
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        ))}

        {/* Neon pink corner bracket lines */}
        <path d="M200 200 L30 200"        stroke={color} strokeWidth="2.5" opacity="0.9" />
        <path d="M200 200 L200 30"        stroke={color} strokeWidth="2.5" opacity="0.9" />
        <path d="M30 200 L30 188 M30 200 L42 200"   stroke={color} strokeWidth="2.5" fill="none" opacity="0.85" />
        <path d="M200 30 L188 30 M200 30 L200 42"   stroke={color} strokeWidth="2.5" fill="none" opacity="0.85" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------
   SplashScreen
   ------------------------------------------------------- */
export default function SplashScreen({ onComplete }) {
  const boxWrapperRef        = useRef(null);
  const giftLidRef           = useRef(null);
  const giftGlowRef          = useRef(null);
  const brandContainerRef    = useRef(null);
  const brandTaglineRef      = useRef(null);
  const ornamentDividerRef   = useRef(null);
  const loadingContainerRef  = useRef(null);
  const progressFillRef      = useRef(null);
  const confettiContainerRef = useRef(null);
  const sparklesContainerRef = useRef(null);
  const timeoutIdsRef        = useRef([]);  // track all pending timeouts

  const wiggleAnimRef        = useRef(null);
  const floatAnimRef         = useRef(null);
  const progressAnimRef      = useRef(null);

  const heartRef             = useRef(null);
  const loadingIconRef       = useRef(null);
  const blinkTextRef         = useRef(null);

  /* ── Mount / Persistent animations ── */
  useEffect(() => {
    const anims = [];

    if (heartRef.current) {
      anims.push(
        heartRef.current.animate([
          { transform: 'scale(0.85)', opacity: 0.7 },
          { transform: 'scale(1.2)', opacity: 1 }
        ], {
          duration: 1500,
          easing: 'ease-in-out',
          direction: 'alternate',
          iterations: Infinity
        })
      );
    }

    if (loadingIconRef.current) {
      anims.push(
        loadingIconRef.current.animate([
          { transform: 'scale(1)', opacity: 0.65 },
          { transform: 'scale(1.15)', opacity: 1 },
          { transform: 'scale(1)', opacity: 0.65 }
        ], {
          duration: 1800,
          easing: 'ease-in-out',
          iterations: Infinity
        })
      );
    }

    if (blinkTextRef.current) {
      anims.push(
        blinkTextRef.current.animate([
          { opacity: 0.4 },
          { opacity: 0.8 },
          { opacity: 0.4 }
        ], {
          duration: 1500,
          easing: 'ease-in-out',
          iterations: Infinity
        })
      );
    }

    return () => {
      anims.forEach(anim => anim.cancel());
    };
  }, []);

  /* ── Confetti burst ── */
  const triggerConfettiBurst = useCallback(() => {
    const container = confettiContainerRef.current;
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 55; i++) {
      const el    = document.createElement('div');
      const shape = ['rect', 'square', 'circle'][Math.floor(Math.random() * 3)];
      
      let shapeClasses = 'w-[6px] h-[6px] rounded-[1px]';
      if (shape === 'rect') {
        shapeClasses = 'w-[4px] h-[10px] rounded-[1px]';
      } else if (shape === 'circle') {
        shapeClasses = 'w-[6px] h-[6px] rounded-full';
      }
      el.className = `absolute top-[42%] opacity-0 pointer-events-none ${shapeClasses}`;
      
      const leftVal = 15 + Math.random() * 70; // %
      const delayVal = Math.random() * 450; // ms
      const colorVal = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      const scaleVal = 0.6 + Math.random() * 0.7;
      const speedVal = 1800 + Math.random() * 1800; // ms
      const rotationVal = Math.random() * 720 - 360; // deg
      const driftVal = -120 + Math.random() * 240; // px
      const heightDriftVal = -140 - Math.random() * 180; // px
      
      el.style.left = `${leftVal}%`;
      el.style.backgroundColor = colorVal;
      
      container.appendChild(el);
      
      el.animate([
        {
          top: '42%',
          transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
          opacity: 0
        },
        {
          opacity: 1,
          transform: `translate(calc(-50% + ${driftVal * 0.25}px), calc(-50% + ${heightDriftVal * 0.25}px)) scale(${scaleVal}) rotate(90deg)`,
          offset: 0.15
        },
        {
          top: '105%',
          transform: `translate(calc(-50% + ${driftVal}px), calc(-50% + ${heightDriftVal + 260}px)) scale(0.5) rotate(${rotationVal}deg)`,
          opacity: 0
        }
      ], {
        duration: speedVal,
        delay: delayVal,
        easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
        fill: 'forwards'
      });
    }
  }, []);

  /* ── Sparkles ── */
  const triggerSparkles = useCallback(() => {
    const container = sparklesContainerRef.current;
    if (!container) return;
    container.innerHTML = '';
    SPARKLE_POSITIONS.forEach((pos, i) => {
      const el = document.createElement('div');
      el.className = 'absolute opacity-0 pointer-events-none w-[20px] h-[20px]';
      el.style.top  = `${pos.top}%`;
      el.style.left = `${pos.left}%`;
      
      const scaleVal = 0.55 + Math.random() * 0.9;
      const delayVal = i * 80; // ms

      const horizontalArm = document.createElement('div');
      horizontalArm.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[99px] shadow-[0_0_3px_1px_rgba(255,255,255,0.4)] h-[1.5px] bg-gradient-to-r from-transparent via-white/95 to-transparent';
      horizontalArm.style.width = `${12 * scaleVal}px`;
      el.appendChild(horizontalArm);

      const verticalArm = document.createElement('div');
      verticalArm.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[99px] shadow-[0_0_3px_1px_rgba(255,255,255,0.4)] w-[1.5px] bg-gradient-to-b from-transparent via-white/95 to-transparent';
      verticalArm.style.height = `${12 * scaleVal}px`;
      el.appendChild(verticalArm);

      container.appendChild(el);

      el.animate([
        { opacity: 0, transform: 'scale(0.2) rotate(0deg)' },
        { opacity: 0.85, transform: 'scale(1) rotate(45deg)', offset: 0.35 },
        { opacity: 0.65, transform: 'scale(0.9) rotate(45deg)', offset: 0.65 },
        { opacity: 0, transform: 'scale(0.25) rotate(90deg)' }
      ], {
        duration: 2800,
        delay: delayVal,
        easing: 'ease-in-out',
        iterations: Infinity,
        direction: 'alternate'
      });
    });
  }, []);

  /* ── Reset classes ── */
  const resetAnimation = useCallback(() => {
    // Clear all pending timeouts first
    timeoutIdsRef.current.forEach(id => clearTimeout(id));
    timeoutIdsRef.current = [];

    // Cancel active animations
    wiggleAnimRef.current?.cancel();
    floatAnimRef.current?.cancel();
    progressAnimRef.current?.cancel();

    boxWrapperRef.current       && (boxWrapperRef.current.className       = 'relative h-full w-auto aspect-square flex items-center justify-center z-20 opacity-0 scale-[0.65] transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] overflow-visible');
    giftLidRef.current          && (giftLidRef.current.className          = 'absolute top-0 left-0 w-full h-full object-contain [clip-path:inset(0%_0%_57%_0%)] [transition:transform_1.1s_cubic-bezier(0.22,1,0.36,1),_filter_0.8s_ease-out] [will-change:transform] z-30 translate-y-[4.8vh] scale-[0.97] rotate-0 select-none pointer-events-none drop-shadow-[0_-0.5vh_1.5vh_rgba(0,0,0,0.15)]');
    giftGlowRef.current         && (giftGlowRef.current.className         = 'absolute inset-0 pointer-events-none z-[20] overflow-visible transition-all duration-[1200ms] ease-out opacity-0 scale-50');
    brandContainerRef.current   && (brandContainerRef.current.className   = 'w-full text-center z-30 opacity-0 translate-y-[15px] transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]');
    brandTaglineRef.current     && (brandTaglineRef.current.className     = 'text-[clamp(0.75rem,1.8vh,0.95rem)] font-medium text-white/75 tracking-[0.02em] mt-2 mb-2 opacity-0 transition-opacity duration-[750ms] ease-out delay-[350ms]');
    ornamentDividerRef.current  && (ornamentDividerRef.current.className  = 'flex justify-center items-center w-full gap-3 mt-1 opacity-0 transition-opacity duration-[750ms] ease-out delay-[600ms]');
    loadingContainerRef.current && (loadingContainerRef.current.className = 'w-full flex flex-col items-center z-30 opacity-0 translate-y-[15px] transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]');
    
    confettiContainerRef.current && (confettiContainerRef.current.innerHTML = '');
    sparklesContainerRef.current && (sparklesContainerRef.current.innerHTML = '');
  }, []);

  /* ── Animation sequence ── */
  const startSplashAnimation = useCallback((isReplay = false) => {
    resetAnimation();

    const after = (ms, fn) => {
      const id = setTimeout(fn, ms);
      timeoutIdsRef.current.push(id);
      return id;
    };

    // Phase 1 — box appears
    after(100, () => {
      if (boxWrapperRef.current) {
        boxWrapperRef.current.classList.remove('opacity-0', 'scale-[0.65]');
        boxWrapperRef.current.classList.add('opacity-100', 'scale-100');
      }
    });
    // Phase 2 — shake
    after(900, () => {
      if (boxWrapperRef.current) {
        wiggleAnimRef.current?.cancel();
        wiggleAnimRef.current = boxWrapperRef.current.animate([
          { transform: 'rotate(0deg) scale(1)', offset: 0 },
          { transform: 'rotate(-3deg) scale(1.02)', offset: 0.15 },
          { transform: 'rotate(3deg) scale(1.02)', offset: 0.30 },
          { transform: 'rotate(-2deg) scale(1.01)', offset: 0.45 },
          { transform: 'rotate(2deg) scale(1.01)', offset: 0.60 },
          { transform: 'rotate(-1deg) scale(1)', offset: 0.75 },
          { transform: 'rotate(1deg) scale(1)', offset: 0.90 },
          { transform: 'rotate(0deg) scale(1)', offset: 1 }
        ], {
          duration: 650,
          easing: 'cubic-bezier(0.36, 0.07, 0.19, 0.97)',
          fill: 'both'
        });
      }
    });
    // Phase 3 — open + glow + particles
    after(1550, () => {
      wiggleAnimRef.current?.cancel();
      if (boxWrapperRef.current) {
        floatAnimRef.current?.cancel();
        floatAnimRef.current = boxWrapperRef.current.animate([
          { transform: 'translateY(0)' },
          { transform: 'translateY(-8px)' },
          { transform: 'translateY(0)' }
        ], {
          duration: 5000,
          easing: 'ease-in-out',
          iterations: Infinity
        });
      }

      if (giftLidRef.current) {
        giftLidRef.current.classList.remove('translate-y-[4.8vh]', 'scale-[0.97]', 'rotate-0');
        giftLidRef.current.classList.add('translate-y-[-5vh]', 'rotate-[-14deg]', 'scale-[1.06]');
      }
      if (giftGlowRef.current) {
        giftGlowRef.current.classList.remove('opacity-0', 'scale-50');
        giftGlowRef.current.classList.add('opacity-100', 'scale-100');
      }
      triggerConfettiBurst();
      triggerSparkles();
    });
    // Phase 4 — brand text
    after(1700, () => {
      if (brandContainerRef.current) {
        brandContainerRef.current.classList.remove('opacity-0', 'translate-y-[15px]');
        brandContainerRef.current.classList.add('opacity-100', 'translate-y-0');
      }
      if (brandTaglineRef.current) {
        brandTaglineRef.current.classList.remove('opacity-0');
        brandTaglineRef.current.classList.add('opacity-100');
      }
      if (ornamentDividerRef.current) {
        ornamentDividerRef.current.classList.remove('opacity-0');
        ornamentDividerRef.current.classList.add('opacity-100');
      }
    });
    // Phase 5 — loading bar
    after(2700, () => {
      if (loadingContainerRef.current) {
        loadingContainerRef.current.classList.remove('opacity-0', 'translate-y-[15px]');
        loadingContainerRef.current.classList.add('opacity-100', 'translate-y-0');
      }
      const pf = progressFillRef.current;
      if (pf) {
        progressAnimRef.current?.cancel();
        progressAnimRef.current = pf.animate([
          { width: '0%' },
          { width: '100%' }
        ], {
          duration: 3000,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          fill: 'forwards'
        });
      }
    });
    // Phase 6 — complete (only on initial auto-play, not on replay clicks)
    if (!isReplay) {
      after(6200, () => {
        if (typeof onComplete === 'function') onComplete();
      });
    }
  }, [resetAnimation, triggerConfettiBurst, triggerSparkles, onComplete]);

  useEffect(() => { startSplashAnimation(false); }, [startSplashAnimation]);

  /* ── JSX ── */
  return (
    /* Outer frame */
    <div className="flex justify-center items-center w-full h-full relative z-10">
      <div className="relative w-screen h-[100dvh] bg-black overflow-hidden z-10">

        {/* Splash viewport */}
        <div
          id="splash-screen"
          className="relative w-full h-full bg-[linear-gradient(180deg,#0059FF_0%,#1C10D6_25%,#3C00B8_50%,#5800A8_72%,#7B0091_100%)] flex flex-col justify-center items-center overflow-hidden
            gap-[clamp(1rem,2.8vh,3rem)] px-[clamp(18px,5vw,26px)] py-[clamp(20px,4vh,45px)]
            shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]
            max-md:gap-[clamp(0.9rem,2.6vh,2.6rem)]
            max-[379px]:gap-[clamp(0.7rem,2vh,1.6rem)]"
        >

          {/* Corner radars */}
          <CornerRadarTopLeft />
          <CornerRadarBottomRight />

          {/* Ambient glow blobs */}
          <div className="absolute top-[-5%] left-[-20%] w-[300px] h-[300px] rounded-full pointer-events-none z-0 blur-[40px]
            bg-[radial-gradient(circle,rgba(0,198,255,0.40)_0%,transparent_70%)]" />
          <div className="absolute bottom-[-5%] right-[-25%] w-[350px] h-[350px] rounded-full pointer-events-none z-0 blur-[40px]
            bg-[radial-gradient(circle,rgba(249,83,198,0.35)_0%,transparent_70%)]" />
          <div className="absolute top-[30%] left-[10%] w-[260px] h-[260px] rounded-full pointer-events-none z-0 blur-[40px]
            bg-[radial-gradient(circle,rgba(142,45,226,0.30)_0%,transparent_75%)]" />

          {/* Particle layers */}
          <div className="absolute inset-0 pointer-events-none z-[2]" ref={confettiContainerRef} />
          <div className="absolute inset-0 pointer-events-none z-[2]" ref={sparklesContainerRef} />

          {/* ── Gift Box ── */}
          <div
            className="relative w-full h-[46vh] flex justify-center items-center z-[3] cursor-pointer
              max-[379px]:h-[42vh] overflow-visible"
            title="Click to replay"
            onClick={() => startSplashAnimation(true)}
          >
            {/* Gift wrapper — container that has animate-float-box */}
            <div
              ref={boxWrapperRef}
              className="relative h-full w-auto aspect-square flex items-center justify-center z-20
                opacity-0 scale-[0.65] transition-[opacity,transform] duration-[800ms]
                ease-[cubic-bezier(0.175,0.885,0.32,1.275)] overflow-visible"
            >
              {/* Invisible placeholder to establish size & aspect ratio */}
              <img
                src="/assets/gift_box.png"
                alt=""
                className="h-full w-auto max-w-full object-contain block opacity-0 select-none pointer-events-none"
              />

              {/* Radial glow behind the box — warm background lighting */}
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
                {/* Outer golden halo */}
                <div
                  className="absolute w-[330px] h-[220px] rounded-full animate-pulse"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(255,200,80,0.15) 0%, rgba(255,160,50,0.06) 50%, transparent 75%)',
                    filter: 'blur(35px)',
                    animationDuration: '3.2s'
                  }}
                />
                {/* Mid golden ring */}
                <div
                  className="absolute w-[200px] h-[130px] rounded-full animate-pulse"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(255,220,120,0.22) 0%, rgba(255,180,60,0.12) 55%, transparent 80%)',
                    filter: 'blur(20px)',
                    animationDuration: '2.8s',
                    animationDelay: '0.4s'
                  }}
                />
              </div>

              {/* Strong warm glow coming from inside the box when opened */}
              <div
                ref={giftGlowRef}
                className="absolute inset-0 pointer-events-none z-[20] overflow-visible
                  transition-all duration-[1200ms] ease-out opacity-0 scale-50"
              >
                <div className="relative w-full h-full overflow-visible">
                  <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center overflow-visible">
                    {/* Soft warm golden core — subtle, not blinding, perfectly circular */}
                    <div
                      className="absolute w-[120px] h-[120px] rounded-full blur-[24px] mix-blend-screen"
                      style={{ background: 'radial-gradient(circle, rgba(255,230,150,0.6) 0%, transparent 80%)' }}
                    />

                    {/* Mid amber glow ring — perfectly circular */}
                    <div
                      className="absolute w-[240px] h-[240px] rounded-full blur-[48px] animate-pulse mix-blend-screen"
                      style={{
                        background: 'radial-gradient(circle, rgba(255,150,30,0.3) 0%, transparent 80%)',
                        animationDuration: '2.4s'
                      }}
                    />

                    {/* Wide ambient warm halo — perfectly circular */}
                    <div
                      className="absolute w-[380px] h-[380px] rounded-full blur-[72px] mix-blend-screen"
                      style={{ background: 'radial-gradient(circle, rgba(255,100,0,0.12) 0%, transparent 80%)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Gift base (bottom part) */}
              <img
                src="/assets/gift_box.png"
                alt="INEX Gifts Base"
                className="absolute top-0 left-0 w-full h-full object-contain [clip-path:inset(45%_0%_0%_0%)] z-10 select-none pointer-events-none drop-shadow-[0_2vh_4vh_rgba(0,0,0,0.3)]"
              />

              {/* Gift lid (top part, animates up and tilts) */}
              <img
                ref={giftLidRef}
                src="/assets/gift_box.png"
                alt="INEX Gifts Lid"
                className="absolute top-0 left-0 w-full h-full object-contain [clip-path:inset(0%_0%_57%_0%)] [transition:transform_1.1s_cubic-bezier(0.22,1,0.36,1),_filter_0.8s_ease-out] [will-change:transform] z-30 translate-y-[4.8vh] scale-[0.97] rotate-0 select-none pointer-events-none drop-shadow-[0_-0.5vh_1.5vh_rgba(0,0,0,0.15)]"
              />
            </div>
          </div>

          {/* ── Brand Text ── */}
          <div
            ref={brandContainerRef}
            className="w-full text-center z-30 opacity-0 translate-y-[15px]
              transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          >
            <h1 className="flex justify-center items-baseline gap-2 mb-[7px]">
              <span className="font-extrabold text-[clamp(2rem,5vh,2.5rem)] tracking-[0.04em] text-white
                drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
                INEX
              </span>
              <span className="font-['Great_Vibes',cursive] font-normal text-[clamp(2.5rem,6.2vh,3.2rem)] text-white relative
                drop-shadow-[0_4px_15px_rgba(0,0,0,0.2)] inline-flex items-center">
                Gifts
                <span 
                  ref={heartRef}
                  className="text-[clamp(0.75rem,1.8vh,0.95rem)] text-[#FF2E93] absolute top-1 right-[-13px]"
                >
                  ♥
                </span>
              </span>
            </h1>

            {/* Tagline */}
            <p
              ref={brandTaglineRef}
              className="text-[clamp(0.75rem,1.8vh,0.95rem)] font-medium text-white/75
                tracking-[0.02em] mt-2 mb-2
                opacity-0 transition-opacity duration-[750ms] ease-out delay-[350ms]"
            >
              Making Every Moment{' '}
              <span className="text-[#FFDE4D] font-semibold drop-shadow-[0_0_10px_rgba(255,222,77,0.4)]">
                Memorable
              </span>
            </p>

            {/* Ornament divider — perfectly centered using clamped static widths and visible gradients */}
            <div
              ref={ornamentDividerRef}
              className="flex justify-center items-center w-full gap-3 mt-1
                opacity-0 transition-opacity duration-[750ms] ease-out delay-[600ms]"
            >
              <div className="w-[clamp(45px,14vw,160px)] h-[1px] bg-gradient-to-r from-white/10 via-white/50 to-white/75" />
              <div className="flex-shrink-0 text-[#FF2E93] opacity-95 flex items-center justify-center" style={{ lineHeight: 0 }}>
                <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" stroke="none" style={{ display: 'block' }}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="w-[clamp(45px,14vw,160px)] h-[1px] bg-gradient-to-l from-white/10 via-white/50 to-white/75" />
            </div>
          </div>

          {/* ── Loading Bar ── */}
          <div
            ref={loadingContainerRef}
            className="w-full flex flex-col items-center z-30
              opacity-0 translate-y-[15px]
              transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          >
            {/* Gift icon */}
            <div className="mb-1.5" ref={loadingIconRef}>
              <svg
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="w-[clamp(20px,4.5vh,26px)] h-[clamp(20px,4.5vh,26px)] text-white/65"
              >
                <path d="M20 12v10H4V12" />
                <path d="M2 7h20v5H2z" />
                <path d="M12 22V7" />
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
            </div>

            {/* Label */}
            <p ref={blinkTextRef} className="text-[clamp(0.7rem,1.6vh,0.82rem)] font-medium text-white/55 tracking-[0.05em] mb-2">
              Loading...
            </p>

            {/* Progress bar */}
            <div className="w-[clamp(180px,50%,220px)] h-[16px]
              bg-purple-950/80 rounded-full overflow-hidden
              border border-purple-500/25 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
              <div
                ref={progressFillRef}
                className="h-full w-0 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]"
              />
            </div>
          </div>

        </div>{/* /splash-screen */}
      </div>
    </div>
  );
}
