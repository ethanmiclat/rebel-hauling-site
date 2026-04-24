import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Phone, Truck, MapPin, Clock, Shield, ArrowRight, Menu, X, ChevronLeft, ChevronRight,
  Mail, Quote, Star, Package, Home, Building2, Award,
} from 'lucide-react';

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8.5h2.85l.4-3.3H13.5V8.1c0-.95.27-1.6 1.65-1.6h1.75V3.55c-.3-.04-1.35-.13-2.55-.13-2.55 0-4.3 1.55-4.3 4.4v2.38H7.2v3.3h2.85V22h3.45z" />
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

const C = {
  paper: '#E8E4DD',
  signal: '#CC1F2C',
  signalDark: '#9C121C',
  navy: '#1E3A5F',
  navyDark: '#142947',
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
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
  ];

  const textColor = scrolled ? C.ink : '#fff';
  const linkColor = scrolled ? C.ink : 'rgba(255,255,255,0.9)';

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-[2rem] px-6 py-3 transition-all duration-500 ${scrolled
        ? 'border border-[#E8E4DD] bg-[#F5F3EE]/90 shadow-lg backdrop-blur-xl'
        : 'border border-white/10 bg-black/40 backdrop-blur-md'
        }`}
      style={{ maxWidth: '90vw' }}
    >
      <div className="flex items-center gap-6">
        <a href="#" className="flex items-center">
          <img src="/Logo.png" alt="Rebel Hauling" className="h-11 w-auto" />
        </a>

        <div className="hidden items-center gap-5 md:flex">
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

      <div className="relative z-10 w-full max-w-5xl px-5 pb-12 sm:px-6 sm:pb-16 md:px-16 md:pb-24">
        <h1 className="mb-4">
          <span className="hero-anim invisible block text-3xl font-bold leading-[1.1] tracking-tight text-white font-heading sm:text-4xl md:text-6xl lg:text-7xl">
            Haul the
          </span>
          <span className="hero-anim invisible block text-[3.5rem] italic leading-[0.95] font-drama sm:text-6xl md:text-8xl lg:text-[10rem]" style={{ color: C.signal }}>
            Junk.
          </span>
        </h1>

        <p className="hero-anim invisible max-w-xl text-sm text-white/70 font-heading sm:text-base md:text-xl" style={{ letterSpacing: '-0.02em', marginBottom: '2rem' }}>
          Fast, affordable junk removal and hauling by two university operators who know Oxford and Springfield inside out. Priced by load — no surprises.
        </p>

        <a href="tel:6625971268" className="hero-anim invisible btn-magnetic inline-flex items-center gap-2 rounded-[2rem] px-6 py-3 text-base font-bold text-white sm:gap-3 sm:px-8 sm:py-4 sm:text-lg" style={{ backgroundColor: C.signal }}>
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
    { title: 'Quarter Load', price: '$215', desc: 'Small cleanouts & single items' },
    { title: 'Half Load', price: '$345', desc: 'Garage cleanouts & furniture sets' },
    { title: 'Full Load', price: '$595', desc: 'Full property & renovation debris' },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setOrder((prev) => { const n = [...prev]; n.unshift(n.pop()); return n; });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-[2rem] border border-paper bg-offwhite p-6 md:p-8">
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
              <span className="text-lg font-bold font-mono" style={{ color: C.navy }}>{labels[idx].price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrustCard() {
  const stats = [
    { icon: Star, label: '5-Star Rated', value: '100%', sub: 'customer satisfaction' },
    { icon: Clock, label: 'Same-Day Service', value: '24h', sub: 'typical response' },
    { icon: Award, label: 'Years Combined', value: '5+', sub: 'operator experience' },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % stats.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-[2rem] border border-paper bg-offwhite p-6 md:p-8">
      <p className="text-xl font-bold tracking-tight text-ink font-heading">Fast &amp; Reliable</p>
      <p className="mt-1 text-sm text-ink/50">Multi-year operators. Same-day service available.</p>
      <div className="mt-6 space-y-2.5" style={{ height: 230 }}>
        {stats.map((s, i) => {
          const isActive = i === active;
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="flex items-center gap-4 rounded-[1.25rem] border p-3"
              style={{
                backgroundColor: isActive ? C.ink : '#fff',
                borderColor: isActive ? C.ink : C.paper,
                transform: isActive ? 'translateX(6px)' : 'translateX(0)',
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.75rem]"
                style={{ backgroundColor: isActive ? C.signal : C.paper, transition: 'background-color 0.5s' }}
              >
                <Icon size={18} style={{ color: isActive ? '#fff' : C.ink }} />
              </div>
              <div className="flex flex-1 items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-bold font-heading" style={{ color: isActive ? '#fff' : C.ink, transition: 'color 0.5s' }}>
                    {s.label}
                  </div>
                  <div className="text-[11px]" style={{ color: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(17,17,17,0.45)', transition: 'color 0.5s' }}>
                    {s.sub}
                  </div>
                </div>
                <span className="text-base font-bold font-mono" style={{ color: isActive ? C.signal : C.navy, transition: 'color 0.5s' }}>
                  {s.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Scope card — "No project too big or small" */
function ScopeCard() {
  const scopes = [
    { icon: Package, label: 'Single Items', desc: 'Furniture, appliances, one-offs' },
    { icon: Home, label: 'Residential', desc: 'Garages, basements, estate cleanouts' },
    { icon: Building2, label: 'Commercial', desc: 'Office clearouts, renovation debris' },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % scopes.length), 2600);
    return () => clearInterval(id);
  }, []);

  const current = scopes[active];
  const Icon = current.icon;

  return (
    <div className="rounded-[2rem] border border-paper bg-offwhite p-6 md:p-8">
      <p className="text-xl font-bold tracking-tight text-ink font-heading">No Project Too Big or Small</p>
      <p className="mt-1 text-sm text-ink/50">From a single chair to a full estate clearout.</p>

      <div className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-paper bg-white p-6" style={{ height: 160 }}>
        <div className="mb-5 flex items-center gap-2">
          {scopes.map((_, i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full"
              style={{
                backgroundColor: i <= active ? C.signal : C.paper,
                transition: 'background-color 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div
            key={`i-${active}`}
            className="scope-pop flex h-14 w-14 shrink-0 items-center justify-center rounded-[1rem]"
            style={{ backgroundColor: C.navy }}
          >
            <Icon size={26} className="text-white" />
          </div>
          <div key={`t-${active}`} className="scope-fade">
            <div className="text-base font-bold text-ink font-heading">{current.label}</div>
            <div className="text-xs text-ink/50">{current.desc}</div>
          </div>
          <span className="ml-auto text-[10px] font-bold tracking-widest font-mono" style={{ color: C.signal }}>
            {String(active + 1).padStart(2, '0')}/{String(scopes.length).padStart(2, '0')}
          </span>
        </div>
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
    <section id="services" ref={ref} className="px-5 py-16 sm:px-6 sm:py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest font-mono" style={{ color: C.navy }}>What We Do</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight font-heading md:text-5xl" style={{ color: C.navy }}>
            Services built for<br />
            <span className="italic font-drama" style={{ color: C.signal }}>real people.</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="feature-card invisible"><ShufflerCard /></div>
          <div className="feature-card invisible"><TrustCard /></div>
          <div className="feature-card invisible"><ScopeCard /></div>
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
    <section id="about" ref={ref} className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-28 md:px-16 md:py-40" style={{ backgroundColor: C.ink }}>
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80)' }} />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <div className="about-anim invisible mb-8">
          <span className="text-xs uppercase tracking-widest font-mono" style={{ color: C.navy }}>About Us</span>
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
            {
              name: 'Ethan Harris',
              role: 'Founder, CEO',
              img: '/EthanHarris.png',
              pos: 'center 40%',
              bio: 'Born and raised in Springfield, Missouri, attending the University of Mississippi pursuing a degree in Entrepreneurship within the School of Business. Previous experience both running and working for a hauling company, as well as jobs in moving and produce. Actively exploring new strategies to make business efficient and seamless!',
            },
            {
              name: 'Kane Snider',
              role: 'Co-Founder',
              img: '/KaneSnider.png',
              pos: 'center 40%',
              bio: 'From Springfield, Missouri. I am a Sophomore at the University of Mississippi studying for a degree in Finance. Prior experience working and managing a junk removal company, as well as a job in professional moving. I specialize in business marketing and communications!',
            },
          ].map((person) => (
            <div key={person.name} className="flex flex-col items-center rounded-[2rem] border border-white/10 p-6 text-center md:p-8" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <div className="mb-6 h-36 w-36 overflow-hidden rounded-full border-2" style={{ borderColor: C.signal }}>
                <img src={person.img} alt={person.name} className="h-full w-full object-cover" style={{ objectPosition: person.pos }} />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">{person.name}</h3>
              <p className="mt-1 text-sm font-mono" style={{ color: '#6EA8DB' }}>{person.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/60 font-heading">{person.bio}</p>
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
        <a
          href="tel:6625971268"
          aria-label="Call Rebel Hauling"
          className="phone-ring flex h-16 w-16 items-center justify-center rounded-[1.25rem] transition-transform hover:scale-105"
          style={{ backgroundColor: C.signal }}
        >
          <Phone size={28} className="text-white" />
        </a>
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
    <section id="protocol" ref={ref} className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-16">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-widest font-mono" style={{ color: C.navy }}>How It Works</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight font-heading md:text-5xl" style={{ color: C.navy }}>
            Three steps to{' '}
            <span className="italic font-drama" style={{ color: C.signal }}>empty space.</span>
          </h2>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-8">
          {/* Left arrow — hidden on mobile, shown below card */}
          <button
            onClick={goPrev}
            className="btn-magnetic hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 md:flex md:h-14 md:w-14"
            style={{ borderColor: C.paper, color: C.ink, backgroundColor: '#fff' }}
            aria-label="Previous step"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Square card */}
          <div className="protocol-section invisible relative w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-paper bg-offwhite" style={{ aspectRatio: '1 / 1' }}>
            <div
              className="flex h-full"
              style={{
                transform: `translateX(-${activeStep * 100}%)`,
                transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              {STEPS.map((s) => (
                <div key={s.num} className="flex h-full w-full shrink-0 flex-col items-center justify-between gap-3 p-5 sm:p-8 md:gap-4 md:p-10">
                  <div className="w-full text-center">
                    <span className="text-[10px] tracking-widest font-mono sm:text-xs" style={{ color: C.signal }}>STEP {s.num}</span>
                    <h3 className="mt-1 text-lg font-bold tracking-tight font-heading sm:mt-2 sm:text-2xl md:text-3xl" style={{ color: C.navy }}>{s.title}</h3>
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    <s.Anim />
                  </div>
                  <p className="max-w-sm text-center text-xs leading-relaxed text-ink/60 sm:text-sm md:text-base">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow — hidden on mobile, shown below card */}
          <button
            onClick={goNext}
            className="btn-magnetic hidden h-12 w-12 shrink-0 items-center justify-center rounded-full text-white md:flex md:h-14 md:w-14"
            style={{ backgroundColor: C.signal }}
            aria-label="Next step"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Mobile arrows — shown below card on mobile only */}
        <div className="mt-6 flex items-center justify-center gap-6 md:hidden">
          <button
            onClick={goPrev}
            className="btn-magnetic flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2"
            style={{ borderColor: C.paper, color: C.ink, backgroundColor: '#fff' }}
            aria-label="Previous step"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={goNext}
            className="btn-magnetic flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: C.signal }}
            aria-label="Next step"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Step indicators */}
        <div className="mt-6 flex justify-center gap-2 md:mt-8">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className="h-2 rounded-full"
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
/* ═══════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════ */
const REVIEWS = [
  {
    quote: 'They came ahead of time and worked past their scheduled visit. Great seeing people do what they say they’ll do and then some.',
    name: 'J White',
  },
  {
    quote: 'Rebel Hauling was a tremendous help in getting many items needed for a big event moved all in one trip. The workers were efficient and helpful!',
    name: 'VP Ole Miss Alpha Phi',
  },
  {
    quote: 'Since my husband passed away, I am faced with the task of moving a lot of items that I simply cannot move. Rebel Hauling made it easy for me. I can’t thank them enough.',
    name: 'Jenny R.',
  },
];

function Testimonials() {
  const ref = useRef(null);
  const formWrapRef = useRef(null);
  const formInnerRef = useRef(null);
  const [formOpen, setFormOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [testimony, setTestimony] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.review-card', { y: 40, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const wrap = formWrapRef.current;
    const inner = formInnerRef.current;
    if (!wrap || !inner) return;
    gsap.killTweensOf([wrap, inner]);
    if (formOpen) {
      const h = inner.offsetHeight;
      gsap.fromTo(
        wrap,
        { height: 0, autoAlpha: 0 },
        { height: h, autoAlpha: 1, duration: 0.55, ease: 'power3.out',
          onComplete: () => gsap.set(wrap, { height: 'auto' }) },
      );
      gsap.fromTo(
        inner,
        { y: -16 },
        { y: 0, duration: 0.55, ease: 'power3.out' },
      );
    } else {
      gsap.to(wrap, {
        height: 0, autoAlpha: 0, duration: 0.4, ease: 'power2.inOut',
      });
    }
  }, [formOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    const starLine = rating > 0 ? `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)` : 'No rating provided';
    const body = `Rating: ${starLine}\n\nName: ${name || '(not provided)'}\n\nTestimonial:\n${testimony}`;
    const subject = 'Testimonial';
    window.location.href = `mailto:Contact@RebelHauling.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="testimonials" ref={ref} className="px-5 py-16 sm:px-6 sm:py-24 md:px-16 md:py-32" style={{ backgroundColor: C.offwhite }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-widest font-mono" style={{ color: C.navy }}>Testimonials</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight font-heading md:text-5xl" style={{ color: C.navy }}>
            What our{' '}
            <span className="italic font-drama" style={{ color: C.signal }}>customers</span>
            {' '}say.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="review-card invisible flex flex-col rounded-[2rem] border bg-white p-6 md:p-8"
              style={{ borderColor: C.paper }}
            >
              <Quote size={28} style={{ color: C.signal }} className="mb-4 shrink-0" />
              <p className="flex-1 text-base leading-relaxed text-ink/80 font-heading">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="mt-6 border-t pt-4" style={{ borderColor: C.paper }}>
                <div className="mb-1 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={C.signal} color={C.signal} />
                  ))}
                </div>
                <p className="text-sm font-bold font-heading" style={{ color: C.navy }}>
                  {r.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Your Own Testimonial */}
        <div className="mt-16 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setFormOpen((v) => !v)}
            aria-expanded={formOpen}
            className="btn-magnetic inline-flex items-center gap-2 rounded-[2rem] px-8 py-4 text-sm font-bold text-white"
            style={{ backgroundColor: C.navy }}
          >
            {formOpen ? 'Hide Form' : 'Share Your Experience'}
            <ChevronRight
              size={16}
              style={{
                transform: formOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />
          </button>

          <div
            ref={formWrapRef}
            className="w-full max-w-2xl overflow-hidden"
            style={{ height: 0, opacity: 0, visibility: 'hidden' }}
          >
            <form
              ref={formInnerRef}
              onSubmit={handleSend}
              className="mt-6 w-full rounded-[2rem] border bg-white p-6 sm:p-8 md:p-10"
              style={{ borderColor: C.paper }}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold font-heading" style={{ color: C.navy }}>
                    Submit a Testimonial
                  </h3>
                  <p className="mt-1 text-sm text-ink/50 font-heading">
                    Tell us how we did — we&rsquo;d love to hear from you.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  aria-label="Close form"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                  style={{ borderColor: C.paper, color: C.ink }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="mb-2 block text-xs uppercase tracking-widest font-mono" style={{ color: C.navy }}>
                  Your Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => {
                    const filled = (hoverRating || rating) >= n;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHoverRating(n)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`${n} star${n > 1 ? 's' : ''}`}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={32}
                          fill={filled ? C.signal : 'none'}
                          color={filled ? C.signal : '#C7C3BC'}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name */}
              <div className="mb-5">
                <label htmlFor="t-name" className="mb-2 block text-xs uppercase tracking-widest font-mono" style={{ color: C.navy }}>
                  Your Name
                </label>
                <input
                  id="t-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Alex M."
                  className="w-full rounded-[1rem] border px-4 py-3 text-sm font-heading outline-none transition-colors focus:border-navy"
                  style={{ borderColor: C.paper, backgroundColor: C.offwhite, color: C.ink }}
                />
              </div>

              {/* Testimony */}
              <div className="mb-6">
                <label htmlFor="t-body" className="mb-2 block text-xs uppercase tracking-widest font-mono" style={{ color: C.navy }}>
                  Your Testimonial
                </label>
                <textarea
                  id="t-body"
                  value={testimony}
                  onChange={(e) => setTestimony(e.target.value)}
                  required
                  rows={5}
                  placeholder="Tell us about your experience with Rebel Hauling..."
                  className="w-full resize-none rounded-[1rem] border px-4 py-3 text-sm font-heading outline-none transition-colors focus:border-navy"
                  style={{ borderColor: C.paper, backgroundColor: C.offwhite, color: C.ink }}
                />
              </div>

              <button
                type="submit"
                className="btn-magnetic inline-flex w-full items-center justify-center gap-2 rounded-[2rem] px-6 py-4 text-sm font-bold text-white sm:w-auto"
                style={{ backgroundColor: C.signal }}
              >
                <Mail size={16} />
                Send Testimonial
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const PRICE_TIERS = [
  { label: 'MIN', price: 105 },
  { label: '1/8', price: 135 },
  { label: '1/6', price: 160 },
  { label: '1/4', price: 215 },
  { label: '1/3', price: 265 },
  { label: '3/8', price: 305 },
  { label: '1/2', price: 345, popular: true },
  { label: '5/8', price: 400 },
  { label: '2/3', price: 445 },
  { label: '3/4', price: 490 },
  { label: '5/6', price: 535 },
  { label: '7/8', price: 565 },
  { label: 'FULL', price: 595 },
];

function Pricing() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-anim', { y: 40, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={ref} className="px-5 py-16 sm:px-6 sm:py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-widest font-mono" style={{ color: C.navy }}>Pricing</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight font-heading md:text-5xl" style={{ color: C.navy }}>
            Priced by the{' '}
            <span className="italic font-drama" style={{ color: C.signal }}>load.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-ink/50">
            No hidden fees, no hourly rates. Just honest pricing based on how much space your stuff takes in our truck.
          </p>
        </div>

        <div className="pricing-anim invisible overflow-hidden rounded-[2rem] border p-6 md:p-10" style={{ borderColor: C.paper, backgroundColor: C.offwhite }}>
          {/* Header row */}
          <div className="mb-4 flex items-center justify-between border-b pb-3" style={{ borderColor: C.paper }}>
            <span className="text-xs uppercase tracking-widest font-mono" style={{ color: C.navy }}>Volume</span>
            <span className="text-xs uppercase tracking-widest font-mono" style={{ color: C.navy }}>Price</span>
          </div>

          {/* Rows */}
          <div className="grid gap-1 md:grid-cols-2 md:gap-x-10">
            {PRICE_TIERS.map((t) => (
              <div
                key={t.label}
                className="pricing-anim invisible flex items-center justify-between rounded-[1rem] px-4 py-3 transition-colors duration-300 hover:bg-white"
                style={t.popular ? { backgroundColor: '#fff', boxShadow: `inset 0 0 0 2px ${C.signal}` } : {}}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold font-mono" style={{ color: C.ink }}>{t.label}</span>
                  {t.popular && (
                    <span className="rounded-full px-2 py-0.5 text-[9px] font-bold tracking-widest text-white font-mono" style={{ backgroundColor: C.signal }}>
                      POPULAR
                    </span>
                  )}
                </div>
                <span className="text-lg font-bold font-drama italic" style={{ color: C.signal }}>
                  ${t.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="tel:6625971268"
            className="btn-magnetic inline-flex items-center justify-center gap-2 rounded-[2rem] px-8 py-4 text-sm font-bold text-white"
            style={{ backgroundColor: C.signal }}
          >
            <span className="btn-bg rounded-[2rem]" style={{ backgroundColor: C.signalDark }} />
            <Phone size={16} className="relative z-10" />
            <span className="relative z-10">Book a Pickup</span>
          </a>
          <a
            href="mailto:Contact@RebelHauling.com?subject=Free%20Quote%20Request"
            className="btn-magnetic inline-flex items-center justify-center gap-2 rounded-[2rem] px-8 py-4 text-sm font-bold text-white"
            style={{ backgroundColor: C.navy }}
          >
            <span className="btn-bg rounded-[2rem]" style={{ backgroundColor: C.navyDark }} />
            <Mail size={16} className="relative z-10" />
            <span className="relative z-10">Get a Free Quote</span>
          </a>
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
    <footer id="footer" className="px-5 pt-14 pb-8 sm:px-6 sm:pt-16 md:px-16" style={{ backgroundColor: C.ink, borderRadius: '4rem 4rem 0 0' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <img src="/Logo.png" alt="Rebel Hauling" className="h-12 w-auto" />
              <h3 className="text-2xl font-bold tracking-tight text-white font-heading">REBEL HAULING</h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/40">
              Fast, reliable, and affordable junk removal for residential, commercial, and student housing clients across Lafayette County, MS and Greene County, MO.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="tel:6625971268" className="btn-magnetic inline-flex items-center gap-2 rounded-[2rem] px-5 py-3 text-sm font-bold text-white" style={{ backgroundColor: C.signal }}>
                <span className="btn-bg rounded-[2rem]" style={{ backgroundColor: C.signalDark }} />
                <Phone size={14} className="relative z-10" />
                <span className="relative z-10">(662) 597-1268</span>
              </a>
              <a href="mailto:Contact@RebelHauling.com" className="btn-magnetic inline-flex items-center gap-2 rounded-[2rem] px-5 py-3 text-sm font-bold text-white" style={{ backgroundColor: C.navy }}>
                <span className="btn-bg rounded-[2rem]" style={{ backgroundColor: C.navyDark }} />
                <Mail size={14} className="relative z-10" />
                <span className="relative z-10">Contact@RebelHauling.com</span>
              </a>
            </div>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              <a href="https://www.instagram.com/rebelhauling" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="link-lift flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white">
                <InstagramIcon size={16} />
              </a>
              <a href="https://www.facebook.com/people/Rebel-Hauling/61580227204039/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="link-lift flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white">
                <FacebookIcon size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-white/30 font-mono">Navigate</h4>
            <ul className="space-y-2">
              {[
                { label: 'Services', href: '#services' },
                { label: 'About', href: '#about' },
                { label: 'How It Works', href: '#protocol' },
                { label: 'Reviews', href: '#testimonials' },
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
            <img src="/Logo.png" alt="Rebel Hauling" className="mt-8 h-36 w-auto opacity-90" />
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
      <Testimonials />
      <Pricing />
      <Footer />
    </>
  );
}
