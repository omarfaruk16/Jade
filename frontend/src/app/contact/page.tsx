import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactPageClient from './ContactPageClient';
import API_BASE from '@/lib/api';

async function getContact() {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) throw new Error('Failed to fetch contact data');
    return await res.json();
  } catch (error) {
    console.error('Error fetching contact:', error);
    return null;
  }
}

export const metadata = {
  title: 'Contact Us | Jade Kitchen Design',
  description: 'Get in touch with Jade Kitchen Design. Multiple locations and contact information available.'
};

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <>
      <Navbar />
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <ContactPageClient contact={contact} />
      </Suspense>
      <Footer />
    </>
  );
}
