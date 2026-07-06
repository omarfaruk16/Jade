import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import styles from './Contact.module.css';
import { getContact } from '@/lib/data';
import ContactPageClient from './ContactPageClient';

export default async function ContactPage() {
  const contact = await getContact();
  return (
    <SmoothScroll>
      <div className={styles.pageWrapper}>
        <Navbar />
        <ContactPageClient contact={contact} />
        <Footer />
      </div>
    </SmoothScroll>
  );
}
