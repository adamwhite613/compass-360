import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Fairwinds 360 Suite — Navigate to Freedom" },
      { name: "description", content: "Instruments for personal freedom. Navigate the turbulent waters of modern life." },
      { property: "og:title", content: "Fairwinds 360 Suite — Navigate to Freedom" },
      { property: "og:image", content: "/images/hero.jpg" },
    ],
  }),
});

const ACCENT = "#6c5ce7";

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, duration = 2000, trigger = true) {
  const [val, setVal] = useState(target); // start at target — animate down from 0 only on trigger
  const fired = useRef(false);
  useEffect(() => {
    if (!trigger || fired.current) return;
    fired.current = true;
    setVal(0);
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(e * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, trigger]);
  return val;
}

// ── Primitives ────────────────────────────────────────────────────────────────

function HudLabel({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={`font-mono text-[10px] uppercase tracking-[0.28em] text-white/40 ${className}`} style={style}>
      {children}
    </span>
  );
}

function Hairline({ className = "" }: { className?: string }) {
  return <div className={`h-px bg-white/10 ${className}`} />;
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4 justify-center mb-16">
      <div className="h-px flex-1 max-w-[80px] bg-white/10" />
      <HudLabel>{children}</HudLabel>
      <div className="h-px flex-1 max-w-[80px] bg-white/10" />
    </div>
  );
}

// Corner bracket decoration
function Brackets({ size = 20, color = "rgba(108,92,231,0.5)", animated = false }) {
  const cls = animated ? "bracket-in" : "";
  const s = (d: number) => ({
    position: "absolute" as const,
    width: size, height: size,
    ...d === 0 ? { top: 0, left: 0, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` }
    : d === 1 ? { top: 0, right: 0, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` }
    : d === 2 ? { bottom: 0, left: 0, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` }
    : { bottom: 0, right: 0, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` },
  });
  return (
    <>
      {[0,1,2,3].map(d => (
        <span key={d} className={`pointer-events-none ${cls}`} style={{ ...s(d), animationDelay: `${d * 0.05}s` }} />
      ))}
    </>
  );
}

// ── Logo ──────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <a href="#top" className="block">
      <img
        src="/images/fairwinds-logo.png"
        alt="Fairwinds 360"
        className="h-14 md:h-20 w-auto"
      />
    </a>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

const productTabs = [
  { name: "Finance", count: "01", href: "https://finance.fairwinds360.com" },
  { name: "Fit",     count: "02", href: "https://fit.fairwinds360.com" },
  { name: "Function", count: "03", href: "https://function.fairwinds360.com" },
  { name: "Portfolio", count: "04", href: "https://portfolio.fairwinds360.com" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-700"
      style={{ background: scrolled ? "rgba(6,8,18,0.88)" : "transparent",
               backdropFilter: scrolled ? "blur(20px)" : "none",
               borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none" }}>

      {/* Main nav row */}
      <div className="py-3 md:py-4 flex items-center" style={{ paddingLeft: "1.5em", paddingRight: "1.5em" }}>
        <div className="flex-1 hud-reveal" style={{ animationDelay: "0.1s" }}>
          <Logo />
        </div>

        <ul className="hidden md:flex items-center gap-10 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
          {["Products", "Pricing"].map((item, i) => (
            <li key={item} className="hud-reveal" style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
              <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</a>
            </li>
          ))}
        </ul>

        <div className="flex-1 flex justify-end hud-reveal" style={{ animationDelay: "0.36s" }}>
          <a href="#cta"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 px-3 py-1.5 md:px-4 md:py-2 transition-all hover:text-white"
            style={{ border: `1px solid rgba(108,92,231,0.45)` }}>
            Get Access
          </a>
        </div>
      </div>

      {/* Second row — product tabs, centered */}
      <div className="pb-3 flex items-center justify-center gap-6 md:gap-8 border-t border-white/[0.06]"
        style={{ paddingLeft: "1.5em", paddingRight: "1.5em" }}>
        {productTabs.map((tab, i) => (
          <a key={tab.name} href={tab.href}
            target="_blank" rel="noopener noreferrer"
            onClick={() => setActiveTab(i)}
            className="flex items-baseline gap-1 font-mono text-[11px] transition-colors"
            style={{ color: activeTab === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)" }}>
            {tab.name}
            <sup className="text-[9px]" style={{ color: activeTab === i ? ACCENT : "rgba(255,255,255,0.25)" }}>
              {tab.count}
            </sup>
          </a>
        ))}
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const hudData = [
    { label: "LAT", value: "48°52′N" },
    { label: "LON", value: "077°00′W" },
    { label: "HDG", value: "270°" },
    { label: "DEPTH", value: "4,200 m" },
    { label: "WIND", value: "12 kn" },
  ];

  return (
    <section id="top" className="relative flex flex-col overflow-hidden" style={{ minHeight: "100svh" }}>

      {/* ── Video background ── */}
      <div className="absolute inset-0">
        <video
          autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(1.1) saturate(1.15)" }}
        >
          <source src="/videos/hero-compressed.mp4" type="video/mp4" />
        </video>
        {/* Navy overlay at 80% opacity */}
        <div className="absolute inset-0" style={{ background: "rgba(4,8,24,0.90)" }} />
        {/* Film grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px" }} />
      </div>


      {/* ── Headline — bottom-anchored ── */}
      <div className="relative z-10 flex flex-1 flex-col justify-end items-center text-center pb-28 px-6">
        <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 2s" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif",
                       fontSize: "clamp(2.2em, 10vw, 3em)", lineHeight: 1 }}
            className="font-light text-white uppercase">
            Strategy. Visibility. Freedom.
          </h1>
          <p className="mt-3 text-white/45 text-[11px] uppercase" style={{ letterSpacing: "0.1em" }}>
            instruments for the turbulent waters of modern life
          </p>
        </div>
      </div>

      {/* ── HUD bottom bar — pill indicators ── */}
      <div className="hud-reveal absolute bottom-0 inset-x-0 z-20 border-t border-white/[0.1]"
        style={{ animationDelay: "0.9s", background: "rgba(0,0,0,0.42)", backdropFilter: "blur(12px)" }}>
        <div className="px-6 md:px-10 py-3 flex items-center justify-between gap-4">


          {/* Pill data indicators */}
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
            {hudData.map(({ label, value }, i) => (
              <div key={label}
                className="flex-shrink-0 flex flex-col items-center justify-center rounded-full px-4 py-1.5 data-flicker"
                style={{ border: "1px solid rgba(255,255,255,0.15)", animationDelay: `${i * 1.4}s`,
                         minWidth: 72, background: "rgba(255,255,255,0.04)" }}>
                <span className="font-mono text-[11px] text-white/80">{value}</span>
                <HudLabel>{label}</HudLabel>
              </div>
            ))}
          </div>

          {/* Center slider + page dots */}
          <div className="hidden md:flex flex-col items-center gap-2 flex-shrink-0 px-4">
            <div className="relative w-28 h-px bg-white/20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-transparent"
                style={{ border: "1px solid rgba(255,255,255,0.45)" }} />
            </div>
            <div className="flex items-center gap-2">
              {["01","02","03","04","05"].map((n, i) => (
                <span key={n} className="font-mono text-[9px]"
                  style={{ color: i === 1 ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.2)" }}>
                  {n}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Problem ───────────────────────────────────────────────────────────────────

function StatCard({ value, suffix = "", label, trigger }: {
  value: number; suffix?: string; label: string; trigger: boolean;
}) {
  const count = useCounter(value, 2200, trigger);
  return (
    <div className="relative border border-white/[0.08] bg-white/[0.02] px-8 py-10 text-center backdrop-blur-sm">
      <Brackets size={10} color="rgba(108,92,231,0.35)" />
      <div className="font-mono text-4xl md:text-5xl font-light data-flicker"
        style={{ color: ACCENT }}>
        {count}{suffix}
      </div>
      <HudLabel className="mt-3 block">{label}</HudLabel>
    </div>
  );
}

function Problem() {
  const { ref, inView } = useInView();
  const stats = [
    { value: 73, suffix: "%", label: "Feel financially adrift" },
    { value: 61, suffix: "%", label: "Lack a daily system" },
    { value: 84, suffix: "%", label: "Have no legacy plan" },
  ];

  return (
    <section className="border-t border-white/[0.06] px-6 py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-4xl">
        <SectionLabel>The Problem</SectionLabel>
        <p className={`text-center font-serif font-light leading-snug text-3xl md:text-4xl text-white/85 max-w-3xl mx-auto transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Financial complexity. Scattered habits. A life spread across a dozen apps
          that don't talk to each other.{" "}
          <em className="text-white/50">You're navigating without instruments.</em>
        </p>

        <div className="mt-14 grid grid-cols-1 gap-px md:grid-cols-3 bg-white/[0.04]">
          {stats.map((s, i) => (
            <div key={s.label} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${0.2 + i * 0.12}s` }}>
              <StatCard {...s} trigger={inView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Products ──────────────────────────────────────────────────────────────────

const products = [
  { icon: "◐", name: "Fairwinds Finance", tagline: "Complete personal finance intelligence", desc: "Real-time budgeting, cash flow forecasting, credit tracking, and AI-powered transaction insights — all in one instrument.", status: "LIVE", live: true, href: "https://finance.fairwinds360.com" },
  { icon: "◇", name: "Fairwinds Fit", tagline: "Training, nutrition, and recovery tracking", desc: "Log workouts, track macros, monitor recovery metrics. Your body as a system to be understood and optimised.", status: "LIVE", live: true, href: "https://fit.fairwinds360.com" },
  { icon: "△", name: "Fairwinds Function", tagline: "Daily intention and habit engine", desc: "Set daily intentions, build systems that compound, and stay on bearing toward your long-term goals.", status: "LIVE", live: true, href: "https://function.fairwinds360.com" },
  { icon: "▢", name: "Fairwinds Portfolio", tagline: "Career journal and archive", desc: "A private logbook for the work that matters. Document projects, capture learnings, and build a record of what you've shipped.", status: "LIVE", live: true, href: "https://portfolio.fairwinds360.com" },
];

function ProductCard({ product }: { product: typeof products[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative group bg-[#0a0a0f] p-10 md:p-12 cursor-default transition-all duration-300"
      style={{ background: hovered ? "rgba(108,92,231,0.04)" : "rgba(10,10,15,0.9)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {/* Corner brackets that grow on hover */}
      <Brackets
        size={hovered ? 28 : 16}
        color={hovered ? `rgba(108,92,231,0.7)` : "rgba(255,255,255,0.1)"}
      />

      <div className="mb-8 font-mono text-3xl transition-colors duration-300"
        style={{ color: hovered ? ACCENT : "rgba(255,255,255,0.35)" }}>
        {product.icon}
      </div>

      <h3 className="font-serif font-light text-3xl text-white mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {product.name}
      </h3>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-5"
        style={{ color: hovered ? ACCENT : "rgba(255,255,255,0.35)" }}>
        {product.tagline}
      </p>
      <p className="text-white/45 text-sm leading-relaxed max-w-sm">
        {product.desc}
      </p>

      <div className="mt-10 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.22em] px-3 py-1.5 border"
          style={product.live
            ? { borderColor: ACCENT, color: ACCENT }
            : { borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.35)" }}>
          {product.status}
        </span>
        {product.live && product.href && (
          <a href={product.href}
            target="_blank" rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors flex items-center gap-2">
            Launch <span>→</span>
          </a>
        )}
      </div>
    </div>
  );
}

function Products() {
  const { ref, inView } = useInView();
  return (
    <section id="products" className="border-t border-white/[0.06] px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>The Suite</SectionLabel>
        <h2 className={`font-serif font-light text-center text-5xl md:text-7xl text-white mb-20 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Four instruments.<br /><em className="text-white/60">One direction.</em>
        </h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
          {products.map((p, i) => (
            <div key={p.name} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 0.1}s` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

const testimonials = [
  {
    image: "/images/testimonial-1.jpg",
    quote: "I've given everything to Adam, every part of myself. I know I'm in good hands with the Fairwinds 360 Suite.",
    name: "Margot Robbie",
    title: "Actress, Producer",
  },
  {
    image: "/images/testimonial-2.jpg",
    quote: "Adam's powerful Fairwinds 360 Suite has transformed how I manage my finances. I now rely on Adam not just to manage my own life, but for financial and investment advice. He's a true hero.",
    name: "Warren Buffett",
    title: "Chairman and CEO, Berkshire Hathaway",
  },
  {
    image: "/images/testimonial-3.png",
    quote: "The Fairwinds 360 Suite has been a game-changer for my financial management. And remember, I'm not just a client, I'm also the owner!",
    name: "Adam White",
    title: "Founder, Fairwinds 360",
  },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { ref, inView } = useInView();

  const goTo = (idx: number) => {
    setFading(true);
    setTimeout(() => { setCurrent(idx); setFading(false); }, 350);
  };

  const next = useRef(() => {});
  next.current = () => goTo((current + 1) % testimonials.length);

  useEffect(() => {
    if (paused) { if (intervalRef.current) clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => next.current(), 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused]);

  const t = testimonials[current];

  return (
    <section className="border-t border-white/[0.06] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>In Their Words</SectionLabel>

        <div ref={ref}
          className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}>

          {/* Slide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">

            {/* Image */}
            <div className="relative overflow-hidden bg-black/40 rounded-2xl" style={{ aspectRatio: '1 / 1' }}>
              <Brackets size={20} color="rgba(108,92,231,0.4)" />
              <img
                key={current}
                src={t.image}
                alt={t.name}
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500"
                style={{ opacity: fading ? 0 : 1 }}
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(4,8,24,0.35) 0%, transparent 60%)" }} />
            </div>

            {/* Quote */}
            <div className="relative flex flex-col justify-center px-10 md:px-16 py-14 md:py-20 bg-[#0a0a0f]">
              <Brackets size={16} color="rgba(255,255,255,0.07)" />

              <div className="transition-opacity duration-500" style={{ opacity: fading ? 0 : 1 }}>
                <span className="font-mono text-5xl leading-none mb-6 block"
                  style={{ color: ACCENT, fontFamily: "Georgia, serif" }}>&ldquo;</span>
                <blockquote className="font-serif font-light text-xl md:text-2xl text-white/80 leading-relaxed mb-8"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {t.quote}
                </blockquote>
                <div>
                  <HudLabel className="text-white/60">{t.name}</HudLabel>
                  <HudLabel className="block mt-1">{t.title}</HudLabel>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className="transition-all duration-300"
                style={{
                  width: i === current ? 24 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === current ? ACCENT : "rgba(255,255,255,0.2)",
                }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────

const tiers = [
  {
    name: "Fairwinds Finance",
    tagline: "Personal finance intelligence",
    monthly: 19.99,
    annualMonthly: 15.99,
    annualTotal: 191.99,
    features: [
      "Real-time budget tracking",
      "Unlimited transaction imports",
      "AI-powered categorisation",
      "Cash flow forecasting (90 days)",
      "Credit & debt payoff calculator",
      "Plaid bank sync",
    ],
    highlight: false,
    badge: null,
  },
  {
    name: "Finance + Fit",
    tagline: "Money and body in sync",
    monthly: 29.99,
    annualMonthly: 23.99,
    annualTotal: 287.99,
    features: [
      "Everything in Finance",
      "Workout logging & programming",
      "Macro & nutrition tracking",
      "Recovery metrics",
      "Training history & analytics",
    ],
    highlight: false,
    badge: null,
  },
  {
    name: "360 Suite",
    tagline: "The full instrument panel",
    monthly: 49.99,
    annualMonthly: 39.99,
    annualTotal: 479.99,
    features: [
      "Everything in Finance + Fit",
      "Career journal & portfolio",
      "Daily intention & habit engine",
      "Cross-app intelligence",
      "Priority support & early access",
    ],
    highlight: true,
    badge: "Most Popular",
  },
];

function Pricing() {
  const { ref, inView } = useInView();
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="border-t border-white/[0.06] px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Pricing</SectionLabel>
        <h2 className={`font-serif font-light text-center text-5xl md:text-7xl text-white mb-12 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Choose your altitude.
        </h2>

        {/* Billing toggle */}
        <div className={`flex items-center justify-center gap-3 mb-16 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
          <button
            onClick={() => setAnnual(false)}
            className="font-mono text-[11px] uppercase tracking-[0.2em] px-5 py-2 transition-all duration-200"
            style={{
              background: !annual ? "rgba(108,92,231,0.15)" : "transparent",
              border: `1px solid ${!annual ? ACCENT : "rgba(255,255,255,0.15)"}`,
              color: !annual ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
            }}>
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className="font-mono text-[11px] uppercase tracking-[0.2em] px-5 py-2 transition-all duration-200 flex items-center gap-2"
            style={{
              background: annual ? "rgba(108,92,231,0.15)" : "transparent",
              border: `1px solid ${annual ? ACCENT : "rgba(255,255,255,0.15)"}`,
              color: annual ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
            }}>
            Annual
            <span className="px-1.5 py-0.5 text-[9px] tracking-[0.15em]"
              style={{
                background: annual ? ACCENT : "rgba(255,255,255,0.08)",
                color: annual ? "#fff" : "rgba(255,255,255,0.4)",
                borderRadius: 2,
              }}>
              SAVE 20%
            </span>
          </button>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((t, i) => {
            const price = annual ? t.annualMonthly : t.monthly;
            return (
              <div key={t.name}
                className={`relative flex flex-col p-10 backdrop-blur-sm transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{
                  transitionDelay: `${i * 0.12}s`,
                  border: `1px solid ${t.highlight ? ACCENT : "rgba(255,255,255,0.1)"}`,
                  background: t.highlight ? `rgba(108,92,231,0.06)` : "rgba(255,255,255,0.015)",
                }}>

                {t.highlight && (
                  <>
                    <Brackets size={16} color={ACCENT} />
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 font-mono text-[10px] tracking-[0.25em] uppercase"
                      style={{ background: "#0a0a0f", border: `1px solid ${ACCENT}`, color: ACCENT }}>
                      {t.badge}
                    </span>
                  </>
                )}

                {/* Name + tagline */}
                <HudLabel className="mb-1">{t.name}</HudLabel>
                <p className="font-mono text-[10px] tracking-[0.15em] mb-6" style={{ color: "rgba(255,255,255,0.25)" }}>
                  {t.tagline}
                </p>

                {/* Price */}
                <div className="flex items-end gap-2 mb-1">
                  <span className="font-serif font-light text-5xl text-white leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    ${price.toFixed(2)}
                  </span>
                  <HudLabel className="mb-1">/ mo</HudLabel>
                </div>

                {/* Annual callout */}
                <div className="mb-8" style={{ minHeight: "1.25rem" }}>
                  {annual ? (
                    <HudLabel style={{ color: "rgba(255,255,255,0.3)" }}>
                      Billed ${t.annualTotal.toFixed(2)} annually
                    </HudLabel>
                  ) : (
                    <HudLabel style={{ color: "rgba(255,255,255,0.18)" }}>
                      or ${t.annualMonthly.toFixed(2)}/mo billed annually
                    </HudLabel>
                  )}
                </div>

                <Hairline className="mb-8" />

                <ul className="space-y-3 flex-1">
                  {t.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                      <span style={{ color: ACCENT }} className="shrink-0 mt-0.5">—</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a href="#cta"
                  className="mt-10 block text-center py-3 font-mono text-[11px] uppercase tracking-[0.25em] transition-all duration-300"
                  style={t.highlight
                    ? { background: ACCENT, color: "#fff" }
                    : { border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
                  onMouseEnter={e => { if (!t.highlight) (e.currentTarget.style.borderColor = ACCENT); }}
                  onMouseLeave={e => { if (!t.highlight) (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"); }}>
                  Get Access
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function CtaBanner() {
  const { ref, inView } = useInView();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section id="cta" className="border-t border-white/[0.06] px-6 py-32 md:py-40 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, rgba(108,92,231,0.08) 0%, transparent 70%)` }} />

      <div ref={ref} className="mx-auto max-w-3xl text-center relative z-10">
        <SectionLabel>Begin</SectionLabel>
        <h2 className={`font-serif font-light text-5xl md:text-7xl text-white leading-[0.95] transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Your destination<br /><em className="text-white/60">is waiting.</em>
        </h2>

        <p className={`mt-6 text-white/45 text-lg font-light transition-all duration-1000 delay-200 ${inView ? "opacity-100" : "opacity-0"}`}>
          Join the founding crew. Be first when each instrument comes online.
        </p>

        <form className={`mt-12 flex flex-col sm:flex-row gap-0 max-w-md mx-auto border border-white/15 transition-all duration-1000 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          onSubmit={e => { e.preventDefault(); setSent(true); }}>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-transparent px-5 py-4 font-mono text-sm text-white placeholder:text-white/25 focus:outline-none border-r border-white/15" />
          <button type="submit"
            className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.25em] transition-all duration-300"
            style={{ background: sent ? "rgba(0,184,148,0.8)" : ACCENT, color: "#fff" }}>
            {sent ? "✓ Aboard" : "Submit"}
          </button>
        </form>

        <HudLabel className="mt-6 block">No spam. No data sold. Ever.</HudLabel>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Logo />
          <HudLabel>© 2026 Fairwinds 360</HudLabel>
        </div>
        <div className="flex items-center gap-6">
          {["Privacy", "Terms"].map(l => (
            <a key={l} href="#" className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors">{l}</a>
          ))}
        </div>
        <HudLabel className="data-flicker" style={{ animationDelay: "3s" }}>
          48°52′N · 077°00′W · HDG 270°
        </HudLabel>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function Index() {
  return (
    <main className="min-h-screen" style={{ background: "#0a0a0f", color: "#fff" }}>
      <Nav />
      <Hero />
      <Problem />
      <Products />
      <Testimonials />
      <Pricing />
      <CtaBanner />
      <Footer />
    </main>
  );
}
