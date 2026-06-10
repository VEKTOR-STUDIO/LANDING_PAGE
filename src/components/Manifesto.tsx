import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TextSplitReveal } from "./TextSplitReveal";
import { useLang } from "@/contexts/LangContext";

gsap.registerPlugin(ScrollTrigger);

export const Manifesto: React.FC = () => {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".manifesto-line",
        { width: "0%" },
        {
          width: "100%", duration: 1.5, ease: "power3.inOut",
          scrollTrigger: { trigger: containerRef.current, start: "top 60%" },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" ref={containerRef} className="py-32 px-6 md:px-20 bg-background relative">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <span className="text-primary font-mono text-sm tracking-widest uppercase block mb-4">
            {t.manifesto.label}
          </span>
          <div className="manifesto-line h-px bg-gradient-to-r from-primary to-transparent w-0" />
        </div>
        <TextSplitReveal
          text={t.manifesto.headline}
          className="text-5xl md:text-7xl lg:text-[90px] font-semibold tracking-tight text-white leading-[1.08] mb-16"
          style={{ fontFamily: "var(--app-font-serif)" }}
        />
        <div className="grid md:grid-cols-2 gap-12 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
          <p>{t.manifesto.p1}</p>
          <p>{t.manifesto.p2}</p>
        </div>
      </div>
    </section>
  );
};
