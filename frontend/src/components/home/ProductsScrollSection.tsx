'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import API_BASE from '@/lib/api';
import styles from './ProductsScrollSection.module.css';

import SectionReveal from '@/components/layout/SectionReveal';

export default function ProductsScrollSection() {
  const [categories, setCategories] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_BASE}/products/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!scrollRef.current || categories.length === 0) return;

    const container = scrollRef.current;

    const scrollInterval = setInterval(() => {
      // Calculate max scroll left
      const maxScroll = container.scrollWidth - container.clientWidth;

      // If we've reached the end, scroll back to start, else scroll right by card width
      if (container.scrollLeft >= maxScroll - 10) { // -10px threshold for rounding
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Find width of one card + gap roughly (assuming cards are ~45% width + gap)
        const scrollAmount = container.clientWidth * 0.45;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 2000); // 2 seconds

    return () => clearInterval(scrollInterval);
  }, [categories]);

  return (
    <SectionReveal>
      <section className={styles.scrollContainer}>
        <div className={styles.stickySection}>

          <div className={styles.cardsWrapper} ref={scrollRef}>
            {Array.isArray(categories) && categories.map((cat, idx) => {
              // Using placeholder dates to match exact design in screenshot
              const dates = ["Jun 11, 2025", "Jun 4, 2025", "Jun 13, 2025", "Jul 1, 2025"];
              return (
                <Link href={`/products/${cat.slug}`} key={cat.id} className={styles.card}>
                  <motion.div
                    className={styles.imageContainer}
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
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
    </SectionReveal>
  );
}
