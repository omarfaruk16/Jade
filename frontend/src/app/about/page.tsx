'use client';

import { useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './About.module.css';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/testimonials`)
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(console.error);
      
    fetch(`${API_BASE}/team`)
      .then(res => res.json())
      .then(data => setTeamMembers(data))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.container}>
        {/* Header Section */}
        <section className={styles.headerSection}>
          <h1 className={styles.pageTitle}>About Us</h1>
          <p className={styles.pageSubtitle}>
            Jade spaces blends high-end design principles with timeless materials
            and luxury living, ensuring every corner offers both inspiration and relaxation.
          </p>

          <div className={styles.heroImagesGrid}>
            <div className={styles.imageCol}>
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Architecture" />
            </div>
            <div className={styles.imageCol}>
              <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Interior Stairs" />
            </div>
            <div className={styles.imageCol}>
              <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Lounge Chair" />
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className={styles.milestoneSection}>
          <div className={styles.milestoneHeader}>
            <span className={styles.label}>Summary</span>
            <h2 className={styles.sectionTitle}>Our Historical Milestones</h2>
          </div>
          
          <div className={styles.milestoneList}>
            <p className={styles.milestoneIntro}>
              We create thoughtful, collaborative spaces that bring together diverse teams
              and foster creativity across borders and disciplines.
            </p>
            
            <div className={styles.milestoneItem}>
               <div className={styles.milestoneText}>
                 <span className={styles.diamondIcon}></span> Designing Across Borders
               </div>
               <span className={styles.year}>2025</span>
            </div>
            <div className={styles.milestoneItem}>
               <div className={styles.milestoneText}>
                 <span className={styles.diamondIcon}></span> Rebranded with a Clearer Vision
               </div>
               <span className={styles.year}>2024</span>
            </div>
            <div className={styles.milestoneItem}>
               <div className={styles.milestoneText}>
                 <span className={styles.diamondIcon}></span> Building a Strong Team
               </div>
               <span className={styles.year}>2023</span>
            </div>
            <div className={styles.milestoneItem}>
               <div className={styles.milestoneText}>
                 <span className={styles.diamondIcon}></span> Expanded to Commercial Design
               </div>
               <span className={styles.year}>2022</span>
            </div>
            <div className={styles.milestoneItem}>
               <div className={styles.milestoneText}>
                 <span className={styles.diamondIcon}></span> Completed 50+ Projects
               </div>
               <span className={styles.year}>2021</span>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className={styles.philosophySection}>
          <div className={styles.philosophyLeft}>
            <h2 className={styles.sectionTitle}>Design With Purpose,<br/>Built on Collaboration</h2>
            <p className={styles.philosophyText}>
              We are a collective of interior designers aiming to elevate everyday spaces with a fine 
              approach that marries light, organic forms, and rich, natural textures.
            </p>
            <ul className={styles.featureList}>
               <li><CheckCircle2 size={18}/> We collaborate with our trusted partners to achieve the best.</li>
               <li><CheckCircle2 size={18}/> Our mission is to transform environments into bespoke sanctuaries.</li>
            </ul>
          </div>
          <div className={styles.philosophyRight}>
            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Wood paneling" className={styles.philImgTop} />
            <div className={styles.philBottomRow}>
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Glass doors" className={styles.philImgLeft}/>
              <img src="https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Vase and chair" className={styles.philImgRight}/>
            </div>
          </div>
        </section>

        {/* Client Voices Section */}
        <section className={styles.clientVoicesSection}>
          <div className={styles.voicesHeader}>
            <h2 className={styles.sectionTitleCenter}>Client Voices</h2>
            <p className={styles.sectionSubtitleCenter}>
              Real feedback from the incredible people we've had the pleasure to design for.
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.length > 0 ? (
              testimonials.map((testi, idx) => (
                <div key={idx} className={styles.testimonialCard}>
                  <div className={styles.stars}>
                    {'★'.repeat(testi.rating)}{'☆'.repeat(5 - testi.rating)}
                  </div>
                  <p className={styles.reviewText}>
                    "{testi.review}"
                  </p>
                  <div className={styles.clientInfo}>
                    <img src={testi.avatar || 'https://via.placeholder.com/50'} alt={testi.name} className={styles.avatar} />
                    <div>
                      <h4 className={styles.clientName}>{testi.name}</h4>
                      <span className={styles.clientRole}>{testi.role}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#666' }}>No testimonials available yet.</p>
            )}
          </div>
        </section>

        {/* Team Section */}
        <section className={styles.teamSection}>
          <div className={styles.teamHeaderRow}>
            <div className={styles.teamHeaderLeft}>
              <h2 className={styles.sectionTitle}>Meet the people behind the process</h2>
              <div className={styles.arrowControls}>
                 {/* Decorative arrows */}
                 <span>←</span> <span>→</span>
              </div>
            </div>
            <div className={styles.teamHeaderRight}>
               We select designers who aren't just skilled—they're truly visionary. 
               Our tight-knit team constantly pushes creative boundaries to deliver exceptional quality.
            </div>
          </div>

          <div className={styles.teamGrid}>
            {teamMembers.length > 0 ? (
              teamMembers.map((member, i) => (
                <div key={i} className={styles.teamMember}>
                  <img src={member.image || 'https://via.placeholder.com/500x600'} alt={member.name} className={styles.teamImage} />
                  <div className={styles.teamNameOverlay}>
                    <div className={styles.memberName}>{member.name}</div>
                    <div className={styles.memberDesignation}>{member.designation}</div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#666' }}>No team members added yet.</p>
            )}
          </div>

          <div className={styles.teamFooter}>
             Join our growing team of creatives
             <p>Passionate about design and elevating living spaces? We're always on the lookout for fresh talent.</p>
             <button className={styles.joinButton}>Join us now</button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
