import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Phone, Truck, MapPin, Clock, Shield, ArrowRight, Menu, X, User, ChevronLeft, ChevronRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const C = {
  paper: '#E8E4DD',
  signal: '#E63B2E',
  signalDark: '#C42D22',
  offwhite: '#F5F3EE',
  ink: '#111111',
};

/* ═══════════════════════════════════════════
   NOISE OVERLAY
   ═══════════════════════════════════════════ */
function NoiseOverlay() {
  return (
    <svg className="noise-overlay" aria-hidden="true">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR — more solid bg when over hero
   ═══════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'How It Works', href: '#protocol' },
    { label: 'Pricing', href: '#pricing' },
  ];

  const textColor = scrolled ? C.ink : '#fff';
  const linkColor = scrolled ? C.ink : 'rgba(255,255,255,0.9)';

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-[2rem] px-6 py-3 transition-all duration-500 ${
        scrolled
          ? 'border border-[#E8E4DD] bg-[#F5F3EE]/90 shadow-lg backdrop-blur-xl'
          : 'border border-white/10 bg-black/40 backdrop-blur-md'
      }`}
      style={{ maxWidth: '90vw' }}
    >
      <div className="flex items-center gap-8">
        <a href="#" className="whitespace-nowrap text-lg font-bold tracking-tight font-heading" style={{ color: textColor }}>
          REBEL HAULING
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="link-lift whitespace-nowrap text-sm font-medium tracking-tight" style={{ color: linkColor }}>
              {l.label}
            </a>
          ))}
          <a href="tel:6625971268" className="btn-magnetic inline-flex items-center gap-2 whitespace-nowrap rounded-[2rem] px-5 py-2 text-sm font-bold text-white" style={{ backgroundColor: C.signal }}>
            <span className="btn-bg rounded-[2rem]" style={{ backgroundColor: C.signalDark }} />
            <Phone size={14} className="relative z-10" />
            <span className="relative z-10">Book a Pickup</span>
          </a>
        </div>

        <button className="ml-auto md:hidden" onClick={() => setMobileOpen((o) => !o)} style={{ color: textColor }} aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mt-4 flex flex-col gap-3 pb-2 md:hidden">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium" style={{ color: textColor }} onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="tel:6625971268" className="btn-magnetic inline-flex items-center justify-center gap-2 rounded-[2rem] px-5 py-2 text-sm font-bold text-white" style={{ backgroundColor: C.signal }}>
            <Phone size={14} />
            Book a Pickup
          </a>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════
   HERO — with hero-select class to fix highlight
   ═══════════════════════════════════════════ */
function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim', { y: 50, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.15, delay: 0.2, ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="hero-select relative flex w-full items-end" style={{ minHeight: '100dvh' }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80)' }} />
      <div className="hero-gradient absolute inset-0" />

      <div className="relative z-10 w-full max-w-5xl px-6 pb-16 md:px-16 md:pb-24">
        <h1 className="mb-4">
          <span className="hero-anim invisible block text-4xl font-bold leading-[1.1] tracking-tight text-white font-heading md:text-6xl lg:text-7xl">
            Haul the
          </span>
          <span className="hero-anim invisible block text-6xl italic leading-[0.95] font-drama md:text-8xl lg:text-[10rem]" style={{ color: C.signal }}>
            Junk.
          </span>
        </h1>

        <p className="hero-anim invisible max-w-xl text-base text-white/70 font-heading md:text-xl" style={{ letterSpacing: '-0.02em', marginBottom: '2rem' }}>
          Fast, affordable junk removal and hauling by two university operators who know Oxford and Springfield inside out. Priced by load — no surprises.
        </p>

        <a href="tel:6625971268" className="hero-anim invisible btn-magnetic inline-flex items-center gap-3 rounded-[2rem] px-8 py-4 text-lg font-bold text-white" style={{ backgroundColor: C.signal }}>
          <span className="btn-bg rounded-[2rem]" style={{ backgroundColor: C.signalDark }} />
          <Truck size={20} className="relative z-10" />
          <span className="relative z-10">Book a Pickup</span>
          <ArrowRight size={18} className="relative z-10" />
        </a>

        <div className="hero-anim invisible mt-8 flex flex-wrap gap-4">
          {[
            { icon: MapPin, text: 'Lafayette Co, MS & Greene Co, MO' },
            { icon: Clock, text: 'Same-day available' },
            { icon: Shield, text: 'Licensed & Insured' },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-2 rounded-[2rem] border border-white/10 px-4 py-2 text-xs text-white/60 font-mono">
              <Icon size={12} />
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FEATURE CARDS
   ═══════════════════════════════════════════ */
function ShufflerCard() {
  const [order, setOrder] = useState([0, 1, 2]);
  const labels = [
    { title: 'Quarter Load', price: '$75 – $125', desc: 'Small cleanouts & single items' },
    { title: 'Half Load', price: '$150 – $250', desc: 'Garage cleanouts & furniture sets' },
    { title: 'Full Load', price: '$300 – $450', desc: 'Full property & renovation debris' },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setOrder((prev) => { const n = [...prev]; n.unshift(n.pop()); return n; });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-[2rem] border border-paper bg-offwhite p-8">
      <p className="text-xl font-bold tracking-tight text-ink font-heading">Load-Size Pricing</p>
      <p className="mt-1 text-sm text-ink/50">Transparent rates — pay only for what you fill.</p>
      <div className="relative mt-6" style={{ height: 180 }}>
        {order.map((idx, pos) => (
          <div key={idx} className="absolute inset-x-0 rounded-[1.5rem] border border-paper bg-white p-4 shadow-sm" style={{
            top: pos * 16, zIndex: 3 - pos, opacity: 1 - pos * 0.2,
            transform: `scale(${1 - pos * 0.04})`,
            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-ink font-heading">{labels[idx].title}</span>
                <span className="mt-1 block text-xs text-ink/40">{labels[idx].desc}</span>
              </div>
              <span className="text-lg font-bold font-mono" style={{ color: C.signal }}>{labels[idx].price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypewriterCard() {
  const [lines, setLines] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const msgIdx = useRef(0);
  const charIdx = useRef(0);

  useEffect(() => {
    const messages = [
      '\u25b8 Pickup confirmed — 2.4mi away',
      '\u25b8 Crew en route — ETA 18 min',
      '\u25b8 On-site — loading half truck',
      '\u25b8 Haul complete — 47 min total',
      '\u25b8 Invoice sent — $185.00',
      '\u25b8 5-star review received',
      '\u25b8 Next booking: tomorrow 9am',
      '\u25b8 Route optimized — 3 stops today',
    ];
    const id = setInterval(() => {
      const msg = messages[msgIdx.current % messages.length];
      if (charIdx.current <= msg.length) {
        setCurrentText(msg.slice(0, charIdx.current));
        charIdx.current++;
      } else {
        setLines((prev) => [...prev.slice(-4), msg]);
        setCurrentText('');
        charIdx.current = 0;
        msgIdx.current++;
      }
    }, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-[2rem] border border-paper bg-offwhite p-8">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full pulse-dot" style={{ backgroundColor: C.signal }} />
        <span className="text-xs tracking-wide font-mono" style={{ color: C.signal }}>LIVE FEED</span>
      </div>
      <p className="text-xl font-bold tracking-tight text-ink font-heading">Fast &amp; Reliable</p>
      <p className="mt-1 text-sm text-ink/50">Multi-year operators. Same-day service available.</p>
      <div className="mt-4 overflow-hidden rounded-[1rem] bg-ink p-4 text-xs leading-6 text-green-400 font-mono" style={{ height: 160 }}>
        {lines.map((line, i) => (<div key={i} className="opacity-40">{line}</div>))}
        <div>
          {currentText}
          <span className="blink-cursor ml-0.5 inline-block h-3 w-2 align-middle" style={{ backgroundColor: C.signal }} />
        </div>
      </div>
    </div>
  );
}

/* Scheduler card — cursor uses refs for accurate alignment */
function SchedulerCard() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: -30, y: -30 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [saved, setSaved] = useState(false);
  const cycleRef = useRef(0);
  const dayRefs = useRef([]);
  const saveRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let timeouts = [];

    const getPos = (el) => {
      if (!el || !containerRef.current) return { x: 0, y: 0 };
      const cRect = containerRef.current.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      return {
        x: eRect.left - cRect.left + eRect.width / 2,
        y: eRect.top - cRect.top + eRect.height / 2,
      };
    };

    const runCycle = () => {
      const dayIdx = cycleRef.current % 7;
      setCursorVisible(true);
      setSaved(false);
      setActiveDay(null);

      timeouts = [
        setTimeout(() => {
          const pos = getPos(dayRefs.current[dayIdx]);
          setCursorPos(pos);
        }, 300),
        setTimeout(() => setActiveDay(dayIdx), 900),
        setTimeout(() => {
          const pos = getPos(saveRef.current);
          setCursorPos(pos);
        }, 1500),
        setTimeout(() => setSaved(true), 2100),
        setTimeout(() => setCursorVisible(false), 2600),
      ];
      cycleRef.current++;
    };

    // Small delay so refs are measured after layout
    const startTimeout = setTimeout(runCycle, 100);
    const interval = setInterval(runCycle, 4000);
    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="rounded-[2rem] border border-paper bg-offwhite p-8">
      <p className="text-xl font-bold tracking-tight text-ink font-heading">Dual Service Area</p>
      <p className="mt-1 text-sm text-ink/50">Serving Lafayette County, MS &amp; Greene County, MO.</p>
      <div ref={containerRef} className="relative mt-4 rounded-[1.5rem] border border-paper bg-white p-4" style={{ height: 160 }}>
        <div className="mb-4 flex justify-center gap-2">
          {days.map((d, i) => (
            <div
              key={i}
              ref={(el) => (dayRefs.current[i] = el)}
              className="flex h-9 w-9 items-center justify-center rounded-[0.75rem] border text-xs font-bold transition-all duration-300 font-mono"
              style={{
                backgroundColor: activeDay === i ? C.signal : 'transparent',
                color: activeDay === i ? '#fff' : C.ink,
                borderColor: activeDay === i ? C.signal : C.paper,
                transform: activeDay === i ? 'scale(0.95)' : 'scale(1)',
              }}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div
            ref={saveRef}
            className="rounded-[2rem] px-6 py-2 text-xs font-bold transition-all duration-300 font-mono"
            style={{ backgroundColor: saved ? C.signal : C.paper, color: saved ? '#fff' : C.ink }}
          >
            {saved ? '\u2713 Scheduled' : 'Save Pickup'}
          </div>
        </div>
        <svg
          className="pointer-events-none absolute transition-all duration-500"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            opacity: cursorVisible ? 1 : 0,
            width: 20,
            height: 24,
          }}
          viewBox="0 0 20 24"
          fill="none"
        >
          <path d="M3 1L17 12L10 13L13 22L9 23L6 14L1 18L3 1Z" fill={C.ink} stroke={C.offwhite} strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}

function Features() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-card', { y: 50, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={ref} className="px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest font-mono" style={{ color: C.signal }}>What We Do</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink font-heading md:text-5xl">
            Services built for<br />
            <span className="italic font-drama" style={{ color: C.signal }}>real people.</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="feature-card invisible"><ShufflerCard /></div>
          <div className="feature-card invisible"><TypewriterCard /></div>
          <div className="feature-card invisible"><SchedulerCard /></div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ABOUT US — mission statement + founder cards
   ═══════════════════════════════════════════ */
function AboutUs() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-anim', { y: 40, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden px-6 py-28 md:px-16 md:py-40" style={{ backgroundColor: C.ink }}>
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80)' }} />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <div className="about-anim invisible mb-8">
          <span className="text-xs uppercase tracking-widest font-mono" style={{ color: C.signal }}>About Us</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white font-heading md:text-5xl">
            Who we{' '}
            <span className="italic font-drama" style={{ color: C.signal }}>are.</span>
          </h2>
        </div>

        {/* Mission Statement */}
        <p className="about-anim invisible text-base leading-relaxed text-white/60 font-heading md:text-lg">
          Ran by two university students with multi-year experience as operators with backgrounds in moving and junk removal. We specialize in fast, reliable, and affordable junk removal for residential, commercial, and student housing clients. As members of the Oxford community ourselves, we are committed to providing friendly, dependable service with a personal touch. Whether you're clearing out a garage, moving out of a dorm, or renovating a property, Rebel Hauling is here to make the process quick and stress-free.
        </p>

        {/* Founders */}
        <div className="about-anim invisible mt-16 grid gap-8 sm:grid-cols-2">
          {[
            { name: 'Ethan Harris', role: 'Founder' },
            { name: 'Kane Snider', role: 'Co-Founder' },
          ].map((person) => (
            <div key={person.name} className="flex flex-col items-center rounded-[2rem] border border-white/10 p-8 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
              {/* Headshot placeholder */}
              <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full border-2 border-white/10 bg-white/5">
                <User size={48} className="text-white/20" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">{person.name}</h3>
              <p className="mt-1 text-sm font-mono" style={{ color: C.signal }}>{person.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PROTOCOL — new step animations
   ═══════════════════════════════════════════ */

/* Step 1: Ringing Phone */
function PhoneRingAnimation() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Ring waves */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-24 w-24 rounded-full border-2 opacity-20 pulse-dot" style={{ borderColor: C.signal }} />
          <div className="absolute h-32 w-32 rounded-full border opacity-10 pulse-dot" style={{ borderColor: C.signal, animationDelay: '0.3s' }} />
        </div>
        {/* Phone icon */}
        <div className="phone-ring flex h-16 w-16 items-center justify-center rounded-[1.25rem]" style={{ backgroundColor: C.signal }}>
          <Phone size={28} className="text-white" />
        </div>
      </div>
    </div>
  );
}

/* Step 2: Moving Truck */
function TruckAnimation() {
  const truckRef = useRef(null);
  const wheelsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Truck sways side to side slightly
      gsap.to(truckRef.current, {
        x: 8, duration: 1.2, repeat: -1, yoyo: true, ease: 'power1.inOut',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div ref={truckRef}>
        <svg width="140" height="90" viewBox="0 0 140 90" fill="none">
          {/* Road line */}
          <line x1="0" y1="78" x2="140" y2="78" stroke={C.paper} strokeWidth="2" strokeDasharray="8 6" />
          {/* Truck body */}
          <rect x="15" y="30" width="75" height="40" rx="6" fill={C.signal} />
          {/* Cab */}
          <path d="M90 38 L115 38 L120 55 L90 55 Z" fill={C.signalDark} />
          {/* Windshield */}
          <path d="M95 42 L110 42 L114 53 L95 53 Z" fill="rgba(255,255,255,0.3)" />
          {/* Bed lines */}
          <line x1="30" y1="35" x2="30" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <line x1="50" y1="35" x2="50" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <line x1="70" y1="35" x2="70" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          {/* Wheels */}
          <g ref={wheelsRef}>
            <circle cx="35" cy="72" r="8" fill={C.ink} className="truck-bounce" />
            <circle cx="35" cy="72" r="3" fill={C.paper} className="truck-bounce" />
            <circle cx="105" cy="72" r="8" fill={C.ink} className="truck-bounce" style={{ animationDelay: '0.15s' }} />
            <circle cx="105" cy="72" r="3" fill={C.paper} className="truck-bounce" style={{ animationDelay: '0.15s' }} />
          </g>
          {/* Motion lines */}
          <line x1="2" y1="45" x2="12" y2="45" stroke={C.signal} strokeWidth="1.5" opacity="0.4" />
          <line x1="5" y1="52" x2="13" y2="52" stroke={C.signal} strokeWidth="1.5" opacity="0.3" />
          <line x1="0" y1="59" x2="10" y2="59" stroke={C.signal} strokeWidth="1.5" opacity="0.2" />
        </svg>
      </div>
    </div>
  );
}

/* Step 3: Clean / Sparkle Finish */
function CleanFinishAnimation() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Checkmark circle */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2" style={{ borderColor: C.signal, backgroundColor: 'rgba(230, 59, 46, 0.08)' }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M8 18 L15 25 L28 11" stroke={C.signal} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {/* Sparkles around the check */}
        {[
          { x: -18, y: -18, delay: '0s', size: 8 },
          { x: 22, y: -22, delay: '0.4s', size: 6 },
          { x: 28, y: 10, delay: '0.8s', size: 7 },
          { x: -22, y: 14, delay: '1.0s', size: 5 },
          { x: 8, y: -28, delay: '0.6s', size: 5 },
          { x: -10, y: 26, delay: '0.2s', size: 6 },
        ].map((s, i) => (
          <svg
            key={i}
            className="sparkle absolute"
            style={{ left: `calc(50% + ${s.x}px - ${s.size / 2}px)`, top: `calc(50% + ${s.y}px - ${s.size / 2}px)`, animationDelay: s.delay }}
            width={s.size}
            height={s.size}
            viewBox="0 0 10 10"
            fill={C.signal}
          >
            <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" />
          </svg>
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  {
    num: '01',
    title: 'Call or Text',
    desc: "Reach out at (662) 597-1268. Tell us what you need hauled and we'll give you a straight quote — no hidden costs, no upsells.",
    Anim: PhoneRingAnimation,
  },
  {
    num: '02',
    title: 'We Show Up',
    desc: "Our crew arrives on time with the truck ready. We handle all the heavy lifting so you don't have to break a sweat.",
    Anim: TruckAnimation,
  },
  {
    num: '03',
    title: 'Gone. Clean.',
    desc: 'We load it, haul it, dispose of it responsibly. Your space is cleared and swept — like we were never there (except for the empty room).',
    Anim: CleanFinishAnimation,
  },
];

function Protocol() {
  const ref = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const goPrev = () => setActiveStep((s) => (s === 0 ? STEPS.length - 1 : s - 1));
  const goNext = () => setActiveStep((s) => (s === STEPS.length - 1 ? 0 : s + 1));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.protocol-section', { y: 50, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-16">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono" style={{ color: C.signal }}>How It Works</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink font-heading md:text-5xl">
              Three steps to<br />
              <span className="italic font-drama" style={{ color: C.signal }}>empty space.</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={goPrev}
              className="btn-magnetic flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors duration-300"
              style={{ borderColor: C.paper, color: C.ink }}
              aria-label="Previous step"
            >
              <ChevronLeft size={20} className="relative z-10" />
            </button>
            <button
              onClick={goNext}
              className="btn-magnetic flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors duration-300"
              style={{ backgroundColor: C.signal }}
              aria-label="Next step"
            >
              <ChevronRight size={20} className="relative z-10" />
            </button>
          </div>
        </div>

        <div className="protocol-section invisible overflow-hidden rounded-[2rem] border border-paper bg-offwhite">
          <div
            className="flex transition-transform duration-600"
            style={{
              transform: `translateX(-${activeStep * 100}%)`,
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {STEPS.map((s) => (
              <div key={s.num} className="flex w-full shrink-0 flex-col items-center gap-8 p-8 md:flex-row md:p-12">
                <div className="flex-1">
                  <span className="text-sm tracking-wider font-mono" style={{ color: C.signal }}>{s.num}</span>
                  <h3 className="mt-2 mb-4 text-2xl font-bold tracking-tight text-ink font-heading md:text-4xl">{s.title}</h3>
                  <p className="max-w-md text-base leading-relaxed text-ink/60">{s.desc}</p>
                </div>
                <div className="flex h-48 w-full items-center justify-center md:w-64">
                  <s.Anim />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className="h-2 rounded-full transition-all duration-400"
              style={{
                width: activeStep === i ? 32 : 8,
                backgroundColor: activeStep === i ? C.signal : C.paper,
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PRICING
   ═══════════════════════════════════════════ */
const TIERS = [
  { name: 'Quarter Load', price: '$75–$125', desc: 'Perfect for small cleanouts', features: ['Single item removal', 'Small garage cleanout', 'Dorm move-out essentials', 'Same-day available'], primary: false },
  { name: 'Half Load', price: '$150–$250', desc: 'Our most popular option', features: ['Furniture sets & appliances', 'Full room cleanouts', 'Estate sale leftovers', 'Loading & disposal included'], primary: true },
  { name: 'Full Load', price: '$300–$450', desc: 'For major cleanouts & renovations', features: ['Full property clearouts', 'Renovation & construction debris', 'Commercial cleanouts', 'Priority scheduling'], primary: false },
];

function Pricing() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-card', { y: 50, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={ref} className="px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-widest font-mono" style={{ color: C.signal }}>Pricing</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink font-heading md:text-5xl">
            Priced by the{' '}
            <span className="italic font-drama" style={{ color: C.signal }}>load.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-ink/50">
            No hidden fees, no hourly rates. Just honest pricing based on how much space your stuff takes in our truck.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div key={tier.name} className={`pricing-card invisible relative rounded-[2rem] border p-8 ${tier.primary ? 'scale-[1.02]' : ''}`} style={{
              backgroundColor: tier.primary ? C.ink : C.offwhite,
              borderColor: tier.primary ? C.ink : C.paper,
              ...(tier.primary ? { boxShadow: `0 0 0 2px ${C.signal}` } : {}),
            }}>
              {tier.primary && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-[2rem] px-4 py-1 text-xs font-bold text-white font-mono" style={{ backgroundColor: C.signal }}>MOST POPULAR</span>
              )}
              <h3 className="text-xl font-bold tracking-tight font-heading" style={{ color: tier.primary ? '#fff' : C.ink }}>{tier.name}</h3>
              <p className="mt-2 mb-1 text-4xl italic font-drama" style={{ color: C.signal }}>{tier.price}</p>
              <p className="mb-6 text-sm" style={{ color: tier.primary ? 'rgba(255,255,255,0.5)' : 'rgba(17,17,17,0.5)' }}>{tier.desc}</p>
              <ul className="mb-8 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: tier.primary ? 'rgba(255,255,255,0.7)' : 'rgba(17,17,17,0.6)' }}>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: C.signal }} />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="tel:6625971268" className="btn-magnetic block rounded-[2rem] px-6 py-3 text-center text-sm font-bold" style={{
                backgroundColor: tier.primary ? C.signal : 'transparent',
                color: tier.primary ? '#fff' : C.ink,
                border: tier.primary ? 'none' : `2px solid ${C.paper}`,
              }}>
                <span className="btn-bg rounded-[2rem]" style={{ backgroundColor: tier.primary ? C.signalDark : C.paper }} />
                <span className="relative z-10">Book a Pickup</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER — System Operational removed
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer id="footer" className="px-6 pt-16 pb-8 md:px-16" style={{ backgroundColor: C.ink, borderRadius: '4rem 4rem 0 0' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="mb-3 text-2xl font-bold tracking-tight text-white font-heading">REBEL HAULING</h3>
            <p className="max-w-sm text-sm leading-relaxed text-white/40">
              Fast, reliable, and affordable junk removal for residential, commercial, and student housing clients across Lafayette County, MS and Greene County, MO.
            </p>
            <a href="tel:6625971268" className="btn-magnetic mt-6 inline-flex items-center gap-2 rounded-[2rem] px-6 py-3 text-sm font-bold text-white" style={{ backgroundColor: C.signal }}>
              <span className="btn-bg rounded-[2rem]" style={{ backgroundColor: C.signalDark }} />
              <Phone size={14} className="relative z-10" />
              <span className="relative z-10">(662) 597-1268</span>
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-white/30 font-mono">Navigate</h4>
            <ul className="space-y-2">
              {[
                { label: 'Services', href: '#services' },
                { label: 'About', href: '#about' },
                { label: 'How It Works', href: '#protocol' },
                { label: 'Pricing', href: '#pricing' },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="link-lift inline-block text-sm text-white/60 transition-colors hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-white/30 font-mono">Service Areas</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={12} style={{ color: C.signal }} />
                Lafayette County, MS
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={12} style={{ color: C.signal }} />
                Greene County, MO
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/30 font-mono">
            &copy; {new Date().getFullYear()} Rebel Hauling Services LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <Features />
      <AboutUs />
      <Protocol />
      <Pricing />
      <Footer />
    </>
  );
}
