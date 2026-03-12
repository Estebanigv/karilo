import { useEffect, useRef, useState } from "react";
import casaMatrizImg from "@/assets/casa-matriz.png";
import mapaImg from "@/assets/mapa-alcance.png";
import { MapPin } from "lucide-react";

const SobreNosotros = () => {
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
    <section id="nosotros" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container px-6" ref={ref}>
        {/* About — Asymmetric layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-28">
          {/* Image — takes more space */}
          <div
            className={`lg:col-span-7 ${visible ? "animate-fade-in-left" : "opacity-0"}`}
          >
            <div className="relative">
              <img
                src={casaMatrizImg}
                alt="Casa Matriz Kariló, Concepción, Chile"
                className="w-full h-[28rem] object-cover rounded-2xl"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-4 md:right-8 glass-card rounded-xl px-5 py-4 animate-float">
                <p className="font-display text-2xl font-bold text-accent">2017</p>
                <p className="font-body text-xs text-muted-foreground">Año de fundación</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div
            className={`lg:col-span-5 ${visible ? "animate-fade-in-right" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}
          >
            <span className="section-label mb-5 block w-fit">Sobre Nosotros</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              Un partner <span className="text-accent">estratégico</span> en Latinoamérica
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              Kariló es un grupo empresarial con casa matriz en Chile, especializado en la comercialización y el trading internacional de aceites, proteínas e ingredientes nutricionales de alto valor, destinados principalmente a la nutrición animal y aplicaciones industriales.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Fundada en 2017, somos una compañía chilena con creciente presencia internacional, enfocada en el abastecimiento estratégico de aceites, grasas, proteínas e ingredientes funcionales de alto valor. A través de una sólida red global, conectamos mercados y desarrollamos soluciones a medida para sectores clave como la nutrición animal y humana, así como la industria energética.
            </p>
          </div>
        </div>

        {/* How we generate value */}
        <div
          className={`max-w-6xl mx-auto mb-28 ${visible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="elevated-card p-10 md:p-14 text-center relative overflow-hidden">
            {/* Subtle bg accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <span className="section-label mb-5 inline-block">Propuesta de valor</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
                Cómo generamos valor
              </h3>
              <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
                Conectamos la oferta y la demanda de insumos críticos e ingredientes especializados, integrando abastecimiento internacional, soluciones logísticas y estructuración financiera. Operamos bajo estrictos estándares de cumplimiento, transparencia y gestión responsable del riesgo, asegurando continuidad y confianza para nuestros proveedores y clientes.
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div
          className={`max-w-6xl mx-auto ${visible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.3s" }}
        >
          <div className="text-center mb-10">
            <span className="section-label mb-4 inline-block">Alcance Global</span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Presencia Internacional
            </h3>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Kariló mantiene relaciones comerciales activas con más de 20 países para el sourcing y comercialización de materias primas e ingredientes nutricionales, operando con una visión regional y estándares internacionales.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={mapaImg}
              alt="Mapa de alcance internacional de Kariló"
              className="w-full h-auto"
            />

            {/* Office cards */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3 justify-center">
              {[
                { city: "Concepción, Chile", label: "Casa Matriz" },
                { city: "Lima, Perú", label: "Be&Ka Trading" },
                { city: "São Paulo, Brasil", label: "Kariló Brasil" },
              ].map((office) => (
                <div
                  key={office.city}
                  className="glass-card rounded-xl px-5 py-3 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 animate-pulse-glow">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-display text-xs font-bold text-foreground">{office.city}</p>
                    <p className="font-body text-[11px] text-muted-foreground">{office.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreNosotros;
