import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLang } from "@/contexts/LangContext";

gsap.registerPlugin(ScrollTrigger);


export const Team: React.FC = () => {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".team-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        }
      );
      gsap.fromTo(".team-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="team" ref={sectionRef} className="py-32 px-6 md:px-20 bg-background relative overflow-hidden border-t border-border">
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="team-header mb-16">
          <div className="text-primary font-mono text-xs tracking-[0.2em] uppercase flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-primary" />
            {t.team.label}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1] mb-6 max-w-3xl" style={{ fontFamily: "var(--app-font-serif)" }}>
            {t.team.title}
          </h2>
          <p className="text-white/40 font-light leading-relaxed max-w-2xl text-lg">
            {t.team.sub}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.team.members.map((member, i) => {
            const avatar = member.avatar;
            return (
              <div
                key={member.avatar.initials}
                className="team-card group relative rounded-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(140deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                  opacity: 0,
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 20% 20%, rgba(var(--primary), 0.05) 0%, transparent 65%)` }}
                />
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary to-transparent"
                />

                <div className="p-8 flex gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm`}
                    >
                      <span className="text-primary font-bold text-lg tracking-tight">{avatar.initials}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-white font-bold text-lg tracking-tight">{member.name}</h3>
                      <div className="flex items-center gap-1.5 text-white/25 text-xs font-mono ml-4 flex-shrink-0">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {member.location}
                      </div>
                    </div>
                    <div className="text-xs font-mono uppercase tracking-widest mb-3 text-primary/80">
                      {member.role}
                    </div>
                    <p className="text-white/40 text-sm font-light leading-relaxed mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {member.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
