import LetterTypewriter from './components/LetterTypewriter';
import Timeline from './components/Timeline';
import { months } from './data/timeline';

/*
How to add your photos:
1) Put images into src/assets/<month>/ with names like sep-01.jpg, sep-02.jpg, etc.
2) Either:
   A) Keep the string-path approach in src/data/timeline.ts (ensure your filenames match), or
   B) Uncomment the explicit import lines in src/data/timeline.ts and set images[].src to the imports.
*/

const loveLetter =
  'From the first hello in September to the soft glow of February, you have turned ordinary days into something luminous. Thank you for the way you listen, the way you laugh, and the way you make every moment feel like home. I choose you in the small things and the big ones—today, tomorrow, and all the days after.';

const App = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-20%] h-[400px] w-[400px] rounded-full bg-gradient-to-br from-pink-400/40 via-rose-300/40 to-purple-400/40 blur-3xl motion-safe:animate-blob" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[420px] w-[420px] rounded-full bg-gradient-to-br from-rose-400/30 via-pink-200/30 to-amber-200/30 blur-3xl motion-safe:animate-blob" />
      </div>
      <div className="noise absolute inset-0 -z-10" />

      <header className="mx-auto max-w-6xl px-6 pb-8 pt-16 md:pt-24">
        <p className="text-sm uppercase tracking-[0.4em] text-white/60">Valentine&apos;s Timeline</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold md:text-6xl">
          Six months of us, captured in soft light and shared moments.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/75">
          Scroll through September to February, tap into each gallery, and finish with a letter that types
          itself just for you.
        </p>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <Timeline months={months} />
        <section className="mt-24">
          <LetterTypewriter text={loveLetter} />
        </section>
      </main>
    </div>
  );
};

export default App;
