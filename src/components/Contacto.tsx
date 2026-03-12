import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Contacto = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    cargo: "",
    pais: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Gracias por contactarnos. Nos comunicaremos contigo pronto.");
    setForm({ nombre: "", empresa: "", cargo: "", pais: "", correo: "", mensaje: "" });
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all duration-300";

  return (
    <section id="contacto" className="py-16 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-6">
        <div className="text-center mb-14">
          <span className="section-label mb-4 inline-block">{t.contacto.label}</span>
          <h2 className="font-display text-3xl md:text-[2.75rem] font-bold text-foreground leading-tight">
            {t.contacto.title}
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form — wider */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 elevated-card p-6 md:p-8 lg:p-10 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder={t.contacto.nombre}
                required
                className={inputClass}
              />
              <input
                name="empresa"
                value={form.empresa}
                onChange={handleChange}
                placeholder={t.contacto.empresa}
                required
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                name="cargo"
                value={form.cargo}
                onChange={handleChange}
                placeholder={t.contacto.cargo}
                className={inputClass}
              />
              <input
                name="pais"
                value={form.pais}
                onChange={handleChange}
                placeholder={t.contacto.pais}
                className={inputClass}
              />
            </div>
            <input
              name="correo"
              type="email"
              value={form.correo}
              onChange={handleChange}
              placeholder={t.contacto.correo}
              required
              className={inputClass}
            />
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              placeholder={t.contacto.mensaje}
              rows={4}
              required
              className={inputClass + " resize-none"}
            />
            <button
              type="submit"
              className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent text-accent-foreground font-display font-semibold rounded-xl hover:bg-accent/85 transition-all duration-300 hover:shadow-[0_8px_30px_hsl(205_97%_51%/0.3)]"
            >
              {t.contacto.send}
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* Info */}
          <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
            <div className="elevated-card p-6 space-y-5">
              <h3 className="font-display text-base font-bold text-foreground">
                {t.contacto.infoTitle}
              </h3>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground mb-0.5">
                    {t.contacto.emailLabel}
                  </p>
                  <a
                    href="mailto:contacto@karilo.cl"
                    className="font-body text-sm text-foreground font-medium hover:text-accent transition-colors"
                  >
                    contacto@karilo.cl
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground mb-0.5">
                    {t.contacto.phoneLabel}
                  </p>
                  <p className="font-body text-sm text-foreground font-medium">
                    +56 9 1234 5678
                  </p>
                </div>
              </div>
            </div>

            <div className="elevated-card p-6 space-y-4">
              <h3 className="font-display text-base font-bold text-foreground">
                {t.contacto.officesTitle}
              </h3>
              {t.nosotros.offices.map((office) => (
                <div key={office.city} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground mb-0.5">
                      {office.label}
                    </p>
                    <p className="font-body text-sm text-foreground font-medium">
                      {office.city}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
