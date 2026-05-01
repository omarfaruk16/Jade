'use client';

import { useState, useEffect } from 'react';
import API_BASE from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './Dealer.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function DealerPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    location: '',
    budget: '',
    interest: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/contact`)
      .then(res => res.json())
      .then(data => setPartners(data))
      .catch(err => console.error(err));

    fetch(`${API_BASE}/faq`)
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/dealer/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ fullName: '', email: '', phone: '', businessName: '', location: '', budget: '', interest: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className={styles.dealerPage}>
      <Navbar />
      
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Worldwide Export Import</h1>
          <p className={styles.subtitle}>We specialize in delivering high-quality architectural solutions, accessories, and products to a global client base.</p>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.container}>
          <div>
             <div className={styles.introInfo}>
                <p>The inspiration from Scandinavian aesthetics, emphasizing simplicity, functionality, and natural beauty. The design combines neutral color palettes—such as whites, grays, and soft pastels—with warm wooden accents to create a cozy and inviting atmosphere.</p>
                <div className={styles.founder}>
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Founder" />
                  <div>
                    <h4>Ar. Al-Fahim</h4>
                    <span>Founder & CEO</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className={styles.officeDesignDetailed}>
        <div className={styles.container}>
          <div className={styles.officeHeader}>
            <h2 className={styles.officeTitle}>Office Design</h2>
            <div className={styles.officeHeaderRight}>
              <p>Learn more about our practice, or read<br />stories from our studio.</p>
              <button className={styles.contactNowBtn}>Contact now</button>
            </div>
          </div>

          <div className={styles.featureRow}>
            <div className={styles.featureLabel}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="6" r="2.5" fill="#000"/>
                <circle cx="12" cy="18" r="2.5" fill="#000"/>
                <circle cx="6" cy="12" r="2.5" fill="#000"/>
                <circle cx="18" cy="12" r="2.5" fill="#000"/>
              </svg>
              <span>What&apos;s included</span>
            </div>
            <div className={styles.featureGridText}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={styles.conceptBlock}>
                  <h4>Concept Development</h4>
                  <p>We started by capturing the essence of coastal life—light, air, and movement. The palette leaned into ocean blues, sandy neutrals, and breezy white finishes.</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.featureRow}>
            <div className={styles.featureLabel}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="6" r="2.5" fill="#000"/>
                <circle cx="12" cy="18" r="2.5" fill="#000"/>
                <circle cx="6" cy="12" r="2.5" fill="#000"/>
                <circle cx="18" cy="12" r="2.5" fill="#000"/>
              </svg>
              <span>What&apos;s included</span>
            </div>
            <div className={styles.featureGridQuotes}>
              <div className={`${styles.quoteCard} ${styles.quoteOrange}`}>
                <div className={styles.quoteIconWrap}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14 17H17L19 13V7H13V13H16L14 17ZM6 17H9L11 13V7H5V13H8L6 17Z"/></svg>
                </div>
                <p>The design combines neutral color palettes—such as whites, grays, and soft pastels</p>
              </div>
              <div className={styles.quoteCard}>
                <div className={`${styles.quoteIconWrap} ${styles.quoteIconOrange}`}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14 17H17L19 13V7H13V13H16L14 17ZM6 17H9L11 13V7H5V13H8L6 17Z"/></svg>
                </div>
                <p>The design combines neutral color palettes—such as whites, grays, and soft pastels</p>
              </div>
              <div className={styles.quoteCard}>
                <div className={`${styles.quoteIconWrap} ${styles.quoteIconOrange}`}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14 17H17L19 13V7H13V13H16L14 17ZM6 17H9L11 13V7H5V13H8L6 17Z"/></svg>
                </div>
                <p>The design combines neutral color palettes—such as whites, grays, and soft pastels</p>
              </div>
              <div className={styles.quoteCard}>
                <div className={`${styles.quoteIconWrap} ${styles.quoteIconOrange}`}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14 17H17L19 13V7H13V13H16L14 17ZM6 17H9L11 13V7H5V13H8L6 17Z"/></svg>
                </div>
                <p>The design combines neutral color palettes—such as whites, grays, and soft pastels</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqCardSection}>
        <div className={styles.container}>
          <div className={styles.faqHeaderCard}>
            <h2 className={styles.faqTitleCard}>Answers that bring clarity</h2>
            <p className={styles.faqSubtitleCard}>We&apos;ve answered the most common questions to help you move forward.</p>
          </div>

          <div className={styles.faqSplitCard}>
            <div className={styles.faqListCard}>
              {faqs.map((faq) => (
                <div key={faq.id} className={styles.faqItemCard}>
                  <button 
                    className={styles.faqTriggerCard}
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  >
                    <span>{faq.question}</span>
                    {openFaq === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {openFaq === faq.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={styles.faqContentCard}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            
            <div className={styles.faqImageWrapCard}>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img 
                 src="/images/contact_faq_team.png" 
                 alt="Team working" 
                 className={styles.faqRightImage}
               />
               <div className={styles.faqOverlay}>
                  <div className={styles.overlayIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C12.5523 2 13 2.44772 13 3V10H20C20.5523 10 21 10.4477 21 11C21 11.5523 20.5523 12 20 12H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V12H4C3.44772 12 3 11.5523 3 11C3 10.4477 3.44772 10 4 10H11V3C11 2.44772 11.4477 2 12 2Z" fill="white"/>
                    </svg>
                  </div>
                  <h4>Still have a question in mind?</h4>
                  <a href="/contact" className={styles.faqContactBtn}>Contact Us</a>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.partnersSection}>
        <div className={styles.container}>
          <h3 className={styles.sectionTitle}>Meet our export partners</h3>
          <div className={styles.partnersGrid}>
            {partners.map(p => (
              <img key={p.id} src={p.logo} alt={p.name} className={styles.partnerLogo} />
            ))}
            {partners.length === 0 && (
              <div className={styles.placeholders}>
                <img src="/images/partner1.png" alt="Partner" />
                <img src="/images/partner2.png" alt="Partner" />
                <img src="/images/partner3.png" alt="Partner" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.dealerFormSection}>
        <div className={styles.container}>
          <div className={styles.formSplit}>
            <div className={styles.formInfo}>
              <h2>Become a dealer</h2>
              <p>You can become a part of our world!</p>
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/be_a_dealer_handshack.avif" alt="Handshake" className={styles.handshakeImage} />
            </div>

            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.success}>
                  <h3>Application Received!</h3>
                  <p>Our team will review your application and contact you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className={styles.submitBtn}>New Application</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label>Full Name</label>
                      <input type="text" placeholder="Your Full Name" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Email</label>
                      <input type="email" placeholder="email@example.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label>Phone Number</label>
                      <input type="tel" placeholder="+1 (555) 000-0000" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Business Name</label>
                      <input type="text" placeholder="Company Name" required value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Business Location</label>
                    <input type="text" placeholder="City, Country" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label>Budget of your deal</label>
                      <select required value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
                        <option value="">Select...</option>
                        <option value="500,000-700,000 RM">500,000-700,000 RM</option>
                        <option value="700,000-1,000,000 RM">700,000-1,000,000 RM</option>
                        <option value="1,000,000 and above RM">1,000,000 and above RM</option>
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Why are you interested to become a dealer?</label>
                      <select required value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})}>
                        <option value="">Select...</option>
                        <option value="Want to be an entrepreneur with jade">Want to be an entrepreneur with jade</option>
                        <option value="Expand my current business">Expand my current business</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Message</label>
                    <textarea placeholder="Tell us more about your business..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                  </div>

                  <button type="submit" className={styles.submitBtn}>Submit</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
