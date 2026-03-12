import logoKarilo from "@/assets/logo-karilo.svg";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Footer = () => {
  const navLinks = [
    { label: "Inicio", href: "#inicio" },
    { label: "Soluciones", href: "#soluciones" },
    { label: "Sobre nosotros", href: "#nosotros" },
    { label: "Contacto", href: "#contacto" },
  ];

  const solutions = [
    "Trading de aceites y proteínas",
    "Gestión logística y bodegaje",
    "Soluciones financieras",
    "Representación de productos",
  ];

  const offices = [
    { city: "Concepción, Chile", label: "Casa Matriz" },
    { city: "Lima, Perú", label: "Be&Ka Trading" },
    { city: "São Paulo, Brasil", label: "Kariló Brasil" },
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
              className="h-12 w-auto brightness-0 invert opacity-90 mb-6 mx-auto sm:mx-0"
            />
            <p className="font-body text-sm text-white/50 leading-relaxed mb-6 text-center sm:text-left">
              Comercializadora internacional especializada en aceites, grasas, proteínas e ingredientes nutricionales de alto valor.
            </p>
            {/* CTA pequeño */}
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 text-[#0796fc] font-display text-sm font-semibold hover:gap-3 transition-all duration-300 mx-auto sm:mx-0 flex"
            >
              Contáctanos <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Col 2 — Navegación */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-white/40 mb-5">
              Navegación
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
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

          {/* Col 3 — Soluciones */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-white/40 mb-5">
              Soluciones
            </h4>
            <ul className="space-y-3">
              {solutions.map((s) => (
                <li key={s}>
                  <span className="font-body text-sm text-white/60">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contacto y Oficinas */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-white/40 mb-5">
              Contacto
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
              Oficinas
            </h4>
            <ul className="space-y-3">
              {offices.map((o) => (
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
            © {new Date().getFullYear()} Kariló Investment Group SpA. Todos los derechos reservados.
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
