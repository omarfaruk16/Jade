'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUp, ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.footerLogo}>
              <span>J</span><span>ade</span>
            </Link>
            <p className={styles.brandTagline}>
              Crafting timeless interiors and architectural masterpieces that transform spaces into living art. 
              Premium design, global reach.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <div className={styles.linksList}>
              <Link href="/projects">Projects</Link>
              <Link href="/services">Services</Link>
              <Link href="/products">Products</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          {/* More Links */}
          <div>
            <h4 className={styles.colTitle}>Explore</h4>
            <div className={styles.linksList}>
              <Link href="/promotion">Promotions</Link>
              <Link href="/import-export">Export / Import</Link>
              <Link href="/dealer">Be a Dealer</Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className={styles.colTitle}>Get in Touch</h4>
            <div className={styles.contactItem}>
              <MapPin size={16} />
              <span>123 Design Avenue, Suite 400<br />New York, NY 10001</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} />
              <span>+1 (555) 234-5678</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={16} />
              <span>hello@jadespaces.com</span>
            </div>
            <div className={styles.newsletterForm}>
              <input 
                type="email" 
                placeholder="Your email" 
                className={styles.newsletterInput} 
              />
              <button className={styles.newsletterBtn} aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} Jade Spaces. All rights reserved.
          </span>
          <button className={styles.backToTop} onClick={scrollToTop}>
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
