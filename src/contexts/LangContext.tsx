import React, { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "es" | "en";

const translations = {
  es: {
    nav: {
      vision: "Visión", methodology: "Metodología", impact: "Impacto",
      manifesto: "Manifiesto", team: "Equipo", contact: "Contacto", cta: "Hablemos",
    },
    hero: {
      h1: "Transformamos ideas audaces en empresas de impacto global.",
      sub: "Creamos software a medida y negocios escalables donde la visión estratégica se encuentra con el capital y el talento.",
      cta: "Inicia el viaje", scroll: "Descubre",
    },
    vision: {
      label: "La Propuesta de Valor",
      headline: "Diseñamos negocios que combinan visión estratégica, talento emprendedor y capital.",
    },
    methodology: {
      label: "Proceso de Construcción", title: "Metodología Vektor",
      stages: "etapas", scroll: "desplázate →", swipe: "desliza →",
      introPara: "Un proceso sistemático diseñado para reducir riesgo y maximizar el impacto de cada negocio que construimos.",
      introItems: ["Descubrimiento → Escala", "12–24 meses promedio"],
      duration: "Duración", milestone: "Hito",
      steps: [
        { phase: "Descubrimiento", title: "Ideación y tesis", desc: "Mapeamos el mercado con datos concretos. Identificamos la fricción, cuantificamos la oportunidad y construimos la tesis de inversión con rigor analítico.", tags: ["Investigación de mercado", "TAM/SAM/SOM", "Inteligencia competitiva"], duration: "4–6 semanas", kpi: "Oportunidad validada" },
        { phase: "Arquitectura", title: "Diseño y modelo", desc: "Co-creamos el modelo de negocio y la arquitectura tecnológica. Definimos fuentes de ingreso, tabla de capitalización y estrategia de salida al mercado desde el día cero.", tags: ["Modelo de negocio", "Stack tecnológico", "Capitalización", "Salida al mercado"], duration: "3–4 semanas", kpi: "Plan maestro listo" },
        { phase: "Construcción", title: "Desarrollo de élite", desc: "Nuestro equipo de ingeniería de primer nivel construye el producto mínimo viable con velocidad de startup y calidad empresarial. Iteración continua guiada por métricas reales.", tags: ["Sprint ágil", "PMV", "Control de calidad", "DevOps"], duration: "8–12 semanas", kpi: "Producto con usuarios" },
        { phase: "Lanzamiento", title: "Salida al mercado", desc: "Activamos nuestra red regional para escalar rápido. Conectamos con adoptantes tempranos clave, aceleramos la conversión y establecemos el manual de crecimiento.", tags: ["Hacking de crecimiento", "Ventas", "Alianzas", "Relaciones públicas"], duration: "Continuo", kpi: "Primeros $100K en ingresos recurrentes" },
        { phase: "Escala", title: "Capital y escala", desc: "Inyectamos capital estratégico, talento senior y acceso a redes globales. Preparamos la compañía para dominar el mercado regional y expandirse internacionalmente.", tags: ["Serie A", "Contratación", "Fusiones y adquisiciones", "Internacional"], duration: "12–24 meses", kpi: "Liderazgo de mercado" },
      ],
    },
    impact: {
      label: "Por qué Vektor",
      metrics: [
        { label: "Años de experiencia combinada", sub: "En desarrollo, diseño y arquitectura de software" },
        { label: "Proyectos en producción", sub: "Entregados para clientes reales en múltiples industrias" },
        { label: "Tecnologías en producción", sub: "Frameworks, backends, IA y automatización" },
        { label: "Co-fundadores 100% comprometidos", sub: "No advisors, no outsourcing — somos el equipo" },
      ],
      quote: "Venezuela nos enseñó a construir bajo presión y sin excusas —",
      quoteAccent: "esa es nuestra ventaja.",
      thesis: "Nuestra visión", sectors: "Sectores que construimos",
      sectorList: [
        { name: "Fintech & Pagos", pct: 80 }, { name: "B2B SaaS", pct: 75 },
        { name: "HealthTech & Bienestar", pct: 55 }, { name: "EdTech & Formación", pct: 50 },
      ],
      presence: "Stack tecnológico",
    },
    team: {
      label: "Los fundadores",
      title: "Dos builders. Una sola obsesión.",
      sub: "Somos dos ingenieros venezolanos con más de una década de experiencia combinada construyendo productos reales para clientes reales. Sin intermediarios — nosotros diseñamos, desarrollamos y lanzamos.",
      members: [
        {
          avatar:{
            initials: "CH",
            gradient: "from-violet-500/30 to-pink-500/30",
            ring: "rgba(139,92,246,0.4)",
          },
          name: "Carlos Hernández",
          role: "Co-Founder & Engineering Lead",
          bio: "Ingeniero en Informática con 7+ años especializándose en arquitecturas backend, microservicios y desarrollo asistido por IA. Ha construido pasarelas de pago, sistemas BI y plataformas enterprise. Especialista en SDD con y agentes autónomos.",
          location: "Caracas, Venezuela",
          tags: ["Node.js", "Ruby on Rails", "PostgreSQL", "AI-Augmented Dev", "Microservicios", "Full Stack"],
        },
        {
          avatar:{
            initials: "AV",
            gradient: "from-cyan-400/30 to-violet-500/30",
            ring: "rgba(0,212,255,0.4)",
          },
          name: "Alessandro Varuzza",
          role: "Co-Founder & Tech Lead",
          bio: "Full Stack developer con 7+ años de experiencia en Ruby on Rails, React y Next.js. Diseñador gráfico, fotógrafo y atleta de BJJ. Ha construido plataformas para empresas como PwC y productos como Sumly.ai.",
          location: "Caracas, Venezuela",
          tags: ["Ruby on Rails", "React", "Next.js", "Supabase", "Diseño UI"],
        },
     
      ],
    },
    manifesto: {
      label: "Nuestro Manifiesto",
      headline: "No esperamos al futuro. Lo programamos.",
      p1: "Creemos que la próxima generación de compañías que definirán la región no nacerán por accidente. Serán el resultado de diseño intencional, arquitectura superior y ejecución impecable.",
      p2: "Construimos con la urgencia de una startup y el rigor de una institución. Donde otros ven fricción institucional, nosotros vemos la materia prima para la disrupción.",
    },
    contact: {
      label: "Conversemos",
      h1: "¿Listo para", h2: "construir algo", h3: "extraordinario?",
      sub: "Buscamos emprendedores excepcionales, talento técnico de élite y partners estratégicos que piensen en décadas, no en trimestres.",
      whatsappLabel: "Escríbenos directamente",
      nameLabel: "Nombre completo", namePlaceholder: "Tu nombre",
      emailLabel: "Email", emailPlaceholder: "tu@empresa.com",
      companyLabel: "Empresa / Proyecto", companyPlaceholder: "Nombre de tu empresa o idea",
      messageLabel: "¿Qué quieres construir?", messagePlaceholder: "Cuéntanos tu visión, el problema que resuelves, en qué etapa estás...",
      submit: "Iniciar conversación →", sending: "Enviando...",
      successTitle: "Mensaje enviado",
      successDesc: "Gracias por contactarnos. Nos pondremos en contacto contigo en las próximas 24 horas.",
      successAction: "Enviar otro mensaje →",
      error: "Error al enviar. Escríbenos directamente a info@vektorstudio.tech",
    },
    footer: { rights: "Todos los derechos reservados." },
  },
  en: {
    nav: {
      vision: "Vision", methodology: "Methodology", impact: "Impact",
      manifesto: "Manifesto", team: "Team", contact: "Contact", cta: "Let's talk",
    },
    hero: {
      h1: "We transform bold ideas into global-impact companies.",
      sub: "We build custom software and scalable businesses where strategic vision meets capital and talent.",
      cta: "Begin the journey", scroll: "Discover",
    },
    vision: {
      label: "The Value Proposition",
      headline: "We design businesses that combine strategic vision, entrepreneurial talent and capital.",
    },
    methodology: {
      label: "Build Process", title: "Vektor Methodology",
      stages: "stages", scroll: "scroll →", swipe: "swipe →",
      introPara: "A systematic process designed to reduce risk and maximize the impact of every venture we build.",
      introItems: ["Discovery → Scale", "12–24 month avg."],
      duration: "Duration", milestone: "Milestone",
      steps: [
        { phase: "Discovery", title: "Ideation & Thesis", desc: "We map the market with hard data. We identify friction, quantify the opportunity and build the investment thesis with analytical rigor.", tags: ["Market Research", "TAM/SAM/SOM", "Competitive Intel"], duration: "4–6 weeks", kpi: "Validated opportunity" },
        { phase: "Architecture", title: "Design & Model", desc: "We co-create the business model and technological architecture. We define revenue streams, cap table structure and go-to-market from day zero.", tags: ["Business Model", "Tech Stack", "Cap Table", "GTM"], duration: "3–4 weeks", kpi: "Blueprint ready" },
        { phase: "Build", title: "Elite Engineering", desc: "Our world-class engineering team builds the MVP with startup speed and enterprise quality. Continuous iteration guided by real metrics.", tags: ["Agile Sprint", "MVP", "QA", "DevOps"], duration: "8–12 weeks", kpi: "Product with users" },
        { phase: "Launch", title: "Go-to-Market", desc: "We activate our regional network to scale fast. We connect with key early adopters, accelerate conversion and establish the growth playbook.", tags: ["Growth Hacking", "Sales", "Partnerships", "PR"], duration: "Ongoing", kpi: "First $100K ARR" },
        { phase: "Scale", title: "Capital & Scale", desc: "We inject strategic capital, senior talent and access to global networks. We prepare the company to dominate the regional market and expand internationally.", tags: ["Series A", "Hiring", "M&A", "International"], duration: "12–24 months", kpi: "Market leadership" },
      ],
    },
    impact: {
      label: "Why Vektor",
      metrics: [
        { label: "Years of combined experience", sub: "In software development, design & architecture" },
        { label: "Projects shipped to production", sub: "Delivered for real clients across multiple industries" },
        { label: "Technologies in production", sub: "Frameworks, backends, AI & automation" },
        { label: "Fully committed co-founders", sub: "No advisors, no outsourcing — we are the team" },
      ],
      quote: "Venezuela taught us to build under pressure and without excuses —",
      quoteAccent: "that is our edge.",
      quoteAuthor: "Alessandro Varuzza", quoteRole: "Co-Founder · Vektor",
      thesis: "Our vision", sectors: "Sectors we build in",
      sectorList: [
        { name: "Fintech & Payments", pct: 80 }, { name: "B2B SaaS", pct: 75 },
        { name: "HealthTech & Wellness", pct: 55 }, { name: "EdTech & Training", pct: 50 },
      ],
      presence: "Tech stack",
    },
    team: {
      label: "The founders",
      title: "Two builders. One obsession.",
      sub: "Two Venezuelan engineers with over a decade of combined experience building real products for real clients. No middlemen — we design, develop and launch.",
      members: [
        {
          avatar: {
            initials: "CH",
            gradient: "from-violet-500/30 to-pink-500/30",
            ring: "rgba(139,92,246,0.4)",
          },
          name: "Carlos Hernández",
          role: "Co-Founder & Engineering Lead",
          bio: "Computer Engineer with 7+ years specializing in backend architectures, microservices and AI-augmented development. Has built payment gateways, BI systems and enterprise platforms. Specialist in SDD using Cursor and autonomous agents.",
          location: "Caracas, Venezuela",
          tags: ["Node.js", "Ruby on Rails", "PostgreSQL", "AI-Augmented Dev", "Microservices", "Full Stack"],
        },
        {
          avatar: {
            initials: "AV",
            gradient: "from-cyan-400/30 to-violet-500/30",
            ring: "rgba(0,212,255,0.4)",
          },
          name: "Alessandro Varuzza",
          role: "Co-Founder & Tech Lead",
          bio: "Full Stack developer with 7+ years in Ruby on Rails, React and Next.js. Graphic designer, photographer and BJJ athlete. Has built platforms for companies like PwC and products like Sumly.ai. Believes design and engineering are the same discipline.",
          location: "Caracas, Venezuela",
          tags: ["Ruby on Rails", "React", "Next.js", "Supabase", "UI Design"],
        },
      ],
    },
    manifesto: {
      label: "Our Manifesto",
      headline: "We don't wait for the future. We program it.",
      p1: "We believe the next generation of companies that will define the region won't be born by accident. They will be the result of intentional design, superior architecture and impeccable execution.",
      p2: "We build with startup urgency and institutional rigor. Where others see institutional friction, we see the raw material for disruption.",
    },
    contact: {
      label: "Let's talk",
      h1: "Ready to", h2: "build something", h3: "extraordinary?",
      sub: "We look for exceptional entrepreneurs, elite technical talent and strategic partners who think in decades, not quarters.",
      whatsappLabel: "Message us directly",
      nameLabel: "Full name", namePlaceholder: "Your name",
      emailLabel: "Email", emailPlaceholder: "you@company.com",
      companyLabel: "Company / Project", companyPlaceholder: "Your company or idea name",
      messageLabel: "What do you want to build?", messagePlaceholder: "Tell us your vision, the problem you solve, what stage you're at...",
      submit: "Start the conversation →", sending: "Sending...",
      successTitle: "Message sent",
      successDesc: "Thank you for reaching out. We'll get back to you within 24 hours.",
      successAction: "Send another message →",
      error: "Failed to send. Write us directly at info@vektorstudio.tech",
    },
    footer: { rights: "All rights reserved." },
  },
} as const;

export type Translations = (typeof translations)[Lang];

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue>({
  lang: "es",
  setLang: () => {},
  t: translations.es,
});

export const LangProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("es");
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
