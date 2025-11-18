import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-6 flex-nowrap">
                <span className="font-bold text-3xl whitespace-nowrap">
                  Done by:{" "}
                </span>

                <img
                  src="/logo circle black bg.svg"
                  alt="Logo"
                  className="h-14 w-auto"
                />

                <span className="font-bold text-lg whitespace-nowrap">Media Monitoring AI</span>
              </div>
              <span className="text-sm text-muted-foreground">
                AI-powered media monitoring and analytics platform
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
