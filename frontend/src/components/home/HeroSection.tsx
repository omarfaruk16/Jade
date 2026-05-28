'use client';

import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';
import ScaleBlur from '../layout/ScaleBlur';

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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              # Bringing Spaces to Life
            </motion.p>
            
            <div style={{ overflow: 'hidden' }}>
              <h1 className={styles.title}>
                <ScaleBlur text="The Best Interior" stagger={0.03} delay={0} />
                <br />
                <ScaleBlur text="Company in" stagger={0.03} delay={0.5} />
                <br />
                <ScaleBlur text="Malaysia" stagger={0.03} delay={0.8} />
              </h1>
            </div>
          </div>

          <motion.button 
            className={styles.ctaButton}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            onClick={() => window.location.href='/contact'}
          >
            Let&apos;s Talk Concepts
          </motion.button>
        </div>

        <motion.div 
          className={styles.bottomLeftWidget}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
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
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        >
          <span className={styles.awardsLabel}>Awards:</span>
          {/* Award Excellence widget */}
          <img src="/images/award.png" alt="Award Excellence" className={styles.awardIcon} />
        </motion.div>
      </div>
    </section>
  );
}