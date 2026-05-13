'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TitleRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function TitleReveal({ children, className, delay = 0 }: TitleRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 1.2, 
        delay: delay,
        ease: [0.21, 1, 0.36, 1] 
      }}
    >
      {children}
    </motion.div>
  );
}
