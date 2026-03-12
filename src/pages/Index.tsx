import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Fortalezas from "@/components/Fortalezas";
import Soluciones from "@/components/Soluciones";
import CTASection from "@/components/CTASection";
import SobreNosotros from "@/components/SobreNosotros";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Fortalezas />
      <Soluciones />
      <CTASection />
      <SobreNosotros />
      <Contacto />
      <Footer />
    </div>
  );
};

export default Index;
