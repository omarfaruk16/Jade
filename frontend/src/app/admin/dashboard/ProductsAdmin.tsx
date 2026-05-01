'use client';

import { useState, useEffect, useRef } from 'react';
import API_BASE from '@/lib/api';
import { Plus, Trash2, Edit2, X, Bold, Italic, List } from 'lucide-react';
import styles from './AdminDashboard.module.css';

const API = `${API_BASE}/products`;

// ─── tiny richtext toolbar ────────────────────────────────────────────────────
function RichEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, []);

  const cmd = (command: string, val?: string) => {
    document.execCommand(command, false, val);
    if (ref.current) onChange(ref.current.innerHTML);
  };

  const btnStyle = (active = false): React.CSSProperties => ({
    padding: '6px 10px', background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
    border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 6, cursor: 'pointer', fontSize: 12
  });

  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 6, padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button type="button" style={btnStyle()} onMouseDown={e => { e.preventDefault(); cmd('bold'); }}><Bold size={13} /></button>
        <button type="button" style={btnStyle()} onMouseDown={e => { e.preventDefault(); cmd('italic'); }}><Italic size={13} /></button>
        <button type="button" style={btnStyle()} onMouseDown={e => { e.preventDefault(); cmd('insertOrderedList'); }}><List size={13} /></button>
        <button type="button" style={btnStyle()} onMouseDown={e => { e.preventDefault(); cmd('insertUnorderedList'); }}>• List</button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={() => { if (ref.current) onChange(ref.current.innerHTML); }}
        style={{ minHeight: 100, padding: '12px 16px', background: 'rgba(0,0,0,0.2)', color: '#fff', outline: 'none', fontSize: 14, lineHeight: 1.6 }}
      />
    </div>
  );
}

const inp: React.CSSProperties = { background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem 1rem', borderRadius: 12, color: '#fff', width: '100%', fontSize: 14, boxSizing: 'border-box', outline: 'none' };
const lbl: React.CSSProperties = { fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 6, display: 'block', fontWeight: 500 };
const card: React.CSSProperties = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '1.5rem', marginBottom: '1rem' };

export default function ProductsAdmin() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [view, setView] = useState<'categories' | 'products'>('categories');

  const [categoryModal, setCategoryModal] = useState(false);
  const [editCategory, setEditCategory] = useState<any>(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', image: '', order: 0 });

  const [productModal, setProductModal] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [productForm, setProductForm] = useState({ 
    title: '', subtitle: '', coverImage: '', categoryId: '',
    about: '', keyLine: '', imageUrl: '', order: 0,
    featureQuotesJson: '[]',
    whatsIncluded: [] as { title: string; description: string }[],
    gallery: [] as { url: string }[]
  });

  const fetchAll = async () => {
    const [cRes, pRes] = await Promise.all([
      fetch(`${API}/categories`),
      fetch(`${API}`)
    ]);
    setCategories(await cRes.json());
    setProducts(await pRes.json());
  };

  useEffect(() => { fetchAll(); }, []);

  const upload = async (file: File): Promise<string> => {
    setUploading(true);
    const fd = new FormData(); fd.append('image', file);
    const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: fd });
    const data = await res.json();
    setUploading(false);
    return data.url || '';
  };

  const getAuthHeaders = () => {
    const t = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${t}` };
  };

  const saveCategory = async () => {
    try {
      const method = editCategory ? 'PUT' : 'POST';
      const url = editCategory ? `${API}/categories/${editCategory.id}` : `${API}/categories`;
      const res = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(categoryForm) });
      if (!res.ok) throw new Error(await res.text());
      setCategoryModal(false); fetchAll();
    } catch (e: any) { alert('Error saving category: ' + e.message); }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete category and ALL its products?')) return;
    try {
      const res = await fetch(`${API}/categories/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (!res.ok) throw new Error(await res.text());
      fetchAll();
    } catch (e: any) { alert('Error deleting category: ' + e.message); }
  };

  const saveProduct = async () => {
    try {
      const method = editProduct ? 'PUT' : 'POST';
      const url = editProduct ? `${API}/${editProduct.id}` : `${API}`;
      const res = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(productForm) });
      if (!res.ok) throw new Error(await res.text());
      setProductModal(false); fetchAll();
    } catch (e: any) { alert('Error saving product: ' + e.message); }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (!res.ok) throw new Error(await res.text());
      fetchAll();
    } catch (e: any) { alert('Error deleting product: ' + e.message); }
  };

  const openCategoryModal = (c?: any) => {
    setEditCategory(c || null);
    setCategoryForm(c ? { name: c.name, image: c.image || '', order: c.order || 0 } : { name: '', image: '', order: 0 });
    setCategoryModal(true);
  };

  const openProductModal = (p?: any) => {
    setEditProduct(p || null);
    setProductForm(p ? {
      title: p.title, subtitle: p.subtitle, coverImage: p.coverImage, categoryId: p.categoryId,
      overviewCategory: p.overviewCategory || '', overviewBestFor: p.overviewBestFor || '', overviewStyleApproach: p.overviewStyleApproach || '',
      about: p.about || '', keyLine: p.keyLine || '', imageUrl: p.imageUrl || '', order: p.order || 0,
      featureQuotesJson: p.featureQuotesJson || '[]',
      whatsIncluded: p.whatsIncluded?.map((w: any) => ({ title: w.title, description: w.description })) || [],
      gallery: p.gallery?.map((g: any) => ({ url: g.url })) || []
    } : {
      title: '', subtitle: '', coverImage: '', categoryId: categories[0]?.id || '',
      overviewCategory: '', overviewBestFor: '', overviewStyleApproach: '',
      about: '', keyLine: '', imageUrl: '', order: 0,
      featureQuotesJson: '[]',
      whatsIncluded: [], gallery: []
    });
    setProductModal(true);
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, padding: '2rem'
  };
  const modalStyle: React.CSSProperties = {
    background: '#111', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', padding: '3rem',
    width: '100%', maxWidth: 700, maxHeight: '90vh', overflowY: 'auto', position: 'relative',
    boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: '2rem' }}>
        <button onClick={() => setView('categories')} className={`${styles.navButton} ${view === 'categories' ? styles.activeNav : ''}`} style={{ padding: '0.6rem 1.4rem' }}>Product Categories</button>
        <button onClick={() => setView('products')} className={`${styles.navButton} ${view === 'products' ? styles.activeNav : ''}`} style={{ padding: '0.6rem 1.4rem' }}>Products</button>
      </div>

      {view === 'categories' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem' }}>Product Categories</h3>
            <button onClick={() => openCategoryModal()} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.6rem 1.2rem', background: '#fff', color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
              <Plus size={16} /> Add Category
            </button>
          </div>
          {categories.map(c => (
            <div key={c.id} style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {c.image && <img src={c.image} alt="" style={{ width: 60, height: 45, objectFit: 'cover', borderRadius: 6 }} />}
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>{c.name}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => openCategoryModal(c)} style={{ padding: '6px 10px', background: '#1a1a1c', color: '#fff', border: '1px solid #333', borderRadius: 6, cursor: 'pointer' }}><Edit2 size={14} /></button>
                  <button onClick={() => deleteCategory(c.id)} style={{ padding: '6px 10px', background: '#1a1a1c', color: '#ef4444', border: '1px solid #333', borderRadius: 6, cursor: 'pointer' }}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'products' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem' }}>Products</h3>
            <button onClick={() => openProductModal()} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.6rem 1.2rem', background: '#fff', color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
              <Plus size={16} /> Add Product
            </button>
          </div>
          {products.map(p => (
            <div key={p.id} style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{p.title}</div>
                  <div style={{ color: '#555', fontSize: 12, marginTop: 4 }}>{p.category?.name}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  {p.coverImage && <img src={p.coverImage} alt="" style={{ width: 60, height: 45, objectFit: 'cover', borderRadius: 6 }} />}
                  <button onClick={() => openProductModal(p)} style={{ padding: '6px 10px', background: '#1a1a1c', color: '#fff', border: '1px solid #333', borderRadius: 6, cursor: 'pointer' }}><Edit2 size={14} /></button>
                  <button onClick={() => deleteProduct(p.id)} style={{ padding: '6px 10px', background: '#1a1a1c', color: '#ef4444', border: '1px solid #333', borderRadius: 6, cursor: 'pointer' }}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {categoryModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <button onClick={() => setCategoryModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X /></button>
            <h3 style={{ color: '#fff', marginBottom: '1.5rem' }}>{editCategory ? 'Edit' : 'Add'} Category</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div><label style={lbl}>Category Name</label><input style={inp} value={categoryForm.name} onChange={e => setCategoryForm({ ...categoryForm, name: e.target.value })} /></div>
              <div>
                <label style={lbl}>Category Image (Header Megamenu)</label>
                {categoryForm.image && <img src={categoryForm.image} alt="Cover" style={{ width: 100, height: 60, objectFit: 'cover', borderRadius: 4, marginBottom: 8, display: 'block' }} />}
                <input type="file" onChange={async e => {
                  const file = e.target.files?.[0]; if (!file) return;
                  const url = await upload(file);
                  setCategoryForm({ ...categoryForm, image: url });
                }} />
              </div>
              <button onClick={saveCategory} disabled={uploading} style={{ padding: '1rem', background: '#fff', color: '#000', border: 'none', borderRadius: 10, fontWeight: 800, cursor: 'pointer', marginTop: 8 }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {productModal && (
        <div style={overlayStyle}>
          <div style={{ ...modalStyle, maxWidth: 860 }}>
            <button onClick={() => setProductModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X /></button>
            <h3 style={{ color: '#fff', marginBottom: '1.5rem' }}>{editProduct ? 'Edit' : 'Add'} Product</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div><label style={lbl}>Category</label>
                <select style={inp} value={productForm.categoryId} onChange={e => setProductForm({ ...productForm, categoryId: e.target.value })}>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={lbl}>Product Title</label><input style={inp} value={productForm.title} onChange={e => setProductForm({ ...productForm, title: e.target.value })} /></div>
                <div><label style={lbl}>Product Subtitle</label><input style={inp} value={productForm.subtitle} onChange={e => setProductForm({ ...productForm, subtitle: e.target.value })} /></div>
              </div>

              <div>
                <label style={lbl}>Cover Image</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input style={{ ...inp, flex: 1, fontSize: 11 }} value={productForm.coverImage} readOnly placeholder="Upload or paste URL" />
                  <label style={{ padding: '0.6rem 1rem', background: '#1a1a1c', border: '1px solid #333', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: 12 }}>
                    {uploading ? 'Uploading…' : 'Choose File'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async e => {
                      const file = e.target.files?.[0]; if (!file) return;
                      const url = await upload(file);
                      setProductForm(f => ({ ...f, coverImage: url }));
                    }} />
                  </label>
                  {productForm.coverImage && <img src={productForm.coverImage} alt="" style={{ width: 60, height: 45, objectFit: 'cover', borderRadius: 6 }} />}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div><label style={lbl}>Overview Category</label><input style={inp} value={productForm.overviewCategory} onChange={e => setProductForm({ ...productForm, overviewCategory: e.target.value })} /></div>
                <div><label style={lbl}>Overview Best For</label><input style={inp} value={productForm.overviewBestFor} onChange={e => setProductForm({ ...productForm, overviewBestFor: e.target.value })} /></div>
                <div><label style={lbl}>Overview Style Approach</label><input style={inp} value={productForm.overviewStyleApproach} onChange={e => setProductForm({ ...productForm, overviewStyleApproach: e.target.value })} /></div>
              </div>

              <div><label style={lbl}>About</label><textarea style={{ ...inp, minHeight: 90 }} value={productForm.about} onChange={e => setProductForm({ ...productForm, about: e.target.value })} /></div>
              
              <div><label style={lbl}>Key Line (Red Box)</label><input style={inp} value={productForm.keyLine} onChange={e => setProductForm({ ...productForm, keyLine: e.target.value })} /></div>

              <div>
                <label style={lbl}>About Image</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input style={{ ...inp, flex: 1, fontSize: 11 }} value={productForm.imageUrl} readOnly placeholder="Upload or paste URL" />
                  <label style={{ padding: '0.6rem 1rem', background: '#1a1a1c', border: '1px solid #333', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: 12 }}>
                    {uploading ? 'Uploading…' : 'Choose File'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async e => {
                      const file = e.target.files?.[0]; if (!file) return;
                      const url = await upload(file);
                      setProductForm(f => ({ ...f, imageUrl: url }));
                    }} />
                  </label>
                  {productForm.imageUrl && <img src={productForm.imageUrl} alt="" style={{ width: 60, height: 45, objectFit: 'cover', borderRadius: 6 }} />}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ ...lbl, margin: 0 }}>What's Included Items</label>
                  <button type="button" onClick={() => setProductForm(f => ({ ...f, whatsIncluded: [...f.whatsIncluded, { title: '', description: '' }] }))}
                    style={{ padding: '4px 10px', background: '#1a1a1c', border: '1px solid #333', borderRadius: 6, color: '#fff', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Plus size={12} /> Add Item
                  </button>
                </div>
                {productForm.whatsIncluded.map((w, idx) => (
                  <div key={idx} style={{ background: '#0a0a0c', border: '1px solid #222', borderRadius: 10, padding: '1rem', marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ color: '#666', fontSize: 12 }}>Item {idx + 1}</span>
                      <button type="button" onClick={() => setProductForm(f => ({ ...f, whatsIncluded: f.whatsIncluded.filter((_, i) => i !== idx) }))}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
                    </div>
                    <input style={{ ...inp, marginBottom: 8 }} value={w.title} onChange={e => {
                      const arr = [...productForm.whatsIncluded]; arr[idx].title = e.target.value;
                      setProductForm(f => ({ ...f, whatsIncluded: arr }));
                    }} placeholder="Item title" />
                    <RichEditor value={w.description} onChange={v => {
                      const arr = [...productForm.whatsIncluded]; arr[idx].description = v;
                      setProductForm(f => ({ ...f, whatsIncluded: arr }));
                    }} />
                  </div>
                ))}
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ ...lbl, margin: 0 }}>Feature Quotes (Right side of Features section)</label>
                  <button type="button" onClick={() => {
                    const quotes = JSON.parse(productForm.featureQuotesJson || "[]");
                    setProductForm({ ...productForm, featureQuotesJson: JSON.stringify([...quotes, ""]) });
                  }}
                    style={{ padding: '4px 10px', background: '#1a1a1c', border: '1px solid #333', borderRadius: 6, color: '#fff', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Plus size={12} /> Add Quote
                  </button>
                </div>
                {JSON.parse(productForm.featureQuotesJson || "[]").map((q: string, idx: number) => (
                  <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input style={inp} value={q} onChange={e => {
                      const quotes = JSON.parse(productForm.featureQuotesJson || "[]");
                      quotes[idx] = e.target.value;
                      setProductForm({ ...productForm, featureQuotesJson: JSON.stringify(quotes) });
                    }} placeholder="Quote text..." />
                    <button type="button" onClick={() => {
                      const quotes = JSON.parse(productForm.featureQuotesJson || "[]");
                      quotes.splice(idx, 1);
                      setProductForm({ ...productForm, featureQuotesJson: JSON.stringify(quotes) });
                    }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ ...lbl, margin: 0 }}>Gallery Images</label>
                  <label style={{ padding: '4px 10px', background: '#1a1a1c', border: '1px solid #333', borderRadius: 6, color: '#fff', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Plus size={12} /> Add Images
                    <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={async e => {
                      const files = Array.from(e.target.files || []);
                      const urls = await Promise.all(files.map(f => upload(f)));
                      setProductForm(f => ({ ...f, gallery: [...f.gallery, ...urls.map(url => ({ url }))] }));
                    }} />
                  </label>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                  {productForm.gallery.map((g, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <img src={g.url} alt="" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 8 }} />
                      <button type="button" onClick={() => setProductForm(f => ({ ...f, gallery: f.gallery.filter((_, i) => i !== idx) }))}
                        style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.7)', border: 'none', color: '#ef4444', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={saveProduct} disabled={uploading} style={{ padding: '1.1rem', background: uploading ? '#444' : '#fff', color: uploading ? '#888' : '#000', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: uploading ? 'not-allowed' : 'pointer', marginTop: 8 }}>
                {uploading ? 'Uploading images…' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
