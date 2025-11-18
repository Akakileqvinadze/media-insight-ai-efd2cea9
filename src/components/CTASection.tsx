import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  onBookDemo: () => void;
}

export const CTASection = ({ onBookDemo }: CTASectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
            <div className="relative bg-card border border-border rounded-3xl p-12 md:p-16 shadow-strong animate-scale-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {t('cta.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={onBookDemo}
                  className="gradient-primary shadow-glow text-lg px-8 h-14 group"
                >
                  {t('hero.cta.demo')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-lg px-8 h-14"
                >
                  <Link to="/contact">{t('hero.cta.contact')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
