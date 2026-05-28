'use client';

import { useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './About.module.css';
import { CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionReveal from '@/components/layout/SectionReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';
import TeamSection from '@/components/home/TeamSection';
import LogoMarquee from '@/components/common/LogoMarquee';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import TitleReveal from '@/components/layout/TitleReveal';

export default function AboutPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(1); // Start with index 1 in center

  const heroMedia = [
    { id: 0, type: 'image', src: '/images/f1.png' },
    { id: 1, type: 'video', src: '/images/download.mp4' },
    { id: 2, type: 'image', src: '/images/f2.png' },
    { id: 3, type: 'image', src: '/images/f3.png' }
  ];

  const handleNext = () => setActiveIndex(p => (p + 1) % heroMedia.length);
  const handlePrev = () => setActiveIndex(p => (p === 0 ? heroMedia.length - 1 : p - 1));

  const getVisibleIndices = () => {
    const left = activeIndex === 0 ? heroMedia.length - 1 : activeIndex - 1;
    const center = activeIndex;
    const right = (activeIndex + 1) % heroMedia.length;
    return [left, center, right];
  };

  const visibleIndices = getVisibleIndices();


  useEffect(() => {
    fetch(`${API_BASE}/testimonials`)
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(console.error);
      
    fetch(`${API_BASE}/team`)
      .then(res => res.json())
      .then(data => setTeamMembers(data))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.container}>
        {/* Header Section */}
        <SectionReveal>
          <div className={styles.heroOuterWrapper}>
          <section className={styles.headerSection}>
            <h1 className={styles.pageTitle}>
              <ScaleBlur text="About Us" stagger={0.05} />
            </h1>
            <p className={styles.pageSubtitle}>
              Jade spaces blends high-end design principles with timeless materials
              and luxury living, ensuring every corner offers both inspiration and relaxation.
            </p>

            <div className={styles.heroLogos}>
              <LogoMarquee />
            </div>

            <div className={styles.heroImagesGrid}>
              {visibleIndices.map((mediaIndex, i) => {
                const media = heroMedia[mediaIndex];
                const isLeft = i === 0;
                const isCenter = i === 1;
                const isRight = i === 2;
                
                return (
                  <div key={i} className={styles.imageCol}>
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={media.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                      >
                        {media.type === 'video' ? (
                          <video src={media.src} autoPlay muted loop playsInline className={styles.heroMediaEl} />
                        ) : (
                          <img src={media.src} alt="" className={styles.heroMediaEl} />
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Left Arrow on Left Image */}
                    {isLeft && (
                      <button className={`${styles.sliderNavBtn} ${styles.sliderNavLeft}`} onClick={handlePrev}>
                        <ChevronLeft size={24} />
                      </button>
                    )}

                    {/* Right Arrow on Right Image */}
                    {isRight && (
                      <button className={`${styles.sliderNavBtn} ${styles.sliderNavRight}`} onClick={handleNext}>
                        <ChevronRight size={24} />
                      </button>
                    )}

                    {/* Dots on Center Image */}
                    {isCenter && (
                      <div className={styles.sliderDots}>
                        {heroMedia.map((_, dotIdx) => (
                          <span 
                            key={dotIdx} 
                            className={`${styles.dot} ${activeIndex === dotIdx ? styles.dotActive : ''}`}
                            onClick={() => setActiveIndex(dotIdx)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
          </div>
        </SectionReveal>

        {/* Milestones Section */}
        <SectionReveal>
          <section className={styles.milestoneSection}>
            <div className={styles.milestoneHeader}>
              <span className={styles.label}>Summary</span>
              <TitleReveal><h2 className={styles.sectionTitle}>Our Historical Milestones</h2></TitleReveal>
            </div>
            
            <div className={styles.milestoneList}>
              <p className={styles.milestoneIntro}>
                We create thoughtful, collaborative spaces that bring together diverse teams
                and foster creativity across borders and disciplines.
              </p>
              
              <div className={styles.milestoneItem}>
                 <div className={styles.milestoneText}>
                   <span className={styles.diamondIcon}></span> Designing Across Borders
                 </div>
                 <span className={styles.year}>2025</span>
              </div>
              <div className={styles.milestoneItem}>
                 <div className={styles.milestoneText}>
                   <span className={styles.diamondIcon}></span> Rebranded with a Clearer Vision
                 </div>
                 <span className={styles.year}>2024</span>
              </div>
              <div className={styles.milestoneItem}>
                 <div className={styles.milestoneText}>
                   <span className={styles.diamondIcon}></span> Building a Strong Team
                 </div>
                 <span className={styles.year}>2023</span>
              </div>
              <div className={styles.milestoneItem}>
                 <div className={styles.milestoneText}>
                   <span className={styles.diamondIcon}></span> Expanded to Commercial Design
                 </div>
                 <span className={styles.year}>2022</span>
              </div>
              <div className={styles.milestoneItem}>
                 <div className={styles.milestoneText}>
                   <span className={styles.diamondIcon}></span> Completed 50+ Projects
                 </div>
                 <span className={styles.year}>2021</span>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Philosophy Section */}
        <SectionReveal>
          <section className={styles.philosophySection}>
            <div className={styles.philosophyLeft}>
              <TitleReveal><h2 className={styles.sectionTitle}>Design With Purpose,<br/>Built on Collaboration</h2></TitleReveal>
              <p className={styles.philosophyText}>
                We are a collective of interior designers aiming to elevate everyday spaces with a fine 
                approach that marries light, organic forms, and rich, natural textures.
              </p>
              <ul className={styles.featureList}>
                 <li><CheckCircle2 size={18}/> We collaborate with our trusted partners to achieve the best.</li>
                 <li><CheckCircle2 size={18}/> Our mission is to transform environments into bespoke sanctuaries.</li>
              </ul>
            </div>
            <div className={styles.philosophyRight}>
              <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Wood paneling" className={styles.philImgTop} />
              <div className={styles.philBottomRow}>
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Glass doors" className={styles.philImgLeft}/>
                <img src="https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Vase and chair" className={styles.philImgRight}/>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Client Voices Section */}
        <SectionReveal>
          <section className={styles.clientVoicesSection}>
            <div className={styles.voicesHeader}>
              <TitleReveal><h2 className={styles.sectionTitleCenter}>Client Voices</h2></TitleReveal>
              <p className={styles.sectionSubtitleCenter}>
                Real feedback from the incredible people we've had the pleasure to design for.
              </p>
            </div>

            <div className={styles.testimonialsGrid}>
              {testimonials.length > 0 ? (
                testimonials.map((testi, idx) => (
                  <div key={idx} className={styles.testimonialCard}>
                    <div className={styles.stars}>
                      {'★'.repeat(testi.rating)}{'☆'.repeat(5 - testi.rating)}
                    </div>
                    <p className={styles.reviewText}>
                      "{testi.review}"
                    </p>
                    <div className={styles.clientInfo}>
                      <img src={testi.avatar || 'https://via.placeholder.com/50'} alt={testi.name} className={styles.avatar} />
                      <div>
                        <h4 className={styles.clientName}>{testi.name}</h4>
                        <span className={styles.clientRole}>{testi.role}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#666' }}>No testimonials available yet.</p>
              )}
            </div>
          </section>
        </SectionReveal>

        {/* Shared Team Section */}
        <SectionReveal>
          <TeamSection />
        </SectionReveal>

      </main>
      <Footer />
    </div>
  );
}
