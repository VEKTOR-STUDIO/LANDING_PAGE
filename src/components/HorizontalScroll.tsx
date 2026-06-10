import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLang } from "@/contexts/LangContext";

gsap.registerPlugin(ScrollTrigger);

const ACCENTS = [
  { accent: "hsl(var(--primary))", border: "rgba(255,255,255,0.1)", IconEl: () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
      <path d="M20 12V8M20 32v-4M12 20H8M32 20h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-primary" />
      <circle cx="20" cy="20" r="2.5" fill="currentColor" className="text-primary" />
    </svg>
  )},
  { accent: "hsl(var(--secondary))", border: "rgba(255,255,255,0.1)", IconEl: () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <rect x="8" y="8" width="10" height="10" stroke="currentColor" strokeWidth="1.5" rx="1" className="text-secondary" />
      <rect x="22" y="8" width="10" height="10" stroke="currentColor" strokeWidth="1.5" rx="1" className="text-secondary" />
      <rect x="15" y="22" width="10" height="10" stroke="currentColor" strokeWidth="1.5" rx="1" className="text-secondary" />
      <path d="M13 18v4M27 18v4M20 18v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-secondary" />
    </svg>
  )},
  { accent: "hsl(var(--primary))", border: "rgba(255,255,255,0.1)", IconEl: () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <rect x="6" y="6" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="1.2" className="text-primary" />
      <path d="M6 14h28" stroke="currentColor" strokeWidth="1" opacity="0.4" className="text-primary" />
      <circle cx="10" cy="10" r="1" fill="currentColor" className="text-primary" />
      <circle cx="14" cy="10" r="1" fill="currentColor" opacity="0.5" className="text-primary" />
      <path d="M13 22l4 4 8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
    </svg>
  )},
  { accent: "hsl(var(--secondary))", border: "rgba(255,255,255,0.1)", IconEl: () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <path d="M8 32L20 8l12 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-secondary" />
      <path d="M12 24h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-secondary" />
      <circle cx="20" cy="8" r="2.5" fill="currentColor" className="text-secondary" />
    </svg>
  )},
  { accent: "hsl(var(--primary))", border: "rgba(255,255,255,0.1)", IconEl: () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <path d="M8 28l8-8 6 4 10-14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
      <path d="M30 10h4M32 8v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-primary" />
    </svg>
  )},
];

const NUMS = ["01", "02", "03", "04", "05"];

export const HorizontalScroll: React.FC = () => {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !wrapperRef.current) return;
      const totalScroll = wrapperRef.current.scrollWidth - window.innerWidth;

      ScrollTrigger.create({
        trigger: sectionRef.current, pin: true, scrub: 1.2,
        start: "top top", end: `+=${totalScroll + 100}`,
        onUpdate: (self) => {
          if (progressRef.current) progressRef.current.style.width = `${self.progress * 100}%`;
        },
      });

      gsap.to(wrapperRef.current, {
        x: -totalScroll, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, scrub: 1.2, start: "top top", end: `+=${totalScroll + 100}` },
      });

      gsap.fromTo(".step-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const steps = t.methodology.steps;

  return (
    <section ref={sectionRef} id="methodology" className="h-screen bg-background overflow-hidden relative flex flex-col">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 pt-24 pb-5 px-10 md:px-20 flex items-end justify-between border-b border-border">
        <div>
          <div className="text-primary font-mono text-xs tracking-widest mb-3 uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-primary" />
            {t.methodology.label}
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white" style={{ fontFamily: "var(--app-font-serif)" }}>{t.methodology.title}</h2>
        </div>
        <div className="hidden md:flex items-center gap-2 text-white/25 text-xs font-mono">
          <span>{steps.length} {t.methodology.stages}</span>
          <span className="text-white/10">·</span>
          <span>{t.methodology.scroll}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-px bg-white/[0.05] mx-10 md:mx-20">
        <div ref={progressRef} className="h-full bg-primary transition-none" style={{ width: "0%", boxShadow: "0 0 8px rgba(var(--primary), 0.2)" }} />
        <div className="absolute inset-y-0 w-full flex items-center justify-between pointer-events-none">
          {steps.map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full border border-white/15 bg-background" />)}
        </div>
      </div>

      {/* Scrolling cards */}
      <div className="flex-1 flex items-center overflow-hidden">
        <div ref={wrapperRef} className="flex gap-6 px-10 md:px-20 min-w-max items-stretch py-8">

          {/* Intro panel */}
          <div className="w-[220px] flex flex-col justify-center gap-5 pr-8 border-r border-white/[0.06] flex-shrink-0">
            <p className="text-white/35 text-sm font-light leading-relaxed">{t.methodology.introPara}</p>
            <div className="space-y-2">
              {t.methodology.introItems.map((item, i) => (
                <div key={item} className="flex items-center gap-2 text-xs text-white/20 font-mono">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-primary opacity-50" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {steps.map((step, index) => {
            const { accent, border, IconEl } = ACCENTS[index];
            return (
              <div
                key={index}
                className="step-card relative w-[340px] md:w-[400px] flex-shrink-0 rounded-2xl overflow-hidden group cursor-default"
                style={{ background: "linear-gradient(140deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 100%)", border: `1px solid ${border}`, backdropFilter: "blur(12px)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, color-mix(in srgb, ${accent} 80%, transparent), transparent 60%)` }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle at 25% 25%, color-mix(in srgb, ${accent} 12%, transparent) 0%, transparent 65%)` }} />

                <div className="p-7 flex flex-col h-full gap-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: accent }}>{step.phase}</div>
                      <div className="text-[64px] font-bold leading-none tracking-tighter select-none" style={{ color: `color-mix(in srgb, ${accent} 15%, transparent)` }}>{NUMS[index]}</div>
                    </div>
                    <div className="mt-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300 text-foreground"><IconEl /></div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight">{step.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed font-light">{step.desc}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {step.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border"
                        style={{ color: accent, borderColor: `color-mix(in srgb, ${accent} 28%, transparent)`, background: `color-mix(in srgb, ${accent} 8%, transparent)` }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: border }}>
                    <div>
                      <div className="text-[9px] text-white/20 font-mono uppercase tracking-widest mb-0.5">{t.methodology.duration}</div>
                      <div className="text-xs text-white/55 font-medium">{step.duration}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-white/20 font-mono uppercase tracking-widest mb-0.5">{t.methodology.milestone}</div>
                      <div className="text-xs font-semibold" style={{ color: accent }}>{step.kpi}</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
              </div>
            );
          })}

          <div className="w-16 flex-shrink-0" />
        </div>
      </div>
    </section>
  );
};
