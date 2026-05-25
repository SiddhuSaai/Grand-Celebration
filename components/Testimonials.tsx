'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    quote:
      'The stage decor and event coordination were handled neatly, and the function felt smooth from start to finish.',
    name: 'Wedding Client',
    event: 'Wedding Function',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300'
  },
  {
    quote:
      'Annai Eventz Attur helped us organize a formal program with clear planning, stage setup, and guest flow.',
    name: 'Corporate Client',
    event: 'Conference Event',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300'
  },
  {
    quote:
      'The anniversary setup looked elegant and the team managed the decor details without stress for our family.',
    name: 'Family Client',
    event: 'Anniversary Party',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=300'
  },
  {
    quote:
      'The birthday decor was bright, organized, and photo-friendly. The setup was ready on time.',
    name: 'Birthday Client',
    event: 'Milestone Birthday',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300'
  },
  {
    quote:
      'Good support for decor, seating, and overall arrangements. The team understood what we needed for the function.',
    name: 'Local Client',
    event: 'Family Celebration',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const active = testimonials[activeIndex];

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const previous = () => setActiveIndex((index) => (index - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveIndex((index) => (index + 1) % testimonials.length);

  return (
    <section id="testimonials" className="scroll-mt-20 bg-ivory px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold">Testimonials</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-navy sm:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-charcoal/65">
            Feedback-style highlights for event decor, coordination, timing, and guest-friendly
            arrangements.
          </p>
        </motion.div>

        <motion.div
          className="relative mt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <div className="relative overflow-hidden rounded-sm bg-premium-dark shadow-luxe">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(207,168,91,0.16),transparent_34%,rgba(23,76,67,0.18))]" />
            <div className="absolute left-0 top-0 h-full w-px bg-gold/40" />
            <AnimatePresence mode="wait">
              <motion.article
                key={active.name}
                initial={{ opacity: 0, x: 42 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -42 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative grid gap-6 p-5 sm:gap-8 sm:p-8 md:grid-cols-[0.75fr_1.25fr] md:p-12"
              >
                <div className="relative min-h-[190px] overflow-hidden rounded-sm border border-white/10 bg-white/5 sm:min-h-[240px] md:min-h-[360px]">
                  <Image
                    src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200"
                    alt="Luxury reception dining room"
                    fill
                    sizes="(min-width: 768px) 34vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/86 via-plum/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 sm:bottom-5 sm:left-5">
                    <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-gold sm:h-16 sm:w-16">
                      <Image
                        src={active.avatar}
                        alt={`${active.name} avatar`}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{active.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold">{active.event}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center text-left">
                  <div className="mb-5 flex gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="font-serif text-xl leading-relaxed text-white sm:text-3xl lg:text-4xl">
                    &ldquo;{active.quote}&rdquo;
                  </p>
                  <div className="mt-6 h-px w-20 bg-gold sm:mt-8 sm:w-24" />
                  <p className="mt-4 max-w-md text-sm leading-7 text-white/70 sm:mt-5">
                    A client experience shaped around taste, timing, and calm execution.
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={previous}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold transition hover:bg-gold hover:text-navy"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeIndex === index ? 'w-8 bg-gold' : 'w-2.5 bg-navy/20 hover:bg-gold/60'
                  }`}
                  aria-label={`Show testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold transition hover:bg-gold hover:text-navy"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
