// taimooralam.com: one page, in the look he picked (portfolio#1, design B). The pinned
// header with his photo, the opening with the $500 button, the logos as proof, then the
// About's sections, the stories, what he writes about, paid consulting and the footer.
// Dashed [placeholders] are words still his to write; they are filled before go-live (#11).
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import * as c from './site/content';
import { Gap, Reveal, MovingLine } from './site/parts';
import PinnedHeader from './site/PinnedHeader';
import { HomeCollage } from './site/Posts';

const eyebrow = 'text-sm font-medium uppercase tracking-[0.2em] text-amber-300/80';
const focusRing = [
  '[&_a:focus-visible]:outline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-amber-300',
  '[&_button:focus-visible]:outline [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-amber-300',
  '[&_[tabindex]:focus-visible]:outline [&_[tabindex]:focus-visible]:outline-2 [&_[tabindex]:focus-visible]:outline-offset-4 [&_[tabindex]:focus-visible]:outline-amber-300',
].join(' ');

// A statement that brightens as it passes the middle of the screen. It starts at 70%, not
// lower, so even the dim state stays readable (WCAG contrast).
function LitLine({ lead, rest }) {
  const ref = useRef(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'start 45%'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  return (
    <motion.li ref={ref} style={still ? undefined : { opacity }} className="py-6">
      <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white">{lead}</h3>
      <p className="mt-2 text-base leading-relaxed text-neutral-300">{rest}</p>
    </motion.li>
  );
}

// The real logos, dark-ground versions. Heights set by eye so each carries the same weight.
const logoSize = {
  golden_river: [1.9, 11], seven_one: [2.5, 9], samdock: [1.5, 9], mercedes_benz_group: [1.35, 12],
  fortiss: [1.6, 8], osram: [1.45, 8], gorillabox: [2.9, 6], onescreen: [1.45, 9],
  techlogix: [1.8, 9], lmkt: [2.1, 6],
};
function Logo({ l, hidden = false }) {
  const [h, w] = logoSize[l.file] ?? [2, 9];
  return (
    <img
      src={`/logos/${l.file}-on-dark.svg`}
      alt={hidden ? '' : l.sub ? `${l.name} (${l.sub})` : l.name}
      style={{ height: `${h}rem`, maxWidth: `${w}rem` }}
      className="w-auto shrink-0 object-contain opacity-90"
      loading="lazy"
    />
  );
}

// Drifts on a loop; stops on hover and with the pause button (WCAG 2.2.2). The second copy
// that makes the loop seamless is hidden from screen readers, so each name is read once.
function LogoStrip() {
  const still = useReducedMotion();
  const [held, setHeld] = useState(false);
  if (still) {
    return <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">{c.logos.map((l) => <Logo key={l.name} l={l} />)}</div>;
  }
  return (
    <div>
      <style>{'@keyframes logo-drift { to { transform: translateX(-50%); } }'}</style>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div
          className="flex w-max items-center group-hover:[animation-play-state:paused]"
          style={{ animation: 'logo-drift 40s linear infinite', animationPlayState: held ? 'paused' : undefined }}
        >
          <div className="flex items-center gap-14 pr-14">{c.logos.map((l) => <Logo key={l.name} l={l} />)}</div>
          <div className="flex items-center gap-14 pr-14" aria-hidden="true">{c.logos.map((l) => <Logo key={l.name} l={l} hidden />)}</div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setHeld(!held)}
        aria-label={held ? 'Play the logos' : 'Pause the logos'}
        className="mx-auto mt-4 grid h-11 w-11 place-items-center rounded-full border border-neutral-700 text-neutral-400"
      >
        {held
          ? <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 fill-current" aria-hidden="true"><path d="M3 1.5v11l9.5-5.5z" /></svg>
          : <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 fill-current" aria-hidden="true"><rect x="2" y="1" width="3.5" height="12" rx="1" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" /></svg>}
      </button>
    </div>
  );
}

export default function App() {
  const [past, setPast] = useState(false);
  const ctaRef = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting), { threshold: 0 });
    io.observe(ctaRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`min-h-screen ${focusRing}`}>
      <PinnedHeader past={past} />
      <main className="mx-auto max-w-4xl px-5 sm:px-10">
        {/* Room for the header's large state, so its shrinking never moves the page. */}
        <div className="h-[248px]" aria-hidden="true" />
        <p className="max-w-[65ch] text-lg leading-relaxed text-neutral-100 lg:text-xl">
          {c.opening.before}
          <a href={c.goldenRiver} className="text-amber-300 underline underline-offset-4">{c.opening.link}</a>
          {c.opening.after}
        </p>
        <a ref={ctaRef} href={c.consultingHref} className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-amber-300 px-7 py-4 font-semibold text-neutral-950">
          {c.price} · {c.bookLabel} →
        </a>

        {/* The logos, with no heading: his call, 2026-10-14 (#7). The opening above gives them their meaning. */}
        <div className="mt-16">
          <LogoStrip />
        </div>

        {/* What he writes about, right under the logos (his call, 2026-10-15): the moving line,
            then his top three posts as a collage, then the way to everything else. */}
        <section className="mt-16 lg:mt-24">
          <h2 className="sr-only">What I write about</h2>
          <div className="max-w-2xl">
            <MovingLine
              stem={c.movingStem}
              endings={c.movingEndings}
              stemClass={eyebrow}
              listClass="mt-3 space-y-2 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl"
              buttonClass="border-neutral-700 text-neutral-400"
            />
          </div>
          <div className="mt-8"><HomeCollage /></div>
          <div className="mt-4 flex flex-wrap gap-x-6">
            <a href={c.postsHref} className="inline-flex min-h-11 items-center text-sm font-semibold text-amber-300 underline underline-offset-4">See all my posts and videos →</a>
            <a href={c.linkedin} className="inline-flex min-h-11 items-center text-sm font-semibold text-neutral-300 underline underline-offset-4">Follow on LinkedIn</a>
          </div>
        </section>

        <Reveal as="section" className="mt-16 max-w-2xl lg:mt-24">
          <h2 className={eyebrow}>{c.problems.heading}</h2>
          <p className="mt-4 text-xl leading-relaxed text-neutral-300">{c.problems.lead}</p>
          <ul className="mt-6 space-y-3">
            {c.problems.questions.map((q) => (
              <li key={q} className="rounded-2xl bg-neutral-900 px-5 py-4 text-lg text-white">{q}</li>
            ))}
          </ul>
        </Reveal>

        <section className="mt-16 max-w-2xl lg:mt-24">
          <h2 className={eyebrow}>{c.bring.heading}</h2>
          <ul className="mt-2 divide-y divide-neutral-800">
            {c.bring.items.map(([lead, rest]) => <LitLine key={lead} lead={lead} rest={rest} />)}
          </ul>
        </section>

        <section className="mt-16 lg:mt-24">
          <h2 id="stories-heading" className={eyebrow}>{c.storiesHeading}</h2>
          <div
            role="region" aria-labelledby="stories-heading" tabIndex={0}
            className="-mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0"
          >
            {c.stories.map((s, k) => (
              <article key={s} className="w-[80%] shrink-0 snap-start rounded-3xl bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 sm:w-80 lg:w-auto lg:min-w-0">
                <p className="text-5xl font-bold text-neutral-600" aria-hidden="true">{k + 1}</p>
                <h3 className="mt-6 text-xl font-semibold text-white">{s}</h3>
                <p className="mt-3 text-neutral-400"><Gap>the story, in your words</Gap></p>
              </article>
            ))}
          </div>
          <p className="mt-2 text-xs text-neutral-400 lg:hidden">Swipe →</p>
        </section>


        <Reveal as="section" className="mt-16 max-w-2xl rounded-3xl border border-amber-300/30 bg-gradient-to-b from-amber-300/10 to-transparent p-8 text-center lg:mt-24">
          <h2 className={eyebrow}>Paid consulting</h2>
          <p className="mt-4 text-6xl font-bold tracking-tight text-white">$500<span className="text-2xl text-neutral-400">/hour</span></p>
          <p className="mt-4 text-lg text-neutral-300">{c.hourLine}</p>
          <a href={c.consultingHref} className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-amber-300 px-8 py-4 font-semibold text-neutral-950">{c.price} · {c.bookLabel} →</a>
          <p className="mt-6 text-sm text-neutral-400">My company: <a href={c.goldenRiver} className="text-white underline underline-offset-4">Golden River</a></p>
        </Reveal>

        <footer className="mt-16 border-t border-neutral-800 py-10 pb-32 text-sm text-neutral-400 lg:mt-24">
          <p>{c.education}</p>
          <p className="mt-2"><a href={`mailto:${c.email}`} className="text-neutral-200 underline underline-offset-4">{c.email}</a></p>
        </footer>
      </main>
    </div>
  );
}
