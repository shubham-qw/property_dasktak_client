import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import ProjectsSection from './components/sections/ProjectsSection';
import PostPropertySection from './components/sections/PostPropertySection';
import CitiesSection from './components/sections/CitiesSection';
import BudgetSection from './components/sections/BudgetSection';
import PGHostelSection from './components/sections/PGHostelSection';
import TestimonialsSection from './components/sections/TestimonialsSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <PostPropertySection />
      <BudgetSection />
      <PGHostelSection />
      <TestimonialsSection />
    </main>
  );
} 