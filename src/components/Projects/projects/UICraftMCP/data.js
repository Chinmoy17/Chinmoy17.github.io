/**
 * UI Craft MCP Project Data
 * Case study content for the UI Craft MCP server — an open-source
 * Model Context Protocol server that gives coding agents a structured,
 * psychology-backed design brief instead of vague "make it look better" guesses.
 */

const uiCraftData = {
  id: "ui-craft-mcp",
  slug: "ui-craft-mcp",
  visibility: "public",
  category: "project",
  featured: true,
  title: "UI Craft — A Psychology-Backed Design Brain for Coding Agents",
  stack: [
    "TypeScript",
    "Model Context Protocol",
    "Node.js",
    "npm",
    "JSON Knowledge Base",
    "GitHub Actions CI/CD",
  ],
  summary:
    "An open-source MCP server that plugs into GitHub Copilot, Claude Code, and Cursor — swapping 'make it look better' for a structured design brief grounded in layout, typography, color, and research-backed psychology principles.",

  tags: ["Open Source", "MCP Server", "npm Package"],

  tagline:
    "Every full-stack dev has shipped a great backend, slapped a UI on top, and hoped it looked 'good.' It never does.",

  stats: [
    { value: "7", label: "MCP Tools" },
    { value: "16", label: "Psychology Principles" },
    { value: "5", label: "Knowledge Domains" },
    { value: "30s", label: "Install Time" },
  ],

  chapters: [
    { id: "problem", label: "Problem" },
    { id: "solution", label: "Solution" },
    { id: "architecture", label: "Architecture" },
    { id: "impact", label: "Impact + Rationale" },
  ],

  // ===== CHAPTER 01 — PROBLEM =====
  painPoints: [
    {
      title: "skill.md files half-work",
      body: "A rules file bolted onto a prompt is a context-window tax on every single turn — whether that turn needs design guidance or not.",
      impact: "It doesn't adapt to page type, doesn't scale across projects, and sharing it bakes in your project's biases.",
    },
    {
      title: "Design knowledge evaporates mid-session",
      body: "You've read Refactoring UI, bookmarked Laws of UX, and kept notes — and then in the middle of a coding session, all of it disappears.",
      impact: "\u201cMake the hero section better\u201d gets you a slightly different hero section, not a reasoned decision.",
    },
    {
      title: "Vibes, not a brief",
      body: "Agents default to pattern-matching on whatever's nearby in context instead of reasoning from layout, typography, color, and audience.",
      impact: "The fix isn't a smarter model — it's giving the agent something concrete to reason from.",
    },
  ],

  // ===== CHAPTER 02 — SOLUTION =====
  solutionIntro:
    "UI Craft treats design knowledge the way agents already treat grep, read, and web_search — as a tool called on demand, not context carried around for the whole conversation.",
  exampleRequest:
    "Design a landing page for a B2B SaaS product focused on trust. Audience is enterprise buyers.",
  exampleOutputSections: [
    { label: "Intent Signature", value: "page_type: landing_page \u00b7 emphasis: trust \u00b7 mode: greenfield" },
    { label: "Anchor principles", value: "Halo Effect \u00b7 F-Pattern \u00b7 Miller's Law" },
    { label: "Layout", value: "Hero \u2192 social proof strip \u2192 3-col feature grid \u2192 pricing anchor \u2192 FAQ \u2192 footer CTA" },
    { label: "Typography", value: "Serif/semi-serif display for credibility; body 16px / 1.6 / max 65ch" },
    { label: "Color", value: "Deep blue trust anchor \u00b7 60/30/10 split \u00b7 body contrast \u2265 7:1" },
    { label: "Checklist", value: "Squint test \u00b7 WCAG AA \u00b7 one primary CTA \u00b7 social proof above the fold" },
  ],
  solutionSteps: [
    {
      title: "Ask",
      short: "Describe the page in plain language.",
      detail: "\u201cDesign an onboarding flow for first-time consumers, focused on clarity\u201d is a complete, valid request — the orchestrator infers what it can and asks for the rest.",
    },
    {
      title: "Call",
      short: "The agent calls run_session automatically.",
      detail: "Modern agents pick the tool themselves based on what's asked — no slash command, no copy-pasted rules file to remember.",
    },
    {
      title: "Reason",
      short: "Layout, type, color, and principles come back together.",
      detail: "A structured brief — not a lecture — with a short list of the psychology principles actually driving each decision.",
    },
    {
      title: "Build",
      short: "The agent writes JSX / Tailwind with intent, not vibes.",
      detail: "The brief becomes the spec the agent codes against, so the result can be explained, not just admired.",
    },
  ],

  engineeringChoices: [
    {
      title: "Inverted indexes",
      body: "16 psychology principles indexed once by page_type \u00d7 emphasis \u2192 Set<id>. Ranking is a small-set intersection, not a scan.",
    },
    {
      title: "Three-state singleton KB cache",
      body: "Every domain file is false (untried) \u2192 null (missing) \u2192 parsed JSON. Zero disk reads after the first hit; missing files aren't re-checked.",
    },
    {
      title: "Progressive session mode",
      body: "Once typography is resolved for a page, later calls skip that KB section unless you say \u201credo typography.\u201d Fewer tokens back to the agent, cleaner context for the model.",
    },
  ],

  // ===== CHAPTER 03 — ARCHITECTURE =====
  tools: [
    { name: "run_session", purpose: "Full orchestrated session: INIT \u2192 PLAN \u2192 DESIGN \u2192 EVALUATE. All fields optional. Start here.", example: "\u201cDesign an onboarding flow for first-time consumers, focused on clarity.\u201d" },
    { name: "design_page", purpose: "Single-shot brief for a specific page type + emphasis: layout, typography, color, principles, checklist.", example: "\u201cWhat layout should I use for a settings page focused on speed?\u201d" },
    { name: "start_session", purpose: "MCQ-style onboarding — captures working mode, surface, goal, audience, tone, density.", example: "\u201cStart a UI Craft session \u2014 I'm redesigning an existing dashboard for admins.\u201d" },
    { name: "set_project_context", purpose: "Persist project-wide context (industry, audience, brand tokens, stack, must-keeps).", example: "\u201cSet project context: fintech, portfolio managers, primary color #0F52BA, Next.js + Tailwind.\u201d" },
    { name: "get_project_context", purpose: "Read the current stored context back.", example: "\u201cShow me the current UI Craft project context.\u201d" },
    { name: "get_session_state", purpose: "Current stage, resolved KB domains, pending questions.", example: "\u201cWhat has UI Craft already resolved for this page?\u201d" },
    { name: "get_usage_stats", purpose: "Local, anonymous counters — tool calls, page types designed. No PII, never leaves disk.", example: "\u201cShow my UI Craft usage stats.\u201d" },
  ],

  kbDomains: [
    { name: "Psychology", detail: "16 cognitive & UX principles — Gestalt, Fitts's Law, Hick's Law, Miller's Law, Halo Effect, Anchoring Bias, F-Pattern, and more." },
    { name: "Typography", detail: "Roles, size / line-height / weight scales, brand patterns (Apple, Linear, Stripe, Vercel\u2026), anti-patterns." },
    { name: "Color", detail: "Semantic tokens, 60/30/10 distribution, WCAG contrast reference, elevation system, focus ring pattern." },
    { name: "Layout", detail: "Button hierarchy, form patterns, card variants, grid + spacing scale, page-type max-widths, z-index system." },
    { name: "Brand", detail: "6+ emotional profiles (Nike / Apple / Stripe / Airbnb / Spotify / Meta\u2026) matched by industry + emphasis." },
  ],

  storageTree: [
    "context.json      \u2190 project name, audience, industry, brand, stack, must-keeps",
    "state.json        \u2190 active page, session stage, resolved KB domains",
    "history.json      \u2190 last 10 tool calls (for continuity across sessions)",
    "notes.md          \u2190 your feedback carried forward between calls",
    "usage.json        \u2190 anonymous local counters (install-scoped random UUID)",
  ],
  storageNote:
    "Everything lives under .vscode/ui-assistant/ inside the workspace. No cloud sync, no PII — telemetry is opt-in, HTTPS-only, and off by default.",

  // ===== CHAPTER 04 — IMPACT + RATIONALE =====
  impactMetrics: [
    { value: "7", label: "tools shipped", copy: "run_session \u2192 design_page \u2192 start_session \u2192 context + state + usage tools" },
    { value: "16", label: "principles indexed", copy: "Across Gestalt, Fitts's, Hick's, Miller's Law, Halo Effect, and more" },
    { value: "100%", label: "local-first", copy: "No cloud sync, no PII — state lives in your workspace" },
  ],

  rationale: [
    {
      question: "Why a tool the agent calls, instead of a skill.md file it always carries?",
      answer: "A static rules file is a context-window tax on every turn whether or not that turn needs design guidance, and it can't adapt to page type. Treating design knowledge as a callable tool means the agent only pays for it when it's actually designing something.",
    },
    {
      question: "Why local-first with no cloud sync?",
      answer: "Every piece of state — context, session, history, notes, usage — lives under .vscode/ui-assistant/ in the workspace. Nothing is uploaded, the install ID is a random UUID scoped to the install location, and telemetry is opt-in and off by default.",
    },
    {
      question: "Why progressive session mode instead of re-sending the full brief every time?",
      answer: "Once a KB domain like typography is resolved for a page, later calls in the same session skip it unless the user says \u201credo typography.\u201d That keeps token cost down and keeps the agent's context focused on what's still undecided.",
    },
    {
      question: "What's the biggest acknowledged gap?",
      answer: "A proper transitions & animation knowledge base. Motion carries a lot of \u201cpremium feel\u201d and the rules are non-trivial — it's an open contribution area, not a hidden weakness.",
    },
  ],

  roadmapShipped: [
    "design_page with page_type \u00d7 emphasis \u00d7 audience \u00d7 industry \u00d7 device adaptation",
    "Orchestrator (run_session) \u2014 full state machine with retries and structured fallbacks",
    "start_session MCQ onboarding",
    "Per-project persistent context (set/get_project_context)",
    "Session state introspection (get_session_state)",
    "Local anonymous usage stats (get_usage_stats)",
    "Domain-gated KB with progressive session mode",
    "CI/CD auto-publish to npm on push to main",
  ],
  roadmapNext: [
    "analyze_ui \u2014 score an existing JSX/HTML surface for hierarchy, contrast, grouping, density",
    "improve_ui \u2014 turn \u201cmake this better\u201d into concrete, ranked, reasoned moves",
    "choose_palette \u2014 brand-mood \u2192 color-system generator",
    "accessibility_check \u2014 WCAG contrast + keyboard navigation review",
    "Transitions & animation KB \u2014 motion timing, easing, hover intent \u2014 biggest gap right now",
  ],

  links: {
    repo: "https://github.com/Chinmoy17/UI-Craft-MCP",
    npm: "https://www.npmjs.com/package/@chinmoy_mitra/ui-craft",
  },
};

export default uiCraftData;
