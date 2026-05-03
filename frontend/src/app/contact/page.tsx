'use client';

import { useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './Contact.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import SectionReveal from '@/components/layout/SectionReveal';
import FaqSection from '@/components/home/FaqSection';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE}/contact`)
      .then(res => res.json())
      .then(data => setContact(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* Header */}
      <div className={styles.contactHeader}>
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className={styles.pageTitle}
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className={styles.pageSubtitle}
        >
          Reach out to us—we&apos;d love to hear from you!
        </motion.p>
      </div>

      <div className={styles.mainContainer}>
        {/* Contact Info + Form */}
        <SectionReveal>
          <div className={styles.formGrid}>
            {/* Left Side: Info */}
            <div className={styles.infoSide}>
               <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <h4>Call us</h4>
                    <p>{contact?.phone || '+1 123 456 78 90'}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>General inquiries</h4>
                    <p>{contact?.email || 'hello@jadespaces.com'}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>Social</h4>
                    <div className={styles.socialList}>
                      {contact?.socials?.map((s: any) => (
                        <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
                      ))}
                      {!contact && <p>Instagram, LinkedIn, Twitter</p>}
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>Address</h4>
                    <p className={styles.addressText}>{contact?.address || '123 Main St, Suite 400, Springfield, IL 62701, USA'}</p>
                  </div>
               </div>
            </div>

            {/* Right Side: Form */}
            <div className={styles.formSide}>
              <div className={styles.formCard}>
                {submitted ? (
                  <div className={styles.formSuccess}>
                     <h3>Message Sent!</h3>
                     <p>We will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                      <label>Full Name</label>
                      <input type="text" placeholder="Jane Smith" required />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Email</label>
                      <input type="email" placeholder="jane@example.com" required />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Message</label>
                      <textarea placeholder="Type something..." required />
                    </div>
                    <button type="submit" className={styles.submitBtn}>Submit</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Shared FAQ Section */}
        <SectionReveal>
          <FaqSection />
        </SectionReveal>
      </div>

      <Footer />
    </div>
  );
}
