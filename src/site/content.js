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

// The posts he picked for "What I write about" (portfolio#12, 2026-10-15). Title, opening
// line and full text are his, verbatim, as he pasted them. They link to his activity page
// until he gives each post's own link.
const activity = 'https://www.linkedin.com/in/taimooralam/recent-activity/all/';
export const posts = [
  {
    platform: 'LinkedIn',
    kind: 'Post',
    title: "TensorZero was one of the best-engineered LLM gateways I've read. Last month it was archived.",
    lead: 'Why it died has stayed with me more than how it worked.',
    href: activity,
    body: [
      'Six months of LLMOps consolidation: Langfuse went to ClickHouse. Helicone went to Mintlify. LiteLLM got hit by a supply-chain attack. TensorZero was wound down.',
      'The engineering was impressive. A Rust gateway at sub-millisecond p99, a ClickHouse schema that logged every inference and its feedback, and a data flywheel that fed that production data back into evals and then into better models. All of it wired into one system.',
      "That wiring was the actual value proposition, and it's also the first thing teams take apart.",
      'Most kept the gateway, added Langfuse for tracing and DeepEval for evals, and the flywheel never really spun. It was fully open-source with no paid tier, so each new user was a cost rather than revenue. At the same time the model providers were pulling routing, caching and fine-tuning into their own platforms.',
      'So it was a strong engineering bet on a hard business shape. Users unbundled it from the side, the big providers absorbed its features from above, and with no paid tier there was never any revenue to fund the middle.',
      "What I'm taking into the agent systems I build: keep governance and measurement as composable layers that plug into the stack teams actually use, instead of one more integrated platform they have to adopt whole.",
      'Is the standalone LLM gateway a dead category now? Curious how other infra people read it.',
    ],
  },
  {
    platform: 'LinkedIn',
    kind: 'Post',
    title: 'The LLM Gateway Pattern: Why Production AI Systems Need a Proxy Layer',
    lead: 'Calling an LLM provider directly from application code is the 2026 equivalent of hardcoding a database connection string.',
    href: activity,
    body: [
      'It can work in a demo, but it creates operational risk in production.',
      'An LLM gateway adds a proxy layer between your application and one or more providers. This layer standardizes responses, controls routing, and centralizes policy.',
      'Three production reasons this matters:',
      '1. Error normalization\nProviders can return HTTP 200 responses with malformed or schema-breaking output. A gateway validates responses and returns structured errors instead of letting invalid data reach users.',
      '2. Resilience\nProvider outages and model-level throttling are normal production events. A gateway can apply health checks, circuit breakers, and failover to secondary providers without client code changes or redeploys.',
      '3. Cost control\nToken accounting, per-team cost attribution, and prompt caching should be centralized. Semantic caching on repeated query patterns can materially reduce inference spend.',
      'API gateways are a proven pattern in distributed systems. In LLM systems, they are even more important because limits vary by model, outputs are non-deterministic, and bad prompts can be expensive.',
      'If you run LLMs in production, put a gateway in front of them.',
    ],
  },
];

// The platforms on the all-posts page (his list, 2026-10-15). Until he picks real posts and
// videos, each shows placeholder tiles, never invented content.
export const platforms = [
  { name: 'LinkedIn', dot: '#0A66C2', slots: [['Post', 'tall']] },
  { name: 'YouTube', dot: '#FF0000', slots: [['Video', 'wide'], ['Short', 'tall']] },
  { name: 'Instagram', dot: '#E1306C', slots: [['Post', 'square'], ['Reel', 'tall']] },
  { name: 'TikTok', dot: '#25F4EE', slots: [['Video', 'tall']] },
  { name: 'Facebook', dot: '#1877F2', slots: [['Post', 'square']] },
  { name: 'X', dot: '#E5E5E5', slots: [['Post', 'short'], ['Post', 'short']] },
  { name: 'Threads', dot: '#A3A3A3', slots: [['Post', 'short']] },
];
export const postsHref = '/posts';
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
