'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type GalleryCategory = 'Weddings' | 'Corporate' | 'Birthdays' | 'Galas';

const annaiImages = {
  stage: 'https://content.jdmagicbox.com/v2/comp/salem/a7/0427px427.x427.240730171835.i8a7/catalogue/annai-eventz-attur-salem-event-management-companies-lllpusjfps.jpg?w=1200&q=75',
  corporate: 'https://content.jdmagicbox.com/v2/comp/salem/a7/0427px427.x427.240730171835.i8a7/catalogue/annai-eventz-attur-salem-event-management-companies-8gar7i0246.jpg?w=1200&q=75',
  celebration: 'https://content.jdmagicbox.com/v2/comp/salem/a7/0427px427.x427.240730171835.i8a7/catalogue/annai-eventz-attur-salem-event-management-companies-sg3ww7menc.jpg?w=1200&q=75',
  decor: 'https://content.jdmagicbox.com/v2/comp/salem/a7/0427px427.x427.240730171835.i8a7/catalogue/annai-eventz-attur-salem-event-management-companies-1ksjgswx5m.jpg?w=1200&q=75',
  hall: 'https://content.jdmagicbox.com/v2/comp/salem/a7/0427px427.x427.240730171835.i8a7/catalogue/annai-eventz-attur-salem-event-management-companies-knisnja2a0.jpg?w=1200&q=75',
  venue: 'https://content.jdmagicbox.com/v2/comp/salem/a7/0427px427.x427.240730171835.i8a7/catalogue/annai-eventz-attur-salem-event-management-companies-lllpusjfps-250.jpg?w=1200&q=75'
};

const galleryCollections: Record<
  GalleryCategory,
  {
    title: string;
    description: string;
    cover: string;
    coverPosition: string;
    images: Array<{ src: string; alt: string; height: number }>;
  }
> = {
  Weddings: {
    title: 'Wedding Setups',
    description: 'Sample wedding stage and reception decor from Annai Eventz Attur.',
    cover: annaiImages.stage,
    coverPosition: 'object-center',
    images: [
      {
        src: annaiImages.stage,
        alt: 'Decorated wedding stage by Annai Eventz Attur',
        height: 760
      },
      {
        src: annaiImages.decor,
        alt: 'Floral event decor and stage arrangement',
        height: 996
      }
    ]
  },
  Corporate: {
    title: 'Corporate & Conferences',
    description: 'Conference, formal program, and corporate event samples.',
    cover: annaiImages.corporate,
    coverPosition: 'object-[58%_18%]',
    images: [
      {
        src: annaiImages.corporate,
        alt: 'Formal event program by Annai Eventz Attur',
        height: 650
      },
      {
        src: annaiImages.hall,
        alt: 'Indoor hall event setup sample',
        height: 540
      }
    ]
  },
  Birthdays: {
    title: 'Family Celebrations',
    description: 'Birthday, anniversary, and baby shower sample arrangements.',
    cover: annaiImages.celebration,
    coverPosition: 'object-[45%_16%]',
    images: [
      {
        src: annaiImages.celebration,
        alt: 'Family celebration event setup',
        height: 620
      },
      {
        src: annaiImages.venue,
        alt: 'Venue decor sample for family function',
        height: 610
      }
    ]
  },
  Galas: {
    title: 'Stage & Venue Decor',
    description: 'Backdrop, floral, lighting, and hall decoration samples.',
    cover: annaiImages.decor,
    coverPosition: 'object-[46%_18%]',
    images: [
      {
        src: annaiImages.decor,
        alt: 'Premium stage decor sample',
        height: 650
      },
      {
        src: annaiImages.stage,
        alt: 'Decorated hall backdrop sample',
        height: 720
      }
    ]
  }
};

const categoryKeys = Object.keys(galleryCollections) as GalleryCategory[];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [collectionIndex, setCollectionIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const activeCollection = activeCategory ? galleryCollections[activeCategory] : null;
  const visibleItems = useMemo(() => activeCollection?.images ?? [], [activeCollection]);
  const selectedItem = lightboxIndex === null ? null : visibleItems[lightboxIndex];
  const carouselCategory = categoryKeys[collectionIndex];
  const carouselCollection = galleryCollections[carouselCategory];

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeCategory]);

  useEffect(() => {
    if (activeCategory || isCarouselPaused) return;

    const timer = window.setInterval(() => {
      setCollectionIndex((index) => (index + 1) % categoryKeys.length);
    }, 3800);

    return () => window.clearInterval(timer);
  }, [activeCategory, isCarouselPaused]);

  useEffect(() => {
    if (lightboxIndex === null || visibleItems.length === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      }
      if (event.key === 'ArrowRight') {
        setLightboxIndex((index) => (index === null ? index : (index + 1) % visibleItems.length));
      }
      if (event.key === 'ArrowLeft') {
        setLightboxIndex((index) =>
          index === null ? index : (index - 1 + visibleItems.length) % visibleItems.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, visibleItems.length]);

  const showPrevious = () => {
    setLightboxIndex((index) =>
      index === null ? index : (index - 1 + visibleItems.length) % visibleItems.length
    );
  };

  const showNext = () => {
    setLightboxIndex((index) => (index === null ? index : (index + 1) % visibleItems.length));
  };

  const showPreviousCollection = () => {
    setCollectionIndex((index) => (index - 1 + categoryKeys.length) % categoryKeys.length);
  };

  const showNextCollection = () => {
    setCollectionIndex((index) => (index + 1) % categoryKeys.length);
  };

  return (
    <section
      id="gallery"
      className="relative scroll-mt-20 overflow-hidden bg-pearl px-5 pb-2 pt-20 sm:px-8 sm:pb-6 lg:px-10 lg:pb-8 lg:pt-28"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gold/20" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65 }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold">Selected Moments</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-navy sm:text-5xl">
              {activeCollection ? activeCollection.title : 'Annai Portfolio'}
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-charcoal/70">
              {activeCollection
                ? activeCollection.description
                : 'A sample gallery from Annai Eventz Attur, arranged by event type and decor style.'}
            </p>
          </div>

          {activeCollection ? (
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="inline-flex items-center gap-2 rounded-full border border-gold px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-gold transition hover:bg-gold hover:text-navy"
            >
              <ArrowLeft className="h-4 w-4" />
              Collections
            </button>
          ) : null}
        </motion.div>

        <AnimatePresence mode="wait">
          {!activeCollection ? (
            <motion.div
              key="collections"
              className="mt-10"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              <div className="relative overflow-hidden rounded-sm bg-obsidian shadow-luxe ring-1 ring-gold/20">
                <div className="pointer-events-none absolute inset-4 z-10 border border-white/12" />
                <AnimatePresence mode="wait">
                  <motion.button
                    key={carouselCategory}
                    type="button"
                    onClick={() => setActiveCategory(carouselCategory)}
                    className="group relative block min-h-[320px] w-full overflow-hidden text-left sm:min-h-[430px] lg:min-h-[470px]"
                    aria-label={`Open ${carouselCollection.title} gallery`}
                    initial={{ opacity: 0, x: 42, scale: 1.02 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -42, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={carouselCollection.cover}
                      alt={`${carouselCollection.title} cover`}
                      fill
                      sizes="(min-width: 1024px) 1180px, 100vw"
                      className={`object-cover ${carouselCollection.coverPosition} transition duration-700 group-hover:scale-105`}
                      priority={collectionIndex === 0}
                    />
                    <span className="absolute inset-0 bg-gradient-to-r from-obsidian/86 via-plum/42 to-navy/5" />
                    <span className="absolute inset-0 bg-gradient-to-t from-obsidian/72 via-transparent to-black/8" />
                    <span className="relative z-10 flex min-h-[320px] max-w-2xl flex-col justify-end p-6 sm:min-h-[430px] sm:p-10 lg:min-h-[470px]">
                      <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold">
                        0{collectionIndex + 1} Collection
                      </span>
                      <span className="mt-4 font-serif text-4xl leading-tight text-white sm:text-6xl">
                        {carouselCollection.title}
                      </span>
                      <span className="mt-4 max-w-xl text-sm leading-6 text-white/82 sm:text-base sm:leading-7">
                        {carouselCollection.description}
                      </span>
                      <span className="mt-7 inline-flex w-fit items-center gap-2 border-b border-gold pb-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
                        View {carouselCollection.images.length} images
                        <Maximize2 className="h-4 w-4" />
                      </span>
                    </span>
                    <span className="absolute right-6 top-6 z-10 hidden font-serif text-7xl leading-none text-white/10 sm:block">
                      0{collectionIndex + 1}
                    </span>
                  </motion.button>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {categoryKeys.map((category, index) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setCollectionIndex(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        collectionIndex === index ? 'w-8 bg-gold' : 'w-2.5 bg-navy/18 hover:bg-gold/60'
                      }`}
                      aria-label={`Show ${galleryCollections[category].title} collection`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={showPreviousCollection}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold transition hover:bg-gold hover:text-navy"
                    aria-label="Show previous collection"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextCollection}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold transition hover:bg-gold hover:text-navy"
                    aria-label="Show next collection"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
                {categoryKeys.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                      activeCategory === category
                        ? 'border-gold bg-gold text-navy'
                        : 'border-navy/10 bg-white text-charcoal hover:border-gold hover:text-gold'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <motion.div
                className="mt-8 columns-1 gap-5 md:columns-2 lg:columns-3"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <AnimatePresence mode="popLayout">
                  {visibleItems.map((item, index) => (
                    <motion.button
                      key={item.src}
                      type="button"
                      layout
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      onClick={() => setLightboxIndex(index)}
                      aria-label={`Open ${activeCategory} image: ${item.alt}`}
                      className="group relative mb-5 block w-full overflow-hidden rounded-sm bg-navy text-left shadow-luxe ring-1 ring-navy/5 transition hover:ring-gold/50"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={900}
                        height={item.height}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="h-auto w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-navy/80 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 opacity-0 transition duration-300 group-hover:opacity-100">
                        <span className="text-sm font-bold uppercase tracking-[0.18em] text-white">
                          {activeCategory}
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy">
                          <Maximize2 className="h-4 w-4" />
                        </span>
                      </span>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedItem ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 px-5 py-8 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-gold hover:text-gold"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close gallery lightbox"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold hover:text-navy md:flex"
              onClick={showPrevious}
              aria-label="Show previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.div
              className="relative h-[78vh] w-full max-w-5xl overflow-hidden rounded-sm"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.35 }}
            >
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
            <button
              type="button"
              className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold hover:text-navy md:flex"
              onClick={showNext}
              aria-label="Show next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
