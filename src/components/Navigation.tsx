import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  onBookDemo: () => void;
}

export const Navigation = ({ onBookDemo }: NavigationProps) => {
  const { t } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            {/* <img
              src="/logo circle black.svg"
              alt="Logo"
              className="h-10 w-auto"
            /> */}

            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Media Monitoring AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              {t("nav.features")}
            </button>
            <button
              onClick={() => scrollToSection("use-cases")}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              {t("nav.useCases")}
            </button>
            <Link
              to="/contact"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              {t("nav.contact")}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <Button
              onClick={onBookDemo}
              className="gradient-primary shadow-glow"
            >
              {t("nav.bookDemo")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-left text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
              >
                {t("nav.features")}
              </button>
              <button
                onClick={() => scrollToSection("use-cases")}
                className="text-left text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
              >
                {t("nav.useCases")}
              </button>
              <Link
                to="/contact"
                className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.contact")}
              </Link>
              <div className="flex items-center gap-2 pt-2">
                <LanguageToggle />
                <Button
                  onClick={onBookDemo}
                  className="gradient-primary flex-1"
                >
                  {t("nav.bookDemo")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
