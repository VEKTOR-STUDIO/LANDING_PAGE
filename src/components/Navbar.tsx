import React, { useEffect, useState } from "react";
import { useLang, Lang } from "@/contexts/LangContext";
import { VektorMark } from "@/components/VektorMark";

export const Navbar: React.FC = () => {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: t.nav.vision, href: "#vision" },
    { label: t.nav.methodology, href: "#methodology" },
    { label: t.nav.impact, href: "#impact" },
    { label: t.nav.team, href: "#team" },
    { label: t.nav.manifesto, href: "#manifesto" },
    { label: t.nav.contact, href: "#contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = ["vision", "methodology", "impact", "team", "manifesto", "contacto"];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-[#050811]/80 border-b border-white/[0.06] py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5 group" data-testid="link-logo">
            <VektorMark />
            <span className="text-xl font-bold tracking-tighter text-white">VEKTOR</span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {links.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  data-testid={`link-nav-${id}`}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isActive ? "text-white bg-white/[0.08]" : "text-white/45 hover:text-white hover:bg-white/[0.05]"}`}
                >
                  {link.label}
                  {isActive && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />}
                </button>
              );
            })}
          </div>

          {/* Right side: lang toggle + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center gap-0 rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-xs font-mono">
              {(["es", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  data-testid={`button-lang-${l}`}
                  className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-200 ${lang === l ? "bg-white/15 text-white" : "text-white/30 hover:text-white/60"}`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollTo("#contacto")}
              className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-primary/40 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300"
              data-testid="button-nav-cta"
            >
              {t.nav.cta}
              <span className="text-primary">→</span>
            </button>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <div className="flex items-center gap-0 rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-[10px] font-mono">
              {(["es", "en"] as Lang[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1 rounded-full uppercase tracking-wider transition-all duration-200 ${lang === l ? "bg-white/15 text-white" : "text-white/30"}`}>
                  {l}
                </button>
              ))}
            </div>
            <button className="text-white p-1" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-nav-mobile">
              <div className="flex flex-col gap-1.5 w-6">
                <span className={`h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5 w-full" : "w-full"}`} />
                <span className={`h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-4"}`} />
                <span className={`h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5 w-full" : "w-full"}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-x-0 top-[57px] z-40 md:hidden transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="mx-4 rounded-2xl bg-[#0a0f1a]/95 backdrop-blur-xl border border-white/10 overflow-hidden">
          {links.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`w-full text-left px-6 py-4 text-white/70 hover:text-white hover:bg-white/[0.05] transition-all duration-200 text-base font-medium flex items-center justify-between ${i < links.length - 1 ? "border-b border-white/[0.05]" : ""}`}
            >
              {link.label}
              <span className="text-primary text-xs">→</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
