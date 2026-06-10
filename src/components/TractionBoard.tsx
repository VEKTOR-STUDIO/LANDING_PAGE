import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLang } from "@/contexts/LangContext";

gsap.registerPlugin(ScrollTrigger);

const METRIC_VALUES = [
  { value: 11, prefix: "", suffix: "+" },
  { value: 20, prefix: "", suffix: "+" },
  { value: 12, prefix: "", suffix: "" },
  { value: 2,  prefix: "", suffix: "" },
];

const TICKER_ITEMS = [
  "Fintech", "HealthTech", "EdTech", "B2B SaaS", "PropTech", "AgriTech",
  "Logística", "ClimaTech", "LegalTech", "MarketPlaces", "DeepTech", "AIFirst",
  "Ciberseguridad", "E-commerce", "HRTech", "InsurTech",
];

const TICKER_CITIES = [
  "Next.js", "Ruby on Rails", "Node.js", "NestJS", "React", "TypeScript",
  "PostgreSQL", "Supabase", "n8n", "Docker", "OpenAI", "LangChain",
  "Vercel", "Stripe", "Prisma", "Redis", "Cursor", "GitHub Actions",
];

const TECH_STACK = [
    { tech: "Ruby on Rails"},
    { tech: "Next.js / React"},
  { tech: "Node.js / Express"},
  { tech: "NestJS"},
  { tech: "PostgreSQL"},
  { tech: "Supabase"},
  { tech: "MongoDB"},
  { tech: "Redis"},
  { tech: "n8n"},
  { tech: "OpenAI / LLMs"},
  { tech: "Docker"},
];

function useCounter(target: number, trigger: boolean, duration = 1.8) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [trigger, target, duration]);
  return count;
}

const Counter: React.FC<{ value: number; prefix?: string; suffix?: string; triggered: boolean }> = ({
  value, prefix = "", suffix = "", triggered,
}) => {
  const count = useCounter(value, triggered);
  return <span>{prefix}{count}{suffix}</span>;
};

const Marquee: React.FC<{ items: string[]; speed?: number; reverse?: boolean; separator?: string }> = ({
  items, speed = 35, reverse = false, separator = "·",
}) => {
  const track = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className="inline-flex gap-0" style={{ animation: `marquee${reverse ? "Rev" : ""} ${speed}s linear infinite` }}>
        {track.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-4">
            <span>{item}</span>
            <span className="text-white/15 text-xs">{separator}</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @keyframes marqueeRev { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
};

export const TractionBoard: React.FC = () => {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sectionRef.current, start: "top 60%", once: true, onEnter: () => setTriggered(true) });
      gsap.fromTo(".metric-row", { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true } });
      gsap.fromTo(lineRef.current, { scaleY: 0 },
        { scaleY: 1, duration: 1.4, ease: "power3.inOut", transformOrigin: "top center",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true } });
      gsap.fromTo(".right-content", { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const metrics = t.impact.metrics;

  return (
    <section id="impact" ref={sectionRef} className="relative bg-[#03050c] overflow-hidden border-t border-border">
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)", backgroundSize: "100% 3px" }} />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="border-b border-border py-3">
        <div className="text-[11px] font-mono text-white/20 uppercase tracking-[0.2em]">
          <Marquee items={TICKER_ITEMS} speed={30} separator="·" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-20 py-24">
        <div className="flex flex-col lg:flex-row gap-0">

          {/* Left — metrics */}
          <div className="flex-1 flex flex-col divide-y divide-border">
            <div className="pb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono text-white/30 uppercase tracking-[0.2em]">{t.impact.label}</span>
              </div>
            </div>

            {metrics.map((metric, i) => (
              <div key={i} className="metric-row flex items-end gap-6 py-8 group cursor-default" style={{ opacity: 0 }}>
                <div className="font-bold tracking-tighter leading-none text-white transition-all duration-300"
                  style={{ fontSize: "clamp(56px, 8vw, 96px)", fontVariantNumeric: "tabular-nums",
                    textShadow: "0 0 20px rgba(var(--primary), 0.15)",
                    color: "rgba(240,244,255,0.9)" }}>
                  <Counter value={METRIC_VALUES[i].value} prefix={METRIC_VALUES[i].prefix} suffix={METRIC_VALUES[i].suffix} triggered={triggered} />
                </div>
                <div className="pb-2 flex-1">
                  <div className="text-white font-semibold text-base mb-0.5 group-hover:text-primary transition-colors duration-300">{metric.label}</div>
                  <div className="text-white/30 text-xs font-light font-mono">{metric.sub}</div>
                </div>
                <div className="w-0 group-hover:w-8 h-px transition-all duration-500 mb-3 flex-shrink-0 bg-primary" />
              </div>
            ))}
          </div>

          {/* Center divider */}
          <div className="hidden lg:flex flex-col items-center px-16 py-8">
            <div ref={lineRef} className="w-px flex-1 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
              style={{ transform: "scaleY(0)" }} />
          </div>

          {/* Right — editorial */}
          <div className="right-content flex-1 flex flex-col justify-between py-8 lg:py-0" style={{ opacity: 0 }}>
            <div>
              <p className="text-white/15 text-xs font-mono uppercase tracking-widest mb-6">{t.impact.thesis}</p>
              <blockquote className="text-white font-bold leading-[1.15] tracking-tight mb-8" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
                "{t.impact.quote}<br />
                <span className="text-primary">
                  {t.impact.quoteAccent}
                </span>"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                </div>
              </div>
            </div>

            <div className="my-12 space-y-3">
              <p className="text-white/15 text-xs font-mono uppercase tracking-widest mb-4">{t.impact.sectors}</p>
              {t.impact.sectorList.map((sector) => (
                <div key={sector.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-white/55 text-sm font-light">{sector.name}</span>
                    <span className="text-white/25 text-xs font-mono">{sector.pct}%</span>
                  </div>
                  <div className="h-px bg-white/[0.06] relative overflow-hidden rounded">
                    <div className="absolute top-0 left-0 h-full rounded bg-primary"
                      style={{ width: triggered ? `${sector.pct}%` : "0%",
                        transition: "width 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
                        boxShadow: "0 0 8px rgba(var(--primary), 0.2)" }} />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-white/15 text-xs font-mono uppercase tracking-widest mb-4">{t.impact.presence}</p>
              <div className="grid grid-cols-2 gap-2">
                {TECH_STACK.map((c) => (
                  <div key={c.tech} className="flex items-center gap-2 py-2 px-3 rounded-lg border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-200">
                    <span className="text-base leading-none">{c.tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-3">
        <div className="text-[11px] font-mono text-primary/30 uppercase tracking-[0.15em]">
          <Marquee items={TICKER_CITIES} speed={22} reverse separator="○" />
        </div>
      </div>
    </section>
  );
};
