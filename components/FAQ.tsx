'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer:
      'For weddings and large family functions, it is better to contact early so decor, venue coordination, and vendor planning can be arranged comfortably.'
  },
  {
    question: 'Where are you located?',
    answer:
      'Annai Eventz Attur is listed near Bus Stand, Madha Kovil Street, Atur Bazaar, Salem, Tamil Nadu 636102.'
  },
  {
    question: 'What is your pricing structure?',
    answer:
      'Pricing depends on event type, decor scale, venue, guest count, and required services. Share your event details for a suitable estimate.'
  },
  {
    question: 'Can I customize the event packages?',
    answer:
      'Yes. Decor, stage setup, seating, vendor support, and event-day coordination can be planned based on your function and budget.'
  },
  {
    question: 'What events do you manage?',
    answer:
      'The team handles weddings, corporate and conference events, anniversary parties, baby shower planning, birthday events, and family celebrations.'
  },
  {
    question: 'How involved can we be in the planning process?',
    answer:
      'You can share your preferred theme, budget, venue, and function schedule. The team can then coordinate the required setup and event-day flow.'
  },
  {
    question: 'Do you manage event-day execution?',
    answer:
      'Yes. Event-day support can include decor checks, vendor arrivals, seating, stage readiness, and last-mile coordination.'
  },
  {
    question: 'Can you plan intimate events?',
    answer:
      'Yes. Smaller functions such as birthdays, baby showers, and anniversary parties can be handled with focused decor and coordination.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);
  const openEnquiryPopup = () => {
    window.dispatchEvent(new Event('open-enquiry-popup'));
  };

  return (
    <section className="bg-pearl px-5 py-10 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-6 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          className="lg:sticky lg:top-28 lg:self-start"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold">FAQ</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-navy sm:mt-4 sm:text-5xl">
            Planning Details, Before We Begin
          </h2>
          <p className="mt-4 hidden max-w-md leading-8 text-charcoal/70 sm:block sm:mt-6">
            Practical answers about booking, event types, pricing, customization, and contact
            details for Annai Eventz Attur.
          </p>
          <button
            type="button"
            onClick={openEnquiryPopup}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-gold hover:text-obsidian sm:mt-8 sm:px-7 sm:py-4 sm:text-sm"
          >
            Ask a planner
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        <motion.div
          className="overflow-hidden rounded-sm border border-gold/16 bg-ivory/82 shadow-[0_18px_60px_rgba(9,12,22,0.06)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="border-b border-navy/10 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-pearl sm:gap-5 sm:px-7 sm:py-6"
                >
                  <span className="font-serif text-[1.02rem] leading-snug text-navy sm:text-2xl">
                    {faq.question}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-white text-gold sm:h-9 sm:w-9">
                    {isOpen ? <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-3 pr-11 text-sm leading-6 text-charcoal/70 sm:px-7 sm:pb-6 sm:pr-14 sm:text-base sm:leading-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
