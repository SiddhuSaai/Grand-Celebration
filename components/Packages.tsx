'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
  Crown,
  Gem,
  HeartHandshake
} from 'lucide-react';
import { useState } from 'react';

const packages = [
  {
    title: 'Signature Wedding',
    label: 'Full Wedding Experience',
    description: 'A complete planning collection for engagement, muhurtham, reception, and family rituals.',
    icon: Crown,
    tone: 'text-gold',
    bestFor: 'Weddings, receptions, engagements',
    includes: ['Stage and mandap direction', 'Floral and lighting plan', 'Vendor coordination', 'Event-day run sheet']
  },
  {
    title: 'Corporate Prestige',
    label: 'Business Event Production',
    description: 'A polished setup for conferences, launches, recognition events, and formal programs.',
    icon: Building2,
    tone: 'text-sage',
    bestFor: 'Conferences, launches, award programs',
    includes: ['Stage and seating layout', 'Speaker flow support', 'Branding touchpoints', 'Guest hospitality desk']
  },
  {
    title: 'Family Luxe',
    label: 'Private Celebration Plan',
    description: 'A warm, detail-led package for birthdays, anniversaries, baby showers, and home functions.',
    icon: HeartHandshake,
    tone: 'text-wine',
    bestFor: 'Birthdays, anniversaries, baby showers',
    includes: ['Theme styling', 'Photo moments', 'Cake or ritual setup', 'Compact guest flow']
  },
  {
    title: 'Decor Studio',
    label: 'Stage & Venue Styling',
    description: 'A focused decor production package for halls, stages, entries, backdrops, and floral styling.',
    icon: Gem,
    tone: 'text-gold',
    bestFor: 'Venue decor, stage design, floral work',
    includes: ['Backdrop design', 'Entry decor', 'Lighting direction', 'Seating arrangement']
  }
];

export default function Packages() {
  const [activePackageIndex, setActivePackageIndex] = useState(0);
  const activePackage = packages[activePackageIndex];
  const ActiveIcon = activePackage.icon;

  const openEnquiryPopup = () => {
    window.dispatchEvent(new Event('open-enquiry-popup'));
  };

  const changePackage = (direction: 1 | -1) => {
    setActivePackageIndex((currentIndex) => {
      if (direction === 1) {
        return currentIndex === packages.length - 1 ? 0 : currentIndex + 1;
      }

      return currentIndex === 0 ? packages.length - 1 : currentIndex - 1;
    });
  };

  return (
    <section id="packages" className="bg-pearl px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={{ duration: 0.65 }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold">Premium Collections</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-navy sm:text-5xl">
              Choose the level of planning your celebration needs.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-charcoal/68 sm:text-base">
            Start with a collection, then tailor decor, hospitality, production, and event-day
            coordination around your venue, guest count, and budget.
          </p>
        </motion.div>

        <div className="mt-8 md:hidden">
          <motion.article
            key={activePackage.title}
            className="group flex min-h-[390px] flex-col border border-gold/16 bg-ivory p-5 shadow-[0_18px_60px_rgba(9,12,22,0.07)]"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          >
            <div className="flex items-start justify-between gap-4">
              <span className={`grid h-11 w-11 place-items-center rounded-full border border-current/25 bg-pearl ${activePackage.tone}`}>
                <ActiveIcon className="h-5 w-5" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-charcoal/42">
                0{activePackageIndex + 1}
              </span>
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
              {activePackage.label}
            </p>
            <h3 className="mt-3 font-serif text-3xl leading-tight text-navy">{activePackage.title}</h3>
            <p className="mt-3 text-sm leading-7 text-charcoal/68">{activePackage.description}</p>

            <div className="mt-5 border-y border-navy/10 py-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal/45">Best For</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-navy">{activePackage.bestFor}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {activePackage.includes.slice(0, 4).map((feature) => (
                <div key={feature} className="flex items-start gap-2 text-xs leading-5 text-charcoal/72">
                  <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={openEnquiryPopup}
              className="mt-auto inline-flex items-center justify-between border-t border-navy/10 pt-4 text-xs font-bold uppercase tracking-[0.14em] text-navy"
            >
              Request Collection
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.article>

          <div className="mt-4 flex items-center justify-between border border-gold/16 bg-cream px-4 py-3">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-charcoal/54">
              0{activePackageIndex + 1} / 0{packages.length}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => changePackage(-1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-pearl text-navy transition hover:bg-gold hover:text-obsidian focus:outline-none focus:ring-2 focus:ring-gold/50"
                aria-label="Previous collection"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => changePackage(1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-obsidian text-gold transition hover:bg-gold hover:text-obsidian focus:outline-none focus:ring-2 focus:ring-gold/50"
                aria-label="Next collection"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
          {packages.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                className="group flex min-h-[470px] flex-col border border-gold/16 bg-ivory p-6 shadow-[0_18px_60px_rgba(9,12,22,0.07)] transition duration-300 hover:-translate-y-1 hover:border-gold/70 hover:bg-white hover:shadow-luxe"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ duration: 0.6, delay: index * 0.07 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={`grid h-12 w-12 place-items-center rounded-full border border-current/25 bg-pearl ${item.tone}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-charcoal/32">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.24em] text-gold">
                  {item.label}
                </p>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-navy">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-charcoal/68">{item.description}</p>

                <div className="mt-6 border-y border-navy/10 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/45">Best For</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-navy">{item.bestFor}</p>
                </div>

                <div className="mt-5 grid gap-3">
                  {item.includes.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-sm leading-6 text-charcoal/72">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={openEnquiryPopup}
                  className="mt-auto inline-flex items-center justify-between border-t border-navy/10 pt-5 text-xs font-bold uppercase tracking-[0.16em] text-navy transition group-hover:text-wine"
                >
                  Request Collection
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
