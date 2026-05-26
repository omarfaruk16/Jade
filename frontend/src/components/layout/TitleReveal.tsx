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
      initial={{ opacity: 0.001, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 30,
        mass: 1,
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
}