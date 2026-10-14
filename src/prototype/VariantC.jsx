// PROTOTYPE — Variant C, "The river": the moving line is the first thing you see, in very
// large type; the photos come second, pinned like prints. A thin gold line runs down the
// page and draws itself as you scroll, with a marker at each section. The logos are a
// loose collage of tiles, and the three questions get a hand-drawn underline.
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import * as c from './content';
import { Opening, Gap, WhiteboardStandIn, Wordmark, Reveal, MovingLine } from './shared';

export const label = 'The river';

function Underline() {
  const still = useReducedMotion();
  return (
    <svg viewBox="0 0 300 12" preserveAspectRatio="none" className="mt-1 h-3 w-full text-amber-500" aria-hidden="true">
      <motion.path
        d="M2 8 C 60 2, 120 11, 180 6 S 270 3, 298 7"
        fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
        initial={still ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-20% 0px' }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      />
    </svg>
  );
}

function Station({ title, children }) {
  return (
    <section className="relative pb-24 pl-8 sm:pl-14">
      <span className="absolute left-[-5px] top-2 h-3 w-3 rounded-full border-2 border-amber-500 bg-white sm:left-[-6px]" aria-hidden="true" />
      <Reveal>
        <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{title}</h2>
        <div className="mt-6">{children}</div>
      </Reveal>
    </section>
  );
}

// Tiles of different sizes, slightly turned, like prints on a whiteboard.
const tileShape = [
  'col-span-2 -rotate-1', 'rotate-2', '-rotate-2', 'col-span-2 rotate-1', '-rotate-1', 'rotate-1',
];

export default function VariantC() {
  const still = useReducedMotion();
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start start', 'end end'] });
  const drawn = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-700">
      {/* First screen: the moving line, as large as the phone allows. */}
      <header className="flex min-h-[100svh] flex-col justify-between px-5 pb-8 pt-6 sm:px-12">
        <div className="flex items-center gap-3">
          <img src="/images/prototype-profile-640.jpg" alt="Taimoor Alam" className="h-11 w-11 rounded-full object-cover object-[57%_20%]" />
          <div className="leading-tight">
            <h1 className="text-[15px] font-bold text-zinc-900">{c.name}</h1>
            <p className="text-[12px] text-zinc-500">{c.titleLine}</p>
          </div>
        </div>

        <div className="py-10">
          <MovingLine
            stem={c.movingStem}
            endings={c.movingEndings}
            stemClass="font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight text-zinc-900 sm:text-7xl"
            listClass="mt-1 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight text-amber-500 sm:text-7xl"
            buttonClass="border-zinc-300 text-zinc-500"
            tilt={32}
          />
        </div>

        <div>
          <p className="max-w-xl text-[17px] leading-relaxed text-zinc-700">
            <Opening linkClass="font-semibold text-zinc-900 underline decoration-amber-500 decoration-2 underline-offset-4" />
          </p>
          <a href={c.consultingHref} className="mt-6 flex items-center justify-between rounded-2xl bg-zinc-900 px-6 py-5 text-white sm:inline-flex sm:gap-10">
            <span className="text-lg font-semibold">{c.price}</span>
            <span className="flex items-center gap-2 text-sm"><Gap className="!opacity-80">button label</Gap> →</span>
          </a>
        </div>
      </header>

      <div ref={pageRef} className="relative mx-auto max-w-3xl px-5 pt-10 sm:px-12">
        {/* The river: drawn as you scroll; under reduced motion it is simply there. */}
        <svg className="pointer-events-none absolute bottom-0 left-5 top-0 h-full w-[2px] sm:left-12" preserveAspectRatio="none" viewBox="0 0 2 100" aria-hidden="true">
          <line x1="1" y1="0" x2="1" y2="100" stroke="#e4e4e7" strokeWidth="2" />
          <motion.line x1="1" y1="0" x2="1" y2="100" stroke="#f59e0b" strokeWidth="2" style={{ pathLength: still ? 1 : drawn }} />
        </svg>

        {/* The photos, second: pinned like prints. */}
        <Station title="">
          <div className="relative">
            <WhiteboardStandIn className="aspect-[4/3] w-full -rotate-1 rounded-lg shadow-xl" />
            <img src="/images/prototype-profile-640.jpg" alt="" className="absolute -bottom-6 -right-2 h-28 w-28 rotate-3 rounded-lg border-4 border-white object-cover object-[57%_20%] shadow-lg" />
          </div>
        </Station>

        <Station title={c.problems.heading}>
          <p className="text-lg leading-relaxed">{c.problems.lead}</p>
          <ul className="mt-8 space-y-8">
            {c.problems.questions.map((q) => (
              <li key={q} className="font-display text-2xl font-semibold leading-snug text-zinc-900">
                {q}
                <Underline />
              </li>
            ))}
          </ul>
        </Station>

        <Station title={c.bring.heading}>
          <ol className="space-y-5">
            {c.bring.items.map(([lead, rest], k) => (
              <li key={lead} className="grid grid-cols-[2rem_1fr] gap-2">
                <span className="font-display text-sm font-bold text-amber-500">{String(k + 1).padStart(2, '0')}</span>
                <p className="text-[17px] leading-relaxed"><strong className="text-zinc-900">{lead}</strong> {rest}</p>
              </li>
            ))}
          </ol>
        </Station>

        <Station title={<Gap>logo heading: they hired me, and I worked for them</Gap>}>
          <div className="grid grid-cols-2 gap-3">
            {c.logos.map((l, k) => (
              <div key={l.name} className={`grid place-items-center rounded-xl bg-zinc-50 px-4 py-6 text-zinc-800 shadow-sm ring-1 ring-zinc-200 ${tileShape[k]}`}>
                <Wordmark {...l} className="h-10 w-full" />
              </div>
            ))}
          </div>
        </Station>

        <Station title={<Gap>heading for the four stories</Gap>}>
          <div className="space-y-10">
            {c.stories.map((s, k) => (
              <article key={s}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Story {k + 1}</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-zinc-900">{s}</h3>
                <p className="mt-2"><Gap>the story, in your words</Gap></p>
              </article>
            ))}
          </div>
        </Station>

        <Station title="What I write about">
          <ul className="space-y-3">
            {c.writeTopics.map((t) => <li key={t} className="text-lg">{t}</li>)}
          </ul>
          <div className="mt-6 space-y-3">
            {[1, 2, 3].map((n) => <Gap key={n} className="block">post {n} you pick</Gap>)}
          </div>
          <a href={c.linkedin} className="mt-6 inline-block font-semibold text-zinc-900 underline decoration-amber-500 decoration-2 underline-offset-4">Follow on LinkedIn</a>
        </Station>

        <Station title="Paid consulting">
          <a href={c.consultingHref} className="block rounded-2xl bg-zinc-900 p-8 text-white">
            <span className="block font-display text-6xl font-bold">$500</span>
            <span className="block text-zinc-400">per hour</span>
            <span className="mt-4 block text-sm"><Gap className="!opacity-80">a line on what the hour is for</Gap></span>
          </a>
          <p className="mt-6">My company: <a href={c.goldenRiver} className="font-semibold text-zinc-900 underline decoration-amber-500 decoration-2 underline-offset-4">Golden River</a></p>
        </Station>
      </div>

      <footer className="mx-auto max-w-3xl px-5 py-10 pb-32 text-sm text-zinc-500 sm:px-12">
        <p>{c.education}</p>
        <p className="mt-2"><a href={`mailto:${c.email}`} className="text-zinc-900 underline underline-offset-4">{c.email}</a></p>
        <p className="mt-6"><Gap>footer</Gap></p>
      </footer>
    </div>
  );
}
