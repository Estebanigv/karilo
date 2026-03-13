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
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Base gradient — fades on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03051a]/85 via-[#03051a]/30 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

                {/* Base info — slides down + fades on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0796fc]/25 backdrop-blur-sm flex items-center justify-center mb-3">
                    <sol.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-1 leading-snug">
                    {sol.title}
                  </h3>
                  <p className="font-body text-xs text-white/60">{sol.tagline}</p>
                </div>

                {/* Hover reveal panel — slides up from below */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#03051a]/98 via-[#03051a]/95 to-[#050bfa]/35 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end p-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0796fc]/20 flex items-center justify-center mb-4">
                    <sol.icon className="w-5 h-5 text-[#0796fc]" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 leading-snug">
                    {sol.title}
                  </h3>
                  <p className="font-body text-sm text-white/65 leading-relaxed mb-5 line-clamp-3">
                    {sol.description}
                  </p>
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0796fc] text-white font-display text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-[#0796fc]/85 transition-all duration-200 w-fit"
                  >
                    {t.soluciones.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
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
