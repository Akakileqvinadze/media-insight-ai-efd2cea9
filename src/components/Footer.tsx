import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="container mx-auto px-4">
        {/* stacked on mobile, row with space-between on md+ */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* left: logo block */}
          <div className="flex items-center gap-6">
            <span className="font-bold text-3xl whitespace-nowrap">
              Done by:
            </span>

            <img
              src="/logo circle black bg.svg"
              alt="Logo"
              className="h-14 w-auto"
            />

            <span className="font-bold text-lg whitespace-nowrap">
              Media Monitoring AI
            </span>
          </div>

          {/* right: description (align right on md+) */}
          <div className="text-sm text-muted-foreground md:text-right">
            AI-powered media monitoring and analytics platform
          </div>
        </div>
      </div>
    </footer>
  );
};
