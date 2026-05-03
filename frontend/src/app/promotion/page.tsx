'use client';

import { useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionReveal from '@/components/layout/SectionReveal';
import styles from './Promotion.module.css';

export default function PromotionPage() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/promotions`)
      .then(res => res.json())
      .then(data => {
        setPromotions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <section className={styles.heroSection}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className={styles.pageTitle}
        >
          Special Promotions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className={styles.pageSubtitle}
        >
          Exclusive offers and seasonal collections curated for modern living.
        </motion.p>
      </section>

      <SectionReveal>
        <div className={styles.contentContainer}>
          {loading ? (
            <div className={styles.loadingContainer}>Loading offers...</div>
          ) : (
            <div className={styles.promotionGrid}>
              {promotions.map((promo, i) => (
                <motion.div
                  key={promo.id}
                  className={styles.promoCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1 }}
                >
                  <div className={styles.imageWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={promo.image} alt={promo.title} className={styles.promoImage} />
                  </div>
                  <div className={styles.promoInfo}>
                    <h3 className={styles.promoTitle}>{promo.title}</h3>
                    <button className={styles.viewButton}>Get it now</button>
                  </div>
                </motion.div>
              ))}

              {promotions.length === 0 && !loading && (
                <div className={styles.emptyState}>No active promotions at the moment. Check back soon!</div>
              )}
            </div>
          )}
        </div>
      </SectionReveal>

      <Footer />
    </div>
  );
}
