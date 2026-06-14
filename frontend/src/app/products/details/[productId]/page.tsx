/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import API_BASE from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionReveal from '@/components/layout/SectionReveal';
import styles from './ProductDetails.module.css';
import TitleReveal from '@/components/layout/TitleReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';

const DotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="6" r="2.5" fill="#000" />
    <circle cx="12" cy="18" r="2.5" fill="#000" />
    <circle cx="6" cy="12" r="2.5" fill="#000" />
    <circle cx="18" cy="12" r="2.5" fill="#000" />
  </svg>
);

const CardDotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="6" r="2.5" fill="#bbb" />
    <circle cx="12" cy="18" r="2.5" fill="#bbb" />
    <circle cx="6" cy="12" r="2.5" fill="#bbb" />
    <circle cx="18" cy="12" r="2.5" fill="#bbb" />
  </svg>
);

const cardIcons = [
  <svg key="0" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="3" rx="1.5"/><line x1="6" y1="10" x2="6" y2="19"/><line x1="18" y1="10" x2="18" y2="19"/><line x1="4" y1="19" x2="20" y2="19"/></svg>,
  <svg key="1" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  <svg key="2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  <svg key="3" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  <svg key="4" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  <svg key="5" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
];

export default function ProductDetailsPage() {
  const { productId } = useParams() as { productId: string };
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE}/products/${productId}`)
      .then(r => r.json())
      .then(data => { if (!data.error) setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [productId]);

  if (loading) return <div className={styles.loading}>Loading…</div>;
  if (!product) return <div className={styles.loading}>Product not found.</div>;

  const heroImage = product.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000';

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* Hero */}
      <div className={styles.heroSection}>
        <div className={styles.heroBg} style={{ backgroundImage: `url(${heroImage})` }} />
        <div className={styles.heroOverlay} />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 5vw' }}
        >
          <h1 className={styles.heroTitle}>
            <ScaleBlur text={product.category?.name || product.title} stagger={0.04} />
          </h1>
          {(product.category?.subtitle || product.subtitle) && (
            <p className={styles.heroSubtitle}>{product.category?.subtitle || product.subtitle}</p>
          )}
        </motion.div>
      </div>

      <div className={styles.page}>

        {/* Descriptions */}
        {product.descriptions?.length > 0 && (
          <SectionReveal>
            <section className={styles.section}>
              <div className={styles.sectionLabel}>
                <DotsIcon />
                <span>Overview</span>
              </div>
              <TitleReveal><h2 className={styles.sectionTitle}>{product.title}</h2></TitleReveal>
              {product.subtitle && <p className={styles.sectionSubtitle}>{product.subtitle}</p>}
              <div className={styles.descGrid}>
                {product.descriptions.map((d: any, i: number) => (
                  <motion.div
                    key={d.id}
                    className={styles.descCard}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={styles.descCardTop}>
                      <span className={styles.descCardIcon}>{cardIcons[i % cardIcons.length]}</span>
                      <CardDotsIcon />
                    </div>
                    <TitleReveal><h3 className={styles.descCardTitle}>{d.title}</h3></TitleReveal>
                    <p className={styles.descCardText}>{d.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </SectionReveal>
        )}

        {/* Types */}
        {product.types?.length > 0 && (
          <SectionReveal>
            <section className={styles.section}>
              <div className={styles.sectionLabel}>
                <DotsIcon />
                <span>Explore</span>
              </div>
              <TitleReveal><h2 className={styles.sectionTitle}>Types of {product.title}</h2></TitleReveal>
              <div className={styles.typesGrid}>
                {product.types.map((t: any, i: number) => (
                  <motion.div
                    key={t.id}
                    className={styles.typeCard}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <img src={t.image} alt={t.name} />
                    <div className={styles.typeOverlay}><span className={styles.typeName}>{t.name}</span></div>
                  </motion.div>
                ))}
              </div>
            </section>
          </SectionReveal>
        )}

        {/* Materials */}
        {product.materials?.map((mat: any) => (
          <SectionReveal key={mat.id}>
            <section className={styles.section}>
              <div className={styles.materialLayout}>
                <div className={styles.materialLeft}>
                  <div className={styles.sectionLabel}>
                    <DotsIcon />
                    <span>Materials</span>
                  </div>
                  <TitleReveal><h2 className={styles.materialLeftTitle}>{mat.sectionTitle}</h2></TitleReveal>
                  <p className={styles.materialLeftDesc}>{mat.sectionDesc}</p>
                </div>
                <div className={styles.materialItemsGrid}>
                  {mat.items?.map((item: any, i: number) => (
                    <motion.div
                      key={item.id}
                      className={styles.materialItem}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {item.image && <img src={item.image} alt={item.title} className={styles.materialItemImg} />}
                      <p className={styles.materialItemTitle}>{item.title}</p>
                      <p className={styles.materialItemDesc}>{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </SectionReveal>
        ))}

        {/* Accessories */}
        {product.accessories?.map((acc: any) => (
          <SectionReveal key={acc.id}>
            <section className={styles.section}>
              <div className={styles.materialLayout}>
                <div className={styles.materialLeft}>
                  <div className={styles.sectionLabel}>
                    <DotsIcon />
                    <span>Accessories</span>
                  </div>
                  <TitleReveal><h2 className={styles.materialLeftTitle}>{acc.sectionTitle}</h2></TitleReveal>
                  <p className={styles.materialLeftDesc}>{acc.sectionDesc}</p>
                </div>
                <div className={styles.materialItemsGrid}>
                  {acc.items?.map((item: any, i: number) => (
                    <motion.div
                      key={item.id}
                      className={styles.materialItem}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {item.image && <img src={item.image} alt={item.title} className={styles.materialItemImg} />}
                      <p className={styles.materialItemTitle}>{item.title}</p>
                      <p className={styles.materialItemDesc}>{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </SectionReveal>
        ))}

        {/* Appliances */}
        {product.appliances?.map((app: any) => (
          <SectionReveal key={app.id}>
            <section className={styles.section}>
              <div className={styles.materialLayout}>
                <div className={styles.materialLeft}>
                  <div className={styles.sectionLabel}>
                    <DotsIcon />
                    <span>Appliances</span>
                  </div>
                  <TitleReveal><h2 className={styles.materialLeftTitle}>{app.sectionTitle}</h2></TitleReveal>
                  <p className={styles.materialLeftDesc}>{app.sectionDesc}</p>
                </div>
                <div className={styles.materialItemsGrid}>
                  {app.items?.map((item: any, i: number) => (
                    <motion.div
                      key={item.id}
                      className={styles.materialItem}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {item.image && <img src={item.image} alt={item.title} className={styles.materialItemImg} />}
                      <p className={styles.materialItemTitle}>{item.title}</p>
                      <p className={styles.materialItemDesc}>{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </SectionReveal>
        ))}

        {/* CTA */}
        <SectionReveal>
          <section className={styles.ctaSection}>
            <div className={styles.ctaInner}>
              <p className={styles.ctaTagline}>Hope you got a good idea about our products. To learn more or choose one, talk to our sales expert.</p>
              <button className={styles.ctaBtn} onClick={() => window.location.href = '/contact'}>Talk to Expert</button>
            </div>
            <div className={styles.ctaImageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/jade_ceo.jpeg" alt="Sales Expert" className={styles.ctaImage} />
              <div className={styles.ctaBadge}>
                <div className={styles.ctaBadgeText}>
                  <span className={styles.ctaBadgeName}>Warsty Roslan</span>
                  <span className={styles.ctaBadgeRole}>Sale Expert</span>
                </div>
                <span className={styles.ctaBadgeVerified}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="9" fill="#22c55e" />
                    <path d="M5.5 9l2.5 2.5L12.5 6.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </section>
        </SectionReveal>

      </div>

      <Footer />
    </div>
  );
}
