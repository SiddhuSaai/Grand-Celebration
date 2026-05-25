'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const values = ['Customizable', 'Reliable', 'Attur Based'];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-pearl px-5 py-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-10 lg:pb-32 lg:pt-14"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] items-center gap-3 sm:grid-cols-1 sm:items-stretch sm:gap-8 md:grid-cols-[0.86fr_1fr] md:gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-14">
        <motion.div
          className="relative h-full min-h-[236px] min-w-0 overflow-hidden rounded-sm bg-plum shadow-luxe ring-1 ring-gold/18 sm:min-h-[420px] sm:bg-cream md:min-h-[460px] lg:min-h-[620px]"
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <Image
            src="/images/annai-about-award.png"
            alt="Annai Eventz award presentation"
            fill
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 42vw, 42vw"
            className="object-cover object-[38%_center] sm:object-center"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-navy/30 to-transparent sm:block" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="flex h-full min-w-0 flex-col justify-center sm:justify-between"
        >
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gold sm:text-xs sm:tracking-[0.34em]">
              About Us
            </p>
            <h2 className="mt-1.5 max-w-xl font-serif text-[1.16rem] leading-[1.04] text-navy sm:mt-4 sm:text-[2.35rem] md:text-5xl">
              Attur Events, Planned With Care
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-5 text-charcoal/72 sm:mt-5 sm:text-base sm:leading-8">
              <span>
                Weddings, corporate events, anniversaries, baby showers, and family celebrations in
                Attur with decor, vendor coordination, and event-day support.
              </span>
            </p>
            <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.08em] text-gold sm:hidden">
              Customizable · Reliable · Attur
            </p>
            <div className="mt-3 hidden flex-wrap gap-1.5 sm:mt-6 sm:flex sm:gap-3">
              {values.map((value) => (
                <span
                  key={value}
                  className="rounded-full border border-gold/40 bg-cream px-2 py-1 text-[8px] font-semibold text-navy sm:px-5 sm:py-2.5 sm:text-sm"
                >
                  <span className="mr-1 text-gold sm:mr-2">✦</span>
                  {value}
                </span>
              ))}
            </div>
          </div>
          <Link
            href="#contact"
            className="mt-3 inline-flex w-fit whitespace-nowrap rounded-full bg-navy px-3.5 py-2 text-[8px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-gold hover:text-obsidian sm:mt-8 sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.16em]"
          >
            Enquire Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
