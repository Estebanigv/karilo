import heroBanner from "@/assets/hero-banner.png";
import logoKarilo from "@/assets/logo-karilo.svg";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background video con fallback a imagen */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroBanner}
          className="w-full h-full object-cover scale-105"
        >
          <source src="/Banner video suministro agricola.mp4" type="video/mp4" />
          <img src={heroBanner} alt="Puerto internacional" className="w-full h-full object-cover" />
        </video>
        {/* Azul-Karilo gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#03051a]/95 via-[#020b3a]/80 to-[#050bfa]/20" />
      </div>

      {/* Orbes de luz Karilo */}
      <div className="absolute top-1/4 right-[8%] w-80 h-80 rounded-full bg-[#0796fc]/8 blur-[100px]" />
      <div className="absolute bottom-1/3 left-[3%] w-64 h-64 rounded-full bg-[#050bfa]/10 blur-[100px]" />
      <div className="absolute top-[15%] left-[40%] w-48 h-48 rounded-full bg-[#0796fc]/6 blur-[80px]" />

      {/* Content — left aligned */}
      <div className="relative z-10 container px-6 py-36">
        <div className="max-w-2xl">
          {/* Logo Karilo grande — marca principal en hero */}
          <div className="animate-fade-in-up mb-8">
            <img
              src={logoKarilo}
              alt="Kariló"
              className="h-20 md:h-24 lg:h-28 w-auto brightness-0 invert"
            />
          </div>

          {/* Separador visual */}
          <div
            className="animate-fade-in-up mb-8"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="w-16 h-px bg-white/30" />
          </div>

          {/* Tag pill */}
          <div
            className="animate-fade-in-up mb-8"
            style={{ animationDelay: "0.18s" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#0796fc]/15 text-[#a5cff0] border border-[#0796fc]/25 font-display backdrop-blur-sm">
              Comercio Internacional
            </span>
          </div>

          {/* H1 */}
          <h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.28s" }}
          >
            Nutrición y Energía,{" "}
            <span className="text-[#0796fc]">transparente</span> y global.
          </h1>

          {/* Subtítulo */}
          <p
            className="font-body text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Comercializadora internacional especializada en aceites, grasas, proteínas e ingredientes nutricionales de alto valor, orientados a la nutrición animal, acuicultura, petfood, producción porcina y biodiésel.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.52s" }}
          >
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-display text-sm font-semibold rounded-lg hover:bg-accent/85 transition-all duration-300 hover:shadow-[0_8px_30px_hsl(205_97%_51%/0.4)]"
            >
              Contáctanos
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#soluciones"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 text-white font-display text-sm font-semibold rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Explorar soluciones
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
