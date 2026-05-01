'use client';

import { useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './ImportExport.module.css';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WorldMap from '@/components/home/WorldMap';

export default function ImportExportPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/faq`)
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(console.error);
  }, []);

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.heroTitle}
          >
            Worldwide Export Import
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={styles.heroSubtitle}
          >
            Authentic design pieces sourced from around the globe, 
            bringing architecture and interior excellence to your doorstep.
          </motion.p>
        </div>
      </section>

      <main className={styles.container}>
        {/* Intro Section */}
        <motion.section 
          className={styles.introSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className={styles.introText}>
            Our collection hits a transition point between aesthetics, emphasizing simplicity, 
            functionality, and nature beauty. The design combines muted color palettes such as 
            whites, grays, and soft pastels with warm wooden accents to create a cozy and inviting environment.
          </p>
          <div className={styles.profileBadge}>
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80" alt="Avatar" className={styles.profileAvatar} />
             <div className={styles.profileInfo}>
                <span className={styles.profileName}>Wolfgang Adam</span>
                <span className={styles.profileRole}>Exports Director</span>
             </div>
          </div>
        </motion.section>

        {/* Office Design Section */}
        <motion.section 
          className={styles.officeSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
           <div className={styles.officeHeader}>
             <div>
               <span className={styles.sectionLabel}>Solutions</span>
               <h2 className={styles.sectionTitle}>Office Design</h2>
             </div>
             <button className={styles.moreDetailsBtn}>More Details</button>
           </div>
           
           <div className={styles.officeGrid}>
             <div className={styles.officeTextContent}>
                <div className={styles.officeSubitem}>
                  <h4>Global Hub Network</h4>
                  <p>Our strategically located centers in Milan, New York, and Tokyo handle the most exquisite interior assets.</p>
                </div>
                <div className={styles.officeSubitem}>
                  <h4>White-Glove Logistics</h4>
                  <p>End-to-end supply chain management with customs clearance, secure packaging, and doorstep delivery worldwide.</p>
                </div>
             </div>
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80" alt="Modern Office" className={styles.officeImgSide} />
           </div>
        </motion.section>

        {/* Quotes Section */}
        <section className={styles.quotesGrid}>
          {[
            { text: "Quality is not an act, it is a habit that transforms spaces into legacies.", colored: true },
            { text: "Excellent service and global logistics that never fail to deliver on time.", colored: false },
            { text: "Hand-picked materials that elevate our commercial projects to new heights.", colored: false },
            { text: "Sensible design curation with a deep understanding of global trends and local needs.", colored: false }
          ].map((quote, i) => (
            <motion.div 
              key={i}
              className={`${styles.quoteCard} ${quote.colored ? styles.quoteCardColored : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
               <span className={styles.quoteIcon}>&ldquo;</span>
               <p className={styles.quoteText}>{quote.text}</p>
            </motion.div>
          ))}
        </section>

        {/* Logos Row */}
        <motion.div 
          className={styles.logosRow}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2880px-Google_2015_logo.svg.png" className={styles.logoItem} alt="Google" />
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png" className={styles.logoItem} alt="IBM" />
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" className={styles.logoItem} alt="Amazon" />
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png" className={styles.logoItem} alt="Samsung" />
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Intel_logo_%282020%2C_light_blue%29.svg/2560px-Intel_logo_%282020%2C_light_blue%29.svg.png" className={styles.logoItem} alt="Intel" />
        </motion.div>

        {/* Harmony Section */}
        <motion.section 
          className={styles.servicesSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
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
        </motion.section>

        {/* Insights Section */}
        <motion.section 
          className={styles.insightsSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
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
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          className={styles.faqCardSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.faqHeaderCard}>
            <h2 className={styles.faqTitleCard}>Answers that bring clarity</h2>
            <p className={styles.faqSubtitleCard}>We&apos;ve answered the most common questions to help you move forward.</p>
          </div>

          <div className={styles.faqSplitCard}>
            <div className={styles.faqListCard}>
              {faqs.map((faq) => (
                <div key={faq.id} className={styles.faqItemCard}>
                  <button 
                    className={styles.faqTriggerCard}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span>{faq.question}</span>
                    {activeFaq === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {activeFaq === faq.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={styles.faqContentCard}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            
            <div className={styles.faqImageWrapCard}>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img 
                 src="/images/contact_faq_team.png" 
                 alt="Team working" 
                 className={styles.faqRightImage}
               />
               <div className={styles.faqOverlay}>
                  <div className={styles.overlayIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C12.5523 2 13 2.44772 13 3V10H20C20.5523 10 21 10.4477 21 11C21 11.5523 20.5523 12 20 12H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V12H4C3.44772 12 3 11.5523 3 11C3 10.4477 3.44772 10 4 10H11V3C11 2.44772 11.4477 2 12 2Z" fill="white"/>
                    </svg>
                  </div>
                  <h4>Still have a question in mind?</h4>
                  <a href="/contact" className={styles.faqContactBtn}>Contact Us</a>
               </div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
