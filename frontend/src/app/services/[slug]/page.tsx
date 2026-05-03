'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import API_BASE from '@/lib/api';
import DOMPurify from 'isomorphic-dompurify';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './ServiceChild.module.css';
import SectionReveal from '@/components/layout/SectionReveal';

const PinIcon = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="4.5" r="3.5" stroke="#111" strokeWidth="1.2"/>
    <path d="M6 8V13.5" stroke="#111" strokeWidth="1.2"/>
  </svg>
);

const QuoteIcon = () => (
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 0C2.01472 0 0 2.01472 0 4.5V11.5H5.5V6H2.5C2.5 4.89543 3.39543 4 4.5 4V0Z" fill="currentColor"/>
    <path d="M13 0C10.5147 0 8.5 2.01472 8.5 4.5V11.5H14V6H11C11 4.89543 11.8954 4 13 4V0Z" fill="currentColor"/>
  </svg>
);

export default function ServiceChildPage() {
  const { slug } = useParams() as { slug: string };
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState<string>('');
  const [showSubNav, setShowSubNav] = useState(false);
  const itemRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    fetch(`${API_BASE}/services/child/${slug}`)
      .then(r => r.json())
      .then(childData => {
        setData(childData);
        if (childData.items?.length > 0) setActiveItem(childData.items[0].id);
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setShowSubNav(scrollPos > 600);

      // Section tracking for active state
      let currentActive = activeItem;
      for (const item of data?.items || []) {
        const ref = itemRefs.current[item.id];
        if (ref && ref.offsetTop - 150 <= scrollPos) {
          currentActive = item.id;
        }
      }
      if (currentActive !== activeItem) setActiveItem(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data, activeItem]);

  const scrollTo = (id: string) => {
    const ref = itemRefs.current[id];
    if (ref) {
      window.scrollTo({ top: ref.offsetTop - 120, behavior: 'smooth' });
    }
  };

  if (loading) return <div className={styles.loading}>Loading…</div>;
  if (!data || data.error) return <div className={styles.loading}>Service not found.</div>;

  return (
    <div className={styles.pageWrapper}>
      <Navbar visible={!showSubNav} />

      {/* Floating Sticky Sub-navigation */}
      <div className={`${styles.subNavWrapper} ${showSubNav ? styles.subNavVisible : ''}`}>
        <div className={styles.subNav}>
          <div className={styles.subNavLogo}>
            <span>J</span><span>ade</span>
          </div>
          <div className={styles.subNavLinks}>
            {data.items.map((item: any, idx: number) => (
              <button 
                key={item.id} 
                onClick={() => scrollTo(item.id)}
                className={`${styles.subNavBtn} ${activeItem === item.id ? styles.subNavBtnActive : ''}`}
              >
                {activeItem === item.id && <span className={styles.redDot} />}
                <span className={styles.subNavNum}>0{idx + 1}</span> {item.title}
              </button>
            ))}
          </div>
          <button className={styles.subNavAction}>Book a Call</button>
        </div>
      </div>

      <div 
        className={styles.heroSection} 
        style={{ backgroundImage: `url(${data.coverImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000"})` }}
      >
        <motion.div 
          className={styles.heroOverlay}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <h1 className={styles.heroTitle}>{data.name}</h1>
          {data.description && (
            <p className={styles.heroDesc}>{data.description}</p>
          )}
        </motion.div>
      </div>

      <div className={styles.page}>
        {data.items.map((item: any) => (
          <SectionReveal key={item.id}>
            <section
              ref={el => { itemRefs.current[item.id] = el; }}
              className={styles.serviceItem}
            >
              <div className={styles.itemHeader}>
                <h1 className={styles.itemTitle}>{item.title}</h1>
                <div className={styles.itemHeaderRight}>
                  <p className={styles.headerText}>Explore ideas, trends, and behind-the-scenes<br/>stories from our studio.</p>
                  <button className={styles.contactBtn}>Contact now</button>
                </div>
              </div>

              {/* Row 1: About service */}
              <div className={styles.gridRow}>
                <div className={styles.leftCol}>
                  <PinIcon />
                  <span>About service</span>
                </div>
                <div className={styles.middleCol}>
                  <p className={styles.aboutText}>{item.about}</p>
                  {item.keyLine && (
                    <div className={styles.quoteBoxOrange} style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '8px', color: '#fff', fontSize: '14px', lineHeight: '1.6' }}>
                      <div className={styles.quoteWrap} style={{ marginBottom: '1rem', color: '#fff' }}><QuoteIcon /></div>
                      <span>{item.keyLine}</span>
                    </div>
                  )}
                </div>
                <div className={styles.rightCol}>
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.title} className={styles.aboutImage} />
                  )}
                </div>
              </div>

              {/* Row 2: Overview */}
              {(item.overviewCategory || item.overviewBestFor || item.overviewStyleApproach) && (
                <div className={styles.gridRow}>
                  <div className={styles.leftCol}>
                    <PinIcon />
                    <span>Overview</span>
                  </div>
                  <div className={styles.middleCol} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                    {item.overviewCategory && (
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Category</h4>
                        <p style={{ fontSize: '14px', color: '#333' }}>{item.overviewCategory}</p>
                      </div>
                    )}
                    {item.overviewBestFor && (
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Best For</h4>
                        <p style={{ fontSize: '14px', color: '#333' }}>{item.overviewBestFor}</p>
                      </div>
                    )}
                  </div>
                  <div className={styles.rightCol} style={{ justifyContent: 'flex-start' }}>
                    {item.overviewStyleApproach && (
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Style Approach</h4>
                        <p style={{ fontSize: '14px', color: '#333' }}>{item.overviewStyleApproach}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Row 3: Features */}
              <div className={styles.gridRow}>
                <div className={styles.leftCol}>
                  <PinIcon />
                  <span>Features</span>
                </div>
                <div className={styles.includedMiddleCol}>
                  {item.whatsIncluded?.map((w: any, idx: number) => (
                    <div key={w.id} className={styles.includedBlock}>
                      <h4 className={styles.includedTitle}>{idx + 1}. {w.title}</h4>
                      <div className={styles.includedDesc} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(w.description) }} />
                    </div>
                  ))}
                </div>
                <div className={styles.includedRightCol}>
                  {JSON.parse(item.featureQuotesJson || '[]').map((q: string, idx: number, arr: string[]) => {
                    const isLast = idx === arr.length - 1;
                    return (
                      <div key={idx} className={`${styles.quoteBox} ${isLast ? styles.quoteBoxOrange : styles.quoteBoxWhite}`}>
                        <div className={styles.quoteWrap}><QuoteIcon /></div>
                        <span>{q}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Gallery Row */}
              {item.gallery?.length > 0 && (
                <div className={styles.galleryRow}>
                  {item.gallery.map((g: any) => (
                    <img key={g.id} src={g.url} alt="" className={styles.galleryImage} />
                  ))}
                </div>
              )}
            </section>
          </SectionReveal>
        ))}
      </div>
      <Footer />
    </div>
  );
}
