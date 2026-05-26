'use client';

import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home-hero.webp" alt="Luxurious modern house exterior" className={styles.bgImage} />
        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <motion.p 
              className={styles.hashtag}
              initial={{ opacity: 0.001, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 30, delay: 0.2 }}
            >
              # Bringing Spaces to Life
            </motion.p>
            
            <motion.h1 
              className={styles.title}
              initial={{ opacity: 0.001, y: 20, scale: 1.05 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 160, damping: 30, delay: 0.3 }}
            >
              The Best Interior Company in Malaysia
            </motion.h1>
          </div>

          <motion.button 
            className={styles.ctaButton}
            initial={{ opacity: 0.001, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 30, delay: 0.5 }}
            onClick={() => window.location.href='/contact'}
          >
            Let&apos;s Talk Concepts
          </motion.button>
        </div>

        <motion.div 
          className={styles.bottomLeftWidget}
          initial={{ opacity: 0.001, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 30, delay: 0.7 }}
        >
          <div className={styles.avatars}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.pravatar.cc/100?img=33" alt="Client 1" className={styles.avatar} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.pravatar.cc/100?img=47" alt="Client 2" className={styles.avatar} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.pravatar.cc/100?img=12" alt="Client 3" className={styles.avatar} />
          </div>
          <div className={styles.trustText}>
            <strong>Trusted by over</strong>
            1.6K+ Clients
          </div>
        </motion.div>

        <motion.div 
          className={styles.bottomRightWidget}
          initial={{ opacity: 0.001, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 30, delay: 0.8 }}
        >
          <span className={styles.awardsLabel}>Awards:</span>
          {/* Award Excellence widget */}
          <img src="/images/award.png" alt="Award Excellence" className={styles.awardIcon} />
        </motion.div>
      </div>
    </section>
  );
}