'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './Footer.module.css';
import ScaleBlur from './ScaleBlur';
import API_BASE from '@/lib/api';

export default function Footer() {
  const [socials, setSocials] = useState<{ id: number; name: string; url: string }[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/contact`)
      .then(res => res.json())
      .then(data => setSocials(data?.socials ?? []))
      .catch(() => {});
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* TOP ROW */}
        <div className={`${styles.gridRow} ${styles.top}`}>
          <div className={styles.colLeft}>
            <div className={styles.brandInfo}>
              <Link href="/" className={styles.logo}>
                <Image src="/images/jadelogo.png" alt="Jade" className={styles.logoImg} />
              </Link>
              <p className={styles.tagline}>
                We transform your vision into<br />beautifully crafted spaces.
              </p>
            </div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.navLinks}>
              <Link href="/">Home</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/about">About us</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className={styles.topRightIcon}>
              {socials.map(s => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>{s.name}</a>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className={styles.middleSection}>
          {/* PHONE NUMBERS ALIGNED WITH RIGHT COLUMN */}
          <div className={styles.gridRow}>
            <div className={styles.colLeft}></div>
            <div className={styles.colRight}>
              <p className={styles.phoneNumbers}>
                <ScaleBlur text="+603 8021 5168 | +6019 644 9447" className={styles.phoneBlur} />
              </p>
            </div>
          </div>

          {/* MIDDLE EMAIL ROW */}
          <div className={styles.emailContainer}>
            <a href="mailto:jadekitchen@yahoo.com" className={styles.emailText}>
              <ScaleBlur text="jadekitchen@yahoo.com" className={styles.emailBlur} />
            </a>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className={`${styles.gridRow} ${styles.bottom}`}>
          <div className={styles.colLeft}>
            <div className={styles.policyLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms & Conditions</Link>
            </div>
            <p className={styles.copyright}>© 2026 All rights Reserved</p>
          </div>

          <div className={styles.colRightBottom}>
            <div className={styles.addressSection}>
              <div className={styles.address}>
                <p>No.17 Jalan USJ 1/33 Taman</p>
                <p>Perindustrian Subang Permai, 47500</p>
                <p>Subang Jaya Selangor.</p>
              </div>
            </div>

            <div className={styles.bottomRight}>
              <div className={styles.developerSignature}>
                <span>Made by:</span>
                <a href="https://www.grafinut.com" target="_blank" rel="noopener noreferrer" className={styles.devLogoLink}>
                  <img src="/images/GRAFINUT.png" alt="1spot solution logo" className={styles.devLogo} />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}