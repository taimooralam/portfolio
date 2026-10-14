// PROTOTYPE — Variant B, "Cinematic": dark, one column (no whiteboard photo for now, his
// call 2026-10-14). His photo starts large and shrinks into a bar pinned at the top as you
// scroll; the $500 button joins that bar once the one in the opening has scrolled away.
// The logos sit right under the opening as proof, drifting past with a pause button.
// Statements brighten as they reach the middle of the screen, and the stories swipe
// sideways on a phone and sit two by two on a laptop.
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import * as c from './content';
import { Opening, Gap, Reveal, MovingLine } from './shared';

export const label = 'Cinematic';

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

export default function VariantB() {
  const [past, setPast] = useState(false);
  const ctaRef = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting), { threshold: 0 });
    io.observe(ctaRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`min-h-screen bg-neutral-950 font-sans text-neutral-200 ${focusRing}`}>
      <PinnedHeader past={past} />
      <main className="mx-auto max-w-4xl px-5 sm:px-10">
        {/* Room for the header's large state, so its shrinking never moves the page. */}
        <div className="h-52" aria-hidden="true" />
        <p className="max-w-[65ch] text-lg leading-relaxed text-neutral-100 lg:text-xl">
          <Opening linkClass="text-amber-300 underline underline-offset-4" />
        </p>
        <a ref={ctaRef} href={c.consultingHref} className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-amber-300 px-7 py-4 font-semibold text-neutral-950">
          {c.price} · {c.bookLabel} →
        </a>

        <section className="mt-16">
          <h2 className="mb-8 text-center text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
            <Gap>logo heading: they hired me, and I worked for them</Gap>
          </h2>
          <LogoStrip />
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
          <h2 id="stories-heading" className={eyebrow}><Gap>heading for the four stories</Gap></h2>
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

        <Reveal as="section" className="mt-16 max-w-2xl lg:mt-24">
          <h2 className="sr-only">What I write about</h2>
          <MovingLine
            stem={c.movingStem}
            endings={c.movingEndings}
            stemClass={eyebrow}
            listClass="mt-3 space-y-2 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl"
            buttonClass="border-neutral-700 text-neutral-400"
          />
          <div className="mt-6 space-y-3">
            {[1, 2, 3].map((n) => <Gap key={n} className="block">post {n} you pick</Gap>)}
          </div>
          <a href={c.linkedin} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-amber-300 underline underline-offset-4">Follow on LinkedIn</a>
        </Reveal>

        <Reveal as="section" className="mt-16 max-w-2xl rounded-3xl border border-amber-300/30 bg-gradient-to-b from-amber-300/10 to-transparent p-8 text-center lg:mt-24">
          <h2 className={eyebrow}>Paid consulting</h2>
          <p className="mt-4 text-6xl font-bold tracking-tight text-white">$500<span className="text-2xl text-neutral-400">/hour</span></p>
          <p className="mt-4 text-neutral-400"><Gap>a line on what the hour is for</Gap></p>
          <a href={c.consultingHref} className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-amber-300 px-8 py-4 font-semibold text-neutral-950">{c.price} · {c.bookLabel} →</a>
          <p className="mt-6 text-sm text-neutral-400">My company: <a href={c.goldenRiver} className="text-white underline underline-offset-4">Golden River</a></p>
        </Reveal>

        <footer className="mt-16 border-t border-neutral-800 py-10 pb-32 text-sm text-neutral-400 lg:mt-24">
          <p>{c.education}</p>
          <p className="mt-2"><a href={`mailto:${c.email}`} className="text-neutral-200 underline underline-offset-4">{c.email}</a></p>
          <p className="mt-6"><Gap>footer</Gap></p>
        </footer>
      </main>
    </div>
  );
}

// The pinned bar. It sits outside the page flow (fixed), and the photo and name shrink
// with transforms only, so nothing below them moves (no layout shift). Over the first
// 180px of scrolling the photo goes from 128px to 40px and the name slides into the bar.
// Under reduced motion it switches between the two states in one step.
const SHRINK = 180;
function PinnedHeader({ past }) {
  const still = useReducedMotion();
  const { scrollY } = useScroll();
  const smooth = useTransform(scrollY, [0, SHRINK], [0, 1]);
  const stepped = useMotionValue(0);
  useEffect(() => { stepped.set(window.scrollY > SHRINK / 2 ? 1 : 0); }, [stepped]);
  useMotionValueEvent(scrollY, 'change', (y) => stepped.set(y > SHRINK / 2 ? 1 : 0));
  const t = still ? stepped : smooth;

  // Large: photo 128px at 40px from the top. Small: 40px, centred in the 64px bar.
  const photoY = useTransform(t, [0, 1], [40, 12]);
  const photoScale = useTransform(t, [0, 1], [1, 40 / 128]);
  // The name block is centred on the large photo; it slides left and up onto the bar's centre line.
  const nameX = useTransform(t, [0, 1], [0, -92]);
  const nameY = useTransform(t, [0, 1], [0, -72]);
  // The name's large size follows the screen width (so it fits next to the photo on a
  // 320px phone); measure it so it always lands at 16px in the bar.
  const nameRef = useRef(null);
  const [nameSize, setNameSize] = useState(30);
  useEffect(() => {
    const measure = () => setNameSize(parseFloat(getComputedStyle(nameRef.current).fontSize));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  const nameScale = useTransform(t, [0, 1], [1, 16 / nameSize]);
  const subOpacity = useTransform(t, [0, 0.5], [1, 0]);
  const barShade = useTransform(t, [0.55, 1], [0, 0.96]);
  const bg = useTransform(barShade, (a) => `rgba(10,10,10,${a})`);
  const line = useTransform(barShade, (a) => `rgba(38,38,38,${a})`);

  return (
    <motion.header style={{ backgroundColor: bg, borderBottomColor: line }} className="fixed inset-x-0 top-0 z-40 h-16 border-b backdrop-blur">
      <div className="mx-auto h-full max-w-4xl px-5 sm:px-10">
        <div className="relative h-full">
          <motion.img
            src="/images/prototype-profile-640.jpg" alt="Taimoor Alam" width={128} height={128}
            style={{ y: photoY, scale: photoScale, originX: 0, originY: 0 }}
            className="pointer-events-none absolute left-0 top-0 h-32 w-32 rounded-full object-cover object-[57%_20%] ring-2 ring-amber-300/60"
          />
          <motion.div
            style={{ x: nameX, y: nameY, scale: nameScale, originX: 0 }}
            className="pointer-events-none absolute left-36 right-0 top-10 flex h-32 flex-col justify-center"
          >
            {/* The title line hangs below the name, so the name alone is centred and lands on the bar's centre line. */}
            <div className="relative">
              <h1 ref={nameRef} className="whitespace-nowrap text-[clamp(20px,calc((100vw_-_184px)/6.6),30px)] font-bold leading-tight tracking-tight text-white">{c.name}</h1>
              <motion.p style={{ opacity: subOpacity }} className="absolute inset-x-0 top-full text-[13px] text-neutral-300">{c.titleLine}</motion.p>
            </div>
          </motion.div>
          <a
            href={c.consultingHref}
            className={`absolute right-0 top-1/2 inline-flex min-h-11 -translate-y-1/2 items-center rounded-full bg-amber-300 px-4 text-sm font-semibold text-neutral-950 max-[359px]:px-3 ${past ? '' : 'hidden'}`}
          >
            {c.price} →
          </a>
        </div>
      </div>
    </motion.header>
  );
}
