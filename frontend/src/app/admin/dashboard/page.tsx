'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Edit2, Trash2, Eye, Plus, Megaphone, Folder, MessageSquare, Users, HelpCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'projects' | 'promotions' | 'testimonials' | 'team' | 'faq'>('projects');
  const [projects, setProjects] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const router = useRouter();

  const [projectData, setProjectData] = useState({
    title: '', subtitle: '', coverImage: '', date: '', category: '', client: '', timeline: '',
    overviewDesc: '', overviewImage: '', processImage: '',
    p1Title: '', p1Desc: '', p2Title: '', p2Desc: '', p3Title: '', p3Desc: '', galleryJson: '[]'
  });

  const [promotionData, setPromotionData] = useState({ title: '', image: '' });
  const [testimonialData, setTestimonialData] = useState({ name: '', role: '', review: '', avatar: '', rating: 5 });
  const [teamData, setTeamData] = useState({ name: '', designation: '', image: '' });
  const [faqData, setFaqData] = useState({ question: '', answer: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projRes, promRes, testRes, teamRes, faqRes] = await Promise.all([
        fetch('http://localhost:5001/api/projects'),
        fetch('http://localhost:5001/api/promotions'),
        fetch('http://localhost:5001/api/testimonials'),
        fetch('http://localhost:5001/api/team'),
        fetch('http://localhost:5001/api/faq')
      ]);
      setProjects(await projRes.json());
      setPromotions(await promRes.json());
      setTestimonials(await testRes.json());
      setTeam(await teamRes.json());
      setFaqs(await faqRes.json());
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, tab: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await fetch('http://localhost:5001/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        if (tab === 'promotions') setPromotionData(prev => ({ ...prev, [field]: data.url }));
        else if (tab === 'testimonials') setTestimonialData(prev => ({ ...prev, [field]: data.url }));
        else if (tab === 'team') setTeamData(prev => ({ ...prev, [field]: data.url }));
        else setProjectData(prev => ({ ...prev, [field]: data.url }));
      }
    } catch (err) { console.error(err); }
    finally { setUploading(false); }
  };

  const handleOpenModal = (item: any = null) => {
    if (activeTab === 'projects') {
      if (item) { setEditingItem(item); setProjectData({ ...item }); }
      else { setEditingItem(null); setProjectData({ title: '', subtitle: '', coverImage: '', date: '', category: '', client: '', timeline: '', overviewDesc: '', overviewImage: '', processImage: '', p1Title: '', p1Desc: '', p2Title: '', p2Desc: '', p3Title: '', p3Desc: '', galleryJson: '[]' }); }
    } else if (activeTab === 'promotions') {
      if (item) { setEditingItem(item); setPromotionData({ title: item.title, image: item.image }); }
      else { setEditingItem(null); setPromotionData({ title: '', image: '' }); }
    } else if (activeTab === 'testimonials') {
      if (item) { setEditingItem(item); setTestimonialData({ name: item.name, role: item.role || '', review: item.review, avatar: item.avatar || '', rating: item.rating }); }
      else { setEditingItem(null); setTestimonialData({ name: '', role: '', review: '', avatar: '', rating: 5 }); }
    } else if (activeTab === 'team') {
      if (item) { setEditingItem(item); setTeamData({ name: item.name, designation: item.designation || '', image: item.image || '' }); }
      else { setEditingItem(null); setTeamData({ name: '', designation: '', image: '' }); }
    } else if (activeTab === 'faq') {
      if (item) { setEditingItem(item); setFaqData({ question: item.question, answer: item.answer }); }
      else { setEditingItem(null); setFaqData({ question: '', answer: '' }); }
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const method = editingItem ? 'PUT' : 'POST';
    const endpoint = activeTab;
    const url = editingItem ? `http://localhost:5001/api/${endpoint}/${editingItem.id}` : `http://localhost:5001/api/${endpoint}`;

    let bodyData;
    if (activeTab === 'projects') bodyData = projectData;
    else if (activeTab === 'promotions') bodyData = promotionData;
    else if (activeTab === 'testimonials') bodyData = { ...testimonialData, rating: Number(testimonialData.rating) };
    else if (activeTab === 'team') bodyData = teamData;
    else if (activeTab === 'faq') bodyData = faqData;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(bodyData)
      });
      if (res.ok) { setIsModalOpen(false); fetchData(); }
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id: string, tab: string) => {
    if (!confirm('Are you sure?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`http://localhost:5001/api/${tab}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchData();
    } catch (e) { console.error(e); }
  };

  const getActiveArray = () => {
    if (activeTab === 'projects') return projects;
    if (activeTab === 'promotions') return promotions;
    if (activeTab === 'testimonials') return testimonials;
    if (activeTab === 'team') return team;
    return faqs;
  };

  if (loading) return <div style={{ background:'#0a0a0c', minHeight:'100vh', color:'#fff', padding:'2rem' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0c', color: '#fff', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Jade Control</h2>
        <div style={{ display:'flex', gap:'1rem'}}>
           <div style={{ background:'#111', borderRadius:'12px', padding:'4px', display:'flex', border:'1px solid #222' }}>
              <button onClick={() => setActiveTab('projects')} style={{ padding:'0.6rem 1.2rem', borderRadius:'8px', background: activeTab === 'projects' ? '#222' : 'transparent', color: '#fff', border:'none', cursor:'pointer', display:'flex', gap:'0.5rem', alignItems:'center'}}>
                <Folder size={18}/> Projects
              </button>
              <button onClick={() => setActiveTab('promotions')} style={{ padding:'0.6rem 1.2rem', borderRadius:'8px', background: activeTab === 'promotions' ? '#222' : 'transparent', color: '#fff', border:'none', cursor:'pointer', display:'flex', gap:'0.5rem', alignItems:'center'}}>
                <Megaphone size={18}/> Promotions
              </button>
              <button onClick={() => setActiveTab('testimonials')} style={{ padding:'0.6rem 1.2rem', borderRadius:'8px', background: activeTab === 'testimonials' ? '#222' : 'transparent', color: '#fff', border:'none', cursor:'pointer', display:'flex', gap:'0.5rem', alignItems:'center'}}>
                <MessageSquare size={18}/> Voices
              </button>
              <button onClick={() => setActiveTab('team')} style={{ padding:'0.6rem 1.2rem', borderRadius:'8px', background: activeTab === 'team' ? '#222' : 'transparent', color: '#fff', border:'none', cursor:'pointer', display:'flex', gap:'0.5rem', alignItems:'center'}}>
                <Users size={18}/> Team
              </button>
              <button onClick={() => setActiveTab('faq')} style={{ padding:'0.6rem 1.2rem', borderRadius:'8px', background: activeTab === 'faq' ? '#222' : 'transparent', color: '#fff', border:'none', cursor:'pointer', display:'flex', gap:'0.5rem', alignItems:'center'}}>
                <HelpCircle size={18}/> FAQ
              </button>
           </div>
           <button onClick={() => { localStorage.removeItem('adminToken'); router.push('/admin'); }} style={{ padding: '0.6rem 1.2rem', background: '#1a1a1c', color: '#fff', border: '1px solid #333', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      <div style={{ background: '#111', padding: '2rem', borderRadius: '16px', border: '1px solid #222' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.4rem' }}>
            {activeTab === 'projects' ? 'Portfolio Projects' : activeTab === 'promotions' ? 'Active Promotions' : activeTab === 'testimonials' ? 'Client Testimonials' : activeTab === 'team' ? 'Team Members' : 'FAQs'}
          </h3>
          <button onClick={() => handleOpenModal()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.5rem', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
            <Plus size={18} /> Add New
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #222' }}>
                <th style={{ padding: '1rem', color: '#666' }}>
                  {activeTab === 'faq' ? 'Question' : (activeTab === 'projects' || activeTab === 'promotions' ? 'Title' : 'Name')}
                </th>
                <th style={{ padding: '1rem', color: '#666', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getActiveArray().map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #1a1a1c' }}>
                  <td style={{ padding: '1rem' }}>
                    {activeTab === 'faq' ? item.question : (activeTab === 'projects' || activeTab === 'promotions' ? item.title : item.name)}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    {activeTab === 'projects' && <button onClick={() => router.push(`/projects/${item.id}`)} title="View" style={{ padding: '0.5rem', background: '#1a1a1c', color: '#fff', border: '1px solid #333', borderRadius: '6px', cursor: 'pointer' }}><Eye size={16}/></button>}
                    <button onClick={() => handleOpenModal(item)} title="Edit" style={{ padding: '0.5rem', background: '#1a1a1c', color: '#fff', border: '1px solid #333', borderRadius: '6px', cursor: 'pointer' }}><Edit2 size={16}/></button>
                    <button onClick={() => handleDelete(item.id, activeTab)} title="Delete" style={{ padding: '0.5rem', background: '#1a1a1c', color: '#ef4444', border: '1px solid #333', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '2rem' }}>
          <div style={{ background: '#111', width: '100%', maxWidth: activeTab === 'projects' ? '800px' : '500px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '24px', border: '1px solid #333', padding: '2.5rem', position: 'relative' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X /></button>
            <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>{editingItem ? 'Edit' : 'Add'}</h3>
            <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: activeTab === 'projects' ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
              {activeTab === 'projects' && (
                <>
                  <input required placeholder="Title" value={projectData.title} onChange={e => setProjectData({...projectData, title: e.target.value})} style={{ background: '#000', border: '1px solid #333', padding: '0.8rem', borderRadius: '8px', color: '#fff' }} />
                  <input required placeholder="Subtitle" value={projectData.subtitle} onChange={e => setProjectData({...projectData, subtitle: e.target.value})} style={{ background: '#000', border: '1px solid #333', padding: '0.8rem', borderRadius: '8px', color: '#fff' }} />
                  <div style={{ gridColumn: 'span 2'}}><label style={{fontSize:'0.8rem', color:'#888'}}>Cover Image</label><div style={{display:'flex', gap:'0.5rem'}}><input value={projectData.coverImage} readOnly style={{ flex:1, background: '#000', border: '1px solid #333', padding: '0.8rem', borderRadius: '8px', color: '#fff' }}/><input type="file" onChange={e => handleUpload(e, 'coverImage', 'projects')}/></div></div>
                  <textarea required placeholder="Description" value={projectData.overviewDesc} onChange={e => setProjectData({...projectData, overviewDesc: e.target.value})} style={{ gridColumn: 'span 2', background: '#000', border: '1px solid #333', padding: '0.8rem', borderRadius: '8px', color: '#fff', minHeight: '100px' }} />
                </>
              )}
              {activeTab === 'promotions' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Promotion Title</label>
                    <input required value={promotionData.title} onChange={e => setPromotionData({...promotionData, title: e.target.value})} style={{ background: '#000', border: '1px solid #333', padding: '0.8rem', borderRadius: '8px', color: '#fff' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Promotion Image {uploading && '(Uploading...)'}</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input value={promotionData.image} readOnly style={{ flex: 1, background: '#000', border: '1px solid #333', padding: '0.8rem', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }} />
                      <input type="file" accept="image/*" onChange={e => handleUpload(e, 'image', 'promotions')} style={{ width: '100px' }} />
                    </div>
                  </div>
                </>
              )}
              {activeTab === 'testimonials' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Reviewer Name</label>
                    <input required value={testimonialData.name} onChange={e => setTestimonialData({...testimonialData, name: e.target.value})} style={{ background: '#000', border: '1px solid #333', padding: '0.8rem', borderRadius: '8px', color: '#fff' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Role</label>
                    <input value={testimonialData.role} onChange={e => setTestimonialData({...testimonialData, role: e.target.value})} style={{ background: '#000', border: '1px solid #333', padding: '0.8rem', borderRadius: '8px', color: '#fff' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Review Text</label>
                    <textarea required value={testimonialData.review} onChange={e => setTestimonialData({...testimonialData, review: e.target.value})} style={{ background: '#000', border: '1px solid #333', padding: '0.8rem', borderRadius: '8px', color: '#fff', minHeight: '100px' }} />
                  </div>
                </>
              )}
              {activeTab === 'team' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Team Member Name</label>
                    <input required value={teamData.name} onChange={e => setTeamData({...teamData, name: e.target.value})} style={{ background: '#000', border: '1px solid #333', padding: '0.8rem', borderRadius: '8px', color: '#fff' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Designation</label>
                    <input value={teamData.designation} onChange={e => setTeamData({...teamData, designation: e.target.value})} style={{ background: '#000', border: '1px solid #333', padding: '0.8rem', borderRadius: '8px', color: '#fff' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Image Portrait</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input value={teamData.image} readOnly style={{ flex: 1, background: '#000', border: '1px solid #333', padding: '0.8rem', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }} />
                      <input type="file" accept="image/*" onChange={e => handleUpload(e, 'image', 'team')} style={{ width: '100px' }} />
                    </div>
                  </div>
                </>
              )}
              {activeTab === 'faq' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Question</label>
                    <input required value={faqData.question} onChange={e => setFaqData({...faqData, question: e.target.value})} style={{ background: '#000', border: '1px solid #333', padding: '0.8rem', borderRadius: '8px', color: '#fff' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Answer</label>
                    <textarea required value={faqData.answer} onChange={e => setFaqData({...faqData, answer: e.target.value})} style={{ background: '#000', border: '1px solid #333', padding: '0.8rem', borderRadius: '8px', color: '#fff', minHeight: '150px' }} />
                  </div>
                </>
              )}
              <button type="submit" disabled={uploading} style={{ gridColumn: 'span ' + (activeTab === 'projects' ? 2 : 1), marginTop: '1rem', padding: '1.2rem', background: uploading ? '#444' : '#fff', color: uploading ? '#888' : '#000', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '1.1rem', cursor: uploading ? 'not-allowed' : 'pointer' }}>
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
