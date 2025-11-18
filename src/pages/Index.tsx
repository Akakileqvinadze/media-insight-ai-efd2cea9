import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ProblemSolutionSection } from '@/components/ProblemSolutionSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { UseCasesSection } from '@/components/UseCasesSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation onBookDemo={() => navigate('/demo')} />
      
      <HeroSection onBookDemo={() => navigate('/demo')} />
      <ProblemSolutionSection />
      <FeaturesSection />
      <UseCasesSection />
      <CTASection onBookDemo={() => navigate('/demo')} />
      <Footer />
    </div>
  );
};

export default Index;
