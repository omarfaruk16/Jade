'use client';

import styles from './LogoMarquee.module.css';
import { partnerLogos } from '@/lib/logos';

const logos = partnerLogos.map((src, i) => ({ src, alt: `Partner Logo ${i + 1}` }));

export default function LogoMarquee() {
  return (
    <div className={styles.gridContainer}>
      {logos.map((logo, index) => (
        <div key={index} className={styles.logoItem}>
          <img
            src={logo.src}
            alt={logo.alt}
            className={styles.logoImage}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
