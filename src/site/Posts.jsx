// His posts as a collage of tiles. On a laptop, resting the pointer on a tile opens a
// preview beside it that scrolls through the whole post; on any device a click or tap opens
// the same text in a dialog. The home page shows his top three; /posts shows every platform,
// with placeholder tiles wherever he hasn't picked content yet (never invented posts).
import { useEffect, useRef, useState } from 'react';
import * as c from './content';
import { Gap } from './parts';

const dotOf = (name) => c.platforms.find((p) => p.name === name)?.dot ?? '#a3a3a3';

function Badge({ platform, kind }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
      <span className="h-2 w-2 rounded-full" style={{ background: dotOf(platform) }} aria-hidden="true" />
      {platform} {kind.toLowerCase()}
    </span>
  );
}

function FullText({ post }) {
  return (
    <>
      <Badge platform={post.platform} kind={post.kind} />
      <h3 className="mt-3 text-xl font-semibold leading-snug text-white">{post.title}</h3>
      <div className="mt-3 space-y-3 whitespace-pre-line leading-relaxed text-neutral-300">
        <p>{post.lead}</p>
        {post.body.map((para) => <p key={para}>{para}</p>)}
      </div>
      <a href={post.href} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-amber-300 underline underline-offset-4">
        Open on {post.platform} →
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
        <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
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
      className={`group flex flex-col rounded-3xl bg-neutral-900 p-6 text-left transition-colors hover:bg-neutral-800 ${className}`}
    >
      <Badge platform={post.platform} kind={post.kind} />
      <span className="mt-3 block text-lg font-semibold leading-snug text-white">{post.title}</span>
      <span className="mt-2 block text-neutral-300">{post.lead}</span>
      <span className="mt-auto block pt-4 text-sm font-semibold text-amber-300">Read the whole post →</span>
    </button>
  );
}

function Placeholder({ platform, kind, shape = 'short', className = '' }) {
  const box = { tall: 'aspect-[9/14]', wide: 'aspect-video', square: 'aspect-square', short: 'min-h-[9rem]' }[shape];
  return (
    <div className={`flex flex-col rounded-3xl border border-dashed border-neutral-700 p-6 ${box} ${className}`}>
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
      <div className="grid gap-4 lg:grid-cols-2 lg:grid-rows-[auto_auto]">
        {top[0] && <Tile post={top[0]} onOpen={setOpen} onHover={onHover} className="lg:row-span-2 lg:min-h-[22rem]" />}
        {top[1] && <Tile post={top[1]} onOpen={setOpen} onHover={onHover} />}
        {top.length < 3 && <Placeholder platform="LinkedIn" kind="Post" shape="short" />}
      </div>
      {hover && (
        <aside
          aria-label="Preview"
          className={`absolute inset-y-0 z-20 w-[calc(50%-0.5rem)] overflow-y-auto rounded-3xl border border-amber-300/30 bg-neutral-950/95 p-6 shadow-2xl backdrop-blur ${leftHovered ? 'right-0' : 'left-0'}`}
        >
          <FullText post={hover} />
        </aside>
      )}
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
              {name !== 'All' && <span className="h-2 w-2 rounded-full" style={{ background: dotOf(name) }} aria-hidden="true" />}
              {name}
            </button>
          ))}
        </div>
        <div className="mt-8 gap-4 sm:columns-2 lg:columns-3">
          {tiles.map((t) => (
            <div key={t.key} className="mb-4 break-inside-avoid">
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
