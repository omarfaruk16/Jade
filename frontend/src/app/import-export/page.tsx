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

import TitleReveal from '@/components/layout/TitleReveal';

export default function ImportExportPage() {


  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* Hero Section */}
      <SectionReveal>
<section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
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
</SectionReveal>

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
                <TitleReveal><h2 className={styles.sectionTitle}>Office Design</h2></TitleReveal>
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
               <TitleReveal><h3 className={styles.partnersTitle}>Our export import partners</h3></TitleReveal>
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
          <div className={styles.gridRow} style={{ padding: '6rem 0', borderTop: '1px solid #eee' }}>
            <div className={styles.leftCol}>
              <FourDotsIcon />
              <span>Process</span>
            </div>
            <div className={`${styles.middleCol} ${styles.wideMiddleCol}`}>
               <div className={styles.servicesTop}>
                 <TitleReveal><h2 className={styles.sectionTitle}>Design, Installation, and Support in Harmony</h2></TitleReveal>
                 <button className={styles.moreDetailsBtn}>More Details</button>
               </div>
               
               <div className={styles.accordionList}>
                 {[
                   { img: '/images/f1.png', text: 'The Art of Understanding brings clarity in every detail.' },
                   { img: '/images/f2.png', text: 'The Craft of Perfection delivers flawless lasting results.' },
                   { img: '/images/f3.png', text: 'The Promise of Forever ensures trust that never fades.' }
                 ].map((item, idx) => (
                   <div key={idx} className={styles.accordionItem}>
                     <div className={styles.accordionItemLeft}>
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={item.img} alt="Accordion thumb" className={styles.accordionThumb} />
                       <span className={styles.accordionText}>{item.text}</span>
                     </div>
                     <ChevronDown size={20} className={styles.accordionIcon} />
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </SectionReveal>

        {/* Insights Section */}
        <SectionReveal>
          <div className={styles.gridRow} style={{ padding: '6rem 0', borderTop: '1px solid #eee' }}>
            <div className={styles.leftCol}></div>
            <div className={`${styles.middleCol} ${styles.wideMiddleCol}`}>
               <div className={styles.servicesTop}>
                 <TitleReveal><h2 className={styles.sectionTitle}>Insights that shape spaces</h2></TitleReveal>
                 <button className={styles.contactBtn}>Details</button>
               </div>
               
               <WorldMap />

               <div className={styles.statsRow}>
                 <div className={styles.statItem}>
                   <TitleReveal><h2>15+</h2></TitleReveal>
                   <p>Years of Experience</p>
                 </div>
                 <div className={styles.statItem}>
                   <TitleReveal><h2>24/7</h2></TitleReveal>
                   <p>Support Channels Available</p>
                 </div>
                 <div className={styles.statItem}>
                   <TitleReveal><h2>1.8k+</h2></TitleReveal>
                   <p>Successful Shipments</p>
                 </div>
                 <div className={styles.statItem}>
                   <TitleReveal><h2>8k+</h2></TitleReveal>
                   <p>Active Partnership Network</p>
                 </div>
               </div>
            </div>
          </div>
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

const FourDotsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 12 }}>
    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
    <circle cx="16" cy="8" r="1.5" fill="currentColor"/>
    <circle cx="8" cy="16" r="1.5" fill="currentColor"/>
    <circle cx="16" cy="16" r="1.5" fill="currentColor"/>
  </svg>
);
