'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { clientProfile } from '@/lib/client';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Packages', href: '/#packages' },
  { label: 'Planner', href: '/#planner' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const openEnquiryPopup = () => {
    closeMenu();
    window.dispatchEvent(new Event('open-enquiry-popup'));
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-obsidian shadow-xl shadow-black/10 transition-all duration-500"
      initial={false}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="group flex items-center gap-3" onClick={closeMenu}>
          <span className="font-serif text-2xl tracking-[0.06em] text-white">
            {clientProfile.shortName}
          </span>
          <span className="h-px w-10 bg-gold transition-all duration-300 group-hover:w-14" />
        </Link>

        <div className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-[0.18em] text-white/80 transition hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={openEnquiryPopup}
            className="rounded-full border border-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-gold transition duration-300 hover:bg-gold hover:text-obsidian"
          >
            Book Now
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-gold hover:text-gold lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="border-t border-gold/15 bg-obsidian px-5 pb-6 pt-2 shadow-2xl shadow-black/20 lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-xl px-2 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white/80 transition hover:bg-white/5 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={openEnquiryPopup}
                className="mt-3 rounded-full border border-gold px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-obsidian"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
