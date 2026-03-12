import { useEffect, useRef, useState } from "react";
import { ArrowRightLeft, Truck, Landmark, Microscope, ArrowUpRight } from "lucide-react";
import tradingImg from "@/assets/trading.png";
import logisticaImg from "@/assets/logistica.png";
import fortalezasImg from "@/assets/fortalezas.png";
import valorImg from "@/assets/valor-desempeno.png";

const solutions = [
  {
    icon: ArrowRightLeft,
    title: "Trading de aceites, proteínas e ingredientes",
    description:
      "Comercialización internacional de aceites, grasas, harinas e ingredientes especializados para nutrición animal, acuicultura, petfood, producción porcina y biodiésel.",
    image: tradingImg,
  },
  {
    icon: Truck,
    title: "Gestión logística y bodegaje",
    description:
      "Coordinación de bodegaje, transporte y distribución logística, adaptada a las necesidades operativas de cada partner y mercado.",
    image: logisticaImg,
  },
  {
    icon: Landmark,
    title: "Soluciones financieras para partners",
    description:
      "Estructuración de alternativas financieras de corto y mediano plazo que facilitan la continuidad operativa y fortalecen relaciones comerciales sostenibles.",
    image: fortalezasImg,
  },
  {
    icon: Microscope,
    title: "Representación y desarrollo de productos especializados",
    description:
      "Impulsamos la introducción y expansión de ingredientes nutricionales especializados de origen internacional, conectando innovación con oportunidades en Latinoamérica.",
    image: valorImg,
  },
];

const Soluciones = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="soluciones" className="py-24 md:py-32 bg-secondary/50">
      <div className="container px-6" ref={ref}>
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 ${visible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <span className="section-label mb-4 inline-block">Soluciones Integrales</span>
          <h2 className="font-display text-3xl md:text-[2.75rem] font-bold text-foreground leading-tight mb-4">
            Diseñadas para tu <span className="text-accent">crecimiento</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg leading-relaxed">
            Soluciones diseñadas para asegurar continuidad operativa y potenciar el crecimiento de nuestros clientes.
          </p>
        </div>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {solutions.map((sol, i) => (
            <div
              key={sol.title}
              className={`group relative overflow-hidden rounded-2xl ${visible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              {/* Image */}
              <div className="relative h-72 md:h-80 overflow-hidden">
                <img
                  src={sol.image}
                  alt={sol.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Azul-Karilo gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03051a]/95 via-[#03051a]/50 to-transparent" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="w-9 h-9 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-3">
                        <sol.icon className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-white mb-2 leading-snug">
                        {sol.title}
                      </h3>
                      <p className="font-body text-sm text-white/65 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                        {sol.description}
                      </p>
                    </div>
                    <div className="shrink-0 w-8 h-8 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight className="w-4 h-4 text-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Soluciones;
