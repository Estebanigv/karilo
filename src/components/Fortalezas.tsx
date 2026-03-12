import { useEffect, useRef, useState } from "react";
import { FlaskConical, Fish, ShieldCheck, Handshake } from "lucide-react";

const strengths = [
  {
    icon: FlaskConical,
    title: "Especialización técnica",
    description:
      "Abastecimiento de aceites, proteínas e ingredientes nutricionales, tanto puros como formulados, para industrias de alta exigencia técnica.",
    number: "01",
  },
  {
    icon: Fish,
    title: "Valor que impulsa el desempeño",
    description:
      "Productos orientados al desempeño productivo, la eficiencia y la calidad en nutrición animal y aplicaciones energéticas.",
    number: "02",
  },
  {
    icon: ShieldCheck,
    title: "Cumplimiento y transparencia",
    description:
      "Operaciones sustentadas en cumplimiento normativo, trazabilidad y condiciones comerciales transparentes, que resguardan la seguridad y continuidad del negocio.",
    number: "03",
  },
  {
    icon: Handshake,
    title: "Relaciones que perduran",
    description:
      "Creemos en la construcción de alianzas de largo plazo con clientes y proveedores, basadas en la confianza, la consistencia operacional y la generación de valor sostenible.",
    number: "04",
  },
];

const Fortalezas = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container px-6" ref={ref}>

        {/* Header */}
        <div className={`max-w-xl mb-12 md:mb-16 ${visible ? "animate-fade-in-left" : "opacity-0"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#0796fc]" />
            <span className="font-display text-xs font-bold tracking-widest uppercase text-[#0796fc]">
              Nuestras Fortalezas
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[#414142] leading-tight">
            Los pilares que nos hacen diferentes
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {strengths.map((item, i) => (
            <div
              key={item.title}
              className={`group relative p-7 md:p-10 bg-white hover:bg-[#f8fbff] transition-colors duration-300 ${
                i === 0 || i === 1 ? "border-b border-gray-100" : ""
              } ${i % 2 === 0 ? "md:border-r border-gray-100" : ""} ${
                visible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              {/* Línea azul izquierda al hover */}
              <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-[#0796fc] rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

              <div className="flex items-start gap-6">
                {/* Número + ícono */}
                <div className="shrink-0 flex flex-col items-center gap-3">
                  <span className="font-display text-4xl font-black text-gray-100 leading-none group-hover:text-[#0796fc]/20 transition-colors duration-300">
                    {item.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#050bfa]/6 flex items-center justify-center group-hover:bg-[#050bfa]/10 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-[#050bfa]" />
                  </div>
                </div>

                {/* Texto */}
                <div className="pt-1">
                  <h3 className="font-display text-base font-bold text-[#414142] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Fortalezas;
