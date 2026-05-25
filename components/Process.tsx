'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Handshake,
  ListChecks,
  Palette,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

const steps = [
  {
    title: 'Event Discovery',
    detail: 'Guest count, venue, date, rituals, priorities, and budget direction are captured first.',
    icon: ClipboardCheck
  },
  {
    title: 'Design Direction',
    detail: 'Stage look, floral language, lighting mood, seating style, and entry moments are planned.',
    icon: Palette
  },
  {
    title: 'Vendor Coordination',
    detail: 'Decor, production, sound, photography, hospitality, and venue teams are aligned early.',
    icon: Handshake
  },
  {
    title: 'Run Sheet & Execution',
    detail: 'A practical event-day schedule keeps setup, arrivals, rituals, and transitions moving.',
    icon: ListChecks
  }
];

const deliverables = ['Venue walkthrough', 'Decor moodboard', 'Vendor checklist', 'Event-day run sheet'];

export default function Process() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = steps[activeStepIndex];
  const ActiveIcon = activeStep.icon;

  const openEnquiryPopup = () => {
    window.dispatchEvent(new Event('open-enquiry-popup'));
  };

  const changeStep = (direction: 1 | -1) => {
    setActiveStepIndex((currentIndex) => {
      if (direction === 1) {
        return currentIndex === steps.length - 1 ? 0 : currentIndex + 1;
      }

      return currentIndex === 0 ? steps.length - 1 : currentIndex - 1;
    });
  };

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-premium-dark px-5 py-16 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gold/40" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-champagne">Planning Method</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
            Premium events need a calm operating system.
          </h2>
          <p className="mt-5 max-w-lg leading-8 text-white/68">
            Every detail is organized before production begins, so hosts know what is planned, who
            is responsible, and how the event will move on the day.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {deliverables.map((item) => (
              <div key={item} className="flex items-center gap-3 border border-white/10 bg-white/[0.045] px-4 py-3">
                <Sparkles className="h-4 w-4 shrink-0 text-gold" />
                <span className="text-sm font-semibold text-white/82">{item}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={openEnquiryPopup}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gold-gradient px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-obsidian transition hover:bg-ivory"
          >
            Start Planning
          </button>
        </motion.div>

        <div className="sm:hidden">
          <div className="relative h-[260px] overflow-hidden border border-white/10 bg-white/[0.055] shadow-premium">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeStep.title}
                className="absolute inset-0 p-6"
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -36 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-obsidian/55 text-gold">
                    <ActiveIcon className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-5xl leading-none text-white/10">
                    0{activeStepIndex + 1}
                  </span>
                </div>
                <h3 className="mt-8 font-serif text-2xl text-champagne">{activeStep.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/66">{activeStep.detail}</p>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-between border border-white/10 bg-white/[0.045] px-4 py-3">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-white/58">
              0{activeStepIndex + 1} / 0{steps.length}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => changeStep(-1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-gold/35 text-gold transition hover:bg-gold hover:text-obsidian focus:outline-none focus:ring-2 focus:ring-gold/50"
                aria-label="Previous planning step"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => changeStep(1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-gold/35 bg-gold text-obsidian transition hover:bg-champagne focus:outline-none focus:ring-2 focus:ring-gold/50"
                aria-label="Next planning step"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="hidden gap-4 sm:grid sm:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                className="relative min-h-[230px] overflow-hidden border border-white/10 bg-white/[0.055] p-6 shadow-premium"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-obsidian/55 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-5xl leading-none text-white/10">0{index + 1}</span>
                </div>
                <h3 className="mt-8 font-serif text-2xl text-champagne">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/66">{step.detail}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
