'use client';

import { useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Filter } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import SectionReveal from '@/components/layout/SectionReveal';
import TitleReveal from '@/components/layout/TitleReveal';
import styles from './ProjectsArchive.module.css';

export default function ProjectsArchive() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/projects`)
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      <SectionReveal>
<section className={styles.headerSection}>
        <div className={styles.icon}>
          <Target size={24} color="#333" />
        </div>
        <TitleReveal><h1 className={styles.title}>Selected Projects</h1></TitleReveal>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          With a seamless process and attention to detail, we turn ideas into beautiful, livable realities.
        </motion.p>
      </section>
</SectionReveal>

      <div className={styles.gridControls}>
        <span className={styles.count}>({projects.length})</span>
        <div className={styles.filters}>
          <span className={styles.filterItem}>LaunchSimple</span>
          <span className={styles.filterItem}>45 Degrees+</span>
          <span className={styles.filterItem}><Filter size={16} /></span>
        </div>
      </div>

      <SectionReveal>
        <div className={styles.projectsGrid}>
          {loading ? (
            <div style={{ textAlign: 'center', width: '100%', gridColumn: 'span 3', padding: '4rem' }}>Loading architecture...</div>
          ) : (
            projects.map((p, i) => (
              <Link href={`/projects/${p.id}`} key={p.id} className={styles.projectCard}>
                <motion.div 
                  className={styles.projectCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={styles.imageWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.coverImage} alt={p.title} />
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardTitle}>{p.title}</span>
                    <span className={styles.cardDate}>{p.date}</span>
                  </div>
                </motion.div>
              </Link>
            ))
          )}
        </div>
      </SectionReveal>
    </div>
  );
}
