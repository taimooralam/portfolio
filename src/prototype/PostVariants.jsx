// PROTOTYPE BRANCH (prototype/posts-look): three designs each of his posts on the home page
// and on /posts, switchable via `?variant=A|B|C` and the floating bar. Assumption, stated:
// "these two things" = the home page's top-3 collage and the all-posts page (2026-10-15).
// A is what is on site/first-version today; B and C are new. Throwaway: the winner gets
// rewritten into src/site/Posts.jsx and this folder stays on this branch only.
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import * as c from '../site/content';
import { Gap } from '../site/parts';
import { PlatformIcon } from '../site/icons';
import PostsPage, { HomeCollage, Badge, FullText, PostDialog, Tile, Placeholder, useHoverPreview, dotOf } from '../site/Posts';
import PrototypeSwitcher, { showSwitcher } from './PrototypeSwitcher';

// ---------- the switch ----------
function readVariant(keys) {
  const v = new URLSearchParams(window.location.search).get('variant');
  return keys.includes(v) ? v : 'A';
}
function useVariant(variants) {
  const [current, setCurrent] = useState(() => readVariant(Object.keys(variants)));
  const change = (v) => {
    const url = new URL(window.location.href);
    url.searchParams.set('variant', v);
    window.history.replaceState(null, '', url);
    setCurrent(v);
  };
  return [current, change];
}

// ---------- home page: B, "Reader" ----------
// A numbered index of his posts on the left; the one under the pointer is read in full on
// the right. On a phone the index opens each post in place, like an accordion.
// 2026-10-15, his note on B: no "LinkedIn post" title, just the LinkedIn sign and the
// content, and smaller text. So the first line is shown as the post's own first line.
function ReaderText({ post, skipFirst = false }) {
  return (
    <>
      <div className="space-y-2.5 whitespace-pre-line text-[13px] leading-relaxed text-neutral-300">
        {!skipFirst && <p className="text-neutral-100">{post.title}</p>}
        <p>{post.lead}</p>
        {post.body.map((para) => <p key={para}>{para}</p>)}
      </div>
      <a href={post.href} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-amber-300 underline underline-offset-4">
        <PlatformIcon name={post.platform} className="h-3.5 w-3.5" /> Open on {post.platform} →
      </a>
    </>
  );
}

function HomeReader() {
  const [sel, setSel] = useState(0);
  const [openOnPhone, setOpenOnPhone] = useState(null);
  const still = useReducedMotion();
  const post = c.posts[sel];
  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <ol className="divide-y divide-neutral-800 overflow-hidden rounded-2xl border border-neutral-800">
        {c.posts.map((p, i) => (
          <li key={p.title}>
            <button
              type="button"
              onMouseEnter={() => setSel(i)}
              onFocus={() => setSel(i)}
              onClick={() => { setSel(i); setOpenOnPhone(openOnPhone === i ? null : i); }}
              aria-expanded={openOnPhone === i}
              aria-label={`${p.platform}: ${p.title}`}
              className={`flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors duration-300 ${sel === i ? 'lg:bg-neutral-900' : ''} hover:bg-neutral-900`}
            >
              <span className="pt-px text-[11px] font-semibold tabular-nums text-amber-300/80">{String(i + 1).padStart(2, '0')}</span>
              <PlatformIcon name={p.platform} className="mt-0.5 h-3.5 w-3.5 shrink-0" color={dotOf(p.platform)} />
              <span className={`line-clamp-2 min-w-0 text-[13px] leading-snug ${sel === i ? 'lg:text-white' : ''} text-neutral-300`}>{p.title}</span>
            </button>
            {openOnPhone === i && (
              <div className="thin-scroll max-h-96 overflow-y-auto px-4 pb-4 lg:hidden"><ReaderText post={p} skipFirst /></div>
            )}
          </li>
        ))}
        <li className="flex items-start gap-3 px-4 py-3.5 text-[13px]">
          <span className="pt-px text-[11px] font-semibold tabular-nums text-neutral-600">03</span>
          <PlatformIcon name="LinkedIn" className="mt-0.5 h-3.5 w-3.5 shrink-0" color="#525252" />
          <Gap>post 3 you pick</Gap>
        </li>
      </ol>
      <article className="thin-scroll hidden max-h-[22rem] overflow-y-auto rounded-2xl border border-amber-300/20 bg-neutral-900/50 p-5 lg:block">
        <AnimatePresence mode="wait">
          <motion.div key={post.title} initial={still ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={still ? undefined : { opacity: 0 }} transition={{ duration: 0.2 }}>
            <PlatformIcon name={post.platform} className="mb-3 h-4 w-4" color={dotOf(post.platform)} />
            <ReaderText post={post} />
          </motion.div>
        </AnimatePresence>
      </article>
    </div>
  );
}

// ---------- home page: C, "Pinboard" ----------
// A literal collage: cards pinned at slight angles, overlapping. Resting on one lifts it to
// the front, straightens it, and opens its whole text inside the card. On a phone they
// stack, still tilted; a tap opens the post.
const pins = [
  { pos: 'lg:left-0 lg:top-6 lg:w-[46%]', tilt: -3 },
  { pos: 'lg:left-[40%] lg:top-0 lg:w-[38%]', tilt: 2.5 },
  { pos: 'lg:right-0 lg:top-24 lg:w-[26%]', tilt: -1.5 },
];
function HomePinboard() {
  const [hover, setHover] = useState(null);
  const [open, setOpen] = useState(null);
  const canHover = useHoverPreview();
  const still = useReducedMotion();
  const items = [...c.posts.slice(0, 3), ...Array(Math.max(0, 3 - c.posts.length)).fill(null)];
  return (
    <div className="relative space-y-4 lg:h-[27rem] lg:space-y-0" onMouseLeave={() => setHover(null)}>
      {items.map((p, i) => {
        const up = hover === i;
        return (
          <motion.div
            key={p?.title ?? `slot-${i}`}
            className={`relative lg:absolute ${pins[i].pos}`}
            style={{ zIndex: up ? 30 : 10 + i }}
            initial={false}
            animate={{ rotate: still ? 0 : up ? 0 : pins[i].tilt, scale: up && !still ? 1.03 : 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onMouseEnter={() => canHover && p && setHover(i)}
          >
            {p ? (
              <button type="button" onClick={() => setOpen(p)} className={`block w-full rounded-2xl border bg-neutral-900 p-5 text-left shadow-2xl shadow-black/60 transition-colors duration-300 ${up ? 'border-amber-300/40' : 'border-neutral-800'}`}>
                {up ? (
                  <div className="thin-scroll max-h-[22rem] overflow-y-auto pr-1"><FullText post={p} /></div>
                ) : (
                  <>
                    <Badge platform={p.platform} kind={p.kind} />
                    <span className="mt-2.5 block text-[15px] font-semibold leading-snug text-white">{p.title}</span>
                    <span className="mt-1.5 block text-sm text-neutral-400">{p.lead}</span>
                  </>
                )}
              </button>
            ) : (
              <div className="rounded-2xl border border-dashed border-neutral-700 bg-neutral-950 p-5 shadow-2xl shadow-black/60">
                <Badge platform="LinkedIn" kind="Post" />
                <span className="mt-3 block"><Gap>post 3 you pick</Gap></span>
              </div>
            )}
          </motion.div>
        );
      })}
      <PostDialog post={open} onClose={() => setOpen(null)} />
    </div>
  );
}

export function HomePostsSwitch() {
  const variants = {
    A: { label: 'Bento', Component: HomeCollage },
    B: { label: 'Reader', Component: HomeReader },
    C: { label: 'Pinboard', Component: HomePinboard },
  };
  const [current, change] = useVariant(variants);
  const { Component } = variants[current];
  return (
    <>
      <Component key={current} />
      {showSwitcher && <PrototypeSwitcher variants={variants} current={current} onChange={change} />}
    </>
  );
}

// ---------- /posts: shared header for B and C ----------
function PageHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-5 sm:px-10">
        <a href="/" className="flex min-h-11 items-center gap-3">
          <img src="/brand/alam-small-on-dark.svg" alt="" width={40} height={20} className="h-5 w-auto" />
          <img src="/images/profile-640.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover object-[57%_20%] ring-2 ring-amber-300/60" />
          <span className="font-bold text-white">{c.name}</span>
        </a>
        <a href={c.consultingHref} className="ml-auto inline-flex min-h-11 items-center rounded-full bg-amber-300 px-4 text-sm font-semibold text-neutral-950 max-[379px]:hidden">{c.price} →</a>
      </div>
    </header>
  );
}

// ---------- /posts: B, "Shelves" ----------
// One shelf per platform, scrolling sideways, each tile in its platform's own shape.
const shelfShape = { tall: 'w-40 aspect-[9/14]', wide: 'w-72 aspect-video', square: 'w-52 aspect-square', short: 'w-60 min-h-[8rem]' };
function PageShelves() {
  const [open, setOpen] = useState(null);
  return (
    <div className="min-h-screen">
      <PageHeader />
      <main className="mx-auto max-w-5xl px-5 pb-32 pt-12 sm:px-10">
        <h1 className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300/80">What I write about</h1>
        <div className="mt-8 space-y-10">
          {c.platforms.map((pl) => {
            const real = c.posts.filter((p) => p.platform === pl.name);
            return (
              <section key={pl.name}>
                <h2 className="flex items-center gap-2.5 text-base font-semibold text-white">
                  <PlatformIcon name={pl.name} className="h-5 w-5" color={pl.dot} /> {pl.name}
                  <span className="text-xs font-normal text-neutral-500">{real.length} picked</span>
                </h2>
                <div className="thin-scroll -mx-5 mt-4 flex snap-x gap-3 overflow-x-auto px-5 pb-3 sm:-mx-10 sm:px-10">
                  {real.map((p) => <Tile key={p.title} post={p} onOpen={setOpen} className="w-72 shrink-0 snap-start" />)}
                  {pl.slots.map(([kind, shape], k) => (
                    <div key={k} className={`shrink-0 snap-start ${shelfShape[shape]}`}>
                      <Placeholder platform={pl.name} kind={kind} className="h-full" />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <PostDialog post={open} onClose={() => setOpen(null)} />
    </div>
  );
}

// ---------- /posts: C, "Feed" ----------
// One reading column, like a social feed, with every post open in full (long ones folded
// after a few lines). Platforms sit in a rail: down the left on a laptop, across the top
// on a phone.
function FeedPost({ post }) {
  const [more, setMore] = useState(false);
  return (
    <article className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
      <Badge platform={post.platform} kind={post.kind} />
      <h3 className="mt-2.5 text-base font-semibold leading-snug text-white">{post.title}</h3>
      <div className={`mt-2 space-y-3 whitespace-pre-line text-sm leading-relaxed text-neutral-300 ${more ? '' : 'line-clamp-6'}`}>
        <p>{post.lead}</p>
        {post.body.map((para) => <p key={para}>{para}</p>)}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5">
        <button type="button" onClick={() => setMore(!more)} className="inline-flex min-h-11 items-center text-sm font-semibold text-neutral-200">{more ? 'Show less' : 'Read the whole post'}</button>
        <a href={post.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-amber-300"><PlatformIcon name={post.platform} /> Open on {post.platform} →</a>
      </div>
    </article>
  );
}
function PageFeed() {
  const [only, setOnly] = useState('All');
  const names = ['All', ...c.platforms.map((p) => p.name)];
  const items = [
    ...c.posts.map((p) => ({ key: p.title, platform: p.platform, post: p })),
    ...c.platforms.flatMap((p) => p.slots.map(([kind], k) => ({ key: `${p.name}-${k}`, platform: p.name, kind }))),
  ].filter((t) => only === 'All' || t.platform === only);
  return (
    <div className="min-h-screen">
      <PageHeader />
      <div className="mx-auto max-w-5xl px-5 pb-32 sm:px-10 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-10">
        <nav aria-label="Platforms" className="sticky top-16 z-30 -mx-5 flex gap-1 overflow-x-auto border-b border-neutral-800 bg-neutral-950/95 px-5 py-2 backdrop-blur lg:top-24 lg:mx-0 lg:mt-12 lg:block lg:h-fit lg:space-y-1 lg:border-0 lg:bg-transparent lg:p-0">
          {names.map((n) => (
            <button key={n} type="button" aria-pressed={only === n} onClick={() => setOnly(n)}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl px-3 text-sm lg:flex lg:w-full ${only === n ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'}`}>
              {n === 'All' ? <span className="grid h-4 w-4 place-items-center text-[10px]">✦</span> : <PlatformIcon name={n} className="h-4 w-4" color={dotOf(n)} />}
              {n}
            </button>
          ))}
        </nav>
        <main className="pt-8 lg:pt-12">
          <h1 className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300/80">What I write about</h1>
          <div className="mt-6 max-w-xl space-y-3">
            {items.map((t) => t.post
              ? <FeedPost key={t.key} post={t.post} />
              : (
                <div key={t.key} className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-neutral-700 px-5 py-4">
                  <Badge platform={t.platform} kind={t.kind} />
                  <Gap>{t.kind.toLowerCase()} you pick</Gap>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export function PostsPageSwitch() {
  const variants = {
    A: { label: 'Masonry', Component: PostsPage },
    B: { label: 'Shelves', Component: PageShelves },
    C: { label: 'Feed', Component: PageFeed },
  };
  const [current, change] = useVariant(variants);
  const { Component } = variants[current];
  return (
    <>
      <Component key={current} />
      {showSwitcher && <PrototypeSwitcher variants={variants} current={current} onChange={change} />}
    </>
  );
}
