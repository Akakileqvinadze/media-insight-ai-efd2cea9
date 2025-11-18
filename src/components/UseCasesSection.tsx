import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Building2 } from 'lucide-react';

export const UseCasesSection = () => {
  const { t } = useLanguage();

  const useCases = [
    {
      icon: ShoppingBag,
      title: t('useCases.ecommerce.title'),
      description: t('useCases.ecommerce.desc'),
      gradient: 'from-blue-500/10 to-cyan-500/10',
    },
    {
      icon: Building2,
      title: t('useCases.financial.title'),
      description: t('useCases.financial.desc'),
      gradient: 'from-purple-500/10 to-pink-500/10',
    },
  ];

  return (
    <section id="use-cases" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('useCases.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="gradient-card border-border/50 hover:shadow-strong transition-all duration-300 hover:-translate-y-2 animate-fade-in group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <useCase.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {useCase.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
