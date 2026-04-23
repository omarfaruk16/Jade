'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './Contact.module.css';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* Hero */}
      <section className={styles.heroSection}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.heroTitle}
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={styles.heroSub}
        >
          Have a project in mind? We&apos;d love to hear from you. Send us a message
          and we&apos;ll respond within 24 hours.
        </motion.p>
      </section>

      <div className={styles.container}>
        <div className={styles.splitLayout}>
          {/* Form Side */}
          <motion.div
            className={styles.formSection}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className={styles.successMessage}>
                ✓ Thank you! Your message has been sent successfully. We&apos;ll be in touch soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Smith"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup} style={{ marginTop: '1.5rem' }}>
                  <label className={styles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup} style={{ marginTop: '1.5rem' }}>
                  <label className={styles.formLabel}>Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Project inquiry"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup} style={{ marginTop: '1.5rem' }}>
                  <label className={styles.formLabel}>Message</label>
                  <textarea
                    required
                    placeholder="Tell us about your project..."
                    className={styles.formTextarea}
                  />
                </div>
                <button type="submit" className={styles.submitBtn} style={{ marginTop: '2rem' }}>
                  Send Message <Send size={18} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Info Side */}
          <motion.div
            className={styles.infoSection}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.infoCard}>
              <div className={styles.infoIconWrap}>
                <MapPin size={20} />
              </div>
              <div>
                <div className={styles.infoLabel}>Address</div>
                <div className={styles.infoValue}>123 Design Avenue, Suite 400<br />New York, NY 10001</div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIconWrap}>
                <Phone size={20} />
              </div>
              <div>
                <div className={styles.infoLabel}>Phone</div>
                <div className={styles.infoValue}>+1 (555) 234-5678</div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIconWrap}>
                <Mail size={20} />
              </div>
              <div>
                <div className={styles.infoLabel}>Email</div>
                <div className={styles.infoValue}>hello@jadespaces.com</div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIconWrap}>
                <Clock size={20} />
              </div>
              <div>
                <div className={styles.infoLabel}>Business Hours</div>
                <div className={styles.infoValue}>Mon – Fri: 9:00 AM – 6:00 PM<br />Sat: 10:00 AM – 4:00 PM</div>
              </div>
            </div>

            <div className={styles.mapWrapper}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215!2d-73.9855!3d40.748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1"
                allowFullScreen
                loading="lazy"
                title="Location Map"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Bar */}
      <div className={styles.ctaBar}>
        <p className={styles.ctaBarText}>
          Prefer a quick chat?
          <a href="#" className={styles.ctaBarLink}>Book a Call →</a>
        </p>
      </div>

      <Footer />
    </div>
  );
}
