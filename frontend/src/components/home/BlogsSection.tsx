'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import API_BASE from '@/lib/api';
import styles from './BlogsSection.module.css';

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/blogs/recent?limit=4`)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(console.error);
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  if (blogs.length === 0) return null;

  const [featured, ...rest] = blogs;

  return (
    <section className={styles.section}>
      {/* Header Row */}
      <div className={styles.header}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          Insights that shape spaces
        </motion.h2>
        <div className={styles.headerRight}>
          <p className={styles.subtitle}>Explore ideas, trends, and behind-the-scenes stories from our studio.</p>
          <Link href="/blogs" className={styles.viewAllBtn}>View all</Link>
        </div>
      </div>

      {/* Content Grid */}
      <div className={styles.grid}>
        {/* Featured large card */}
        {featured && (
          <motion.div
            className={styles.featuredCard}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <Link href={`/blogs/${featured.slug}`} className={styles.featuredLink}>
              <img src={featured.coverImage} alt={featured.title} className={styles.featuredImg} />
              <div className={styles.featuredOverlay} />
              <div className={styles.datePill}>{formatDate(featured.createdAt)}</div>
              <div className={styles.featuredBottom}>
                <h3 className={styles.featuredTitle}>{featured.title}</h3>
                <div className={styles.arrowCircle}>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Right list */}
        <div className={styles.rightList}>
          {rest.map((blog, idx) => (
            <motion.div
              key={blog.id}
              className={styles.listItem}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 1.2, delay: idx * 0.08 }}
            >
              <div className={styles.fourDots}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
                  <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
                  <circle cx="6" cy="12" r="1.5" fill="currentColor"/>
                  <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
                </svg>
              </div>
              <Link href={`/blogs/${blog.slug}`} className={styles.listContent}>
                <p className={styles.listDate}>{formatDate(blog.createdAt)}</p>
                <h4 className={styles.listTitle}>{blog.title}</h4>
              </Link>
              <Link href={`/blogs/${blog.slug}`} className={styles.listArrow}>
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
