// PROTOTYPE — the floating bar that flips between variants. Not part of any design.
// Hidden on the live domain, so a stray merge can't ship it; shown everywhere else,
// including Vercel preview links (which are production builds).
import { useEffect } from 'react';

export const showSwitcher = !import.meta.env.PROD || !/(^|\.)taimooralam\.com$/.test(window.location.hostname);

export default function PrototypeSwitcher({ variants, current, onChange }) {
  const keys = Object.keys(variants);
  const at = keys.indexOf(current);
  const go = (step) => onChange(keys[(at + step + keys.length) % keys.length]);

  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      if (t.closest?.('input, textarea, [contenteditable]')) return;
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-fuchsia-600 p-1 font-sans text-white shadow-2xl ring-2 ring-white">
      <button type="button" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full text-xl hover:bg-white/20" aria-label="Previous design">←</button>
      <span className="min-w-[9.5rem] px-2 text-center text-sm font-semibold">{current} · {variants[current].label}</span>
      <button type="button" onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full text-xl hover:bg-white/20" aria-label="Next design">→</button>
    </div>
  );
}
