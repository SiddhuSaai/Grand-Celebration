'use client';

import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';

export default function StickyActions() {
  const openEnquiryPopup = () => {
    window.dispatchEvent(new Event('open-enquiry-popup'));
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/18 bg-obsidian/48 text-white shadow-[0_18px_50px_rgba(9,12,22,0.28)] ring-1 ring-gold/10 backdrop-blur-2xl sm:hidden">
      <a
        href="tel:+919994826482"
        className="flex min-h-14 flex-col items-center justify-center gap-1 border-r border-white/14 bg-white/[0.035] text-[10px] font-bold uppercase tracking-[0.14em] text-white/88 transition hover:bg-white/[0.09]"
      >
        <Phone className="h-4 w-4 text-champagne drop-shadow" />
        Call
      </a>
      <a
        href="https://wa.me/919994826482"
        target="_blank"
        rel="noreferrer"
        className="flex min-h-14 flex-col items-center justify-center gap-1 border-r border-white/14 bg-white/[0.035] text-[10px] font-bold uppercase tracking-[0.14em] text-white/88 transition hover:bg-white/[0.09]"
      >
        <MessageCircle className="h-4 w-4 text-champagne drop-shadow" />
        WhatsApp
      </a>
      <button
        type="button"
        onClick={openEnquiryPopup}
        className="flex min-h-14 flex-col items-center justify-center gap-1 bg-white/[0.035] text-[10px] font-bold uppercase tracking-[0.14em] text-white/88 transition hover:bg-white/[0.09]"
      >
        <CalendarCheck className="h-4 w-4 text-champagne drop-shadow" />
        Enquire
      </button>
    </div>
  );
}
