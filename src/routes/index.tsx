import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Compass 360 Suite — Navigate to Freedom" },
      {
        name: "description",
        content:
          "Compass 360 Suite — instruments for personal freedom. Finance, fitness, tasks, and portfolio in one navigational system.",
      },
      { property: "og:title", content: "Compass 360 Suite — Navigate to Freedom" },
      {
        property: "og:description",
        content: "Instruments for personal freedom. Navigate the turbulent waters of modern life.",
      },
      { property: "og:image", content: "/images/hero.jpg" },
    ],
  }),
});

const accent = "#6c5ce7";

function Logo() {
  return (
    <a href="#top" className="font-serif text-2xl tracking-wide">
      C<span style={{ color: accent }}>°</span>
    </a>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10 md:py-6">
        <Logo />
        <ul className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
          <li><a href="#products" className="transition hover:text-white">Products</a></li>
          <li><a href="#pricing" className="transition hover:text-white">Pricing</a></li>
          <li>
            <a
              href="#cta"
              className="border border-white/30 px-4 py-2 transition hover:border-white hover:text-white"
            >
              Get Access
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero.jpg)" }}
      />
      <div className="absolute inset-0 bg-[#0a0a0f]/70" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="h-px w-full bg-white/20" />
        <div className="py-16 md:py-20">
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.35em] text-white/70">
            Compass 360 Suite
          </p>
          <h1 className="font-serif text-5xl font-light leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            Navigate to Freedom
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-base font-light text-white/70 md:text-lg">
            The waters of modern life are turbulent. Compass gives you the instruments to chart your course.
          </p>
          <div className="mt-12">
            <a
              href="#cta"
              className="inline-block border px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] transition hover:bg-white hover:text-[#0a0a0f]"
              style={{ borderColor: accent, color: "#fff" }}
            >
              Get Early Access
            </a>
          </div>
        </div>
        <div className="h-px w-full bg-white/20" />
      </div>
    </section>
  );
}

function Problem() {
  const stats = [
    { value: "73%", label: "Feel financially lost" },
    { value: "61%", label: "Lack a daily system" },
    { value: "84%", label: "Have no legacy plan" },
  ];
  return (
    <section className="border-t border-white/10 px-6 py-32 md:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
          The Problem
        </p>
        <p className="font-serif text-3xl font-light leading-snug md:text-4xl">
          Financial complexity. Scattered habits. A life spread across a dozen apps that don't talk to each other.
          You're navigating without instruments.
        </p>
      </div>
      <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-px border border-white/10 bg-white/5 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.value} className="bg-[#0a0a0f] px-8 py-12 text-center">
            <div className="font-mono text-4xl font-light md:text-5xl" style={{ color: accent }}>
              {s.value}
            </div>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const products = [
  {
    icon: "◐",
    name: "Compass Finance",
    desc: "Complete personal finance intelligence",
    status: "LIVE",
    live: true,
  },
  {
    icon: "◇",
    name: "Compass Fit",
    desc: "Training, nutrition, and recovery tracking",
    status: "COMING SOON",
    live: false,
  },
  {
    icon: "△",
    name: "Compass Tasks",
    desc: "Daily intention and habit engine",
    status: "COMING SOON",
    live: false,
  },
  {
    icon: "▢",
    name: "Compass Portfolio",
    desc: "Your story, your work, your legacy",
    status: "COMING SOON",
    live: false,
  },
];

function Products() {
  return (
    <section id="products" className="border-t border-white/10 px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
            The Suite
          </p>
          <h2 className="font-serif text-4xl font-light md:text-6xl">Four instruments. One direction.</h2>
        </div>
        <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/5 md:grid-cols-2">
          {products.map((p) => (
            <div
              key={p.name}
              className="group relative bg-[#0a0a0f]/80 p-10 backdrop-blur-md md:p-14"
            >
              <div className="mb-10 text-3xl" style={{ color: accent }}>
                {p.icon}
              </div>
              <h3 className="font-serif text-3xl font-light md:text-4xl">{p.name}</h3>
              <p className="mt-3 max-w-sm text-white/60">{p.desc}</p>
              <div className="mt-10 flex items-center">
                <span
                  className="border px-3 py-1 font-mono text-[10px] tracking-[0.25em]"
                  style={
                    p.live
                      ? { borderColor: accent, color: accent }
                      : { borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.5)" }
                  }
                >
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const tiers = [
  {
    name: "Compass Finance",
    price: "$0",
    tagline: "Free forever",
    features: ["Full finance intelligence", "Unlimited accounts", "Forever access"],
    highlight: false,
  },
  {
    name: "Compass 360 Suite",
    price: "$0",
    tagline: "All four apps when complete",
    features: ["Finance, Fit, Tasks, Portfolio", "Unified dashboard", "Cross-app intelligence"],
    highlight: true,
  },
  {
    name: "Compass Pro",
    price: "$0",
    tagline: "Priority features + early access",
    features: ["Early feature drops", "Priority support", "Founding member status"],
    highlight: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="border-t border-white/10 px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
            Pricing
          </p>
          <h2 className="font-serif text-4xl font-light md:text-6xl">Choose your altitude.</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className="relative flex flex-col border bg-white/[0.02] p-10 backdrop-blur-sm"
              style={{
                borderColor: t.highlight ? accent : "rgba(255,255,255,0.12)",
              }}
            >
              {t.highlight && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a0a0f] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: accent, border: `1px solid ${accent}` }}
                >
                  Recommended
                </span>
              )}
              <h3 className="font-serif text-2xl font-light">{t.name}</h3>
              <div className="mt-6 font-serif text-6xl font-light">{t.price}</div>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                {t.tagline}
              </p>
              <ul className="mt-10 space-y-3 border-t border-white/10 pt-8 text-sm text-white/70">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span style={{ color: accent }}>—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className="mt-10 block border py-3 text-center font-mono text-[11px] uppercase tracking-[0.25em] transition"
                style={
                  t.highlight
                    ? { background: accent, borderColor: accent, color: "#fff" }
                    : { borderColor: "rgba(255,255,255,0.3)", color: "#fff" }
                }
              >
                Get Access
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section id="cta" className="border-t border-white/10 px-6 py-32 md:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-5xl font-light leading-tight md:text-7xl">
          Your destination is waiting.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-white/60">
          Join the founding crew. Be first when each instrument comes online.
        </p>
        <form
          className="mx-auto mt-12 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="flex-1 border border-white/20 bg-transparent px-4 py-3 font-mono text-sm placeholder:text-white/30 focus:border-white focus:outline-none"
          />
          <button
            type="submit"
            className="border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] transition hover:bg-white hover:text-[#0a0a0f]"
            style={{ borderColor: accent, background: accent }}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="flex items-center gap-8">
          <Logo />
          <span className="font-mono text-[11px] tracking-wider text-white/40">
            © 2026 Compass 360
          </span>
        </div>
        <div className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
        <div className="font-mono text-[11px] tracking-[0.2em] text-white/40">
          48°N 77°W
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <Nav />
      <Hero />
      <Problem />
      <Products />
      <Pricing />
      <CtaBanner />
      <Footer />
    </main>
  );
}
