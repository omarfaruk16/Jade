'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import API_BASE from '@/lib/api';
import styles from './ProductsScrollSection.module.css';

export default function ProductsScrollSection() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/products/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(console.error);
  }, []);

  return (
    <section className={styles.scrollContainer}>
      <div className={styles.stickySection}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.headerText}>
              Each project is a reflection of our design philosophy—<br />
              intentional, timeless, and tailored.
            </p>
          </div>
          <div className={styles.brandLogos}>
            <div className={styles.logoItem}>
              <svg width="60" height="20" viewBox="0 0 100 30" fill="currentColor"><path d="M0 15L15 0H40L25 15H0Z" /><path d="M45 15L60 0H100L85 15H45Z" /></svg>
            </div>
            <div className={styles.logoItem}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
            </div>
            <span className={styles.logoText}>DAIKIN</span>
          </div>
        </div>

        <div className={styles.cardsWrapper}>
          {categories.map((cat, idx) => {
            // Using placeholder dates to match exact design in screenshot
            const dates = ["Jun 11, 2025", "Jun 4, 2025", "Jun 13, 2025", "Jul 1, 2025"];
            return (
              <Link href={`/products/${cat.slug}`} key={cat.id} className={styles.card}>
                <motion.div
                  className={styles.imageContainer}
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: idx * 0.15 }}
                >
                  <img src={cat.image || '/images/home-hero.webp'} alt={cat.name} className={styles.cardImage} />
                </motion.div>
                <div className={styles.cardFooter}>
                  <span className={styles.cardTitle}>{cat.name}</span>
                  <span className={styles.cardDate}>{dates[idx % dates.length]}</span>
                </div>
              </Link>
            );
          })}

          {categories.length === 0 && (
            <div className={styles.card}>
              <div className={styles.imageContainer}>
                <img src="/images/home-hero.webp" alt="Fallback" className={styles.cardImage} />
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.cardTitle}>Loading Categories...</span>
                <span className={styles.cardDate}>Please wait</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
