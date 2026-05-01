'use client';

import { motion } from 'framer-motion';
import styles from './DifferenceSection.module.css';

export default function DifferenceSection() {
  return (
    <section className={styles.section}>
      <div className={styles.overlay}></div>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.title}>We make the difference in your space.</h2>
      </motion.div>
    </section>
  );
}
