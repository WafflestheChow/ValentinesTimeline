import { CSSProperties, useMemo, useState } from 'react';
import { MonthEntry } from '../data/timeline';
import Gallery from './Gallery';

interface MonthCardProps {
  month: MonthEntry;
  galleryId: string;
  onOpenLightbox: (monthKey: MonthEntry['key'], startIndex: number) => void;
  onViewGallery: (galleryId: string) => void;
  reducedMotion: boolean;
}

const MonthCard = ({
  month,
  galleryId,
  onOpenLightbox,
  onViewGallery,
  reducedMotion
}: MonthCardProps) => {
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({});

  const gradientClass = useMemo(() => `${month.accent.from} ${month.accent.to}`, [month]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateX = ((y / bounds.height) - 0.5) * -6;
    const rotateY = ((x / bounds.width) - 0.5) * 6;
    setTiltStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    });
  };

  const resetTilt = () => setTiltStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg)' });

  return (
    <div
      className="relative rounded-[32px] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 hover:shadow-glow md:p-10"
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br opacity-40 blur-3xl" />
      <div
        className={`absolute inset-0 -z-20 rounded-[32px] bg-gradient-to-br ${gradientClass} opacity-30`}
      />
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">{month.subtitle}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{month.title}</h2>
          <p className="mt-3 max-w-2xl text-base text-white/80 md:text-lg">
            {month.description}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onViewGallery(galleryId)}
          className="w-fit rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:border-white/60 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          View photos
        </button>
        <Gallery
          id={galleryId}
          images={month.images}
          monthTitle={month.title}
          onOpenLightbox={(index) => onOpenLightbox(month.key, index)}
        />
      </div>
    </div>
  );
};

export default MonthCard;
