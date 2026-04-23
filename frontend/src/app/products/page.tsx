'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './Products.module.css';
import { motion } from 'framer-motion';

const categories = ['All', 'Furniture', 'Lighting', 'Decor', 'Textiles'];

const allProducts = [
  { name: 'Oslo Lounge Chair', category: 'Furniture', price: '$1,290', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', badge: 'Best Seller' },
  { name: 'Cascadia Pendant Light', category: 'Lighting', price: '$480', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?auto=format&fit=crop&w=800&q=80', badge: '' },
  { name: 'Murano Glass Vase', category: 'Decor', price: '$320', img: 'https://images.unsplash.com/photo-1581783898895-26e625274e2b?auto=format&fit=crop&w=800&q=80', badge: 'New' },
  { name: 'Merino Wool Throw', category: 'Textiles', price: '$195', img: 'https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=800&q=80', badge: '' },
  { name: 'Noir Console Table', category: 'Furniture', price: '$2,100', img: 'https://images.unsplash.com/photo-1532372320978-5d5e8d052a66?auto=format&fit=crop&w=800&q=80', badge: '' },
  { name: 'Arc Floor Lamp', category: 'Lighting', price: '$640', img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80', badge: 'Popular' },
  { name: 'Sculptural Bowl Set', category: 'Decor', price: '$175', img: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=80', badge: '' },
  { name: 'Linen Duvet Cover', category: 'Textiles', price: '$280', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80', badge: '' },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* Hero */}
      <section className={styles.heroSection}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.heroTitle}
        >
          Premium Products
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={styles.heroSub}
        >
          Curated pieces sourced from the finest artisans and manufacturers worldwide.
        </motion.p>
      </section>

      <div className={styles.container}>
        {/* Category Tabs */}
        <div className={styles.categoryTabs}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.catTab} ${activeCategory === cat ? styles.catTabActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div
          className={styles.productsGrid}
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map((product, i) => (
            <motion.div
              key={product.name}
              className={styles.productCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className={styles.productImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.img} alt={product.name} className={styles.productImage} />
                {product.badge && (
                  <span className={styles.productBadge}>{product.badge}</span>
                )}
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productCategory}>{product.category}</div>
                <h3 className={styles.productName}>{product.name}</h3>
                <span className={styles.productPrice}>{product.price}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Showcase Banner */}
      <section className={styles.showcaseSection}>
        <div className={styles.showcaseBg} />
        <div className={styles.showcaseContent}>
          <motion.h2
            className={styles.showcaseTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Art of Living Well
          </motion.h2>
          <p className={styles.showcaseDesc}>
            Every piece in our collection is chosen for its craftsmanship, materiality, and timeless design.
          </p>
          <button className={styles.showcaseBtn}>View Full Catalog</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
