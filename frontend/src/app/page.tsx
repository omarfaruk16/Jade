import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ProductsScrollSection from '@/components/home/ProductsScrollSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import ProcessSection from '@/components/home/ProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BlogsSection from '@/components/home/BlogsSection';
import FaqSection from '@/components/home/FaqSection';
import TeamSection from '@/components/home/TeamSection';
import SectionReveal from '@/components/layout/SectionReveal';

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <HeroSection />
        <SectionReveal><AboutSection /></SectionReveal>
        <SectionReveal><ProductsScrollSection /></SectionReveal>
        <SectionReveal><CategoriesSection /></SectionReveal>
        <SectionReveal><ProcessSection /></SectionReveal>
        <SectionReveal><TestimonialsSection /></SectionReveal>
        <SectionReveal><BlogsSection /></SectionReveal>
        <SectionReveal><FaqSection /></SectionReveal>
        <SectionReveal><TeamSection /></SectionReveal>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
