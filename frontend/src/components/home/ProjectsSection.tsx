'use client';

import { useRef, useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import styles from './ProjectsSection.module.css';

const FALLBACK_PROJECTS = [
  { id: 1, title: 'Studio Earth', coverImage: '/images/f1.png', date: 'Jul 9, 2025' },
  { id: 2, title: 'Coastal Retreat', coverImage: '/images/home-hero.webp', date: 'Jun 13, 2025' },
  { id: 3, title: 'Modern Nest', coverImage: '/images/f1.png', date: 'Jun 4, 2025' },
  { id: 4, title: 'The Greenhouse', coverImage: '/images/home-hero.webp', date: 'Jun 1, 2025' },
  { id: 5, title: 'Desert Light', coverImage: '/images/f1.png', date: 'May 20, 2025' },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    fetch(`${API_BASE}/projects`)
      .then(res => res.json())
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]));

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Translate the strip so that the last card aligns to the right edge
  const x = useTransform(scrollYProgress, (p) => {
    if (isMobile) return 0;
    const el = viewportRef.current;
    if (!el) return 0;
    const overflow = el.scrollWidth - el.offsetWidth;
    return -p * overflow;
  });

  const displayProjects = projects.length > 0 ? projects : FALLBACK_PROJECTS;

  return (
    /* The tall scroll container creates the scroll-driven animation on desktop.
       On mobile it collapses to auto height. */
    <section
      className={styles.scrollContainer}
      ref={containerRef}
    >
      <div className={styles.stickySection}>


        {/* Carousel viewport — clips the moving strip */}
        <div className={styles.carouselViewport} ref={viewportRef}>
          <motion.div style={isMobile ? {} : { x }} className={styles.projectsWrapper}>
            {displayProjects.map((project) => (
              <Link
                href={`/projects/${project.id}`}
                key={project.id}
                className={styles.projectCard}
              >
                <div className={styles.imageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className={styles.cardImage}
                  />
                  <div className={styles.hoverArrow}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.cardTitle}>{project.title}</span>
                  <span className={styles.cardDate}>{project.date}</span>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
