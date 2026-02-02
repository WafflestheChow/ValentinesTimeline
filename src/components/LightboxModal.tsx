import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface LightboxModalProps {
  isOpen: boolean;
  images: { src: string; alt: string }[];
  startIndex: number;
  onClose: () => void;
}

const LightboxModal = ({ isOpen, images, startIndex, onClose }: LightboxModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [imageFailed, setImageFailed] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const total = images.length;

  const currentImage = useMemo(() => images[currentIndex], [currentIndex, images]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(startIndex);
      setImageFailed(false);
    }
  }, [isOpen, startIndex]);

  useEffect(() => {
    setImageFailed(false);
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % total);
      }
      if (event.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + total) % total);
      }
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, total]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
    >
      <div
        ref={dialogRef}
        className="relative flex w-full max-w-4xl flex-col gap-4 rounded-3xl border border-white/15 bg-[#15101c] p-4 text-white shadow-2xl md:p-6"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="ml-auto rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Close
        </button>
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + total) % total)}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            ← Prev
          </button>
          <span className="text-sm text-white/70">
            {currentIndex + 1} / {total}
          </span>
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % total)}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Next →
          </button>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          {imageFailed || !currentImage?.src ? (
            <div className="flex h-[60vh] w-full items-center justify-center bg-gradient-to-br from-white/10 via-white/5 to-transparent text-base text-white/70">
              <span>{currentImage?.alt ?? 'Photo placeholder'}</span>
            </div>
          ) : (
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="h-[60vh] w-full object-cover"
              onError={() => setImageFailed(true)}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LightboxModal;
