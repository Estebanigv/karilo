import logoKarilo from "@/assets/logo-karilo.svg";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.inicio, href: "#inicio" },
    { label: t.nav.soluciones, href: "#soluciones" },
    { label: t.nav.nosotros, href: "#nosotros" },
    { label: t.nav.contacto, href: "#contacto" },
  ];

  const solutionLabels = [
    t.soluciones.items[0].title,
    t.soluciones.items[1].title,
    t.soluciones.items[2].title,
    t.soluciones.items[3].title,
  ];

  return (
    <footer className="bg-[#03051a] text-white">
      {/* Top gradient separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#0796fc]/40 to-transparent" />

      {/* Main footer body */}
      <div className="container px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1 sm:col-span-2 lg:col-span-1">
            <img
              src={logoKarilo}
              alt="Kariló"
              className="h-16 md:h-20 w-auto brightness-0 invert opacity-90 mb-6 mx-auto sm:mx-0"
            />
            <p className="font-body text-sm text-white/50 leading-relaxed mb-6 text-center sm:text-left">
              {t.footer.desc}
            </p>
            {/* Small CTA */}
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 text-[#0796fc] font-display text-sm font-semibold hover:gap-3 transition-all duration-300 mx-auto sm:mx-0 flex"
            >
              {t.nav.cta} <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-white/40 mb-5">
              {t.footer.nav}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Solutions */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-white/40 mb-5">
              {t.footer.solutions}
            </h4>
            <ul className="space-y-3">
              {solutionLabels.map((s) => (
                <li key={s}>
                  <span className="font-body text-sm text-white/60">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact & Offices */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-white/40 mb-5">
              {t.footer.contact}
            </h4>
            <ul className="space-y-4 mb-7">
              <li>
                <a
                  href="mailto:contacto@karilo.cl"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0796fc]/15 flex items-center justify-center shrink-0 group-hover:bg-[#0796fc]/25 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-[#0796fc]" />
                  </div>
                  <span className="font-body text-sm text-white/60 group-hover:text-white transition-colors">
                    contacto@karilo.cl
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+56912345678" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-[#0796fc]/15 flex items-center justify-center shrink-0 group-hover:bg-[#0796fc]/25 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-[#0796fc]" />
                  </div>
                  <span className="font-body text-sm text-white/60 group-hover:text-white transition-colors">
                    +56 9 1234 5678
                  </span>
                </a>
              </li>
            </ul>

            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-white/40 mb-4">
              {t.footer.offices}
            </h4>
            <ul className="space-y-3">
              {t.nosotros.offices.map((o) => (
                <li key={o.city} className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0796fc] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-body text-sm text-white/70 block leading-tight">{o.city}</span>
                    <span className="font-body text-xs text-white/35">{o.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container px-6 py-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-between sm:gap-4">
          <p className="font-body text-xs text-white/30 text-center sm:text-left">
            © {new Date().getFullYear()} Kariló Investment Group SpA. {t.footer.rights}
          </p>
          <p className="font-body text-xs text-white/20 text-center sm:text-right">
            Chile · Perú · Brasil
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
