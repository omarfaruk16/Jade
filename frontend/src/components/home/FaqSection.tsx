'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import styles from './FaqSection.module.css';

const faqs = [
  { question: "What services does Jade Kitchen offer?", answer: "Jade Kitchen creates bespoke kitchens, wardrobes, and interiors designed to match your lifestyle and taste. We provide complete solutions, from design consultancy and concept visuals to full execution, including custom furniture and ongoing care programs. Our products are also exported internationally, delivering Jade Kitchen's craftsmanship worldwide." },
  { question: "How does the design process work?", answer: "Our process begins with a detailed consultation to understand your needs, followed by concept development, 3D renderings, material selection, and finally precise execution and installation." },
  { question: "How long does a typical project take?", answer: "Project timelines vary depending on the scope and complexity. A standard residential renovation might take 2-4 months, while a full commercial build can take 6-12 months." },
  { question: "Can I request design changes?", answer: "Yes, we encourage collaboration. During the concept phase, revisions are welcomed to ensure the final design aligns perfectly with your vision." },
  { question: "What are your pricing options?", answer: "We offer transparent, phased pricing tailored to your project's specific requirements, materials chosen, and overall scope." },
  { question: "Do you work outside Malaysia?", answer: "Yes, we have extensive experience managing and delivering high-end interior projects internationally." }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Answers that bring clarity
        </motion.h2>
        
        <motion.div 
          className={styles.headerRight}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <p className={styles.subtitle}>
            We've answered the most common questions<br />
            to help you move forward.
          </p>
          <FourDotsIcon />
        </motion.div>
      </div>

      <div className={styles.container}>
        <div className={styles.leftContent}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index} 
                className={styles.faqItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button 
                  className={styles.faqQuestion} 
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp size={20} className={styles.icon} />
                  ) : (
                    <ChevronDown size={20} className={styles.icon} />
                  )}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      className={styles.faqAnswer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={styles.answerInner}>
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          className={styles.rightContent}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <img src="/images/contact_faq_team.png" alt="Team meeting" className={styles.faqImage} />
          
          <div className={styles.floatingContact}>
            <div className={styles.contactLeft}>
              <FourDotsIconWhite />
              <p>Still have a question in mind?</p>
            </div>
            <Link href="/contact" className={styles.contactBtn}>
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const FourDotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="6" r="1.5" fill="black"/>
    <circle cx="12" cy="18" r="1.5" fill="black"/>
    <circle cx="6" cy="12" r="1.5" fill="black"/>
    <circle cx="18" cy="12" r="1.5" fill="black"/>
  </svg>
);

const FourDotsIconWhite = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="6" r="1.5" fill="white"/>
    <circle cx="12" cy="18" r="1.5" fill="white"/>
    <circle cx="6" cy="12" r="1.5" fill="white"/>
    <circle cx="18" cy="12" r="1.5" fill="white"/>
  </svg>
);
