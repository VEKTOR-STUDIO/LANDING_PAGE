import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const COMPANIES = [
  {
    name: "Aura",
    category: "Fintech",
    status: "Serie B",
    description: "Infraestructura financiera para el próximo billón de transacciones en LATAM.",
    metric: "$2.5B+",
    metricLabel: "Procesados"
  },
  {
    name: "Nova",
    category: "Logistics",
    status: "Serie A",
    description: "Orquestación de cadena de suministro basada en IA para la última milla.",
    metric: "15M+",
    metricLabel: "Entregas"
  },
  {
    name: "Kore",
    category: "Healthtech",
    status: "Seed",
    description: "Datos clínicos unificados para redes de salud descentralizadas.",
    metric: "400k",
    metricLabel: "Pacientes"
  }
];

export const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.portfolio-card');
      
      gsap.fromTo(cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Compañías Construidas</h2>
            <p className="text-muted-foreground max-w-lg">Un ecosistema de empresas diseñadas desde cero para resolver problemas estructurales en la región.</p>
          </div>
          <MagneticButton className="px-6 py-3 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors">
            Ver Portafolio Completo
          </MagneticButton>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {COMPANIES.map((company, i) => (
            <div 
              key={i} 
              className="portfolio-card group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col justify-between min-h-[400px] overflow-hidden hover:border-primary/40 transition-colors duration-500"
            >
              {/* Decorative background glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-[50px] rounded-full group-hover:bg-primary/30 transition-colors duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl font-bold border border-white/5">
                    {company.name[0]}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground">
                    {company.status}
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-2">{company.name}</h3>
                <p className="text-primary text-sm font-medium mb-4">{company.category}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  {company.description}
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/10 flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">{company.metric}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{company.metricLabel}</div>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all duration-300">
                  <span className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
