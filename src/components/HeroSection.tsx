import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onBookDemo: () => void;
}

export const HeroSection = ({ onBookDemo }: HeroSectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            {t("hero.subtitle")}
          </p>
          <p className="text-sm text-muted-foreground mb-12">
            {t("hero.poweredBy")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              onClick={onBookDemo}
              className="gradient-primary shadow-glow text-lg px-8 h-14 group"
            >
              {t("hero.cta.demo")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 h-14"
            >
              <Link to="/contact">{t("hero.cta.contact")}</Link>
            </Button>
          </div>

          <div className="relative max-w-5xl mx-auto animate-float">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <img
              src={heroBg}
              alt="Dashboard Preview"
              className="relative rounded-2xl shadow-strong border border-border/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
