'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Check, MessageCircle, SlidersHorizontal, Users } from 'lucide-react';
import { useMemo, useState } from 'react';

const eventTypes = ['Wedding', 'Corporate', 'Birthday', 'Anniversary', 'Baby Shower', 'Venue Decor'] as const;
const styleMoods = ['Royal', 'Floral', 'Minimal', 'Traditional', 'Modern'] as const;
const priorities = [
  'Stage decor',
  'Guest flow',
  'Photography moments',
  'Food coordination',
  'Sound & lighting',
  'Ritual setup'
];

const timelines: Record<(typeof eventTypes)[number], string> = {
  Wedding: '45-90 days before the event',
  Corporate: '20-45 days before the program',
  Birthday: '10-25 days before the celebration',
  Anniversary: '15-30 days before the function',
  'Baby Shower': '15-30 days before the ritual',
  'Venue Decor': '7-20 days before production'
};

export default function EventBrief() {
  const [eventType, setEventType] = useState<(typeof eventTypes)[number]>('Wedding');
  const [mood, setMood] = useState<(typeof styleMoods)[number]>('Royal');
  const [guests, setGuests] = useState(250);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    'Stage decor',
    'Photography moments'
  ]);

  const recommendation = useMemo(() => {
    const scale =
      guests >= 500
        ? 'Large-format production plan'
        : guests >= 180
          ? 'Full-service event coordination'
          : 'Focused boutique setup';

    const team =
      guests >= 500
        ? 'Lead planner, decor crew, vendor coordinator, hospitality desk, and floor manager'
        : guests >= 180
          ? 'Planner, decor crew, vendor coordinator, and event-day supervisor'
          : 'Planner, decor team, and day-of support';

    const focus =
      selectedPriorities.length > 0
        ? selectedPriorities.join(', ')
        : 'decor, timing, and guest comfort';

    return {
      scale,
      team,
      focus,
      timeline: timelines[eventType]
    };
  }, [eventType, guests, selectedPriorities]);

  const togglePriority = (priority: string) => {
    setSelectedPriorities((current) =>
      current.includes(priority)
        ? current.filter((item) => item !== priority)
        : [...current, priority]
    );
  };

  const whatsappMessage = [
    'New event brief for Annai Eventz Attur',
    `Event type: ${eventType}`,
    `Guest count: ${guests}`,
    `Preferred style: ${mood}`,
    `Priorities: ${recommendation.focus}`,
    `Suggested plan: ${recommendation.scale}`,
    `Planning timeline: ${recommendation.timeline}`
  ].join('\n');

  const whatsappLink = `https://wa.me/919994826482?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="planner" className="bg-premium-soft px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold">Event Brief Builder</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-navy sm:text-5xl">
            Build a quick planning brief before you call.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-charcoal/68 sm:text-base">
            A short interactive planner gives the team better context and helps clients understand
            the level of support their event may need.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid overflow-hidden border border-gold/18 bg-pearl shadow-premium lg:grid-cols-[1.15fr_0.85fr]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <div className="p-5 sm:p-8 lg:p-10">
            <div>
              <div className="flex items-center gap-3 text-navy">
                <CalendarDays className="h-5 w-5 text-gold" />
                <h3 className="font-serif text-2xl">Event Type</h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEventType(type)}
                    aria-pressed={eventType === type}
                    className={`border px-4 py-3 text-sm font-semibold transition ${
                      eventType === type
                        ? 'border-gold bg-gold text-obsidian'
                        : 'border-navy/10 bg-ivory text-charcoal hover:border-gold hover:text-wine'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-3 text-navy">
                <Users className="h-5 w-5 text-gold" />
                <h3 className="font-serif text-2xl">Guest Count</h3>
              </div>
              <div className="mt-4 border border-gold/16 bg-ivory p-5">
                <div className="flex items-end justify-between gap-4">
                  <p className="text-sm font-semibold text-charcoal/60">Expected guests</p>
                  <p className="font-serif text-4xl text-wine">{guests}</p>
                </div>
                <input
                  type="range"
                  min="50"
                  max="800"
                  step="25"
                  value={guests}
                  onChange={(event) => setGuests(Number(event.target.value))}
                  className="mt-5 w-full accent-gold"
                  aria-label="Expected guest count"
                />
                <div className="mt-2 flex justify-between text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/38">
                  <span>50</span>
                  <span>800</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-3 text-navy">
                <SlidersHorizontal className="h-5 w-5 text-gold" />
                <h3 className="font-serif text-2xl">Style Mood</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {styleMoods.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setMood(style)}
                    aria-pressed={mood === style}
                    className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                      mood === style
                        ? 'border-wine bg-wine text-white'
                        : 'border-navy/10 bg-white text-charcoal hover:border-gold hover:text-wine'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-serif text-2xl text-navy">Planning Priorities</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {priorities.map((priority) => {
                  const isSelected = selectedPriorities.includes(priority);
                  return (
                    <label
                      key={priority}
                      className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm font-semibold transition ${
                        isSelected
                          ? 'border-gold bg-cream text-navy'
                          : 'border-navy/10 bg-white text-charcoal/72 hover:border-gold'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => togglePriority(priority)}
                        className="sr-only"
                      />
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                          isSelected ? 'border-gold bg-gold text-obsidian' : 'border-navy/20 text-transparent'
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {priority}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="bg-premium-dark p-5 text-white sm:p-8 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-champagne">Recommended Plan</p>
            <h3 className="mt-4 font-serif text-4xl leading-tight">{recommendation.scale}</h3>
            <p className="mt-5 text-sm leading-7 text-white/68">
              For a {mood.toLowerCase()} {eventType.toLowerCase()} with {guests} guests, the team
              should focus on {recommendation.focus.toLowerCase()}.
            </p>

            <div className="mt-8 space-y-5 border-y border-white/10 py-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/38">Suggested Team</p>
                <p className="mt-2 leading-7 text-white/82">{recommendation.team}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/38">Planning Window</p>
                <p className="mt-2 leading-7 text-white/82">{recommendation.timeline}</p>
              </div>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-obsidian transition hover:bg-ivory"
            >
              Send Brief on WhatsApp
              <MessageCircle className="h-4 w-4" />
            </a>
          </aside>
        </motion.div>
      </div>
    </section>
  );
}
