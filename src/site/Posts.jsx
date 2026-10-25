// His posts. The home page shows them as a reader: a numbered list beside the whole post,
// the one under the pointer shown in full (on a phone, tapping one opens it in place).
// /posts is one reading column with a platform rail, placeholders wherever he hasn't picked
// content yet (never invented posts). His choices, 2026-10-15: home "Reader", /posts "Feed";
// no title line, just the platform's sign and the post itself, in smaller text.
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import * as c from './content';
import { Gap } from './parts';
import { PlatformIcon } from './icons';

const dotOf = (name) => c.platforms.find((p) => p.name === name)?.dot ?? '#a3a3a3';

// The post as he wrote it: its first line, then the rest. `skipFirst` when the first line is
// already showing just above it.
function PostText({ post, skipFirst = false }) {
  return (
    <div className="space-y-2.5 whitespace-pre-line text-[13px] leading-relaxed text-neutral-300">
      {!skipFirst && <p className="text-neutral-100">{post.title}</p>}
      <p>{post.lead}</p>
      {post.body.map((para) => <p key={para}>{para}</p>)}
    </div>
  );
}

// No link until he gives the post's own URL; never a stand-in link.
function OpenOn({ post }) {
  if (!post.href) return null;
  return (
    <a href={post.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-amber-300 underline underline-offset-4">
      <PlatformIcon name={post.platform} className="h-3.5 w-3.5" /> Open on {post.platform} →
    </a>
  );
}

// Home: his top three.
export function HomePosts() {
  const [sel, setSel] = useState(0);
  const [openOnPhone, setOpenOnPhone] = useState(null);
  const still = useReducedMotion();
  const top = c.posts.slice(0, 3);
  const post = top[sel];
  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <ol className="divide-y divide-neutral-800 overflow-hidden rounded-2xl border border-neutral-800">
        {top.map((p, i) => (
          <li key={p.title}>
            <button
              type="button"
              onMouseEnter={() => setSel(i)}
              onFocus={() => setSel(i)}
              onClick={() => { setSel(i); setOpenOnPhone(openOnPhone === i ? null : i); }}
              aria-expanded={openOnPhone === i}
              aria-label={`${p.platform}: ${p.title}`}
              className={`flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors duration-300 hover:bg-neutral-900 ${sel === i ? 'lg:bg-neutral-900' : ''}`}
            >
              <span className="pt-px text-[11px] font-semibold tabular-nums text-amber-300/80">{String(i + 1).padStart(2, '0')}</span>
              <PlatformIcon name={p.platform} className="mt-0.5 h-3.5 w-3.5 shrink-0" color={dotOf(p.platform)} />
              <span className={`line-clamp-2 min-w-0 text-[13px] leading-snug text-neutral-300 ${sel === i ? 'lg:text-white' : ''}`}>{p.title}</span>
            </button>
            {openOnPhone === i && (
              <div className="thin-scroll max-h-96 overflow-y-auto px-4 pb-2 lg:hidden">
                <PostText post={p} skipFirst />
                <OpenOn post={p} />
              </div>
            )}
          </li>
        ))}
        {top.length < 3 && (
          <li className="flex items-start gap-3 px-4 py-3.5 text-[13px]">
            <span className="pt-px text-[11px] font-semibold tabular-nums text-neutral-600">{String(top.length + 1).padStart(2, '0')}</span>
            <PlatformIcon name="LinkedIn" className="mt-0.5 h-3.5 w-3.5 shrink-0" color="#525252" />
            <Gap>post {top.length + 1} you pick</Gap>
          </li>
        )}
      </ol>
      <article aria-label="Post" className="thin-scroll hidden max-h-[22rem] overflow-y-auto rounded-2xl border border-amber-300/20 bg-neutral-900/50 p-5 lg:block">
        <AnimatePresence mode="wait">
          <motion.div key={post.title} initial={still ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={still ? undefined : { opacity: 0 }} transition={{ duration: 0.2 }}>
            <PlatformIcon name={post.platform} className="mb-3 h-4 w-4" color={dotOf(post.platform)} />
            <PostText post={post} />
            <div className="mt-1"><OpenOn post={post} /></div>
          </motion.div>
        </AnimatePresence>
      </article>
    </div>
  );
}

// /posts: one post in the feed, long ones folded after a few lines.
function FeedPost({ post }) {
  const [more, setMore] = useState(false);
  return (
    <article className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
      <PlatformIcon name={post.platform} className="mb-3 h-4 w-4" color={dotOf(post.platform)} />
      <div className={more ? '' : 'line-clamp-6'}><PostText post={post} /></div>
      <div className="mt-1 flex flex-wrap gap-x-5">
        <button type="button" onClick={() => setMore(!more)} aria-expanded={more} className="inline-flex min-h-11 items-center text-xs font-semibold text-neutral-200">
          {more ? 'Show less' : 'Read the whole post'}
        </button>
        <OpenOn post={post} />
      </div>
    </article>
  );
}

export default function PostsPage() {
  const [only, setOnly] = useState('All');
  useEffect(() => { document.title = 'Posts · Taimoor Alam'; }, []);
  const names = ['All', ...c.platforms.map((p) => p.name)];
  const items = [
    ...c.posts.map((p) => ({ key: p.title, platform: p.platform, post: p })),
    ...c.platforms.flatMap((p) => p.slots.map(([kind], k) => ({ key: `${p.name}-${k}`, platform: p.name, kind }))),
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
      <div className="mx-auto max-w-5xl px-5 pb-32 sm:px-10 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-10">
        <nav aria-label="Platforms" className="thin-scroll sticky top-16 z-30 -mx-5 flex gap-1 overflow-x-auto border-b border-neutral-800 bg-neutral-950/95 px-5 py-2 backdrop-blur lg:top-24 lg:mx-0 lg:mt-12 lg:block lg:h-fit lg:space-y-1 lg:border-0 lg:bg-transparent lg:p-0">
          {names.map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={only === n}
              onClick={() => setOnly(n)}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl px-3 text-[13px] lg:flex lg:w-full ${only === n ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'}`}
            >
              {n === 'All' ? <span className="grid h-4 w-4 place-items-center text-[10px]">✦</span> : <PlatformIcon name={n} className="h-4 w-4" color={dotOf(n)} />}
              {n}
            </button>
          ))}
        </nav>
        <main className="pt-8 lg:pt-12">
          <h1 className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300/80">What I write about</h1>
          <div className="mt-6 max-w-xl space-y-3">
            {items.map((t) => (t.post
              ? <FeedPost key={t.key} post={t.post} />
              : (
                <div key={t.key} className="flex items-center gap-3 rounded-2xl border border-dashed border-neutral-700 px-5 py-4 text-[13px]">
                  <PlatformIcon name={t.platform} className="h-4 w-4 shrink-0" color={dotOf(t.platform)} />
                  <Gap>{t.platform} {t.kind.toLowerCase()} you pick</Gap>
                </div>
              )))}
          </div>
        </main>
      </div>
    </div>
  );
}
