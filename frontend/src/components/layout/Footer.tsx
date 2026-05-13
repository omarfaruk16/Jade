import Link from 'next/link';
import styles from './Footer.module.css';

const FourDotsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="6" r="2.5" fill="#fff"/>
    <circle cx="12" cy="18" r="2.5" fill="#fff"/>
    <circle cx="6" cy="12" r="2.5" fill="#fff"/>
    <circle cx="18" cy="12" r="2.5" fill="#fff"/>
  </svg>
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
            <FourDotsIcon />
          </div>
        </div>

        {/* MIDDLE ROW */}
        <div className={styles.middleRow}>
          <p className={styles.phoneNumbers}>+603 8021 5168 &nbsp;|&nbsp; +6019 644 9447</p>
          <a href="mailto:jadekitchen@yahoo.com" className={styles.emailText}>jadekitchen@yahoo.com</a>
        </div>

        {/* MOBILE ONLY ADDRESS (Shows before Bottom Row on Mobile) */}
        <div className={styles.mobileAddress}>
          <p>No.17 Jalan USJ 1/33 Taman</p>
          <p>Perindustrian Subang Permai, 47500</p>
          <p>Subang Jaya Selangor.</p>
        </div>

        {/* BOTTOM ROW */}
        <div className={styles.bottomRow}>
          
          <div className={styles.bottomLeft}>
            <div className={styles.desktopPolicyLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms & Conditions</Link>
            </div>
            <p className={styles.copyright}>© 2025 All rights Reserved</p>
            
            <div className={styles.mobilePolicyLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms & Conditions</Link>
            </div>
          </div>
          
          <div className={styles.desktopAddress}>
            <p>No.17 Jalan USJ 1/33 Taman</p>
            <p>Perindustrian Subang Permai, 47500</p>
            <p>Subang Jaya Selangor.</p>
          </div>
          
          <div className={styles.bottomRight}>
            <div className={styles.mobileFourDots}>
              <FourDotsIcon />
            </div>
            <div className={styles.madeBy}>
              <span>Made by:</span>
              <div className={styles.grafinutLogo}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H10V10H4V4Z" fill="#2563EB"/>
                  <path d="M14 4H20V10H14V4Z" fill="#60A5FA"/>
                  <path d="M4 14H10V20H4V14Z" fill="#3B82F6"/>
                </svg>
                <strong>GRAFINUT</strong>
              </div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
