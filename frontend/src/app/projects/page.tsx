'use client';

import { useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Filter } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      <section className={styles.headerSection}>
        <div className={styles.icon}>
          <Target size={24} color="#333" />
        </div>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Selected Projects
        </motion.h1>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          With a seamless process and attention to detail, we turn ideas into beautiful, livable realities.
        </motion.p>
      </section>

      <div className={styles.gridControls}>
        <span className={styles.count}>({projects.length})</span>
        <div className={styles.filters}>
          <span className={styles.filterItem}>LaunchSimple</span>
          <span className={styles.filterItem}>45 Degrees+</span>
          <span className={styles.filterItem}><Filter size={16} /></span>
        </div>
      </div>

      <motion.div 
        className={styles.projectsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {loading ? (
          <div style={{ textAlign: 'center', width: '100%', gridColumn: 'span 3', padding: '4rem' }}>Loading architecture...</div>
        ) : (
          projects.map((p) => (
            <Link href={`/projects/${p.id}`} key={p.id} passHref legacyBehavior>
              <motion.a className={styles.projectCard} variants={itemVariants}>
                <div className={styles.imageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.coverImage} alt={p.title} />
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.cardTitle}>{p.title}</span>
                  <span className={styles.cardDate}>{p.date}</span>
                </div>
              </motion.a>
            </Link>
          ))
        )}
      </motion.div>
    </div>
  );
}
