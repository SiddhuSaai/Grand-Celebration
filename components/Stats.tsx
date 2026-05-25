'use client';

import { motion, useInView } from 'framer-motion';
import { CalendarCheck, Globe2, HeartHandshake, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { clientProfile } from '@/lib/client';

const stats = [
  { value: 4, suffix: '.6', label: 'Customer Rating', icon: HeartHandshake },
  { value: 50, suffix: '+ Ratings', label: 'Public Feedback', icon: Sparkles },
  { value: 12, suffix: '+ Years', label: 'Years Service', icon: CalendarCheck },
  { value: 2014, suffix: '', label: 'Established', icon: Globe2 }
];

function CountUp({ value, suffix, isActive }: { value: number; suffix: string; isActive: boolean }) {
  return (
    <span>
      {isActive ? value : 0}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="relative overflow-hidden bg-premium-dark px-5 py-10 text-white sm:px-8 sm:py-14 lg:px-10">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04),transparent_34%,rgba(207,168,91,0.1)),linear-gradient(135deg,transparent_0%,rgba(23,76,67,0.22)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gold/30" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gold/20" />
      <motion.div
        ref={ref}
        className="relative mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 26 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-[1.05fr_repeat(4,1fr)] lg:items-stretch">
          <div className="hidden border border-gold/25 bg-white/[0.04] p-7 lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">By The Numbers</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight">Trust signals</h2>
            <p className="mt-4 text-sm leading-7 text-white/62">
              Local proof points for clients comparing event decorators in and around {clientProfile.location}.
            </p>
          </div>

          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative min-h-[136px] overflow-hidden border border-white/10 bg-white/[0.055] p-4 shadow-[0_14px_34px_rgba(0,0,0,0.12)] transition duration-300 hover:border-gold/50 hover:bg-white/[0.08] sm:p-5 lg:min-h-[190px] lg:p-6"
              >
                <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full border border-gold/15" />
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-obsidian/65 text-gold">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-4 font-serif text-3xl leading-none text-gold sm:text-5xl lg:mt-5 lg:text-5xl">
                  {stat.label === 'Established' ? (
                    <span>{clientProfile.established}</span>
                  ) : (
                    <CountUp value={stat.value} suffix={stat.suffix} isActive={isInView} />
                  )}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.13em] text-white/72 sm:mt-3 sm:text-xs sm:tracking-[0.18em]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
