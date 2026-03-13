import { useState } from "react";
import heroBanner from "@/assets/hero-banner.png";
import logoKarilo from "@/assets/logo-karilo.svg";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#03051a]">
        {/* Imagen de fondo — visible hasta que el video esté listo */}
        <img
          src={heroBanner}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-100"}`}
        />
        {/* Video — fade in cuando está listo */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
        >
          <source src="/Banner video suministro agricola.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#03051a]/95 via-[#020b3a]/80 to-[#050bfa]/20" />
      </div>

      {/* Orbes */}
      <div className="absolute top-1/4 right-[8%] w-80 h-80 rounded-full bg-[#0796fc]/8 blur-[100px]" />
      <div className="absolute bottom-1/3 left-[3%] w-64 h-64 rounded-full bg-[#050bfa]/10 blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 container px-6 pt-28 pb-16 md:py-36">
        <div className="max-w-2xl">
          <div className="animate-fade-in-up mb-8">
            <img src={logoKarilo} alt="Kariló" className="h-14 md:h-20 lg:h-28 w-auto brightness-0 invert" />
          </div>
          <div className="animate-fade-in-up mb-8" style={{ animationDelay: "0.1s" }}>
            <div className="w-16 h-px bg-white/30" />
          </div>
          <div className="animate-fade-in-up mb-8" style={{ animationDelay: "0.18s" }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#0796fc]/15 text-[#a5cff0] border border-[#0796fc]/25 font-display backdrop-blur-sm">
              {t.hero.tag}
            </span>
          </div>
          <h1
            className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] mb-8 animate-fade-in-up break-words"
            style={{ animationDelay: "0.28s" }}
          >
            <span className="whitespace-nowrap">{t.hero.title1}</span>{" "}
            <span className="text-[#0796fc]">{t.hero.titleAccent}</span> {t.hero.title2}
          </h1>
          <p
            className="font-body text-base md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.52s" }}>
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-accent text-white font-display text-sm font-semibold rounded-lg hover:bg-accent/85 transition-all duration-300 hover:shadow-[0_8px_30px_hsl(205_97%_51%/0.4)]"
            >
              {t.hero.cta1}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#soluciones"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 border border-white/25 text-white font-display text-sm font-semibold rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              {t.hero.cta2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
