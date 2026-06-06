'use client';

import { motion } from 'framer-motion';

// Shared SVG quote icon
const QuoteSvg = () => (
  <svg className="jade-quote-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 28C10 21.373 15.373 16 22 16V20C17.582 20 14 23.582 14 28V36H22V28H10ZM26 28C26 21.373 31.373 16 38 16V20C33.582 20 30 23.582 30 28V36H38V28H26Z" fill="currentColor" />
  </svg>
);

const DEFAULT_QUOTES = [
  'Our products are crafted under strict international quality standards, combining premium materials, skilled craftsmanship, and rigorous quality control to ensure lasting performance and exceptional value.',
  'With flexible manufacturing capabilities and tailored production solutions, we deliver customized furniture and interior products that meet the unique requirements of diverse global projects.',
  'Supported by efficient logistics and professional coordination, we ensure seamless export operations and reliable delivery for clients, distributors, and partners around the world.',
  'We build long-term relationships through trust, consistency, and dedicated support, creating sustainable partnerships that help our clients and dealers grow with confidence.',
];

interface WhatsIncludedProps {
  quotes?: string[];
}

export default function WhatsIncluded({ quotes = DEFAULT_QUOTES }: WhatsIncludedProps) {
  return (
    <div className="jade-quotes-grid">
      {quotes.map((text, i) => (
        <motion.div
          key={i}
          className={`jade-quote-card ${i === 0 ? 'orange' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: i * 0.1 }}
        >
          <QuoteSvg />
          <p className="jade-quote-text">{text}</p>
        </motion.div>
      ))}
    </div>
  );
}
