import { useEffect, useRef, useState } from "react";
import casaMatrizImg from "@/assets/casa-matriz.png";
import { MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const officeColors = ["#050bfa", "#0796fc", "#0796fc"];

const SudamericaMap = () => {
  const markers = [
    { cx: 130, cy: 380, color: "#050bfa", label: "Chile" },
    { cx: 145, cy: 285, color: "#0796fc", label: "Perú" },
    { cx: 240, cy: 300, color: "#0796fc", label: "Brasil" },
  ];

  return (
    <svg
      viewBox="0 0 400 500"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Continent shape */}
      <path
        d="M 195,20 L 230,15 L 265,25 L 290,45 L 310,70 L 320,100 L 315,130 L 330,155 L 340,185 L 335,215 L 350,240 L 355,270 L 345,300 L 330,325 L 310,345 L 285,360 L 260,375 L 240,395 L 220,415 L 200,430 L 185,445 L 170,435 L 155,420 L 140,400 L 125,385 L 110,365 L 100,340 L 95,310 L 90,280 L 100,255 L 105,225 L 95,195 L 85,165 L 80,135 L 90,105 L 100,80 L 115,58 L 135,40 L 160,28 L 180,22 Z"
        fill="#e2e8f0"
        stroke="white"
        strokeWidth="1.5"
      />

      {/* Markers */}
      {markers.map((m) => (
        <g key={m.label}>
          {/* Pulse ring */}
          <circle
            cx={m.cx}
            cy={m.cy}
            r="12"
            fill={m.color}
            opacity="0.2"
            className="animate-ping"
            style={{ animationDuration: "2s" }}
          />
          {/* Solid circle */}
          <circle cx={m.cx} cy={m.cy} r="7" fill={m.color} />
          {/* Inner white dot */}
          <circle cx={m.cx} cy={m.cy} r="3" fill="white" />
        </g>
      ))}
    </svg>
  );
};

const SobreNosotros = () => {
  const { t } = useLanguage();
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
    <section id="nosotros" className="py-16 md:py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container px-6" ref={ref}>
        {/* About — Asymmetric layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 md:mb-28">
          {/* Image — takes more space */}
          <div
            className={`lg:col-span-7 ${visible ? "animate-fade-in-left" : "opacity-0"}`}
          >
            <div className="relative">
              <img
                src={casaMatrizImg}
                alt="Casa Matriz Kariló, Concepción, Chile"
                className="w-full h-64 md:h-80 lg:h-[28rem] object-cover rounded-2xl"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-5 right-4 md:right-8 glass-card rounded-xl px-5 py-4 animate-float">
                <p className="font-display text-2xl font-bold text-accent">2017</p>
                <p className="font-body text-xs text-muted-foreground">{t.nosotros.founded}</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div
            className={`lg:col-span-5 ${visible ? "animate-fade-in-right" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}
          >
            <span className="section-label mb-5 block w-fit">{t.nosotros.label}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              {t.nosotros.title1} <span className="text-accent">{t.nosotros.titleAccent}</span> {t.nosotros.title2}
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              {t.nosotros.p1}
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              {t.nosotros.p2}
            </p>
          </div>
        </div>

        {/* How we generate value */}
        <div
          className={`max-w-6xl mx-auto mb-28 ${visible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="elevated-card p-7 md:p-10 lg:p-14 text-center relative overflow-hidden">
            {/* Subtle bg accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <span className="section-label mb-5 inline-block">{t.nosotros.valorLabel}</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
                {t.nosotros.valorTitle}
              </h3>
              <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
                {t.nosotros.valorDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Presencia Internacional — Two-column layout */}
        <div
          className={`max-w-6xl mx-auto ${visible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.3s" }}
        >
          <div className="bg-[#f4f7fb] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Left column — text + stats + offices */}
              <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
                {/* Label */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-[#0796fc]" />
                  <span className="font-display text-xs font-bold tracking-widest uppercase text-[#0796fc]">
                    {t.nosotros.mapLabel}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[#414142] mb-4 leading-tight">
                  {t.nosotros.mapTitle}
                </h3>

                {/* Description */}
                <p className="font-body text-gray-500 leading-relaxed mb-8">
                  {t.nosotros.mapDesc}
                </p>

                {/* Office cards */}
                <div className="space-y-3 mb-8">
                  {t.nosotros.offices.map((office, i) => (
                    <div
                      key={office.city}
                      className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${officeColors[i]}1a` }}
                      >
                        <MapPin
                          className="w-4 h-4"
                          style={{ color: officeColors[i] }}
                        />
                      </div>
                      <div>
                        <p className="font-display text-xs font-bold text-[#414142]">{office.city}</p>
                        <p className="font-body text-[11px] text-gray-400">{office.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stat destacada */}
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-5xl font-black text-[#050bfa] leading-none">
                    {t.nosotros.stat}
                  </span>
                  <span className="font-body text-sm text-gray-500">
                    {t.nosotros.statDesc}
                  </span>
                </div>
              </div>

              {/* Right column — SVG Map */}
              <div className="relative flex items-center justify-center p-8 lg:p-12 min-h-[360px] lg:min-h-0">
                <div className="w-full max-w-xs lg:max-w-sm">
                  <SudamericaMap />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreNosotros;
