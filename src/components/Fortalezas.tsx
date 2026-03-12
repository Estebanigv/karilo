import { useEffect, useRef, useState } from "react";
import { FlaskConical, Fish, ShieldCheck, Handshake } from "lucide-react";

const strengths = [
  {
    icon: FlaskConical,
    title: "Especialización técnica",
    description:
      "Abastecimiento de aceites, proteínas e ingredientes nutricionales, tanto puros como formulados, para industrias de alta exigencia técnica.",
    number: "01",
    color: "#050bfa",
  },
  {
    icon: Fish,
    title: "Valor que impulsa el desempeño",
    description:
      "Productos orientados al desempeño productivo, la eficiencia y la calidad en nutrición animal y aplicaciones energéticas.",
    number: "02",
    color: "#0678fb",
  },
  {
    icon: ShieldCheck,
    title: "Cumplimiento y transparencia",
    description:
      "Operaciones sustentadas en cumplimiento normativo, trazabilidad y condiciones comerciales transparentes, que resguardan la seguridad y continuidad del negocio.",
    number: "03",
    color: "#0796fc",
  },
  {
    icon: Handshake,
    title: "Relaciones que perduran",
    description:
      "Creemos en la construcción de alianzas de largo plazo con clientes y proveedores, basadas en la confianza, la consistencia operacional y la generación de valor sostenible.",
    number: "04",
    color: "#a5cff0",
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
    <section className="relative py-28 md:py-36 bg-[#03051a] overflow-hidden">
      {/* Orbes de fondo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#050bfa]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-[#0796fc]/6 blur-[100px] pointer-events-none" />

      <div className="container px-6 relative z-10" ref={ref}>
        {/* Header */}
        <div className={`max-w-2xl mx-auto text-center mb-20 ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#0796fc]/15 text-[#a5cff0] border border-[#0796fc]/25 font-display mb-6">
            Nuestras Fortalezas
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
            Los pilares que nos hacen{" "}
            <span className="text-[#0796fc]">diferentes</span>
          </h2>
          <p className="font-body text-white/55 text-lg leading-relaxed">
            Combinamos especialización técnica, solidez operativa y compromiso con la transparencia.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {strengths.map((item, i) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-8 hover:border-white/15 hover:bg-white/7 transition-all duration-500 ${visible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.13}s` }}
            >
              {/* Glow corner */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-20 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: item.color }}
              />

              {/* Número grande de fondo */}
              <span
                className="absolute bottom-4 right-5 font-display text-8xl font-black leading-none select-none opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                style={{ color: item.color }}
              >
                {item.number}
              </span>

              {/* Línea superior de color */}
              <div
                className="w-10 h-1 rounded-full mb-7 transition-all duration-300 group-hover:w-16"
                style={{ backgroundColor: item.color }}
              />

              {/* Ícono */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>

              {/* Texto */}
              <h3 className="font-display text-base font-bold text-white mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="font-body text-white/50 text-sm leading-relaxed group-hover:text-white/65 transition-colors duration-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fortalezas;
