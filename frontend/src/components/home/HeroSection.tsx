'use client';

import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.heroWrapper}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/hero_background.png" alt="Luxurious modern house exterior" className={styles.bgImage} />
      <div className={styles.overlay}></div>

      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <p className={styles.hashtag}># Bringing Spaces to Life</p>
        <h1 className={styles.title}>
          The Best Interior<br />
          Company in<br />
          Malaysia
        </h1>
        <button className={styles.ctaButton}>Let's Talk Concepts</button>
      </motion.div>

      <motion.div 
        className={styles.bottomLeftWidget}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
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
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <span className={styles.awardsLabel}>Awards:</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/award.png" alt="Award Excellence" className={styles.awardIcon} />
        
        <div className={styles.madeInTag}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 2 9 4.9V17L12 22l-9-4.9V7z"/>
          </svg>
          Made by Jade
        </div>
      </motion.div>
    </section>
  );
}
