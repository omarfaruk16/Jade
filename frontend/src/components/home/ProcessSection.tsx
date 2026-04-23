'use client';

import { motion } from 'framer-motion';
import { Play, Maximize2 } from 'lucide-react';
import styles from './ProcessSection.module.css';

export default function ProcessSection() {
  return (
    <section className={styles.processSection}>
      <motion.div 
        className={styles.videoContainer}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/f3.png" alt="Video thumbnail" className={styles.videoImg} />
        <div className={styles.playButtonWrapper}>
          <div className={styles.playIcon}>
            <Play fill="black" size={20} style={{ marginLeft: '4px' }} />
          </div>
          <span>Discover full video</span>
        </div>
      </motion.div>

      <div className={styles.contentRight}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Design, Installation, and Support in Harmony
        </motion.h2>

        <motion.div 
          className={styles.descRow}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className={styles.resonate}>(Resonate)</span>
          <p className={styles.description}>
            Every dream home begins with questions: Will this design fit my life? Will it be installed flawlessly? Will it last? At Jade, we remove doubt with clarity, precision, and lasting support — a journey from vision to peace of mind.
          </p>
          <button className={styles.quoteBtn}>Get a Quote</button>
        </motion.div>

        <div className={styles.cardsGrid}>
          {[
            { img: "https://i.pravatar.cc/100?img=1", text: "The Art of Understanding brings clarity in every detail." },
            { img: "https://i.pravatar.cc/100?img=2", text: "The Craft of Perfection delivers flawless lasting results." },
            { img: "https://i.pravatar.cc/100?img=3", text: "The Promise of Forever ensures trust that never fades." }
          ].map((card, idx) => (
            <motion.div 
              key={idx} 
              className={styles.miniCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + idx * 0.1 }}
            >
              <div className={styles.cardHeader}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.img} alt="Detail" />
                <Maximize2 size={16} color="#aaa" />
              </div>
              <p className={styles.miniCardText}>{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
