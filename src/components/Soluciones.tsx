import { useEffect, useRef, useState } from "react";
import { ArrowRightLeft, Truck, Landmark, Microscope, X, ArrowRight } from "lucide-react";
import tradingImg from "@/assets/trading.png";
import logisticaImg from "@/assets/logistica.png";
import fortalezasImg from "@/assets/fortalezas.png";
import valorImg from "@/assets/valor-desempeno.png";

const solutions = [
  {
    icon: ArrowRightLeft,
    title: "Trading de aceites, proteínas e ingredientes",
    tagline: "Comercialización internacional especializada.",
    description:
      "Comercialización internacional de aceites, grasas, harinas e ingredientes especializados para nutrición animal, acuicultura, petfood, producción porcina y biodiésel. Conectamos la oferta global con la demanda regional de forma eficiente y confiable.",
    image: tradingImg,
  },
  {
    icon: Truck,
    title: "Gestión logística y bodegaje",
    tagline: "Coordinación operativa a medida.",
    description:
      "Coordinación de bodegaje, transporte y distribución logística, adaptada a las necesidades operativas de cada partner y mercado. Garantizamos continuidad y trazabilidad en cada etapa de la cadena de suministro.",
    image: logisticaImg,
  },
  {
    icon: Landmark,
    title: "Soluciones financieras para partners",
    tagline: "Alternativas de corto y mediano plazo.",
    description:
      "Estructuración de alternativas financieras de corto y mediano plazo que facilitan la continuidad operativa, optimizan el flujo de negocio y fortalecen relaciones comerciales sostenibles con nuestros clientes.",
    image: fortalezasImg,
  },
  {
    icon: Microscope,
    title: "Representación y desarrollo de productos",
    tagline: "Innovación conectada al mercado latinoamericano.",
    description:
      "Impulsamos la introducción y expansión de ingredientes nutricionales especializados de origen internacional, conectando innovación con oportunidades reales de mercado en Latinoamérica.",
    image: valorImg,
  },
];

// transform-origin por posición en la grilla 2×2
const origins = ["top left", "top right", "bottom left", "bottom right"];

type Solution = typeof solutions[0] & { index: number };

const Soluciones = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Solution | null>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const open = (sol: typeof solutions[0], index: number) => {
    setClosing(false);
    setSelected({ ...sol, index });
  };

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setSelected(null);
      setClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section id="soluciones" className="relative py-16 md:py-24 lg:py-32 bg-[#f4f7fb] overflow-hidden">
      <div className="container px-6" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#0796fc]" />
            <span className="font-display text-xs font-bold tracking-widest uppercase text-[#0796fc]">
              Soluciones Integrales
            </span>
            <div className="w-8 h-px bg-[#0796fc]" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[#414142] leading-tight mb-4">
            Diseñadas para tu <span className="text-[#0796fc]">crecimiento</span>
          </h2>
          <p className="text-gray-500 font-body text-base leading-relaxed">
            Soluciones que aseguran continuidad operativa y potencian el desarrollo de nuestros clientes.
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {solutions.map((sol, i) => (
            <button
              key={sol.title}
              onClick={() => open(sol, i)}
              className={`group relative overflow-hidden rounded-2xl text-left cursor-pointer focus:outline-none ${
                visible ? "animate-fade-in-up" : "opacity-0"
              } ${selected && !closing ? "opacity-30 pointer-events-none" : "opacity-100"} transition-opacity duration-300`}
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={sol.image}
                  alt={sol.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03051a]/90 via-[#03051a]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="w-8 h-8 rounded-lg bg-[#0796fc]/25 backdrop-blur-sm flex items-center justify-center mb-3">
                    <sol.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-1 leading-snug">
                    {sol.title}
                  </h3>
                  <p className="font-body text-xs text-white/60">{sol.tagline}</p>
                </div>
                {/* Hint hover */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Panel expandido — cubre toda la sección desde el origen de la card */}
      {selected && (
        <div
          className={`absolute inset-0 z-20 ${closing ? "animate-collapse-card" : "animate-expand-card"}`}
          style={{ transformOrigin: origins[selected.index] }}
        >
          {/* Imagen de fondo */}
          <img
            src={selected.image}
            alt={selected.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#03051a]/95 via-[#03051a]/80 to-[#050bfa]/30" />

          {/* Contenido centrado */}
          <div className="relative z-10 h-full flex items-center overflow-y-auto">
            <div className="container px-6 py-16 sm:py-0">
              <div className="max-w-2xl">
                {/* Ícono */}
                <div className="w-14 h-14 rounded-2xl bg-[#0796fc]/20 backdrop-blur-sm flex items-center justify-center mb-7">
                  <selected.icon className="w-7 h-7 text-[#0796fc]" />
                </div>

                {/* Pill */}
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#0796fc]/15 text-[#a5cff0] border border-[#0796fc]/25 font-display mb-5">
                  Solución
                </span>

                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-5 break-words">
                  {selected.title}
                </h3>
                <p className="font-body text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
                  {selected.description}
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4">
                  <a
                    href="#contacto"
                    onClick={close}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0796fc] text-white font-display text-sm font-semibold rounded-xl hover:bg-[#0796fc]/85 transition-all duration-300 hover:shadow-[0_8px_24px_hsl(205_97%_51%/0.4)]"
                  >
                    Iniciar conversación
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={close}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/25 text-white/80 hover:text-white font-display text-sm font-semibold rounded-xl hover:bg-white/8 transition-all duration-300"
                  >
                    Volver
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={close}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-30"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Soluciones;
