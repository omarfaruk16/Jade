'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import styles from './ProcessSection.module.css';

export default function ProcessSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* LEFT SIDE: Video */}
        <motion.div 
          className={styles.leftColumn}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.videoWrapper} onClick={() => setIsVideoOpen(true)}>
            <img src="/images/video-cover-image.avif" alt="Video cover" className={styles.videoCover} />
            <div className={styles.playButton}>
              <div className={styles.playIconWrapper}>
                <Play fill="black" size={20} style={{ marginLeft: '4px' }} />
              </div>
              <span className={styles.playText}>Discover full video</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <div className={styles.rightColumn}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Design, Installation, and Support in Harmony
          </motion.h2>
          
          <motion.div 
            className={styles.textRow}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className={styles.textLabel}>(Resonate)</div>
            <div className={styles.textBody}>
              Every dream home begins with questions: Will this design fit my life? Will it be installed flawlessly? Will it last? At Jade, we remove doubt with clarity, precision, and lasting support — a journey from vision to peace of mind.
            </div>
            <div className={styles.buttonWrapper}>
              <button className={styles.quoteBtn}>Get a Quote</button>
            </div>
          </motion.div>

          <div className={styles.cardsRow}>
            {[
              {
                img: '/images/f1.png',
                text: 'The Art of Understanding brings clarity in every detail.'
              },
              {
                img: '/images/f2.png',
                text: 'The Craft of Perfection delivers flawless lasting results.'
              },
              {
                img: '/images/f3.png',
                text: 'The Promise of Forever ensures trust that never fades.'
              }
            ].map((card, idx) => (
              <motion.div 
                key={idx} 
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
              >
                <div className={styles.cardHeader}>
                  <img src={card.img} alt="Card Thumbnail" className={styles.cardThumb} />
                  <FourDotsIcon />
                </div>
                <p className={styles.cardText}>{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            className={styles.videoModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <button className={styles.closeBtn} onClick={() => setIsVideoOpen(false)}>
              <X size={24} />
            </button>
            <motion.div 
              className={styles.videoContainer}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <video 
                src="/images/download.mp4" 
                controls 
                autoPlay 
                className={styles.videoElement}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const FourDotsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.7 }}>
    <circle cx="12" cy="6" r="1.5" fill="black"/>
    <circle cx="12" cy="18" r="1.5" fill="black"/>
    <circle cx="6" cy="12" r="1.5" fill="black"/>
    <circle cx="18" cy="12" r="1.5" fill="black"/>
  </svg>
);
