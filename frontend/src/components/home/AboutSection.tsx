'use client';

import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.header}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Jade blends calm and character —<br />
          creating beautifully crafted interiors.
        </motion.h2>
        <motion.div 
          className={styles.headerRight}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className={styles.subtitle}>
            At Jade, we craft interiors that blend calm elegance with bold character using premium materials and timeless design to create spaces that feel as good as they look.
          </p>
          <button className={styles.getToKnowBtn}>Get to Know Us</button>
        </motion.div>
      </div>

      <div className={styles.grid}>
        {/* Column 1: Mission statement span 2 rows */}
        <motion.div 
          className={`${styles.card} ${styles.missionCard}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className={styles.missionText}>
            Our mission is to create exceptional, personalized spaces that truly reflect the vision and aspirations of our clients. Every project is a testament to our dedication to craftsmanship and design excellence.
          </p>
          <div className={styles.founder}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.pravatar.cc/100?img=11" alt="Dr. Shiful Islam" className={styles.founderImg} />
            <div className={styles.founderInfo}>
              <h4>Dr. Shiful Islam</h4>
              <p>Founder & CEO</p>
            </div>
          </div>
        </motion.div>

        {/* Column 2 */}
        <motion.div className={`${styles.card} ${styles.imageCard} ${styles.cImg1}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/f1.png" alt="Cabinet design" />
        </motion.div>
        <motion.div className={`${styles.card} ${styles.textCard} ${styles.cText2}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className={styles.cardNumber}><span>02</span> <Maximize2 size={16} /></div>
          <h3 className={styles.cardTitle}>Whispered Elegance in Timeless Wood</h3>
          <p className={styles.cardDesc}>Each grain of wood tells a story of nature and heritage. Designed with intention, our work brings quiet beauty to every corner of your space.</p>
        </motion.div>

        {/* Column 3 */}
        <motion.div className={`${styles.card} ${styles.textCard} ${styles.cText1}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className={styles.cardNumber}><span>01</span> <Maximize2 size={16} /></div>
          <h3 className={styles.cardTitle}>Royal Reverie in Every Cabinet</h3>
          <p className={styles.cardDesc}>Step into a home that feels like royalty. Every piece is crafted with regal elegance, blending timeless craftsmanship with luxurious beauty.</p>
        </motion.div>
        <motion.div className={`${styles.card} ${styles.imageCard} ${styles.cImg2}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/f2.png" alt="Orange Sink design" />
        </motion.div>

        {/* Column 4 */}
        <motion.div className={`${styles.card} ${styles.imageCard} ${styles.cImg3}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/f3.png" alt="Concrete interior" />
        </motion.div>
        <motion.div className={`${styles.card} ${styles.textCard} ${styles.cText3}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className={styles.cardNumber}><span>03</span> <Maximize2 size={16} /></div>
          <h3 className={styles.cardTitle}>Dreamscape of Sculpted Spaces</h3>
          <p className={styles.cardDesc}>Our designs transform spaces into sculptural experiences where light, texture, and form unite, creating a home that feels surreal and uniquely yours.</p>
        </motion.div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <h3>15+</h3>
          <p>Years of market expertise.</p>
        </div>
        <div className={styles.statItem}>
          <h3>2-7</h3>
          <p>Delivery Fast, reliable service.</p>
        </div>
        <div className={styles.statItem}>
          <h3>1.6k+</h3>
          <p>Clients Exceptional service.</p>
        </div>
        <div className={styles.statItem}>
          <h3>8k+</h3>
          <p>Projects Completed — Quality work.</p>
        </div>
      </div>
    </section>
  );
}
