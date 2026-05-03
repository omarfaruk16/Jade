'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import API_BASE from '@/lib/api';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './ProjectDetails.module.css';
import SectionReveal from '@/components/layout/SectionReveal';

export default function ProjectDetails() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]); // Parallax effect
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    fetch(`${API_BASE}/projects/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          try {
            data.gallery = JSON.parse(data.galleryJson);
          } catch(e) {
            data.gallery = [data.coverImage, data.overviewImage, data.processImage];
          }
          setProject(data);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  if (!project) return <div style={{ padding: '4rem', textAlign: 'center' }}>Project Not Found</div>;

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <section className={styles.hero}>
        <motion.img 
          src={project.coverImage} 
          alt={project.title} 
          className={styles.coverImage} 
          style={{ y }} 
        />
        <div className={styles.heroOverlay}></div>
        <motion.div 
          className={styles.heroContent} 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.subtitle}>{project.subtitle}</p>
        </motion.div>
      </section>

      <div className={styles.contentContainer}>
        {/* Overview Section */}
        {/* Overview Section */}
        <SectionReveal>
          <section className={styles.overviewSection}>
            <div className={styles.leftColumn}>
              <div className={styles.aboutLabel}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="2" cy="6" r="1.5" fill="black"/>
                  <circle cx="6" cy="2" r="1.5" fill="black"/>
                  <circle cx="6" cy="10" r="1.5" fill="black"/>
                  <circle cx="10" cy="6" r="1.5" fill="black"/>
                </svg>
                Project info
              </div>
            </div>

            <div className={styles.middleColumn}>
              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <label>Date</label>
                  <span>{project.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <label>Category</label>
                  <span>{project.category}</span>
                </div>
                <div className={styles.metaItem}>
                  <label>Space Plan</label>
                  <span>{project.client}</span> 
                </div>
                <div className={styles.metaItem}>
                  <label>Timeline</label>
                  <span>{project.timeline}</span>
                </div>
              </div>
              <p className={styles.overviewDesc}>{project.overviewDesc}</p>
            </div>

            <motion.div 
              className={styles.rightColumn}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.overviewImage} alt="Overview" className={styles.overviewImage} />
            </motion.div>
          </section>
        </SectionReveal>

        {/* Gallery Section */}
        {project.gallery && project.gallery.length >= 3 && (
        <SectionReveal>
          <section className={styles.gallerySection}>
            <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.gallery[0]} alt="Gallery 1" className={styles.galleryRow} style={{ width: '100%', objectFit: 'cover'}} />
            </motion.div>
            <div className={styles.galleryRow}>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.gallery[1]} alt="Gallery 2" className={styles.galleryImg} />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.gallery[2]} alt="Gallery 3" className={styles.galleryImg} />
              </motion.div>
            </div>
          </section>
        </SectionReveal>
        )}

        {/* Process Section */}
        <SectionReveal>
          <section className={styles.processSection}>
            <div className={styles.leftColumn}>
              <div className={styles.aboutLabel}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="2" cy="6" r="1.5" fill="black"/>
                  <circle cx="6" cy="2" r="1.5" fill="black"/>
                  <circle cx="6" cy="10" r="1.5" fill="black"/>
                  <circle cx="10" cy="6" r="1.5" fill="black"/>
                </svg>
                The Process
              </div>
            </div>

            <div className={styles.middleColumn}>
              <div className={styles.processList}>
                <div className={styles.processItem}>
                  <h4>{project.p1Title}</h4>
                  <p>{project.p1Desc}</p>
                </div>
                <div className={styles.processItem}>
                  <h4>{project.p2Title}</h4>
                  <p>{project.p2Desc}</p>
                </div>
                <div className={styles.processItem}>
                  <h4>{project.p3Title}</h4>
                  <p>{project.p3Desc}</p>
                </div>
              </div>
            </div>

            <motion.div 
              className={styles.rightColumn}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.processImage} alt="Process Map" className={styles.processImage} />
            </motion.div>
          </section>
        </SectionReveal>

        {/* Related Projects */}
        <SectionReveal>
          <section style={{ paddingBottom: '6rem' }}>
            <div className={styles.relatedHeader}>
              <h2>Related Projects</h2>
              <ChevronRight />
            </div>
            <div className={styles.relatedGrid}>
              {[ { t:'Modern Nest', d:'Aug, 2024', img: '/images/f3.png' }, { t:'Light Haven', d:'Sept, 2024', img:'/images/f2.png' }, { t:'Oak Cabin', d:'Jan, 2025', img:'/images/f1.png' }].map((rel, i) => (
                 <div key={i} className={styles.relatedCard}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rel.img} alt={rel.t} />
                    <div className={styles.relatedFooter}>
                      <span>{rel.t}</span>
                      <span style={{ color: '#666'}}>{rel.d}</span>
                    </div>
                 </div>
              ))}
            </div>
          </section>
        </SectionReveal>
      </div>
      <Footer />
    </div>
  );
}
