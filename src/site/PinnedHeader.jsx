// The pinned bar. It sits outside the page flow (fixed), and the photo and name shrink
// with transforms only, so nothing below them moves (no layout shift); the page reserves
// room for the large state with an h-52 spacer. Over the first 180px of scrolling the
// photo goes from 128px to 40px and the name slides into the bar. Under reduced motion it
// switches between the two states in one step. The $500 button joins the bar once the
// one in the opening has scrolled away (`past`).
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
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

  // His عالم mark leads the bar on the left (the one-tile dark version: his rule for small
  // sizes). In the large state it sits above the photo; in the bar the photo and name move
  // right to make room for it. Under 380px, once the $500 button has joined the bar, there is
  // room for only one of mark and button beside the name, so the mark steps aside.
  const logoRef = useRef(null);
  const [narrow, setNarrow] = useState(false);
  const [logoW, setLogoW] = useState(40);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 379px)');
    const sync = () => { setNarrow(mq.matches); if (logoRef.current) setLogoW(logoRef.current.getBoundingClientRect().width || 40); };
    sync();
    mq.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    return () => { mq.removeEventListener('change', sync); window.removeEventListener('resize', sync); };
  }, []);
  const logoShown = !(past && narrow);
  const room = useSpring(logoShown ? logoW + 12 : 0, { stiffness: 300, damping: 32 });
  useEffect(() => { const v = logoShown ? logoW + 12 : 0; if (still) room.jump(v); else room.set(v); }, [logoShown, logoW, room, still]);

  // Large: photo 128px at 48px from the top, clear of the mark. Small: 40px, centred in the 64px bar.
  const photoY = useTransform(t, [0, 1], [48, 12]);
  const photoX = useTransform([t, room], ([tt, r]) => tt * r);
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
  const nameX = useTransform([t, room], ([tt, r]) => tt * (r - 92));
  const nameY = useTransform(t, [0, 1], [0, -80]);
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
            style={{ x: photoX, y: photoY, scale: photoScale, originX: 0, originY: 0 }}
            className="pointer-events-none absolute left-0 top-0 h-32 w-32 rounded-full object-cover object-[57%_20%] ring-2 ring-amber-300/60"
          />
          <motion.div
            style={{ x: nameX, y: nameY, scale: nameScale, originX: 0 }}
            className="pointer-events-none absolute left-36 right-0 top-12 flex h-32 flex-col justify-center"
          >
            {/* The title line hangs below the name, so the name alone is centred and lands on the bar's centre line. */}
            <div className="relative">
              <h1 ref={nameRef} className="whitespace-nowrap text-[clamp(20px,calc((100vw_-_184px)/6.6),30px)] font-bold leading-tight tracking-tight text-white">{c.name}</h1>
              <motion.p style={{ opacity: subOpacity }} className="absolute inset-x-0 top-full text-[13px] text-neutral-300">{c.titleLine}</motion.p>
            </div>
          </motion.div>
          <img
            ref={logoRef} src="/brand/alam-small-on-dark.svg" alt="" width={40} height={20}
            className={`absolute left-0 top-1/2 h-5 w-auto -translate-y-1/2 transition-opacity duration-300 lg:h-7 ${logoShown ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          />
          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center">
            <a
              href={c.consultingHref}
              className={`inline-flex min-h-11 items-center rounded-full bg-amber-300 px-4 text-sm font-semibold text-neutral-950 max-[359px]:px-3 ${past ? '' : 'hidden'}`}
            >
              {c.price} →
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
