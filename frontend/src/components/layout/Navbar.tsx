'use client';

import { useState, useEffect } from 'react';
import API_BASE from '@/lib/api';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

export default function Navbar({ visible = true }: { visible?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Projects', href: '/projects' },
    { name: 'Promotion', href: '/promotion' },
    { name: 'About us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];


  const [showServices, setShowServices] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [productsData, setProductsData] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/services`).then(r => r.json()),
      fetch(`${API_BASE}/products/categories`).then(r => r.json())
    ]).then(([sData, pData]) => {
      setServicesData(sData);
      setProductsData(pData);
    }).catch(console.error);
  }, []);

  return (
    <div className={`${styles.navbarWrapper} ${!visible ? styles.navbarHidden : ''}`}>
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
          <div 
            className={styles.dropdownContainer}
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            <Link href="/services" className={styles.navLink}>
              Services <ChevronDown className={styles.icon} style={{ transform: showServices ? 'rotate(180deg)' : 'none' }} />
            </Link>
            
            <AnimatePresence>
              {showServices && (
                <motion.div 
                  className={styles.megaMenu}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.megaMenuLeft}>
                    {servicesData.map((parent: any) => (
                      <div key={parent.id} className={styles.megaMenuGroup}>
                        <div className={styles.megaMenuParent}>{parent.name}</div>
                        {parent.children.map((child: any) => (
                          <Link key={child.id} href={`/services/${child.slug}`} className={styles.megaMenuChild} onClick={() => setShowServices(false)}>
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className={styles.megaMenuRight}>
                    {/* Hero image for megamenu */}
                    <img 
                      src={servicesData[0]?.children?.[0]?.items?.[0]?.imageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000"} 
                      alt="Service Feature" 
                      className={styles.megaMenuImg} 
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div 
            className={styles.dropdownContainer}
            onMouseEnter={() => setShowProducts(true)}
            onMouseLeave={() => setShowProducts(false)}
          >
            <Link href="/products" className={styles.navLink}>
              Products <ChevronDown className={styles.icon} style={{ transform: showProducts ? 'rotate(180deg)' : 'none' }} />
            </Link>
            <AnimatePresence>
              {showProducts && (
                <motion.div 
                  className={styles.megaMenuProducts}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {productsData.map((cat: any) => (
                    <Link key={cat.id} href={`/products/${cat.slug}`} className={styles.productCategoryCard} onClick={() => setShowProducts(false)}>
                      <img src={cat.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500"} alt={cat.name} className={styles.productCategoryImg} />
                      <div className={styles.productCategoryInfo}>
                        <span className={styles.productCategoryTitle}>{cat.name}</span>
                        <div className={styles.productCategoryBtn}>
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileLinks}>
              <div className={styles.mobileServiceWrapper}>
                <div 
                  className={styles.mobileServiceHeader} 
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  Services <ChevronDown className={styles.icon} style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </div>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div 
                      className={styles.mobileServiceList}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      {servicesData.map((parent: any) => (

                        <div key={parent.id} className={styles.mobileServiceParentGroup}>
                          <div className={styles.mobileServiceParent}>{parent.name}</div>
                          {parent.children.map((child: any) => (
                            <Link 
                              key={child.id} 
                              href={`/services/${child.slug}`} 
                              className={styles.mobileServiceChild}
                              onClick={toggleMenu}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
