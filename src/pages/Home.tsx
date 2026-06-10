import React from "react";
import { LangProvider, useLang } from "@/contexts/LangContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { TextSplitReveal } from "@/components/TextSplitReveal";
import { TractionBoard } from "@/components/TractionBoard";
import { Team } from "@/components/Team";
import { Manifesto } from "@/components/Manifesto";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { VektorMark } from "@/components/VektorMark";

function PageContent() {
  const { t } = useLang();
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary-foreground relative overflow-hidden">
      <Navbar />
      <WhatsAppButton />

      <Hero />

      {/* Value Proposition */}
      <section id="vision" className="py-32 px-6 md:px-20 relative bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-primary font-mono text-sm tracking-widest mb-8 uppercase flex items-center gap-4">
            <span className="w-12 h-px bg-primary" />
            {t.vision.label}
          </div>
          <TextSplitReveal
            text={t.vision.headline}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-tight"
            style={{ fontFamily: "var(--app-font-serif)" }}
          />
        </div>
      </section>

      <HorizontalScroll />
      <TractionBoard />
      <Team />
      <Manifesto />
      <ContactForm />

      {/* Footer */}
      <footer className="py-12 px-6 md:px-20 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2.5 text-white">
            <VektorMark />
            VEKTOR
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="https://wa.me/584167057045" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Vektor Builder. {t.footer.rights}
          </p>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <PageContent />
    </LangProvider>
  );
}
