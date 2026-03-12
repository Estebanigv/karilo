import abastecimientoImg from "@/assets/abastecimiento.png";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={abastecimientoImg}
          alt="Contenedores de carga"
          className="w-full h-full object-cover"
        />
        {/* Azul-Karilo overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#03051a]/85 via-[#03051a]/50 to-[#03051a]/20" />
      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#0796fc]/8 blur-[120px]" />

      <div className="relative z-10 container px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#0796fc]/15 text-[#a5cff0] border border-[#0796fc]/25 font-display backdrop-blur-sm mb-6 block w-fit">
            Abastecimiento
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight mb-6 break-words">
            Asegura el abastecimiento que tu operación{" "}
            <span className="text-[#0796fc]">necesita</span>
          </h2>
          <p className="font-body text-white/65 text-base md:text-lg mb-10 leading-relaxed max-w-xl">
            Desde requerimientos específicos hasta estrategias de suministro de largo plazo, nuestra experiencia, red global y solidez operativa nos permiten garantizar un suministro confiable.
          </p>
          <a
            href="#contacto"
            className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-accent text-accent-foreground font-display text-sm font-semibold rounded-lg hover:bg-accent/85 transition-all duration-300 hover:shadow-[0_8px_30px_hsl(205_97%_51%/0.4)]"
          >
            Iniciar conversación
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
