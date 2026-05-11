'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import Link from 'next/link';
import API_BASE from '@/lib/api';
import styles from './CategoriesSection.module.css';

import TitleReveal from '@/components/layout/TitleReveal';

import SectionReveal from '@/components/layout/SectionReveal';

export default function CategoriesSection() {
  const [categories, setCategories] = useState<any[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    fetch(`${API_BASE}/services/children`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(console.error);
  }, []);

  const toggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SectionReveal>
<section className={styles.section}>
      <div className="jade-container">
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our expertise
          </motion.h2>
          <FourDotsIcon />
        </div>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          We offer a full spectrum of interior design — each tailored to elevate spaces with clarity and timeless aesthetic value.
        </motion.p>
      </div>

      <motion.div 
        className={styles.list}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {Array.isArray(categories) && categories.map((cat, index) => {
          const isExpanded = expandedIndex === index;
          const displayNum = (index + 1).toString().padStart(2, '0');

          return (
            <div key={cat.id} className={styles.rowWrapper}>
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div 
                    key="expanded"
                    className={styles.expandedRow}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className={styles.number}>{displayNum}</span>
                    <div className={styles.largeThumb}>
                      <img src={cat.coverImage || '/images/home-hero.webp'} alt={cat.name} />
                    </div>
                    <div className={styles.expandedInfo}>
                      <div className={styles.topRow}>
                        <div>
                          <TitleReveal><h3 className={styles.expandedTitle}>{cat.name}</h3></TitleReveal>
                          <p className={styles.expandedSubtitle}>{cat.subtitle || 'Elegant, livable spaces'}</p>
                        </div>
                        <button className={styles.iconBtn} onClick={() => toggle(index)}>
                          <X size={20} />
                        </button>
                      </div>
                      
                      <div className={styles.middleRow}>
                        <h4 className={styles.statsNumber}>{cat.statsNumber || '80+'}</h4>
                        <p className={styles.statsText}>{cat.statsText || '/ Tailored home environments'}</p>
                      </div>

                      <div className={styles.bottomRow}>
                        <p className={styles.description}>
                          {cat.description || 'We create refined, functional interiors that reflect your lifestyle—balancing comfort, sophistication, and thoughtful material choices.'}
                        </p>
                        <Link href={`/services/${cat.slug}`} className={styles.learnMoreBtn}>
                          Learn more
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="collapsed"
                    className={styles.collapsedRow}
                    onClick={() => toggle(index)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className={styles.number}>{displayNum}</span>
                    <div className={styles.smallThumb}>
                      <img src={cat.coverImage || '/images/home-hero.webp'} alt={cat.name} />
                    </div>
                    <div className={styles.collapsedInfo}>
                      <TitleReveal><h3 className={styles.collapsedTitle}>{cat.name}</h3></TitleReveal>
                      <p className={styles.collapsedSubtitle}>{cat.subtitle || 'Elegant, livable spaces'}</p>
                    </div>
                    <button className={styles.iconBtn}>
                      <Plus size={20} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
      </div>
    </section>
</SectionReveal>
  );
}

const FourDotsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.cornerIcon}>
    <circle cx="12" cy="4" r="2" fill="white"/>
    <circle cx="12" cy="20" r="2" fill="white"/>
    <circle cx="4" cy="12" r="2" fill="white"/>
    <circle cx="20" cy="12" r="2" fill="white"/>
  </svg>
);
