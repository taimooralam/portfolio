// The pinned bar. It sits outside the page flow (fixed), and the photo and name shrink
// with transforms only, so nothing below them moves (no layout shift); the page reserves
// room for the large state with an h-52 spacer. Over the first 180px of scrolling the
// photo goes from 128px to 40px and the name slides into the bar. Under reduced motion it
// switches between the two states in one step. The $500 button joins the bar once the
// one in the opening has scrolled away (`past`).
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import * as c from './content';

const SHRINK = 180;

export default function PinnedHeader({ past }) {
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
  // The name block is centred on the large photo; it slides left and up onto the bar's centre line.
  const nameX = useTransform(t, [0, 1], [0, -92]);
  const nameY = useTransform(t, [0, 1], [0, -72]);
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
            src="/images/profile-640.jpg" alt="Taimoor Alam" width={128} height={128} fetchpriority="high"
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
