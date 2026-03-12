import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Contacto = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nombre: "", empresa: "", cargo: "", pais: "", correo: "", mensaje: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ nombre: "", empresa: "", cargo: "", pais: "", correo: "", mensaje: "" });
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-body text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#0796fc]/50 focus:border-[#0796fc]/50 transition-all duration-200";
  const labelClass =
    "font-display text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1.5 block";

  return (
    <section
      id="contacto"
      className="relative py-16 md:py-24 lg:py-32 bg-[#03051a] overflow-hidden"
    >
      {/* Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[480px] h-[480px] bg-[#0796fc]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#050bfa]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-6 relative z-10" ref={ref}>

        {/* ── Header ── */}
        <div
          className={`text-center mb-14 ${visible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#0796fc]/60" />
            <span className="font-display text-[11px] font-bold tracking-widest uppercase text-[#0796fc]">
              {t.contacto.label}
            </span>
            <div className="w-8 h-px bg-[#0796fc]/60" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            {t.contacto.title}
          </h2>
          <p className="font-body text-white/45 max-w-lg mx-auto text-base leading-relaxed">
            {t.contacto.subtitle}
          </p>
        </div>

        {/* ── Main grid ── */}
        <div
          className={`max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-5 ${visible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.12s" }}
        >
          {/* ─ Form card ─ */}
          <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden">

            {/* Card header strip */}
            <div className="px-8 py-5 border-b border-white/8 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#0796fc]" />
              <span className="font-display text-xs font-bold tracking-widest uppercase text-white/50">
                {sent ? t.contacto.successTitle : t.contacto.send}
              </span>
            </div>

            <div className="p-7 md:p-9">
              {sent ? (
                /* ── Success state ── */
                <div className="flex flex-col items-center justify-center text-center py-10 gap-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center ring-1 ring-emerald-500/25">
                    <CheckCircle className="w-7 h-7 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {t.contacto.successTitle}
                    </h3>
                    <p className="font-body text-white/55 text-sm max-w-xs">
                      {t.contacto.successMsg}
                    </p>
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-1 px-6 py-2.5 border border-white/15 text-white/60 font-display text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-white/8 hover:text-white transition-all duration-200"
                  >
                    {t.contacto.newMsg}
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>{t.contacto.nombre} <span className="text-[#0796fc]">*</span></label>
                      <input
                        name="nombre" value={form.nombre} onChange={handleChange}
                        required className={inputClass} placeholder="Carlos Mendoza"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{t.contacto.empresa} <span className="text-[#0796fc]">*</span></label>
                      <input
                        name="empresa" value={form.empresa} onChange={handleChange}
                        required className={inputClass} placeholder="Acuigranja S.A."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>{t.contacto.cargo}</label>
                      <input
                        name="cargo" value={form.cargo} onChange={handleChange}
                        className={inputClass} placeholder="Gerente de Compras"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{t.contacto.pais}</label>
                      <input
                        name="pais" value={form.pais} onChange={handleChange}
                        className={inputClass} placeholder="Chile"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>{t.contacto.correo} <span className="text-[#0796fc]">*</span></label>
                    <input
                      name="correo" type="email" value={form.correo} onChange={handleChange}
                      required className={inputClass} placeholder="carlos@empresa.cl"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>{t.contacto.mensaje}</label>
                    <textarea
                      name="mensaje" value={form.mensaje} onChange={handleChange}
                      rows={5} className={inputClass + " resize-none"}
                      placeholder="Cuéntanos sobre tu requerimiento…"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-[#0796fc] text-white font-display text-sm font-semibold rounded-xl hover:bg-[#0796fc]/85 transition-all duration-300 hover:shadow-[0_8px_30px_hsl(205_97%_51%/0.4)]"
                  >
                    {t.contacto.send}
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ─ Info sidebar ─ */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Contact details */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-white/8">
                <span className="font-display text-[10px] font-bold tracking-widest uppercase text-white/40">
                  {t.contacto.infoTitle}
                </span>
              </div>
              <div className="p-6 space-y-5">
                <a href="mailto:contacto@karilo.cl" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#0796fc]/12 flex items-center justify-center shrink-0 group-hover:bg-[#0796fc]/22 transition-colors">
                    <Mail className="w-4 h-4 text-[#0796fc]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-[10px] font-bold tracking-widest uppercase text-white/30 mb-0.5">
                      {t.contacto.emailLabel}
                    </p>
                    <p className="font-body text-sm text-white/70 group-hover:text-white transition-colors truncate">
                      contacto@karilo.cl
                    </p>
                  </div>
                </a>

                <a href="tel:+56912345678" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#0796fc]/12 flex items-center justify-center shrink-0 group-hover:bg-[#0796fc]/22 transition-colors">
                    <Phone className="w-4 h-4 text-[#0796fc]" />
                  </div>
                  <div>
                    <p className="font-display text-[10px] font-bold tracking-widest uppercase text-white/30 mb-0.5">
                      {t.contacto.phoneLabel}
                    </p>
                    <p className="font-body text-sm text-white/70 group-hover:text-white transition-colors">
                      +56 9 1234 5678
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/company/inv-karil%C3%B3-ltda/"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0796fc]/12 flex items-center justify-center shrink-0 group-hover:bg-[#0796fc]/22 transition-colors text-[#0796fc]">
                    <LinkedInIcon />
                  </div>
                  <div>
                    <p className="font-display text-[10px] font-bold tracking-widest uppercase text-white/30 mb-0.5">
                      LinkedIn
                    </p>
                    <p className="font-body text-sm text-white/70 group-hover:text-white transition-colors">
                      Kariló Investment Group
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Offices */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden flex-1">
              <div className="px-6 py-4 border-b border-white/8">
                <span className="font-display text-[10px] font-bold tracking-widest uppercase text-white/40">
                  {t.contacto.officesTitle}
                </span>
              </div>
              <div className="p-6 space-y-5">
                {t.nosotros.offices.map((office, i) => (
                  <div key={office.city} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: i === 0 ? "#050bfa22" : "#0796fc18" }}
                    >
                      <MapPin
                        className="w-4 h-4"
                        style={{ color: i === 0 ? "#a5cff0" : "#0796fc" }}
                      />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-white/85 leading-tight">
                        {office.city}
                      </p>
                      <p className="font-body text-xs text-white/35 mt-0.5">{office.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response time badge */}
            <div className="rounded-2xl border border-[#0796fc]/20 bg-[#0796fc]/6 px-6 py-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <p className="font-body text-xs text-white/55 leading-relaxed">
                Tiempo de respuesta <span className="text-white/80 font-semibold">&lt; 24 h hábiles</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
