import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="rounded-full px-3 py-1 h-8 text-xs font-medium"
      >
        EN
      </Button>
      <Button
        variant={language === 'ka' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('ka')}
        className="rounded-full px-3 py-1 h-8 text-xs font-medium"
      >
        GE
      </Button>
    </div>
  );
};
