'use client';

import { useEffect, useRef } from 'react';
import { ReactNode } from 'react';
import styles from './SectionReveal.module.css';

interface SectionRevealProps {
  children: ReactNode;
}

export default function SectionReveal({ children }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        }
      },
      { margin: '-80px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.sectionReveal}>
      {children}
    </div>
  );
}
