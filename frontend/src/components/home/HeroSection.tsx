'use client';

import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.heroWrapper}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/home-hero.webp" alt="Luxurious modern house exterior" className={styles.bgImage} />
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <motion.p 
          className={styles.hashtag}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          # Bringing Spaces to Life
        </motion.p>
        
        <h1 className={styles.title}>
          <div className={styles.lineOverflow}>
            <motion.span 
              className={styles.line}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              The Best Interior
            </motion.span>
          </div>
          <div className={styles.lineOverflow}>
            <motion.span 
              className={styles.line}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              Company in
            </motion.span>
          </div>
          <div className={styles.lineOverflow}>
            <motion.span 
              className={styles.line}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              Malaysia
            </motion.span>
          </div>
        </h1>

        <motion.button 
          className={styles.ctaButton}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Let's Talk Concepts
        </motion.button>
      </div>

      <motion.div 
        className={styles.bottomLeftWidget}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
      >
        <span className={styles.awardsLabel}>Awards:</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/award.png" alt="Award Excellence" className={styles.awardIcon} />
        <div className={styles.madeInFramer}>
          <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H14V7H7V14L0 7V0Z" fill="black"></path></svg>
          Made in Framer
        </div>
      </motion.div>
    </section>
  );
}
