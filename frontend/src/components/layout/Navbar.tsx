'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Projects', href: '/projects' },
    { name: 'Promotion', href: '/promotion' },
    { name: 'About us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];


  return (
    <div className={styles.navbarWrapper}>
      <nav className={styles.navbar}>
        <div className={styles.leftNav}>
          <Link href="/" className={styles.logo}>
            <span>J</span><span>ade</span>
          </Link>
          <Link href="/import-export" className={`${styles.navLink} hidden md:flex`}>
            Export/Import <ArrowUpRight className={styles.icon} />
          </Link>
          <Link href="/dealer" className={`${styles.navLink} hidden md:flex`}>
            Be a dealer <ArrowUpRight className={styles.icon} />
          </Link>
        </div>

        <div className={styles.rightNav}>
          <Link href="/services" className={styles.navLink}>
            Services <ChevronDown className={styles.icon} />
          </Link>
          <Link href="/products" className={styles.navLink}>
            Products <ChevronDown className={styles.icon} />
          </Link>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className={styles.navLink}>
              {link.name}
            </Link>
          ))}
          <button className={styles.ctaButton}>Book a Call</button>
        </div>

        <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.mobileLinks}>
              <Link href="/services" onClick={toggleMenu}>Services</Link>
              <Link href="/products" onClick={toggleMenu}>Products</Link>
              <Link href="/projects" onClick={toggleMenu}>Projects</Link>
              <Link href="/promotion" onClick={toggleMenu}>Promotion</Link>
              <Link href="/about" onClick={toggleMenu}>About us</Link>
              <Link href="/import-export" onClick={toggleMenu}>Export / Import</Link>
              <Link href="/dealer" onClick={toggleMenu}>Be a Dealer</Link>
              <Link href="/contact" onClick={toggleMenu}>Contact</Link>
              <button className={styles.ctaButtonMobile} onClick={toggleMenu}>Book a Call</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
