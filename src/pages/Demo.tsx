import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const demoSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().min(1, "Phone is required").max(50, "Phone must be less than 50 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters"),
});

const Demo = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const validation = demoSchema.safeParse(formData);
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("access_key", "b34fa8bf-9f19-4788-b67a-0a50458c4276");
      data.append("name", validation.data.name);
      data.append("phone", validation.data.phone);
      data.append("company", validation.data.company);
      data.append("message", validation.data.message);
      data.append("subject", "New Demo Request");
      data.append("from_name", "Media Monitoring AI Demo Form");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        toast.success(
          "Demo request sent successfully! We'll contact you shortly."
        );
        setFormData({ name: "", phone: "", company: "", message: "" });
        setSubmitted(true);
      } else {
        toast.error("Failed to send request. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send request. Please try again.");
      console.error("Web3Forms error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation onBookDemo={() => {}} />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("demo.back")}
            </Link>

            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Book a Demo
              </h1>
              <p className="text-lg text-muted-foreground">
                {t("demo.subtitle")}
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg animate-fade-in">
              {submitted ? (
                <div className="text-center py-12 animate-scale-in">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Request Submitted!</h2>
                  <p className="text-muted-foreground mb-8">
                    Thank you for your interest. We'll contact you shortly to schedule your demo.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    {t("contact.name")}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    {t("contact.phone")}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+995 5XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">
                    {t("contact.company")}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    {t("contact.message")}
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="min-h-32 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-primary h-14 text-base font-semibold"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {loading ? "Sending..." : "Send"}
                </Button>

                <p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
                  <span className="text-orange-500">🔒</span>
                  {t("demo.secure")}
                </p>
              </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Demo;
