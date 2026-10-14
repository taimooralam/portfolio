// Small pieces of the page: the placeholder for words still his to write, the fade-in,
// and the moving line (goldenriver.ai's mechanism).
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Words that are his to write, shown as a visible gap so nothing invented can stick.
// Every Gap must be filled with his words before the site goes live (#11).
export function Gap({ children, className = '' }) {
  return (
    <span className={`inline-block rounded border border-dashed border-current px-2 py-0.5 text-[0.8em] opacity-60 ${className}`}>
      [{children}]
    </span>
  );
}
// Fades a block in once as it scrolls into view. Under reduced motion it is simply there.
export function Reveal({ children, className = '', y = 24, delay = 0, as = 'div' }) {
  const still = useReducedMotion();
  const M = motion[as];
  if (still) return <M className={className}>{children}</M>;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </M>
  );
}

// The moving line: goldenriver.ai's mechanism. The endings sit on a drum that turns up one
// line at a time, like a phone's date picker. All endings stay in the DOM; under reduced
// motion they are simply listed. Runs once, rests on the last, starts again when the line
// comes back on screen. Pauses off screen, in a hidden tab, and when the visitor presses pause.
export function MovingLine({ stem, endings, stemClass = '', endClass = '', listClass = '', buttonClass = '', tilt = 24 }) {
  const still = useReducedMotion();
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  const [rested, setRested] = useState(false);
  const [inView, setInView] = useState(false);
  const [offsets, setOffsets] = useState([]);
  const listRef = useRef(null);

  // Measure each ending so endings of different lengths stack edge to edge on the drum.
  useEffect(() => {
    if (still || !listRef.current) return;
    const measure = () => {
      const items = [...listRef.current.children];
      const gap = parseFloat(getComputedStyle(listRef.current).fontSize) * 0.45;
      let y = 0;
      setOffsets(items.map((el) => { const top = y; y += el.offsetHeight + gap; return top; }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(listRef.current);
    return () => ro.disconnect();
  }, [still]);

  useEffect(() => {
    if (still || !listRef.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) { setInView(false); return; }
      if (e.intersectionRatio >= 0.6) setInView(true);
    }, { threshold: [0, 0.6] });
    io.observe(listRef.current);
    return () => io.disconnect();
  }, [still]);

  // Coming back on screen after resting starts the turn again from the first ending.
  useEffect(() => {
    if (!inView && rested) { setRested(false); setI(0); }
  }, [inView, rested]);

  useEffect(() => {
    if (still || held || rested || !inView) return;
    const hidden = () => document.hidden;
    if (hidden()) return;
    const t = setTimeout(() => {
      if (i >= endings.length - 1) setRested(true);
      else setI(i + 1);
    }, (i === 0 ? 1600 : 900) + endings[i].length * 36);
    return () => clearTimeout(t);
  }, [i, held, rested, inView, still, endings]);

  if (still) {
    return (
      <div>
        <p className={stemClass}>{stem}</p>
        <ul className={listClass}>
          {endings.map((e) => <li key={e} className={endClass}>{e}</li>)}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <p className={stemClass}>{stem}</p>
      <ol ref={listRef} className={`grid items-start overflow-hidden [perspective:700px] ${listClass}`} aria-live="off">
        {endings.map((e, k) => {
          const d = k - i;
          const y = offsets.length ? offsets[k] - offsets[i] : 0;
          return (
            <li
              key={e}
              className={`[grid-area:1/1] origin-center [backface-visibility:hidden] transition-[transform,opacity] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${endClass}`}
              style={{ transform: `translateY(${y.toFixed(1)}px) rotateX(${-d * tilt}deg)`, opacity: d === 0 ? 1 : 0 }}
            >
              {e}
            </li>
          );
        })}
      </ol>
      <button
        type="button"
        onClick={() => setHeld(!held)}
        aria-label={held ? 'Play the moving line' : 'Pause the moving line'}
        className={`mt-3 grid h-11 w-11 place-items-center rounded-full border transition-opacity ${rested ? 'invisible' : ''} ${buttonClass}`}
      >
        {held
          ? <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 fill-current" aria-hidden="true"><path d="M3 1.5v11l9.5-5.5z" /></svg>
          : <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 fill-current" aria-hidden="true"><rect x="2" y="1" width="3.5" height="12" rx="1" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" /></svg>}
      </button>
    </div>
  );
}
