import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Mail, MapPin, Phone, Send, Facebook, Linkedin, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import Map from "@/components/Map";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().min(1, "Phone is required").max(50, "Phone must be less than 50 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const Contact = () => {
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
    const validation = contactSchema.safeParse(formData);
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
      data.append("subject", "New Contact Form Submission");
      data.append("from_name", "Media Monitoring AI Contact Form");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully! We'll contact you shortly.");
        setFormData({ name: "", phone: "", company: "", message: "" });
        setSubmitted(true);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t("contact.title")}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t("contact.subtitle")}
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 animate-fade-in">
              {/* Contact Form - Left Side */}
              <div className="lg:col-span-2">
                {submitted ? (
                  <div className="text-center py-12 animate-scale-in">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Message Sent!</h2>
                    <p className="text-muted-foreground mb-8">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 border-2 border-border rounded-2xl p-8">
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
                      className="h-12 border-b-2 border-t-0 border-x-0 rounded-none border-border/70 focus:border-primary"
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
                      className="h-12 border-b-2 border-t-0 border-x-0 rounded-none border-border/70 focus:border-primary"
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
                      className="h-12 border-b-2 border-t-0 border-x-0 rounded-none border-border/70 focus:border-primary"
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
                      className="min-h-32 resize-none border-b-2 border-t-0 border-x-0 rounded-none border-border/70 focus:border-primary"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full gradient-primary h-12 text-base font-semibold"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {loading ? "Sending..." : "Send"}
                  </Button>
                </form>
                )}
              </div>

              {/* Contact Info - Right Side */}
              <div className="lg:col-span-3 space-y-6">
                {/* 2x2 Grid for Contact Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {t("contact.phone")}
                        </h3>
                        <p className="text-muted-foreground">
                          +995 571 33 33 03
                        </p>
                        <p className="text-muted-foreground">
                          +995 579 58 88 59
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {t("contact.emailInfo")}
                        </h3>
                        <p className="text-muted-foreground">
                          info@nebulahub.ai
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {t("contact.address")}
                        </h3>
                        <p className="text-muted-foreground">
                          {t("footer.address")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-4">
                      {t("contact.social")}
                    </h3>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <Facebook className="h-6 w-6 text-primary" />
                      </a>
                      <a
                        href="#"
                        className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <Linkedin className="h-6 w-6 text-primary" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Map - Full Width Below */}
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm p-4">
                  <Map />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
