import { useEffect, useMemo, useState } from 'react';

interface LetterTypewriterProps {
  text: string;
}

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(() =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return reduced;
};

const LetterTypewriter = ({ text }: LetterTypewriterProps) => {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(reducedMotion ? text.length : 0);
  const [isPlaying, setIsPlaying] = useState(!reducedMotion);
  const [speed, setSpeed] = useState(60);

  useEffect(() => {
    if (reducedMotion) {
      setIndex(text.length);
      setIsPlaying(false);
    }
  }, [reducedMotion, text.length]);

  useEffect(() => {
    if (!isPlaying) return;
    if (index >= text.length) return;
    const interval = window.setInterval(() => {
      setIndex((prev) => Math.min(prev + 1, text.length));
    }, speed);
    return () => window.clearInterval(interval);
  }, [index, isPlaying, speed, text.length]);

  const displayText = useMemo(() => text.slice(0, index), [index, text]);

  return (
    <div className="rounded-[32px] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl md:p-10">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Love Letter</p>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">To you, always</h2>
        </div>
        <div className="min-h-[200px] rounded-2xl border border-white/10 bg-black/30 p-4 text-lg leading-relaxed text-white/90 md:p-6">
          <span>{displayText}</span>
          <span className="ml-1 inline-block h-5 w-0.5 bg-white/80 align-bottom" style={{ animation: 'blink 1s step-end infinite' }} />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIndex(0);
              setIsPlaying(true);
            }}
            className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Restart
          </button>
          <button
            type="button"
            onClick={() => {
              setIndex(text.length);
              setIsPlaying(false);
            }}
            className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Skip
          </button>
          <label className="flex items-center gap-3 text-sm text-white/70">
            <span>Speed</span>
            <input
              type="range"
              min={30}
              max={120}
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
              className="h-2 w-36 cursor-pointer appearance-none rounded-full bg-white/20 accent-pink-200"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default LetterTypewriter;
