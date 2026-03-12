import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Sobre Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#03051a]/30 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-end h-20 gap-2">
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 font-display text-[13px] font-semibold tracking-wider uppercase transition-colors duration-300 rounded-lg text-white/85 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Separador */}
        <div className="hidden md:block w-px h-5 bg-white/20 mx-3" />

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/karilo"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
          aria-label="LinkedIn Kariló"
        >
          <LinkedInIcon size={17} />
        </a>

        {/* CTA */}
        <a
          href="#contacto"
          className="hidden md:inline-flex ml-2 px-6 py-2.5 bg-accent text-white font-display text-[13px] font-semibold tracking-wider uppercase rounded-lg hover:bg-accent/85 transition-all duration-300 hover:shadow-[0_4px_16px_hsl(205_97%_51%/0.4)]"
        >
          Contáctanos
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-white transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden bg-[#03051a]/80 backdrop-blur-xl mx-4 mb-4 rounded-xl px-6 py-5 space-y-1 border border-white/10 animate-scale-reveal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block font-display text-sm font-semibold uppercase tracking-wider text-white/70 hover:text-white transition-colors py-3 border-b border-white/10 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center justify-between pt-3 gap-3">
            <a
              href="https://www.linkedin.com/company/karilo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 hover:text-white font-display text-sm font-semibold transition-colors"
            >
              <LinkedInIcon size={16} /> LinkedIn
            </a>
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="flex-1 text-center px-5 py-3 bg-accent text-white font-display text-sm font-semibold uppercase tracking-wider rounded-lg transition-all duration-300"
            >
              Contáctanos
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
