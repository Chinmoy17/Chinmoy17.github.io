/**
 * Note2Action Project Data
 * Case study content for the Note2Action AI task-prediction system.
 *
 * This is a private / SSO internal production tool, so the page is intentionally
 * typographic and diagram-driven — no screenshots or source can be shared.
 * Internal infrastructure identifiers (auth URLs, registry names, tenant, real
 * client data) are deliberately abstracted out.
 */

const note2actionData = {
  id: "note2action",
  slug: "note2action",
  visibility: "private",
  category: "project",
  featured: true,
  title: "Note2Action — AI-Powered Task Prediction System",
  stack: [
    "Azure OpenAI",
    "FastAPI",
    "Next.js 16 + React 19",
    "Microsoft Bot Framework",
    "Adaptive Cards",
    "SQL Server + pandas",
    "Docker",
    "SSO / JWT",
  ],
  summary:
    "Reads every account manager's recent client notes and returns a single next action with a due date — delivered to both a web dashboard and a Microsoft Teams bot from one stateless backend.",

  tags: ["Production System", "Internal Tool", "Private / SSO"],

  tagline:
    "Six hundred account managers, a hundred-plus notes each every week, and one question buried in all of it — what should I do next?",

  // Hero proof band (strongest, most concrete numbers first).
  stats: [
    { value: "600+", label: "Account Managers" },
    { value: "100–200", label: "Notes / week, each" },
    { value: "2", label: "Delivery surfaces" },
    { value: "7-day", label: "Rolling note window" },
  ],

  // ===== OVERVIEW =====
  overview: [
    "Note2Action is a production internal tool with one job: read every account manager's recent client notes and tell them, in a single line, what to do next and by when.",
    "The company's ~600 account managers log 100–200 free-form notes a week each after client visits, calls, and emails. Every note faithfully records what happened — and never what should happen next.",
    "So the system runs one AI pipeline behind two front doors: a web dashboard for focused review, and a Microsoft Teams bot for the AMs who effectively live in chat.",
    "The hard parts were never the model. They were the plumbing: cleaning messy CRM HTML, staying up when the database blinks, and keeping one backend simple enough to serve two very different clients.",
  ],
  overviewQuote: "Notes tell you what happened. AMs needed to know what happens next.",

  // ===== THE OVERLOAD (problem) =====
  problemIntro:
    "Roughly 600 account managers between them log 100–200 client-interaction notes every week — tens of thousands of free-form entries against clients, stakeholders, and decision-makers, all captured in the CRM after the fact. The information exists. Acting on it is the problem.",
  painPoints: [
    {
      title: "Information overload",
      body: "An AM can't re-read hundreds of notes a week to work out what to do next.",
      impact: "Follow-ups slip; high-value stakeholders quietly go cold.",
    },
    {
      title: "No structured next step",
      body: "Notes record what happened, not what should happen next.",
      impact: "Every AM has to mentally derive their own to-do list.",
    },
    {
      title: "No reach into the workflow",
      body: "Notes live in the CRM. The AMs live in Microsoft Teams.",
      impact: "Even good insight never makes it to where the work actually happens.",
    },
  ],

  // ===== THE PIPELINE =====
  pipelineIntro:
    "One pipeline, four stages. Everything downstream — web and Teams alike — is just a renderer for what comes out the end.",
  pipeline: [
    {
      title: "Ingest",
      desc: "Pull each AM's last 7 days of client-visit notes from a CRM view — filtered to rows with a real client contact.",
      detail: "CSV fallback",
    },
    {
      title: "Clean",
      desc: "Strip CRM HTML out of every comment, normalize nulls, and stitch client first / last name into one field.",
      detail: "BeautifulSoup + pandas",
    },
    {
      title: "Reason",
      desc: "Send each note through Azure OpenAI with a tiny, deterministic prompt that returns exactly two fields.",
      detail: "temp 0.3",
    },
    {
      title: "Deliver",
      desc: "Render the result in a web dashboard and as Teams Adaptive Cards — both hitting the same stateless endpoint.",
      detail: "web + Teams",
    },
  ],

  // ===== TWO SURFACES =====
  surfaces: [
    {
      kind: "Web dashboard",
      tech: "Next.js 16 · React 19 · Tailwind",
      points: [
        "SSO login gates every protected route.",
        "A notes table with per-row action generation in a modal.",
        "An insights page — action distribution and a daily timeline (recharts).",
        "Statically exported and served by FastAPI as a single container.",
      ],
    },
    {
      kind: "Teams bot",
      tech: "Bot Framework v4 · Adaptive Cards",
      points: [
        "@mention an AM's email to pull their notes.",
        "The same suggestions render as paginated Adaptive Cards.",
        "Tap a row to expand client, department, due date, and the full action.",
        "Tap \u201cEmail Client\u201d to hand off to Outlook, recipient pre-filled.",
      ],
    },
  ],

  // Illustrative Teams card mock — NOT real client data.
  adaptiveCard: {
    initials: "KL",
    am: "kate.long",
    page: 1,
    total: 2,
    row: {
      client: "Acme Corp",
      dept: "Procurement",
      action:
        "Follow up on the revised SOW and confirm the Q3 engagement start date.",
      due: "2026-08-18",
    },
  },

  // ===== NOTE TO NUDGE (workflow) =====
  workflowIntro:
    "One request path, from an email address to an action an AM can act on — whether they came in through the browser or through Teams.",
  workflow: [
    "An AM enters their email in the web app, or @mentions it in Teams; the request carries the email and a day window.",
    "The backend pulls that AM's last N days of client-visit notes from the CRM view — or the bundled CSV if the database is unreachable.",
    "Comments are HTML-cleaned, nulls normalized, and client names stitched into a single field.",
    "The AM sees a summary block — name, department, total notes, unique clients, date range — and the notes themselves.",
    "Selecting a note POSTs the full note payload to /api/extract_actions.",
    "Azure OpenAI returns a Suggested Action and a Due Date under the constrained prompt.",
    "The web app renders it in a modal; the Teams bot renders it inside a paginated Adaptive Card.",
    "The AM acts — expanding the card, or tapping \u201cEmail Client\u201d to hand off to Outlook with the recipient pre-filled.",
  ],

  // ===== UNDER THE HOOD (architecture) =====
  principles: [
    {
      title: "Stateless backend",
      body: "Every request carries the full note context to /api/extract_actions. No per-user server state — so the web and Teams clients hit the same endpoint with zero coordination.",
    },
    {
      title: "Graceful degradation",
      body: "If the database is unreachable, the data layer silently falls back to a bundled CSV and tags the response with a data_source flag, so the UI can show which source was used.",
    },
    {
      title: "One artifact for the web app",
      body: "The Next.js frontend is statically exported and served by FastAPI, so production is a single Docker container behind one port — not two services to keep in sync.",
    },
    {
      title: "The bot stays separate",
      body: "The bot is its own service, hosted and registered independently against Azure Bot Service and Teams, without touching the web stack it shares a backend with.",
    },
  ],

  promptContract: {
    framing:
      "The model is framed as a friendly notification system — not a task commander.",
    rules: [
      "Injects AM + client context and the cleaned note body.",
      "Returns only two fields; nothing else.",
      "Returns \u201cN/A\u201d when nothing useful can be inferred.",
    ],
    output: [
      { field: "Suggested Action", value: "Follow up on the revised SOW\u2026" },
      { field: "Due Date", value: "2026-08-18" },
    ],
    settings: ["temperature 0.3", "max_tokens 500", "deterministic reruns"],
  },

  apiSurface: [
    { method: "GET", path: "/api/notes", purpose: "AM's notes for the last N days + aggregate metadata" },
    { method: "POST", path: "/api/extract_actions", purpose: "One note \u2192 Azure OpenAI \u2192 Suggested Action + Due Date" },
    { method: "GET", path: "/api/am_stats", purpose: "AM summary + notes list for the insights charts" },
    { method: "GET", path: "/api/sso", purpose: "Server-side proxy to internal SSO (avoids browser CORS)" },
    { method: "GET", path: "/api/test", purpose: "Health / liveness check" },
  ],

  // ===== WHAT IT CHANGED (results) =====
  results: [
    "Turns an unreadable weekly pile of 100–200 notes per AM into a short, structured list of next actions with due dates.",
    "Meets AMs where they already work — the same insight appears in the web dashboard and inside Teams, with no new tool to learn.",
    "Deterministic by design: a low temperature and a strict two-field contract keep suggestions stable and reviewable rather than creative.",
    "Resilient — the CSV fallback means the tool still runs and demos when the CRM database is unreachable.",
    "Honestly scoped: the model suggests, the AM decides. There's no auto-send, and CRM write-back is deliberately left out for now.",
  ],

  // ===== WHERE IT GOES (next) =====
  nextIntro:
    "The suggestion engine works. The next moves are about closing the loop between a suggestion and the action actually being taken.",
  nextUp: [
    "Proactive push — a scheduled digest so the bot nudges each AM without being asked.",
    "Feedback loop — let AMs accept, edit, or dismiss a suggestion, and feed that signal back into the prompt.",
    "Action taxonomy — classify suggestions (call, email, schedule, escalate) to power filtering and analytics.",
    "CRM write-back — optionally push an accepted action back into the CRM as a task, closing the loop.",
    "Auth hardening — enforce the SSO bearer token on the bot's backend calls before wider rollout.",
  ],

  closingQuote:
    "The interesting part isn't that an LLM can summarize a note. It's the plumbing that makes one suggestion show up, reliably, in the two places an account manager actually looks.",
};

export default note2actionData;
