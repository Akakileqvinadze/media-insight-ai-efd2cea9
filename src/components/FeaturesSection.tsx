import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Radio, Smile, Link2, FileText } from 'lucide-react';

export const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: BarChart3,
      title: t('features.sov.title'),
      description: t('features.sov.desc'),
      color: 'text-primary',
    },
    {
      icon: TrendingUp,
      title: t('features.benchmark.title'),
      description: t('features.benchmark.desc'),
      color: 'text-secondary',
    },
    {
      icon: Radio,
      title: t('features.channel.title'),
      description: t('features.channel.desc'),
      color: 'text-accent',
    },
    {
      icon: Smile,
      title: t('features.sentiment.title'),
      description: t('features.sentiment.desc'),
      color: 'text-primary',
    },
    {
      icon: Link2,
      title: t('features.sources.title'),
      description: t('features.sources.desc'),
      color: 'text-secondary',
    },
    {
      icon: FileText,
      title: t('features.reports.title'),
      description: t('features.reports.desc'),
      color: 'text-accent',
    },
  ];

  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="gradient-card border-border/50 hover:shadow-soft transition-all duration-300 hover:-translate-y-1 animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 ${feature.color} group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
