'use client';

import { useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring" as const,
        stiffness: 100,
        damping: 20
      } 
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <section className={styles.heroSection}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.pageTitle}
        >
          Special Promotions
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={styles.pageSubtitle}
        >
          Exclusive offers and seasonal collections curated for modern living.
        </motion.p>
      </section>

      <div className={styles.contentContainer}>
        {loading ? (
          <div className={styles.loadingContainer}>Loading offers...</div>
        ) : (
          <motion.div 
            className={styles.promotionGrid}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {promotions.map((promo) => (
              <motion.div key={promo.id} className={styles.promoCard} variants={itemVariants}>
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
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}
