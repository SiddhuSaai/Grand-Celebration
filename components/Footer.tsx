import Link from 'next/link';
import { ArrowUpRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { clientProfile } from '@/lib/client';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Packages', href: '/#packages' },
  { label: 'Planner', href: '/#planner' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' }
];

const services = ['Wedding Decor', 'Balloon Decor', 'Birthday Decoration', 'Lighting Decoration'];

export default function Footer() {
  return (
    <footer className="bg-obsidian px-5 pb-28 pt-8 text-white sm:px-8 sm:py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 border-y border-gold/20 py-7 sm:gap-9 sm:py-10 lg:grid-cols-[1.05fr_1.1fr_1.15fr] lg:gap-12">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="font-serif text-[1.7rem] tracking-[0.04em] sm:text-3xl">
                {clientProfile.shortName}
              </span>
              <span className="h-px w-9 bg-gold sm:w-12" />
            </div>
            <p className="mt-3 text-sm leading-6 text-white/58 sm:mt-4 sm:text-base sm:leading-7">
              Balloon decor, wedding stages, birthday decoration, lighting, and event management
              for celebrations in {clientProfile.location}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:gap-8">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold sm:text-xs">
                Explore
              </h3>
              <div className="mt-3 grid gap-2.5 text-sm sm:mt-4 sm:gap-3 sm:text-base">
                {quickLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-white/62 transition hover:text-gold">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold sm:text-xs">
                Services
              </h3>
              <div className="mt-3 grid gap-2.5 text-sm sm:mt-4 sm:gap-3 sm:text-base">
                {services.map((service) => (
                  <Link key={service} href="/#services" className="text-white/62 transition hover:text-gold">
                    {service}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold sm:text-xs">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-white/62 sm:text-base">
              <a
                href={clientProfile.phoneHref}
                className="flex items-center gap-3 transition hover:text-gold"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold/35 text-gold">
                  <Phone size={15} />
                </span>
                {clientProfile.phone}
              </a>
              <a
                href={clientProfile.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-gold"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold/35 text-gold">
                  <MessageCircle size={15} />
                </span>
                WhatsApp message
              </a>
              <a
                href="/#contact"
                className="flex items-center gap-3 transition hover:text-gold"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold/35 text-gold">
                  <ArrowUpRight size={15} />
                </span>
                Contact form
              </a>
              <p className="flex items-start gap-3 leading-6">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold/35 text-gold">
                  <MapPin size={15} />
                </span>
                <span>{clientProfile.shortAddress}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-obsidian transition hover:bg-white"
              >
                Enquire
                <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/"
                className="text-xs font-bold uppercase tracking-[0.18em] text-white/45 transition hover:text-gold"
              >
                Back to top
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col justify-between gap-3 text-xs text-white/45 sm:mt-6 sm:flex-row sm:items-center sm:text-sm">
          <p>Copyright 2026 {clientProfile.name}.</p>
          <div className="flex gap-3">
            <a href={clientProfile.whatsappUrl} target="_blank" rel="noreferrer" className="transition hover:text-gold">
              WhatsApp
            </a>
            <span className="text-white/25">|</span>
            <a
              href={clientProfile.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-gold"
            >
              Map
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
