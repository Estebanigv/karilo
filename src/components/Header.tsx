import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logoKarilo from "@/assets/logo-karilo-full.svg";
import { useLanguage } from "../context/LanguageContext";
import type { Lang } from "../i18n";

const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Header = () => {
  const { t, lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [darkBg, setDarkBg] = useState(true);
  const [navVisible, setNavVisible] = useState(true);
  const [isContacto, setIsContacto] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navLinks = [
    { label: t.nav.inicio, href: "#inicio" },
    { label: t.nav.soluciones, href: "#soluciones" },
    { label: t.nav.nosotros, href: "#nosotros" },
    { label: t.nav.contacto, href: "#contacto" },
  ];

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const DARK_IDS = new Set(["inicio", "contacto"]);

    const onScroll = () => {
      const heroHeight = window.innerHeight;
      setScrolled(window.scrollY > 60);
      setPastHero(window.scrollY > heroHeight * 0.75);

      // Detect current section
      const elements = document.elementsFromPoint(window.innerWidth / 2, 60);
      const section = elements.find(el => el.matches("section[id], footer"));
      let contacto = false;
      if (section) {
        const id = section.id || "";
        setDarkBg(DARK_IDS.has(id) || section.tagName === "FOOTER");
        contacto = id === "contacto" || section.tagName === "FOOTER";
        setIsContacto(contacto);
      } else {
        setDarkBg(true);
        setIsContacto(false);
      }

      // Auto-hide navbar — but NOT in the contacto/footer section and NOT when overlay is open
      if (!contacto) {
        setNavVisible(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setNavVisible(false), 2500);
      } else {
        // In contacto: always keep navbar visible
        if (hideTimer.current) clearTimeout(hideTimer.current);
        setNavVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  // When overlay opens, always keep navbar visible
  useEffect(() => {
    if (open) {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setNavVisible(true);
    }
  }, [open]);

  // Whether the header bar itself should be hidden
  const headerHidden = pastHero && !navVisible && !open;

  return (
    <>
      {/* ── Header bar ───────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#03051a]/30 backdrop-blur-md" : "bg-transparent"
        } ${headerHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <div className="container relative flex items-center justify-end h-16 md:h-20 gap-2 px-4 sm:px-6 overflow-visible">

          {/* Logo — absolute left, visible after hero and outside contacto */}
          <a
            href="#inicio"
            className={`absolute left-4 sm:left-6 shrink-0 transition-all duration-500 ${
              pastHero && !isContacto
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <img
              src={logoKarilo}
              alt="Kariló"
              className="h-11 md:h-12 w-auto"
              style={{
                filter: darkBg ? "brightness(0) invert(1)" : "none",
                transition: "filter 0.4s ease",
              }}
            />
          </a>

          {/* Desktop nav — hidden in contacto */}
          {!isContacto && (
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 lg:px-4 py-2 font-display text-[12px] lg:text-[13px] font-semibold tracking-wider uppercase transition-colors duration-300 rounded-lg text-white/85 hover:text-white whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {!isContacto && <div className="hidden md:block w-px h-5 bg-white/20 mx-2 lg:mx-3" />}

          {!isContacto && (
            <a
              href="https://www.linkedin.com/company/inv-karil%C3%B3-ltda/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              aria-label="LinkedIn Kariló"
            >
              <LinkedInIcon size={17} />
            </a>
          )}

          {!isContacto && (
            <div className="hidden md:flex items-center gap-1 ml-1">
              {(["es", "en", "pt"] as const).map((l: Lang) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 font-display text-[11px] font-bold uppercase rounded transition-colors ${
                    lang === l ? "text-white bg-white/15" : "text-white/50 hover:text-white"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {!isContacto && (
            <a
              href="#contacto"
              className="hidden md:inline-flex ml-2 px-4 lg:px-6 py-2.5 bg-accent text-white font-display text-[12px] lg:text-[13px] font-semibold tracking-wider uppercase rounded-lg hover:bg-accent/85 transition-all duration-300 hover:shadow-[0_4px_16px_hsl(205_97%_51%/0.4)] whitespace-nowrap"
            >
              {t.nav.cta}
            </a>
          )}

          {/* Hamburger — shown in contacto (desktop) and always on mobile */}
          <button
            onClick={() => setOpen(true)}
            className={`p-2.5 rounded-lg text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-300 ${
              isContacto ? "flex" : "md:hidden flex"
            }`}
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* ── Fullscreen overlay ── */}
      {open && (
        <div
          className="fixed inset-0 flex flex-col"
          style={{
            zIndex: 9999,
            background: "linear-gradient(135deg, #03051a 0%, #060c2e 60%, #04112b 100%)",
          }}
        >
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(7,150,252,0.06) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(5,11,250,0.05) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

          {/* Top bar */}
          <div className="flex items-center justify-between px-8 sm:px-14 pt-8 pb-6">
            <a href="#inicio" onClick={() => setOpen(false)} className="shrink-0">
              <img
                src={logoKarilo}
                alt="Kariló"
                className="h-12 md:h-14 w-auto"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.92 }}
              />
            </a>
            <button
              onClick={() => setOpen(false)}
              className="w-11 h-11 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/8 transition-all duration-200"
              aria-label="Cerrar menú"
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col justify-center px-8 sm:px-14 gap-1">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group/link flex items-center gap-6 py-4 relative"
              >
                {/* Accent line on hover */}
                <div className="w-0 group-hover/link:w-8 h-px bg-[#0796fc] transition-all duration-300 shrink-0" />
                <div className="flex items-baseline gap-4 flex-1">
                  <span className="font-display text-[10px] font-bold text-[#0796fc]/40 tracking-[0.3em] tabular-nums group-hover/link:text-[#0796fc]/70 transition-colors duration-300">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[8.5vw] sm:text-5xl md:text-[56px] font-extrabold uppercase tracking-tight text-white/40 group-hover/link:text-white transition-all duration-300 leading-none">
                    {link.label}
                  </span>
                </div>
              </a>
            ))}
          </nav>

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-8 sm:px-14 pb-10 pt-6 gap-4 flex-wrap">
            {/* Language */}
            <div className="flex items-center gap-1">
              {(["es", "en", "pt"] as const).map((l: Lang, i) => (
                <span key={l} className="flex items-center">
                  <button
                    onClick={() => setLang(l)}
                    className={`px-2 py-1 font-display text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 ${
                      lang === l ? "text-white" : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                  {i < 2 && <span className="text-white/15 text-xs">|</span>}
                </span>
              ))}
            </div>
            {/* Actions */}
            <div className="flex items-center gap-5">
              <a
                href="https://www.linkedin.com/company/inv-karil%C3%B3-ltda/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={18} />
              </a>
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="px-6 py-2.5 bg-[#0796fc] text-white font-display text-[11px] font-bold uppercase tracking-widest rounded-lg hover:bg-[#0796fc]/85 transition-all duration-300"
              >
                {t.nav.cta}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
