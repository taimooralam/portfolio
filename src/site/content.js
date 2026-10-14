// The decided words for taimooralam.com, verbatim from taimooralam/business#73 (his
// LinkedIn About) and #74 (site decisions, 2026-10-13), and portfolio#1 (the button label).
// Nothing goes here that he hasn't approved. Words still his to write are shown on the
// page as dashed [placeholders] (Gap), never filled in.

export const name = 'Taimoor Alam';
export const titleLine = 'Founder & Fractional CTO · AI Business Leader';

// The About's opening lines. "Golden River" links to goldenriver.ai.
export const opening = {
  before: "I've solved business problems with software for 12 years: in lighting, video calls, TV advertising, and now AI. Now I'm building my own company, ",
  link: 'Golden River',
  after: ', and work as a fractional CTO, helping business owners decide what to build, and what not to.',
};

export const movingStem = 'Every day, I write about';
export const movingEndings = [
  'solving business problems with technology.',
  'building Golden River.',
  "the books I'm reading, and how I apply them.",
  'AI and software engineering, in depth.',
  "what worked, and what didn't.",
];

export const problems = {
  heading: 'The problems I work on',
  lead: 'Most of my work starts with a business question, not a technology one.',
  questions: [
    'Where is time or money leaking?',
    'What should be automated, and what should stay human?',
    'Is AI the right answer here, or an expensive distraction?',
  ],
};

export const bring = {
  heading: 'What I bring',
  items: [
    ['Owning architecture.', 'Technical lead at Seven.One Entertainment (ProSiebenSat.1) for six years. I set the architecture and roadmap for its TV advertising platform, and they held from 2020 until I left in 2026.'],
    ['Advocating technology.', 'I championed the product and its technology across Seven.One, bringing engineering, product and business leaders behind one multi-year direction.'],
    ['Building a reliable AI engineering platform.', "I led Seven.One's enterprise AI platform, built to be governed and measured."],
    ['Building 0→1 products.', 'I led a CRM from zero to live at Samdock (DAYPAIO), and before that helped build a cloud-gaming product at an early startup.'],
    ['Keeping regulated systems compliant.', 'I led the technical side of GDPR audits by the Bavarian media regulator, with around €30M of yearly ad revenue at stake.'],
    ['Building teams.', 'I designed hiring, mentored engineers, and built the onboarding that brought new people up to speed in half the time.'],
    ['Across domains.', 'Lighting, video calls, cloud gaming, CRM, TV advertising and AI.'],
  ],
};

// The strip, in his CV's order (newest first), then the two he added on 2026-10-14.
// Files live in public/logos/ (see logos.json there for each file's source).
export const logos = [
  { name: 'Golden River', sub: null, file: 'golden_river' },
  { name: 'Seven.One', sub: 'ProSiebenSat.1', file: 'seven_one' },
  { name: 'Samdock', sub: 'DAYPAIO', file: 'samdock' },
  { name: 'Mercedes-Benz Group', sub: null, file: 'mercedes_benz_group' },
  { name: 'fortiss', sub: null, file: 'fortiss' },
  { name: 'OSRAM', sub: null, file: 'osram' },
  { name: 'Gorillabox', sub: null, file: 'gorillabox' },
  { name: 'OneScreen', sub: 'Clary Icon', file: 'onescreen' },
  { name: 'Techlogix', sub: null, file: 'techlogix' },
  { name: 'LMKT', sub: null, file: 'lmkt' },
];

// The four stories are decided by title only; their words come from business#86 (not written yet).
// His pick, 2026-10-14 (#10, option A of three): the heading above the four stories.
export const storiesHeading = "Business problems I've solved";
export const stories = [
  'Seven.One TV advertising platform',
  'Seven.One AI platform',
  'GDPR audits',
  'Samdock CRM',
];

export const linkedin = 'https://www.linkedin.com/in/taimooralam';
export const goldenRiver = 'https://goldenriver.ai';
export const consultingHref = '/consulting';
export const price = '$500/hour';
// His pick, 2026-10-14 (portfolio#1, option A of three): the words on the $500 button.
export const bookLabel = 'Book an hour';
export const education = 'M.Sc. Computer Science, TUM · English, German.';
export const email = 'contact@taimooralam.com';
// His line under the price, 2026-10-14 (#2): his "find the gaps in your workflow and remove
// the pains", with "process" for "workflow" at his "yes" (option A).
export const hourLine = 'Find the gaps in your process and remove the pains.';
