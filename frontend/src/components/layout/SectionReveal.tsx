'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionRevealProps {
  children: ReactNode;
}

export default function SectionReveal({ children }: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 1.2, 
        ease: [0.21, 1, 0.36, 1] // Custom quintic ease-out for premium feel
      }}
    >
      {children}
    </motion.div>
  );
}
