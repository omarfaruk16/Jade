'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import API_BASE from '@/lib/api';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import TitleReveal from '@/components/layout/TitleReveal';

export default function ProductCategoryPage() {
  const { categorySlug } = useParams() as { categorySlug: string };
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_BASE}/products/categories/${categorySlug}`)
      .then(r => r.json())
      .then(data => {
        if (!data.error) setCategory(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, [categorySlug]);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0c', color: '#fff' }}>Loading...</div>;
  if (!category) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0c', color: '#fff' }}>Category not found</div>;

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ paddingTop: '100px', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '1400px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
        {category.products?.map((product: any) => (
          <div key={product.id} style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => router.push(`/products/details/${product.id}`)}>
            {/* Background Image */}
            <img src={product.coverImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000"} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            
            {/* Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #fff', marginBottom: '1rem' }}></div>
              <TitleReveal><h2 style={{ color: '#fff', fontSize: '3rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{product.title}</h2></TitleReveal>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', marginBottom: '2rem' }}>{product.subtitle}</p>
              <button style={{ padding: '0.8rem 2rem', borderRadius: '9999px', background: '#fff', color: '#000', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Buy now</button>
            </div>
          </div>
        ))}

        {(!category.products || category.products.length === 0) && (
          <div style={{ textAlign: 'center', color: '#888', padding: '4rem' }}>No products found in this category.</div>
        )}
      </div>

      <Footer />
    </div>
  );
}
