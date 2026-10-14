// taimooralam.com: one page, in the look he picked (portfolio#1, design B). This is the
// first version (#5): the head, the pinned header and the opening with the $500 button.
// The other sections arrive with their own tickets (#6–#10).
import { useEffect, useRef, useState } from 'react';
import * as c from './site/content';
import PinnedHeader from './site/PinnedHeader';

const focusRing = [
  '[&_a:focus-visible]:outline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-amber-300',
  '[&_button:focus-visible]:outline [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-amber-300',
  '[&_[tabindex]:focus-visible]:outline [&_[tabindex]:focus-visible]:outline-2 [&_[tabindex]:focus-visible]:outline-offset-4 [&_[tabindex]:focus-visible]:outline-amber-300',
].join(' ');

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
      <main className="mx-auto max-w-4xl px-5 pb-32 sm:px-10">
        {/* Room for the header's large state, so its shrinking never moves the page. */}
        <div className="h-52" aria-hidden="true" />
        <p className="max-w-[65ch] text-lg leading-relaxed text-neutral-100 lg:text-xl">
          {c.opening.before}
          <a href={c.goldenRiver} className="text-amber-300 underline underline-offset-4">{c.opening.link}</a>
          {c.opening.after}
        </p>
        <a ref={ctaRef} href={c.consultingHref} className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-amber-300 px-7 py-4 font-semibold text-neutral-950">
          {c.price} · {c.bookLabel} →
        </a>
      </main>
    </div>
  );
}
