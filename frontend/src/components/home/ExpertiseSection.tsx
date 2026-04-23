'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import styles from './ExpertiseSection.module.css';

const expertiseItems = [
  { id: '01', title: 'Residential Interior Design', sub: 'Elegant, livable spaces', img: '/images/f3.png' },
  { id: '02', title: 'Commercial Interior Design', sub: 'Branded environments that work', img: '/images/f1.png' },
  { id: '03', title: 'Custom Furniture & OEM Solutions', sub: 'Structural design with depth', img: '/images/f2.png' },
  { id: '04', title: 'Design Curation & Consultancy', sub: 'Curated artistic approach', img: '/images/f1.png' },
];

export default function ExpertiseSection() {
  return (
    <section className={styles.expertiseSection}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.title}>Our expertise</h2>
        <p className={styles.description}>
          We offer a full spectrum of interior design — each tailored to elevate spaces with clarity and timeless aesthetic value.
        </p>
      </motion.div>

      <div className={styles.list}>
        {expertiseItems.map((item, index) => (
          <motion.div 
            key={item.id} 
            className={styles.listItem}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={styles.number}>{item.id}</div>
            <div className={styles.thumbnail}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt={item.title} />
            </div>
            <div className={styles.content}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemSub}>{item.sub}</p>
            </div>
            <div className={styles.iconBtn}>
              <Plus size={20} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
