'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import API_BASE from '@/lib/api';
import DOMPurify from 'isomorphic-dompurify';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from '../../../services/[slug]/ServiceChild.module.css'; // Reusing service styles

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

export default function ProductDetailsPage() {
  const { productId } = useParams() as { productId: string };
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/products/${productId}`)
      .then(r => r.json())
      .then(data => {
        if (!data.error) setProduct(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div className={styles.loading}>Loading…</div>;
  if (!product || product.error) return <div className={styles.loading}>Product not found.</div>;

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* ── Full Width Hero Section ── */}
      <div 
        className={styles.heroSection} 
        style={{ backgroundImage: `url(${product.coverImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000"})` }}
      >
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>{product.title}</h1>
          {product.subtitle && (
            <p className={styles.heroDesc}>{product.subtitle}</p>
          )}
        </div>
      </div>

      <div className={styles.page}>
        <section className={styles.serviceItem}>
          
          <div className={styles.itemHeader}>
            <h1 className={styles.itemTitle}>{product.title}</h1>
            <div className={styles.itemHeaderRight}>
              <p className={styles.headerText}>Explore ideas, trends, and behind-the-scenes<br/>stories from our studio.</p>
              <button className={styles.contactBtn}>Contact now</button>
            </div>
          </div>

          {/* Row 1: About service (using same labels for consistency) */}
          <div className={styles.gridRow}>
            <div className={styles.leftCol}>
              <PinIcon />
              <span>About service</span>
            </div>
            
            <div className={styles.middleCol}>
              <p className={styles.aboutText}>{product.about}</p>
              {product.keyLine && (
                <div className={styles.quoteBoxOrange} style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '8px', color: '#fff', fontSize: '14px', lineHeight: '1.6' }}>
                  <div className={styles.quoteWrap} style={{ marginBottom: '1rem', color: '#fff' }}><QuoteIcon /></div>
                  <span>{product.keyLine}</span>
                </div>
              )}
            </div>

            <div className={styles.rightCol}>
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.title} className={styles.aboutImage} />
              )}
            </div>
          </div>

          {/* Row 2: Overview */}
          {(product.overviewCategory || product.overviewBestFor || product.overviewStyleApproach) && (
            <div className={styles.gridRow}>
              <div className={styles.leftCol}>
                <PinIcon />
                <span>Overview</span>
              </div>
              
              <div className={styles.middleCol} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                {product.overviewCategory && (
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Category</h4>
                    <p style={{ fontSize: '14px', color: '#333' }}>{product.overviewCategory}</p>
                  </div>
                )}
                {product.overviewBestFor && (
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Best For</h4>
                    <p style={{ fontSize: '14px', color: '#333' }}>{product.overviewBestFor}</p>
                  </div>
                )}
              </div>

              <div className={styles.rightCol} style={{ justifyContent: 'flex-start' }}>
                {product.overviewStyleApproach && (
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Style Approach</h4>
                    <p style={{ fontSize: '14px', color: '#333' }}>{product.overviewStyleApproach}</p>
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
              {product.whatsIncluded?.map((w: any, idx: number) => (
                <div key={w.id} className={styles.includedBlock}>
                  <h4 className={styles.includedTitle}>{idx + 1}. {w.title}</h4>
                  <div className={styles.includedDesc} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(w.description) }} />
                </div>
              ))}
            </div>

            <div className={styles.includedRightCol}>
              {JSON.parse(product.featureQuotesJson || "[]").map((q: string, idx: number, arr: string[]) => {
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
          {product.gallery?.length > 0 && (
            <div className={styles.galleryRow}>
              {product.gallery.map((g: any) => (
                <img key={g.id} src={g.url} alt="" className={styles.galleryImage} />
              ))}
            </div>
          )}

        </section>
      </div>
      <Footer />
    </div>
  );
}
