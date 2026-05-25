'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, MessageCircle, Navigation, Phone, Send, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { clientProfile } from '@/lib/client';

const contactDetails = [
  { icon: Phone, label: clientProfile.phone, href: clientProfile.phoneHref },
  { icon: MessageCircle, label: 'Message us on WhatsApp', href: clientProfile.whatsappUrl },
  { icon: MapPin, label: clientProfile.address, href: clientProfile.mapUrl },
];

const actionLinks = [
  { icon: Phone, label: 'Call Us', href: clientProfile.phoneHref },
  { icon: MessageCircle, label: 'Message Us', href: clientProfile.whatsappUrl },
  { icon: Navigation, label: 'Map', href: clientProfile.mapUrl }
];

const fieldLabels: Record<string, string> = {
  fullName: 'Full name',
  email: 'Email',
  phone: 'Phone',
  eventType: 'Event type',
  eventDate: 'Event date',
  budget: 'Budget',
  message: 'Message'
};

function buildEnquiryText(source: string, values: Record<string, string>) {
  return [
    `New ${source} enquiry for ${clientProfile.name}`,
    ...Object.entries(values)
      .filter(([, value]) => value.trim().length > 0)
      .map(([key, value]) => `${fieldLabels[key] ?? key}: ${value}`)
  ].join('\n');
}

function getFormValues(form: HTMLFormElement) {
  const formData = new FormData(form);
  return Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
  );
}

function buildWhatsAppLink(source: string, form: HTMLFormElement) {
  const values = getFormValues(form);
  return `${clientProfile.whatsappUrl}?text=${encodeURIComponent(buildEnquiryText(source, values))}`;
}

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupSubmitted, setIsPopupSubmitted] = useState(false);

  useEffect(() => {
    const openPopup = () => {
      setIsPopupSubmitted(false);
      setIsPopupOpen(true);
    };

    window.addEventListener('open-enquiry-popup', openPopup);

    return () => {
      window.removeEventListener('open-enquiry-popup', openPopup);
    };
  }, []);

  useEffect(() => {
    if (!isPopupOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPopupOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPopupOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    window.open(buildWhatsAppLink('website contact form', form), '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
    form.reset();
  };

  const handlePopupSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    window.open(buildWhatsAppLink('quick popup', form), '_blank', 'noopener,noreferrer');
    setIsPopupSubmitted(true);
    form.reset();
  };

  return (
    <>
      <AnimatePresence>
        {isPopupOpen ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 px-4 py-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPopupOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-enquiry-title"
          >
            <motion.div
              className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-sm border border-gold/30 bg-premium-dark p-4 shadow-xl shadow-black/35 sm:p-7"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsPopupOpen(false)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-gold hover:text-gold"
                aria-label="Close enquiry popup"
              >
                <X className="h-5 w-5" />
              </button>

              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-gold">Enquiry</p>
              <h2 id="popup-enquiry-title" className="mt-3 font-serif text-2xl leading-tight sm:text-4xl">
                Quick Enquiry
              </h2>
              <p className="mt-2 max-w-sm text-xs leading-5 text-white/65 sm:text-sm sm:leading-6">
                Share your event details and send them directly to the team on WhatsApp.
              </p>

              <form onSubmit={handlePopupSubmit} className="mt-4 space-y-3">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-white/80 sm:text-sm">Full Name</span>
                  <input
                    name="fullName"
                    type="text"
                    required
                    className="w-full rounded-sm border border-white/20 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-gold focus:ring-2 focus:ring-gold/30 sm:px-4 sm:py-3 sm:text-base"
                    placeholder="Your name"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-white/80 sm:text-sm">Phone Number</span>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-sm border border-white/20 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-gold focus:ring-2 focus:ring-gold/30 sm:px-4 sm:py-3 sm:text-base"
                    placeholder="+91"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-white/80 sm:text-sm">Event Type</span>
                  <select
                    name="eventType"
                    required
                    className="w-full rounded-sm border border-white/20 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30 sm:px-4 sm:py-3 sm:text-base"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select event
                    </option>
                    <option>Wedding Decor</option>
                    <option>Balloon Decor</option>
                    <option>Birthday Decoration</option>
                    <option>Lighting Decoration</option>
                    <option>Stage Decor</option>
                    <option>Event Management</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-white/80 sm:text-sm">Message</span>
                  <textarea
                    name="message"
                    rows={2}
                    className="w-full resize-none rounded-sm border border-white/20 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-gold focus:ring-2 focus:ring-gold/30 sm:px-4 sm:py-3 sm:text-base"
                    placeholder="Tell us about your event..."
                  />
                </label>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-sm bg-gold-gradient px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-obsidian transition hover:bg-white sm:py-4"
                >
                  Send WhatsApp Enquiry
                  <Send className="h-4 w-4" />
                </button>

                {isPopupSubmitted ? (
                  <motion.p
                    className="rounded-sm border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Thank you. WhatsApp is opening with your enquiry.
                  </motion.p>
                ) : null}
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section
        id="contact"
        className="scroll-mt-20 bg-emerald-luxe px-5 py-14 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold">Contact</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:mt-4 sm:text-5xl">
            Plan Your Function With {clientProfile.shortName}
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/70 sm:mt-6 sm:text-base sm:leading-8">
            Share the type of event, preferred date, and location. The team handles decor, lighting,
            stage presentation, and event management details.
          </p>

          <div className="mt-6 space-y-3 sm:mt-10 sm:space-y-5">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <a
                  key={detail.label}
                  href={detail.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 transition hover:text-gold"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold sm:h-12 sm:w-12">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="text-sm leading-6 text-white/80 sm:text-base">{detail.label}</span>
                </a>
              );
            })}
          </div>

          <div className="mt-6 flex gap-3 sm:mt-10">
            {actionLinks.map((action) => {
              const Icon = action.icon;
              const isExternal = action.href.startsWith('http');
              return (
                <a
                  key={action.label}
                  href={action.href}
                  aria-label={action.label}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-gold hover:bg-gold hover:text-obsidian sm:h-11 sm:w-11"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="rounded-sm border border-white/10 bg-white/[0.04] p-4 shadow-xl shadow-black/20 sm:p-8"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
          <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-white/80 sm:mb-2 sm:text-sm">Full Name</span>
              <input
                name="fullName"
                type="text"
                required
                className="glass-input w-full rounded-sm border px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-gold focus:ring-2 focus:ring-gold/30 sm:px-4 sm:py-3 sm:text-base"
                placeholder="Your name"
              />
            </label>
            <label className="hidden sm:block">
              <span className="mb-2 block text-sm font-medium text-white/80">Email</span>
              <input
                name="email"
                type="email"
                className="glass-input w-full rounded-sm border px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-gold focus:ring-2 focus:ring-gold/30"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-white/80 sm:mb-2 sm:text-sm">Phone Number</span>
              <input
                name="phone"
                type="tel"
                required
                className="glass-input w-full rounded-sm border px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-gold focus:ring-2 focus:ring-gold/30 sm:px-4 sm:py-3 sm:text-base"
                placeholder="+91"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-white/80 sm:mb-2 sm:text-sm">Event Type</span>
              <select
                name="eventType"
                required
                className="glass-input w-full rounded-sm border px-3 py-2.5 text-sm text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30 sm:px-4 sm:py-3 sm:text-base"
                defaultValue=""
              >
                <option value="" disabled>
                  Select event
                </option>
                <option>Wedding Decor</option>
                <option>Balloon Decor</option>
                <option>Birthday Decoration</option>
                <option>Lighting Decoration</option>
                <option>Stage Decor</option>
                <option>Event Management</option>
                <option>Other</option>
              </select>
            </label>
            <label className="hidden sm:block">
              <span className="mb-2 block text-sm font-medium text-white/80">Event Date</span>
              <input
                name="eventDate"
                type="date"
                className="glass-input w-full rounded-sm border px-4 py-3 text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
            </label>
            <label className="hidden sm:block">
              <span className="mb-2 block text-sm font-medium text-white/80">Budget Range</span>
              <select
                name="budget"
                className="glass-input w-full rounded-sm border px-4 py-3 text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
                defaultValue=""
              >
                <option value="" disabled>
                  Select budget
                </option>
                <option>Under ₹1L</option>
                <option>₹1L-5L</option>
                <option>₹5L-10L</option>
                <option>10L+</option>
              </select>
            </label>
          </div>

          <label className="mt-3 block sm:mt-5">
            <span className="mb-1.5 block text-xs font-medium text-white/80 sm:mb-2 sm:text-sm">Message</span>
            <textarea
              name="message"
              rows={3}
              className="glass-input w-full resize-none rounded-sm border px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-gold focus:ring-2 focus:ring-gold/30 sm:px-4 sm:py-3 sm:text-base"
              placeholder="Tell us about the event you have in mind..."
            />
          </label>

          <button
            type="submit"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-obsidian transition hover:bg-white sm:mt-6 sm:py-4 sm:text-sm"
          >
            Send WhatsApp Enquiry
            <Send className="h-4 w-4" />
          </button>

          {isSubmitted ? (
            <motion.p
              className="mt-4 rounded-sm border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Thank you. WhatsApp is opening with your enquiry details.
            </motion.p>
          ) : null}
          </motion.form>
        </div>
      </section>
    </>
  );
}
