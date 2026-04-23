'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import styles from './ProjectsSection.module.css';

export default function ProjectsSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    fetch('http://localhost:5001/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(console.error);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    <section ref={targetRef} className={styles.scrollContainer}>
      <div className={styles.stickySection}>
        <div className={styles.header}>
          <div className={styles.brandLogos}>
            <span>DAIKIN</span>
            <span>LaunchSimple</span>
            <span>SHANTA</span>
          </div>
        </div>
        
        <motion.div style={{ x: isMobile ? 0 : x }} className={styles.projectsWrapper}>
          {projects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id} passHref legacyBehavior>
              <a className={styles.projectCard}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.coverImage} alt={project.title} />
                <div className={styles.cardFooter}>
                  <span className={styles.cardTitle}>{project.title}</span>
                  <span className={styles.cardDate}>{project.date}</span>
                </div>
              </a>
            </Link>
          ))}
          {/* Fallback if no db projects */}
          {projects.length === 0 && (
             <div className={styles.projectCard}>
               <img src="/images/f1.png" alt="Fallback" />
               <div className={styles.cardFooter}>
                 <span className={styles.cardTitle}>Loading...</span>
                 <span className={styles.cardDate}>Please wait</span>
               </div>
             </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

