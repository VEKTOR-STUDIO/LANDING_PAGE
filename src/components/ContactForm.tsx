import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLang } from "@/contexts/LangContext";

gsap.registerPlugin(ScrollTrigger);

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSeK_cf1ci6sVpjTGvAg2c7CdhXFHQ5m1Nwc-VUyU-IIUEM-NA/formResponse";

const FIELDS = {
  name: "entry.432552675",
  email: "entry.1474831867",
  company: "entry.1254834744",
  message: "entry.1662541253",
};

export const ContactForm: React.FC = () => {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-field",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 70%" } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const body = new FormData();
      body.append(FIELDS.name, form.name);
      body.append(FIELDS.email, form.email);
      body.append(FIELDS.company, form.company);
      body.append(FIELDS.message, form.message);
      await fetch(GOOGLE_FORM_ACTION, { method: "POST", mode: "no-cors", body });
      setStatus("sent");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/25 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all duration-300 text-base font-light backdrop-blur-sm";

  const c = t.contact;

  return (
    <section id="contacto" ref={containerRef} className="py-32 px-6 md:px-20 bg-background relative overflow-hidden border-t border-border">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-primary/5 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-start">
        {/* Left — copy */}
        <div>
          <div className="contact-field text-primary font-mono text-sm tracking-widest mb-8 uppercase flex items-center gap-4">
            <span className="w-12 h-px bg-primary" />
            {c.label}
          </div>
          <h2 className="contact-field text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-[1.1] mb-6">
            {c.h1}<br />
            <span className="text-primary">{c.h2}</span>
            <br />{c.h3}
          </h2>
          <p className="contact-field text-lg text-white/50 font-light leading-relaxed mb-12 max-w-sm">{c.sub}</p>

          <div className="contact-field space-y-5">
            <a href="https://wa.me/584167057045?text=Hola%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20Vektor"
              target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-0.5">WhatsApp</div>
                <div className="text-white/70 group-hover:text-white transition-colors duration-300 text-sm">{c.whatsappLabel}</div>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-0.5">Email</div>
                <div className="text-white/70 text-sm">info@vektorstudio.tech</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.07] pointer-events-none" />

          {status === "sent" ? (
            <div className="p-10 flex flex-col items-center justify-center min-h-[480px] text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{c.successTitle}</h3>
              <p className="text-white/50 font-light leading-relaxed max-w-xs">{c.successDesc}</p>
              <button onClick={() => setStatus("idle")} className="mt-8 text-sm text-primary hover:text-primary/80 transition-colors font-mono">
                {c.successAction}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-5">
              <div className="contact-field">
                <label className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-2">{c.nameLabel}</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder={c.namePlaceholder} className={inputClass} />
              </div>
              <div className="contact-field">
                <label className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-2">{c.emailLabel}</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder={c.emailPlaceholder} className={inputClass} />
              </div>
              <div className="contact-field">
                <label className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-2">{c.companyLabel}</label>
                <input type="text" name="company" value={form.company} onChange={handleChange} placeholder={c.companyPlaceholder} className={inputClass} />
              </div>
              <div className="contact-field">
                <label className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-2">{c.messageLabel}</label>
                <textarea name="message" required value={form.message} onChange={handleChange} placeholder={c.messagePlaceholder} rows={4} className={`${inputClass} resize-none`} />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm font-mono">{c.error}</p>
              )}

              <div className="contact-field pt-2">
                <button type="submit" disabled={status === "sending"}
                  className="w-full bg-primary text-primary-foreground font-semibold py-4 px-8 rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-base tracking-wide"
                  data-testid="button-submit-contact">
                  {status === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {c.sending}
                    </span>
                  ) : c.submit}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
