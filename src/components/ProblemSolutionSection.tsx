import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2 } from "lucide-react";
import dashboardMockup from "@/assets/dashboard-mockup.jpg";

export const ProblemSolutionSection = () => {
  const { t } = useLanguage();

  const solutions = [
    t("solution.automated"),
    t("solution.ai"),
    t("solution.alerts"),
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
          {t("problem.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 text-destructive">
                {t("problem.challenge")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("problem.text")}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">
                {t("problem.solution")}
              </h3>
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-card hover:bg-accent/5 transition-colors"
                >
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{solution}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-slide-in-right">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
              <img
                src={dashboardMockup}
                alt="Dashboard Solution"
                className="relative rounded-2xl shadow-strong border border-border"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
