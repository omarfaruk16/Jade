'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './Services.module.css';
import { motion } from 'framer-motion';
import { Home, Building2, Sofa, Lightbulb, LayoutGrid, Hammer, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Home size={24} />,
    title: 'Residential Interior Design',
    desc: 'Transform your home into a personalized sanctuary. We craft elegant, livable spaces that reflect your lifestyle with premium materials and thoughtful layouts.',
  },
  {
    icon: <Building2 size={24} />,
    title: 'Commercial Interior Design',
    desc: 'Create branded environments that inspire productivity and impress clients. From offices to retail spaces, we design for impact and function.',
  },
  {
    icon: <Sofa size={24} />,
    title: 'Custom Furniture & OEM',
    desc: 'Bespoke furniture crafted to your exact specifications. We partner with world-class manufacturers to deliver pieces that are uniquely yours.',
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'Design Consultancy',
    desc: 'Expert guidance on color palettes, material selection, spatial planning, and trend forecasting to elevate your vision with professional insight.',
  },
  {
    icon: <LayoutGrid size={24} />,
    title: 'Space Planning',
    desc: 'Maximize every square foot with intelligent layouts that balance aesthetics and practicality. Optimized flow for living, working, and entertaining.',
  },
  {
    icon: <Hammer size={24} />,
    title: 'Renovation & Remodeling',
    desc: 'Breathe new life into existing spaces with structural updates, modern finishes, and complete interior overhauls that respect original character.',
  },
];

const processSteps = [
  { num: '01', title: 'Consult', desc: 'We listen to your vision and understand your requirements' },
  { num: '02', title: 'Design', desc: 'Our team creates detailed plans and 3D visualizations' },
  { num: '03', title: 'Build', desc: 'Expert craftsmen bring the design to life with precision' },
  { num: '04', title: 'Deliver', desc: 'Final walkthrough, styling, and handover of your dream space' },
];

export default function ServicesPage() {
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
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={styles.heroSub}
          >
            A full spectrum of interior design and architectural services, each
            tailored to elevate spaces with clarity and timeless value.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <div className={styles.container}>
        <div className={styles.servicesGrid}>
          {services.map((svc, i) => (
            <motion.div
              key={i}
              className={styles.serviceCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={styles.serviceIconWrap}>{svc.icon}</div>
              <h3 className={styles.serviceCardTitle}>{svc.title}</h3>
              <p className={styles.serviceCardDesc}>{svc.desc}</p>
              <span className={styles.serviceCardLink}>
                Learn more <ArrowRight size={16} />
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Process Timeline */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.processHeader}>
            <span className={styles.sectionLabel}>Our Process</span>
            <h2 className={styles.sectionTitle}>How We Work</h2>
          </div>

          <div className={styles.timeline}>
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                className={styles.timelineStep}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className={styles.stepDot}>{step.num}</div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <motion.h2
          className={styles.ctaTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ready to transform your space?
        </motion.h2>
        <p className={styles.ctaSub}>
          Let&apos;s discuss your project and bring your vision to life.
        </p>
        <button className={styles.ctaBtn}>Book a Call</button>
      </section>

      <Footer />
    </div>
  );
}
