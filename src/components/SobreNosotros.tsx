import { useEffect, useRef, useState } from "react";
import casaMatrizImg from "@/assets/casa-matriz.png";
import { MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

const officeColors = ["#050bfa", "#0796fc", "#0796fc"];

// Coordenadas [lon, lat] de las 3 oficinas
const offices = [
  { coords: [-72.9, -36.8] as [number, number], color: "#050bfa", pulse: "2s" },
  { coords: [-77.0, -12.1] as [number, number], color: "#0796fc", pulse: "2.6s" },
  { coords: [-46.6, -23.5] as [number, number], color: "#0796fc", pulse: "3.2s" },
];

// 25 países de trading — punto azul
const tradeDots: [number, number][] = [
  [-74,  40.7],  // USA
  [-95,  56  ],  // Canadá
  [-99,  19  ],  // México
  [-74,   4  ],  // Colombia
  [-64, -34  ],  // Argentina
  [ -3,  52  ],  // Reino Unido
  [  2,  47  ],  // Francia
  [ 10,  51  ],  // Alemania
  [ 12,  43  ],  // Italia
  [ -4,  40  ],  // España
  [ 33,  39  ],  // Turquía
  [ -7,  32  ],  // Marruecos
  [ 31,  30  ],  // Egipto
  [ 46,  24  ],  // Arabia Saudí
  [ 55,  25  ],  // EAU
  [ 79,  22  ],  // India
  [116,  36  ],  // China
  [138,  36  ],  // Japón
  [128,  37  ],  // Corea del Sur
  [133, -26  ],  // Australia
  [ 26, -26  ],  // Sudáfrica
  [  8,   9  ],  // Nigeria
  [ 60,  56  ],  // Rusia
  [104,   1  ],  // Singapur / SE Asia
  [-56, -32  ],  // Uruguay
];

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WorldMap = () => (
  <ComposableMap
    projection="geoMercator"
    projectionConfig={{ scale: 130, center: [15, 10] }}
    style={{ width: "100%", height: "100%" }}
  >
    <ZoomableGroup zoom={1} minZoom={1} maxZoom={1}>
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#b8cfe8"
              stroke="#ffffff"
              strokeWidth={0.5}
              style={{
                default: { outline: "none" },
                hover:   { outline: "none", fill: "#9bbfdc" },
                pressed: { outline: "none" },
              }}
            />
          ))
        }
      </Geographies>

      {/* Trade dots */}
      {tradeDots.map(([lon, lat], i) => (
        <Marker key={i} coordinates={[lon, lat]}>
          <circle r={3} fill="#0796fc" opacity={0.6} />
        </Marker>
      ))}

      {/* Office markers */}
      {offices.map((o, i) => (
        <Marker key={`office-${i}`} coordinates={o.coords}>
          <circle r={10} fill={o.color} opacity={0.18} className="animate-ping" style={{ animationDuration: o.pulse }} />
          <circle r={5.5} fill={o.color} stroke="white" strokeWidth={1.5} />
          <circle r={2}   fill="white" />
        </Marker>
      ))}
    </ZoomableGroup>
  </ComposableMap>
);

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
            <div className="grid grid-cols-1 lg:grid-cols-5">

              {/* ─ Left: text + offices + stat ─ */}
              <div className="lg:col-span-2 p-8 md:p-10 lg:p-12 flex flex-col justify-center">

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-px bg-[#0796fc]" />
                  <span className="font-display text-[11px] font-bold tracking-widest uppercase text-[#0796fc]">
                    {t.nosotros.mapLabel}
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-[#414142] mb-3 leading-tight">
                  {t.nosotros.mapTitle}
                </h3>

                <p className="font-body text-sm text-gray-500 leading-relaxed mb-7">
                  {t.nosotros.mapDesc}
                </p>

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

                <div className="flex items-baseline gap-3 pt-2 border-t border-gray-200">
                  <span className="font-display text-5xl font-black text-[#0796fc] leading-none">
                    {t.nosotros.stat}
                  </span>
                  <span className="font-body text-sm text-gray-500 leading-snug">
                    {t.nosotros.statDesc}
                  </span>
                </div>
              </div>

              {/* ─ Right: Real World Map ─ */}
              <div className="lg:col-span-3 relative bg-[#deeaf5] min-h-[300px] lg:min-h-0 flex items-center overflow-hidden rounded-b-3xl lg:rounded-none lg:rounded-r-3xl">
                <div className="w-full h-full min-h-[300px]">
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
