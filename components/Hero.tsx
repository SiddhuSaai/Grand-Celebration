'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } }
};

export default function Hero() {
  const openEnquiryPopup = () => {
    window.dispatchEvent(new Event('open-enquiry-popup'));
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-start justify-center overflow-hidden bg-obsidian pb-28 pt-28 sm:items-center sm:py-28 lg:py-0"
    >
      <Image
        src="https://content.jdmagicbox.com/v2/comp/salem/a7/0427px427.x427.240730171835.i8a7/catalogue/annai-eventz-attur-salem-event-management-companies-lllpusjfps.jpg?w=1400&q=75"
        alt="Decorated event stage by Annai Eventz Attur"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-plum/80 to-black/56" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,12,22,0.86),rgba(122,38,61,0.34)_48%,rgba(0,0,0,0.5))]" />
      <div className="absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-obsidian to-transparent" />
      <div className="absolute left-0 top-0 z-[2] hidden h-full w-px bg-gold/30 lg:left-10 lg:block" />
      <div className="absolute right-0 top-0 z-[2] hidden h-full w-px bg-white/10 lg:right-10 lg:block" />
      <div className="absolute left-8 top-1/2 z-[2] hidden -translate-y-1/2 -rotate-90 items-center gap-4 text-[10px] font-bold uppercase tracking-[0.34em] text-white/55 lg:flex">
        <span className="h-px w-16 bg-gold" />
        Annai Eventz Attur
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-5 text-center sm:px-8"
        variants={container}
        initial={false}
        animate="show"
      >
        <motion.p
          variants={item}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-champagne sm:mb-6 sm:text-sm sm:tracking-[0.42em]"
        >
          Premium Event Management in Attur
        </motion.p>
        <motion.h1
          variants={item}
          className="mx-auto max-w-5xl font-serif text-4xl leading-[0.98] text-white min-[380px]:text-5xl sm:text-6xl sm:leading-[0.95] lg:text-[82px]"
        >
          Your Celebration, Beautifully Managed
        </motion.h1>
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:text-base sm:leading-8"
        >
          Weddings, corporate programs, family celebrations, stage decor, and event-day
          coordination shaped with a premium design-first approach.
        </motion.p>
        <motion.div variants={item} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={openEnquiryPopup}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-obsidian shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-ivory"
          >
            Get Event Plan
            <CalendarCheck className="h-4 w-4" />
          </button>
          <Link
            href="#packages"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-champagne/70 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-obsidian"
          >
            View Collections
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="mx-auto mt-12 hidden max-w-3xl grid-cols-3 border-y border-white/15 bg-black/10 py-4 text-white/80 backdrop-blur-sm sm:grid"
        >
          {[
            ['10+', 'Years Service'],
            ['4.5★', 'Rating Signal'],
            ['Attur', 'Salem']
          ].map(([value, label]) => (
            <div key={label} className="border-r border-white/10 px-3 last:border-r-0">
              <p className="font-serif text-2xl text-gold sm:text-3xl">{value}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/58">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 text-white/70 sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </section>
  );
}
