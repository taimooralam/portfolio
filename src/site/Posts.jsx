// His posts as a collage of tiles. On a laptop, resting the pointer on a tile opens a
// preview beside it that scrolls through the whole post; on any device a click or tap opens
// the same text in a dialog. The home page shows his top three; /posts shows every platform,
// with placeholder tiles wherever he hasn't picked content yet (never invented posts).
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import * as c from './content';
import { Gap } from './parts';
import { PlatformIcon } from './icons';

const dotOf = (name) => c.platforms.find((p) => p.name === name)?.dot ?? '#a3a3a3';

function Badge({ platform, kind }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
      <PlatformIcon name={platform} className="h-3.5 w-3.5" color={dotOf(platform)} />
      {platform} {kind.toLowerCase()}
    </span>
  );
}

function FullText({ post }) {
  return (
    <>
      <Badge platform={post.platform} kind={post.kind} />
      <h3 className="mt-3 text-base font-semibold leading-snug text-white">{post.title}</h3>
      <div className="mt-3 space-y-3 whitespace-pre-line text-sm leading-relaxed text-neutral-300">
        <p>{post.lead}</p>
        {post.body.map((para) => <p key={para}>{para}</p>)}
      </div>
      <a href={post.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-amber-300 underline underline-offset-4">
        <PlatformIcon name={post.platform} className="h-4 w-4" /> Open on {post.platform} →
      </a>
    </>
  );
}

// The dialog that a click or tap opens. Esc, the close button and a click outside close it.
function PostDialog({ post, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (post && !d.open) d.showModal();
    if (!post && d.open) d.close();
  }, [post]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      className="w-[min(40rem,calc(100vw-2rem))] max-h-[85vh] overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-0 text-neutral-200 backdrop:bg-black/70"
    >
      {post && (
        <div className="thin-scroll max-h-[85vh] overflow-y-auto p-6 sm:p-7">
          <button type="button" onClick={onClose} aria-label="Close" className="float-right -mr-2 -mt-2 grid h-11 w-11 place-items-center rounded-full text-2xl text-neutral-400 hover:text-white">×</button>
          <FullText post={post} />
        </div>
      )}
    </dialog>
  );
}

function Tile({ post, className = '', onOpen, onHover }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(post)}
      onMouseEnter={() => onHover?.(post)}
      className={`group flex flex-col rounded-2xl border border-transparent bg-neutral-900 p-5 text-left transition duration-300 ease-out hover:-translate-y-0.5 hover:border-amber-300/30 hover:bg-neutral-800/80 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${className}`}
    >
      <Badge platform={post.platform} kind={post.kind} />
      <span className="mt-2.5 block text-[15px] font-semibold leading-snug text-white">{post.title}</span>
      <span className="mt-1.5 block text-sm text-neutral-400">{post.lead}</span>
      <span className="mt-auto block pt-3 text-xs font-semibold text-amber-300 transition-transform duration-300 group-hover:translate-x-0.5">Read the whole post →</span>
    </button>
  );
}

function Placeholder({ platform, kind, shape = 'short', className = '' }) {
  // Compact on phones; from tablet width up each tile takes its platform's shape.
  const box = { tall: 'min-h-[7rem] sm:aspect-[9/14]', wide: 'min-h-[7rem] sm:aspect-video', square: 'min-h-[7rem] sm:aspect-square', short: 'min-h-[7rem]' }[shape];
  return (
    <div className={`flex flex-col rounded-2xl border border-dashed border-neutral-700 p-5 ${box} ${className}`}>
      <Badge platform={platform} kind={kind} />
      <span className="mt-3"><Gap>{kind.toLowerCase()} you pick</Gap></span>
    </div>
  );
}

// Hover preview: only where a real pointer can hover and the collage has two columns.
function useHoverPreview() {
  const [can, setCan] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
    const sync = () => setCan(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return can;
}

// The home page's collage: his top three, the first one large. Resting on a tile opens the
// whole post in the other column, where it scrolls.
export function HomeCollage() {
  const [open, setOpen] = useState(null);
  const [hover, setHover] = useState(null);
  const canHover = useHoverPreview();
  const still = useReducedMotion();
  const timer = useRef(null);
  const onHover = (post) => {
    if (!canHover) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setHover(post), 180);
  };
  const leave = () => { clearTimeout(timer.current); setHover(null); };
  const top = c.posts.slice(0, 3);
  const leftHovered = hover && hover === top[0];

  return (
    <div className="relative" onMouseLeave={leave}>
      <div className="grid gap-3 lg:grid-cols-2 lg:grid-rows-[auto_auto]">
        {top[0] && <Tile post={top[0]} onOpen={setOpen} onHover={onHover} className="lg:row-span-2 lg:min-h-[15rem]" />}
        {top[1] && <Tile post={top[1]} onOpen={setOpen} onHover={onHover} />}
        {top.length < 3 && <Placeholder platform="LinkedIn" kind="Post" shape="short" />}
      </div>
      <AnimatePresence>
        {hover && (
          <motion.aside
            key={hover.title}
            aria-label="Preview"
            initial={still ? false : { opacity: 0, x: leftHovered ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={still ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className={`thin-scroll absolute inset-y-0 z-20 w-[calc(50%-0.375rem)] overflow-y-auto rounded-2xl border border-amber-300/30 bg-neutral-950/95 p-5 shadow-2xl backdrop-blur ${leftHovered ? 'right-0' : 'left-0'}`}
          >
            <FullText post={hover} />
          </motion.aside>
        )}
      </AnimatePresence>
      <PostDialog post={open} onClose={() => setOpen(null)} />
    </div>
  );
}

// /posts: every platform, filterable. His real posts first, then placeholder tiles.
export default function PostsPage() {
  const [open, setOpen] = useState(null);
  const [only, setOnly] = useState('All');
  useEffect(() => { document.title = 'Posts · Taimoor Alam'; }, []);
  const tiles = [
    ...c.posts.map((post) => ({ key: post.title, platform: post.platform, post })),
    ...c.platforms.flatMap((p) => p.slots.map(([kind, shape], k) => ({ key: `${p.name}-${k}`, platform: p.name, kind, shape }))),
  ].filter((t) => only === 'All' || t.platform === only);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-5 sm:px-10">
          <a href="/" className="flex min-h-11 items-center gap-3">
            <img src="/brand/alam-small-on-dark.svg" alt="" width={40} height={20} className="h-5 w-auto" />
            <img src="/images/profile-640.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover object-[57%_20%] ring-2 ring-amber-300/60" />
            <span className="font-bold text-white">{c.name}</span>
          </a>
          <a href={c.consultingHref} className="ml-auto inline-flex min-h-11 items-center rounded-full bg-amber-300 px-4 text-sm font-semibold text-neutral-950 max-[379px]:hidden">
            {c.price} →
          </a>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 pb-32 pt-12 sm:px-10">
        <h1 className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300/80">What I write about</h1>
        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Show posts from">
          {['All', ...c.platforms.map((p) => p.name)].map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={only === name}
              onClick={() => setOnly(name)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm ${only === name ? 'border-amber-300 bg-amber-300 text-neutral-950' : 'border-neutral-700 text-neutral-300 hover:border-neutral-500'}`}
            >
              {name !== 'All' && <PlatformIcon name={name} className="h-4 w-4" color={only === name ? undefined : dotOf(name)} />}
              {name}
            </button>
          ))}
        </div>
        <div className="mt-8 gap-3 sm:columns-2 lg:columns-3">
          {tiles.map((t) => (
            <div key={t.key} className="mb-3 break-inside-avoid">
              {t.post
                ? <Tile post={t.post} onOpen={setOpen} className="w-full" />
                : <Placeholder platform={t.platform} kind={t.kind} shape={t.shape} />}
            </div>
          ))}
        </div>
      </main>
      <PostDialog post={open} onClose={() => setOpen(null)} />
    </div>
  );
}
