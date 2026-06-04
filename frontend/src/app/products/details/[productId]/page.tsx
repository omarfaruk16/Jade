'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import API_BASE from '@/lib/api';
import DOMPurify from 'isomorphic-dompurify';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionReveal from '@/components/layout/SectionReveal';
import styles from './ProductDetails.module.css';

import TitleReveal from '@/components/layout/TitleReveal';

export default function ProductDetailsPage() {
  const { productId } = useParams() as { productId: string };
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE}/products/${productId}`)
      .then(r => r.json())
      .then(data => { if (!data.error) setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
    fetch(`${API_BASE}/contact`)
      .then(r => r.json()).then(setContact).catch(() => { });
  }, [productId]);

  if (loading) return <div className={styles.loading}>Loading…</div>;
  if (!product) return <div className={styles.loading}>Product not found.</div>;

  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* ── Hero ── */}
      <div className={styles.heroSection} style={{ backgroundImage: `url(${product.coverImage})` }}>
        <motion.div className={styles.heroOverlay} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2 }}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0.001, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 30, mass: 1 }}
          >
            {product.title}
          </motion.h1>
          {product.subtitle && <p className={styles.heroSubtitle}>{product.subtitle}</p>}
        </motion.div>
      </div>

      <div className={styles.page}>

        {/* ── Descriptions ── */}
        {product.descriptions?.length > 0 && (
          <SectionReveal>
            <section className={styles.section}>
              <p className={styles.sectionLabel}>Overview</p>
              <TitleReveal><h2 className={styles.sectionTitle}>{product.title}</h2></TitleReveal>
              {product.subtitle && <p className={styles.sectionSubtitle}>{product.subtitle}</p>}
              <div className={styles.descGrid}>
                {product.descriptions.map((d: any, i: number) => (
                  <motion.div key={d.id} className={styles.descCard} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}>
                    <TitleReveal><h3 className={styles.descCardTitle}>{d.title}</h3></TitleReveal>
                    <p className={styles.descCardText}>{d.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </SectionReveal>
        )}

        {/* ── Types ── */}
        {product.types?.length > 0 && (
          <SectionReveal>
            <section className={styles.section}>
              <p className={styles.sectionLabel}>Explore</p>
              <TitleReveal><h2 className={styles.sectionTitle}>Types of {product.title}</h2></TitleReveal>
              <div className={styles.typesGrid}>
                {product.types.map((t: any, i: number) => (
                  <motion.div key={t.id} className={styles.typeCard} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}>
                    <img src={t.image} alt={t.name} />
                    <div className={styles.typeOverlay}><span className={styles.typeName}>{t.name}</span></div>
                  </motion.div>
                ))}
              </div>
            </section>
          </SectionReveal>
        )}

        {/* ── Materials ── */}
        {product.materials?.map((mat: any) => (
          <SectionReveal key={mat.id}>
            <section className={styles.section}>
              <div className={styles.materialSection}>
                <div className={styles.materialLeft}>
                  <p className={styles.sectionLabel}>Materials</p>
                  <TitleReveal><h2 className={styles.materialLeftTitle}>{mat.sectionTitle}</h2></TitleReveal>
                  <p className={styles.materialLeftDesc}>{mat.sectionDesc}</p>
                </div>
                <div className={styles.materialItemsGrid}>
                  {mat.items?.map((item: any, i: number) => (
                    <motion.div key={item.id} className={styles.materialItem} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
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

        {/* ── Accessories ── */}
        {product.accessories?.map((acc: any) => (
          <SectionReveal key={acc.id}>
            <section className={styles.section}>
              <div className={styles.materialSection}>
                <div className={styles.materialLeft}>
                  <div className={styles.sectionLabel}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="6" r="2.5" fill="#000" />
                      <circle cx="12" cy="18" r="2.5" fill="#000" />
                      <circle cx="6" cy="12" r="2.5" fill="#000" />
                      <circle cx="18" cy="12" r="2.5" fill="#000" />
                    </svg>
                    <span>Accessories</span>
                  </div>
                  <TitleReveal><h2 className={styles.materialLeftTitle}>{acc.sectionTitle}</h2></TitleReveal>
                  <p className={styles.materialLeftDesc}>{acc.sectionDesc}</p>
                </div>
                <div className={styles.materialItemsGrid}>
                  {acc.items?.map((item: any, i: number) => (
                    <motion.div key={item.id} className={styles.materialItem} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
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

        {/* ── Appliances ── */}
        {product.appliances?.map((app: any) => (
          <SectionReveal key={app.id}>
            <section className={styles.section}>
              <div className={styles.materialSection}>
                <div className={styles.materialLeft}>
                  <p className={styles.sectionLabel}>Appliances</p>
                  <TitleReveal><h2 className={styles.materialLeftTitle}>{app.sectionTitle}</h2></TitleReveal>
                  <p className={styles.materialLeftDesc}>{app.sectionDesc}</p>
                </div>
                <div className={styles.materialItemsGrid}>
                  {app.items?.map((item: any, i: number) => (
                    <motion.div key={item.id} className={styles.materialItem} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
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

      </div>

      {/* ── Contact ── */}

      <Footer />
    </div>
  );
}
