// PROTOTYPE — Variant A, "Editorial": a long-form column on warm paper, serif type,
// the whiteboard photo leading like a magazine cover, sections numbered like chapters.
import * as c from './content';
import { Opening, Gap, WhiteboardStandIn, Wordmark, Reveal, MovingLine } from './shared';

export const label = 'Editorial';

function Chapter({ n, title, children }) {
  return (
    <Reveal as="section" className="border-t border-stone-300 py-14">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">{n}</p>
      <h2 className="mt-2 font-serif text-3xl leading-tight text-stone-900 sm:text-4xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </Reveal>
  );
}

export default function VariantA() {
  return (
    <div className="min-h-screen bg-[#f7f3ea] font-serif text-stone-800">
      <header className="mx-auto max-w-2xl px-4 pt-4 sm:pt-10">
        <WhiteboardStandIn className="aspect-[4/3] w-full rounded-sm sm:aspect-[16/9]" />
        <div className="relative z-10 -mt-10 flex items-end gap-4 px-2 sm:px-6">
          <img
            src="/images/prototype-profile-640.jpg" alt="Taimoor Alam"
            className="h-20 w-20 shrink-0 rounded-full border-4 border-[#f7f3ea] object-cover object-[57%_20%] shadow-md"
          />
          <div className="pb-1 pt-12">
            <h1 className="text-2xl font-semibold leading-none text-stone-900 sm:text-3xl">{c.name}</h1>
            <p className="mt-1 font-sans text-[13px] tracking-wide text-stone-600">{c.titleLine}</p>
          </div>
        </div>

        <p className="mt-10 text-[1.35rem] leading-relaxed text-stone-900 sm:text-2xl">
          <Opening linkClass="text-amber-800 underline decoration-amber-600/50 underline-offset-4" />
        </p>

        <div className="mt-10 border-l-2 border-amber-600 pl-5">
          <MovingLine
            stem={c.movingStem}
            endings={c.movingEndings}
            stemClass="font-sans text-sm uppercase tracking-[0.2em] text-stone-500"
            listClass="mt-2 text-2xl italic leading-snug text-stone-900 sm:text-3xl"
            buttonClass="border-stone-300 text-stone-500"
          />
        </div>

        <a href={c.consultingHref} className="mt-10 inline-flex items-center gap-3 rounded-full bg-stone-900 px-7 py-4 font-sans text-base font-semibold text-[#f7f3ea]">
          {c.price} · {c.bookLabel} <span aria-hidden="true">→</span>
        </a>
      </header>

      <main className="mx-auto mt-16 max-w-2xl px-4">
        <Chapter n="01" title={c.problems.heading}>
          <p className="text-xl leading-relaxed">{c.problems.lead}</p>
          <ol className="mt-8 space-y-6">
            {c.problems.questions.map((q) => (
              <li key={q} className="text-2xl italic leading-snug text-stone-900">“{q}”</li>
            ))}
          </ol>
        </Chapter>

        <Chapter n="02" title={c.bring.heading}>
          <dl className="space-y-7">
            {c.bring.items.map(([lead, rest]) => (
              <div key={lead}>
                <dt className="text-lg font-semibold text-stone-900">{lead}</dt>
                <dd className="mt-1 text-lg leading-relaxed">{rest}</dd>
              </div>
            ))}
          </dl>
        </Chapter>

        <Chapter n="03" title={<Gap>logo heading: they hired me, and I worked for them</Gap>}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 text-stone-500 sm:grid-cols-3">
            {c.logos.map((l) => <Wordmark key={l.name} {...l} serif className="h-12 w-full" />)}
          </div>
        </Chapter>

        <Chapter n="04" title={<Gap>heading for the four stories</Gap>}>
          <ol className="divide-y divide-stone-300">
            {c.stories.map((s, k) => (
              <li key={s} className="flex gap-5 py-6">
                <span className="font-sans text-sm text-amber-700">{String(k + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-xl font-semibold text-stone-900">{s}</h3>
                  <p className="mt-2"><Gap>the story, in your words</Gap></p>
                </div>
              </li>
            ))}
          </ol>
        </Chapter>

        <Chapter n="05" title="What I write about">
          <ul className="space-y-2 text-lg">
            {c.writeTopics.map((t) => <li key={t}>— {t}</li>)}
          </ul>
          <div className="mt-8 grid gap-3">
            {[1, 2, 3].map((n) => <Gap key={n} className="block">post {n} you pick</Gap>)}
          </div>
          <a href={c.linkedin} className="mt-6 inline-block font-sans text-sm font-semibold text-amber-800 underline underline-offset-4">Follow on LinkedIn</a>
        </Chapter>

        <Chapter n="06" title="Paid consulting">
          <p className="text-5xl font-semibold text-stone-900">{c.price}</p>
          <p className="mt-4"><Gap>a line on what the hour is for</Gap></p>
          <a href={c.consultingHref} className="mt-8 inline-flex rounded-full bg-stone-900 px-7 py-4 font-sans font-semibold text-[#f7f3ea]">{c.price} →</a>
          <p className="mt-6 text-lg">My company: <a href={c.goldenRiver} className="text-amber-800 underline underline-offset-4">Golden River</a></p>
        </Chapter>
      </main>

      <footer className="mx-auto max-w-2xl border-t border-stone-300 px-4 py-12 pb-32 font-sans text-sm text-stone-600">
        <p>{c.education}</p>
        <p className="mt-2"><a href={`mailto:${c.email}`} className="text-stone-900 underline underline-offset-4">{c.email}</a></p>
        <p className="mt-6"><Gap>footer</Gap></p>
      </footer>
    </div>
  );
}
