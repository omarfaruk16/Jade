'use client';

import { motion } from 'framer-motion';

interface ScaleBlurProps {
  text: string;
  stagger?: number;
  className?: string;
  delay?: number;
}

export default function ScaleBlur({ text = "", stagger = 0.05, className = "", delay = 0 }: ScaleBlurProps) {
  const chars = (str: string) => (str || "").split("");

  return (
    <motion.span 
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden" 
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {chars(text).map((c, i) => (
        <motion.span 
          key={i} 
          style={{ display: "inline-block", whiteSpace: "pre" }}
          variants={{
            hidden: { opacity: 0, scale: 0.2, filter: "blur(10px)" },
            visible: { 
              opacity: 1, 
              scale: 1, 
              filter: "blur(0px)",
              transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } 
            }
          }}
        >
          {c}
        </motion.span>
      ))}
    </motion.span>
  );
}
