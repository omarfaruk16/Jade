'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './Dealer.module.css';
import { motion } from 'framer-motion';
import { DollarSign, Megaphone, Truck, UserCheck, Send } from 'lucide-react';

const benefits = [
  {
    icon: <DollarSign size={24} />,
    title: 'Exclusive Pricing',
    desc: 'Access special wholesale pricing tiers and volume discounts on our entire product catalog as a certified Jade dealer.',
  },
  {
    icon: <Megaphone size={24} />,
    title: 'Marketing Support',
    desc: 'Receive co-branded marketing materials, digital assets, and campaign support to help you sell more effectively.',
  },
  {
    icon: <Truck size={24} />,
    title: 'Priority Shipping',
    desc: 'Enjoy expedited order processing and priority shipping on all dealer orders, with guaranteed delivery windows.',
  },
  {
    icon: <UserCheck size={24} />,
    title: 'Dedicated Account Manager',
    desc: 'Get a personal account manager who understands your business and provides tailored support and guidance.',
  },
];

const steps = [
  { num: '1', title: 'Apply', desc: 'Fill out the dealer application form with your business details and areas of interest.' },
  { num: '2', title: 'Get Approved', desc: 'Our partnerships team reviews your application and reaches out within 3 business days.' },
  { num: '3', title: 'Start Selling', desc: 'Access your dealer portal, place orders at wholesale pricing, and grow your business.' },
];

export default function DealerPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.heroTitle}
          >
            Become a Dealer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={styles.heroSub}
          >
            Partner with Jade and bring premium interior solutions to your clients.
            Join our growing network of authorized dealers worldwide.
          </motion.p>
        </div>
      </section>

      {/* Benefits */}
      <div className={styles.container}>
        <section className={styles.benefitsSection}>
          <span className={styles.sectionLabel}>Why Partner With Us</span>
          <h2 className={styles.sectionTitle}>Dealer Benefits</h2>

          <div className={styles.benefitsGrid}>
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                className={styles.benefitCard}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={styles.benefitIconWrap}>{b.icon}</div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* How It Works */}
      <section className={styles.howSection}>
        <div className={styles.container}>
          <h2 className={styles.howTitle}>How It Works</h2>
          <div className={styles.stepsRow}>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className={styles.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className={styles.stepNum}>{step.num}</div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Dealer Application</h2>

            {submitted ? (
              <div className={styles.successMessage}>
                ✓ Your application has been submitted! Our team will contact you within 3 business days.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Smith"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Smith Interiors Ltd."
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className={styles.formInput}
                  />
                </div>
                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                  <label className={styles.formLabel}>Tell Us About Your Business</label>
                  <textarea
                    required
                    placeholder="Describe your business, target market, and what interests you about Jade products..."
                    className={styles.formTextarea}
                  />
                </div>
                <button type="submit" className={styles.submitBtn}>
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
