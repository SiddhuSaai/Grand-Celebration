'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { clientImages, clientProfile } from '@/lib/client';

const values = ['Open 24 Hrs', 'Since 2014', 'Peelamedu Based'];

type AboutProps = {
  enquireHref?: string;
};

export default function About({ enquireHref = '#contact' }: AboutProps) {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-pearl px-5 py-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-10 lg:pb-32 lg:pt-14"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] items-stretch gap-3 sm:gap-8 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] md:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
        <motion.div
          className="relative min-h-[260px] w-full min-w-0 overflow-hidden rounded-sm bg-navy shadow-luxe ring-1 ring-gold/18 sm:min-h-[360px] md:h-[380px] md:min-h-0 lg:h-[440px] xl:h-[480px]"
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <Image
            src={clientImages.aboutBrand}
            alt={`${clientProfile.name} logo`}
            fill
            sizes="(min-width: 1024px) 42vw, (min-width: 768px) 40vw, 90vw"
            className="object-contain p-2 sm:p-6 lg:p-8"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="flex h-full min-w-0 flex-col justify-center sm:justify-between"
        >
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-gold sm:text-xs sm:tracking-[0.34em]">
              About Us
            </p>
            <h2 className="mt-1.5 max-w-xl font-serif text-[1.32rem] leading-[1.08] text-navy sm:mt-4 sm:text-[2.35rem] sm:leading-tight md:text-5xl">
              Coimbatore Events, Decorated With Detail
            </h2>
            <p className="mt-2 max-w-xl text-[0.72rem] leading-5 text-charcoal/72 sm:mt-5 sm:text-base sm:leading-8">
              <span>
                {clientProfile.name} is listed in {clientProfile.location} for balloon decor,
                wedding stages, birthday decoration, lighting, and event management support.
              </span>
            </p>
            <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.06em] text-gold sm:hidden">
              Open 24 Hrs · Since 2014 · Peelamedu
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
            href={enquireHref}
            className="mt-3 inline-flex w-fit whitespace-nowrap rounded-full bg-navy px-3.5 py-2 text-[8px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-gold hover:text-obsidian sm:mt-8 sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.16em]"
          >
            Enquire Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
