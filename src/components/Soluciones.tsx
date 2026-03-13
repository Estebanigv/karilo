import { useEffect, useRef, useState } from "react";
import { ArrowRightLeft, Truck, Landmark, Microscope, ArrowRight } from "lucide-react";
import tradingImg from "@/assets/trading.png";
import logisticaImg from "@/assets/logistica.png";
import financieraImg from "@/assets/financiera.png";
import valorImg from "@/assets/valor-desempeno.png";
import { useLanguage } from "../context/LanguageContext";

const icons = [ArrowRightLeft, Truck, Landmark, Microscope];
const images = [tradingImg, logisticaImg, financieraImg, valorImg];

const Soluciones = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const solutions = t.soluciones.items.map((item, i) => ({
    icon: icons[i],
    title: item.title,
    tagline: item.tagline,
    description: item.desc,
    image: images[i],
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="soluciones" className="relative py-16 md:py-24 lg:py-32 bg-[#f4f7fb] overflow-hidden">
      <div className="container px-6" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#0796fc]" />
            <span className="font-display text-xs font-bold tracking-widest uppercase text-[#0796fc]">
              {t.soluciones.label}
            </span>
            <div className="w-8 h-px bg-[#0796fc]" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[#414142] leading-tight mb-4">
            {t.soluciones.title1} <span className="text-[#0796fc]">{t.soluciones.titleAccent}</span>
          </h2>
          <p className="text-gray-500 font-body text-base leading-relaxed">
            {t.soluciones.subtitle}
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {solutions.map((sol, i) => (
            <div
              key={sol.title}
              className={`group relative overflow-hidden rounded-2xl ${
                visible ? "animate-fade-in-up" : "opacity-0"
              } transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] hover:-translate-y-1.5`}
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              <div className="relative h-64 md:h-72 overflow-hidden">
                {/* Background image */}
                <img
                  src={sol.image}
                  alt={sol.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay — se oscurece en hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03051a]/90 via-[#03051a]/50 to-[#03051a]/10 transition-all duration-500 group-hover:from-[#03051a]/97 group-hover:via-[#03051a]/85 group-hover:to-[#03051a]/60" />

                {/* Contenido siempre visible abajo */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
                  <div className="w-8 h-8 rounded-lg bg-[#0796fc]/30 backdrop-blur-sm flex items-center justify-center mb-3">
                    <sol.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-1 leading-snug">
                    {sol.title}
                  </h3>
                  <p className="font-body text-xs text-white/65">{sol.tagline}</p>

                  {/* Descripción — aparece en hover */}
                  <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500 ease-out">
                    <p className="font-body text-xs text-white/75 leading-relaxed mt-3 line-clamp-3">
                      {sol.description}
                    </p>
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
