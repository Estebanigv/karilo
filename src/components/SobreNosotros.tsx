import { useEffect, useRef, useState } from "react";
import casaMatrizImg from "@/assets/casa-matriz.png";
import { MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const officeColors = ["#050bfa", "#0796fc", "#0796fc"];

// viewBox 960×480  →  x = (lon + 180) * 2.667 ,  y = (90 - lat) * 2.667
const WorldMap = () => {
  const offices = [
    { x: 286, y: 341, color: "#050bfa", pulse: "2s" },  // Concepción –73 –37
    { x: 275, y: 272, color: "#0796fc", pulse: "2.5s" }, // Lima       –77 –12
    { x: 356, y: 302, color: "#0796fc", pulse: "3s" },   // São Paulo  –47 –24
  ];

  const tradeDots = [
    { x: 283, y: 131 }, // USA / NY
    { x: 227, y: 91  }, // Canada
    { x: 216, y: 189 }, // México
    { x: 283, y: 229 }, // Colombia
    { x: 309, y: 331 }, // Argentina
    { x: 472, y: 101 }, // Reino Unido
    { x: 485, y: 115 }, // Francia
    { x: 507, y: 104 }, // Alemania
    { x: 512, y: 125 }, // Italia
    { x: 469, y: 133 }, // España
    { x: 568, y: 136 }, // Turquía
    { x: 462, y: 155 }, // Marruecos
    { x: 563, y: 160 }, // Egipto
    { x: 603, y: 176 }, // Arabia Saudí
    { x: 627, y: 173 }, // EAU
    { x: 691, y: 181 }, // India
    { x: 789, y: 144 }, // China
    { x: 851, y: 144 }, // Japón
    { x: 819, y: 141 }, // Corea del Sur
    { x: 835, y: 309 }, // Australia
    { x: 549, y: 309 }, // Sudáfrica
    { x: 501, y: 216 }, // Nigeria
    { x: 640, y: 91  }, // Rusia
    { x: 755, y: 237 }, // SE Asia / Singapur
    { x: 347, y: 331 }, // Uruguay
  ];

  return (
    <svg
      viewBox="0 0 960 480"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* ── Ocean ── */}
      <rect width="960" height="480" fill="#deeaf5" rx="16" />

      {/* ── North America ── */}
      <path
        d="M 56,53 L 107,37 L 160,47 L 253,40 L 307,53
           L 333,117 L 299,131 L 272,176 L 251,165
           L 248,197 L 213,181 L 147,107 L 120,91 L 75,85 Z"
        fill="#a8c5de" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Greenland */}
      <path
        d="M 360,32 L 413,27 L 440,40 L 436,59 L 413,67 L 373,64 Z"
        fill="#a8c5de" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
      />

      {/* ── South America ── */}
      <path
        d="M 272,216 L 315,200 L 323,213 L 400,261
           L 389,285 L 371,301 L 356,310
           L 344,338 L 328,355 L 308,381
           L 295,397 L 288,397
           L 283,355 L 291,307
           L 264,261 L 272,240 Z"
        fill="#a8c5de" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
      />

      {/* ── Europe ── */}
      <path
        d="M 456,147 L 464,128 L 480,125
           L 472,104 L 477,96 L 499,85
           L 520,53 L 549,75 L 555,83 L 549,96
           L 579,107 L 571,128 L 557,141
           L 536,139 L 523,128 L 512,131
           L 501,136 L 477,141 Z"
        fill="#a8c5de" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
      />

      {/* ── Africa ── */}
      <path
        d="M 456,147 L 443,181 L 432,213
           L 440,224 L 459,229 L 480,229
           L 509,237 L 520,277 L 531,307
           L 541,328 L 547,341
           L 568,328 L 589,307
           L 605,272 L 629,213
           L 613,213 L 600,187
           L 563,157 L 531,147 Z"
        fill="#a8c5de" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
      />

      {/* ── Asia (main block) ── */}
      <path
        d="M 557,141 L 549,128 L 568,117
           L 600,101 L 640,69 L 693,59
           L 773,53 L 853,64 L 893,85
           L 920,67 L 920,107 L 885,125
           L 859,149 L 827,149
           L 808,165 L 776,181
           L 757,213 L 757,235
           L 740,221 L 720,216
           L 696,219 L 680,197
           L 656,176 L 629,160
           L 609,147 L 595,141 Z"
        fill="#a8c5de" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Indian subcontinent */}
      <path
        d="M 680,197 L 699,197 L 720,216 L 699,237 L 683,213 Z"
        fill="#a8c5de" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* SE Asia / Malay peninsula */}
      <path
        d="M 757,213 L 800,181 L 821,197 L 808,213 L 787,221 L 776,245 L 757,235 Z"
        fill="#a8c5de" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Arabian Peninsula */}
      <path
        d="M 595,141 L 609,147 L 629,160 L 624,187
           L 605,213 L 589,213 L 579,192
           L 584,165 L 595,155 Z"
        fill="#a8c5de" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
      />

      {/* ── Australia ── */}
      <path
        d="M 800,277 L 840,272 L 875,277 L 896,299
           L 904,320 L 888,344 L 861,355
           L 835,355 L 808,336 L 795,309 Z"
        fill="#a8c5de" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
      />

      {/* ── Trade country dots ── */}
      {tradeDots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="3.5" fill="#0796fc" opacity="0.55" />
      ))}

      {/* ── Office markers ── */}
      {offices.map((o, i) => (
        <g key={i}>
          {/* outer pulse ring */}
          <circle
            cx={o.x} cy={o.y} r="13"
            fill={o.color} opacity="0.18"
            className="animate-ping"
            style={{ animationDuration: o.pulse }}
          />
          {/* solid dot */}
          <circle cx={o.x} cy={o.y} r="6.5" fill={o.color} />
          {/* inner white */}
          <circle cx={o.x} cy={o.y} r="2.5" fill="white" />
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
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="nosotros" className="py-16 md:py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container px-6" ref={ref}>

        {/* ── About — Asymmetric layout ── */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 md:mb-28">
          <div className={`lg:col-span-7 ${visible ? "animate-fade-in-left" : "opacity-0"}`}>
            <div className="relative">
              <img
                src={casaMatrizImg}
                alt="Casa Matriz Kariló, Concepción, Chile"
                className="w-full h-64 md:h-80 lg:h-[28rem] object-cover rounded-2xl"
              />
              <div className="absolute -bottom-5 right-4 md:right-8 glass-card rounded-xl px-5 py-4 animate-float">
                <p className="font-display text-2xl font-bold text-accent">2017</p>
                <p className="font-body text-xs text-muted-foreground">{t.nosotros.founded}</p>
              </div>
            </div>
          </div>
          <div
            className={`lg:col-span-5 ${visible ? "animate-fade-in-right" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}
          >
            <span className="section-label mb-5 block w-fit">{t.nosotros.label}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              {t.nosotros.title1} <span className="text-accent">{t.nosotros.titleAccent}</span> {t.nosotros.title2}
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">{t.nosotros.p1}</p>
            <p className="font-body text-muted-foreground leading-relaxed">{t.nosotros.p2}</p>
          </div>
        </div>

        {/* ── How we generate value ── */}
        <div
          className={`max-w-6xl mx-auto mb-16 md:mb-28 ${visible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="elevated-card p-7 md:p-10 lg:p-14 text-center relative overflow-hidden">
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

        {/* ── Presencia Internacional ── */}
        <div
          className={`max-w-6xl mx-auto ${visible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.3s" }}
        >
          <div className="bg-[#f4f7fb] rounded-3xl overflow-hidden">
            {/* 2 → text  |  3 → map */}
            <div className="grid grid-cols-1 lg:grid-cols-5">

              {/* ─ Left: text + offices + stat ─ */}
              <div className="lg:col-span-2 p-8 md:p-10 lg:p-12 flex flex-col justify-center">

                {/* label */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-px bg-[#0796fc]" />
                  <span className="font-display text-[11px] font-bold tracking-widest uppercase text-[#0796fc]">
                    {t.nosotros.mapLabel}
                  </span>
                </div>

                {/* title */}
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[#414142] mb-3 leading-tight">
                  {t.nosotros.mapTitle}
                </h3>

                {/* description */}
                <p className="font-body text-sm text-gray-500 leading-relaxed mb-7">
                  {t.nosotros.mapDesc}
                </p>

                {/* office cards */}
                <div className="space-y-2.5 mb-8">
                  {t.nosotros.offices.map((office, i) => (
                    <div
                      key={office.city}
                      className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${officeColors[i]}1a` }}
                      >
                        <MapPin className="w-4 h-4" style={{ color: officeColors[i] }} />
                      </div>
                      <div>
                        <p className="font-display text-[13px] font-bold text-[#414142] leading-tight">{office.city}</p>
                        <p className="font-body text-[11px] text-gray-400 mt-0.5">{office.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* stat */}
                <div className="flex items-baseline gap-3 pt-2 border-t border-gray-200">
                  <span className="font-display text-5xl font-black text-[#050bfa] leading-none">
                    {t.nosotros.stat}
                  </span>
                  <span className="font-body text-sm text-gray-500 leading-snug">
                    {t.nosotros.statDesc}
                  </span>
                </div>
              </div>

              {/* ─ Right: World map ─ */}
              <div className="lg:col-span-3 relative flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-[280px] bg-white/60">
                {/* subtle grid lines */}
                <svg
                  viewBox="0 0 960 480"
                  className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
                  aria-hidden="true"
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <line
                      key={`v${i}`}
                      x1={(i + 1) * 96} y1="0"
                      x2={(i + 1) * 96} y2="480"
                      stroke="#0796fc" strokeWidth="0.8"
                    />
                  ))}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <line
                      key={`h${i}`}
                      x1="0" y1={(i + 1) * 80}
                      x2="960" y2={(i + 1) * 80}
                      stroke="#0796fc" strokeWidth="0.8"
                    />
                  ))}
                </svg>
                <div className="relative w-full">
                  <WorldMap />
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
