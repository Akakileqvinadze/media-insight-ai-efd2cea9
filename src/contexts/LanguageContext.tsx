import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ka";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    "nav.features": "Features",
    "nav.useCases": "Use Cases",
    "nav.contact": "Contact",
    "nav.bookDemo": "Book a Demo",

    // Hero
    "hero.title": "Transform Media Data into Actionable Intelligence",
    "hero.subtitle":
      "Expert Insights, Zero Delay: Deep Media Analytics Delivered Instantly",
    "hero.poweredBy":
      "Powerful AI Technology for Cutting-Edge Media Monitoring",
    "hero.cta.demo": "Book a Demo",
    "hero.cta.contact": "Contact Us",

    // Problem/Solution
    "problem.challenge": "The Challenge",
    "problem.solution": "Our Solution",
    "problem.title": "Understand Your Media Landscape Instantly",
    "problem.text":
      "Organizations today face an overwhelming flow of media content across online news, print outlets, and social platforms. This constant volume creates a complex environment, where manual media monitoring becomes costly, slow, and ineffective making online reputation management and data-driven decisions significantly harder.",
    "solution.automated": "Full Media Data Automation (24/7)",
    "solution.ai": "AI-Powered Deep Sentiment and Trend Analysis",
    "solution.alerts": "Real-Time Alerts and Daily Summaries (Insights)",

    // Features
    "features.title": "Powerful Functionality",
    "features.subtitle":
      "Automated media monitoring, results analysis, and accurate data - all on one platform",
    "features.sov.title": "Share of Voice",
    "features.sov.desc":
      "Measure media coverage volume by channel and monitor brand visibility across all platforms",
    "features.benchmark.title": "Benchmark & Trend Analysis",
    "features.benchmark.desc":
      "Observe changes over time. Compare current results with historical data, identify key trends, and understand your brand's media dynamics.",
    "features.channel.title": "Detailed Channel Analytics",
    "features.channel.desc":
      "Visualize how brand mentions are distributed across different channels and platforms with clean, clear, and easy-to-read charts.",
    "features.sentiment.title": "Sentiment Analysis",
    "features.sentiment.desc":
      "AI identifies the tone of every media mention in real-time: positive, neutral, or negative. As a result, you gain an accurate and objective picture of the public sentiment towards your brand.",
    "features.sources.title": "Access to Sources",
    "features.sources.desc":
      "The platform collects direct links to original articles, ensuring complete data transparency and authenticity.",
    "features.reports.title": "Automated Reporting and Summaries",
    "features.reports.desc":
      "Daily, weekly, monthly, and annual reports are generated automatically.",

    // Use Cases
    "useCases.title": "Trusted AI Platform for Leading Industries",
    "useCases.ecommerce.title": "E-commerce",
    "useCases.ecommerce.desc":
      "Monitor brand visibility, measure marketing campaign ROI, and assess competitors’ Share of Voice (SOV) across all digital channels",
    "useCases.financial.title": "Financial Services & Banking",
    "useCases.financial.desc":
      "Analyze public sentiment, assess market positioning, and manage reputational risks in real-time using financial media monitoring.",

    // CTA
    "cta.title": "Crisis Prevention Starts Before the First Wave",
    "cta.subtitle":
      "JJoin the leading organizations already leveraging our AI-powered media monitoring system for strategic advantage.",

    // Contact
    "contact.title": "Get in Touch with our team", // Updated for consistency with Contact.tsx H1
    "contact.subtitle": "Fill out the form and we will contact you shortly.", // Updated for consistency with Contact.tsx P
    "contact.name": "Name",
    "contact.phone": "Phone",
    "contact.company": "Company",
    "contact.message": "Message",
    "contact.send": "Send", // Updated for button text
    "contact.info": "Contact Information",
    "contact.address": "Address",
    "contact.social": "Social Medias", // Updated for consistency
    "contact.emailInfo": "Email", // New key for contact info card
    "contact.phoneInfo": "Phone", // New key for contact info card
    "contact.sending": "Sending...",

    // Footer
    "footer.rights": "© 2025 Media Monitoring AI. All rights reserved.",
    "footer.company": "Company",
    "footer.about": "About Us",
    "footer.careers": "Careers",
    "footer.blog": "Blog",
    "footer.product": "Product",
    "footer.features": "Features",
    "footer.pricing": "Pricing",
    "footer.security": "Security",
    "footer.address": "Kutaisi, St. Nino street N4",

    // Demo Page
    "demo.title": "Book a Demo", // New key for Demo.tsx H1
    "demo.subtitle": "Fill out the form and we will contact you shortly.",
    "demo.secure":
      "Your information is secure and will only be used to contact you.",
    "demo.back": "Back to Home", // New key for back link
    "contact.phonePlaceholder": "+995 5XX XX XX XX",
  },

  ka: {
    // Navigation
    "nav.features": "ფუნქციები",
    "nav.useCases": "გამოყენება",
    "nav.contact": "კონტაქტი",
    "nav.bookDemo": "დემოს ჩვენება",

    // Hero
    "hero.title": "მძლავრი AI ტექნოლოგია მედია მონიტორინგისთვის",
    "hero.subtitle":
      "მიიღე ღრმა ანალიტიკა და ინსაითები ექსპერტის დონეზე, წამებში",
    "hero.poweredBy":
      "AI ზუსტი სტრატეგიისთვის: გარდაქმენით მედია სტატისტიკა მოქმედებად!",
    "hero.cta.demo": "ნახე დემო",
    "hero.cta.contact": "გაიარე უფასო კონსულტაცია",

    // Problem/Solution
    "problem.challenge": "გამოწვევა",
    "problem.solution": "გამოსავალი",
    "problem.title": "გაიგე შენი მედია გარემო მყისიერად",
    "problem.text":
      "დღევანდელ რეალობაში ორგანიზაციები ეჯახებიან მედია მასალების უწყვეტ ნაკადს  ონლაინ ახალი ამბები, ბეჭდური მედია და სოციალური კონტენტი ერთად ქმნის რთულ და ქაოტურ ეკოსისტემას. მონიტორინგის ხელით მართვა ძვირი, ნელი და ხშირად არაეფექტურია, რაც სერიოზულად ართულებს ონლაინ რეპუტაციის დაცვას და ინფორმირებულ გადაწყვეტილებებს.",
    "solution.automated": "მედია მონაცემების სრულ ავტომატიზაცია 24/7-ზე",
    "solution.ai":
      "AI-ზე დაფუძნებული სენტიმენტისა და ტრენდების სიღრმისეული ანალიზი",
    "solution.alerts": "მყისიერი შეტყობინება და ყოველდღიური შეჯამება",

    // Features
    "features.title": "მძლავრი ფუნქციონალი",
    "features.subtitle":
      "ავტომატიზირებული მედია მონიტორინგი, შედეგების ანალიზი და ზუსტი მონაცემები ერთ პლატფორმაზე",
    "features.sov.title": "ბრენდის წილი მედიაში",
    "features.sov.desc":
      "გაზომე მედია გაშუქების მოცულობა არხების მიხედვით და აკონტროლე ბრენდის ხილვადობა ყველა პლატფორმაზე.",
    "features.benchmark.title": "ტრენდების შედარებითი ანალიზი",
    "features.benchmark.desc":
      "დააკვირდი ცვლილებებს დროში. შეადარე მიმდინარე შედეგები ძველ მონაცემებს, გამოავლინე ტენდენციები და დაინახე როგორ იცვლება შენი ბრენდის მედია დინამიკა.",
    "features.channel.title": "მედია არხების დეტალური ანალიტიკა",
    "features.channel.desc":
      "ნახე, როგორ ნაწილდება ბრენდის ხსენებები სხვადასხვა არხსა და პლატფორმაზე. ერთიანი, ნათელი და მარტივად გასაშიფრი გრაფიკებით.",
    "features.sentiment.title": "სენტიმენტის ანალიზი",
    "features.sentiment.desc":
      "AI რეალურ დროში აიდენტიფიცირებს თითოეული მედია ხსენების ტონალობის: დადებითია, ნეიტრალური თუ უარყოფითი. შედეგად, იღებ ზუსტ და ობიექტურ სურათს ბრენდის მიმართ არსებულ საზოგადოებრივ განწყობაზე.",
    "features.sources.title": "წვდომა წყაროებზე ",
    "features.sources.desc":
      "პლატფორმა აგროვებს პირდაპირ ბმულებს ორიგინალ სტატიებზე, რაც უზრუნველყოფს მონაცემების სრულ გამჭვირვალობას.",
    "features.reports.title": "ავტომატიზირებული რეპორტინგი და ანგარიშები",
    "features.reports.desc":
      "ყოველდღიური, ყოველკვირეული, ტოველთვიური და წლიური ანგარიშები გენერირდება ავტომატურად",

    // Use Cases
    "useCases.title": "სანდო AI პლატფოერმა წამყვანი ინდუსტრიებისთვის",
    "useCases.ecommerce.title": "ელ-კომერცია",
    "useCases.ecommerce.desc":
      "აკონტროლე ბრენდის ხილვადობა, გაზომე მარკეტინგული კამპანიის ROI და შეაფასე კონკურენტების ბრენდის ხმის წილი  ყველა ციფრულ არხზე.",
    "useCases.financial.title": "ფინანსური მომსახურება და ბანკინგი",
    "useCases.financial.desc":
      "გააანალიზე საზოგადოებრივი განწყობა, შეაფასე ბაზრის პოზიციონირება და მართე რეპუტაციული რისკები რეალურ დროში ფინანსური მედია მონიტორინგის გამოყენებით.",

    // CTA
    "cta.title":
      "იმოქმედე კრიზისამდე: ჩვენი AI აღმოაჩენს რისკებს, სანამ ისინი პრობლემად იქცევიან",
    "cta.subtitle":
      "კრიზისის პრევენცია იწყება პირველ ტალღამდე. შეუერთდი წამყვან ორგანიზაციებს, რომლებიც უკვე იყენებენ ჩვენს AI-ზე დაფუძნებულ მედია მონიტორინგის სისტემას სტრატეგიული უპირატესობისთვის. ",

    // Contact
    "contact.title": "დაგვიკავშირდით",
    "contact.subtitle":
      "გაქვთ კითხვები? ჩვენ მოხარული ვიქნებით მოვისმინოთ თქვენი აზრი.",
    "contact.name": "სახელი",
    "contact.emailInfo": "ელ-ფოსტა",
    "contact.message": "შეტყობინება",
    "contact.send": "გაგზავნა",
    "contact.info": "საკონტაქტო ინფორმაცია",

    // Footer
    "footer.rights": "© 2025 Media Monitoring AI. ყველა უფლება დაცულია.",
    "footer.company": "კომპანია",
    "footer.about": "ჩვენ შესახებ",
    "footer.careers": "კარიერა",
    "footer.blog": "ბლოგი",
    "footer.product": "პროდუქტი",
    "footer.features": "ფუნქციები",
    "footer.pricing": "ფასები",
    "footer.security": "უსაფრთხოება",
    "footer.address": "ქ. ქუთაისი წმინდა ნინოს N4",

    // Demo Page
    "demo.subtitle": "შეავსეთ ფორმა და დაგიკავშირდებით მალევე.",
    "demo.secure":
      "თქვენი ინფორმაცია დაცულია და გამოყენებული იქნება მხოლოდ თქვენთან დასაკავშირებლად.",
    "demo.back": "უკან დაბრუნება",
    "contact.phone": "ტელეფონი",
    "contact.company": "კომპანია",
    "contact.phonePlaceholder": "+995 5XX XX XX XX",
    "contact.address": "მისამართი",
    "contact.social": "სოციალური მედია ",
    "contact.success": "მესიჯი წარმატებით გაიგზავნა! მალე დაგიკავშირდებით.",
    "contact.error": "მესიჯის გაგზავნა ვერ მოხერხდა. გთხოვთ, სცადეთ თავიდან.",
    "contact.sending": "იგზავნება...",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
