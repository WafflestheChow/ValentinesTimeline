import { useEffect, useMemo, useRef, useState } from 'react';
// Framer Motion enables refined scroll entrance animations with minimal code.
import { motion, useReducedMotion } from 'framer-motion';
import { MonthEntry } from '../data/timeline';
import LightboxModal from './LightboxModal';
import MonthCard from './MonthCard';
import ProgressNav from './ProgressNav';

interface TimelineProps {
  months: MonthEntry[];
}

interface LightboxState {
  isOpen: boolean;
  monthKey: MonthEntry['key'] | null;
  index: number;
}

const Timeline = ({ months }: TimelineProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxState, setLightboxState] = useState<LightboxState>({
    isOpen: false,
    monthKey: null,
    index: 0
  });
  const reduceMotion = useReducedMotion();

  const monthSections = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const sections = monthSections.current.filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target as HTMLElement);
            if (index >= 0) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [months.length]);

  const handleJump = (index: number) => {
    const section = monthSections.current[index];
    if (!section) return;
    section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const handleOpenLightbox = (monthKey: MonthEntry['key'], index: number) => {
    setLightboxState({ isOpen: true, monthKey, index });
  };

  const handleCloseLightbox = () => setLightboxState({ isOpen: false, monthKey: null, index: 0 });

  const lightboxImages = useMemo(() => {
    const month = months.find((entry) => entry.key === lightboxState.monthKey);
    return month?.images ?? [];
  }, [lightboxState.monthKey, months]);

  return (
    <div className="relative">
      <ProgressNav months={months} activeIndex={activeIndex} onJump={handleJump} />
      <div className="scroll-snap flex flex-col gap-16 pb-32 md:gap-24">
        {months.map((month, index) => {
          const galleryId = `${month.key}-gallery`;
          return (
            <motion.section
              key={month.key}
              ref={(el) => {
                monthSections.current[index] = el;
              }}
              id={`month-${month.key}`}
              className="scroll-section flex min-h-[75vh] items-center"
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <MonthCard
                month={month}
                galleryId={galleryId}
                onOpenLightbox={handleOpenLightbox}
                onViewGallery={(id) => {
                  const target = document.getElementById(id);
                  if (!target) return;
                  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
                  target.focus({ preventScroll: true });
                }}
                reducedMotion={reduceMotion}
              />
            </motion.section>
          );
        })}
      </div>
      <LightboxModal
        isOpen={lightboxState.isOpen}
        images={lightboxImages}
        startIndex={lightboxState.index}
        onClose={handleCloseLightbox}
      />
    </div>
  );
};

export default Timeline;
