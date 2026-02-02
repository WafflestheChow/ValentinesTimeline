import { useState } from 'react';

interface GalleryProps {
  id: string;
  images: { src: string; alt: string }[];
  monthTitle: string;
  onOpenLightbox: (index: number) => void;
}

const Gallery = ({ id, images, monthTitle, onOpenLightbox }: GalleryProps) => {
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  return (
    <section id={id} className="scroll-mt-28" tabIndex={-1}>
      <h3 className="sr-only">{monthTitle} photo gallery</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={`Open ${image.alt} in lightbox`}
            onClick={() => onOpenLightbox(index)}
          >
            {failedImages[index] || !image.src ? (
              <div className="flex h-44 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent text-sm text-white/70 md:h-48">
                <span>{image.alt}</span>
              </div>
            ) : (
              <img
                src={image.src}
                alt={image.alt}
                className="h-44 w-full object-cover transition duration-500 group-hover:scale-105 md:h-48"
                loading="lazy"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [index]: true
                  }))
                }
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
