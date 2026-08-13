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

  chapters: [
    { id: "problem", label: "Problem" },
    { id: "solution", label: "Solution" },
    { id: "architecture", label: "Architecture" },
    { id: "impact", label: "Impact + Rationale" },
  ],

  problemStory: [
    {
      value: "600+",
      metricLabel: "Account managers depend on client notes to decide what happens next.",
      label: "Scale",
      title: "The signal exists, but it is buried in prose.",
      body: "Every visit, call and email leaves a free-form CRM note. The organization has the context it needs; the problem is making that context usable before the next client interaction.",
      consequence: "Important follow-ups compete with hundreds of other memories and manual to-do lists.",
    },
    {
      value: "100–200",
      metricLabel: "Notes per account manager, every week.",
      label: "Load",
      title: "Reading everything is not a workflow.",
      body: "A note faithfully records what happened, but it does not convert itself into a clear next step. Re-reading the week is slow, inconsistent and easy to postpone.",
      consequence: "The cost is not missing data. It is missing the moment to act on it.",
    },
    {
      value: "2 places",
      metricLabel: "The CRM holds the history; Microsoft Teams holds the working day.",
      label: "Reach",
      title: "An insight in the wrong tool is still invisible.",
      body: "Even a good recommendation fails if the account manager has to leave their daily workflow to find it. The action needs to appear both in a focused dashboard and inside Teams.",
      consequence: "Adoption starts with delivery: put the action where the work already happens.",
    },
  ],

  solutionSteps: [
    {
      title: "Ingest",
      short: "Fetch the AM's recent client-visit notes.",
      signal: "SQL Server · 7-day default · CSV fallback",
      detail: "The data service queries a filtered CRM view for one account manager and returns aggregate metadata with the notes. If the database is unavailable, a labeled CSV fallback keeps the read path alive.",
    },
    {
      title: "Clean",
      short: "Turn CRM HTML into reliable model context.",
      signal: "BeautifulSoup · pandas · normalized fields",
      detail: "HTML is stripped, nulls are normalized and client names are stitched into a stable payload. The model receives deliberate context instead of raw CRM formatting noise.",
    },
    {
      title: "Reason",
      short: "Constrain the model to one decision contract.",
      signal: "Azure OpenAI · temperature 0.3 · two fields",
      detail: "A deliberately small prompt returns only Suggested Action and Due Date, or N/A when the note cannot support a useful recommendation. Low temperature keeps reruns reviewable and stable.",
    },
    {
      title: "Deliver",
      short: "Render one answer in the two places AMs work.",
      signal: "FastAPI · Next.js · Adaptive Cards",
      detail: "The same stateless endpoint feeds the web dashboard and the Teams bot. Each client owns presentation; neither duplicates the reasoning pipeline.",
    },
  ],

  solutionSurfaces: [
    {
      title: "Web dashboard",
      copy: "Focused review, per-note generation and an insights view.",
    },
    {
      title: "Teams bot",
      copy: "Paginated Adaptive Cards with an email handoff.",
    },
  ],

  impactMetrics: [
    {
      value: "2",
      label: "decision fields",
      copy: "Suggested Action + Due Date",
    },
    {
      value: "2",
      label: "delivery surfaces",
      copy: "Web dashboard + Microsoft Teams",
    },
    {
      value: "1",
      label: "reasoning contract",
      copy: "One stateless backend shared by both clients",
    },
  ],

  rationale: [
    {
      question: "Why suggest an action instead of taking it automatically?",
      answer: "Account managers retain decision authority. The system proposes a next step, but it does not send email or write a task back to the CRM without human review.",
    },
    {
      question: "Why constrain the model to only two fields?",
      answer: "A fixed Suggested Action + Due Date contract keeps reruns reviewable and lets the web app and Teams bot render the same answer without separate interpretation logic. When evidence is weak, the model returns N/A.",
    },
    {
      question: "How were access and client data bounded?",
      answer: "The web surface is protected by internal SSO, retrieval is filtered to one account manager and a recent note window, and Teams activities are authenticated through Azure Bot Service. This public case study uses illustrative data only; backend bearer enforcement for bot calls remains an explicit hardening step before broader exposure.",
    },
    {
      question: "Why a stateless backend and a labeled fallback?",
      answer: "Every request carries its full note context, so web and Teams cannot drift into separate reasoning systems. If the CRM is unavailable, the read path falls back to CSV and reports the active data source instead of silently pretending it is live data.",
    },
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

  // ===== SYSTEM CUBE — the 6 domains of the stack, one per cube face =====
  // Narrative order; the component maps each to a physical cube side.
  systemFaces: [
    {
      id: "frontend",
      label: "Frontend",
      tag: "Client",
      oneLiner: "SSO-gated dashboard for focused review",
      tech: ["Next.js 16", "React 19", "Tailwind", "recharts"],
      responsibility:
        "A statically-exported Next.js app: SSO login, a notes table with per-row action generation in a modal, and an insights page charting action distribution and a daily timeline.",
      diagram: {
        nodes: [
          { id: "browser", label: "Browser", sub: "SSO session", x: 64, y: 105, type: "external" },
          { id: "shell", label: "App shell", sub: "Next.js export", x: 180, y: 105 },
          { id: "actions", label: "Notes + actions", sub: "/extract_actions", x: 298, y: 56, type: "accent" },
          { id: "insights", label: "Insights", sub: "recharts", x: 298, y: 154 },
        ],
        edges: [
          { from: "browser", to: "shell", label: "SSO" },
          { from: "shell", to: "actions" },
          { from: "shell", to: "insights" },
        ],
      },
    },
    {
      id: "backend",
      label: "Backend",
      tag: "Core",
      oneLiner: "One stateless FastAPI service",
      tech: ["FastAPI", "Uvicorn", "pandas", "SQLAlchemy"],
      responsibility:
        "A stateless FastAPI service exposing /api/notes, /api/extract_actions and /api/am_stats. Every request carries full note context, so the web and Teams clients share one endpoint with zero server-side session state.",
      diagram: {
        nodes: [
          { id: "api", label: "FastAPI", sub: "stateless", x: 78, y: 105, type: "accent" },
          { id: "notes", label: "/notes", sub: "list + meta", x: 252, y: 46 },
          { id: "extract", label: "/extract", sub: "note \u2192 LLM", x: 252, y: 105 },
          { id: "stats", label: "/am_stats", sub: "summary", x: 252, y: 164 },
        ],
        edges: [
          { from: "api", to: "notes", label: "GET" },
          { from: "api", to: "extract", label: "POST" },
          { from: "api", to: "stats", label: "GET" },
        ],
      },
    },
    {
      id: "ai",
      label: "AI",
      tag: "Reasoning",
      oneLiner: "A deterministic two-field prompt",
      tech: ["Azure OpenAI", "prompt contract", "temp 0.3"],
      responsibility:
        "Each cleaned note goes to Azure OpenAI under a deliberately tiny prompt that returns exactly two fields — Suggested Action and Due Date — or \u201cN/A\u201d. Low temperature keeps the same note stable across reruns.",
      diagram: {
        nodes: [
          { id: "note", label: "Note", sub: "cleaned", x: 62, y: 105 },
          { id: "aoai", label: "Azure OpenAI", sub: "prompt \u00b7 temp 0.3", x: 184, y: 105, type: "accent" },
          { id: "sug", label: "Suggested", sub: "next step", x: 300, y: 56 },
          { id: "due", label: "Due date", sub: "or N/A", x: 300, y: 154 },
        ],
        edges: [
          { from: "note", to: "aoai", label: "constrained" },
          { from: "aoai", to: "sug" },
          { from: "aoai", to: "due" },
        ],
      },
    },
    {
      id: "data",
      label: "Data",
      tag: "Source",
      oneLiner: "A CRM view with a CSV fallback",
      tech: ["SQL Server", "CSV fallback", "BeautifulSoup"],
      responsibility:
        "Pulls each AM's recent client-visit notes from a CRM view, strips HTML and normalizes fields. If the database is unreachable it silently falls back to a bundled CSV and tags the response with its data_source.",
      diagram: {
        nodes: [
          { id: "crm", label: "CRM view", sub: "Bullhorn", x: 66, y: 56, type: "store" },
          { id: "csv", label: "CSV", sub: "bundled", x: 66, y: 156, type: "store" },
          { id: "svc", label: "Data service", sub: "clean \u00b7 normalize", x: 190, y: 105, type: "accent" },
          { id: "out", label: "Response", sub: "+ data_source", x: 300, y: 105 },
        ],
        edges: [
          { from: "crm", to: "svc", label: "primary" },
          { from: "csv", to: "svc", label: "fallback", dashed: true },
          { from: "svc", to: "out" },
        ],
      },
    },
    {
      id: "bot",
      label: "Bot",
      tag: "Surface",
      oneLiner: "Adaptive Cards inside Teams",
      tech: ["Bot Framework v4", "Adaptive Cards", "aiohttp"],
      responsibility:
        "A separate Bot Framework service renders the same suggestions as paginated Adaptive Cards in Microsoft Teams under the internal GoldenCompass brand — expandable rows and a one-tap handoff to email the client.",
      diagram: {
        nodes: [
          { id: "teams", label: "Teams", sub: "@mention", x: 60, y: 105, type: "external" },
          { id: "bot", label: "Bot service", sub: "Bot Framework", x: 176, y: 105, type: "accent" },
          { id: "api", label: "Backend", sub: "same API", x: 300, y: 56 },
          { id: "card", label: "Adaptive Card", sub: "mailto handoff", x: 300, y: 154 },
        ],
        edges: [
          { from: "teams", to: "bot", label: "activity" },
          { from: "bot", to: "api", label: "HTTP", dashed: true },
          { from: "bot", to: "card", label: "render" },
        ],
      },
    },
    {
      id: "deploy",
      label: "Deploy",
      tag: "Ship",
      oneLiner: "One container, built in two stages",
      tech: ["Docker", "multi-stage", "ACR", "Azure Bot Service"],
      responsibility:
        "A multi-stage Docker build compiles the Next.js frontend, then a Python runtime serves it alongside the API — one image, one port. The bot ships as its own service, registered independently against Azure Bot Service.",
      diagram: {
        nodes: [
          { id: "build", label: "Node build", sub: "next build", x: 66, y: 58 },
          { id: "run", label: "Py runtime", sub: "serves /static", x: 190, y: 58, type: "accent" },
          { id: "cont", label: "Container", sub: "one image", x: 300, y: 58 },
          { id: "botsvc", label: "Bot service", sub: "separate", x: 190, y: 158, type: "external" },
        ],
        edges: [
          { from: "build", to: "run", label: "export" },
          { from: "run", to: "cont", label: "packaged" },
          { from: "cont", to: "botsvc", label: "independent", dashed: true },
        ],
      },
    },
  ],

  closingQuote:
    "The interesting part isn't that an LLM can summarize a note. It's the plumbing that makes one suggestion show up, reliably, in the two places an account manager actually looks.",
};

export default note2actionData;
