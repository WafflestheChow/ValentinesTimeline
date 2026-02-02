import { assetsManifest } from './assets-manifest';

// Asset placeholders: replace these files with your real images.
// If you want explicit imports instead of string paths, uncomment the lines below
// AFTER you add images into src/assets/<month>/.
//
// September
// import sep01 from '../assets/sep/sep-01.jpg';
// import sep02 from '../assets/sep/sep-02.jpg';
// import sep03 from '../assets/sep/sep-03.jpg';
//
// October
// import oct01 from '../assets/oct/oct-01.jpg';
// import oct02 from '../assets/oct/oct-02.jpg';
// import oct03 from '../assets/oct/oct-03.jpg';
//
// November
// import nov01 from '../assets/nov/nov-01.jpg';
// import nov02 from '../assets/nov/nov-02.jpg';
// import nov03 from '../assets/nov/nov-03.jpg';
//
// December
// import dec01 from '../assets/dec/dec-01.jpg';
// import dec02 from '../assets/dec/dec-02.jpg';
// import dec03 from '../assets/dec/dec-03.jpg';
//
// January
// import jan01 from '../assets/jan/jan-01.jpg';
// import jan02 from '../assets/jan/jan-02.jpg';
// import jan03 from '../assets/jan/jan-03.jpg';
//
// February
// import feb01 from '../assets/feb/feb-01.jpg';
// import feb02 from '../assets/feb/feb-02.jpg';
// import feb03 from '../assets/feb/feb-03.jpg';

export type MonthKey = 'sep' | 'oct' | 'nov' | 'dec' | 'jan' | 'feb';

export interface MonthEntry {
  key: MonthKey;
  title: string;
  subtitle: string;
  description: string;
  images: { src: string; alt: string }[];
  accent: { from: string; to: string };
}

const buildImages = (key: MonthKey, title: string) =>
  assetsManifest[key].map((filename, index) => ({
    src: `/src/assets/${key}/${filename}`,
    alt: `${title} memory ${String(index + 1).padStart(2, '0')}`
  }));

export const months: MonthEntry[] = [
  {
    key: 'sep',
    title: 'September',
    subtitle: 'First sparks',
    description:
      'Golden afternoons, soft hellos, and the kind of laughter that made time feel elastic.',
    images: buildImages('sep', 'September'),
    accent: { from: 'from-[#f8a4c6]', to: 'to-[#f6d3a7]' }
  },
  {
    key: 'oct',
    title: 'October',
    subtitle: 'Cozy rituals',
    description:
      'Crisp evenings, warm drinks, and the quiet comfort of falling into a rhythm together.',
    images: buildImages('oct', 'October'),
    accent: { from: 'from-[#f68ca7]', to: 'to-[#f3a17f]' }
  },
  {
    key: 'nov',
    title: 'November',
    subtitle: 'Grateful hearts',
    description:
      'Little traditions, shared playlists, and a calm sense of being exactly where we belong.',
    images: buildImages('nov', 'November'),
    accent: { from: 'from-[#d989a5]', to: 'to-[#f2b5d4]' }
  },
  {
    key: 'dec',
    title: 'December',
    subtitle: 'City lights',
    description:
      'Twinkling streets, secret surprises, and late-night conversations that felt like home.',
    images: buildImages('dec', 'December'),
    accent: { from: 'from-[#c982ff]', to: 'to-[#f7a0b9]' }
  },
  {
    key: 'jan',
    title: 'January',
    subtitle: 'New year, same us',
    description:
      'Fresh beginnings, shared dreams, and the soft certainty of choosing each other again.',
    images: buildImages('jan', 'January'),
    accent: { from: 'from-[#7bd4ff]', to: 'to-[#f3a6c5]' }
  },
  {
    key: 'feb',
    title: 'February',
    subtitle: 'The heart of it',
    description:
      'Handwritten notes, candlelit evenings, and a love that keeps deepening with every day.',
    images: buildImages('feb', 'February'),
    accent: { from: 'from-[#ff7ab7]', to: 'to-[#ffd4a8]' }
  }
];
