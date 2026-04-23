import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ExpertiseSection from '@/components/home/ExpertiseSection';
import ProcessSection from '@/components/home/ProcessSection';

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExpertiseSection />
        <ProcessSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
