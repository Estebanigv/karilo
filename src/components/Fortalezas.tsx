import { useEffect, useRef, useState } from "react";
import { FlaskConical, Fish, ShieldCheck, Handshake } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const icons = [FlaskConical, Fish, ShieldCheck, Handshake];
const numbers = ["01", "02", "03", "04"];

const cardColors = [
  {
    accent: "#050bfa",
    gradient: "from-[#050bfa] to-[#0678fb]",
    iconBg: "bg-[#050bfa]/10",
    iconColor: "text-[#050bfa]",
  },
  {
    accent: "#0678fb",
    gradient: "from-[#0678fb] to-[#0796fc]",
    iconBg: "bg-[#0678fb]/10",
    iconColor: "text-[#0678fb]",
  },
  {
    accent: "#0796fc",
    gradient: "from-[#0796fc] to-[#a5cff0]",
    iconBg: "bg-[#0796fc]/10",
    iconColor: "text-[#0796fc]",
  },
  {
    accent: "#a5cff0",
    gradient: "from-[#a5cff0] to-[#0796fc]",
    iconBg: "bg-[#a5cff0]/20",
    iconColor: "text-[#0796fc]",
  },
];

const Fortalezas = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="fortalezas" className="py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container px-6" ref={ref}>

        {/* Header */}
        <div className={`max-w-xl mb-12 md:mb-16 ${visible ? "animate-fade-in-left" : "opacity-0"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#0796fc]" />
            <span className="font-display text-xs font-bold tracking-widest uppercase text-[#0796fc]">
              {t.fortalezas.label}
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[#414142] leading-tight">
            {t.fortalezas.title}
          </h2>
        </div>

        {/* Grid 4 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.fortalezas.items.map((item, i) => {
            const Icon = icons[i];
            const color = cardColors[i];
            return (
              <div
                key={item.title}
                className={`group relative bg-white border-2 border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#0796fc]/30 ${
                  visible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.1 + i * 0.12}s` }}
              >
                {/* Accent top bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${color.gradient}`} />

                <div className="p-6 pt-5">
                  {/* Number + Icon row */}
                  <div className="flex items-start justify-between mb-5">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl ${color.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-6 h-6 ${color.iconColor}`} />
                    </div>
                    {/* Number */}
                    <span className="font-display font-black text-6xl text-gray-100 leading-none select-none">
                      {numbers[i]}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="font-display font-bold text-[#414142] text-lg mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Fortalezas;
