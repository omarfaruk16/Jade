'use client';

import { useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './ImportExport.module.css';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WorldMap from '@/components/home/WorldMap';
import SectionReveal from '@/components/layout/SectionReveal';
import CeoBadge from '@/components/shared/CeoBadge';
import WhatsIncluded from '@/components/shared/WhatsIncluded';
import FaqSection from '@/components/home/FaqSection';
import '@/app/jade-shared.css';

export default function ImportExportPage() {


  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className={styles.heroTitle}
          >
            Worldwide Export Import
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className={styles.heroSubtitle}
          >
            Authentic design pieces sourced from around the globe, 
            bringing architecture and interior excellence to your doorstep.
          </motion.p>
        </div>
      </section>

      <main className={styles.container}>
        {/* Intro Section (Insights) */}
        <SectionReveal>
          <div className={styles.gridRow}>
            <div className={styles.leftCol}>
              <FourDotsIcon />
              <span>Insights</span>
            </div>
            <div className={`${styles.middleCol} ${styles.wideMiddleCol}`}>
              <p className={styles.introText}>
                The inspiration from Scandinavian aesthetics, emphasizing simplicity, 
                functionality, and natural beauty. The design combines neutral color palettes—such as 
                whites, grays, and soft pastels—with warm wooden accents to create a cozy and inviting atmosphere.
              </p>
              <CeoBadge />
            </div>
          </div>
        </SectionReveal>

        {/* Office Design Section */}
        <SectionReveal>
          <section className={styles.officeSection}>
             <div className={styles.officeHeader}>
                <h2 className={styles.sectionTitle}>Office Design</h2>
                <div className={styles.headerRightContent}>
                  <p className={styles.headerDesc}>Explore ideas, trends, and behind-the-scenes stories from our studio.</p>
                  <button className={styles.contactBtn}>Contact now</button>
                </div>
             </div>
             
             <div className={styles.gridRow}>
               <div className={styles.leftCol}>
                 <FourDotsIcon />
                 <span>About service</span>
               </div>
               
               <div className={styles.middleCol}>
                  <div className={styles.conceptItem}>
                    <h4>Concept Development</h4>
                    <p>We started by capturing the essence of coastal life—light, air, and movement. The palette leaned into ocean blues, sandy neutrals, and breezy white finishes.</p>
                  </div>
                  <div className={styles.conceptItem}>
                    <h4>Concept Development</h4>
                    <p>We started by capturing the essence of coastal life—light, air, and movement. The palette leaned into ocean blues, sandy neutrals, and breezy white finishes.</p>
                  </div>
               </div>
               
               <div className={styles.rightCol}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/import-export-righy.avif" alt="Modern Office Detail" className={styles.officeImgSide} />
               </div>
             </div>
          </section>
        </SectionReveal>

        {/* What's Included Section */}
        <SectionReveal>
          <div className={styles.gridRow} style={{ padding: '6rem 0' }}>
            <div className={styles.leftCol}>
              <FourDotsIcon />
              <span>What&apos;s included</span>
            </div>
            <div className={`${styles.middleCol} ${styles.wideMiddleCol}`}>
              <WhatsIncluded />
            </div>
          </div>
        </SectionReveal>

        {/* Partners Section */}
        <SectionReveal>
          <div className={styles.gridRow} style={{ padding: '6rem 0', borderTop: '1px solid #eee' }}>
            <div className={styles.leftCol}>
              <FourDotsIcon />
              <span>Partners</span>
            </div>
            <div className={`${styles.middleCol} ${styles.wideMiddleCol}`}>
               <h3 className={styles.partnersTitle}>Our export import partners</h3>
               <div className={styles.logosRow}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://svgl.app/library/boltshift.svg" className={styles.logoItem} alt="Boltshift" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://svgl.app/library/logoipsum.svg" className={styles.logoItem} alt="Logoipsum" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://svgl.app/library/extrahop.svg" className={styles.logoItem} alt="Extrahop" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://svgl.app/library/framer.svg" className={styles.logoItem} alt="Framer" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://svgl.app/library/vercel_wordmark_dark.svg" className={styles.logoItem} alt="Vercel" />
               </div>
            </div>
          </div>
        </SectionReveal>

        {/* Harmony Section */}
        <SectionReveal>
          <section className={styles.servicesSection}>
             <div className={styles.servicesTop}>
               <div>
                 <span className={styles.sectionLabel}>Process</span>
                 <h2 className={styles.sectionTitle}>Design, Installation, and Support in Harmony</h2>
               </div>
               <button className={styles.moreDetailsBtn}>More Details</button>
             </div>
             
             <div className={styles.servicesCarousel}>
               <div className={styles.serviceCard}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=600&q=80" alt="Service" className={styles.serviceImage} />
                  <h5 className={styles.serviceTitle}>Interior Styling</h5>
               </div>
               <div className={styles.serviceCard}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&w=600&q=80" alt="Service" className={styles.serviceImage} />
                  <h5 className={styles.serviceTitle}>Quality Assurance</h5>
               </div>
               <div className={styles.serviceCard}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80" alt="Service" className={styles.serviceImage} />
                  <h5 className={styles.serviceTitle}>On-site Installation</h5>
               </div>
             </div>
          </section>
        </SectionReveal>

        {/* Insights Section */}
        <SectionReveal>
          <section className={styles.insightsSection}>
             <div className={styles.servicesTop}>
               <div>
                 <span className={styles.sectionLabel}>Global Reach</span>
                 <h2 className={styles.sectionTitle}>Insights that shape spaces</h2>
               </div>
               <button className={styles.moreDetailsBtn}>Details</button>
             </div>
             
             <WorldMap />

             <div className={styles.statsRow}>
               <div className={styles.statItem}>
                 <h2>15+</h2>
                 <p>Years of Experience</p>
               </div>
               <div className={styles.statItem}>
                 <h2>24/7</h2>
                 <p>Support Channels Available</p>
               </div>
               <div className={styles.statItem}>
                 <h2>1.8k+</h2>
                 <p>Successful Shipments</p>
               </div>
               <div className={styles.statItem}>
                 <h2>8k+</h2>
                 <p>Active Partnership Network</p>
               </div>
             </div>
          </section>
        </SectionReveal>

        {/* Shared FAQ Section */}
        <SectionReveal>
          <FaqSection />
        </SectionReveal>
      </main>

      <Footer />
    </div>
  );
}
