'use client';

import { useState, useEffect } from 'react';
import API_BASE from '@/lib/api';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUp, ArrowRight, Instagram, Linkedin, Twitter, Github, Facebook, Globe } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE}/contact`)
      .then(res => res.json())
      .then(data => setContact(data))
      .catch(err => console.error(err));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('instagram')) return <Instagram size={18} />;
    if (n.includes('linkedin')) return <Linkedin size={18} />;
    if (n.includes('twitter') || n.includes(' x ')) return <Twitter size={18} />;
    if (n.includes('github')) return <Github size={18} />;
    if (n.includes('facebook')) return <Facebook size={18} />;
    return <Globe size={18} />;
  };

  return (
    <footer className={styles.footer}>
      <div className="jade-container">
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
              {contact?.socials?.map((social: any) => (
                <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={social.name}>
                  {getSocialIcon(social.name)}
                </a>
              ))}
              {!contact && (
                <>
                  <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                  <a href="#" className={styles.socialLink} aria-label="Instagram">
                    <Instagram size={18} />
                  </a>
                </>
              )}
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
              <span>{contact?.address || '123 Design Avenue, New York, NY'}</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} />
              <span>{contact?.phone || '+1 (555) 234-5678'}</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={16} />
              <span>{contact?.email || 'hello@jadespaces.com'}</span>
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
            © {new Date().getFullYear()} Developed by One-Spot-Solution.
          </span>
          <button className={styles.backToTop} onClick={scrollToTop}>
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
