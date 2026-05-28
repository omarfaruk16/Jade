'use client';

import Link from 'next/link';
import styles from './Footer.module.css';
import ScaleBlur from './ScaleBlur';

const DiamondStarIcon = () => (
  <span className={styles.diamondStar}>❖</span>
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* TOP ROW */}
        <div className={styles.topRow}>
          <div className={styles.brandInfo}>
            <Link href="/" className={styles.logo}>
              <span className={styles.jadeGreen}>J</span><span className={styles.jadeOrange}>ade</span>
            </Link>
            <p className={styles.tagline}>
              We transform your vision into<br />beautifully crafted spaces.
            </p>
          </div>
          
          <div className={styles.navLinks}>
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
          </div>
          
          <div className={styles.topRightIcon}>
            <DiamondStarIcon />
          </div>
        </div>

        {/* MIDDLE ROW */}
        <div className={styles.middleRow}>
          <p className={styles.phoneNumbers}>+603 8021 5168 &nbsp;|&nbsp; +6019 644 9447</p>
          <a href="mailto:jadekitchen@yahoo.com" className={styles.emailText}>
            <ScaleBlur text="jadekitchen@yahoo.com" className={styles.emailBlur} />
          </a>
        </div>

        {/* BOTTOM ROW */}
        <div className={styles.bottomRow}>
          
          <div className={styles.bottomLeft}>
            <div className={styles.policyLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms & Conditions</Link>
            </div>
            <p className={styles.copyright}>© 2025 All rights Reserved</p>
          </div>
          
          <div className={styles.address}>
            <p>No.17 Jalan USJ 1/33 Taman</p>
            <p>Perindustrian Subang Permai, 47500</p>
            <p>Subang Jaya Selangor.</p>
          </div>
          
          {/* Mobile only elements or placeholder */}
          <div className={styles.bottomRight}>
            <div className={styles.mobileDiamondIcon}>
              <DiamondStarIcon />
            </div>
          </div>

        </div>

        {/* DEVELOPED BY BRAND SIGNATURE */}
        <div className={styles.developerSignature}>
          <span>Developed by:</span>
          <a href="https://1spotsolution.com" target="_blank" rel="noopener noreferrer" className={styles.devLogoLink}>
            <img src="/images/1spotsolution-logo.webp" alt="1spot solution logo" className={styles.devLogo} />
          </a>
        </div>

      </div>
    </footer>
  );
}