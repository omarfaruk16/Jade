import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ProductsScrollSection from '@/components/home/ProductsScrollSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import ProcessSection from '@/components/home/ProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ExpertiseSection from '@/components/home/ExpertiseSection';
import BlogsSection from '@/components/home/BlogsSection';
import FaqSection from '@/components/home/FaqSection';
import TeamSection from '@/components/home/TeamSection';

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsScrollSection />
        <CategoriesSection />
        <ProcessSection />
        <TestimonialsSection />
        <BlogsSection />
        <FaqSection />
        <TeamSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
