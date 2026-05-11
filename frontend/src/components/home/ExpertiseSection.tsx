'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import Link from 'next/link';
import styles from './ExpertiseSection.module.css';

import TitleReveal from '@/components/layout/TitleReveal';

import SectionReveal from '@/components/layout/SectionReveal';

const expertiseItems = [
  { 
    id: '01', 
    title: 'Residential Interior Design', 
    sub: 'Elegant, livable spaces', 
    img: '/images/bg-2.avif',
    stat: '80+',
    statSub: '/ Tailored home environments',
    desc: "We're a design-driven team creating spaces with purpose, personality, and precision—built through collaboration."
  },
  { 
    id: '02', 
    title: 'Commercial Interior Design', 
    sub: 'Branded environments that work', 
    img: '/images/home-2.avif',
    stat: '50+',
    statSub: '/ Commercial spaces delivered',
    desc: "We design branded environments that foster productivity, culture, and business success."
  },
  { 
    id: '03', 
    title: 'Custom Furniture & OEM Solutions', 
    sub: 'Structural design with depth', 
    img: '/images/home-3.avif',
    stat: '10k+',
    statSub: '/ Custom pieces crafted',
    desc: "Tailor-made furniture and OEM solutions built with structural integrity and material honesty."
  },
  { 
    id: '04', 
    title: 'Design Curation & Consultancy', 
    sub: 'Curated design layers', 
    img: '/images/home-1.avif',
    stat: '120+',
    statSub: '/ Successful consultations',
    desc: "Expert guidance in selecting and curating elements that perfectly complement your architectural vision."
  },
];

export default function ExpertiseSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setActiveId(prev => prev === id ? null : id);
  };

  return (
    <SectionReveal>
<section className={styles.expertiseSection}>
      <div className="jade-container">
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our expertise
          </motion.h2>
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            We offer a full spectrum of interior design — each tailored to elevate spaces with clarity and timeless aesthetic value.
          </motion.p>
        </div>
        <div className={styles.headerRight}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.7 }}>
            <circle cx="12" cy="6" r="1.5" fill="white"/>
            <circle cx="12" cy="18" r="1.5" fill="white"/>
            <circle cx="6" cy="12" r="1.5" fill="white"/>
            <circle cx="18" cy="12" r="1.5" fill="white"/>
          </svg>
        </div>
      </div>

      <div className={styles.list}>
        {expertiseItems.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <div key={item.id} className={styles.listItemWrapper}>
              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.div 
                    key="expanded"
                    className={`${styles.listItem} ${styles.expanded}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.number}>{item.id}</div>
                    
                    <div className={styles.expandedImageWrapper}>
                      <img src={item.img} alt={item.title} />
                    </div>

                    <div className={styles.expandedContent}>
                      <div className={styles.contentTop}>
                        <TitleReveal><h3 className={styles.itemTitle}>{item.title}</h3></TitleReveal>
                        <p className={styles.itemSub}>{item.sub}</p>
                      </div>
                      
                      <div className={styles.contentMiddle}>
                        <h4 className={styles.statValue}>{item.stat}</h4>
                        <span className={styles.statSub}>{item.statSub}</span>
                      </div>
                      
                      <div className={styles.contentBottom}>
                        <p className={styles.descText}>{item.desc}</p>
                      </div>
                    </div>

                    <div className={styles.actionsColumn}>
                      <button className={styles.iconBtn} onClick={() => toggleItem(item.id)}>
                        <X size={20} />
                      </button>
                      <Link href="/services" className={styles.learnMoreBtn}>
                        Learn more
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="collapsed"
                    className={`${styles.listItem} ${styles.collapsed}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => toggleItem(item.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={styles.number}>{item.id}</div>
                    <div className={styles.thumbnail}>
                      <img src={item.img} alt={item.title} />
                    </div>
                    <div className={styles.content}>
                      <TitleReveal><h3 className={styles.itemTitle}>{item.title}</h3></TitleReveal>
                      <p className={styles.itemSub}>{item.sub}</p>
                    </div>
                    <div className={styles.iconBtnWrapper}>
                      <button className={styles.iconBtn}>
                        <Plus size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      </div>
    </section>
</SectionReveal>
  );
}
