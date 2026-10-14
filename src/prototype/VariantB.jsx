// PROTOTYPE — Variant B, "Cinematic": dark, the whiteboard photo fills the first screen
// with the words laid over it; on wide screens the photo stays put on the left while the
// page scrolls beside it. Statements light up as they reach the middle of the screen,
// the logos drift past in a strip, the stories swipe sideways, and the $500 button
// follows you down the page once the first screen is gone.
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import * as c from './content';
import { Opening, Gap, WhiteboardStandIn, Wordmark, Reveal, MovingLine } from './shared';

export const label = 'Cinematic';

// A statement that brightens as it passes the middle of the screen.
function LitLine({ lead, rest }) {
  const ref = useRef(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'start 45%'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  return (
    <motion.li ref={ref} style={still ? undefined : { opacity }} className="py-6">
      <p className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">{lead}</p>
      <p className="mt-2 text-base leading-relaxed text-neutral-300">{rest}</p>
    </motion.li>
  );
}

function LogoStrip() {
  const still = useReducedMotion();
  const row = c.logos.map((l) => (
    <Wordmark key={l.name} {...l} className="h-12 w-44 shrink-0 text-neutral-400" />
  ));
  if (still) return <div className="flex flex-wrap justify-center gap-6">{row}</div>;
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <motion.div
        className="flex w-max gap-10"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {row}
        {c.logos.map((l) => <Wordmark key={l.name + '2'} {...l} className="h-12 w-44 shrink-0 text-neutral-400" />)}
      </motion.div>
    </div>
  );
}

export default function VariantB() {
  const [past, setPast] = useState(false);
  const heroRef = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting), { threshold: 0 });
    io.observe(heroRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* Photo: the whole first screen on a phone, a fixed panel on wide screens. */}
      <div className="relative h-[100svh] lg:sticky lg:top-0">
        <WhiteboardStandIn tone="dark" className="absolute inset-x-0 top-0 h-[55%] lg:h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 from-40% via-neutral-950/60 via-60% to-transparent lg:from-0% lg:via-transparent" />
        <div ref={heroRef} className="absolute inset-x-0 bottom-0 px-5 pb-10 sm:px-10 lg:hidden">
          <Hero />
        </div>
      </div>

      <div className="px-5 sm:px-10 lg:py-16">
        <div className="hidden lg:block"><Hero /></div>

        <div className="mt-16 lg:mt-24">
          <MovingLine
            stem={c.movingStem}
            endings={c.movingEndings}
            stemClass="text-sm font-medium uppercase tracking-[0.2em] text-amber-300/80"
            listClass="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white"
            buttonClass="border-neutral-700 text-neutral-400"
          />
        </div>

        <Reveal as="section" className="mt-24">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300/80">{c.problems.heading}</h2>
          <p className="mt-4 text-xl leading-relaxed text-neutral-300">{c.problems.lead}</p>
          <ul className="mt-6 space-y-3">
            {c.problems.questions.map((q) => (
              <li key={q} className="rounded-2xl bg-neutral-900 px-5 py-4 text-lg text-white">{q}</li>
            ))}
          </ul>
        </Reveal>

        <section className="mt-24">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300/80">{c.bring.heading}</h2>
          <ul className="mt-2 divide-y divide-neutral-800">
            {c.bring.items.map(([lead, rest]) => <LitLine key={lead} lead={lead} rest={rest} />)}
          </ul>
        </section>

        <section className="mt-24">
          <h2 className="mb-8 text-center text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            <Gap>logo heading: they hired me, and I worked for them</Gap>
          </h2>
          <LogoStrip />
        </section>

        <section className="mt-24">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300/80"><Gap>heading for the four stories</Gap></h2>
          <div className="-mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-10 sm:px-10">
            {c.stories.map((s, k) => (
              <article key={s} className="w-[80%] shrink-0 snap-start rounded-3xl bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 sm:w-80">
                <p className="text-5xl font-bold text-neutral-700">{k + 1}</p>
                <h3 className="mt-6 text-xl font-semibold text-white">{s}</h3>
                <p className="mt-3 text-neutral-400"><Gap>the story, in your words</Gap></p>
              </article>
            ))}
          </div>
          <p className="mt-2 text-xs text-neutral-500">Swipe →</p>
        </section>

        <Reveal as="section" className="mt-24">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300/80">What I write about</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {c.writeTopics.map((t) => (
              <span key={t} className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300">{t}</span>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            {[1, 2, 3].map((n) => <Gap key={n} className="block">post {n} you pick</Gap>)}
          </div>
          <a href={c.linkedin} className="mt-6 inline-block text-sm font-semibold text-amber-300 underline underline-offset-4">Follow on LinkedIn</a>
        </Reveal>

        <Reveal as="section" className="mt-24 rounded-3xl border border-amber-300/30 bg-gradient-to-b from-amber-300/10 to-transparent p-8 text-center">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300/80">Paid consulting</h2>
          <p className="mt-4 text-6xl font-bold tracking-tight text-white">$500<span className="text-2xl text-neutral-400">/hour</span></p>
          <p className="mt-4 text-neutral-400"><Gap>a line on what the hour is for</Gap></p>
          <a href={c.consultingHref} className="mt-8 inline-flex rounded-full bg-amber-300 px-8 py-4 font-semibold text-neutral-950">{c.price} →</a>
          <p className="mt-6 text-sm text-neutral-400">My company: <a href={c.goldenRiver} className="text-white underline underline-offset-4">Golden River</a></p>
        </Reveal>

        <footer className="mt-24 border-t border-neutral-800 py-10 pb-32 text-sm text-neutral-500">
          <p>{c.education}</p>
          <p className="mt-2"><a href={`mailto:${c.email}`} className="text-neutral-200 underline underline-offset-4">{c.email}</a></p>
          <p className="mt-6"><Gap>footer</Gap></p>
        </footer>
      </div>

      {/* The same one button, following you once the first screen has scrolled away. */}
      <a
        href={c.consultingHref}
        className={`fixed right-4 top-4 z-40 rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-neutral-950 shadow-lg transition-all duration-500 ${past ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'}`}
      >
        {c.price} →
      </a>
    </div>
  );
}

function Hero() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <img src="/images/prototype-profile-640.jpg" alt="Taimoor Alam" className="h-14 w-14 rounded-full object-cover object-[57%_20%] ring-2 ring-amber-300/60" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">{c.name}</h1>
          <p className="text-[13px] text-neutral-300">{c.titleLine}</p>
        </div>
      </div>
      <p className="mt-6 text-lg leading-relaxed text-neutral-100">
        <Opening linkClass="text-amber-300 underline underline-offset-4" />
      </p>
      <a href={c.consultingHref} className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-300 px-7 py-4 font-semibold text-neutral-950">
        {c.price} → <Gap className="!opacity-70">button label</Gap>
      </a>
    </div>
  );
}
