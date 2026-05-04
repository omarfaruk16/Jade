'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import API_BASE from '@/lib/api';

import TitleReveal from '@/components/layout/TitleReveal';

import SectionReveal from '@/components/layout/SectionReveal';

export default function BlogsClientPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(console.error);
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <main style={{ minHeight: '100vh', background: '#fff', paddingTop: '80px' }}>
      {/* Header */}
      <SectionReveal>
<section style={{ padding: '5rem 5% 3rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} style={{ marginBottom: '1rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4 }}>
            <circle cx="12" cy="4" r="2" fill="black"/>
            <circle cx="12" cy="20" r="2" fill="black"/>
            <circle cx="4" cy="12" r="2" fill="black"/>
            <circle cx="20" cy="12" r="2" fill="black"/>
          </svg>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '1rem', lineHeight: 1.1 }}
        >
          Our Insights
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.1 }}
          style={{ color: '#666', fontSize: '1rem', marginBottom: '2rem' }}
        >
          Explore ideas, trends, and behind-the-scenes stories from our studio.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.15 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '0' }}
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email"
            style={{ padding: '0.75rem 1.25rem', border: '1px solid #ddd', borderRadius: '9999px 0 0 9999px', outline: 'none', fontSize: '0.9rem', width: 220 }}
          />
          <button
            style={{ background: '#111', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0 9999px 9999px 0', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
          >
            Subscribe
          </button>
        </motion.div>
      </section>
</SectionReveal>

      {/* Blog Grid */}
      <SectionReveal>
<section style={{ padding: '0 5% 8rem' }}>
        {blogs.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', padding: '4rem 0' }}>No blog posts yet. Check back soon!</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {blogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: idx * 0.06 }}
              >
                <Link href={`/blogs/${blog.slug}`} style={{ textDecoration: 'none', display: 'block', position: 'relative', borderRadius: '12px', overflow: 'hidden', aspectRatio: '4/3', cursor: 'pointer' }}>
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
                    className="blog-card-img"
                  />
                  {/* Dark overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.1) 100%)' }} />

                  {/* Date pill */}
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', borderRadius: '9999px', padding: '0.3rem 0.9rem', fontSize: '0.8rem', fontWeight: 600, color: '#111' }}>
                    {formatDate(blog.createdAt)}
                  </div>

                  {/* Title + arrow */}
                  <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TitleReveal><h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 500, lineHeight: 1.3, margin: 0 }}>{blog.title}</h3></TitleReveal>
                    <div style={{ width: 36, height: 36, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '1rem' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
</SectionReveal>

      <style>{`
        .blog-card-img:hover { transform: scale(1.04); }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
