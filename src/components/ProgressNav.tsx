import { MonthEntry } from '../data/timeline';

interface ProgressNavProps {
  months: MonthEntry[];
  activeIndex: number;
  onJump: (index: number) => void;
}

const ProgressNav = ({ months, activeIndex, onJump }: ProgressNavProps) => {
  return (
    <nav
      aria-label="Timeline progress"
      className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 rounded-full border border-white/10 bg-white/5 px-3 py-4 text-xs text-white shadow-lg backdrop-blur-lg md:flex"
    >
      {months.map((month, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={month.key}
            type="button"
            onClick={() => onJump(index)}
            className="group flex items-center gap-2 text-left"
            aria-current={isActive ? 'step' : undefined}
          >
            <span
              className={`h-2 w-2 rounded-full border transition-all ${
                isActive
                  ? 'border-white bg-white shadow-glow'
                  : 'border-white/40 bg-transparent group-hover:border-white/80'
              }`}
            />
            <span className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-60'}`}>
              {month.title}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default ProgressNav;
