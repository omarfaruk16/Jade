'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import API_BASE from '@/lib/api';
import dynamic from 'next/dynamic';

import TitleReveal from '@/components/layout/TitleReveal';

const MDPreview = dynamic(() => import('@uiw/react-md-editor').then(mod => mod.default.Markdown), { ssr: false });

export default function BlogDetailClient({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/blogs/${slug}`)
      .then(res => {
        if (!res.ok) { setNotFound(true); return null; }
        return res.json();
      })
      .then(data => { if (data) setBlog(data); })
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', paddingTop: '80px' }}>
        <div style={{ textAlign: 'center' }}>
          <TitleReveal><h1 style={{ fontSize: '3rem', fontWeight: 500, marginBottom: '1rem' }}>Blog not found</h1></TitleReveal>
          <Link href="/blogs" style={{ color: '#000', textDecoration: 'underline' }}>← Back to Blogs</Link>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main style={{ minHeight: '100vh', background: '#fff', paddingTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #eee', borderTop: '3px solid #000', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    );
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <main style={{ minHeight: '100vh', background: '#fff', paddingTop: '80px' }}>
      {/* Hero Banner */}
      <div style={{ position: 'relative', width: '100%', height: '60vh', overflow: 'hidden' }}>
        <img
          src={blog.coverImage}
          alt={blog.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '3rem 5%', color: '#fff' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '0.95rem', marginBottom: '0.75rem', opacity: 0.85 }}
          >
            {formatDate(blog.createdAt)}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', maxWidth: '800px' }}
          >
            {blog.title}
          </motion.h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '4rem 5%', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '4rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'start' }}>
        {/* Back Button */}
        <div>
          <Link href="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#000', textDecoration: 'none', fontWeight: 500, background: '#f4f4f4', borderRadius: '9999px', padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15,18 9,12 15,6"/>
            </svg>
            Back to Blogs
          </Link>
        </div>

        {/* Blog Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          data-color-mode="light"
        >
          <MDPreview source={blog.description} style={{ background: 'transparent', fontSize: '1.05rem', lineHeight: 1.8, color: '#333' }} />
        </motion.div>
      </div>

      {/* Back CTA at bottom */}
      <div style={{ padding: '2rem 5% 6rem', borderTop: '1px solid #f0f0f0' }}>
        <Link href="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#000', textDecoration: 'none', fontWeight: 600 }}>
          ← More Insights
        </Link>
      </div>
    </main>
  );
}
