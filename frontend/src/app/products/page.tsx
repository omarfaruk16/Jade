'use client';

import { useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ProductsOverviewPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/products/categories`)
      .then(r => r.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0c', color: '#fff' }}>Loading...</div>;

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ paddingTop: '120px', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', maxWidth: '1400px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
        <h1 style={{ color: '#fff', fontSize: '3rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Our Products</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', marginBottom: '4rem', maxWidth: '600px' }}>Explore our range of premium collections, crafted with luxury and elegance in mind.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%' }}>
          {categories.map((cat: any) => (
            <Link key={cat.id} href={`/products/${cat.slug}`} style={{ textDecoration: 'none', display: 'block', position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '400px' }}>
              {/* Background Image */}
              <img src={cat.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000"} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')} onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')} />
              
              {/* Overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '2rem' }}>
                <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem' }}>{cat.name}</h2>
                <div style={{ padding: '0.5rem 1.5rem', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '0.9rem' }}>Explore Collection</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
