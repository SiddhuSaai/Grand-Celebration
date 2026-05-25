'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Cake,
  Gem,
  MapPin,
  PartyPopper,
  Sparkles,
  X
} from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { clientImages, clientProfile } from '@/lib/client';

const services = [
  {
    title: 'Wedding & Reception Decor',
    description: 'Floral backdrops, sofa stages, entry decor, and hall styling.',
    detail: 'Stage decor, flower work, mandap styling, reception setup',
    overview:
      'Grand Celebration Events And Decors creates wedding and reception spaces with floral stages, draping, seating focus, and photo-ready backdrops.',
    includes: ['Wedding stage decor', 'Reception backdrop', 'Floral styling', 'Entry decor'],
    bestFor: 'Engagements, weddings, receptions, and family ceremonies',
    image: clientImages.floralCircles,
    imagePosition: 'object-center',
    icon: Sparkles
  },
  {
    title: 'Balloon Decoration',
    description: 'Balloon arches, backdrop styling, and cheerful celebration decor.',
    detail: 'Balloon arches, theme corners, foil banners, photo setups',
    overview:
      'Balloon decoration is planned around the occasion with color themes, backdrop accents, cake-table focus, and photo-friendly guest moments.',
    includes: ['Balloon arch decor', 'Theme backdrop', 'Cake table styling', 'Photo corner'],
    bestFor: 'Birthdays, baby showers, naming ceremonies, and private parties',
    image: clientImages.hallEntry,
    imagePosition: 'object-center',
    icon: PartyPopper
  },
  {
    title: 'Birthday Decoration',
    description: 'Budget-friendly birthday setups with decor options from ₹2,000.',
    detail: 'Starts at ₹2,000 onwards / session',
    overview:
      'Birthday celebrations are styled with balloons, foil banners, themed backdrops, cake-table decor, and simple event support for families.',
    includes: ['Theme direction', 'Balloon styling', 'Cake table decor', 'Photo moments'],
    bestFor: 'Kids birthdays, milestone birthdays, private parties, and family gatherings',
    image: clientImages.pinkStage,
    imagePosition: 'object-center',
    icon: Cake
  },
  {
    title: 'Lighting Decoration',
    description: 'Decor lighting and illumination to lift the stage and hall mood.',
    detail: 'Starts at ₹3,000 onwards / session',
    overview:
      'Lighting decor adds stage depth, improves venue ambience, and supports photo and video moments across wedding and celebration setups.',
    includes: ['Stage lighting', 'Backdrop illumination', 'Warm ambience', 'Photo-friendly focus'],
    bestFor: 'Reception stages, evening functions, parties, and hall decor',
    image: clientImages.floralCircles,
    imagePosition: 'object-center',
    icon: MapPin
  },
  {
    title: 'Event Management',
    description: 'End-to-end coordination for decor, vendors, setup, and day flow.',
    detail: 'Starts at ₹5,000 onwards / session',
    overview:
      'The team supports event planning with decor coordination, vendor readiness, venue setup, schedule clarity, and last-minute handling.',
    includes: ['Vendor coordination', 'Venue setup', 'Event-day support', 'Guest flow planning'],
    bestFor: 'Weddings, birthdays, family functions, and social events',
    image: clientImages.stageRing,
    imagePosition: 'object-center',
    icon: Award
  },
  {
    title: 'Pandal & Venue Styling',
    description: 'Decor production for halls, pandals, stages, and entries.',
    detail: 'Backdrop, draping, floral work, seating arrangement',
    overview:
      'The team handles decorated backdrops, floral layers, lighting, seating arrangement, and overall venue presentation for different event scales.',
    includes: ['Backdrop design', 'Draping support', 'Floral decor', 'Seating arrangement'],
    bestFor: 'Marriage halls, reception stages, formal programs, and social functions',
    image: clientImages.purpleSofaStage,
    imagePosition: 'object-center',
    icon: Gem
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: index * 0.08,
      ease: 'easeOut'
    }
  })
};

export default function Services() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const resumeCarouselTimeoutRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [selectedService, setSelectedService] = useState<(typeof services)[number] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [isMobileCarousel, setIsMobileCarousel] = useState(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const getCardStep = useCallback(() => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.querySelector<HTMLElement>('[data-service-card]');

    if (!carousel || !firstCard) return 0;

    const styles = window.getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;

    return firstCard.offsetWidth + gap;
  }, []);

  const getMaxCarouselIndex = useCallback(() => {
    const carousel = carouselRef.current;
    const step = getCardStep();

    if (!carousel || step <= 0) return services.length - 1;

    return Math.max(0, Math.ceil((carousel.scrollWidth - carousel.clientWidth) / step));
  }, [getCardStep]);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const carousel = carouselRef.current;
      const step = getCardStep();

      if (!carousel || step <= 0) return;

      const maxIndex = getMaxCarouselIndex();
      const nextIndex = index > maxIndex ? 0 : index < 0 ? maxIndex : index;

      carousel.scrollTo({
        left: nextIndex * step,
        behavior
      });
      setActiveIndex(nextIndex);
    },
    [getCardStep, getMaxCarouselIndex]
  );

  const handleCarouselScroll = useCallback(() => {
    if (scrollFrameRef.current !== null) return;

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = null;

      const carousel = carouselRef.current;
      const step = getCardStep();

      if (!carousel || step <= 0) return;

      const maxIndex = getMaxCarouselIndex();
      const nextIndex = Math.min(maxIndex, Math.max(0, Math.round(carousel.scrollLeft / step)));

      if (nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    });
  }, [getCardStep, getMaxCarouselIndex]);

  const pauseCarousel = useCallback(() => {
    if (resumeCarouselTimeoutRef.current) {
      window.clearTimeout(resumeCarouselTimeoutRef.current);
      resumeCarouselTimeoutRef.current = null;
    }

    setIsCarouselPaused(true);
  }, []);

  const resumeCarouselAfterGesture = useCallback(() => {
    if (resumeCarouselTimeoutRef.current) {
      window.clearTimeout(resumeCarouselTimeoutRef.current);
    }

    resumeCarouselTimeoutRef.current = window.setTimeout(() => {
      setIsCarouselPaused(false);
      resumeCarouselTimeoutRef.current = null;
    }, 1200);
  }, []);

  useEffect(() => {
    if (!selectedService) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedService(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedService]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const updateViewport = () => setIsMobileCarousel(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);

    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  useEffect(() => {
    if (!isMobileCarousel || !isInView || selectedService || isCarouselPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        const carousel = carouselRef.current;
        const step = getCardStep();

        if (!carousel || step <= 0) return currentIndex;

        const maxIndex = getMaxCarouselIndex();
        const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;

        carousel.scrollTo({
          left: nextIndex * step,
          behavior: 'smooth'
        });

        return nextIndex;
      });
    }, 3600);

    return () => window.clearInterval(interval);
  }, [getCardStep, getMaxCarouselIndex, isCarouselPaused, isInView, isMobileCarousel, selectedService]);

  useEffect(() => {
    const handleResize = () => {
      if (!isMobileCarousel) return;
      scrollToIndex(activeIndex, 'auto');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, isMobileCarousel, scrollToIndex]);

  useEffect(() => {
    return () => {
      if (resumeCarouselTimeoutRef.current) {
        window.clearTimeout(resumeCarouselTimeoutRef.current);
      }
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
    };
  }, []);

  const openEnquiryPopup = () => {
    setSelectedService(null);
    window.dispatchEvent(new Event('open-enquiry-popup'));
  };

  return (
    <section id="services" className="scroll-mt-20 bg-premium-soft px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div ref={sectionRef} className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold">What We Do</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-navy sm:text-5xl">
            Decoration Services We Specialize In
          </h2>
          <p className="mx-auto mt-5 hidden max-w-2xl text-sm leading-7 text-charcoal/70 sm:block sm:text-base">
            A focused set of decor and event services from balloon styling to wedding stages,
            lighting, venue presentation, and on-site coordination.
          </p>
        </motion.div>

        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          onMouseEnter={pauseCarousel}
          onMouseLeave={resumeCarouselAfterGesture}
          onFocus={pauseCarousel}
          onBlur={resumeCarouselAfterGesture}
          onTouchStart={pauseCarousel}
          onTouchEnd={resumeCarouselAfterGesture}
          onTouchCancel={resumeCarouselAfterGesture}
          className="no-scrollbar -mx-5 mt-7 flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-5 sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={service.title}
                type="button"
                onClick={() => setSelectedService(service)}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                data-service-card
                className="group w-[82vw] shrink-0 snap-start overflow-hidden rounded-sm border border-gold/18 bg-pearl text-left shadow-[0_14px_34px_rgba(9,12,22,0.07)] transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 sm:w-auto"
                aria-label={`View details for ${service.title}`}
              >
                <div className="relative h-36 overflow-hidden bg-navy sm:h-40">
                  <Image
                    src={service.image}
                    alt={`${service.title} by ${clientProfile.name}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 82vw"
                    className={`object-cover ${service.imagePosition} transition duration-700 group-hover:scale-[1.03]`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/42 via-navy/8 to-white/10 transition duration-500 group-hover:from-navy/30" />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20" />
                  <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full border border-champagne/30 bg-obsidian/70 text-gold shadow-lg shadow-black/15">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex min-h-[184px] min-w-0 flex-col justify-center p-5 sm:min-h-[172px] sm:p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
                    0{index + 1}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight text-navy">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-charcoal/72">{service.description}</p>
                  <p className="mt-3 border-t border-navy/10 pt-3 text-xs font-semibold uppercase tracking-[0.12em] text-charcoal/55">
                    {service.detail}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
                    View details
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedService ? (
          <motion.div
            className="fixed inset-0 z-[75] flex items-center justify-center bg-black/75 px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-detail-title"
          >
            <motion.div
              className="relative grid max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-sm bg-white shadow-2xl shadow-black/30 md:grid-cols-[0.85fr_1fr]"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-navy/70 text-white transition hover:border-gold hover:text-gold md:border-navy/15 md:bg-white/90 md:text-navy"
                aria-label="Close service details"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative min-h-[170px] bg-navy sm:min-h-[220px] md:min-h-[560px]">
                <Image
                  src={selectedService.image}
                  alt={`${selectedService.title} detail`}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className={`object-cover ${selectedService.imagePosition}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-navy/80 text-gold">
                  {(() => {
                    const ActiveIcon = selectedService.icon;
                    return <ActiveIcon className="h-6 w-6" />;
                  })()}
                </div>
              </div>

              <div className="max-h-[calc(92vh-170px)] overflow-y-auto p-5 sm:max-h-[calc(92vh-220px)] sm:p-7 md:max-h-[92vh] lg:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">Service Detail</p>
                <h3 id="service-detail-title" className="mt-3 font-serif text-2xl leading-tight text-navy sm:text-4xl lg:text-5xl">
                  {selectedService.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-charcoal/72 sm:text-base sm:leading-8">
                  {selectedService.overview}
                </p>

                <div className="mt-5 border-y border-navy/10 py-4 sm:mt-7 sm:py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-charcoal/50">Best For</p>
                  <p className="mt-2 font-medium leading-7 text-navy">{selectedService.bestFor}</p>
                </div>

                <div className="mt-5 sm:mt-7">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-charcoal/50">
                    What We Handle
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {selectedService.includes.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-gold/30 bg-cream px-4 py-2 text-sm font-semibold text-navy"
                      >
                        <span className="mr-2 text-gold">✦</span>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openEnquiryPopup}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-gold hover:text-obsidian sm:mt-8 sm:w-auto"
                >
                  Enquire for this service
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
